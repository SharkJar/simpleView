
import { Observer,watcher } from '@/common/core'
import { defineReactive,proxy } from '@/common/core/defineReactive'

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



