class LocalStorageService {
    constructor() {
        this.storageKey = "shoppingCart";
        this.storage = {};
        if (localStorage[this.storageKey] !== undefined) {
            try {
                this.storage = JSON.parse(localStorage[this.storageKey]);
            } catch (err) {
                delete localStorage[this.storageKey];
            }
        }
    }
    setValue(key, value) {
        try {
            this.storage[key] = value;
        } catch (err) {
            console.error(err);
        }
    }
    getValue(key) {
        let value = this.storage[key];
        if (value !== undefined) {
            try {
                value = JSON.parse(value);
            } catch (err) {
                this.removeKey(key);
            }
        }
        return value;
    }
    removeKey(key) {
        delete this.storage[key];
    }
    saveStorage() {
        localStorage[this.storageKey] = JSON.stringify(this.storage);
    }
}

const storage = new LocalStorageService();
export default storage;
window.onbeforeunload = function() {
    storage.saveStorage();
};
