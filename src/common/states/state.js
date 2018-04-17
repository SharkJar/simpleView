import { Observer } from '@/common/core'
import { defineReactive } from '@/common/core/defineReactive'
import store from '@/common/states/store' 
import { getMapping } from '@/common/states/utils'

export default {
	initialize(){
		let { state = {} } = (store.content.get('options') || {})
		state.__ob__ = new Observer( state )
		return state
	}
}


//映射state
export const mapStates = function (mapping){
	let propsMap = getMapping(mapping)
	let { state } = store.content.get('instance')
	let result = {}

	propsMap.forEach( 
		(mapKey,sourceKey) => {
			//开始映射
			defineReactive(result,mapKey,undefined,() => state[sourceKey],(newVal,value,setter) => {
				if(setter){ return }
				state[sourceKey] = newVal
			})
		} 
	)

	return result
}