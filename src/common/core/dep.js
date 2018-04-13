let uid = 0
let depTarget = null
const targetStack = []
//向队列中添加一条 wather
export const pushTarget = function (target){
	if(depTarget){
		targetStack.push(depTarget)
	}
	depTarget = target
}
export const popTarget = function (){
	depTarget = targetStack.pop()
}

/*
 * 依赖队列
 * 队列里都是watcher
 */
export default class Dep extends Set{
	static get target(){ return depTarget }
	static get pushTarget(){ return pushTarget }
	static get popTarget(){ return popTarget }

	constructor(){
		super(...arguments)
		this.id = uid++
	}

	//添加
	addSub(watcher){
		super.add(watcher)
	}
	//删除
	removeSub(watcher){
		super.delete(watcher)
	}

	//"touch"中使用的
	//depTarget为watcher对象
	depend(){
		if(depTarget && typeof depTarget.addDep === "function"){
			depTarget.addDep(this)
		}
	}

	//通知
	notify(){
		super.forEach(sub => {
			//执行watcher对象的update方法
			sub && typeof sub.update === "function" && sub.update()
		})
	}
}