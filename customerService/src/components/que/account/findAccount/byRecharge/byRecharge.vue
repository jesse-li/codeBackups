<template>
	<section class="recharge">
		<form @submit.prevent="validateData(done)">
			<section>
				<label :class="{'is-error':errors.has('payChannelType')}" @click.prevent="isShowType = true" class="type chooseBox"><i></i><input v-model="chargeType.desc" disabled="" placeholder="请输入充值方式" type="text" />
				<input v-validate="{required:true}" v-model="chargeType.id" type="hidden" name="payChannelType" id="" value="" />
				<ul v-show="isShowType">
					<li>
						<a @click.prevent.stop="selectType(item)" v-for="item in chargeTypeList" href="javascript:void(0)" target="_self">
							<div><img src="zfb.png" alt="" /></div>
							<span>{{item.desc}}</span>
						</a>
					</li>
				</ul>
				<span class="background"> </span>
				</label>
			<label class="money"><i></i><input :class="{'is-error':errors.has('payAmount')}" v-validate="{required:true,regex:/^[1-9]{1}\d*(\.\d{1,5})?$/}" placeholder="请输入支付金额"  type="text" name="payAmount" id="" value="" v-model="payAmount" /></label>
			<label class="order"><i></i><input v-model="payOrder" :class="{'is-error':errors.has('payOrder')}" v-validate="{required:true}" placeholder="请输入支付订单号" type="text" name="payOrder" id="" value="" /></label>
			</section>
			
			<input type="submit" value="查询账号"/>
		</form>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				chargeTypeList:[],
				isShowType: false,
				chargeType:{
					desc:'',
					id:''
				},
				payAmount:'',
				payOrder:''
			}
		},
		created(){
			var that = this;
			that.axios({
				method:'post',
				url: that.mainUrl + '/payPlatforms'
			})
			.then(res => {
				if(res){
					that.chargeTypeList = res.data.data
				}
			})
		},
		methods:{
			selectType(item){
				this.chargeType = item;
				this.isShowType = false;
			},
			done(){
				var that = this;
				that.$router.push({'name':'findAccountResult',query:{type:'charge',payChannelType:that.chargeType.id,payOrder:that.payOrder,payAmount:that.payAmount}})
			}
		}
	}
</script>

<style lang="scss" scoped="">
	.recharge{
		.background {
			display: block;
			width: 24px;
			height: 14px;
			position: absolute;
			right: 30px;
			top: 50%;
			margin-top: -7px;
			background: url('./down.png') no-repeat;
		}
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
				background-color: #fff;
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
		.chooseBox ul {
	position: absolute;
	top: 96px;
	right: 12px;
	width: 357px;
	z-index: 5;
	color: #333;
	background: #fff;
	border: 2px solid #f2f2f2;
}

.chooseBox ul:before {
	content: "";
	display: block;
	position: absolute;
	right: 20px;
	top: -12px;
	width: 19px;
	height: 19px;
	background: #fff;
	border-top: 2px solid #f2f2f2;
	border-right: 2px solid #f2f2f2;
	z-index: 5;
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	transform: rotate(-45deg);
}

.chooseBox ul li {
	line-height: 85px;
}

.chooseBox ul li a {
	display: block;
	padding: 0 20px;
}

.chooseBox ul li a div {
	display: inline-block;
	width: 70px;
	height: 35px;
	text-align: center;
}

.chooseBox ul li a img,
.chooseBox ul li a span {
	vertical-align: middle;
	margin: 0 10px;
}
.chooseBox ul li a span{
	font-size: 24px;
}
.chooseBox ul li a.curr {
	background: #f8f8f8;
}
	}
</style>