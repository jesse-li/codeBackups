<template>
	<section class="no-result">
		<i></i>
		<p>{{resultCon}}</p>
		<router-link :class="addClass" :to="to.url">{{to.title}}</router-link>
	</section>
</template>

<script>
	export default {
		props:['resultCon','to','addClass']
	}
</script>

<style scoped="" lang="scss">
        .no-result{
            padding-top: 100px;
            text-align: center;
            >i{
                display: inline-block;
                width: 170px;
                height: 168px;
                background: url(./no-result.png) center top no-repeat;
            }
            >p{
                padding-top: 50px;
                font-size: 24px;
                color: #666;
            }
            >a{
                display: inline-block;
                width: 242px;
                margin-top: 50px;
                font-size: 28px;
                line-height: 2.6;
                color: #ed751a;
                border: 1px solid;
                border-radius: 10px;
                box-sizing: border-box;
                background-color: #fff;
                &.no-border{
                	background-color: #f5f5f5;
                	border: 0;
                	
                }
            }
        }
    
</style>