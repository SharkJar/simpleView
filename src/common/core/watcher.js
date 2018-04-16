import Dep from '@/common/core/dep'
import queueWatcher from '@/common/core/scheduler'

let uid = 0
const bailRE = /[^\w.&]/
//根据字符串 找到对象
const parsePath = function (stringPath){
	stringPath = String(stringPath)
	if(bailRE.test(stringPath)){ return }
	const segments = stringPath.split('.')
	return sender => {
		return segments.reduce((obj,segment) => {
			return obj && obj[segment]
		},sender)
	}
}

//深度探测 出发getter 使得拿到深度依赖
const traverse = function (sender = {},seen = new Set()){
	if(typeof sender !== "object"){ return }
	//已经探查过了
	if(sender.hasOwnProperty('__ob__')){
		const depId = sender.__ob__.dep.id
		if(seen.has(depId)){ return }
		seen.add(depId)
	}

	if(Array.isArray(sender)){
		return sender.forEach(sd => traverse(sd,seen))
	}

	Object.keys(sender).forEach(key => traverse(sender[key],seen))
}

export default class Watcher{
	constructor(sender = {},keyOrFn = "",callback = () => {},options = {}){
		this.sender = sender
		this.cb = callback
		this.id = uid ++
		this.activeState = true
		this.getter = typeof keyOrFn === "function"? keyOrFn : (parsePath(keyOrFn) || function (){})
		//异步
		this.lazy = false
		this.dirty = false
		//深度依赖
		this.deep = false
		//是否同步
		this.sync = false
		if(options && typeof options === "object"){
			this.deep = !!options.deep
			this.sync = !!options.sync
			this.lazy = !!options.lazy
		}
		//暂时不考虑clone的
		this.deps = new Set()
		//暂时不考虑clone的
		this.newDeps = new Set()

		this.value = this.get()
	}

	//touch值 拿到依赖
	get(){
		let value
		//放入队列 让watcher拿到依赖
		Dep.pushTarget(this)

		try{
			value = this.getter.call(this.sender,this.sender)
		}catch(e){}

		//深度依赖
		//深度探测依赖 拿到依赖
		if(this.deep){
			traverse(value)
		}

		//释放当前
		Dep.popTarget()
		//清理
		this.cleanupDeps()
		return value
	}


	//依赖添加
	addDep(dep){
		if(!(dep instanceof Dep) || this.newDeps.has(dep)){ return }
		this.newDeps.add(dep)
		if(this.deps.has(dep)){ return }
		//添加watcher
		dep.addSub(this)
	}

	//清理
	cleanupDeps(){
		//上一次已经被添加过监听的
		this.deps.forEach(dep => {
			//新的监听的
			if(!this.newDeps.has(dep)){
				dep.removeSub(this)
			}
		})

		this.deps = this.newDeps
		this.newDeps = new Set()
	}

	//开始触发更新
	update(){
		if(this.lazy){
			this.dirty = true
		}
		//同步
		else if(this.sync){
			this.run()
		}else{
			//添加到队列
			queueWatcher(this)
		}
		
	}

	//懒依赖
	//计算值
	evaluate(){
		this.value = this.get()
		this.dirty = false
	}

	//在conputed里面使用到
	//续集依赖关系
	depend(){
		this.deps.forEach(dep => dep.depend())
	}

	//运行
	run(){
		if(!this.activeState){ return }
		//拿到值
		const value = this.get()
		if(!Object.is(value,this.value) 
			//对象赋值
			//对象的话 没有深度对比是否改变 直接触发了change
			|| this.deep || typeof value === "object"
		){
			const oldValue = this.value
			this.value = value
			this.cb.call(this.sender,value,oldValue)
		}
	}



	//停止监听
	teardown(){
		if(!this.activeState){ return }
		this.deps.forEach(dep => dep.removeSub(this))
		this.activeState = false
	}
}

