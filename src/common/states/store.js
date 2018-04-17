import { container } from '@/common/container'
import state,{ mapStates } from '@/common/states/state'
import getters,{ mapGetters } from '@/common/states/getters'
import actions,{ mapActions } from '@/common/states/actions'
import mutations,{ mapMutations } from '@/common/states/mutations'


export default class store{
	static content = new container()
	static get instance(){ return store.content.get('instance') }

	constructor(options = {}){
		store.content.set('options',options || {})
		store.content.set('instance',this)
	}

	initialize(){
		store.content.set('state',state)
		store.content.set('getters',getters)
		store.content.set('actions',actions)
		store.content.set('mutations',mutations)
	}

	get state(){
		return store.content.get('state')
	}

	get getters(){
		return store.content.get('getters')
	}

	get actions(){
		return store.content.get('actions')
	}

	get mutations(){
		return store.content.get('mutations')
	}

	commit(mutationsMethod){
		const mutations = store.content.get('mutations')
		const args = Array.from(arguments).splice(1)
		if(mutationsMethod in mutations && typeof mutations[mutationsMethod] === "function"){
			mutations[mutationsMethod](...args)
		}
	}
}
export {
	mapStates,mapGetters,mapActions,mapMutations
}






