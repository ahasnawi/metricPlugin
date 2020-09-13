class Metric {
  constructor(data = {}) {
    this.id = data.id || helpers.uuidv4();
    this.title = data.title || "";
    this.icon = data.icon || "";
    this.min = data.min || 0;
    this.max = data.max || 0;
    this.value = data.value || 0;
    this.actionItem = data.actionItem || {};
    this.type = data.type || "";
    this.pointer = data.pointer || "metrics";
    this.order = data.order || null;
    this.history = [
      {
        value: data.value || 0,
        createdOn: data.createdOn || null,
        createdBy: data.createdBy || null,
        lastUpdatedOn: data.lastUpdatedOn || null,
        lastUpdatedBy: data.lastUpdatedBy || null,
      },
    ];
    this.createdOn = data.createdOn || null;
    this.createdBy = data.createdBy || null;
    this.lastUpdatedOn = data.lastUpdatedOn || null;
    this.lastUpdatedBy = data.lastUpdatedBy || null;
  }
  getHistory() {}
  addHistory(value) {
    const historyPointer = `${this.pointer}.${this.id}.history`;
    addMetricHistory(historyPointer, value)
      .then(() => {
        // TODO: check if this step is needed
        this.value = value;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
