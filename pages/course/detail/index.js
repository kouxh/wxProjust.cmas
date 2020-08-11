
// 引入md5.js文件
// import utils from "../../../utils/md5.js";
import { hexMD5 } from "../../../utils/md5.js"
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    commit:'',
    isShow: false,//是否开通会员弹框
    id:0,
    controls:true,
    initialTime:0,
    commentList: [
      {
      avater: '/assets/img/avatar.png',
      name: '用户名',
      collected: 1,
      content:' 评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容'
    },
    {
      avater: '/assets/img/avatar.png',
      name: '用户名',
      collected: 0,
      content:' 评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容'
    },
    {
      avater: '/assets/img/avatar.png',
      name: '用户名',
      collected: 0,
      content:' 评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容'
    },
   ],
   collectionStatus:false,//是否收藏
   collectionNum:0,//收藏的个数
   handleLinks:false,//是否点赞
   handleLinksNum:0,//点赞的个数
   index:0,
   detailId:0,
   detailData:{},//获取详情数据
   isPay:false,//是否是付费会员
   submitBool: true, // 是否允许再次点击
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    
    that.setData({detailId:options.id });
    this.descDataFn();//大讲堂详情
  },
  //大讲堂详情
  descDataFn(){
    let that = this;
    //  let miyao = utils.hexMD5(5);  // 使用加密
    getApp().globalData.api.classRoomDesc({
     id:that.data.detailId
    }).then(res=>{
      if(res.bol==true){
        that.setData({
          detailData: res.data
        });
      }else{
        wx.showToast({ title: "获取数据失败,请稍后重试~", icon: "none" });
      }
    })
  },
   // 发表评论
   commentFn() {
    let that = this;
    if(that.data.commit==''){
      return wx.showToast({ title: "请输入评论内容", icon: "none" });
    }
    that.setData({ submitBool: false })
    // 评论
    getApp().globalData.api.commentInsertApi({
      type:3, //(必传 1、文章 2、杂志 3 、课堂)
      comment:that.data.commit,
      cid:that.data.detailId.trim(),
      uid:wx.getStorageSync('userInfoData').uid
    }).then(res => {
      if (res.bol == true) {
        that.setData({ 
          submitBool: true,
          commit: "" // 清空发送内容
         })
        wx.showToast({ title: res.data.MSG, icon: 'none' })
        // setTimeout(function () {
        //   that.descDataFn();//大讲堂详情
        // }, 800);
      } else {
        that.setData({ submitBool: true })
        wx.showToast({ title: res.err_msg, icon: 'none' })
      }
    })

  },
  // commentFn(){
  //   let that=this

  //   getApp().globalData.api.commentInsertApi({
  //     type:3, //(必传 1、文章 2、杂志 3 、课堂)
  //     comment:that.data.commit,
  //     cid:that.data.detailId,
  //     uid:wx.getStorageSync('userInfoData').uid
  //   }).then(res=>{
  //     console.log(res,'99999')
  //   })
  // },
  //视频切换暂停播放
play(e) {
  var that = this;
  var id = e.currentTarget.id;
  for (var i = 0; i < that.data.detailData.relevant.length; i++) {
    if (id === 'myVideo' + i) {
      //console.log('播放视频不做处理');
    } else {
      //console.log('暂停其他正在播放的视频');
      var videoContext = wx.createVideoContext("myVideo"+i, that);
      videoContext.pause();
    }
  }
},
  //收藏功能
  onCollectionTap: function(e){
    let that=this;
    if(that.data.collectionStatus==false){
      //如果当前状态是未收藏
      var collectionDatas = {
        type:3, //(必传 1、文章 2、杂志 3 、课堂)
        c_id:that.data.detailId.trim(),
        uid:wx.getStorageSync('userInfoData').uid
      };
        getApp()
        .globalData.api.joinCollectionApi({
         json:JSON.stringify(collectionDatas)
        })
        .then(res => {
          if (res.bol == true){
            that.setData({
              collectionStatus:true,
              collectionNum:++that.data.collectionNum
              })
              wx.showToast({ title: "收藏成功", icon: "none" });
              wx.setStorageSync('collectionStatus', true)
          }else{
           wx.showToast({ title: res.data.msg, icon: "none" });
          }
           
        });
    }else{
      //如果当前状态是已收藏
       wx.showToast({ title: "您已经收藏了", icon: "none" });
    }
     
  },
   // 显示点赞功能
  handleLinks: function(event) {
    let that=this;
    if(that.data.handleLinks==false){
      //如果当前状态是未点赞
      that.setData({
        handleLinks:true,
        handleLinksNum:++that.data.handleLinksNum
        })
    }else{
      //如果当前状态是已点赞
      that.setData({
        handleLinks:false,
        handleLinksNum:--that.data.handleLinksNum
        })
      }
  // // 获取当前点击下标
  // var index = event.currentTarget.dataset.index;
  // // data中获取列表
  // var message = this.data.commentList;
  // for (let i in message) { //遍历列表数据
  //   if (i == index) { //根据下标找到目标
  //     // var collectStatus = false
  //     if (message[i].collected == 0) { //如果是没点赞+1
  //       // collectStatus = true
  //       message[i].collected = parseInt(message[i].collected) + 1
  //     } else {
  //       // collectStatus = false
  //       message[i].collected = parseInt(message[i].collected) - 1
  //     }
  //     // wx.showToast({
  //     //   title: collectStatus ? '收藏成功' : '取消收藏',
  //     // })
  //   }
  // }
  // this.setData({
  //   commentList: message
  // })
},
  videoErrorCallback: function(e) {
    console.log('视频错误信息:')
  },
  bindVideoEnterPictureInPicture() {
    console.log('进入小窗模式')
  },

  bindVideoLeavePictureInPicture() {
    console.log('退出小窗模式')
  },
  bindtimeupdate(e){
    if(this.data.isPay==false&&e.detail.currentTime>=360){
      this.videoContext.pause();//暂停视频
      this.videoContext.stop();//停止视频
      this.setData({
        controls: false,
        isShow:true
      });
    }
  },
  //点击确认按钮触发
  onConfirm(e){
      this.setData({
        isShow:false,
        controls: true,
        initialTime:'362',
        isPay:true
      });
      this.videoContext.seek(362);//跳转到指定位置
      this.videoContext.play();//播放视频
      wx.navigateTo({
        url:'/pages/pay/index',
        // url: `/pages/pay/index/index?orderNo=${checkRes.response.OrderNumber}&price=${that.data.priceData.pay_money}`
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          paySuccessEvent: function (data) {
            console.log(data, '-----------refreshevent');
            if (data) {
              that.initialFn(that, 1);
            }
          },
        }
      })
      
     
  },
  // 点击取消时触发
  onClose() {
    this.setData({
      isShow:true,
      controls: false,
    });
    this.setData({ close: false });
  },


   // 编辑/添加地址 详细地址 同步
   commitFn(e) {
    this.setData({
      commit: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
      this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let collectionStatus = wx.getStorageSync('collectionStatus');
    if(collectionStatus){
      that.setData({
        collectionStatus:true,
        collectionNum:++that.data.collectionNum
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
    if (options.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '精彩视频',
      path: '/pages/course/detail/index?id='+ this.data.detailId,
      success: function(res) {
        // 转发成功，可以把当前页面的链接发送给后端，用于记录当前页面被转发了多少次或其他业务
      }
    }
  }
})