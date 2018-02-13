<template>
	<article>
		<v-header :title="title"></v-header>
		<section v-if="accountList.length">
			<section class="title">
                <h2>查询结果</h2>
                <p>以下可能是您曾经使用过的帐号：</p>
            </section>
            <section class="content">
                <div v-for="(item,index) in toData" class="clearfix means">
                    
                    <div class="fl picture">
                        <img src="http://img.d.cn/netgame/hdlogo/5531_1454117784662_NP5nsIc8.png" alt="">
                    </div>
                    <div class="fl detail">
                        <p>乐 号：<span>{{item.mid}}</span></p>
                        <p>用户名： {{item.username}}</p>
                        <p>最近登录：{{item.time}}</p>
                    </div>
                </div>
                
            </section>
            <a href="javascript:" class="next">没有我的账号？</a>
		</section>
         <v-noresult v-else :resultCon="resultCon" :addClass="addClass" :to="to"></v-noresult>   
        </article>
	
</template>

<script>
	import header from '../../../../header/header.vue'
	import noResult from '../../../../noResult/noResult.vue'
	export default {
		data(){
			return {
				title:'账号找回',
				query: this.$route.query,
				accountList: [],
				resultCon:'sorry！暂未查询到与当前信息相符的乐号！',
				to:{
					title:'尝试其他方式找回',
					url:'/findAccount'
				},
				
					addClass:'no-border',
				urlList:{
					imei:'/findAccountsByImei',
					gameInfo:'/findAccountsByGameInfo',
					charge:'/findAccountsByRecharge',
					realName:'/findAccountsByRealName'
				}
			}
		},
		created(){
			var that = this,url = that.urlList[that.query.type],formdata = new FormData();
			
			for(var item in that.query){
				if(item !== 'type'){
					formdata.append(item,that.query[item])
				}
			}
			that.axios({
				method:'post',
				url: that.mainUrl + url,
				data: formdata
			})
			.then(res =>{
				if(res){
					if(res.data.code === 2000){
						that.accountList = res.data.data
					}
				}
			})
		},
		methods:{
			
		},
		computed:{
			toData(){
				var that = this;
				return that.accountList.map(item => {
					if(item.lastLoginTime){
					var toTime = new Date(item.lastLoginTime);
					
					item.time = ''+ toTime.getFullYear() + (toTime.getMonth() + 1<10?'-0'+(toTime.getMonth() + 1):(toTime.getMonth() + 1)) + (toTime.getDate()<10?'-0'+toTime.getDate():'-'+toTime.getDate()) + ' ' + (toTime.getHours()<10?'0'+toTime.getHours():toTime.getHours()) + ' ' + (toTime.getMinutes()<10?'0'+toTime.getMinutes():toTime.getMinutes()) + ' ' + (toTime.getMilliseconds()<10?'0'+ toTime.getMilliseconds():toTime.getMilliseconds());
					}
					return item;
					
				})
			}
		},
		components:{
			'v-header':header,
			'v-noresult': noResult
		}
	}
</script>
<style scoped="" src="./bind.css">
	
</style>
