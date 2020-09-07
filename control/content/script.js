let buildfire = {
    datastore: {
      insert: (a, b, c) => {},
      searchAndUpdate: (a, b, d, e) => {},
      get: (a, b) => {},
      getById: (a, b, c) => {},
    },
  };
   
  class Metric {
   
    constructor(data = {}) {
        this.id = data.id || '';
        this.title = data.title || '';
        this.icon = data.icon || '';
        this.min = data.min || 0;
        this.max = data.max || 0;
        this.value = data.value || 0;
        this.action_item = data.action_item || {};
        this.type = data.type || '';
        this.parent_id = data.parent_id || '';
        this.history = [{ date: new Date(), value = data.value || 0}];
    }
    assets
    static getMatrics() {
        return new Promise((resolve, reject) => {
            buildfire.datastore.get("metrics", (err, data) => {
                if (err) reject(err);
                else resolve(data)
            });
        })  
    }
   
    getRowData() {
        if(this.type === 'metric') {
            return {
                title: this.title,
                icon: this.icon,
                min: this.min,
                max: this.max,
                value: this.value,
                action_item: this.action_item,
                type: this.type,
                parent_id: this.parent_id,
                history: this.history
            } 
        } else if(this.type === 'parent') {
            return {
                title: this.title,
                icon: this.icon,
                action_item: this.action_item,
                type: this.type,
                parent_id: this.parent_id,
            } 
        }
    }

    save() {
        let metric = this.getRowData();
        return new Promise((resolve, reject) => {
            buildfire.datastore.insert(metric, 'metrics', (err, data) => {
                if (err) reject(err);
                else resolve(data);
            });
        })
    }
   
    updateMetric() {
      // Update
      return new Promise((resolve, reject) => {
        let metric = this.getRowData();
        buildfire.datastore.update(this.id, metric, 'metrics', (err, data) => {
            if(err) reject(err);
            else resolve(data);
        })
      })
    }
   
    deleteMetric() {
        return new Promise((resolve, reject) => {
            buildfire.datastore.delete(this.id, 'metrics', (err, data) => {
                if(err) reject(err);
                else resolve(data);
            })
        })
    }
  }
  