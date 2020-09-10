class Helper {
  static get EVENTS() {
    return {
      METRIC_CRETAED: "METRIC_CRETAED",
      METRIC_UPDATED: "METRIC_UPDATED",
      METRIC_DELETED: "METRIC_DELETED",
    };
  }

  static trackAction(key, aggregationValue) {
    let metData = {};
    if (aggregationValue) {
      metData._buildfire = { aggregationValue };
    }
    buildfire.analytics.trackAction(key, metData);
  }
}
