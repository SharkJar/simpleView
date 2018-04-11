import { Observer,watcher } from '@/common/core'
import { defineReactive } from '@/common/core/defineReactive'

const proxy = function (sender,source,key){
	defineReactive(sender,key,undefined,() => source[key],(newVal,value,setter) => {
		if(setter){ return }
		source[key] = newVal
	})
}

//监听计算
const initComputed = function (sender,computed){
	sender.__watcher__ = sender.__watcher__ || new Set()
	Object.keys(computed).forEach(key => {
		let val
		let value = computed[key]
		//监听依赖 有变化就改变缓存
		let watch = new watcher(sender,value,(newVal,value) => (val = newVal))
		sender.__watcher__.add(watch)
		defineReactive(sender,key,(val = watch.value),() => val)
	})
}
//初始化data
const initDat = function (sender,data){
	Object.keys(data).forEach(key => {
		return proxy(sender,data,key)
	})
}
//初始化wathcer
const initWatch = function (sender,data,watch){
	sender.__watcher__ = sender.__watcher__ || new Set()
	Object.keys(watch).forEach(key => {
		let value = watch[key]
		let wtc = new watcher(data,key,(newVal,val) => {
			let fn = typeof value === "function"? value : (typeof sender[value] === "function"? sender[value] : () => {})
			fn.call(sender,newVal,val)
		})
		sender.__watcher__.add(wtc)
	})
}


export default class view{
	constructor(options = {}){
		options = this.$options = options || {}
		let data = typeof options.data === "function"? options.data() : (options.data || {})
		let computed = options.computed || {}
		let watch = options.watch || {}
		initDat(this,data)
		this.__ob__ = new Observer(data)
		initComputed(this,computed)
		initWatch(this,data,watch)
		this.render = options.render || this.render
		this.update = options.update || this.update
		//监听render的依赖 
		//当依赖改变 触发render
		this.__viewWatcher__ = new watcher(this,this.render.bind(this),() => {
			this.update()
		},
		//方便触发update
		{ deep:true })
	}

	update(){
		console.log(arguments,'update')
	}

	render(){
		console.log(arguments,'render')
	}
}