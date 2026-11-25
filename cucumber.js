
require("dotenv").config();

module.exports = {
  default: {
    requireModule: ["tsx/cjs"],

    require: ["src/**/*.ts"],

    paths: ["src/features/**/*.feature"],

    format: [
      "progress",
      "html:reports/cucumber-report.html",
      "json:reports/cucumber-report.json"
    ],

    parallel: Math.max(
      1,
      Number.parseInt(
        process.env.CUCUMBER_PARALLEL || "2",
        10
      ) || 2
    ),

    retry: 0,

    publishQuiet: true
  }
};
