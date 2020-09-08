class Tag {
    constructor(data = {}) {
        this.id = data.id;
        this.tagName = data.tagName;
        this.username = data.username;
        this.email = data.email;
    }

    getRowData() {
        let tag = {
          id: this.id,
          tagName: this.tagName,
          username: this.username,
          email: this.email,
        };
        return tag;
    }

    static getTags() {
        return new Promise((resolve, reject) => {
          buildfire.dataStore.search({}, "tags", (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
    }

    save() {
        let tag = this.getRowData();
        return new Promise((resolve, reject) => {
            buildfire.dataStore.insert(tag, "tags", (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
        });
    }

    update() {
        let tag = this.getRowData();
        return new Promise((resolve, reject) => {
            buildfire.dataStore.update(this.id, tag, "tags", (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            buildfire.dataStore.delete(this.id, "tags", (err, data) => {
              if (err) reject(err);
              else resolve(data);
            });
        });
    }
}