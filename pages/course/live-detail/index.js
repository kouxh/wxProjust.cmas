// pages/course/live-detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: getApp().globalData.isIphoneX,
    status:1,//1立即报名2报名成功3观看直播4直播结束,
    liveDetailData:{},//直播详情数据
    detailId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({detailId:options.id });
    that.descDataFn();//获取直播信息
  },
   //获取直播信息
   descDataFn(){
    let that = this;
    getApp().globalData.api.getLiveDesc({
      id:that.data.detailId,
      uid:wx.getStorageSync('userInfoData').uid
    }).then(res=>{
      console.log(res,'8888')
      if(res.bol==true){
        that.setData({
          liveDetailData: res.data
        });
      }else{
        wx.showToast({ title: "获取数据失败,请稍后重试~", icon: "none" });
      }
    })
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