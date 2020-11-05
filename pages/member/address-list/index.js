const app = getApp();
Page({
  // 页面的初始数据
  data: {
    originalRessList: [], // 地址列表数据(原后台数据)
    isIphoneX: getApp().globalData.isIphoneX,
    isBtnClicked: false, //点击的初始数据
    isLoad:true,//是否加载
    orderNum:'',//订单编号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNum:options.orderNum
    })
    this.gainRessListFn();
  },
  // 获取地址列表
  gainRessListFn() {
    let that = this;
    getApp()
      .globalData.api.getAddressListApi({
        uid: wx.getStorageSync("userInfoData").uid,
      })
      .then(res => {
        if (res.bol==true) {
          that.setData({
            originalRessList: res.data,
            isLoad:false
          });
        }else{
          return wx.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      });
  },


  // 点击“新增地址”时
  onAdd() {
    if (!this.data.isBtnClicked) {
      wx.navigateTo({
        url: '/pages/member/address/index'
      })
      this.setData({
        isBtnClicked: true
      })
      setTimeout(() => {
        this.setData({
          isBtnClicked: false
        })
      }, 200);
    }
  },

  

  // 点击“地址删除按钮”时
  // --- index 该地址的数组索引值
  onDelete(e) {
    let that = this;
    let ressid = e.currentTarget.dataset.ressid;
    if (that.data.originalRessList.length == 1)
      return wx.showToast({
        title: "请至少保留一个地址",
        icon: "none"
      });
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 删除收货地址
          getApp()
            .globalData.api.deleteuseraddress({
              id: ressid
            })
            .then(res => {
              if (res.code == 200 && res.response.success) {
                wx.showToast({
                  title: "删除成功",
                  icon: "none"
                });
                that.gainRessListFn();
                // 获取添加后的地址列表
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: "none"
                });
              }
            });
        }
      }
    });
  },
//分享成团订单添加收货地址
orderAddressApi(e){
  let that =this;
  if(that.data.orderNum!=undefined){
    getApp()
    .globalData.api.orderAddressApi({
      uid:wx.getStorageSync("userInfoData").uid,
      aid:e.currentTarget.dataset.addid,
      orderNum:that.data.orderNum
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
  }
  

},
  // 点击“编辑地址”时
  onEdit(e) {
    wx.navigateTo({
      url: '/pages/member/address/index?id=' + e.currentTarget.dataset.editid
    })
  },
   // 兼容ios下拉
   onPageScroll:function(e){
    if(e.scrollTop<0){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.addressData) {
      this.gainRessListFn();
      this.data.addressData = null;
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
})