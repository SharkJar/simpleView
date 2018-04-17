import store from '@/common/states/store' 
import { getMapping } from '@/common/states/utils'
import { defineReactive } from '@/common/core/defineReactive'

export default {
	initialize(){
		const { actions = {} } = store.content.get('options')
		const result = {}
		initActions(actions,result)
		return result
	} 
}

const initActions = function (actions,instanceActions){
	Object.keys(actions).forEach(key => {
		const value = actions[key]
		defineReactive(instanceActions,key,null,() => {
			return (...args) => {
				const { commit,state,getters } = store.instance
				//不需要返回值
				typeof value === "function"? value({ commit,state,getters },...args) : value
			}
		})
	})
}

export const mapActions = function (mapping){
	const propsMap = getMapping(mapping)
	const { actions } = store.instance
	const result = {}

	propsMap.forEach( 
		(mapKey,key) => {
			
			defineReactive(result,mapKey,actions[key])
			
		}
	)

	return result
}

