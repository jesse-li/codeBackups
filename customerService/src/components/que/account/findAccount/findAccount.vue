<template>
	<section>
		<v-header :selfId="selfId" :parentId="parentId" :titleName="titleName"></v-header>
		<router-view/>
	</section>
</template>

<script>
	import header from '../../header/queHeader'
	export default {
		data(){
			return {
				selfId:'',
				parentId:'',
				titleName:''
			}
			
		},
		created(){
			var that = this;
			that.selfId = that.$route.query.id;
			that.parentId = that.$route.query.parentId;
			that.titleName = that.$route.query.name;
			that.$router.replace({name:'byIMEI',query:{id:that.selfId,parentId:that.parentId,name:that.titleName}})
			
		},
		components:{
			'v-header': header
		}
	}
</script>
