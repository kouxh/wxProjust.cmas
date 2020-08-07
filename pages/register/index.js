const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: "", // 手机号
    validate: "", // 验证码
    initialCount: 60, // 倒计时秒数
    count: 60, // 倒计时秒数
    isReset: false, // 是否重置'倒计时'
    sendState: 0, // '验证码发送'按钮的状态 0待发送 1发送中 2倒数时中 3重新发送
    logonState: 0 // '登录按钮'的状态 0可登录 1登录中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
    // 检查手机号是否已注册
    isExistFn() {
      let that = this;
      // 验证手机号
      var p1 = /^1\d{10}$/;
      if (p1.test(that.data.mobile) == false) {
        return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
      }
      this.setData({ sendState: 1 });
      var phoneurl = 'https://www.chinamas.cn/code';
      wx.request({
        //上线接口地址要是https测试可以使用http接口方式
         url: phoneurl,
         data: {
          phone:this.data.mobile
         },
         method: 'GET',
         header: {
          'content-type': 'application/json',
          'mode': 1
         },
         success: function (res) {
          console.log(res,'7777777777')
        if (res.code == 9999) {
            this.countDownFn();
          } else {
            this.setData({ sendState: 3 });
            wx.showToast({ title: res.msg, icon: "none" });
          }
         },
        })
      
    },

    // 发送验证码
    // sendFn() {
    //   // getApp()
    //   //   .globalData.api.code({
    //   //     phone: this.data.mobile,
    //   //   })
    //   //   .then(res => {
    //   //     console.log(res,'33333333333')
    //   //     // if (res.code == 200 && res.response.success) {
    //   //     //   this.countDownFn();
    //   //     // } else {
    //   //     //   this.setData({ sendState: 3 });
    //   //     //   wx.showToast({ title: res.msg, icon: "none" });
    //   //     // }
    //   //   });
    //   // var phoneurl = 'https://www.chinamas.cn/code';
    //   // wx.request({
    //   //   //上线接口地址要是https测试可以使用http接口方式
    //   //    url: phoneurl,
    //   //    data: {
    //   //     phone:this.data.mobile
    //   //    },
    //   //    method: 'GET',
    //   //    header: {
    //   //     'content-type': 'application/json',
    //   //     'mode': 2
    //   //    },
    //   //    success: function (res) {
    //   //     console.log(res,'7777777777')
    //   //   if (res.code == 9999) {
    //   //       this.countDownFn();
    //   //     } else {
    //   //       this.setData({ sendState: 3 });
    //   //       wx.showToast({ title: res.msg, icon: "none" });
    //   //     }
    //   //    },
    //   //   })
     
    // },

    // 倒计时
    countDownFn() {
      let that = this;
      let _this = this.data;
      this.setData({ sendState: 2 });
      var timer = null;
      let countN = that.data.count;
      timer = setInterval(function() {
        countN--;
        that.setData({ count: countN });
        if (countN <= 0||_this.isReset) {
          that.setData({
            count: _this.initialCount,
            sendState: 3,
            isReset:false
          });
          clearInterval(timer);
        }
      }, 1000);
    },

    // 绑定手机号
    getUserInfo: function (e) {
      console.log(e,'0000')
      // let that = this;
      // // --- 验证手机号
      // var p1 = /^1\d{10}$/;
      // if (p1.test(that.data.mobile) == false) {
      //   return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
      // }
      // if (this.data.validate == "") {
      //   return wx.showToast({ title: "请输入验证码", icon: "none" });
      // }
      // // // --- 绑定新手机号
      // that.setData({ logonState: 1 });
      // wx.showLoading({title: '登录中...',mask:true})
      // getApp()
      //   .globalData.api.bangTell({
      //     tell: that.data.mobile,
      //     code: that.data.validate
      //   })
      //   .then(res => {
      //     if (res.bol != true) {
      //       that.setData({
      //         logonState: 0,
      //         isReset: true
      //       });
      //       return wx.showToast({ title: res.msg, icon: "none" });
      //     }
      //   });
      
        if(e.detail.userInfo){
           //用户按了允许授权按钮
           app.globalData.userInfo = e.detail.userInfo
           this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
          console.log(app.globalData.userInfo,'999')

        }else{
           //用户按了拒绝按钮
          //  绑定手机号
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

    // 手机号内容同步
    mobileFn(e) {
      this.setData({ mobile: e.detail.value });
    },

    // 验证码内容同步
    validateFn(e) {
      this.setData({ validate: e.detail.value });
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