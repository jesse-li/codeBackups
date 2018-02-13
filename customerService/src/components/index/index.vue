<template>
	<section class="index">
		<header>
			<i class="icon"></i>
			<h1>当乐客服中心</h1>
		</header>
		<section class="search-box">
			<label><input v-model="searchVal" type="text" placeholder="请简单描述您遇到的问题？"/><a href="javascript:void(0)" target="_self" @click="toSearch(searchVal)" class="icon"></a></label>
			<section v-if="announcements.length">
				<i class="icon"></i>
				<marquee>{{announcements[0].txtAnnouncement}}</marquee>
			</section>
		</section>
		<section class="que-list clearfix">
			
			<a v-for="(item,index) in queList" @click="showList(index)" :class="'que'+index" href="javascript:void(0)" title="" target="_self">
				<i class="icon"></i>
				<p>{{item.name}}</p>
			</a>
		</section>
		<section class="feedback">
			<router-link to="/feedback" ><i class="icon"></i>反馈进度查询</router-link>
		</section>
		
		<div class="line"></div>
		<section class="always-que">
			<h4>常见问题</h4>
			<section>
				<router-link :to="{name:'problemDetail',query:{id:item.id}}" v-for="(item,index) in faqs" key="index" >{{item.title}}</router-link>
			</section>
			<router-link to="/problemCenter">
				更多帮助<i class="icon"></i>
			</router-link>
		</section>
		<v-footer></v-footer>
		<transition name="fade">
			<section v-show="isShow" class="show-box">
				<img src="./show.jpg" alt="" title=""/>
				<p>请选择您遇到的帐号问题</p>
				<section>
					<router-link v-for="(item,index) in currList" :key="index" :to="{name:item.urlName,query:{id:item.id,parentId:item.parentId,name:item.name}}"><span>{{item.name}}</span></router-link>
				</section>
			</section>
		</transition>
		
		<div v-show="isShow" class="over"></div>
	</section>
	
</template>

<script>
	
	import footer from '../footer/footer'
	export default{
		data(){
			return {
				isShow:false,
				searchVal:'',
				queList:[
					{
						name:'账号问题',
						listId:0,
						list:[
							{
								name:'账号找回',
								parentId:1,
								id:1,
								urlName:'findAccount'
							},
							{
								name:'密码找回',
								parentId:1,
								id:2,
								urlName:'findPassWord'
							},
							{
								name:'角色登录异常',
								parentId:1,
								id:3,
								urlName:'characterError'
							},
							{
								name:'账号登录异常',
								parentId:1,
								id:4,
								urlName:'accountError'
							},
							{
								name:'验证码无法接收',
								parentId:1,
								id:5,
								urlName:'codeNotGet'
							},
							{
								name:'角色封停',
								parentId:1,
								id:6,
								urlName:'characterStop'
							},
							{
								name:'账号封停',
								parentId:1,
								id:7,
								urlName:'accountStop'
							},
							{
								name:'其他账号问题',
								parentId:1,
								id:8,
								urlName:'other'
							}
						]
					},
					{
						name:'游戏问题',
						listId:1,
						list:[
							{
								name:'角色消失',
								parentId:2,
								id:9
							},
							{
								name:'装备找回',
								parentId:2,
								id:10
							},
							{
								name:'区服查询',
								parentId:2,
								id:11
							},
							{
								name:'游戏内活动咨询',
								parentId:2,
								id:12
							},
							{
								name:'其他游戏问题',
								parentId:2,
								id:13
							},
							{
								name:'开服开测查询',
								parentId:2,
								id:14
							}
						]
					},
					{
						name:'活动问题',
						listId:2,
						list:[
							{
								name:'红包活动',
								parentId:3,
								id:15
							},
							{
								name:'活动广场',
								parentId:3,
								id:16
							},
							{
								name:'VIP活动',
								parentId:3,
								id:17
							},
							{
								name:'金币商场咨询',
								parentId:3,
								id:18
							}
						]
					},
					{
						name:'充值问题',
						listId:3,
						list:[
							{
								name:'乐豆充值问题',
								parentId:4,
								id:19
							},
							{
								name:'游戏充值问题',
								parentId:4,
								id:20
							}
						]
					},
					{
						name:'下载问题',
						listId:4,
						list:[
							{
								name:'APP下载问题',
								parentId:5,
								id:21
							},
							{
								name:'游戏安装问题',
								parentId:5,
								id:22
							},
							{
								name:'游戏更新咨询',
								parentId:5,
								id:23
							},
							{
								name:'其他下载问题',
								parentId:5,
								id:24
							}
						]
					},
					{
						name:'其他问题',
						listId:5,
						list:[
							{
								name:'游戏建议',
								parentId:6,
								id:25
							},
							{
								name:'当乐建议',
								parentId:6,
								id:26
							},
							{
								name:'我要投诉',
								parentId:6,
								id:27
							},
							{
								name:'虚假网站举报',
								parentId:6,
								id:28
							},
							{
								name:'VIP客服通道',
								parentId:6,
								id:29
							},
							{
								name:'商务合作咨询',
								parentId:6,
								id:30
							}
						]
					}
				],
				currList:[],
				announcements:[],
				faqs:[]
			}
		},
		methods:{
			showList(index){
				this.currList = this.queList[index].list;
				this.isShow = true;
			},
			init(){
				var that = this;
				that.axios({
					url: that.mainUrl + '/api/index'
				}).then(res => {
					if(res&&res.data.msg_code === 2000){
						that.announcements = res.data.announcements;
						that.faqs = res.data.faqs;
						console.log(that.faqs)
					}
				})
			}
		},
		created(){
			var that = this;
			that.init()
		},
		components:{
			'v-footer':footer
		}
		
	}
</script>
<style scoped="" lang="scss" src="./index.scss">
	
</style>