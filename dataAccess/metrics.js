let metrics = {};

function getMetrics() {
  return new Promise((resolve, reject) => {
    buildfire.publicData.get("metrics", (err, data) => {
      if (err) reject(err);
      else {
        if (!data.data.metrics) {
          initializeParentObject().then((result) => {
            resolve(result);
          });
        }
        metrics = data;
        resolve(data);
      }
    });
  });
}

function save(metric) {
  metric.createdOn = new Date();
  metric.lastUpdatedOn = new Date();

  return new Promise((resolve, reject) => {
    buildfire.publicData.update(
      metrics.id,
      { $set: { [`${metric.pointer}.${metric.id}`]: metric } },
      "metrics",
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      }
    );
  });
}

function update() {
  return new Promise((resolve, reject) => {
    buildfire.publicData.update(this.id, metric, "metrics", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function deleteMetric() {
  return new Promise((resolve, reject) => {
    buildfire.publicData.delete(this.id, "metrics", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

const metric = new Metric({
  title: "child2",
  icon: "child2",
  pointer: "metrics.5f5aa18e29d8c57a4b0d38e9.metrics",
  min: 100,
  max: 0,
  value: 50,
  action_item: {},
  type: "metric",
});

function initializeParentObject() {
  return new Promise((resolve, reject) => {
    buildfire.publicData.save({ metrics: {} }, "metrics", (err, data) => {
      if (err) reject(err);
      else {
        resolve(data);
        metrics = { metrics: {} };
      }
    });
  });
}

getMetrics().then((data) => {
  save(metric).then((res) => {
    console.log("Saved Data", res);
  });
  console.log("ALL DATA", data);
});

// save(metric)
//   .then((data) => {
//     console.log("data", data);
//   })
//   .catch((err) => {
//     console.log("err", err);
//   })
//   .finally(() => {
//     getMetrics().then((data) => {
//       console.log("All metrics", data);
//     });
//   });
