<template>
	<article>
        <section class="title">
            <h2>正在为帐号"{{mid}}"找回密码</h2>
            <p>您可以通过以下方式进行找回</p>
        </section>
        <div class="content">
            <router-link :to="{name:'sendCode',query:{phoneNumber:phoneNumber,mid:mid,username:username}}" v-if="phoneNumber" href="">密保手机验证 <span>{{phoneNumber}}</span><i class="background"></i></router-link>
            <router-link :to="{name:'sendCode',query:{email:email,mid:mid,username:username}}" v-if="email" href="">密保邮箱验证 <span>{{email}}</span><i class="background"></i></router-link>
        </div>
        <p class="shenshu">密保不可用？<router-link :to="{name:'byAppeal',query:{mid:mid}}">点此进行账号申诉</router-link></p>
    </article>
</template>

<script>
	export default {
		data() {
			var that = this;
			return {
				mid: that.$route.query.mid,
				phoneNumber: that.$route.query.phoneNumber,
				email: that.$route.query.email,
				username: that.$route.query.username
				
			}
		}
	}
</script>
<style scoped="" src="./app.css">
	
</style>