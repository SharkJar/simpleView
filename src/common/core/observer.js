import { defineReactive } from '@/common/core/defineReactive'
import Dep from '@/common/core/dep'
//引入数组监听
import '@/common/core/array'

//添加属性
const defineProp = function (sender = {},key = "",value = {},enumerable = false){
	Object.defineProperty(sender,key,{
		value,
		enumerable:!!enumerable,
		writable:true,
		configurable:true
	})
}

//重写
const reactive = function (sender = {},key = "",val = sender[key],shallow = false){
	const dep = new Dep()
	//获取监听对象
	let getObserve = value => {
		return !!!shallow && observe(value)
	}
	let childObs = getObserve(val)
	//拦截器 不需要返回值
	let getter = value => {
		if(!Dep.target){ return }
		//让当前的watcher对象添加dep
		dep.depend()
		if(!childObs){ return }
		//让当前的watcher对象添加dep
		childObs.dep.depend()
	}
	//拦截器 不需要返回值
	let setter = (newVal,value) => {
		childObs = getObserve(newVal)
		//执行当前dep拿到的watcher的update方法
		dep.notify()
	}
	//拦截属性
	defineReactive(sender,key,val,getter,setter)
}

//查看对象是否已经被监听了
const hasObserver = function (sender){
	return typeof sender === "object" && sender.hasOwnProperty('__ob__') && sender.__ob__ instanceof Observer
}

//检查对象是否被监听了，有监听就返回监听对象，没有就实例一个
const observe = function (sender = {}){
	//非对象不在监听
	if(sender == null || typeof sender !== "object"){ return }
	let obs = hasObserver(sender)? sender.__ob__ : new Observer(sender)
	return obs
}

//监听
export default class Observer{
	dep = new Dep()
	constructor(value){
		//如果已经存在observer了 就直接返回之前的observer
		if(hasObserver(value)){ return value.__ob__ }
		this.value = value
		//添加属性 标记已经监听过
		defineProp(value,'__ob__',this)
		if(Array.isArray(value)){
			return this.ObserverArray(value)
		}
		this.walk(value)
	}

	walk(sender){
		Object.keys(sender).forEach(key => { reactive(sender,key) })
	}


	ObserverArray(array){
		array.forEach(sender => observe(sender))
	}
}