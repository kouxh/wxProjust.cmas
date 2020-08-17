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
   *支付接口
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  getPrepayId(params) {
    return fetch.fetchGet("applets/forum/Pay/getPrepayId", params);
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


}

// 获得充值单支付参数
// // 订单列表
// export const getOrderList = function (params) {
//   return fetch.fetchGet(mokeUrl + "api/user/v1/order/list", params);
// };