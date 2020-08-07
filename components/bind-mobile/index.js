
Component({
  // 组件的属性列表
  properties: {},

  // 组件的初始数据
  data: {
    mobile: "", // 手机号
    validate: "", // 验证码
    initialCount: 60, // 倒计时秒数
    count: 60, // 倒计时秒数
    isReset: false, // 是否重置'倒计时'
    sendState: 0, // '验证码发送'按钮的状态 0待发送 1发送中 2倒数时中 3重新发送
    logonState: 0 // '登录按钮'的状态 0可登录 1登录中
  },

  //
  //
  // 生命周期函数
  ready: function() {},

  //
  //
  // 组件的方法列表
  methods: {
    // 隐藏弹框
    loginHideFn() {
      this.triggerEvent("bindEnd", { bindBool: false });
    },

    // 检查手机号是否已注册
    isExistFn() {
      let that = this;
      // 验证手机号
      var p1 = /^1\d{10}$/;
      if (p1.test(that.data.mobile) == false) {
        return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
      }
      this.setData({ sendState: 1 });
      // // 检查手机号是否已注册
      // getApp()
      //   .globalData.api.checkmergeaccount({
      //     mobile: that.data.mobile
      //   })
      //   .then(res => {
      //     if (res.code == 10200501) {
      //       wx.showModal({
      //         title: "提示",
      //         content: res.msg + ",是否进行合并？",
      //         success(res) {
      //           if (res.confirm) {
      //             that.sendFn();
      //             console.log("用户点击确定");
      //           } else if (res.cancel) {
      //             that.setData({ sendState: 3 });
      //             console.log("用户点击取消");
      //           }
      //         }
      //       });
      //     }
      //     if (res.code == 200 && res.response.success) {
            that.sendFn();
      //     }
      //   });
    },

    // 发送验证码
    sendFn() {
      // getApp()
      //   .globalData.api.code({
      //     phone: this.data.mobile,
      //   })
      //   .then(res => {
      //     console.log(res,'33333333333')
      //     // if (res.code == 200 && res.response.success) {
      //     //   this.countDownFn();
      //     // } else {
      //     //   this.setData({ sendState: 3 });
      //     //   wx.showToast({ title: res.msg, icon: "none" });
      //     // }
      //   });
      var phoneurl = 'https://www.chinamas.cn/code';
      wx.request({
        //上线接口地址要是https测试可以使用http接口方式
         url: phoneurl,
         data: {
          phone:this.data.mobile
         },
         method: 'GET',
         header: {
          'content-type': 'application/json',
          'mode': 2
         },
         success: function (res) {
          console.log(res,'7777777777')
        if (res.code == 9999) {
            this.countDownFn();
          } else {
            this.setData({ sendState: 3 });
            wx.showToast({ title: res.msg, icon: "none" });
          }
         },
        })
     
    },

    // 倒计时
    countDownFn() {
      let that = this;
      let _this = this.data;
      this.setData({ sendState: 2 });
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

    // 绑定手机号
    bindingFn() {
      let that = this;
      // --- 验证手机号
      var p1 = /^1\d{10}$/;
      if (p1.test(that.data.mobile) == false) {
        return wx.showToast({ title: "请填写正确的手机号", icon: "none" });
      }
      if (this.data.validate == "") {
        return wx.showToast({ title: "请输入验证码", icon: "none" });
      }
      // // --- 绑定新手机号
      that.setData({ logonState: 1 });
      wx.showLoading({title: '登录中...',mask:true})
      getApp()
        .globalData.api.bangTell({
          tell: that.data.mobile,
          code: that.data.validate
        })
        .then(res => {
          if (res.bol != true) {
            that.setData({
              logonState: 0,
              isReset: true
            });
            return wx.showToast({ title: res.msg, icon: "none" });
          }
          that.triggerEvent("bindEnd", { bindBool: res.bol });
        });
    },

    // 手机号内容同步
    mobileFn(e) {
      this.setData({ mobile: e.detail.value });
    },

    // 验证码内容同步
    validateFn(e) {
      this.setData({ validate: e.detail.value });
    }

    // 完
  }
});
