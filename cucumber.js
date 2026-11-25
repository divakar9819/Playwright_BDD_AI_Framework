module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["src/support/**/*.ts", "src/steps/**/*.ts"],
    paths: ["src/features/**/*.feature"],
    format: ["progress", "html:reports/cucumber-report.html"],
    publishQuiet: true,
    parallel: 1,
    retry: 0
  }
};
