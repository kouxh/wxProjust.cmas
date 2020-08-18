// pages/course/plus/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: getApp().globalData.isIphoneX,
    repeatBool: true, // 防止重复请求
    payData: {}, // 支付配置参数
    detailId:0,//详情id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'optionssss')
    let that=this;
    that.setData({detailId:options.id });
  },
     // 点击立即支付
     goPayFn() {
      let that = this;
      let _this = this.data;
      that.setData({ repeatBool: false }); // 防止重复请求
      // 请求接口获取唤醒支付的参数
      getApp()
        .globalData.api.getPrepayId({
          uid: wx.getStorageSync('userInfoData').uid,
          vip: 2,//1打包 2 plus会员
        })
        .then(res => {
          // 得到支付需要的参数信息
          if (res.bol ==false) {
            that.setData({ repeatBool: true });
            return wx.showToast({ title: res.err_msg, icon: "none" });
          }
          that.setData({ payData: res.data });
          // 唤起支付弹框
            that.arousePayFn();
        });
    },
    // 唤起支付弹框
    arousePayFn() {
      let that = this;
      let payData = that.data.payData;
      console.log(payData,'888')
      wx.requestPayment({
        timeStamp: payData.timeStamp.toString(),
        nonceStr: payData.nonceStr,
        package: payData.package,
        signType: payData.signType,
        paySign: payData.sign,
        success(res) {
          console.log(res,'988888888')
          console.log(that.data.detailId,'that.data.detailId33')
          // wx.redirectTo({
          //   url: `/pages/course/detail/index?id=${that.data.detailId}`
          // });
          wx.navigateBack({
            delta: 1
          })
          that.paySuccessPlus();
        },
        fail(res) {
          console.log(res,'支付失败,请求重试')
          wx.showToast({ title: "支付失败,请求重试", icon: "none" });
        },
        complete(res) {
          that.setData({ repeatBool: true });
        }
      });
    },
  //支付成功 通知父级页面
  paySuccessPlus() {
      let that = this;
      const eventChannel = that.getOpenerEventChannel()
      eventChannel.emit('paySuccessPlus', { data: 'success' });
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