<template>
	<article>
		<v-header :title="title"></v-header>
        <section class="title">
            <p>您可以通过验证密保信息找回密码</p>
            <h2>请输入你要找回密码的帐号</h2>
        </section>
        <form @submit.prevent="postF($event,'/findAccountsByTag',done)">
        <div class="content">
        	
        		 <img class="" src="./mimazhaohui.png" alt="">
            	<input v-model="tag" v-validate="{required:true}" name="tag" :class="{'is-error':errors.has('tag')}" type="text" class="" placeholder="乐号/用户名/手机号/邮箱">
        		
        	
           
        </div>
        <input class="next" type="submit" value="下一步"/>
        </form>
    </article>
</template>

<script>
	import header from '../../../header/header.vue'
	export default {
		data(){
			return {
				title:'密码找回',
				tag:''
			}
		},
		methods:{
			done(res){
				var that = this;
				if(res.data.code === 2000){
					if(res.data.data.length>1){//绑定了多个乐号
						that.$router.push({name:'selectAccount',query:{tag:that.tag}})
					}else if(res.data.data.length === 1){//只有一个乐号
						if(res.data.data[0].email!==''||res.data.data[0].phoneNumber!==''){//有密保
							that.$router.push({name:'selectMB',query:{mid:res.data.data[0].mid,email:res.data.data[0].email,phoneNumber:res.data.data[0].phoneNumber}})
						}else{//没有密保
							
						}
					}else{//没有查询到
						
					}
				}	
			}
		},
	
	components:{
		'v-header':header
	}
}
</script>

<style scoped="">
	body{
		background: #f5f5f5;
	}
	.title {
    width: 720px;
    background: #fff;
    padding: 40px 30px 30px 30px;
    box-sizing: border-box;
}

.title > p {
    font-size: 24px;
    color: #999;
}

.title > h2 {
    font-weight: normal;
    font-size: 28px;
    color: #333;
    margin-top: 40px;
}

div.content {
    width: 720px;
    height: 97px;
    box-sizing: border-box;
    padding: 0 30px;
    position: relative;
    margin-top: 20px;
    line-height: 97px;
    background: #fff;
}

div.content img {
    width: 23px;
    height: 32px;
    vertical-align: text-bottom;
}

div.content input[type='text'] {
    border: none;
    width: 595px;
    height: 97px;
    line-height: 97px;
    font-size: 28px;
    box-sizing: border-box;
    padding-left: 40px;
}
.next {
    display: block;
    width: 660px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-radius: 10px;
    background: #ed751a;
    font-size: 28px;
    color: #fff;
    margin: 0 auto;
    margin-top: 20px;
}
</style>