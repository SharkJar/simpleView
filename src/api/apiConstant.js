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

export const COMMON_EMPTY_LOG = { ...app,method:"...." }
//首页信息查询
export const ACCOUNT_SUMMARY_QUERY = { ...app,method:"...." }
//公告
export const INFORM_MESSAGE_QUERY = { ...mms,method:"...." }


