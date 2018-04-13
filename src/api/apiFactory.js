import { container } from '@/common/container'

let factoryInstace = null
export default class factory extends container{
	static get instance(){
		if(!factoryInstace){
			factoryInstace = new factory()
		}
		return factoryInstace
	}
	constructor(){
		super(...arguments)
		//单例
		return factoryInstace || (factoryInstace = this)
	}

	//注册api处理器
	set(apiEmun = "",apiObject){
		//添加有效的api处理器
		if(typeof apiEmun !== "string"
			|| arguments.length > 1 && (typeof apiObject !== "object" || typeof apiObject.request !== "function")){ return }
		return super.set(apiEmun,apiObject)
	}

	//调用相应的处理方式
	request(apiConstant = {},requestData = {},otherOptions = {}){
		if(typeof apiConstant === "string" && container.hasOwnProperty(apiConstant)){
			apiConstant = apiConstant[apiConstant]
		}else if(arguments.length === 1 && typeof apiConstant === "object"){
			let { data,options } = apiConstant
			requestData = data
			otherOptions = options
		}

		let { actionType } = (apiConstant || {})
		//不存在的处理方式 actionType
		if(!this.has(actionType)){ return console.warn('找不到对应的处理方式',arguments) }
		return this.get(actionType).request(apiConstant,requestData,otherOptions)
	}
}