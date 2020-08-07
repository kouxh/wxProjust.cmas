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

module.exports = {
  formatTime: formatTime,
  setStorage:setStorage,
  dateFormatter:dateFormatter,
  deleteEmptyProperty:deleteEmptyProperty,
  formateObjToParamStr:formateObjToParamStr
}
