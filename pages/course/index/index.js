// 引入md5.js文件
import utils from "../../../utils/md5.js";
//获取应用实例
const app = getApp()
let meigeSP=[] //每个视频的距离顶部的高度
let distance=0 //标记页面是向下还是向上滚动
let indexKey=0 //标记当前滚动到那个视频了
Page({
  data: {
    active: 1,//tab栏默认选中
    videoPlay: null,
    dataList: [
      // { title: "标题", content: ""},
    ],//视频数据
    _index:0, //当前正在播放视频的数组下标
    currentTime:0,//播放的当前时间
    durationTime:1,//视频总时间
    liveData:{},//直播图片
    end:null,//视频播放结束
    autoplay:false,
  },
  onLoad: function (options) {
    // 基础数据监测,以及初始请求
    let that =this;
    // this.getData();
    that.listDataFn();  //大讲堂列表
    setTimeout(() => {
      that.spHeight();//获取每个视频的距离顶部的高度
    }, 2000);
  },
  

  //大讲堂列表
 listDataFn(){
    let that = this;
    getApp().globalData.api.classRoomList({
      where:"CMAS大讲堂"
    }).then(res=>{
      if(res.bol==true){
        // wx.nextTick(() => {
          that.setData({
            ss:res.data,
            dataList: res.data.list,
            liveData:res.data.live,
          });
          console.log(that.data.dataList,'0000')
        // });
       
      }else{
        wx.showToast({ title: "res.msg", icon: "none" });
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
      rect[0].forEach(item => {
        meigeSP.push(item.top)
      })
      console.log(meigeSP,'222')
    })
  },
  //页面滚动触发
  onPageScroll(event) {
    this.setData({
      end:null,
      autoplay:true
    })
    let scrollTop = event.scrollTop //页面滚动
    if (scrollTop==0){
      indexKey=0
      this.setData({ _index:indexKey})
    } 
    if (scrollTop >= distance) { //页面向上滚动indexKey
      // if(indexKey + 1 < meigeSP.length&&scrollTop < meigeSP[indexKey] * 0.9){
      //   indexKey=0
      //   this.setData({ _index:indexKey})
      // }
      if (indexKey + 1 < meigeSP.length && scrollTop >= meigeSP[indexKey] * 0.9) {
        this.setData({ _index: indexKey + 1 })
        indexKey += 1
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
  // 当播放到末尾时触发 ended 事件
  bindended(e){
    this.setData({
      end:e.type,
    })
  },
  // 播放进度变化时触
  // bindtimeupdate(e){
  //   // let time = e.detail.currentTime;
  //   // let n = Math.floor(time);
  //   this.setData({
  //     currentTime:e.detail.currentTime,
  //     durationTime:e.detail.duration
  //   })
  //   console.log(this.data.currentTime,'0000',this.data.durationTime)
    
  // },

  // 模拟数据加载
  // getData: function () {
  //   this.setData({
  //     dataList: [
  //       { "id": 0, "title": "标题", "content": "https://res.ycclass.iubug.com//endub/video/202005/gyfj3lnyh4_1590738493.mp4?t=123"}, ]
  //   });
  // },
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