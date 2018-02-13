<template>
	<article>
		<v-header :title="title"></v-header>
            <section class="title">
                <h2>当前手机189***2729绑定了多个乐号</h2>
                <p>您可以通过以下方式进行找回</p>
            </section>
            <section class="content">
                <div v-for="(item,index) in toData" @click="curr = index" class="clearfix means">
                    <div class="fl chooseOr">
                         <img :src="curr === index?chooseImg:noChooseImg" alt="">
                    </div>
                    <div class="fl picture">
                        <img src="http://img.d.cn/netgame/hdlogo/5531_1454117784662_NP5nsIc8.png" alt="">
                    </div>
                    <div class="fl detail">
                        <p>乐 号：<span>{{item.mid}}</span></p>
                        <p>用户名： {{item.username}}</p>
                        <p>最近登录：{{item.time}}</p>
                    </div>
                </div>
                
            </section>
            <a @click="to" href="javascript:" class="next">下一步</a>
        </article>
	
</template>

<script>
	import header from '../../../../header/header.vue'
	export default {
		data(){
			return {
				title:'密码找回',
				data:[],
				curr:'',
				chooseImg: require('./choose.png'),
				noChooseImg: require('./nochoose.png')
			}
		},
		computed:{
			toData(){
				var that = this;
				return that.data.map(item => {
					if(item.lastLoginTime){
					var toTime = new Date(item.lastLoginTime);
					
					item.time = ''+ toTime.getFullYear() + (toTime.getMonth() + 1<10?'-0'+(toTime.getMonth() + 1):(toTime.getMonth() + 1)) + (toTime.getDate()<10?'-0'+toTime.getDate():'-'+toTime.getDate()) + ' ' + (toTime.getHours()<10?'0'+toTime.getHours():toTime.getHours()) + ' ' + (toTime.getMinutes()<10?'0'+toTime.getMinutes():toTime.getMinutes()) + ' ' + (toTime.getMilliseconds()<10?'0'+ toTime.getMilliseconds():toTime.getMilliseconds());
					}
					return item;
					
				})
			}
		},
		created(){
			var that = this;
			var formdata = new FormData();
			formdata.append('tag',that.$route.query.tag);
			console.log(formdata.get('tag'))
			that.axios({
				method:'post',
				url: that.mainUrl + '/findAccountsByTag',
				data: formdata
			})
			.then(res => {
				if(res){
					that.data = res.data.data
				}
			})
		},
		methods:{
			to(){
				var that = this;
				if(that.curr === ''){
					alert('请选择乐号')
					return;
				}
				if(that.data[that.curr].email!==''||that.data[that.curr].phoneNumber!==''){//有密保
					that.$router.push({name:'hasProtection',query:{email:that.data[that.curr].email,phoneNumber:that.data[that.curr].phoneNumber,mid:that.data[that.curr].mid,username:that.data[that.curr].username}})
				}else{//没有密保
					
				}
			}
		},
		components:{
			'v-header':header
		}
	}
</script>
<style scoped="" src="./bind.css">
	
</style>
