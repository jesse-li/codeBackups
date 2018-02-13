<template>
	<section class="problem-center">
		<v-header :searchVal="searchVal" :isPush="true"></v-header>
		<section class="que-list">
			<section v-for="(item,index) in faqCateList">
				<section class="left">
					<i :class="['icon','icon'+index]"></i>
					<p>{{item.name}}</p>
				</section>
				<section class="right">
					<a v-for="_item in item.cate2" href="">{{_item.name}}</a>
				</section>
			</section>
		</section>
	</section>
</template>

<script>
	require('./problemCenter.scss')
	import header from './header.vue'
	export default {
		data(){
			return {
				searchVal:'',
				faqCateList:[]
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
					url: that.mainUrl + '/api/getFaqCateList'
				})
				.then(res => {
					if(res&&res.data.msg_code === 2000){
						that.faqCateList = res.data.faqCate;
						console.log(that.faqCateList)
					}
				})
			}
		},
		components:{
			'v-header': header
		}
	}
</script>
