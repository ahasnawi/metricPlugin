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

  getHistory() {
    const data = {
      metrics: {
        met1: { history: [] },
        met2: { history: [] },
        mat3: {
          metrics: {
            met1: { history: [] },
            met2: { history: [] },
          },
        },
      },
    };

    for (let key in data.metrics) {
      if (metrics[key].type === "metric") {
        metrics[key].value =
          metrics[key].history[metrics[key].history.length - 1];
      } else {
        // do recurrsion
      }
    }
  }

  addHistory(value) {
    const historyPointer = `${this.pointer}.${this.id}.history`;
    MetricsDAO.addMetricHistory(historyPointer, value)
      .then(() => {
        // TODO: check if this step is needed
        this.value = value;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

setTimeout(() => {
  new Metric({
    id: "5f5aa167ad0a6280de4773a7",
    actionItem: {},
    createdBy: null,
    createdOn: "2020-09-10T21:57:59.951Z",
    history: [
      {
        value: 50,
        createdOn: null,
        createdBy: null,
        lastUpdatedOn: null,
        lastUpdatedBy: null,
      },
    ],
    icon: "metric1",
    lastUpdatedBy: null,
    lastUpdatedOn: "2020-09-10T21:57:59.951Z",
    max: 0,
    min: 100,
    order: null,
    pointer: "metrics",
    title: "metric1",
    type: "metric",
    value: 50,
  }).addHistory(20);
}, 2000);
