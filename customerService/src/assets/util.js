import axios from 'axios'
export default {
	install(Vue,options){
		Vue.prototype.returnF = function () {
			window.history.go(-1);
		}
		Vue.prototype.toSearch = function (val) {
			console.log(val)
			if(val.trim()!==''){
				this.$router.push({name:'searchList',query:{searchVal:val}})
			}
		}
		/*Vue.prototype.findAccountPost = function($event,url){
			var that = this;
				that.$validator.validateAll().then(res => {
					if(res){
						var formdata = new FormData($event.target);
						that.axios({
							method:'post',
							url: that.mainUrl + url,
							data:formdata
						})
						.then(res => {
							if(res&&res.data.code === 2000){
								
							}else{
								alert(res.data.message)
							}
						})
						return;
					}
					
				})
		}*/
		Vue.prototype.validateData = function(fn){
			var that = this;
			that.$validator.validateAll()
				.then(res => {
					res&&fn()
				})
		}
		Vue.prototype.postF = function($event,url,fn){
			var that = this;
				that.$validator.validateAll().then(res => {
					if(res){
						var formdata = new FormData($event.target);
						that.axios({
							method:'post',
							url: that.mainUrl + url,
							data:formdata
						})
						.then(res => {
							fn(res)
						})
						return;
					}
					
				})
		}
		Vue.prototype.mainUrl = 'http://kf.d.cn'
		Vue.prototype.axios = axios
	}
}
