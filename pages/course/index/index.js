// 引入md5.js文件
import utils from "../../../utils/md5.js";
import {checkLogin} from "../../../utils/util";
//获取应用实例
const app = getApp()
let meigeSP=[] //每个视频的距离顶部的高度
let distance=0 //标记页面是向下还是向上滚动
let indexKey=0 //标记当前滚动到那个视频了
Page({
  data: {
    videoPlay: null,
    dataList: [],//视频数据
    _index:0, //当前正在播放视频的数组下标
    currentTime:0,//播放的当前时间
    durationTime:1,//视频总时间
    liveData:{},//直播图片
    end:null,//视频播放结束
    autoplay:false,
    url:'/assets/img/1.png'
  },
  onLoad: function (options) {
    // 基础数据监测,以及初始请求
    let that =this;
    that.listDataFn();  //大讲堂列表
    setTimeout(() => {
      that.spHeight();//获取每个视频的距离顶部的高度
    }, 2000);
  },
  //大讲堂列表
 listDataFn(){
    let that = this;
    var listurl = 'https://www.chinamas.cn/applets/forum/classRoomList';
    wx.request({
      //上线接口地址要是https测试可以使用http接口方式
      url: listurl,
      data: {
        where:"CMAS大讲堂"
      },
      method: 'GET',
      header: {
        'content-type': 'application/json',
      },
      success: function (res) {
        if(res.data.bol==true){
          wx.nextTick(() => {
            that.setData({
              dataList: res.data.data.list,
              liveData:res.data.data.live,
            });
          });
        }else{
          wx.showToast({ title: res.data.err_msg, icon: "none" });
        }
      },
    })
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
      if (indexKey + 1 < meigeSP.length && scrollTop >= meigeSP[indexKey] * 1) {
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

  // 视频播放出错时触发
  videoErrorCallback(e) {
    console.log('视频错误信息:')
    console.log(e.detail.errMsg)
  },
  //点击跳转到详情
  goDetail:function(e){
    var id=parseInt(e.currentTarget.dataset.id);
    checkLogin('/pages/course/detail/index?id='+id,1,true,1);
  },
  //点击跳转到直播详情
  liveFn(){
    checkLogin('/pages/course/live-detail/index?id='+this.data.liveData.l_id,1,true,1);
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