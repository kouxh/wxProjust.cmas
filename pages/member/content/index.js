//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList: [],//收藏数据
    listShowType: 0, // 列表显示状态 0加载中 1有2无

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.collectionListFn();
  },
   // 兼容ios下拉
   onPageScroll:function(e){
    if(e.scrollTop<0){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  // 获取我的收藏列表
  collectionListFn(){
    let that=this;
    getApp()
        .globalData.api.collectionList({
          uid:wx.getStorageSync('userInfoData').uid
        })
        .then(res => {
          if (res.bol == true){
            that.setData({
              collectionList: res.data,
              listShowType: res.data.length>0 ? 1 : 2
            });
          }else{
           wx.showToast({ title: "获取数据失败,请稍后重试哟~", icon: "none" });
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