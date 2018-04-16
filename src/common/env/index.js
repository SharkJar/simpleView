/**
 * 环境变量
 * by Xushaojia
 */
const uri = new URL(window.location.href)

//兼容性 获取url.params
const getParameter =  function(param) {
  let reg = new RegExp('[&,?]' + param + '=([^\\&]*)', 'i'),
    value = reg.exec(location.search);
  return value ? value[1] : '';
}

//兼容性
if(!uri.searchParams){
  uri.searchParams = {
    get(){ return getParameter(...arguments) },
    has(){ return !!getParameter(...arguments) }
  }
}

// can we use __proto__?
export const hasProto = '__proto__' in {}

// Browser environment sniffing
export const inBrowser = typeof window !== 'undefined'
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const serverEnv = String(uri.searchParams.get('serverEnv') || 'PRD').toUpperCase()
export const serverHttps = String(uri.searchParams.get('serverHttps') || 'Y').toUpperCase()
export const isLocal = (location.hostname == "localhost") || (location.hostname.indexOf('127.0.0.1') > -1)

// Firefox has a "watch" function on Object.prototype...
export const nativeWatch = ({}).watch

/* istanbul ignore next */
export function isNative (Ctor){
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

export const hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys)

