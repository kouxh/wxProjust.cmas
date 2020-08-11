// 引入md5.js文件
import utils from "../../../utils/md5.js";
// var util = require('../../utils/md5.js')    
//获取应用实例
const app = getApp()
let meigeSP=[] //每个视频的距离顶部的高度
let distance=0 //标记页面是向下还是向上滚动
let indexKey=0 //标记当前滚动到那个视频了
Page({
  data: {
    active: 1,//tab栏默认选中
    videoPlay: null,
    dataList: [],////视频数据
    _index: 0, //当前正在播放视频的数组下标
    currentTime:0,//播放的当前时间
    durationTime:1//视频总时间
  },
  onLoad: function (options) {
    // 基础数据监测,以及初始请求
    let that =this;
    this.getData();
    this.spHeight();//获取每个视频的距离顶部的高度
  
    this.listDataFn();  //大讲堂列表
  },
  

  //大讲堂列表
  listDataFn(){
    let that = this;
    //  let miyao = utils.hexMD5(5);  // 使用加密
    getApp().globalData.api.classRoomList({
      where:"CMAS大讲堂"
    }).then(res=>{
      if(res.bol==true){
        that.setData({
          dataList: res.data
        });
      }else{
        wx.showToast({ title: "res.msg", icon: "none" });
        wx.reLaunch({
          url: '/pages/login/index',
        })
      }
    })
  },
 
  //tab栏切换
  onChange(event) {
  },
  //获取每个视频的距离顶部的高度
  spHeight() { 
    //微信api获取节点
    let query = wx.createSelectorQuery();
    query.selectAll('.item-box').boundingClientRect() //每个视频的高度
    query.exec((rect) => {
      console.log(rect, 222)
      rect[0].forEach(item => {
        meigeSP.push(item.top)
      })
    })
  },
  //页面滚动触发
  onPageScroll(event) {
    let scrollTop = event.scrollTop //页面滚动
    if (scrollTop==0){
      indexKey=0
      this.setData({ _index:indexKey})
    }

    console.log(scrollTop)
    if (scrollTop >= distance) { //页面向上滚动indexKey
      if (indexKey + 1 < meigeSP.length && scrollTop >= meigeSP[indexKey] * 0.9) {
        this.setData({ _index: indexKey + 1 })
        indexKey += 1
        console.log("indexKey", indexKey)
      }
    } else { //页面向下滚动
      if (distance - scrollTop < 15) { //每次滚动的距离小于15时不改变  减少setData的次数
        return
      }
      if (indexKey - 1 > 0 && scrollTop < meigeSP[indexKey - 1]) {
        indexKey -= 1
        this.setData({ _index: indexKey })
      }
    }
    distance = scrollTop
  },
  // 点击cover播放，其它视频结束
  videoPlay: function (e) {
    var _index = e.currentTarget.dataset.id
    console.log(_index,'333')
    this.setData({
      _index: _index
    })
    //停止正在播放的视频
    var videoContextPrev = wx.createVideoContext(this.data._index+"")
    videoContextPrev.stop();

    setTimeout(function () {
      //将点击视频进行播放
      var videoContext = wx.createVideoContext(_index + "")
      videoContext.play();
    }, 500)
  },
  // 播放进度变化时触
  bindtimeupdate(e){
    // let time = e.detail.currentTime;
    // console.log(time,'www')
    // let n = Math.floor(time);
    this.setData({
      currentTime:e.detail.currentTime,
      durationTime:e.detail.duration
    })
    // if(this.data.isPay==false&&e.detail.currentTime>=360){
    //   this.videoContext.pause();//暂停视频
    //   this.videoContext.stop();//停止视频
    //   this.setData({
    //     controls: false,
    //     isShow:true
    //   });
    // }
  },

  // 模拟数据加载
  getData: function () {
    this.setData({
      dataList: [
        { "id": 0, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://res.ycclass.iubug.com//endub/video/202005/gyfj3lnyh4_1590738493.mp4?t=123", "cover": "/assets/img/content.png" }, 
        { "id": 1, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://res.ycclass.iubug.com//endub/video/202005/gyfj3lnyh4_1590738493.mp4?t=123", "cover": "/assets/img/content.png" },
         { "id": 2, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://res.ycclass.iubug.com//endub/video/202005/gyfj3lnyh4_1590738493.mp4?t=123", "cover": "/assets/img/content.png" },
          { "id": 3, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://vd3.bdstatic.com/mda-ik612hibuvsh1y00/mda-ik612hibuvsh1y00.mp4", "cover": "/assets/img/content.png" },
           { "id": 4, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://vd3.bdstatic.com/mda-ik7z53vapnv0x0cq/mda-ik7z53vapnv0x0cq.mp4", "cover": "/assets/img/content.png" },
            { "id": 5, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://res.ycclass.iubug.com//endub/video/202005/gyfj3lnyh4_1590738493.mp4?t=123", "cover": "/assets/img/content.png" },
             { "id": 6, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://res.ycclass.iubug.com//endub/video/202005/gyfj3lnyh4_1590738493.mp4?t=123", "cover": "/assets/img/content.png" },
              { "id": 7, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://vd3.bdstatic.com/mda-ik6254k2dwqi75zr/mda-ik6254k2dwqi75zr.mp4", "cover": "/assets/img/content.png" }, 
              { "id": 8, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://res.ycclass.iubug.com//endub/video/202005/gyfj3lnyh4_1590738493.mp4?t=123", "cover": "/assets/img/content.png" },
               { "id": 9, "title": "CMAS走进某企业，与企业高管深度交流，讨论数字化转型的成功经验", "content": "https://res.ycclass.iubug.com//endub/video/202005/gyfj3lnyh4_1590738493.mp4?t=123", "cover": "/assets/img/content.png" }]
    });

  },
  // 视频播放出错时触发
  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
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