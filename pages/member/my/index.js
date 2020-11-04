const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    vipType:0,//会员类型
    replyNum:0,//评论数
    noticeState:0,//站内信状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'0000--------------------------------')
    let that= this;
    let token = wx.getStorageSync('userInfoData').token;
    console.log(token,'-------------------------')
     // 查看是否授权
     wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.userInfo'] || token==undefined) {
          //未登录,跳转到登录页
          wx.reLaunch({
            url: '/pages/login/index',
          })
        }else{
          //判断是否是VIP
          that.checkUserVip();
          //获取用户评论之后作者回复数量
          that.getReplyNumApi();
        }
      }
     })
     
     
  },

  /**点击底部tab */
  onTabItemTap(item) {
  },
  //获取用户评论之后作者回复数量
  getReplyNumApi(){
    let that=this;
    getApp()
      .globalData.api.getReplyNumApi({
        uid:wx.getStorageSync('userInfoData').uid
      }).then(res=>{
        if (res.bol == true){
          that.setData({
            replyNum:res.data.num,
          })
        }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
        }
  })
  },
  //获取站内信状态
  getPayMail(){
    let that=this;
    getApp()
      .globalData.api.getPayMail({
        uid:wx.getStorageSync('userInfoData').uid
      }).then(res=>{
        if (res.bol == true){
          that.setData({
            noticeState:res.data.num,
          })
        }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
        }
  })
  },
  //修改用户站内信状态为已读
  upUserMailStatus(){
    let that=this;
    getApp()
      .globalData.api.upUserMailStatus({
        uid:wx.getStorageSync('userInfoData').uid
      }).then(res=>{
        if (res.bol == true){
          if(res.data.status=="已读")
          that.setData({
            noticeState:0,
          })
        }else{
        wx.showToast({ title: res.data.msg, icon: "none" });
        }
  })
  },
  //判断是否是VIP
  checkUserVip(){
    let that=this;
    getApp()
      .globalData.api.checkUserVip({
        uid:wx.getStorageSync('userInfoData').uid
      }).then(res=>{
        if (res.bol == true){
          that.setData({
            vipType:res.data.is_vip,
          })
        }else{
        wx.showToast({ title: "获取数据失败，请稍后重试哟~", icon: "none" });
        }
   })
  },
  //跳转到plus会员
  plusFn:function(e){
    wx.navigateTo({
      url: `/pages/course/plus/index?page=my`,
    })
  },
  //点击跳转到我的课程
  courseFn:function(e){
    wx.navigateTo({
      url: '/pages/member/live/index',
    })
  },
  //跳转到邮寄地址页
  goForm:function(e){
    // wx.navigateTo({
    //   url: `/pages/course/form/index?type=true`,
    // })
    wx.navigateTo({
      url: `/pages/member/address/index`,
    })
  },
  //跳转到发票页面
  formRouter:function(event){
    // wx.navigateTo({
    //   url: `/pages/course/form/index?formType=2&goBack=1`,
    // })
    wx.navigateTo({
      url: `/pages/member/invoice/index`,
    })
  },
  //点击跳转到站内信
  notice:function(e){
    if(this.data.noticeState==0){
      wx.showToast({ title: "暂无站内通知", icon: "none" });
    }else{
      wx.navigateTo({
        url: `/pages/member/notice/index`,
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
    //获取站内信状态
    this.getPayMail();
    //判断是否是VIP
    this.checkUserVip();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(this.data.userInfo,'9999')
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (this.data.comment) {
     //获取用户评论之后作者回复数量
      this.getReplyNumApi();
      this.data.comment = null;
    }
    
    if(this.data.confirm){
      //修改用户站内信状态为已读
      this.upUserMailStatus();
      this.data.confirm = null;
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