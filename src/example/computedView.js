import simpleVue from '@/common/view'

let view = new simpleVue({
	data(){
		return {
			numA:1,
			numB:2,
			numC:3
		}
	},

	computed:{
		sum(){
			return this.numA + this.numB
		}
	},

	render(){
		console.log(this.sum,'render')
	}
})

setTimeout(() => {
	view.numA = 1
	console.log('time 3000')
},3000)


setTimeout(() => {
	view.numA = 222
	console.log('time 6000')
},6000)
setTimeout(() => {
	view.numB = 333
	console.log('time 6000')
},6000)

setTimeout(() => {
	view.numA = 222
	console.log('time 9000')
},9000)
setTimeout(() => {
	view.numB = 333
	console.log('time 9000')
},9000)
setTimeout(() => {
	view.numC = 5555
	console.log('time 9000')
},9000)