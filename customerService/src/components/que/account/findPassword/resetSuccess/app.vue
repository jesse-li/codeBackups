<template>
	<article class="success">
		<img src="./success.png" alt="" />
		<p>恭喜您，登录密码重置成功！</p>
		<div><span>{{toCutTime}}</span>后自动返回登录页面...</div>
		<a @click.prevent="toLogin" href="javascript:void(0)" target="_self">返回登录</a>
	</article>
</template>

<script>
	export default {
		data() {
			return {
				cutTime: 6,
			}
		},
		mounted(){
			this.init()
		},
		methods:{
			init(){
				this.cutTimeF()
			},
			toLogin(){
				if(typeof window.AndroidClient !== 'undefined'){
					AndroidClient.doLogin()
				}else{
					window.location.href = 'https://oauth.d.cn/auth/goLogin.html?display=wap'
				}
			},
			cutTimeF(){
				var that = this,cutTimer;
				that.cutTime -= 1;
				if(that.cutTime <= 0){
					clearTimeout(cutTimer);
					that.toLogin();
				}else{
					cutTimer = setTimeout(function(){
						that.cutTimeF()
					},1000)
				}
				
			}
		},
		computed:{
			toCutTime(){
				var that = this;
				return that.cutTime + 'S'
			}
		},
	}
</script>

<style scoped="" src="./success.css">
</style>