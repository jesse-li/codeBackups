<template>
	<section class="que-header">
		<header>
			<!--<i class="return-btn" @click="returnF()"></i>-->
			<router-link class="return-btn" to="/"></router-link>
			{{titleName}}
		</header>
		<p>您可以根据以下方式找回帐号</p>
		<section>
			<router-link :key="index" v-for="(item,index) in nav" :to="{name:item.urlName,query:{id:selfId,parentId:parentId,name:titleName}}">{{item.name}}</router-link>
		</section>
		<div class="line"></div>
	</section>
	
</template>

<script>
	require('./queHeader.scss')
	export default {
		props:{
			titleName:{
			},
			selfId:{
			},
			parentId:{
			}
		},
		data(){
			return {
				nav:[
					{
						name: '设备信息',
						urlName: 'byIMEI'
					},
					{
						name: '游戏信息',
						urlName: 'byGameInfo'
					},
					{
						name: '充值记录',
						urlName: 'byRecharge'
					},
					{
						name: '实名信息',
						urlName: 'byRealName'
					}
				]
			}
		}
	}
</script>
