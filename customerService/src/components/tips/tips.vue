<template>
	<transition v-on:after-enter="hide" name="fade">
		<section v-show="isShow" class="imei-tips" v-html="content">
		</section>
	</transition>
</template>

<script>
	export default {
		props:['content','isShow'],
		data() {
			return {
				t:false
			}
		},
		methods:{
			hide(){
				var that = this;
				setTimeout(function(){
					that.$emit('senddata',!that.isShow)
				},3000)
			}
		}
	}
</script>
<style lang="scss">
	.imei-tips{
			position: fixed;
			width: 390px;
			left: 50%;
			top: 50%;
			margin-left: -195px;
			padding-top: 30px;
			text-align: center;
			font-size: 28px;
			background-color: #494949;
			border-radius: 10px;
			>p{
				color: #fff;
				padding-bottom: 24px;
			}
			>i{
				display: block;
				color: #ed751a;
				padding-bottom: 20px;
			}
		}
</style>