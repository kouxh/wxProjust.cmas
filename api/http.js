import httpClient from "./httpClient.js";
import config from "./config.js";

export default {
  //fetchPost  请求方式
  fetchPost: function (url, params, options, addUrl = "") {
    var that = this;
    return new Promise((resolve, reject) => {
      httpClient.fetchPost(url, params, that.getOptions(options), addUrl).then(
        response => {
          resolve(response);
          console.log(response,'9999997744477777777777')
          if (response.code == 9999) {
            wx.showToast({
              title: "登录过期，请重新登录",
              icon: "none"
            });
            wx.removeStorageSync('userInfoData');
            wx.removeStorageSync('bindPhone');
            return wx.reLaunch({ url: '/pages/login/index' })
          }
        },
        err => {
          // 返回错误内容
          that.errJumpFn(err);
          reject(err);
        }
      );
    });
  },

  //GET 请求方式
  
  fetchGet: function (url, params, options, addUrl = "") {
    var that = this;
    return new Promise((resolve, reject) => {
      console.log(resolve)
      httpClient.fetchGet(url, params, that.getOptions(options), addUrl).then (
        response => {
          resolve(response);
          console.log(response,'9999997777777777777')
          if (response.code == 9999) {
            wx.showToast({
              title: "登录过期，请重新登录",
              icon: "none"
            });
            wx.removeStorageSync('userInfoData');
            wx.removeStorageSync('bindPhone');
            return wx.reLaunch({ url: '/pages/login/index' })
          }
        },
        err => {
          // 返回错误内容
          that.errJumpFn(err);
          console.log(err, "err-----接口错误----------------");
          reject(err);
        }
      );
    });
  },

  // 配置请求头
  getOptions: function (options) {
    if (options == null) {
      options = {
        baseURL: config.getConfig(),
        headers: {
         'content-type': 'application/json', // 默认值
          // Authorization: wx.getStorageSync("Authorization"),
          // Platform: config.getPlatform(),
          token: wx.getStorageSync("userInfoData").token,
        //   DistributorAuth: wx.getStorageSync("distributorAuth").result
        //     ? wx.getStorageSync("distributorAuth").result
        //     : "",
        //   Environment: wx.getStorageSync("channeltoken")
        },
        timeout: 10000
      };
    }
    return options;
  },

  // 处理请求错误码
  errJumpFn(err) {
    console.log(err, "err-----接口错误----------------");
    // 999999406 店铺过期(演示)
    // if (err.status == 999999406) {
    //   wx.switchTab({ url: "/pages/scan/index" });
    // }
   
  }
};