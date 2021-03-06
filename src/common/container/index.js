export const container = class extends Map{
	constructor(){
		super(...arguments)
	}

	set(name,sender){
		return arguments.length > 1
			?( ( sender == null? super.delete(name) : super.set(name,this.initializeChain(sender)) ) ,this )
			: super.get(name)
	}

	initializeChain(sender){
		return sender && typeof sender.initialize === "function" && sender.initialize(this) || sender
		//return sender
	}
}

export default new container()