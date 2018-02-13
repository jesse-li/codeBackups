<template>
	<article>
            <section class="title">
                <h2>正在为帐号"{{mid}}"找回密码</h2>
                <p v-if="phoneNumber">已经向手机<span>{{phoneNumber}}</span>发送了一条6位验证码</p>
                <p v-else>已经向邮箱<span>{{email}}</span>发送了一条6位验证码</p>
            </section>
            <form @submit.prevent="postF($event,'/validCode',done)">
            	<div class="clearfix content">
	                <input type="text" name="vcode" :class="{'is-error':errors.has('vcode')}" v-validate="'required'" v-model="code" class="fl" placeholder="验证码">
	                <a @click.prevent="reSendCode" class="time fr" :class="{'re-send':cutTime === 0}">{{toCutTime}}</a>
	            </div>
            	<input type="submit" class="next" value="下一步"/>
            </form>
            
            <p class="problem">一直收不到验证码？<a href="">查看可能原因</a></p>
           <!-- <a @click.prevent="validateCode" href="" class="next">下一步</a>-->
            <v-tips v-on:senddata="getShow" :isShow="isShow" :content="content"></v-tips>
        </article>
</template>

<script>
	import tips from '../../../../tips/tips.vue'
	export default {
		data() {
			var that = this;
			return {
				phoneNumber: that.$route.query.phoneNumber,
				email: that.$route.query.email,
				mid: that.$route.query.mid,
				username: that.$route.query.username,
				cutTime: 60,
				content: '',
				isShow: false,
				code:''
			}
		},
		components:{
			'v-tips': tips
		},
		mounted(){
			this.init()
		},
		computed:{
			toCutTime(){
				var that = this;
				return that.cutTime === 0?'重新发送':'重新发送（' + that.cutTime +'）'
			}
		},
		methods:{
			init(){
				var that = this;
				that.sendCode()
				that.cutTimeF();
			},
			cutTimeF(){
				var that = this,cutTimer;
				that.cutTime -= 1;
				if(that.cutTime <= 0){
					clearTimeout(cutTimer)
				}else{
					cutTimer = setTimeout(function(){
						that.cutTimeF()
					},1000)
				}
				
			},
			sendCode(){
				var that = this;
				var formdata = new FormData();
				formdata.append('account',that.phoneNumber?that.phoneNumber:that.email)
				that.axios({
					method:'post',
					url: that.mainUrl + '/sendCode',
					data:formdata
				})
				.then(res => {
					if(res){
						that.content = '<p>' + res.data.message + '</p>';
						that.isShow = true;
					}
				})
			},
			reSendCode(){
				var that = this;
				if(that.cutTime === 0){
					that.sendCode();
					that.cutTime = 60;
				}
			},
			show(){
				this.isShow = true;
			},
			getShow(data){
				this.isShow = data;
			},
			done(res){
				var that = this;
				if(res){
					if(res.data.code === 2000){
						that.$router.push({name:'resetPassWord',query:{username:that.username,mid:that.mid}})
					}else{
						that.content = '<p>' + res.data.message + '</p>';
						that.isShow = true;
					}
				}
			}
		}
	}
</script>

<style scoped="" src="./app.css">
</style>