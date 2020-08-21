import {liveStatusFn,dateFormat} from "../../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: getApp().globalData.isIphoneX,
    status:1,//1立即报名2报名成功3观看直播4直播结束
    statusName:"立即报名",
    liveDetailData:{},//直播详情数据
    detailId:0,
    url:"https://dkt.yuanian.com/"
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
      if(res.bol==true){
        that.setData({
          liveDetailData: res.data
        });
        if(res.data.status=="未报名"){
          that.setData({
            status:1,
            statusName: "立即报名"
          });
        }else if(res.data.status=="已报名"){
          that.setData({
            status:2,
            statusName: "报名成功"
          });
        }
        let liveStatus;
        let nowTime = dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
        liveStatus = liveStatusFn(
          nowTime,
          res.data.start_at,
          res.data.end_at,
        );
        console.log(liveStatus,'666666666')
        if(liveStatus==1 || liveStatus==0){
          that.setData({
            status:3,
            statusName: "观看直播"
          });
        }else if(liveStatus==2){
          that.setData({
            status:4,
            statusName: "直播已结束"
          });
        }
      }else{
        wx.showToast({ title: "获取数据失败,请稍后重试~", icon: "none" });
      }
    })
  },
  
  //点击立即报名
  getUserSignUp(){
    let that = this;
    getApp().globalData.api.getUserSignUp({
      lid:that.data.detailId,
      uid:wx.getStorageSync('userInfoData').uid
    }).then(res=>{
      console.log(res,'99933339999999')
      if(res.bol==true){
        wx.showToast({ title: res.data.msg, icon: "none" });
      }else{
        wx.showToast({ title: "获取数据失败,请稍后重试~", icon: "none" });
      }
    })
  },
  // 立即报名
  applyFn(){
    if(this.data.liveDetailData.userInfo=="0" && this.data.liveDetailData.status=="未报名"){
      wx.showToast({ title: "请先完善个人信息哟~", icon: "none" });
      setTimeout(() => {
        wx.switchTab({ url: "/pages/member/index/index" });
      }, 2000);
    }else if((this.data.liveDetailData.status=="未报名"|| this.data.liveDetailData.status=="已报名")&&this.data.liveDetailData.userInfo=="1"){
      this.getUserSignUp();
    }
  },
  //观看直播
  lookFn(){
    wx.navigateTo({
      url:`/pages/course/outsideurl/url?link=${this.data.url}` //
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