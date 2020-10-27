import {format,add0} from "../../../utils/util";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    details:{},//详情数据
    userInfoArr: [
      {avater:'../../../assets/img/person.png'},
    ], // 获取拼团成功用户信息
    groupAllArr:[
      {avater:'../../../assets/img/person.png'},
      {avater:'../../../assets/img/person.png'},
      {avater:'../../../assets/img/person.png'},
    ],//需要拼团的人数
    countDownStr: '--天:--时:--分:--秒',// 结束倒计时
    grouponsState: "无", // 参团状态（无  未参与  拼团成功  已参与  拼团失败）
    plusId:'',//通过分享进来的标识
    teamId:'',//团id
    payData: {}, // 支付配置参数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options,'options---------')
    that.setData({
      plusId: options.plusId,
      teamId:options.teamId
    });
    // this.countDown("2020-09-24 14:44:58");
 
    this.getGroupInfo();
  },
  //分享详情
  getGroupInfo(){
      let that=this;
      getApp()
          .globalData.api.getGroupInfo({
            uid:wx.getStorageSync('userInfoData').uid
          }).then(res=>{
            if(res.bol){
              that.setData({
                details:res.data,
                userInfoArr:res.data.member,
                grouponsState:res.data.status
              })
              var nowTime = format((res.data.GroupEndAt*1000));
              // 处理 参团状态 --- 无 拼团成功 未参与 已参与 拼团失败
              if (that.data.userInfoArr.length==3) {
                that.setData({ grouponsState: "拼团成功" });
              } else {
                that.daojisfn(nowTime);
                let timer = null;
                timer = setInterval(function () {
                  let bool = that.daojisfn(nowTime);
                  if (bool) clearInterval(timer);
                }, 1000);
              }
            }else{
              wx.showToast({ title: res.data.msg, icon: "none" });
            }
          })
  },

   // 倒计时函数
  // 返回值：倒计时是否结束
  daojisfn(time) {
    let that = this;
    let xianzaisj = new Date(); //现在时间
    let shedingsj = new Date(time); //设定时间
    let shijianc = shedingsj.getTime() - xianzaisj.getTime();
    let tian = parseInt(shijianc / 1000 / 60 / 60 / 24); //天
    let shi = parseInt(shijianc / 1000 / 60 / 60) % 24; //时
    let fen = parseInt((shijianc / 1000 / 60) % 60); //分
    let miao = parseInt((shijianc / 1000) % 60); //秒
    let shuziArr = [tian, shi, fen, miao];
    for (let i = 0; i < shuziArr.length; i++) {
      shuziArr[i] = shuziArr[i] < 10 ? "0" + shuziArr[i] : shuziArr[i];
    }
    that.setData({ countDownStr: shuziArr.join(":") });
    // let partakeBool = false; // 是否参与该团
    // for (let userInfo of that.data.userInfoArr) {
    //   if (userInfo.photo) partakeBool = true;
    // }
    // let endTimeBool = shijianc <= 0;
    // let grouponsStateN = that.data.grouponsState;
    //  grouponsStateN = endTimeBool
    //   ? "拼团失败"
    //   : that.data.grouponsState
    // that.setData({ grouponsState: grouponsStateN });
    // return endTimeBool;
    // grouponsStateN = endTimeBool
    //   ? "拼团失败"
    //   : partakeBool
    //     ? "已参与"
    //     : "未参与";
    // that.setData({ grouponsState: grouponsStateN });
    // return endTimeBool;
  },
  // 倒计时函数
  // countDown( end_time) {
  //   let _this = this;
  //   clearInterval(timer);
  //   let timer = setInterval(function () {
  //     let nowTime = new Date();
  //     let endTime = new Date(end_time);
  //     let t = endTime.getTime() - nowTime.getTime();
  //     if (t > 0) {
  //       let day = parseInt(t / 1000 / 60 / 60 / 24);
  //       let hour = parseInt((t / 1000 / 60 / 60) % 24);
  //       let min = parseInt((t / 1000 / 60) % 60);
  //       let sec = parseInt((t / 1000) % 60);
  //       day = day < 10 ? "0" + day : day;
  //       hour = hour < 10 ? "0" + hour : hour;
  //       min = min < 10 ? "0" + min : min;
  //       sec = sec < 10 ? "0" + sec : sec;
  //       _this.setData({
  //         countDownStr: day + ':' + hour + ':' + min + ':' + sec,
  //       })
  //       let partakeBool = false; // 是否参与该团
  //          for (let userInfo of _this.data.userInfoArr) {
  //             if (userInfo.avater) partakeBool = true;
  //          }
  //          let grouponsStateN = _this.data.grouponsState;
  //          grouponsStateN = partakeBool? "已参与": "未参与";
  //         _this.setData({ grouponsState: grouponsStateN });
  //     }else {
  //       _this.setData({
  //         grouponsState: "拼团失败",
  //       })
  //       clearInterval(timer);
  //     } 
  //   }, 1000)
  // },
   // 立即参团页
   goDetailsFn() {
    let _this = this.data;
    //查看是否授权，没有授权跳转到授权页
    let userN = wx.getStorageSync("userInfoData");
    let bindPhone = wx.getStorageSync('bindPhone');
    let token = wx.getStorageSync('userInfoData').token;
    console.log(userN,'userN----------')
    if(_this.plusId){
      // if(!userN){
      //   wx.reLaunch({ url: '/pages/login/index?pagePlus=1' })
      // }
      wx.getSetting({
        success: res => {
          console.log(res.authSetting['scope.userInfo'] ,'9999999',token,bindPhone)
          if (!res.authSetting['scope.userInfo']  || token==undefined || bindPhone=='') {
            console.log('1111')
                wx.reLaunch({
                 url: '/pages/login/index?pagePlus=1'
                })
          }else{
            this.getPayStatus();
          }
        }
      })
    }else{

    }
  },
  getPayStatus(){
    //判断是否拼团已满 如果未满进入邀请页面 已满提示状态状态更改为1
     //显示支付前的状态 --- 查询团是否满员
    let that=this;
    getApp()
        .globalData.api.getPayStatus({
          uid:wx.getStorageSync('userInfoData').uid
        }).then(res=>{
          if(res.err_code=='10047'){
            // wx.navigateTo({
            //   url:"/pages/course/plus-group/index??teamId=1",
            // })
          }else if(res.err_code=='10048'){
            wx.navigateTo({
              url:"/pages/course/plus/index",
            })
            return wx.showToast({ title: res.data.msg, icon: "none" });  
          }else if (res.err_code=='10000') {
            that.unifiedPay();
          }
        })
  },
  /**plusType:1、读者购买
   2、单独购买
   3、一起购买
   4、分享购买 
   vid:参数说明（1、读者2、单独购买3、一起付4、分享付、5回放权限）*/
   unifiedPay(){
    let that=this;
    var jsonDatas={};
      let datas = {
          vid: 4,//4、分享付
          uid: wx.getStorageSync("userInfoData").uid,
          };
      jsonDatas= JSON.stringify(datas)
    getApp()
      .globalData.api.unifiedPay({
        type:4,
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
          that.arousePayFn();
      });
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
        wx.navigateTo({
          url:"/pages/course/plus/index",
        })
      },
      fail(res) {
        wx.showToast({ title: "支付失败,请求重试", icon: "none" });
      },
      complete(res) {
       
      }
    });
  },
  // 底部按钮 - 拼团成功
  successfn() {
    wx.switchTab({
      url: '/pages/member/my/index',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
      // wx.redirectTo({
    //   url: `/pages/course/plus/index`
    // });
    
   },
  // 底部按钮 - 拼团失败
  failfn() {
    let pages = getCurrentPages() //获取当前页面栈的信息
    let prevPage = pages[pages.length - 2] //获取上一个页面
    prevPage.setData({ //把需要回传的值保存到上一个页面
      state: "fail"
    });
    wx.navigateBack({
      delta: 1
    })
    // wx.redirectTo({
    //   url: `/pages/course/plus/index`
    // });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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
    let _this = this.data;
    if (options.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: "PLUS会员团购",
      path: `/pages/course/plus-group/index?plusId=1`,
    };
  }
})