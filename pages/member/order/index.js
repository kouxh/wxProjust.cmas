// pages/member/my-order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[],
    listShowType:0,//0加载 1 有数据 2 无数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderListFn();//获取订单列表数据
  },
  //获取订单列表数据
   getOrderListFn(){
    let that=this;
    getApp()
        .globalData.api.getOrderList({
          uid:wx.getStorageSync('userInfoData').uid
        })
        .then(res => {
          console.log(res,'order')
          if (res.bol == true){
            that.setData({
              orderList: res.data,
              listShowType: res.data.length>0 ? 1 : 2
            });
          }else{
           wx.showToast({ title: "获取数据失败,请稍后重试哟~", icon: "none" });
          }
           
        });
  },
  //邮寄地址
  getAddress:function(e){
    var orderNum = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: `/pages/member/address-list/index?orderNum=${orderNum}`
    })
  },
  //开具发票
  geInvoice:function(e){
    var orderNum = e.currentTarget.dataset.order;
    wx.navigateTo({
      url: `/pages/member/invoice/index?orderNum=${orderNum}`
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
    if (this.data.addressData) {
      this.gainRessListFn();
      this.data.addressData = null;
    }
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