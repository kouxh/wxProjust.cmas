// pages/course/plus/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIphoneX: getApp().globalData.isIphoneX,
    repeatBool: true, // 防止重复请求
    payData: {}, // 支付配置参数
    detailId:0,//详情id
    radio: '1',//默认选中单选框
    url:"https://xpwi.github.io/shike/",
    groupShow:false,//是否展示团购弹框
    readerShow:false,//是否展示读者弹框
    uniformShow:false,//是否展示统一付款弹框
    lumpShow:false,//是否展示成团弹框
    isCopy:false,//是否复制成功
    disabled:true,
    mobile:"",//注册手机号
    code:"",//验证码
    conLists: [], //内容标题（如：今天完成工作、备注、次日工作安排）可以添加或者删除
    initialCount: 60, // 倒计时秒数
    count: 60, // 倒计时秒数
    isReset: false, // 是否重置'倒计时'
    sendState: 0, // '验证码发送'按钮的状态 0待发送 1发送中 2倒数时中 3重新发送
    contactPhone:'400-819-1255',//咨询电话
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'optionssss')
    let that=this;
    that.setData({detailId:options.id });
  },
    //单选框切换
    onChange(event) {
      console.log(event)
      this.setData({
        radio: event.detail,
      });
      if(this.data.radio=="2"){
        this.setData({
          groupShow:true
        })
      }
      if(this.data.radio=="3"){
        this.setData({ readerShow: true });
      }
    },
    //电话调用
  makePhoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.contactPhone,
      success:function(){
        console.log('拨打成功')
      },
      fail:function(){
        console.log('拨打失败')
      }
    })
  },
    //点击下一步
    nextFn(){
      this.setData({
        uniformShow:true,
        groupShow:false
      })
    },
    //点击成团
    groupFn(){
      this.setData({
        lumpShow:true,
        groupShow:false
      })
    },
    // 复制功能
    copyFn(e) {
      let that = this;
      var copy = e.currentTarget.dataset.copy;
      wx.setClipboardData({
        data: copy,
        success(res) {
          console.log(res,'222')
          wx.showToast({
            title: '复制成功',
            duration: 2000
          })
          that.setData({
            isCopy:true,
            disabled:false
          })
        },
        fail(res) {
          // wx.showToast({ title: "复制失败", icon: "none" });
        }
      });
    },
    //读者优惠点击关闭图标
    onClose() {
      this.setData({ readerShow: false, radio:"1",mobile:'',code:'',sendState:0 });
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
      let that=this;
      var phoneurl = 'https://www.chinamas.cn/code';
      wx.request({
        //上线接口地址要是https测试可以使用http接口方式
          url: phoneurl,
          data: {
          phone:that.data.mobile
          },
          method: 'GET',
          header: {
          'content-type': 'application/json',
          'mode': 2
          },
          success: function (res) {
            console.log(res,'000')
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
      console.log('0000')
      let that = this;
      let _this = this.data;
      that.setData({ sendState: 2 });
      var timer = null;
      let countN = that.data.count;
      timer = setInterval(function() {
        countN--;
        that.setData({ count: countN });
        if (countN <= 0||_this.isReset) {
          that.setData({
            count: _this.initialCount,
            sendState: 3,
            isReset:false
          });
          clearInterval(timer);
        }
      }, 1000);
    },
    //确认支付
    confirmPay(){
      let that=this;
       // 验证手机号
       var p1 = /^1\d{10}$/;
       if (p1.test(that.data.mobile) == false) {
         return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
       }
       if (that.data.code == "") {
        return wx.showToast({ title: "请输入验证码", icon: "none" });
      }
      getApp()
        .globalData.api.readerMeal({
          vid:4,//读者id
          tell:that.data.mobile,
          code:that.data.code,
          uid: wx.getStorageSync("userInfoData").uid,
        })
        .then(res => {
           // 得到支付需要的参数信息
           if (res.bol ==false) {
            return wx.showToast({ title: res.err_msg, icon: "none" });
          }else if(res.code==9999){
            return wx.showToast({ title: res.msg, icon: "none" });
          }
          that.setData({ payData: res.data });
          console.log(that.data.payData,'读者唤起支付页面')
          // 唤起支付弹框
            that.arousePayFn();
        });
    },
    //团购点击关闭图标
     onClose1() {
      this.setData({ groupShow: false, radio:"1"});
    },
    //团购统一付款点击关闭图标
    onClose2() {
      this.setData({ uniformShow: false, radio:"1" });
    },
    //团购各自付款点击关闭图标
    onClose3() {
      this.setData({ lumpShow: false, radio:"1" });
    },
     /**
 * 添加内容
 */
  add(e) {
    // 点击添加按钮，就往数组里添加一条空数据
    var _list = this.data.conLists;
    _list.push("")
    this.setData({
      conLists: _list
    })
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
        conLists: _list
      })
    },
  
    /**
   * 获取输入的内容标题
   */
    changeConTitle(e) {
      console.log(e,'000')
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
 
   /**
  * 下一步
  */
    next(e) {
      var _conLists = this.data.conLists;
      console.log('这是模板内容标题数组', _conLists)
      for (let i = 0; i < _conLists.length; i++) {
        if (!_conLists[i]) {
          wx.showToast({
            title: '请输入第' + `${i * 1 + 1}` + '条的模板内容标题！',
            icon: 'none'
          })
          return;
        }
      }
    },
     // 点击立即支付
     goPayFn() {
      let that = this;
      let _this = this.data;
      that.setData({ repeatBool: false }); // 防止重复请求
      // 请求接口获取唤醒支付的参数
      getApp()
        .globalData.api.getPrepayId({
          uid: wx.getStorageSync('userInfoData').uid,
          vid: 2,//1打包 2 plus会员 3团购 4读者
        })
        .then(res => {
          // 得到支付需要的参数信息
          if (res.bol ==false) {
            that.setData({ repeatBool: true });
            return wx.showToast({ title: res.err_msg, icon: "none" });
          }
          that.setData({ payData: res.data });
          // 唤起支付弹框
            that.arousePayFn();
        });
    },
    // 唤起支付弹框
    arousePayFn() {
      let that = this;
      let payData = that.data.payData;
      console.log(payData,'唤起支付参数888')
      wx.requestPayment({
        timeStamp: payData.timeStamp.toString(),
        nonceStr: payData.nonceStr,
        package: payData.package,
        signType: payData.signType,
        paySign: payData.sign,
        success(res) {
          console.log(res,'988888888')
          console.log(that.data.detailId,'that.data.detailId33')
          // wx.redirectTo({
          //   url: `/pages/course/detail/index?id=${that.data.detailId}`
          // });
          wx.navigateBack({
            delta: 1
          })
          that.paySuccessPlus();
        },
        fail(res) {
          console.log(res,'支付失败,请求重试')
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