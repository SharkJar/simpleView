import { container } from '@/common/container'
import state,{ mapStates } from '@/common/states/state'
import getters,{ mapGetters } from '@/common/states/getters'


export default class store{
	static content = new container()
	static get instance(){ return store.get('instance') }

	constructor(options = {}){
		store.content.set('options',options || {})
		store.content.set('instance',this)
	}

	initialize(){
		store.content.set('state',state)
		store.content.set('getters',getters)
	}

	get state(){
		return store.content.get('state')
	}

	get getters(){
		return store.content.get('getters')
	}
}
export {
	mapStates,mapGetters
}






