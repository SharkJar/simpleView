import simpleVue from '@/common/view'

let view = new simpleVue({
	data:{
		field1:'a',
		field2:'b',
		//当字段为object的时候 会触发深度监听动作
		field3:{
			a:1,
			b:2
		}
	},
	render(){
		console.log(this.field3.a,'render')
		console.log(this.field3.a.field,'a.field')
	}
})

setTimeout(() => {
	view.field3.a = 1
	console.log('time 3000')
},3000)

setTimeout(() => {
	view.field3.a = 22
	console.log('time 6000')
},6000)

setTimeout(() => {
	view.field3.b = 1
	console.log('time 9000')
},9000)


//可以深度监听
setTimeout(() => {
	view.field3 = { a:{ field:11 } }
	console.log('time 12000')
},12000)

setTimeout(() => {
	view.field3.a.field = 555
	console.log('time 15000')
},15000)