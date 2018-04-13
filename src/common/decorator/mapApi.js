import * as constant from '@/api/apiConstant'
import { default as apiFactory } from '@/api/apiFactory'

//映射一个api到对象的一个方法
export default function mapApi(apiConstant){
	if(typeof apiConstant === "string" && "apiConstant" in constant){
		apiConstant = constant[apiConstant]
	}
	return function (target,name,decorator){
		//描述器 value 不是方法，
		let getor = (decorator && (decorator.value || decorator.get()) || target[name])
		return {
			enumerable:true,
			configurable:true,
			get(){
				return function (){
					let result = apiFactory.instance.request(apiConstant,...arguments)
					if(result instanceof Promise){
						//成功失败都调用
						return result.then(getor,getor)
					}else{
						return getor(result)
					}
				}
			}
		}
	}
}