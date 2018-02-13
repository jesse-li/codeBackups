import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = resolve => require(['@/components/index/index'],resolve)

const findAccount = resolve => require(['@/components/que/account/findAccount/findAccount'],resolve)

const byImei = resolve => require(['@/components/que/account/findAccount/byIMEI/byImei'],resolve)

const byGameInfo = resolve => require(['@/components/que/account/findAccount/byGameInfo/byGameInfo'],resolve)

const byRecharge = resolve => require(['@/components/que/account/findAccount/byRecharge/byRecharge'],resolve)

const byRealName = resolve => require(['@/components/que/account/findAccount/byRealName/byRealName'],resolve)

const problemCenter = resolve => require(['@/components/problemCenter/problemCenter'],resolve)

const searchList = resolve => require(['@/components/problemCenter/searchList/searchList'],resolve)

const problemDetail = resolve => require(['@/components/problemCenter/problemDetail/problemDetail'],resolve)

const feedback = resolve => require(['@/components/feedback/feedback'],resolve)

const feedbackResult = resolve => require(['@/components/feedback/feedbackResult/feedbackResult'],resolve)

const findPassWord = resolve => require(['@/components/que/account/findPassword/findPassword'],resolve)

const hasProtection = resolve => require(['@/components/que/account/findPassword/hasProtection/app'],resolve)

const selectAccount = resolve => require(['@/components/que/account/findPassword/selectAccount/app'],resolve)

const sendCode = resolve => require(['@/components/que/account/findPassword/sendCode/app'],resolve)

const resetPassWord = resolve => require(['@/components/que/account/findPassword/resetPassword/app'],resolve)

const resetSuccess = resolve => require(['@/components/que/account/findPassword/resetSuccess/app'],resolve)

const byAppeal = resolve => require(['@/components/que/account/findPassword/byAppeal/app'],resolve)

const chargeRecord = resolve => require(['@/components/que/account/findPassword/chargeRecord/app'],resolve)

const findAccountResult = resolve => require(['@/components/que/account/findAccount/findAccountResult/app'],resolve)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
    	path: '/findAccount',
    	name:'findAccount',
    	component: findAccount,
    	children:[
    		{
    			path: 'byIMEI',
    			name: 'byIMEI',
    			component: byImei
    		},
    		{
    			path: 'byGameInfo',
    			name: 'byGameInfo',
    			component: byGameInfo
    		},
    		{
    			path: 'byRecharge',
    			name: 'byRecharge',
    			component: byRecharge
    		},
    		{
    			path: 'byRealName',
    			name: 'byRealName',
    			component: byRealName
    		},
    		
    	]
    },
    {
    			path: '/findAccountResult',
    			name: 'findAccountResult',
    			component: findAccountResult
    	},
    {
    	path: '/problemCenter',
    	name: 'problemCenter',
    	component: problemCenter
    },
    {
    	path:'/searchList',
    	name:'searchList',
    	component: searchList
    },
    {
    	path:'/problemDetail',
    	name:'problemDetail',
    	component: problemDetail
    },
    {
    	path:'/feedback',
    	name:'feedback',
    	component: feedback
    },
    {
    	path:'/feedbackResult',
    	name:'feedbackResult',
    	component: feedbackResult
    },
    {
    	path:'/findPassWord',
    	name:'findPassWord',
    	component: findPassWord
    },
		{
			path: '/hasProtection',
			name: 'hasProtection',
			component: hasProtection
		},
		{
			path:'/selectAccount',
			name:'selectAccount',
			component: selectAccount
		},
		{
			path: '/sendCode',
			name: 'sendCode',
			component: sendCode
		},
		{
			path: '/resetPassWord',
			name: 'resetPassWord',
			component: resetPassWord
		},
		{
			path: '/resetSuccess',
			name: 'resetSuccess',
			component: resetSuccess
		},
		{
			path: '/byAppeal',
			name: 'byAppeal',
			component: byAppeal
		},
		{
			path: '/chargeRecord',
			name: 'chargeRecord',
			component: chargeRecord
		}
  ]
})
