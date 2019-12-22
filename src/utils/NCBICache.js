export default class NCBICache {
  constructor() {
    this._cache = {};
  }

  get(database, id) {
    const db = this._cache[database];
    if (db) {
      return db[id];
    }
  }

  set(database, id, value) {
    if (!this._cache[database]) {
      this._cache[database] = {};
    }

    this._cache[database][id] = value;
  }
}
