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
    url:"https://dkt.yuanian.com/",
    isLoad:true,//是否需要加载
    shareShow: false, // 是否显示'按钮弹出层'
    posterShow: false, // 是否显示'分享海报'弹出层
    styleData: {
      canvasW: 0, // 画布宽
      canvasH: 0, // 画布高
      imgW: 0, // 图片宽
      imgH: 0 // 图片高
    }, // 画布的样式
    loadStep: 0, // 加载进度 0加载中 1加载成功 2加载失败
    imgtextImgBase64: "", // 商品海报的图片的Base64
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
          liveDetailData: res.data,
          isLoad:false
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
        if(res.data.status=="已报名" && (liveStatus==1 || liveStatus==0)){
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
      if(res.bol==true){
        wx.showToast({ title: res.data.msg, icon: "none" });
        that.setData({
          status:2,
          statusName: "报名成功"
        });
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
        wx.navigateTo({ url: "/pages/member/index/index" });
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
  // 选择分享方式
  shareShowFn() {
    let that = this;
    let _this = this.data;
    console.log('99')
    this.setData({
      shareShow: !_this.shareShow
    });
  },
  // 显示海报弹出层
   posterShowFn() {
    this.setData({
      posterShow: !this.data.posterShow
    });
  },
    // 图片生成并加载完成
    loadStepImgFn() {
      this.setData({
        loadStep: 1
      });
    },
      // 点击放大图片
      amplifyFn(e) {
        let imgUrl = e.currentTarget.dataset.imgurl;
        if (imgUrl) {
          wx.previewImage({
            urls: [imgUrl]
          });
        } else {
          wx.previewImage({
            urls: [this.data.imgtextImgBase64]
          });
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