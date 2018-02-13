<template>
	
	<article>
			<section class="title">
				<h2>正在为帐号"371831"找回密码</h2>
				<p>您可以通过以下方式进行找回</p>
			</section>
			<form @submit.prevent="postF($event,'/addCustomerRechargeOrder',done)">
				<div v-for="(item,index) in orderList " class="content">
					<h3>订单信息{{index+1}}
					<a @click.prevent="orderList.splice(index,1)" v-if="index>0" href="javascript:void(0)" class="del">
						<img src="./del.png" alt="" />
					</a>
					</h3>
					<div>
						<div>
							<span><img src="./name.png" alt=""></span>
							<span class="chooseBox">
								<a :class="{'is-error':errors.has('payPlatform'+(index+1))}" @click.prevent="item.openSelect = true" href="javascript:void(0)" target="_self" class="choose" v-text="item.chargeType === ''?'请选择充值方式':selectList[item.chargeType-1].name"></a>
								<ul v-show="item.openSelect">
									<li v-for="(_item,index) in selectList">
										<a @click.prevent="addChargeType(item,_item)" href="javascript:void(0)" target="_self">
											<div><img :src="_item.icon" alt="" /></div>
											<span>{{_item.name}}</span>
										</a>
									</li>
								</ul>
							</span>
							<i class="background"> </i>
							<input v-validate="'required'" type="hidden" :name="'payPlatform'+(index+1)" value="" v-model="item.chargeType" />
						</div>
						<section v-if="item.chargeType!==5" class="no-bank">
							<div>
								<span><img class="" src="./card.png" alt=""></span>
								<input type="text" class="" placeholder="请输入支付账号">
							</div>
							<div>
								<span><img src="./coin.png" alt=""></span>
								<input type="text" class="" placeholder="请输入支付金额">
							</div>
							<div>
								<span><img src="./goods.png" alt=""></span>
								<input type="text" class="account" placeholder="请输入商户订单号">
								<a href="">如何查询?</a>
							</div>
							<div>
								<span><img src="./time.png" alt=""></span>
								<input type="text" class="account" placeholder="支付时间，越准确越好">
								<i class="background"> </i>
							</div>
						</section>
					</div>
				</div>
				<a @click.prevent="addOrder" class="addInfo" href="javascript:void(0)" >+ 添加订单信息</a>
				<input class="next" type="submit" value="提交审核"/>
			</form>
			
			
			
		</article>
	
</template>

<script>
	export default {
		data() {
			return {
				orderList:[
					{
						openSelect:false,
						chargeType:''
					}
				],
				selectList:[
					{
						name: '支付宝',
						icon: require('./zfb.png'),
						id: 1
					},
					{
						name: '微信支付',
						icon: require('./wx.png'),
						id: 2
					},
					{
						name: '财付通',
						icon: require('./QQ.png'),
						id: 3
					},
					{
						name: '先玩后付',
						icon: require('./mo9.png'),
						id: 4
					},
					{
						name: '银联',
						icon: require('./bank.png'),
						id: 5
					}
				]
			}
		},
		methods:{
			addChargeType(item,_item){
				item.chargeType = _item.id;
				item.openSelect = false;
			},
			addOrder(){
				var that = this;
				that.orderList.push({
						openSelect:false,
						chargeType:''
					})
			},
			done(res){
				console.log(res)
			}
		}
	}
</script>

<style scoped="" src="./charge.css">
</style>