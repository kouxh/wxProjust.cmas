// 引入md5.js文件
import { md5 } from "../../../utils/md5.js"
import {dateFormatter,deleteEmptyProperty,
  formateObjToParamStr} from "../../../utils/util";
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      name:"",
      tell:"",
      email:"",
      sex:"1",
      birthday:"",
      age:"",
      company:"",
      occupation:""
    },
    calendarShow:false,//是否展示显示日期弹框
    currentDate: new Date().getTime(),
    minDate: new Date(1960, 0, 1).getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    activeKey: 0,//菜单默认选中
    isShow: false,//是否展示我的菜单栏,
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bindMobileShow: false, // 是否需要绑定手机号
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectOption:false,
  },

 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.basicInfoData();
  },
  //基本信息展示
  basicInfoData(){
    let that=this;
    let uid = wx.getStorageSync('userInfoData').uid
    getApp().globalData.api.basicInfo({
      uid:uid
    }).then(res=>{
      if(res.bol==true){
        this.setData({
          info: res.data,
        })
      }else{
        wx.showToast({ title: "获取数据失败,请稍后重试~", icon: "none" });
      }
    })
  },
   /**点击底部tab */
   onTabItemTap(item) {
    console.log(item)
    if (item.index == 2) {
      this.setData({
        isShow: !this.data.isShow
      });
    }
    // {index: 3, pagePath: "pages/member/index/index", text: "我的"}
    // 可以在此做自己需求的逻辑操作，如点击出现弹窗等
    // wx.showActionSheet({
    //   itemList: ['1', '2'],
    //   success(res) {
    //     console.log(res.tapIndex)
    //   }
    // })
    // wx.showToast({
    //   title: 'tab点击',
    // })

  },
    // 点击下拉显示框
    selectOption() {
      this.setData({
        selectOption: !this.data.selectOption
      });
    },
    optionSelect(e) {
      var name = e.currentTarget.dataset.name
      console.log(name,'name')
      this.setData({
        'info.occupation': name,
          selectOption: false
      })
    },
      // 点击下拉显示框
      selectTap() {
        this.setData({
          selectShow: !this.data.selectShow
        });
      },
      mySelect(e) {
        var name = e.currentTarget.dataset.name
        this.setData({
          'info.age': name,
            selectShow: false
        })
      },
 

// 切换性别
  onSwitch(event) {
    this.setData({
      'info.sex': event.detail,
    });
  },
  // 修改信息
  changeInfo(){
    let that = this;
    if (that.data.info.name == "") {
      return wx.showToast({ title: "请输入姓名", icon: "none" });
    }if (
      !/^1[3-9]\d{9}$/.test(that.data.info.tell) ||
      that.data.info.tell == ""
    ) {
      return wx.showToast({ title: "请核对手机号", icon: "none" });
    }
    var emailStr = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    if(that.data.info.email=='' ||!emailStr.test(that.data.info.email)){
      return wx.showToast({ title: "请输入正常的邮箱", icon: "none" });
    }
    if(that.data.info.birthday==''){
      return wx.showToast({ title: "请选择出生日期", icon: "none" });
    }
    if(that.data.info.age==''){
      return wx.showToast({ title: "请选择年龄段", icon: "none" });
    }else{
      that.data.info.age=that.data.info.age.trim();
    }
    if(that.data.info.company==''){
      return wx.showToast({ title: "请输入公司名称", icon: "none" });
    }
    if(that.data.info.occupation==''){
      return wx.showToast({ title: "请选择职位", icon: "none" });
    }
    let jsonData={
            uid:wx.getStorageSync('userInfoData').uid.toString(),
            name:that.data.info.name,
            tell:that.data.info.tell,
            email:that.data.info.email,
            sex:that.data.info.sex,
            birthday:that.data.info.birthday,
            age:that.data.info.age,
            company:that.data.info.company,
            occupation:that.data.info.occupation,
            timestamp:new Date().getTime().toString()
    }
    //去除json中的空值
    let isEmptyData=deleteEmptyProperty(jsonData)
    //根据KEY进行排序
    const jsonDataed = {};
    Object.keys(isEmptyData).sort().forEach(function(key) {
      jsonDataed[key] = isEmptyData[key];
    });
    // console.log(JSON.stringify(jsonDataed),'9878896767555');
    // formateObjToParamStr(jsonDataed)
    // console.log(formateObjToParamStr(jsonDataed),'formateObjToParamStr(jsonDataed)')
    // let jsonStr = encodeURIComponent(JSON.stringify(jsonDataed))
    // console.log(decodeURI(formateObjToParamStr(jsonDataed)),'jsonStrjsonStr')
    // console.log(md5(decodeURI(formateObjToParamStr(jsonDataed))),'0000000000')
    // console.log(hexMD5((decodeURI(formateObjToParamStr(jsonDataed))),'hexMD5(formateObjToParamStr(jsonDataed))');
    // 将组成的字符串进行URL_ENCODE 然后MD5之后转成大写
     let jsonStrData = md5(decodeURI(formateObjToParamStr(jsonDataed))).toUpperCase();  // 使用加密转成大写
     jsonData.sign=jsonStrData;
    getApp().globalData.api.basicUp({
      json:JSON.stringify(jsonData)
    }).then(res=>{
      if (res.bol == true) {
        wx.showToast({ title: "修改成功", icon: 'success',duration:2000 });
      }else{
        wx.showToast({ title: "修改数据失败,请稍后重试~", icon: "none" });
      }
    })
    //   var phoneurl = 'https://www.chinamas.cn/basicInfoApi';
    // wx.request({
    //   url:phoneurl,
    //   data:that.data.info,
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: 'POST',
    //   success: function (res) {
    //     console.log(res,'9999999999')
    //   }
    // })
  },
  onChange(event) {
    console.log(event.detail);
   if(event.detail == 1){
      wx.navigateTo({
        url: "/pages/member/order/index"
      });
     
    }else if(event.detail == 2){
      wx.navigateTo({
        url: "/pages/member/asset/index"
      });
    }else if(event.detail == 3){
      wx.navigateTo({
        url: "/pages/member/content/index"
      });
    }else if(event.detail == 4){
      wx.navigateTo({
        url: "/pages/member/help/index"
      });
    }else if(event.detail == 5){
      wx.navigateTo({
        url: "/pages/member/magazine/index"
      });
    }

  },
  //日期弹框展示
  onDisplay() {
    this.setData({ calendarShow: true });
  },
  onClose() {
    this.setData({ calendarShow: false });
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  // 点击确认按钮
  onConfirm(event) {
    this.setData({
      calendarShow: false,
      'info.birthday': dateFormatter(event.detail),
    });
  },
   // 修改信息 姓名 同步
   infoNameFn(e) {
    this.setData({
      'info.name': e.detail.value
    });
  },

  // 修改信息 手机号 同步
  infoTellFn(e) {
    this.setData({
      "info.tell": e.detail.value
    });
  },

  // 修改信息 邮箱 同步
  infoEmailFn(e) {
    this.setData({
      "info.email": e.detail.value
    });
  },

  // 修改信息 公司名称 同步
  infoConFn(e) {
    this.setData({
      "info.company": e.detail.value
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
    var userinfo = wx.getStorageSync('userinfoData');
    console.log(userinfo)
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
          hasBindMobile:true
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
    this.basicInfoData();
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