<template>
	<section class="feedback-result">
		<v-header :title="title"></v-header>
		<v-noresult :resultCon="resultCon" :to="to"></v-noresult>
		<article class="result-main">
            <section>
                <div class="finish">
                    <h2 class="title">工单编号：sn7319310mr</h2>
                    <p class="type">问题类型: 帐号问题—角色登录异常</p>
                    <p class="desc">问题描述 ：请前往微信关注【当乐玩家服务号】，按提示 完成乐号绑定，奖励将在24小时内发放，请耐心等待。</p>
                    <p class="time">反馈时间：2017-10-10 00：00：00</p>
                    <p class="solve">已解决</p>
                </div>
                <div>
                    <div class="result">
                        <p>处理结果</p>
                        <a class="comment" href="">评论</a>
                    </div>
                    <div class="resultDesc">
                        已告知玩家下载新版本诛仙手游，玩家说已经可以使
                        用QQ登录，同意撤销申诉,已告知玩家下载新版本诛
                        仙手游，玩家说已经可以使用QQ登录，同意撤销申
                        诉!!!
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <h2 class="title">工单编号：sn7319310mr</h2>
                    <p class="type">问题类型: 帐号问题—角色登录异常</p>
                    <p class="desc">问题描述 ：请前往微信关注【当乐玩家服务号】，按提示 完成乐号绑定，奖励将在24小时内发放，请耐心等待。</p>
                    <p class="time">反馈时间：2017-10-10 00：00：00</p>
                    <p class="pending">待处理</p>
                </div>
            </section>
        </article>
		<div class="fixed">
            <article>
                <section>
                    <p>对于此次反馈的处理结果您是否感到满意？</p>
                </section>
                <div class="dos clearfix">
                    <a href="javascript:" class="satisfied fl">满意</a>
                    <a href="javascript:" class="noSatisfied fr">不满意</a>
                </div>
            </article>
        </div>
	</section>
</template>

<script>
	import header from '../../header/header.vue'
	import noResult from '../../noResult/noResult.vue'
	export default {
		data(){
			return {
				title:'反馈进度',
				resultCon:'您当前暂未提交任何问题反馈哦~~',
				to:{
					title:'返回首页',
					url:'/'
				}
			}
		},
		components:{
			'v-header':header,
			'v-noresult': noResult
		}
	}
</script>
<style lang="scss" scoped="" src="./feedbackResult.scss">
	
</style>