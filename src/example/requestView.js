import simpleVue from '@/common/view'
import { apiFactory,COMMON_EMPTY_LOG } from '@/api'
import { mapApi,methodStartPublish,methodFinishPublish,startListening,finishListening } from '@/common/decorator'

let view = new simpleVue({

	methods:{
		@methodStartPublish('requestApi')
		//映射接口
		@mapApi(COMMON_EMPTY_LOG)
		requestApi(result){
			console.log("请求数据拿到的结果:",result)

			//改变data
		},

		@startListening('requestApi')
		requestStart(...args){
			console.log('开始请求数据了')
			//可以改变args 或者 不返回
			return args
		}
	}


})

view.requestApi({
	isLogin:false,
	id:1
},{
	headers:{}
})