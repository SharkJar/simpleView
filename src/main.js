import simpleVue from '@/common/view'
import store,{ mapStates,mapGetters } from '@/common/states/store' 
import { apiFactory,COMMON_EMPTY_LOG } from '@/api'
import { mapApi,methodStartPublish,methodFinishPublish,startListening,finishListening } from '@/common/decorator'


var b = new store({
	state:{
		b:2,
		c:3
	},
	getters:{
		getA(state){
			console.log(state,9999)
			return state.c
		}
	}
})


var a = new simpleVue({
	data(){
		return { 
			...mapStates({ 
				b:'b',
				c:'a'
			})
		}
	},

	computed:{
		m(){
			return this.a
		},
		...mapGetters('getA')
	},

	watch:{
		b(){
			console.log(arguments,'b')
			this.requestApi()
		},
		a(){
			console.log(arguments,'a')
		},
		c(){
			console.log(arguments,'c')
		}
	},

	methods:{
		@methodFinishPublish('requestApi')
		@methodStartPublish('requestApi')
		//映射接口
		@mapApi(COMMON_EMPTY_LOG)
		requestApi(result){
			console.log("请求数据拿到的结果:",result)
		},

		@startListening('requestApi')
		requestStart(){
			console.log('开始请求数据了')
			return [2,3,4]
		},
		@finishListening('requestApi')
		requestFinish(result){
			console.log("requestFinish",result)
			return "我返回结果了"
		}
	},

	update(){
		console.log(arguments,'viewUpdate')
	},

	render(){
		console.log(this.b,this.a)
	}
})

//a.data.c = 33
//a.data.a = 44
setTimeout(() => { a.b = 44 },100)

console.log(a.getA,88888,a.m)

