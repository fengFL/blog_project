/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1630885096874_9370';

  // add your middleware config here
  config.middleware = [
  ];
  // 允许跨域
  config.security = {
    csrf: { enable: false },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: ctx => ctx.get('origin'),
    credentials: true, // 设置可以共享cookies
    allowMethods: 'GET,POST,PUT,UPDATA,DELETE,PATCH,OPTIONS,HEAD'
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.session = {
    key: 'mysession',
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    encrypt: true,
  }
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'liufeng123456',
      database: 'react_blog'
    },
    app: true,
    agent: false,
  }

  return {
    ...config,
    ...userConfig,
  };
};
