<template>
	<section class="recharge">
		<form @submit.prevent="validateData(done)">
			<section>
				<label class="type"><i></i><input v-validate="'required'" :class="{'is-error':errors.has('gameName')}" placeholder="请输入游戏名称" type="text" name="gameName" v-model="gameName" id="" value="" /></label>
			<label class="money"><i></i><input v-validate="'required'" :class="{'is-error':errors.has('roleName')}" v-model="roleName" placeholder="请输入角色名称"  type="text" name="roleName" id="" value="" /></label>
			<label class="order"><i></i><input v-model="areaName" v-validate="'required'" :class="{'is-error':errors.has('areaName')}" placeholder="请输入区服名称" type="text" name="areaName" id="" value="" /></label>
			</section>
			
			<input type="submit" value="查询账号"/>
		</form>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				gameName:'',
				roleName:'',
				areaName:''
			}
		},
		methods:{
			done(){
				var that = this;
				that.$router.push({name:'findAccountResult',query:{type:'gameInfo',gameName:that.gameName,roleName:that.roleName,areaName:that.areaName}})
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.recharge{
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
			&.type>i{
				background: url(../img/phone.png) center top no-repeat;
			}
			&.money>i{
				background: url(../img/money.png) center top no-repeat;
			}
			&.order>i{
				background: url(../img/order.png) center top no-repeat;
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