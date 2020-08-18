const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    hasBindMobile:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    encryptedInfo:'',
    ivInfo:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  // 微信授权
  getUserInfo: function (e) {
    if(e.detail.userInfo){
       //用户按了允许授权按钮
       wx.showToast({
        title: '授权成功',
        icon: 'success',
        duration: 1000
      })
       app.globalData.userInfo = e.detail.userInfo
      //  wx.setStorageSync('userinfoData', e.detail.userInfo)
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        hasBindMobile:true,
        encryptedInfo: e.detail.encryptedData,//用户授权的加密数据
        ivInfo: e.detail.iv,//用户授权的iv
      })
      console.log(this.data.hasBindMobile,'0000this.data.hasBindMobile')
    }else{
       //用户按了拒绝按钮
       wx.showModal({
         title:'警告',
         content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
         showCancel: false,
         confirmText: '返回授权',
         success: function(res) {
          if (res.confirm) {
              console.log('用户点击了“返回授权”');
          }
      }

       })
    }
    
   
  },
  // 手机号授权
  getPhoneNumber (e) {
    console.log(e,'888')
      let that = this;
    if (e.detail.encryptedData) {
      wx.setStorageSync('bindPhone', true)
      //用户点击允许
      wx.login({
        success(res) {
          var datas = {
            code:res.code,
            encryptedDataInfo: that.data.encryptedInfo,
            ivInfo: that.data.ivInfo,
            encryptedDataPhone: e.detail.encryptedData,
            ivPhone: e.detail.iv,
          };

          var jsonStr = JSON.stringify(datas)
          wx.showLoading({
            title: "登录中...",
            mask: true
          });
          // 小程序授权绑定手机号接口成功之后弹框消失
          getApp()
            .globalData.api.login({json:jsonStr})
            .then(res1 => {
              console.log(res1,'66666')
              if(!res1.bol){
                    wx.showToast({
                      title: "绑定失败",
                      icon: "none"
                    });
              }else{
                  wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000
                });
                wx.setStorageSync('userInfoData', res1.data)
                // wx.setStorageSync('token', res1.data.token)
                wx.hideLoading();
                wx.switchTab({
                  url: "/pages/course/index/index"
                })
              }
             
            });
        }
      });
    } else {
      //用户点击拒绝
      wx.showModal({
        title:'警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
         if (res.confirm) {
             console.log('用户点击了“返回授权”');
         }
     }

      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          hasBindMobile:true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    let token = wx.getStorageSync('userInfoData').token
    if(!this.data.hasBindMobile && token){
      wx.switchTab({
        url: "/pages/course/index/index"
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})