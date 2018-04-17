import store from '@/common/states/store' 
import { watcher } from '@/common/core'
import { defineReactive } from '@/common/core/defineReactive'
import { getMapping } from '@/common/states/utils'
import Dep from '@/common/core/dep'

export default {
	initialize(){
		const state = store.content.get('state')
		const { getters = {} } = store.content.get('options')
		const result = {}
		initGetter(getters,state,result)
		return result
	}
}


//初始化getter
const initGetter = function (getters,instanceState,instanceGetters){
	Object.keys(getters).forEach(key => {
		const value = getters[key]
		//监听依赖 有变化就改变缓存
		//() => computed[key] 这部分不能直接返回value,这样他不会触发touch拿到依赖了
		const watch = new watcher(instanceState,
			() =>  typeof value === "function"? value(instanceState) : getters[key],undefined,
			{ lazy:true,deep:true })

		defineReactive(instanceGetters,key,null, () => {
			//懒加载
			//当为true的时候 值有变化 需要拿到新值
			if(watch.dirty){
				//拿到最新的值
				watch.evaluate()
			}
			return watch.value
		})
	})
}

//映射getter
export const mapGetters = function (mapping){
	const propsMap = getMapping(mapping)
	const { state } = store.instance
	const { getters = {} } = store.content.get('options')
	const result = {}

	propsMap.forEach( 
		(mapKey,key) => {
			const value = getters[key]
			//监听依赖 有变化就改变缓存
			//() => computed[key] 这部分不能直接返回value,这样他不会触发touch拿到依赖了
			const watch = new watcher(state,
				() =>  typeof value === "function"? value(state) : getters[key],undefined,
				{ lazy:true,deep:true })

			defineReactive(result,mapKey,null, function (){
				return () => {
					//懒加载
					//当为true的时候 值有变化 需要拿到新值
					if(watch.dirty){
						//拿到最新的值
						watch.evaluate()
					}
					//让下一级拿到依赖关系
					//否则下一级没有依赖关系 就不会触发change
					if(Dep.target){
						//添加依赖
						watch.depend()
					}
					return watch.value
				}
			})
		}
	)

	return result
}