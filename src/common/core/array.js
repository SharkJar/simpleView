import { defineReactive } from '@/common/core/defineReactive'

['push','pop','shift','unshift','splice','sort','reverse'].forEach(key => {

	let method = Array.prototype[key]
	defineReactive(Array.prototype,key,function (...args){
		const result = method.apply(this,args)
		//非监听数组
		if(!('__ob__' in this) || !('dep' in this['__ob__'])){ return result }
		let { ObserverArray,dep } = this['__ob__']
		let inserted
		switch(key){
			case "push":
			case "unshift":
				inserted = args
				break
			case "splice":
				inserted = args.splice(2)
				break
		}
		//监听新增加部分
		if(inserted && typeof ObserverArray === "function"){
			ObserverArray(inserted)
		}
		//通知变化
		dep.notify()
		return result
	})

})