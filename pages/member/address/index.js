const area = require('../../../utils/area.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    areaShow:false,
    countyCode: '110101', //当前选中的省市区code 如：160000 160100
    areaList: Object.assign({}, area.default),
    areaStr: '', //选择的地址
    province_name:'',//省
    city_name:'',//市
    area_name:'',//区
    editorName: "", // 编辑 / 添加地址 昵称
    editorMobile: "", // 编辑 / 添加地址 手机号
    editorDetailed: "", // 编辑 / 添加地址 详细地址
    isLoad:true,//是否加载
    showType:1,//1数据有值 2 数据为空
    tipText:"",
    editid:'',//编辑id
    orderNum:'',//订单编号
    addId:'',//添加收货地址id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      editid: options.id,
      orderNum:options.orderNum
    })
    let title = '新增收货地址'
    if (that.data.editid > 0) {
      title = '编辑收货地址'
      this.getAddressVip();//获取邮寄地址
    }
    wx.setNavigationBarTitle({
      title: title
    })
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
  },
//点击关闭地址弹框
 colseArea: function() {
    this.setData({
      areaShow:false
    })
  },
  //获取收货地址
  getAddressVip(){
    let that=this;
    getApp()
    .globalData.api.getOneAddressApi({
      uid:wx.getStorageSync("userInfoData").uid,
      aid:that.data.editid
    })
    .then(res => {
      if (res.bol) {
        if(res.data!=null){
          that.setData({
            areaStr:res.data.area + '/' + res.data.city + '/' + res.data.county,
            province_name:res.data.city,//省
            city_name:res.data.area,//市
            area_name:res.data.county,//区
            editorName: res.data.consignee, // 编辑 / 添加地址 昵称
            editorMobile: res.data.tell, // 编辑 / 添加地址 手机号
            editorDetailed: res.data.desc_address, // 编辑 / 添加地址 详细地址
            isLoad:false
          })
          Object.keys(that.data.areaList.city_list).forEach(key => {
            if (that.data.areaList.city_list[key] == res.data.area) {
              // that.data.countyCode = key;
              that.setData({
                countyCode:key
              })
              console.log(that.data.countyCode,'that.data.countyCode')
            }
          });
        }else{
        that.setData({
          showType:2,
          tipText:'您已自动放弃领取权益！',
          isLoad:false
        })
        }
          
      } else {
        wx.showToast({ title: res.data.msg, icon: "none" });
      }
    });
  },
  //编辑、添加领取杂志接口
  upAddressVip(){
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
    if(that.data.editid>0){
      //编辑
      getApp()
      .globalData.api.upAddressVip({
        consignee: that.data.editorName,
        tell:that.data.editorMobile,
        desc_address:that.data.editorDetailed,
        aid:that.data.editid,
        city:that.data.province_name,
        area:that.data.city_name,
        county:that.data.area_name,
      })
      .then(res => {
        if (res.bol) {
        wx.showToast({ title: res.data.msg, icon: "none" });
        let pages = getCurrentPages() //获取当前页面栈的信息
        let prevPage = pages[pages.length - 2] //获取上一个页面
        prevPage.setData({ //把需要回传的值保存到上一个页面
          addressData: "succeed"
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
        } else {
          wx.showToast({ title: res.data.msg, icon: "none" });
        }
      });
    }else{
      //添加
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
        if (res.bol) {
          that.setData({
            addId:res.data.id
          })
          if(that.data.orderNum!=undefined ){
            that.orderAddressApi();
          }else{
               wx.showToast({ title: res.data.msg, icon: "none" });
              let pages = getCurrentPages() //获取当前页面栈的信息
              let prevPage = pages[pages.length - 2] //获取上一个页面
            prevPage.setData({ //把需要回传的值保存到上一个页面
                addressData: "succeed"
              });
              setTimeout(() => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)   
          }
        } else {
          wx.showToast({ title: res.data.msg, icon: "none" });
        }
      });
    }
    
  },
  //分享成团订单添加收货地址
  orderAddressApi(){
    let that =this;
    getApp()
    .globalData.api.orderAddressApi({
      uid:wx.getStorageSync("userInfoData").uid,
      aid:that.data.addId,
      orderNum:that.data.orderNum
    })
    .then(res => {
      if (res.bol) {
      wx.showToast({ title: res.data.msg, icon: "none" });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
      } else {
        wx.showToast({ title: res.data.msg, icon: "none" });
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
 
})