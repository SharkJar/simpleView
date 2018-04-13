import apiFactory from '@/api/apiFactory'
import { ACTION_EMUN } from '@/api/apiConstant'
import { methodStartPublish,methodFinishPublish,startListening,finishListening } from '@/common/decorator'

export const instance = {
	@methodFinishPublish('mms_request')
	@methodStartPublish('mms_request')
	request(apiConstant = {},requestData = {},otherOptions = {}){
		console.log('mms request',apiConstant)
	},

	initialize(){
		console.log('mms initialize')
	},

	@startListening('mms_request')
	requestStartHook(){
		console.log('mms request start')
	},
	@finishListening('mms_request')
	requestFinishHook(){
		console.log('mms request finish')
	}
}

apiFactory.instance.set(ACTION_EMUN.MMS,instance)

