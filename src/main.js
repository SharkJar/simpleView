import simpleView from '@/common/view'

var a = new simpleView({
	data(){
		return { 
			a:1,
			b:2,
			c:{ a:1 }
		}
	},

	computed:{
		m(){
			return this.a
		}
	},

	watch:{
		b(){
			console.log(arguments,'b')
		},
		a(){
			console.log(arguments,'a')
		},
		c(){
			console.log(arguments,'c')
		}
	},

	update(){
		console.log(arguments,'viewUpdate')
	},

	render(){
		console.log(this.b)
	}
})

//a.data.c = 33
//a.data.a = 44
setTimeout(() => { a.b = 44 },100)

