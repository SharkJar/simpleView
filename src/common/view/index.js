import { Observer,watcher } from '@/common/core'
import { defineReactive,proxy } from '@/common/core/defineReactive'
import Dep from '@/common/core/dep'

//监听计算
const initComputed = function (sender,computed){
	sender.__watcher__ = sender.__watcher__ || new Map()

	Object.keys(computed).forEach(key => {
		let value = computed[key]

		//监听依赖 有变化就改变缓存
		//() => computed[key] 这部分不能直接返回value,这样他不会触发touch拿到依赖了
		let watch = new watcher(sender,typeof value === "function"? value : () => computed[key],undefined,{ lazy:true })
		sender.__watcher__.set(key,watch)

		defineReactive(sender,key,null, () => {
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
		})
	})
}
//初始化data
const initProxy = function (sender,data){
	Object.keys(data).forEach(key => {
		//映射
		return proxy(sender,data,key)
	})
}
//初始化wathcer
const initWatch = function (sender,watch){
	sender.__watcher__ = sender.__watcher__ || new Map()
	Object.keys(watch).forEach(key => {
		let value = watch[key]

		let wtc = new watcher(sender,typeof value === "function"? value : () => watch[key])
		sender.__watcher__.set(key,watch)

		defineReactive(sender,key,null,() => {
			//懒加载
			//当为true的时候 值有变化 需要拿到新值
			if(wtc.dirty){
				//拿到最新的值
				wtc.evaluate()
			}
			return wtc.value
		})
	})
}

export default class view{
	constructor(options = {}){
		options = this.$options = options || {}
		let data = options.data = typeof options.data === "function"? options.data() : (options.data || {})
		let methods = options.methods = typeof options.methods === "function"? options.methods() : (options.methods || {})
		let computed = options.computed = typeof options.computed === "function"? options.computed() : (options.computed || {})
		let watch = options.watch = typeof options.watch === "function"? options.watch() : (options.watch || {})

		//钩子
		typeof options.beginCreate === "function" && options.beginCreate()

		//映射data
		initProxy(this,data)
		//映射methods
		initProxy(this,methods)
		this.__ob__ = new Observer(data)
		//初始化computed
		initComputed(this,computed)
		//初始化watch
		initWatch(this,watch)
		this.render = options.render || this.render
		this.update = options.update || this.update
		//监听render的依赖 
		//当依赖改变 触发render
		this.__viewWatcher__ = new watcher(this,this.render.bind(this),() => {
			this.update()
		},
		//方便触发update
		{ deep:true })

		//钩子
		typeof options.created === "function" && options.created()
	}

	update(){
		console.log(arguments,'update')
	}

	render(){
		console.log(arguments,'render')
	}
}