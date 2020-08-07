    
    
// 使用import config from "./config.js";
module.exports = {
    // 是否线上环境 true正式 false测试
    isRelease() {
      return true;
    },
  
    // api请求域名
    getConfig() {
      if (this.isRelease()) {
        //正式
        return "https://www.chinamas.cn/";
      } else {
        //测试
        return "http://test.chinamas.cn/";
      }
    },
    // 平台标识
    getPlatform() {
      if (this.isRelease()) {
        //正式
        return "jymiuL89jScRht4TR0e6EQ%3d%3d";
      } else {
        //测试
        return "NzyqXG1iMSg%2fwM3cQmk9Wg%3d%3d";
      }
    }
  };