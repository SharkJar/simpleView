import apiFactory from '@/api/apiFactory'
import { ACTION_EMUN } from '@/api/apiConstant'
import { methodStartPublish,methodFinishPublish,startListening,finishListening } from '@/common/decorator'
 
export const instance = {
	@methodFinishPublish('app_request')
	@methodStartPublish('app_request')
	request(apiConstant = {},requestData = {},otherOptions = {}){
		console.log('app request',apiConstant,requestData,otherOptions)
		return new Promise(res => res("返回一个结果"))
	},

	initialize(){
		console.log('app initialize')
	},

	@startListening('app_request')
	requestStartHook(){
		console.log('app request start')
	},
	@finishListening('app_request')
	requestFinishHook(){
		console.log('app request finish')
	}
}

apiFactory.instance.set(ACTION_EMUN.APP,instance)

