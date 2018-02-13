<template>
	<section class="feedback-box clearfix">
		<router-link class="return-btn" to="/"></router-link>
		<input v-model="orderId" placeholder="请输入反馈工单编号，查询处理进度" type="text" name="" id="" value="" />
		<router-link class="feedback-btn" :to="{name:'feedbackResult',query:{id:orderId}}">查询</router-link>
	</section>
</template>

<script>
	export default {
		data(){
			return {
				orderId:''
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.feedback-box{
		font-size: 0;
		padding: 24px 0;
		background-color: #ed751a;
		a,input,{
			display: inline-block;
		}
		.return-btn{
			margin-left: 28px;
			width: 26px;
			height: 38px;
			vertical-align: -14px;
			background: url(./return.png) center top no-repeat;
		}
		input{
			font-size: 24px;
			width: 530px;
			margin-left: 18px;
			height: 60px;
			background-color: #e6e6e6;
			border-radius: 4px;
			box-sizing: border-box;
			padding: 0 20px;
		}
		.feedback-btn{
			margin-left: 20px;
			font-size: 28px;
			color: #fff;
			vertical-align: -5px;
		}
	}
</style>