import apiFactory from '@/api/apiFactory'
import { ACTION_EMUN } from '@/api/apiConstant'

export const instance = {
	request(apiConstant = {},requestData = {},otherOptions = {}){
		console.log('loanNavigation request')
	},

	initialize(){
		console.log('loanNavigation initialize')
	}
}

apiFactory.instance.set(ACTION_EMUN.LOANNAVIGATION,instance)

