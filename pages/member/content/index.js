//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0, // tab栏1'选中项'
    collectionList: [],//收藏数据
    commentList:[],//评论数据
    listShowType: 0, // 列表显示状态 0加载中 1有2无

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.collectionListFn();
  },
  // 切换tab栏
  tabFn(event) {
    this.setData({
      active: event.detail.index,
      listShowType: 0,
    });
    if(this.data.active==1){
      this.commentListFn();
    }else{
      this.collectionListFn();
    }
    wx.pageScrollTo({ scrollTop: 0 })
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
   // 获取我的评论列表
   commentListFn(){
    let that=this;
    getApp()
        .globalData.api.getUserCommentList({
          uid:wx.getStorageSync('userInfoData').uid
        })
        .then(res => {
          if (res.bol == true){
            that.setData({
              commentList: res.data,
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