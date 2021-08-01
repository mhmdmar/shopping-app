import dbConfig from "./config.js";
import pg from "pg";
import tablesSchemes from "./tablesSchemes.js";

const {Client} = pg;

class DBHelper {
    static client
    constructor() {
        DBHelper.client = new Client(dbConfig);
    }

    _connect() {
        if (DBHelper.client._connected) {
            return;
        }
        return new Promise(async (resolve, reject) => {
            try {
                await DBHelper.client.connect();
                await this.initDatabase();
                resolve();
            } catch (err) {
                if (err) {
                    console.error(err);
                }
                reject(err);
            }
        });
    }

    query(queryString, singleResult) {
        return new Promise(async (resolve, reject) => {
            try {
                await this._connect();
                const {rows} = await DBHelper.client.query(queryString);
                resolve(
                    rows?.length > 0 ? (singleResult ? rows[0] : rows) : null
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    fillScheme(tableSpace, owner, tableName, columns) {
        return `CREATE TABLE IF NOT EXISTS ${tableName}(
            ${columns.join(",\n")}
         )
        TABLESPACE ${tableSpace};
        ALTER TABLE ${tableName}
        OWNER to ${owner};  
      `;
    }

    initDatabase() {
        const {owner, tableSpace, tables} = tablesSchemes;
        const promises = [];
        tables.forEach(table => {
            const query = this.fillScheme(
                tableSpace,
                owner,
                table.name,
                table.columns
            );
            promises.push(this.query(query));
        });
        return new Promise((resolve, reject) => {
            Promise.all(promises)
                .then(values => {
                    resolve(values);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}

export default new DBHelper();
