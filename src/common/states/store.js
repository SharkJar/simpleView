
import { Observer,watcher } from '@/common/core'
import { defineReactive,proxy } from '@/common/core/defineReactive'
import Dep from '@/common/core/dep'

let instance = null
export default class store{
	constructor(options = {}){
		if(instance){ return instance }
		//标志初始化
		instance = this
		let { state = {},getters = {} } = options
		//进行数据监听
		this.__ob__ = new Observer( (this.state = state) )
		//初始化getter
		initGetter(getters)
	}
}

//初始化getter
const initGetter = function (getters){
	// instance.getters = {}

	// Object.keys(getters).forEach(key => {
	// 	let value = getters[key]

	// 	//监听依赖 有变化就改变缓存
	// 	//() => computed[key] 这部分不能直接返回value,这样他不会触发touch拿到依赖了
	// 	let watch = new watcher(instance.state,() => {
	// 		return typeof value === "function"? value : () => computed[key]
	// 	},undefined,{ lazy:true,deep:true })

	// 	defineReactive(instance.getters,key,watch.value, () => {
	// 		//懒加载
	// 		//当为true的时候 值有变化 需要拿到新值
	// 		if(watch.dirty){
	// 			//拿到最新的值
	// 			watch.evaluate()
	// 		}
	// 		//让下一级拿到依赖关系
	// 		//否则下一级没有依赖关系 就不会触发change
	// 		if(Dep.target){
	// 			//添加依赖
	// 			watch.depend()
	// 		}
	// 		return watch.value
	// 	})
	// })

	instance.getters = {}
	Object.keys(getters).forEach(key => {
		//缓存的值
		let val
		//属性
		let value = getters[key]
		//监听 touch一下值
		let watch = new watcher(instance.state,
			//keyOrFn
			() => {
				return typeof value === "function"? value(instance.state) : value
			},
			//callback
			(newVal,value) => {
				return (val = newVal)
			},
			//深度监听
			{ deep:true }
		) 

		defineReactive(instance.getters,key,
			//touch的时候 计算出来的值
			(val = watch.value),
			//getter
			() => val
		)
	})
}

//拿到映射关系
const getMapping = function (mapper){
	const propsMap = new Map()

	//单字符串
	if(typeof mapper === "string"){
		propsMap.set(mapper,mapper)

	//数组
	}else if(Array.isArray(mapper)){
		mapper.forEach(key => propsMap.set(key,key))

	//对象映射
	}else if(typeof mapper === "object"){
		Object.keys(mapper).forEach(sourceKey => {
			let mapKey = mapper[sourceKey]
			if(typeof mapKey === "function"){
				mapKey = mapKey()
			}
			if(typeof mapKey !== "string"){ return }
			propsMap.set(sourceKey,mapKey)
		})
	}

	return propsMap
}


//添加映射
const mapAction = function (propsMap,source){
	let result = {}

	propsMap.forEach( 
		(mapKey,sourceKey) => {
			//开始映射
			defineReactive(result,mapKey,undefined,() => source[sourceKey],(newVal,value,setter) => {
				if(setter){ return }
				source[sourceKey] = newVal
			})
		} 
	)

	return result
}

//映射state
export const mapStates = function (mapper){
	let propsMap = getMapping(mapper)

	return mapAction(propsMap,instance.state)
}

//映射getter
export const mapGetters = function (mapper){
	let propsMap = getMapping(mapper)

	return mapAction(propsMap,instance.getters)
}



