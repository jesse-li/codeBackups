<template>
	<article>
        <section class="title">
            <h2>正在为帐号"{{mid}}"找回密码</h2>
            <p>您可以通过以下方式进行找回</p>
        </section>
        <div class="content">
            <p>
                <img src="./mimazhaohui.png" alt="">
                <input v-validate="{required:true}" :class="{'is-error':errors.has('mid')}" name="mid" v-model="mid" type="text" class="account" placeholder="乐号/用户名/手机号/邮箱">
                <a href="">忘记账号?</a>
            </p>
            <p>
                <img src="./phone.png" alt="">
                <input v-validate="{required:true,regex:/^1\d{10}$/}" :class="{'is-error':errors.has('phoneNumber')}" name="phoneNumber" v-model="phoneNumber" type="text" class="" placeholder="您的联系手机号码">
            </p>
            <p>
                <img src="./mimazhaohui.png" alt="">
                <input v-validate="{required:true}" :class="{'is-error':errors.has('code')}" type="text" class="SMS" name="code" placeholder="短信验证码">
                <span @click="sendCode(!errors.has('phoneNumber'))" class="time fr" :class="{'re-send':cutTime === 0}">{{toCutTime}}</span>
            </p>
        </div>
        <p class="problem">一直收不到验证短信？<a href="">查看可能原因</a></p>
        <a @click="validateCode(!errors.has('code'))" class="next">下一步</a>
         <v-tips v-on:senddata="getShow" :isShow="isShow" :content="content"></v-tips>
    </article>
</template>

<script>
	import tips from '../../../../tips/tips.vue'
	export default {
		data() {
			var that = this;
			return {
				mid: that.$route.query.mid || '',
				code:'',
				phoneNumber:'',
				isShow: false,
				content:'',
				cutTime: 0
			}
		},
		computed:{
			toCutTime(){
				var that = this;
				return that.cutTime === 0?'发送':'重新发送（' + that.cutTime +'）'
			}
		},
		components:{
			'v-tips': tips
		},
		methods:{
			sendCode(t){
				var that = this;
				console.log(t)
				if(t){
					if(that.cutTime === 0){
						var formdata = new FormData();
					formdata.append('phone',that.phoneNumber)
					that.axios({
						method:'post',
						url: that.mainUrl + '/sendPhoneCode',
						data:formdata
					})
					.then(res => {
						if(res){
							if(res.data.code === 2000){
								that.cutTime = 60;
								that.cutTimeF()
							}
							
							that.content = '<p>' + res.data.message + '</p>';
							that.isShow = true;
						}
					})
					}
					
				}else{
					that.content = '<p>请输入正确的手机号</p>';
					that.isShow = true;
				}
				
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
			show(){
				this.isShow = true;
			},
			getShow(data){
				this.isShow = data;
			},
			validateCode(t){
				var that = this;
				that.$validator.validateAll().then(res=>{
					if(res){
						var formdata = new FormData();
					formdata.append('vcode',that.code)
					that.axios({
						method:'post',
						url: that.mainUrl + '/validCode',
						data: formdata
					})
					.then(res => {
						if(res){
							if(res.data.code === 2000){
								var formdata = new FormData();
								formdata.append('tag',that.mid);
								that.axios({
									method:'post',
									url: that.mainUrl + '/findAccountsByTag',
									data: formdata
								}).then(res => {
									if(res){
										if(res.data.code === 2000){
											if(res.data.data.length>1){//多个账号，跳到selectAccount
												that.$router.push({name:'selectAccount',query:{tag:that.mid}})
											}else if(res.data.data.length === 1){//
												if(res.data.data[0].email||res.data.data[0].phoneNumber){//有密保
													
												}else{//没有密保
													
												}
											}
										}else{//没有查询到
											
										}
										
									}
								})
							}else{
								that.content = '<p>' + res.data.message + '</p>';
								that.isShow = true;
							}
						}
					})
					}
				})
			
					
				
			}
		}
	}
</script>

<style scoped="" src="./account.css">
</style>