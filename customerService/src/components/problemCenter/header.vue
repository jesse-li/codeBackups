<template>
	<section>
		<header>
			<router-link class="return-btn" to="/"></router-link>
			常见问题中心
		</header>
		<section class="search">
			<label>
				<input v-model="searchval" type="text" placeholder="请简单描述您遇到的问题？" name="" id="" value="" />
				<a @click="isPush?toSearch(searchval):searchQue(searchval)" class="icon" href="javascript:void(0)" title="" target="_self"></a>
			</label>
		</section>
	</section>
</template>

<script>
	export default{
		props:['searchVal','isPush','searchQue'],
		data(){
			return {
				searchval:this.searchVal
			}
		},
		created(){
			console.log(this.isPush)
		}
	}
</script>
<style lang="scss" scoped="">
	    header{
	       position: relative;
	       font-size: 32px;
	       font-weight: bold;
	       text-align: center;
	       line-height: 3;
	       background-color: #f5f5f5;
	       >a{
	           position: absolute;
	           left: 28px;
	           top: 50%;
	           margin-top: -19px;
	           width: 26px;
	           height: 38px;
	           background: url(./return-btn.png) center top no-repeat;
	       }
	    }
	    .search{
	        padding: 46px 0;
	        background: url(./search-bg.png) center top no-repeat;
	        >label{
	            position: relative;
	            display: block;
	            width: 620px;
	            margin: 0 auto;
	            >input{
	                display: block;
	                width: 100%;
	                padding-left: 20px;
	                padding-right: 74px;
	                line-height: 72px;
	                font-size: 28px;
	                border-radius: 4px;
	                border: 0;
	                background-color: #fff;
	                box-sizing: border-box;
	            }
	            >a{
	                position: absolute;
	                right: 30px;
	                top: 20px;
	                width: 38px;
	                height: 38px;
	                background-position: -159px 0;
	                cursor: pointer;
	            }
	        }
	    }

</style>