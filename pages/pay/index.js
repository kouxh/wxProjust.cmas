// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activePay: 0, // '选中支付方式'的下标
    payType: [{
      type: 1,
      name: "微信支付",
      icon: "wechat",
      color: "#09bb07",
      ban: false
    },
    {
      type: 2,
      name: "余额支付",
      icon: "card",
      color: "#148cdc",
      ban: false
    }
  ], // 支付方式列表
  balanceNum: 1000, // 余额
  isIphoneX: getApp().globalData.isIphoneX,
  repeatBool: true, // 防止重复请求
  payData: {}, // 支付配置参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择支付方式
  selectPayFn(e) {
    let index = e.currentTarget.dataset.index;
    if (this.data.payType[index].ban) {
      return wx.showToast({ title: "余额不足，请更换支付方式", icon: "none" });
    }
    this.setData({ activePay: index });
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
          lookingid: 1,//lookingid 单期回放，liveid 单期直播，alllooking 所有回看，alllive 所有直播 值都等于1
          // store_id: wx.getStorageSync("ext").store_id,
          // payment_type: _this.payType[_this.activePay].type,
        })
        .then(res => {
          // 得到支付需要的参数信息
          if (res.bol ==false) {
            that.setData({ repeatBool: true });
            return wx.showToast({ title: res.err_msg, icon: "none" });
          }
          that.setData({ payData: res.data });

          // 判断支付方式 
          if(_this.payType[0].type==1){
          //     // 唤起支付弹框
            that.arousePayFn();
          }else{
            // 余额支付 请求余额的接口

          }
          
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
        // {errMsg: "requestPayment:ok"} "988888888"
        // wx.redirectTo({
        //   url: `/pages/pay/success/index?orderId=${payData.id}&payMoney=${that.data.pay_money}`
        // });
        that.paySuccessEvent();
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
  paySuccessEvent() {
    let that = this;
    const eventChannel = that.getOpenerEventChannel()
    eventChannel.emit('paySuccessEvent', { data: 'success' });
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