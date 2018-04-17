import { Observer } from '@/common/core'
import { defineReactive } from '@/common/core/defineReactive'
import store from '@/common/states/store' 
import { getMapping } from '@/common/states/utils'

export default {
	initialize(){
		const { state = {} } = (store.content.get('options') || {})
		state.__ob__ = new Observer( state )
		return state
	}
}


//映射state
export const mapStates = function (mapping){
	const propsMap = getMapping(mapping)
	const { state } = store.instance
	const result = {}

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