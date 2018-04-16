let appUrl = ''
let mmsUrl = ''
let loanNavigationUrl = ''
let ubasUrl = ''
let serverEnv = ''

switch(String(serverEnv).toUpperCase()){
	case "DEVELOPMENT":
		if(!Object.is(window.localtion.hostname,'localhost')){
			appUrl = mmsUrl = loanNavigationUrl = ubasUrl =
				`${window.location.origin}${window.location.pathname.substring(0,window.localtion.pathname.lastIndexOf('/'))}`
		}
		break
	case "DEV":
		appUrl = `http://xxx.com`
		mmsUrl = `http://xxx.com`
		loanNavigationUrl = `http://xxx.com`
		ubasUrl = `http://xxx.com`
		break
	case "STG":
		appUrl = `http://xxx.com`
		mmsUrl = `http://xxx.com`
		loanNavigationUrl = `http://xxx.com`
		ubasUrl = `http://xxx.com`
		break
	case "STG2":
		appUrl = `http://xxx.com`
		mmsUrl = `http://xxx.com`
		loanNavigationUrl = `http://xxx.com`
		ubasUrl = `http://xxx.com`
		break
	case "STG3":
		appUrl = `http://xxx.com`
		mmsUrl = `http://xxx.com`
		loanNavigationUrl = `http://xxx.com`
		ubasUrl = `http://xxx.com`
		break
	case "UAT":
		appUrl = `http://xxx.com`
		mmsUrl = `http://xxx.com`
		loanNavigationUrl = `http://xxx.com`
		ubasUrl = `http://xxx.com`
		break
	default:
	case "PRD":
		appUrl = `http://xxx.com`
		mmsUrl = `http://xxx.com`
		loanNavigationUrl = `http://xxx.com`
		ubasUrl = `http://xxx.com`
		break
}

export default {
	appUrl,mmsUrl,loanNavigationUrl,ubasUrl
}