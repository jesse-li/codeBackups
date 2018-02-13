<template>
	<article>
        <section class="title">
            <h2>{{username}}（{{mid}}）</h2>
            <p>密码长度6-16位字母、数字、英文符号，至少包含两种</p>
        </section>
        <form @submit.prevent="postF($event,'/resetPassword',done)">
        	<div class="content">
	            <input v-validate="{required:true,min:6,max:16,confirmed:'repassword'}" :class="{'is-error':errors.has('password')}" name="password" type="password" placeholder="新密码">
	            <input :class="{'is-error':errors.has('repassword')}" name="repassword" v-validate="{required:true,min:6,max:16,confirmed:'password'}"  type="password" placeholder="再次输入新密码">
	        </div>
        	<input class="next" type="submit" value="完成"/>
        </form>
        <v-tips v-on:senddata="getShow" :isShow="isShow" :content="content"></v-tips>
    </article>
</template>

<script>
	import tips from '../../../../tips/tips.vue'
	export default {
		data(){
			var that = this;
			return {
				username: that.$route.query.username,
				mid: that.$route.query.mid,
				isShow: false,
				content: ''
			}
		},
		components:{
			'v-tips': tips
		},
		methods:{
			done(res){
				var that = this;
				if(res.data.code === 2000){
					
				}else{
					that.content = '<p>' + res.data.message + '</p>';
					that.isShow = true;
				}
			},
			show(){
				this.isShow = true;
			},
			getShow(data){
				this.isShow = data;
			}
		}
	}
</script>

<style scoped="" src="./reset.css">
</style>