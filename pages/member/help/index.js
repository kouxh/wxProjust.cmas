// pages/member/help/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen:false,
    isOpen1:false,
    isOpen2:false,
    isOpen3:false,
    isOpen4:false,
    isOpen5:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  openFn(){
    this.setData({
      isOpen:!this.data.isOpen
    })
  },
  openFn1(){
    this.setData({
      isOpen1:!this.data.isOpen1
    })
  },
  openFn2(){
    this.setData({
      isOpen2:!this.data.isOpen2
    })
  },
  openFn3(){
    this.setData({
      isOpen3:!this.data.isOpen3
    })
  },
  openFn4(){
    this.setData({
      isOpen4:!this.data.isOpen4
    })
  },
  openFn5(){
    this.setData({
      isOpen5:!this.data.isOpen5
    })
  },
    // 兼容ios下拉
    onPageScroll:function(e){
      if(e.scrollTop<0){
        wx.pageScrollTo({
          scrollTop: 0
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