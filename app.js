//app.js
import api from "/api/api";
import { setStorage } from "utils/util";
App({
  globalData: {
    userInfo: null,
    api, //请求方法封装
    initializeCallbacks: [],
    isIphoneX: false, // 是否属于iPhone X系列
  },
  onLaunch: function () {
    let that = this;
    //获取用户本地是否是第一次进入新版本
    let bindPhone = wx.getStorageSync('bindPhone');
    let token = wx.getStorageSync('userInfoData').token
    let userInfoData=wx.getStorageSync('userInfoData');
    wx.clearStorageSync(); // 首次进入，清除缓存
    if (bindPhone) {
      setStorage('bindPhone', true, that);
      console.log(bindPhone,'8888')
    }
    // wx.setStorageSync('bindPhone', true);
    if(userInfoData){
      setStorage('userInfoData', userInfoData, that);
      // wx.setStorageSync('userInfoData', userInfoData);
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log( res.authSetting['scope.userInfo'],'9987722')
        if (res.authSetting['scope.userInfo'] && bindPhone && token!=undefined) {
          console.log( res.authSetting['scope.userInfo'],'9983377')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          // wx.switchTab({
          //   url: '/pages/course/index/index',
          //   })
        } else{
          wx.reLaunch({
            url: '/pages/login/index',
          })
         
        }
      }
    })
    // 判断是否是机型
    wx.getSystemInfo({
      success(res) {
        if (
          res.model.indexOf('iPhone X') != -1 ||
          res.model.indexOf('iPhone 11') != -1 ||
          res.model.indexOf('iPhone 12') != -1
        ) {
          that.globalData.isIphoneX = true;

        }
      }
    })
  },
})