Page({
  /**
   * 页面的初始数据
   */
  data: {
    // radio: '1',//是否开发票
    title: '',
    taxNumber: '',
    email:'',
    personName:'',
    tel:'',
    // type:1,//1领取2开具发票
    isLoad:true,//是否加载
    invoiceId:'',//发票id
    orderNum:'',//订单编号
    inId:'',//发票id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'options')
    let that=this;
    that.setData({
      orderNum:options.orderNum
    })
    that.getInvoiceApi();//获取发票信息
  },
  //获取发票信息
  getInvoiceApi(){
    let that=this;
    getApp()
    .globalData.api.getInvoiceApi({
      uid:wx.getStorageSync("userInfoData").uid,
    })
    .then(res => {
      if (res.bol) {
        if(res.data!=null){
          that.setData({
            title:res.data.in_company_name,
            taxNumber:res.data.in_taxpayer_code,
            email:res.data.in_email,
            tel:res.data.in_tell,
            personName:res.data.in_name,
            invoiceId:res.data.id,
            isLoad:false
          })
        }else{
          that.setData({
            title:'',
            taxNumber:'',
            email:'',
            tel:'',
            personName:'',
            invoiceId:'',
            isLoad:false
        })
        }
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
      //编辑
      console.log(that.data.orderNum,'0000000000000')
    if(that.data.invoiceId!="" && that.data.orderNum!=undefined){
      that.orderInvoiceApi();
    }else if(that.data.invoiceId!="" && that.data.orderNum==undefined){
      getApp()
      .globalData.api.upInvoiceVip({
        in_company_name:that.data.title,
        in_taxpayer_code:that.data.taxNumber,
        in_email:that.data.email,
        in_tell:that.data.tel,
        in_name:that.data.personName,
        in_uid:wx.getStorageSync("userInfoData").uid,
        in_id:that.data.invoiceId
      })
      .then(res => {
        if (res.bol) {
          wx.showToast({ title: res.data.msg, icon: "none" });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            },2000)
        } else {
          wx.showToast({ title: res.data.msg, icon: "none" });
        }
      });
    //添加
    }else if(that.data.invoiceId==""){
      getApp()
      .globalData.api.insertInvoiceVip({
        in_company_name:that.data.title,
        in_taxpayer_code:that.data.taxNumber,
        in_email:that.data.email,
        in_tell:that.data.tel,
        in_name:that.data.personName,
        in_uid:wx.getStorageSync("userInfoData").uid,
      })
      .then(res => {
        if (res.bol) {
            wx.showToast({ title: res.data.msg, icon: "none" });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
            },2000)
        } else {
          wx.showToast({ title: res.data.msg, icon: "none" });
        }
      });
    }
  },
  //分享成团订单添加发票信息
  orderInvoiceApi(){
    let that =this
    getApp()
    .globalData.api.orderInvoiceApi({
      uid:wx.getStorageSync("userInfoData").uid,
      iid:that.data.invoiceId,
      orderNum:that.data.orderNum
    })
    .then(res => {
      if (res.bol) {
        wx.showToast({ title: res.data.msg, icon: "none" });
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          },2000)
      } else {
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    });
  },
  //单选切换
  onChange(event) {
    this.setData({
      radio: event.detail,
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