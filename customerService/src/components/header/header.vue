<template>
	<header>
		<a @click="returnF" href="javascript:void(0)" title="" target="_self"></a>
		{{title}}
	</header>
</template>

<script>
	export default {
		props:['title']
	}
</script>

<style lang="scss" scoped="">
header{
	position: relative;
	font-size: 32px;
	line-height: 3;
	text-align: center;
	color: #fff;
	background-color: #ed751a;
	>a{
		position: absolute;
		left: 28px;
		top: 50%;
		margin-top: -19px;
		width: 28px;
		height: 38px;
		background: url(./return.png) center top no-repeat;
	}
}
</style>