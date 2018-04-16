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

	watch:{
		numA(){
			console.log(this.numA,'watch numA')
		},
		sum(){
			console.log(this.sum,'watch sum')
		}
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
