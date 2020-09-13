class MetricsDAO {
  constructor() {
    this.metrics = {};
  }

  static getMetrics() {
    return new Promise((resolve, reject) => {
      buildfire.publicData.get("metrics", (err, data) => {
        if (err) reject(err);
        else {
          // Check if there is already objects in the database
          if (!data.data.metrics) {
            // If there is no object, then create the parent object
            buildfire.publicData.save(
              { metrics: {} },
              "metrics",
              (err, result) => {
                if (err) reject(err);
                else {
                  MetricsDAO.getMetrics();
                  resolve(result);
                }
              }
            );
          } else {
            this.metrics = data;
            resolve(data);
          }
        }
      });
    });
  }

  static save(metric) {
    metric.createdOn = new Date();
    metric.lastUpdatedOn = new Date();

    return new Promise((resolve, reject) => {
      buildfire.publicData.update(
        this.metrics.id,
        { $set: { [`${metric.pointer}.${metric.id}`]: metric } },
        "metrics",
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }

  static update(updateObject) {
    return new Promise((resolve, reject) => {
      buildfire.publicData.update(
        this.metrics.id,
        { $set: updateObject },
        "metrics",
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }

  static delete(metric) {
    return new Promise((resolve, reject) => {
      buildfire.publicData.update(
        this.metrics.id,
        {
          $unset: {
            [`${metric.pointer}.${metric.id}`]: "",
          },
        },
        "metrics",
        (err, data) => {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
  }
}

// let newMetric = new Metrics();

const metric = new Metric({
  id: "5f5e38f564fb6d379babba90",
  title: "tyu",
  icon: "tyu",
  pointer: "metrics.5f5e33894cd39ab4948c4914.metrics",
  min: 45,
  max: 87,
  value: 78,
  action_item: {},
  type: "parent",
});

// Metrics.getMetrics().then((data) => {
//   // save(metric).then((res) => {
//   //   console.log("Saved Data", res);
//   // });
//   // deleteMetric().then(() => {
//   //   getMetrics().then((data) => {
//   console.log("ALL DATA after Delete", data);
//   //   });
//   // });
// });
// setTimeout(() => {
//   newMetric
//     .save(metric)
//     .then((data) => {
//       console.log("data", data);
//     })
//     .catch((err) => {
//       console.log("err", err);
//     })
//     .finally(() => {
//       newMetric.getMetrics().then((data) => {
//         console.log("All metrics", data);
//       });
//     });
// }, 5000);

// function deleteMet() {
//   return new Promise((resolve, reject) => {
//     buildfire.publicData.delete(
//       "5f5d511072fd48066a24fd8a",
//       "metrics",
//       (err, data) => {
//         if (err) reject(err);
//         else resolve(data);
//       }
//     );
//   });
// }

// deleteMet().then((data) => {
//   console.log("DATA DELETED", data);
// });

MetricsDAO.getMetrics().then((data) => {
  // newMetric.update(metric, "value").then(() => {
  //   newMetric.getMetrics().then((data) => {
  //     console.log("ALL DATA after Delete", data);
  //   });
  // });
  console.log("ALL DATA", data);
});
