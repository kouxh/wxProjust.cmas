const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 【 将数据同时存入'global和storage'中 】
// 【 设置存储 】
// --- key 键
// --- value 值
// --- app GetApp()开发者可以通过 getApp 方法获取到全局唯一的 App 示例
function setStorage(key, value, app) {
  if (app != null) {
    app.globalData[key] = value;
  }
  wx.setStorageSync(key, value);
}
function dateFormatter(nows) {
  if (!nows) return ''
  var now = new Date(nows)
  var year = now.getFullYear()
 
  var month = now.getMonth() + 1
  month = checkAddZone(month)
 
  var date = now.getDate()
  date = checkAddZone(date)
  return year + '-' + month + '-' + date
}
 
function checkAddZone (num) {
  return num<10 ? '0' + num.toString() : num
}
//删除json对象中空值
function deleteEmptyProperty(obj){
  var object = obj;
  for (var i in object) {
      var value = object[i];
      if (typeof value === 'object') {
          if (Array.isArray(value)) {
              if (value.length == 0) {
                  delete object[i];
                  continue;
              }
          }
          this.deleteEmptyProperty(value);
      } else {
          if (value === '' || value === null || value === undefined) {
              delete object[i];
          }
      }
  }
  return object;
}
//javascript将对象转换为url参数
function filter(str) { // 特殊字符转义
  str += ''; // 隐式转换
  str = str.replace(/%/g, '%25');
  str = str.replace(/\+/g, '%2B');
  str = str.replace(/ /g, '%20');
  str = str.replace(/\//g, '%2F');
  str = str.replace(/\?/g, '%3F');
  str = str.replace(/&/g, '%26');
  str = str.replace(/\=/g, '%3D');
  str = str.replace(/#/g, '%23');
  return str;
}

function formateObjToParamStr(paramObj) {
  const sdata = [];
  for (let attr in paramObj) {
    sdata.push(`${attr}=${filter(paramObj[attr])}`);
  }
  return sdata.join('&');
};

// 根据直播时间，计算直播的报名状态
function liveStatusFn(nowTime, startTime, endTime) {
  // 返回值 Number  0等待中  1进行中  2活动结束
  // nowTime 必传 String 现在时间字符串
  // startTime 必传 String 开始时间字符串
  // endTime 必传 String 结束时间字符串
  console.log(nowTime,startTime,endTime,'6666666666')
  let now = Date.parse(dateFormat(nowTime, "yyyy/MM/dd hh:mm:ss"));
  let start = Date.parse(dateFormat(startTime, "yyyy/MM/dd hh:mm:ss"));
  let end = Date.parse(dateFormat(endTime, "yyyy/MM/dd hh:mm:ss"));
  console.log(now,start,end)
  let liveStatus;
  console.log(parseInt(((start-now)% (1000 * 60 * 60)) / (1000 * 60)),'000')
  if (parseInt(((start-now)% (1000 * 60 * 60)) / (1000 * 60))>0&&parseInt(((start-now)% (1000 * 60 * 60)) / (1000 * 60))<=30) {
    liveStatus = 0;
  } else if (start < now && now < end) {
    liveStatus = 1;
  } else if(now > end) {
    liveStatus = 2;
  }
  return liveStatus;
};
// 【 时间格式化2 】
 function dateFormat(datetime, fmt) {
  // 作用：可以将[2019-07-02]转为[2019/07/02]
  // datetime 必选 String 时间字符串(如2019-07-02 08:09:04)
  // fmt 必选 String 要转化的格式(如yyyy-MM-dd hh:mm:ss.S)
  if (!datetime) return "";
  var date;
  if (typeof datetime === "string") {
    datetime = datetime.replace(/\.\d+/, ""); // remove milliseconds
    datetime = datetime.replace(/-/, "/").replace(/-/, "/");
    datetime = datetime.replace(/T/, " ").replace(/Z/, " UTC");
    datetime = datetime.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
    datetime = datetime.replace(/([\+\-]\d\d)$/, " $100"); // +09 -> +0900
    date = new Date(datetime);
  } else {
    date = datetime;
  }
  var date = new Date(datetime);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

module.exports = {
  formatTime: formatTime,
  setStorage:setStorage,
  dateFormatter:dateFormatter,
  deleteEmptyProperty:deleteEmptyProperty,
  formateObjToParamStr:formateObjToParamStr,
  liveStatusFn:liveStatusFn,
  dateFormat:dateFormat
}
