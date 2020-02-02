/*
 * @Author: Thor
 * @Date: 2018-04-24 10:02:30
 * @Last Modified by: Thor
 * @Last Modified time: 2018-05-23 14:55:18
 */

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (('' + time).length === 10) time = parseInt(time) * 1000
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') {.0. return ['一', '二', '三', '四', '五', '六', '日'][value - 1] }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  }
  
  export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()
  
    const diff = (now - d) / 1000
  
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  }
  
  export function deepCopy(p, c) {
    c = c || {}
    for (var i in p) {
      if (typeof p[i] === 'object') {
        c[i] =
          Object.prototype.toString.call(p[i]).slice(8, -1) === 'Array' ? [] : {}
        deepCopy(p[i], c[i])
      } else {
        c[i] = p[i]
      }
    }
    return c
  }
  
  export const downloadFile = (fileName, url) => {
    if (isIE()) {
      ieDown(url)
    } else {
      const aLink = document.createElement('a')
      const evt = document.createEvent('MouseEvents')
      // var evt = document.createEvent("HTMLEvents")
      evt.initMouseEvent(
        'click',
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      )
      aLink.download = fileName
      aLink.href = url
      aLink.dispatchEvent(evt)
    }
  }
  
  const ieDown = url => {
    window.open(url)
  }
  
  const isIE = () => {
    const explorer = window.navigator.userAgent
    return (
      explorer.indexOf('MSIE') >= 0 ||
      explorer.indexOf('Trident/7.0') >= 0 ||
      explorer.indexOf('Edge') >= 0
    )
  }
  /**
   * 生成上传文件名的规则
   * @param {*} len
   */
  export const randomString = function(len) {
    len = len || 32
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    var maxPos = $chars.length
    var ret = ''
    var time = new Date().getTime().toString()
    if (len / 2 > time.length) {
      len = len - time.length
    } else {
      len = len / 2
    }
    for (var i = 0; i < len; i++) {
      ret += $chars.charAt(Math.floor(Math.random() * maxPos))
      if (time[i]) {
        ret += time[time.length - i - 1]
      }
    }
    return ret
  }
  
  export function arrayDiff(a, b) {
    for (var i = 0; i < b.length; i++) {
      for (var j = 0; j < a.length; j++) {
        if (a[j] === b[i]) {
          a.splice(j, 1)
          j = j - 1
        }
      }
    }
    return a
  }
  
  // 数组去重
  export function removeRepeatArray(arr) {
    return arr.filter(function(item, index, self) {
      return self.indexOf(item) === index
    })
  }
  
  export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result
  
    const later = function() {
      // 据上一次触发时间间隔
      const last = +new Date() - timestamp
  
      // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last)
      } else {
        timeout = null
        // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
        if (!immediate) {
          result = func.apply(context, args)
          if (!timeout) context = args = null
        }
      }
    }
  
    return function(...args) {
      context = this
      timestamp = +new Date()
      const callNow = immediate && !timeout
      // 如果延时不存在，重新设定延时
      if (!timeout) timeout = setTimeout(later, wait)
      if (callNow) {
        result = func.apply(context, args)
        context = args = null
      }
  
      return result
    }
  }
  
  // 获取可视窗宽高
  function getViewPortWH() {
    return {
      clientW: document.documentElement.clientWidth || document.body.clientWidth,
      clientH: document.documentElement.clientHeight || document.body.clientHeight
    }
  }
  // 查看大图
  export function viewPhotos(event, url_close, img_box_id) {
    let o_box = document.getElementById(img_box_id)
    const clientW = getViewPortWH().clientW
    const clientH = getViewPortWH().clientH
    const top_bottom_centre = event.target.getBoundingClientRect().top + 32
    const left_right_centre = event.target.getBoundingClientRect().left + 32
    const top = event.target.getBoundingClientRect().top
    const bottom = event.target.getBoundingClientRect().bottom
    const left = event.target.getBoundingClientRect().left
    const right = event.target.getBoundingClientRect().right
  
    if (url_close === 'close') {
      o_box.style.display = 'none'
      return false
    } else if (url_close === '' || !url_close || typeof url_close === undefined) {
      return false
    }
    o_box && (o_box.style.display = 'block', o_box.getElementsByTagName('img')[0].src = url_close) || (
      o_box = document.createElement('div'),
      o_box.id = img_box_id,
      o_box.innerHTML = '<img style="width: 350px; height: 350px;" src="' + url_close + '">',
      o_box.style.position = 'fixed',
      o_box.className = 'img-box-id',
      o_box.style.zIndex = 999999,
      o_box.style.width = '350px',
      o_box.style.height = '350px',
      o_box.style.border = '1px solid #ccc',
      o_box.style.background = 'white',
      o_box.addEventListener('mouseover', function() {
        this.style.display = 'block'
      }),
      o_box.addEventListener('mouseout', function() {
        this.style.display = 'none'
      }),
      document.getElementsByTagName('body')[0].appendChild(o_box)
    )
    o_box.style.top = top_bottom_centre > clientH / 2 ? (bottom - 350 - 1 + 'px') : (o_box.style.top = top - 1 + 'px')
    o_box.style.left = left_right_centre > clientW / 2 ? (left - 350 - 5 + 'px') : (o_box.style.left = right + 5 + 'px')
  }
  