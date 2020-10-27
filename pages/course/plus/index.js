// pages/course/plus/index.js
import { md5 } from "../../../utils/md5.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: getApp().globalData.isIphoneX,
    repeatBool: true, // 防止重复请求
    payData: {}, // 支付配置参数
    detailId: 0,//详情id
    radio: '1',//默认选中单选框
    url: "https://xpwi.github.io/shike/",
    groupShow: false,//是否展示团购弹框
    readerShow: false,//是否展示读者弹框
    uniformShow: false,//是否展示统一付款弹框
    lumpShow: false,//是否展示成团弹框
    mobile: "",//注册手机号
    code: "",//验证码
    conLists: [], //内容标题（如：今天完成工作、备注、次日工作安排）可以添加或者删除
    initialCount: 60, // 倒计时秒数
    count: 60, // 倒计时秒数
    isReset: false, // 是否重置'倒计时'
    sendState: 0, // '验证码发送'按钮的状态 0待发送 1发送中 2倒数时中 3重新发送
    contactPhone: '400 819 1255',//咨询电话
    groupMoney: "XX",
    isNeed:false,//是否需要充值会员
    isTel:'',//无需更改的手机号
    shareUid:'',//分享标识
    groupType:1,//1发起拼团2 拼团详情
    jump:'',//跳转标识
    pageName:'',//跳转页面标题
    together:false,//是否统一支付
    teamId:'',//团id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'options----')
    let that = this;
    that.setData({ detailId: options.id,jump:options.page,pageName:options.page });
    console.log(that.data.pageName)
  },
  //单选框切换
  onChange(event) {
    this.setData({
      radio: event.detail,
    });
    if (this.data.radio == "2") {
    //检测用户是否在成团列表中
    this.checkUserInGroup();
      this.setData({
        groupShow: true
      })
    }
    if (this.data.radio == "3") {
      this.setData({ readerShow: true });
    }
  },
  //电话调用
  makePhoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.contactPhone,
      success: function () {
        console.log('拨打成功')
      },
      fail: function () {
        console.log('拨打失败')
      }
    })
  },
  //点击下一步
  nextFn() {
    this.setData({
      uniformShow: true,
      groupShow: false
    })
  },
  // 检测用户是否在成团列表中
  checkUserInGroup(){
    let that=this;
    getApp()
    .globalData.api.checkUserInGroup({
      uid: wx.getStorageSync("userInfoData").uid,
    })
    .then(res => {
    if(res.err_code=='10047'){
        that.setData({
          groupType:2,
          teamId:res.data.groupCode
        })
      }else if (res.err_code=='10048') {
        that.setData({
          groupType:1
        })
        // return wx.showToast({ title: res.data.msg, icon: "none" });  
      }
    });
  },
  //点击请支付
  payFn(){
    //判断是否拼团已满 如果未满进入邀请页面 已满提示状态状态更改为1
     //显示支付前的状态 --- 查询团是否满员
    let that=this;
    getApp()
        .globalData.api.getPayStatus({
          uid:wx.getStorageSync('userInfoData').uid
        }).then(res=>{
          if(res.err_code=='10047'){
            wx.navigateTo({
              url:`/pages/course/plus-group/index?teamId=${this.data.teamId}`,
            })
          }else if(res.err_code=='10048'){
            that.setData({
              groupShow: false,
              radio: "1"
            })
            return wx.showToast({ title: res.data.msg, icon: "none" });  
          }else if (res.err_code=='10000') {
            that.setData({
              groupShow: false,
              radio: "1"
            })
            wx.navigateTo({
              url:`/pages/course/plus-group/index?teamId=${this.data.teamId}`,
            })
          }
        })
  },
 
  //读者优惠点击关闭图标
  onClose() {
    this.setData({ readerShow: false, radio: "1", mobile: '', code: '', sendState: 0 });
  },
  // 获取验证码
  getCodeFn() {
    let that = this;
    // 验证手机号
    var p1 = /^1\d{10}$/;
    if (p1.test(that.data.mobile) == false) {
      return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
    }
    that.setData({ sendState: 1 });
    that.sendFn();//获取验证码
  },

  // 发送验证码
  sendFn() {
    let that = this;
    var phoneurl = 'https://www.chinamas.cn/code';
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: phoneurl,
      data: {
        phone: that.data.mobile
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'mode': 2
      },
      success: function (res) {
        if (res.data.bol == "true") {
          wx.showToast({ title: res.data.msg, icon: "none" });
          that.countDownFn();
        } else {
          wx.showToast({ title: res.data.data.msg, icon: "none" });
          that.setData({ sendState: 3 });
        }
      },
    })

  },

  // 倒计时
  countDownFn() {
    let that = this;
    let _this = this.data;
    that.setData({ sendState: 2 });
    var timer = null;
    let countN = that.data.count;
    timer = setInterval(function () {
      countN--;
      that.setData({ count: countN });
      if (countN <= 0 || _this.isReset) {
        that.setData({
          count: _this.initialCount,
          sendState: 3,
          isReset: false
        });
        clearInterval(timer);
      }
    }, 1000);
  },
//新支付统一接口
/**plusType:1、读者购买
   2、单独购买
   3、一起购买
   4、分享购买 
   vid:参数说明（1、读者2、单独购买3、一起付4、分享付、5回放权限）*/
  unifiedPay(plusType,telArr){
    let that=this;
    var jsonDatas={};
    if(plusType==1){
      let datas = {
            vid: 1,//读者id
            tell: that.data.mobile,
            code: that.data.code,
            uid: wx.getStorageSync("userInfoData").uid
          };
      jsonDatas= JSON.stringify(datas)
    }else if(plusType==2){
      let datas = {
            uid: wx.getStorageSync('userInfoData').uid,
            vid: 2,//2单独购买
          };
      jsonDatas= JSON.stringify(datas)
    }else if(plusType==3){
      let datas = {
          vid: 3,//3一起付
          telephoneCollection	: telArr.toString(),
          uid: wx.getStorageSync("userInfoData").uid,
          };
      jsonDatas= JSON.stringify(datas)
    }else if(plusType==4){
      let datas = {
          vid: 4,//4、分享付
          uid: wx.getStorageSync("userInfoData").uid,
          };
      jsonDatas= JSON.stringify(datas)
    }
    getApp()
      .globalData.api.unifiedPay({
        type:plusType,
        json:jsonDatas
      })
      .then(res => {
        // 得到支付需要的参数信息
        if (res.bol == false) {
          return wx.showToast({ title: res.err_msg, icon: "none" });
        } 
        that.setData({
          payData: res.data,
        })
        if(plusType==1){
          that.setData({ readerShow: false, radio: "1", mobile: '', code: '', sendState: 0  });
        }else if(plusType==3){
          that.setData({ uniformShow: false, radio: "1",together:true});
        }
        console.log(that.data.payData, '读者唤起支付页面')
        // 唤起支付弹框
        // setTimeout(() => {
          that.arousePayFn();
        // }, 2000);
      });
  },
  //读者优惠确认支付
  confirmPay() {
    let that = this;
    // 验证手机号
    var p1 = /^1\d{10}$/;
    if (p1.test(that.data.mobile) == false) {
      return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
    }
    if (that.data.code == "") {
      return wx.showToast({ title: "请输入验证码", icon: "none" });
    }
    // 请求接口获取唤醒支付的参数
    that.unifiedPay(1);
  },
  //input失去光标触发
  onBlur(event) {
    var tell = event.detail.value;
    var p1 = /^1\d{10}$/;
    if (p1.test(tell) == false) {
      return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
    }
    getApp()
      .globalData.api.checkTellIsVip({
        tell: tell,
      })
      .then(res => {
        if (res.bol == true) {
          this.setData({
            isNeed: false,
          })
        } else {
          wx.showToast({ title: res.data.msg, icon: "none" });
          this.setData({
            isNeed: true,
            isTel:tell
          })
        }
      });
  },
  //团购统一付确认支付
  groupConfirmPay() {
    let that = this;
    // 验证手机号
    var p1 = /^1\d{10}$/;
    var telArr = [];
    if(that.data.isNeed){
      return wx.showToast({
          title: "请更改无需充值的手机号" + that.data.isTel,
          icon: 'none'
        })
    }
    if (that.data.conLists.length == 0) {
      return wx.showToast({
        title: '请填写成团人员手机号',
        icon: 'none'
      })
    } else {
      for (let i = 0; i < that.data.conLists.length; i++) {
        if (p1.test(that.data.conLists[i].modelLabel) == false) {
          return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
        }
        telArr.push(that.data.conLists[i].modelLabel);
      };
      if (telArr.length < 3) {
        return wx.showToast({
          title: '拼团人数必须大于3人(含3人）',
          icon: 'none'
        })
      }
      let nary = telArr.sort();
      for(var i = 0; i < nary.length - 1; i++) {
        if(nary[i] == nary[i + 1]) {
          return wx.showToast({ title: "请更改重复手机号：" + nary[i], icon: "none" ,duration: 2000});
        }
      }
    // 请求接口获取唤醒支付的参数
      that.unifiedPay(3,telArr);
     
    }
  },
 // 点击立即支付(单独购买599)
   goPayFn() {
    let that = this;
    that.setData({ repeatBool: false }); // 防止重复请求
    // 请求接口获取唤醒支付的参数
    that.unifiedPay(2);
  },
  
  // 拼团（发起拼团）
  originateFn(e) {
    let that = this;
    // 请求接口获取唤醒支付的参数
    that.unifiedPay(4);
  },
  //点击成团详情
  groupFn() {
    this.setData({
      groupShow: false,
      radio: "1"
    })
    wx.navigateTo({
      url:`/pages/course/plus-group/index?teamId=${this.data.teamId}`,
    })
  },
  // 唤起支付弹框
  arousePayFn() {
    let that = this;
    let payData = that.data.payData;
    wx.requestPayment({
      timeStamp: payData.timeStamp.toString(),
      nonceStr: payData.nonceStr,
      package: payData.package,
      signType: payData.signType,
      paySign: payData.sign,
      success(res) {
        console.log(res,'-------------')
        //返回课堂详情页
        if(that.data.pageName=="my"){
          if(that.data.radio=="1"||that.data.radio=="3"||(that.data.radio=="2"&&that.data.together==true)){
            wx.navigateBack({
              delta: 1
           })
          }else if(that.data.radio=="2"&&that.data.together==false){
            console.log(that.data.together,'0000000000')
            that.checkUserInGroup();
            setTimeout(() => {
              wx.navigateTo({
                url:`/pages/course/plus-group/index?teamId=${that.data.teamId}`,
              })
            }, 2000);
          }
        }else if(that.data.radio=="1"||that.data.radio=="3"||(that.data.radio=="2"&&that.data.together==true)){
          wx.navigateBack({
                delta: 1
           })
          that.paySuccessPlus();
        }else if(that.data.radio=="2"&&that.data.together==false){
          that.checkUserInGroup();
          setTimeout(() => {
            wx.navigateTo({
              url:`/pages/course/plus-group/index?teamId=${that.data.teamId}`,
            })
          }, 2000);
          
        }
        //跳转到表单页面
        // if(that.data.radio=="1"||that.data.radio=="2"){
        //   wx.navigateTo({
        //     // url:"/pages/course/form/index",
        //     url: `/pages/course/form/index?id=${that.data.detailId}`
        //     // events: {
        //     //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        //     //   formFinish: function (data) {
        //     //     console.log(data, '-----------formFinish');
        //     //     if (data) {
        //     //       wx.redirectTo({
        //     //         url: `/pages/course/detail/index?jump=true&&id=${that.data.detailId}`
        //     //       })

        //     //       // wx.navigateBack({
        //     //       //   delta: 1
        //     //       // })
        //     //       // that.paySuccessPlus();
        //     //     }
        //     //   },
        //     // }
        //   })
        // }else{
        //   wx.navigateBack({
        //     delta: 1
        //   })
        //   that.paySuccessPlus();
        // }
       
      },
      fail(res) {
        wx.showToast({ title: "支付失败,请求重试", icon: "none" });
      },
      complete(res) {
        that.setData({ repeatBool: true });
      }
    });
  },
  //支付成功 通知父级页面
  paySuccessPlus() {
    let that = this;
    const eventChannel = that.getOpenerEventChannel()
    eventChannel.emit('paySuccessPlus', { data: 'success' });
  },

  //团购点击关闭图标
  onClose1() {
    this.setData({ groupShow: false, radio: "1" });
  },
  //团购统一付款点击关闭图标
  onClose2() {
    this.setData({ uniformShow: false, radio: "1", conLists: [] });
  },
  /**
* 添加内容
*/
  add(e) {
    // 点击添加按钮，就往数组里添加一条空数据
    var _list = this.data.conLists;
    var p1 = /^1\d{10}$/;
    if(_list.length==0){
      _list.push("")
        this.setData({
          conLists: _list,
          groupMoney: _list.length * 499
        })
    }else{
      for (let i = 0; i < _list.length; i++) {
        if (!_list[i]) {
          wx.showToast({
            title: '请填写正确的手机号',
            icon: 'none'
          })
          return;
        }
        if(this.data.isNeed==true){
          wx.showToast({
            title: '请更改无需充值的手机号',
            icon: 'none'
          })
          return;
        }
      }
      _list.push("")
      this.setData({
        conLists: _list,
        groupMoney: _list.length * 499
      })
    }
  },

  /**
   * 删除内容
   */
  del(e) {
    var idx = e.currentTarget.dataset.index;
    var _list = this.data.conLists;
    console.log(idx)
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list.splice(idx, 1)
      }
    }
    this.setData({
      conLists: _list,
      groupMoney: _list.length * 499,
      isNeed:false
    })
  },

  /**
 * 获取输入的内容标题
 */
  changeConTitle(e) {
    var idx = e.currentTarget.dataset.index; //当前下标
    var val = e.detail.value; //当前输入的值
    var _list = this.data.conLists; //data中存放的数据
    for (let i = 0; i < _list.length; i++) {
      if (idx == i) {
        _list[i] = { modelLabel: val } //将当前输入的值放到数组中对应的位置
      }
    }
    this.setData({
      conLists: _list
    })
  },
 
  // 手机号内容同步
  mobileFn(e) {
    this.setData({ mobile: e.detail.value });
  },

  // 验证码内容同步
  codeFn(e) {
    this.setData({ code: e.detail.value });
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
    const pages = getCurrentPages()
    const currPage = pages[pages.length - 1]  // 当前页
    if(currPage.data.state=="fail"){
      this.setData({
        radio:"1",
        groupShow:false
      })
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
  onShareAppMessage: function (options) {
    // if (options.from === 'button') {
    //   // 来自页面内转发按钮
    // }
    // this.setData({
    //   disabled: false
    // })
    // let shareUid={
    //   uid:wx.getStorageSync("userInfoData").uid,
    //   timestamp:Date.parse(new Date())/1000
    // }
    // console.log(md5(shareUid),'0000000000')
    // return {
    //   title: '快来拼团吧！',
    //   path: '/pages/course/plus/index?shareUid='+ md5(shareUid),
    // }
  }
})