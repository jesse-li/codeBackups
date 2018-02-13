<template>
	<section class="realname-box">
		<form @submit.prevent="validateData(done)">
			<label class="realname"><i></i><input v-validate="{required:true,regex:'^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$',min:2,max:5}" :class="{'is-error':errors.has('realName')}" v-model="realName" placeholder="姓名" type="text" name="realName" id="" value="" /></label>
			<label class="card"><i></i><input v-model="card" v-validate="{required:true,alpha_num:true,min:15,max:18}" :class="{'is-error':errors.has('card')}" placeholder="身份证号" type="text" name="card" id="" value="" /></label>
			<input type="submit" value="查询账号"/>
		</form>
	</section>
</template>

<script>
	export default{
		data() {
			return {
				card:'',
				realName:''
			}
		},
		methods:{
			done(){
				var that = this;
				that.$router.push({name:'findAccountResult',query:{type:'realName',realName:that.realName,card:that.card}})
			}
		}
	}
</script>

<style lang="scss">
	.realname-box{
		>form>section{
			background-color: #fff;
			padding-left: 28px;
		}
		label{
			position: relative;
			display: block;
			font-size: 0;
			border-bottom: 1px solid #f5f5f5;
			&:last-of-type{
				border: 0;
			}
			>i{
				position: absolute;
				
				left: 30px;
				top: 50%;
				margin-top: -16px;
				width: 28px;
				height: 32px;
			}
			&.realname>i{
				background: url(../img/phone.png) center top no-repeat;
			}
			&.card>i{
				background: url(../img/money.png) center top no-repeat;
			}
			>input{
				display: block;
				width: 100%;
				font-size: 28px;
				line-height: 3;
				padding-left: 90px;
				box-sizing: border-box;
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