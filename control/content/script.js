class Metric {
    constructor(data = {}) {
      this.id = data.id || "";
      this.title = data.title || "";
      this.icon = data.icon || "";
      this.min = data.min || 0;
      this.max = data.max || 0;
      this.value = data.value || 0;
      this.action_item = data.action_item || {};
      this.type = data.type || "";
      this.parent_id = data.parent_id || "";
      this.createdOn = data.createdOn || new Date();
      this.history = [{ date: new Date(), value: data.value || 0 }];
    }

    static getMatrics() {
      return new Promise((resolve, reject) => {
        buildfire.datastore.search({ filter:null, skip: 0, limit:null, sort:{type: 1}}, "metrics", (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    }
    getRowData() {
      let data = {};
      if (this.type === "metric") {
        data = {
          title: this.title,
          icon: this.icon,
          min: this.min,
          max: this.max,
          value: this.value,
          action_item: this.action_item,
          type: this.type,
          parent_id: this.parent_id,
          history: this.history,
        };
      } else if (this.type === "parent") {
        data = {
          title: this.title,
          icon: this.icon,
          action_item: this.action_item,
          type: this.type,
          parent_id: this.parent_id,
        };
      }
      return data;
    //   return {
    //     ...data,
    //     _buildfire: {
    //       index: {
    //         string1: this.parent_id,
    //         date1: this.createdOn,
    //         text: this.title,
    //       },
    //     },
    //   };
    }
    save() {
      let metric = this.getRowData();
      return new Promise((resolve, reject) => {
        buildfire.datastore.insert(metric, "metrics", (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    }
    updateMetric() {
      // Update
      return new Promise((resolve, reject) => {
        let metric = this.getRowData();
        buildfire.datastore.update(this.id, metric, "metrics", (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    }
    deleteMetric() {
      return new Promise((resolve, reject) => {
        buildfire.datastore.delete(this.id, "metrics", (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      });
    }
  }
  const me = new Metric({
    title: "gdtr",
    icon: "dfhgfjj",
    min: 456,
    max: 123,
    value: 435435,
    action_item: {},
    type: "metric",
    parent_id: "asdaf",
  });
  console.log(me.getRowData());
  me.save()
    .then((data) => {
      console.log("Saved Data", data);
    })
    .catch((err) => console.log(err));
    console.log(me.getRowData());

  setTimeout(() => {
    Metric.getMatrics()
      .then((data) => {
        console.log("Retrived Data", data);
      })
      .catch((err) => console.log(err));
  }, 3000);

  
  