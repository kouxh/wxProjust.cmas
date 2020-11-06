// pages/member/notice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',//用户名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:wx.getStorageSync('userInfoData').account
    })
  },
  //点击确认按钮
  confirm(){
    wx.navigateBack({
      delta: 1
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
    let pages = getCurrentPages() //获取当前页面栈的信息
    let prevPage = pages[pages.length - 2] //获取上一个页面
    prevPage.setData({ //把需要回传的值保存到上一个页面
      confirm: "succeed"
    });
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