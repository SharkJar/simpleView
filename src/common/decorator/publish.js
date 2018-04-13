//包装
const decorator = function (getter){
	return function (target,name,decorator){
		//描述器 value 不是方法，
		let getor = decorator.value || decorator.get()
		//返回描述
		return {
			enumerable: true,  
	    	configurable: true,
	    	get(){
	    		return getter(getor)
	    	}
		}
	}	
}
//存储methodStart的拦截器
const startEventMap = new Map()
export const methodStartPublish = function (eventName){
	let getter = target => {
		//不使用箭头函数
		return function (){
			//调用方法的参数
			let args = arguments,
				//拉取所有拦截器
				funcSet = startEventMap.get(eventName)

			//循环拦截器
			if(funcSet instanceof Set){
				funcSet.forEach(fn => {
					//上一个拦截器返回的结果是下一个拦截器的参数
					args = typeof fn === "function" && fn(...arguments,eventName) || args
				})
			}

			//执行结果
			return target(...args)
		}
	}
	return decorator(getter)
}

const finishEventMap = new Map()
export const methodFinishPublish = function (eventName){
	let getter = target => {
		return function (){
			//拿到结果
			let result = target(...arguments),
				//拉取所有拦截器
				funcSet = finishEventMap.get(eventName)

			//循环拦截器
			if(funcSet instanceof Set){
				funcSet.forEach(fn => {
					//上一个结果 是下一个拦截器的参数
					result = typeof fn === "function" && fn(result,eventName) || result
				})
			}

			//返回结果
			return result
		}
	}

	return decorator(getter)
}

//监听事件
export const onListening = function (eventName,func,publishType = "START"){
	let map = String(publishType).toUpperCase() === "START"? startEventMap : finishEventMap,
		funcSet = map.get(eventName)
	if(!(funcSet instanceof Set)){ funcSet = new Set() }
	funcSet.add(func)
	map.set(eventName,funcSet)
}
//开始执行函数的监听器
export const onStart = function (){
	onListening(...arguments)
}
//执行完毕函数的监听器
export const onFinish = function (eventName,func){
	onListening(eventName,func,'FINISH')
}
//描述器式拦截器
export const lintening = function (eventName,publishType = "START"){
	return function (target,name,decorator){
		//描述器 value 不是方法，
		let getor = (decorator && (decorator.value || decorator.get()) || target[name])
		onListening(eventName,getor,publishType)
		return decorator
	}
}
//描述器式拦截器 start
export const startListening = function (eventName){
	return lintening(eventName)
}
//描述器式拦截器 finish
export const finishListening = function (eventName){
	return lintening(eventName,'FINISH')
}



