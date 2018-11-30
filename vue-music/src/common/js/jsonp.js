/**
 * jsonp发送请求接口js
 * */
import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  /**
   * 获取url
   * 判断是否有？，如果没有就添加？，如果有就添加&
   * */
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  /**
   * 发送Promise请求
   * 成功就执行resolved，失败就执行reject
   * */
  return new Promise((resolved, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolved(data)
      } else {
        reject(err)
      }
    })
  })
}

/**
 * 创建链接拼接方法
 * data：需要拼接的参数
 * */
function param(data) {
  let url = '';
  for (let k in data) {
    /**
     * 判断data值是否为undefined，如果是就返回空值
     * */
    let value = data[k] != undefined ? data[k] : '';
    /**
     * 将data值依次拼接到url上
     * */
    url += `&${k}=${encodeURIComponent(value)}`
  }
  /**
   *  返回url
   *  截取第一次个&符号去掉
   * */
  return url ? url.substring(1) : ''
}

