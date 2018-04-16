import simpleVue from '@/common/view'

let view = new simpleVue({
	data:{
		field1:[]
	},
	render(){
		console.log(this.field1,'render')
		console.log(this.field1[0] && this.field1[0].a,'field1[0].a')
	}
})

setTimeout(() => {
	view.field1.push(1)
	console.log('time 3000')
},3000)


setTimeout(() => {
	view.field1.pop()
	console.log('time 6000')
},6000)


setTimeout(() => {
	view.field1 = [{ a:1 },{ b:2 }]
	console.log('time 9000')
},9000)

setTimeout(() => {
	view.field1[0].a = 5444
	console.log('time 12000')
},12000)