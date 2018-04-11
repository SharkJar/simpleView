/*
 * sender 需要监听属性的对象
 * key 监听对象的名称
 * val 赋值
 * customSetter setter钩子
 * shallow 无需深度	
 */
export const defineReactive = function (sender = {},key = "",val = null,
	customGetter = () => {},customSetter = () => {}
){
	//获取当前属性的描述信息
	const property = Object.getOwnPropertyDescriptor(sender,key)
	//属性描述器不允许修改	
	if(property && property.configurable === false){ return }

	const getter = property && property.get
	if(!getter && arguments.length === 2){ 
		val = sender[key] 
	}
	const setter = property && property.set
	
	Object.defineProperty(sender,key,{
		enumerable:true,
		configurable:true,
		get(){
			//有getter就通过getter获取值
			const value = getter? getter.call(sender) : val
			//拦截
			return customGetter(value) || value
		},
		set(newVal){
			//有getter就通过getter获取值
			const value = getter? getter.call(sender) : val
			//值相同
			if(Object.is(value,newVal)){ return }

			//拦截
			val = customSetter(newVal,val,setter) || newVal

			//有setter就设置setter
			if(setter){ 
				sender.call(sender,val) 
			}

		}
	})
}


