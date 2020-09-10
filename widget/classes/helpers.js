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

  static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
