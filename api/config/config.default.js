/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.keys = appInfo.name + "_1587821623955_3947";

  config.middleware = [];
  config.cors = {
    origin: ["http://localhost:8080"],
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH"
  };
  config.security = {
    csrf: {
      enable: false
    }
  };
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
