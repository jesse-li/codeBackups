<template>
	<section class="problem-detail">
		<v-header :title="title"></v-header>
		<h4>{{faq.title}}</h4>
		<section v-html="faq.content" class="con">
			
		</section>
		<section class="is-resolve">
			<p><i>以上回复是否帮助您解决了问题？</i></p>
			<section class="clearfix">
				<div class="fl">
					<i class="no"></i>
					<p>否</p>
				</div>
				<div class="fr">
					<i class="yes"></i>
					<p>是</p>
				</div>
			</section>
		</section>
		<div class="line"></div>
		<router-link class="feedback-que" to="/feedbackQue"><i></i>反馈问题</router-link>
	</section>
	
</template>

<script>
	import header from '../../header/header.vue'
	export default {
		data(){
			return {
				title: '问题详情',
				id: this.$route.query.id,
				faq:{}
			}
		},
		created(){
			var that = this;
			that.init();
		},
		methods:{
			init(){
				var that = this;
				that.axios({
					url: that.mainUrl+ '/api/getFaqInfo',
					params:{
						id: that.id
					}
				})
				.then(res => {
					if(res&&res.data.msg_code === 2000){
						that.faq = res.data.faq;
					}
				})
			}
		},
		components:{
			'v-header': header
		}
	}
</script>

<style lang="scss" scoped="">
	.problem-detail{
		>h4{
			margin-left: 28px;
			padding: 30px 0;
			padding-right: 28px;
			font-size: 28px;
			line-height: 1.6;
			border-bottom: 1px solid #e9e9e9;
		}
		.is-resolve{
			width: 590px;
			margin: 0 auto;
			margin-top: 100px;
			>p{
				position: relative;
				text-align: center;
				font-size: 24px;
				height: 48px;
				color: #999;
				&:before{
					position: absolute;
					content: "";
					width: 100%;
					left: 0;
					top: 50%;
					height: 2px;
					background-color: #f5f5f5;
					
				}
				>i{
					position: absolute;
					width: 420px;
					left: 50%;
					top: 50%;
					margin-top: -17px;
					margin-left: -210px;
					text-align: center;
					background-color: #fff;
				}
			}
			>section{
				width: 280px;
				padding-top: 60px;
				padding-bottom: 30px;
				margin: 0 auto;
				text-align: center;
				font-size: 0;
				>div{
					width: 80px;
					>i{
						display: block;
						height: 80px;
						&.no{
							background: url(./no.png) center top no-repeat;
						}
						&.yes{
							background: url(./yes.png) center top no-repeat;
						}
					}
					>p{
						font-size: 24px;
						color: #999;
					}
				}
			}
		}
		.feedback-que{
			display: block;
			color: #ed751a;
			text-align: center;
			font-size: 28px;
			line-height: 3;
			>i{
				display: inline-block;
				width: 28px;
				height: 26px;
				vertical-align: 1px;
				margin-right: 30px;
				margin-left: -28px;
				background: url(./feedback-btn.png) center top no-repeat;
			}
		}
	}
</style>