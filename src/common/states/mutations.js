import store from '@/common/states/store' 
import { getMapping } from '@/common/states/utils'
import { defineReactive } from '@/common/core/defineReactive'

export default {
	initialize(){
		const { mutations = {} } = store.content.get('options')
		const result = {}
		initMutations(mutations,result)
		return result
	} 
}

const initMutations = function (mutations,instanceMutations){
	Object.keys(mutations).forEach(key => {
		const value = mutations[key]
		defineReactive(instanceMutations,key,null,() => {
			return (...args) => {
				const { state } = store.instance
				//不需要返回值
				typeof value === "function"? value(state,...args) : value
			}
		})
	})
}

export const mapMutations = function (mapping){
	const propsMap = getMapping(mapping)
	const { mutations } = store.instance
	const result = {}

	propsMap.forEach( 
		(mapKey,key) => {
			
			defineReactive(result,mapKey,mutations[key])
			
		}
	)

	return result
}