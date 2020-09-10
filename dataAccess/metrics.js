function getMatrics() {
  return new Promise((resolve, reject) => {
    buildfire.publicData.get("metrics", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function save(metric) {
  metric.createdOn = new Date();
  metric.lastUpdatedOn = new Date();
  return new Promise((resolve, reject) => {
    buildfire.publicData.insert(metric, "metrics", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
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
