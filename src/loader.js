export default async function (assemblyName){
	return await import(`${assemblyName}`)
}