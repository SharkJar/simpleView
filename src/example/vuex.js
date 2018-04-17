import { store,mapStates,mapGetters,mapActions } from '@/common/states' 
import simpleVue from '@/common/view'

let story = new store({
	state:{
		b:2,
		c:3
	},
	getters:{
		getA(state){
			return state.b
		}
	},
	actions:{
		requestApi({ getters,state,commit }){
			commit('updateState',{ b:3,c:555 })
		}
	},
	mutations:{
		updateState(state,{ b,c }){
			state.b = b
			state.c = c
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

	methods:{
		...mapActions('requestApi')
	},

	render(){
		console.log(story.state.b,this.requestApi(),666)

		//console.log(story.state.b,'story.state.b')
	}
})

// setTimeout(function (){
// 	story.state.b = 3333
// },3000)


