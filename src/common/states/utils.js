//拿到映射关系
export const getMapping = function (mapper){
	const propsMap = new Map()

	//单字符串
	if(typeof mapper === "string"){
		propsMap.set(mapper,mapper)

	//数组
	}else if(Array.isArray(mapper)){
		mapper.forEach(key => propsMap.set(key,key))

	//对象映射
	}else if(typeof mapper === "object"){
		Object.keys(mapper).forEach(sourceKey => {
			let mapKey = mapper[sourceKey]
			if(typeof mapKey === "function"){
				mapKey = mapKey()
			}
			if(typeof mapKey !== "string"){ return }
			propsMap.set(sourceKey,mapKey)
		})
	}

	return propsMap
}