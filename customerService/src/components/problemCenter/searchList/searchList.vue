<template>
	<section class="search-list">
		<v-header :searchVal="searchVal" :isPush="false" :searchQue="searchQue"></v-header>
		<ul v-if="searchList.length">
			<li v-for="item in searchList">
				<router-link :to="{name:'problemDetail',query:{id:item.id}}">
					<h4 v-html="item.title"></h4>
					<p v-html="item.content"></p>
				</router-link>
			</li>
		</ul>
		
	</section>
</template>

<script>
	import header from '../header.vue'
	export default {
		data(){
			return {
				searchVal:this.$route.query.searchVal,
				searchList:[]
			}
		},
		created(){
			var that = this;
			that.searchQue(that.searchVal)
		},
		methods:{
			searchQue(val){
				var that = this;
				console.log('here')
				that.axios({
					url:that.mainUrl + '/api/searchFaq',
					params:{
						input: val
					}
				})
				.then(res => {
					if(res&&res.data.msg_code === 2000){
						that.searchList = res.data.faq
					}
				},fail => {
					console.log(fail)
				})
			}
		},
		components:{
			'v-header': header
		}
	}
</script>

<style>
</style>