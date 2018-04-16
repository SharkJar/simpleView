import store,{ mapStates,mapGetters } from '@/common/states/store' 
import simpleVue from '@/common/view'

let story = new store({
	state:{
		b:2,
		c:3
	},
	getters:{
		getA(state){
			return state.c
		}
	}
})

let view = new simpleVue({
	data:{
		...mapStates('b')
	},

	computed:{
		...mapGetters('getA')
	},

	watch:{
		getA(){
			console.log(arguments,'watch getA')
		}
	},

	render(){
		console.log(this.b,this.getA,'render')

		console.log(story.state.b,'story.state.b')
	}
})

setTimeout(function (){
	view.b = 3333
},3000)


