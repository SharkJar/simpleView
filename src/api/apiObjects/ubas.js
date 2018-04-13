import apiFactory from '@/api/apiFactory'
import { ACTION_EMUN } from '@/api/apiConstant'

export const instance = {
	request(apiConstant = {},requestData = {},otherOptions = {}){
		console.log('ubas request')
	},

	initialize(){
		console.log('ubas initialize')
	}
}

apiFactory.instance.set(ACTION_EMUN.UBAS,instance)

