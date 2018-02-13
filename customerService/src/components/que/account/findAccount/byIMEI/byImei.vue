<template>
	<section class="by-imei">
		<form @submit.prevent="validateData(done)">
			<label><i></i><input :class="{'input':true,'is-error':errors.has('imei')}" v-model='imei' v-validate="'required|digits:15'" type="text" placeholder="常用登录设备的IMEI码" name="imei" id="" value="" /><a @click="show" href="javascript:void(0)">如何查询？</a></label>
			<input type="submit" value="查询账号"/>
		</form>
		
			<v-tips v-on:senddata="getShow" :isShow="isShow" :content="content"></v-tips>
		
	</section>
</template>

<script>
	import tips from '../../../../tips/tips.vue'
	export default{
		data(){
			return {
				isShow: false,
				imei:'',
				content:'<p>安卓手机拨号界面输入</p><i>* # 0 6 #</i>'
			}
		},
		methods:{
			show(){
				this.isShow = true;
			},
			getShow(data){
				this.isShow = data;
			},
			done(){
				var that = this;
				that.$router.push({name:'findAccountResult',query:{type:'imei',imei:that.imei}})
			}
		},
		components:{
			'v-tips': tips
		}
	}
</script>

<style lang="scss" scoped="">
	.by-imei{
		label{
			position: relative;
			display: block;
			>input{
				width: 100%;
				line-height: 98px;
				padding-left: 86px;
				padding-right: 150px;
				border: 0;
				font-size: 28px;
				background-color: #fff;
				box-sizing: border-box;
				
			}
			>i{
				position: absolute;
				left: 30px;
				top: 50%;
				margin-top: -16px;
				width: 26px;
				height: 32px;
				background: url(../img/phone.png) center top no-repeat;
			}
			>a{
				position: absolute;
				top: 50%;
				margin-top: -18px;
				right: 28px;
				color: #ed751a;
				font-size: 24px;
			}
		}
		input[type="submit"]{
			display: block;
			width: 664px;
			margin: 0 auto;
			margin-top: 36px;
			font-size: 28px;
			line-height: 3;
			text-align: center;
			color: #fff;
			border-radius: 4px;
			background-color: #ed751a;
			border: 0;
		}
		
	}
</style>