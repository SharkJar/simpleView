import simpleVue from '@/common/view'

let view = new simpleVue({
	data:{
		field1:'a',
		field2:'b',
		field3:{
			a:1,
			b:2
		}
	},
	render(){
		console.log(this.field1,'render')
	}
})

setTimeout(() => {
	view.field1 = 'a'
	console.log('time 3000')
},3000)


setTimeout(() => {
	view.field2 = 3434
	console.log('time 6000')
},6000)


setTimeout(() => {
	view.field1 = 5555
	console.log('time 7000')
},7000)
setTimeout(() => {
	view.field1 = 5555
	console.log('time 7000')
},7000)


setTimeout(() => {
	view.field1 = 111
	console.log('time 9000')
},9000)