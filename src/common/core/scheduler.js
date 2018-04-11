import nextTick from '@/common/nexttick'


const queue = new Set()
let queueArray = []
let waiting = false
let flushing = false
let index = 0

//重置
const resetSchedulerState = function (){
	index = 0
	queue.clear()
	waiting = flushing = false
}
//开始flush执行
const flushSchedulerQueue = function (){
	flushing = true
	queueArray = Array.from(queue)
	//先生成的wather排在前面
	queueArray
		.sort((wa,wb) => wa.id - wb.id)
		.forEach((watcher,idx) => {
			//指针 帮助queueWathcer
			index = idx
			if(!watcher){ return }
			queue.delete(watcher)
			typeof watcher.run === "function" && watcher.run() 
		})

	//清空
	resetSchedulerState()
}

//添加队列
export default function queueWatcher(watcher){
	if(queue.has(watcher)){ return }
	//按理说 浏览器是单线程的不是出现flushing的时候执行queueWatcher
	//但是还是先写上
	if(!flushing){
		queue.add(watcher)
	}else{
		let i = queueArray.length - 1
		//找到插入队列的位置
		for(;i > index && queueArray[i].id > watcher.id;i --){  }
		//插入队列
		queueArray.splice(i + 1,0,watcher)
	}

	if(!waiting){
		waiting = true
		nextTick(flushSchedulerQueue)
	}
}