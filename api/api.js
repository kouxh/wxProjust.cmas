import fetch from "./http";
export default {
   
    /**
   *登录
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  login(params) {
    return fetch.fetchPost("applets/forum/login", params);
  },
  /**
   *大讲堂列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  classRoomList(params) {
    return fetch.fetchGet("applets/forum/classRoomList", params);
  },
   /**
   *大讲堂详情
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  classRoomDesc(params) {
    return fetch.fetchGet("applets/forum/classRoomDesc", params);
  },
  /**
   *基本信息展示
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  basicInfo(params) {
    return fetch.fetchGet("applets/forum/basicInfo", params);
  },
  /**
   *基本信息展示
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  basicUp(params) {
    return fetch.fetchGet("applets/forum/basicUp", params);
  },
  /**
   *新支付统一接口
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  unifiedPay(params) {
    return fetch.fetchPost("applets/forum/Pay/unifiedPay", params);
  },
   /**
   *增加评论
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  commentInsertApi(params) {
    return fetch.fetchPost("commentInsertApi", params);
  },
    /**
   *评论列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getUserCommentList(params) {
    return fetch.fetchGet("applets/forum/getUserComment", params);
  },
   /**
   *加入收藏
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  joinCollectionApi(params) {
    return fetch.fetchGet("applets/forum/insertCollection", params);
  },
    /**
   *小程序课堂点赞
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  classRoomGiveApi(params) {
    return fetch.fetchGet("applets/forum/classRoomGive", params);
  },
   /**
   *小程序分享
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  classRoomShareApi(params) {
    return fetch.fetchGet("applets/forum/classRoomShare", params);
  },

   /**
   *收藏列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  collectionList(params) {
    return fetch.fetchGet("applets/forum/collectionList", params);
  },
    /**
   *判断是否是VIP
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  checkUserVip(params) {
    return fetch.fetchGet("applets/forum/checkUserVip", params);
  },
   /**
   *获取用户余额与积分
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  UserMoney(params) {
    return fetch.fetchGet("applets/forum/getUserInfo", params);
  },
   /**
   *获取直播信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getLiveDesc(params) {
    return fetch.fetchGet("applets/forum/getLiveDesc", params);
  },
  /**
   *用户报名
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getUserSignUp(params) {
    return fetch.fetchGet("applets/forum/getUserSignUp", params);
  },
    /**
   *订单列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getOrderList(params) {
    return fetch.fetchGet("applets/forum/getOrderList", params);
  },
     /**
   *检测手机号
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  checkTellIsVip(params) {
    return fetch.fetchGet("applets/forum/checkTellIsVip", params);
  },
  /**
   *购买VIP添加送杂志收货地址
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  insertAddressVip(params) {
    return fetch.fetchPost("applets/forum/insertAddressVip", params);
  },
   /**
   *获取收货地址列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getAddressListApi(params) {
    return fetch.fetchGet("applets/forum/getAddressListApi", params);
  },
  /**
   *查询单条地址
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getOneAddressApi(params) {
    return fetch.fetchGet("applets/forum/getOneAddressApi", params);
  },
   /**
   *修改收货地址
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  upAddressVip(params) {
    return fetch.fetchPost("applets/forum/upAddressVip", params);
  },
 /**
   *购买VIP填写发票信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  insertInvoiceVip(params) {
    return fetch.fetchPost("applets/forum/insertInvoiceVip", params);
  },
   /**
   *修改发票信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  upInvoiceVip(params) {
    return fetch.fetchPost("applets/forum/upInvoiceVip", params);
  },
   /**
   *获取发票信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getInvoiceApi(params) {
    return fetch.fetchGet("applets/forum/getInvoiceApi", params);
  },
  /**
   *获取用户评论之后作者回复数量
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getReplyNumApi(params) {
    return fetch.fetchGet("applets/forum/getReplyNumApi", params);
  },
  /**
   *分享成团订单添加收货地址
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  orderAddressApi(params) {
    return fetch.fetchGet("applets/forum/orderAddressApi", params);
  },
/**
   *分享成团订单添加发票信息
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  orderInvoiceApi(params) {
    return fetch.fetchGet("applets/forum/orderInvoiceApi", params);
  },  
  /**
   *直播列表
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getLiveList(params) {
    return fetch.fetchGet("applets/forum/getLiveList", params);
  },
   /**
   *用户购买VIP发送通知信
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getPayMail(params) {
    return fetch.fetchGet("applets/forum/getPayMail", params);
  },
    /**
   *修改用户站内信状态为已读
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  upUserMailStatus(params) {
    return fetch.fetchGet("applets/forum/upUserMailStatus", params);
  },
  /**
   *检测用户是否在成团列表中
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  checkUserInGroup(params) {
    return fetch.fetchGet("applets/forum/checkUserInGroup", params);
  },
  /**
   *显示支付前的状态 --- 查询团是否满员
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getPayStatus(params) {
    return fetch.fetchGet("applets/forum/getPayStatus", params);
  },
    /**
   *分享详情
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getGroupInfo(params) {
    return fetch.fetchGet("applets/forum/getGroupInfo", params);
  },
  /**
   *分享页面详情显示数据
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  sharePageShow(params) {
    return fetch.fetchGet("applets/forum/sharePageShow", params);
  },

}

// 获得充值单支付参数
// // 订单列表
// export const getOrderList = function (params) {
//   return fetch.fetchGet(mokeUrl + "api/user/v1/order/list", params);
// };