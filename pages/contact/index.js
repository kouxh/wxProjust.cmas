// pages/contact/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactPhone:'400-819-1255',
    isShow: true, // 是否显示'公众号'组件

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 加载'成功'时
  successFn() {
    console.log("11111111111");
    this.setData({
      isShow: true,
    });
  },

  // 加载'失败'时
  errorFn(e) {
    console.log(e, "22222222222");
    // wx.showToast({ title: e.detail.errMsg, icon: "none" });
    this.setData({
      isShow: false,
    });
  },
  //电话调用
  makePhoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.contactPhone,
      success:function(){
        console.log('拨打成功')
      },
      fail:function(){
        console.log('拨打失败')
      }
    })
  },
  // //邮箱调用
  // sendEmail:function(){
  //   wx.showActionSheet({
  //     itemList: ['edit@chinamas.cn'],
  //     success (res) {
  //       console.log(res.tapIndex)
  //     },
  //     fail (res) {
  //       console.log(res.errMsg)
  //     }
  //   })
   
  // },
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