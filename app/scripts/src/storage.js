class Store {
  constructor (storage_api) {
    this.api = storage_api;
  }

  get () {
    return this.api.getItem(this.key);
  }

  set (value) {
    this.api.setItem(this.key, value);
  }
}

export class UserStore extends Store {
  constructor (key) {
    super(sessionStorage);
    this.key = key;
  }
}
