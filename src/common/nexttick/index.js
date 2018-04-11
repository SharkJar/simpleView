const callbacks = new Set()
let pending = false


const flushCallbacks = function (){
	pending = false
	const copies = Array.from(callbacks)
	callbacks.clear()
	copies.forEach(cb => cb())
}

let macroTimerFunc
if(typeof setImmediate !== "undefined" && typeof setImmediate === 'function' && /native code/.test(setImmediate.toString())){
	macroTimerFunc = () => {
		setImmediate(flushCallbacks)
	}
}else{
	macroTimerFunc = () => {
		setTimeout(flushCallbacks,0)
	}
}

export default function nextTick(cb = null,ctx = null){
	let resolve
	let isCallback = typeof cb === "function"

	callbacks.add(() => {
		//没有回调 但是有promise
		if(!isCallback && resolve){ return resolve(ctx) }
		try{
			cb.call(ctx)
		}catch(e){}
	})

	if(!pending){
		pending = true
		macroTimerFunc()
	}

	if(!isCallback){
		return new Promise(res => { resolve = res })
	}
}