// pages/member/live/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad:false,
    // listData:[],//直播列表数据
    statu:1,//1 已报名 2 已学习 3 未学习
    liveListData:[],//直播列表数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLiveList();//直播列表
  },
   //直播列表
   getLiveList(){
    let that =this
    getApp()
    .globalData.api.getLiveList({
      uid:wx.getStorageSync("userInfoData").uid,
    })
    .then(res => {
      console.log(res,'---------------')
      if (res.bol) {
        that.setData({
          liveListData:res.data
        })
      } else {
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    });
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