import getProtocolUrl from '@/api/getProtocolUrl'

export const ACTION_EMUN = {
	APP:'app',
	MMS:'mms',
	LOANNAVIGATION:'loanNavigation',
	UBAS:'ubas'
}

const app = { method:"",url:getProtocolUrl.appUrl,actionType:ACTION_EMUN.APP }
const mms = { method:"",url:getProtocolUrl.mmsUrl,actionType:ACTION_EMUN.MMS }
const navigation = { url:getProtocolUrl.loanNavigationUrl,actionType:ACTION_EMUN.LOANNAVIGATION }
const ubas = { method:"",url:getProtocolUrl.ubasUrl,actionType:ACTION_EMUN.UBAS }

export const COMMON_EMPTY_LOG = { ...app,method:"qihoo.sdk.common.empty.log" }
//首页信息查询
export const ACCOUNT_SUMMARY_QUERY = { ...app,method:"qihoo.sdk.appl.summary.query" }
//公告
export const INFORM_MESSAGE_QUERY = { ...mms,method:"qihoo.sdk.inform.message.query" }
//营销广告
export const MARKETING_ACTIVITY_QUERY = { ...mms,method:"qihoo.sdk.marketing.activity.query" }
//优惠券弹窗
export const MARKETING_COUPON_POPUP_QUERY = { ...mms,method:"qihoo.sdk.marketing.coupon.popup.query" }
//多产品首页信息查询
export const APPL_MULTISUMMARY_QUERY = { ...app,method:"qihoo.sdk.appl.multisummary.query" }
//动用前检查
export const APPL_DRAW_PRECHECK = { ...app,method:"qihoo.sdk.appl.draw.precheck" }
//动用前检查 + 查询
export const APPL_DRAW_DECOUPLING_PRECHECK = { ...app,method:"qihoo.sdk.appl.draw.stage.precheck" }
//通用提交 创建流程
export const APPL_ITEM_COMMIT = { ...app,method:"qihoo.sdk.appl.item.commit" }
//商品列表
export const SHOPPING_MERCHANDISE_LIST = { ...app,method:"qihoo.sdk.shopping.merchandise.list" }
//登录前校验手机号码
export const USER_MOBILE_PREQUERY = { ...app,method:"qihoo.sdk.user.mobile.prequery" }
//发送短信
export const USER_SMS_SEND = { ...app,method:"qihoo.sdk.inform.sms.send" }
//语音验证码
export const INFORM_VOICECODE_SEND = { ...app,method:"qihoo.sdk.inform.voicecode.send" }
//登录
export const USER_INFO_LOGIN = { ...app,method:"qihoo.sdk.user.mobile.login" }
//优惠券
export const COMMON_COUPON_QUERY = { ...app,method:"qihoo.sdk.common.coupon.query" }
//消息
export const INFORM_MCMSG_COUNTNEW = { ...app,method:"qihoo.sdk.inform.mcmsg.countnew" }
//营销聚合类通用接口
export const MARKETING_POLYMERIZATION_QUERY = { ...app,method:"qihoo.sdk.marketing.polymerization.query" }
//指定用户进入APP首页显示的按钮列表查询
export const MARKETING_ACTIVITY_POPUP_QUERY = { ...mms,method:"qihoo.sdk.marketing.activity.popup.query" }
//补充认证列表查询
export const APPL_AUTHLIST_QUERY = { ...app,method:"qihoo.sdk.appl.authlist.query" }
//用户授权提交接口
export const USER_AUTH_COMMIT = { ...app,method:"qihoo.sdk.user.authorize.commit" }
//首页卡接口
export const MARKETING_ACTIVITY_CARDINFO = { ...mms,method:"qihoo.sdk.marketing.activity.cardInfo" }
//挂件查询
export const MARKETING_ACTIVITY_PENDANT = { ...mms,method:"qihoo.sdk.marketing.activity.pendant" }
//补件任务查询
export const APPL_SUPPLEMENT_LIST_QUERY = { ...app,method:"qihoo.sdk.appl.supplementlist.query" }
//袋中提额入口
export const MARKETING_ACTIVITY_POPUP_INFO = { ...mms,method:"qihoo.sdk.marketing.activity.popup.info" }
//提额弹窗
export const APPL_SUMMARY_POPUP = { ...app,method:"qihoo.sdk.appl.summary.popup" }


