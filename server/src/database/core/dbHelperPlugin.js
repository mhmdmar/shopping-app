import dbHelper from "./dbHelper.js";
class DbHelperPlugin {
    constructor() {
        this.dbHelper = dbHelper;
    }
    query() {
        return this.dbHelper.query(...arguments);
    }
}
export default DbHelperPlugin;
