
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactPhone:'400 819 1255',
    isShow: true, // 是否显示'公众号'组件
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 查看是否授权
    // wx.getSetting({
    //   success: function (res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       //未登录,跳转到登录页
    //       wx.reLaunch({
    //         url: '/pages/login/index',
    //       })
    //     }
    //   }
    // })
      
  },
   /**点击底部tab */
   onTabItemTap(item) {
    if (item.index == 1) {
      // 查看是否授权
      // wx.getSetting({
      //   success: function (res) {
      //     if (!res.authSetting['scope.userInfo']) {
      //       //未登录,跳转到登录页
      //       wx.reLaunch({
      //         url: '/pages/login/index',
      //       })
      //     }
      //   }
      // })
  }
    

  },
  // 加载'成功'时
  successFn() {
    this.setData({
      isShow: true,
    });
  },

  // 加载'失败'时
  errorFn(e) {
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