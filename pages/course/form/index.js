const area = require('../../../utils/area.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    areaShow:false,
    areaList: Object.assign({}, area.default),
    areaStr: '', //选择的地址
    province_name:'',//省
    city_name:'',//市
    area_name:'',//区
    editorName: "", // 编辑 / 添加地址 昵称
    editorMobile: "", // 编辑 / 添加地址 手机号
    editorDetailed: "", // 编辑 / 添加地址 详细地址
    radio: '1',//是否开发票
    title: '',
    taxNumber: '',
    email:'',
    personName:'',
    tel:'',
    type:1,//1领取2开具发票
    detailId:'',//传出来的id
    backRouter:'',//返回路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'options')
    let that=this;
    that.setData({ 
      detailId: options.id,
      type:options.formType,
      backRouter:options.goBack,
    });
  },
//点击选择省市区
  areaFn(){
    this.setData({
      areaShow:true
    })
  },
  //点击遮罩层
  onClose(){
    this.setData({
      areaShow:false
    })
  },
//点击右上方完成按钮
  getArea: function(val) {
    console.log('getArea-- ',val)
    if (val.detail.values.length >= 3) {
      let areaStr = val.detail.values[0].name + '/' + val.detail.values[1].name + '/' + val.detail.values[2].name;
      this.setData({
        areaStr:areaStr,
        province_name:val.detail.values[0].name,
        city_name:val.detail.values[1].name,
        area_name:val.detail.values[2].name
      })
    }
    this.setData({
      areaShow:false
    })
  },
//选项改变时触发
  showArea: function(val) {
    console.log('showArea-- ',val)
  },
//点击关闭地址弹框
 colseArea: function() {
    console.log('colseArea-- ')
    this.setData({
      areaShow:false
    })
  },
  //领取杂志提交接口提交
  addressSubmitBtn(){
    let that=this;
    if (that.data.editorName == "") {
      return wx.showToast({ title: "请输入收件人姓名", icon: "none" });
    }
    if (
      !/^1[3-9]\d{9}$/.test(that.data.editorMobile) ||
      that.data.editorMobile == ""
    ) {
      return wx.showToast({ title: "请输入正确手机号", icon: "none" });
    }
    if (that.data.areaStr == "") {
      return wx.showToast({ title: "请选择省市区", icon: "none" });
    }
    if (that.data.editorDetailed == "") {
      return wx.showToast({ title: "请输入详细地址", icon: "none" });
    }
    getApp()
    .globalData.api.insertAddressVip({
      consignee: that.data.editorName,
      tell:that.data.editorMobile,
      desc_address:that.data.editorDetailed,
      uid:wx.getStorageSync("userInfoData").uid,
      city:that.data.province_name,
      area:that.data.city_name,
      county:that.data.area_name,
    })
    .then(res => {
      console.log(res,'收货地址------')
      if (res.bol) {
      wx.showToast({ title: res.data.msg, icon: "none" });
        setTimeout(() => {
          that.setData({
            type: 2, 
          });
         }, 2000);
      } else {
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    });
  },
  //开具发票提交接口按鈕
  submitBtn(){
    let that=this;
    // wx.chooseInvoiceTitle({
    //   success(res) {}
    // })
    if(that.data.radio=='1'){
      if(!/^[0-9a-zA-Z\(\)\（\）\u4e00-\u9fa5]{0,50}$/.test(that.data.title)||
      that.data.title == ""){
        return wx.showToast({ title: "请输入正确发票抬头", icon: "none" });
      }
      if(!/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(that.data.taxNumber)||that.data.taxNumber==""){
        return wx.showToast({ title: "请输入正确税号", icon: "none" });
      }
      if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(that.data.email)||that.data.email==""){
        return wx.showToast({ title: "请输入正确邮箱", icon: "none" });
      }
      if (that.data.personName == "") {
        return wx.showToast({ title: "请输入收件人姓名", icon: "none" });
      }
      if (
        !/^1[3-9]\d{9}$/.test(that.data.tel) ||
        that.data.tel == ""
      ) {
        return wx.showToast({ title: "请输入正确联系电话", icon: "none" });
      }
      getApp()
      .globalData.api.insertInvoiceVip({
        in_company_name:that.data.title,
        in_taxpayer_code:that.data.taxNumber,
        in_email:that.data.email,
        in_tell:that.data.tel,
        in_name:that.data.personName,
        in_uid:wx.getStorageSync("userInfoData").uid
      })
      .then(res => {
        if (res.bol) {
          wx.showToast({ title: res.data.msg, icon: "none" });
          if(that.data.backRouter==1){
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            },2000)
          }else{
            setTimeout(() => {
              // 将参数传回上一页
               const pages = getCurrentPages()
               const prevPage = pages[pages.length-3] // 上一页
               // 调用上一个页面的setData 方法，将数据存储
               prevPage.setData({
                 jump: true
               })
               // 返回上一页
               wx.navigateBack({
                 delta: 2
               })
             }, 2000);
          }
        } else {
          wx.showToast({ title: res.data.msg, icon: "none" });
        }
      });
    }else{
      if(that.data.backRouter==1){
        wx.navigateBack({
          delta: 1
        })
      }else{
         // 将参数传回上一页
         const pages = getCurrentPages()
         const prevPage = pages[pages.length-3] // 上一页
         // 调用上一个页面的setData 方法，将数据存储
         prevPage.setData({
           jump: true
         })
         // 返回上一页
         wx.navigateBack({
           delta: 2
         })
      }
      // that.formFinish();
    }
    
  },
  //单选切换
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },
   //表单填写完成 通知父级页面
   formFinish() {
  //  paySuccessPlus() {
    let that = this;
    const eventChannel = that.getOpenerEventChannel()
    eventChannel.emit('formFinish', { data: 'form' });
    // const eventChannel = that.getOpenerEventChannel()
    // eventChannel.emit('paySuccessPlus', { data: 'success' });
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

  },
   // 昵称 同步
   editorNameFn(e) {
    this.setData({
      editorName: e.detail.value
    });
  },

  // 手机号 同步
  editorMobileFn(e) {
    this.setData({
      editorMobile: e.detail.value
    });
  },

  // 详细地址 同步
  editorDetailedFn(e) {
    this.setData({
      editorDetailed: e.detail.value
    });
  },
  //发票抬头
  titleFn(e) {
    this.setData({
      title: e.detail.value
    });
  },
  //税号
  taxNumberFn(e) {
    this.setData({
      taxNumber: e.detail.value
    });
  },
   //邮箱
  emailFn(e) {
    this.setData({
      email: e.detail.value
    });
  },
  //联系人
  personNameFn(e) {
    this.setData({
      personName: e.detail.value
    });
  },
  //联系电话
  telFn(e) {
    this.setData({
      tel: e.detail.value
    });
  },
})