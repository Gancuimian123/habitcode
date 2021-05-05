<script>
	import Vue from 'vue'
	import info from 'common/common_info.js'
	
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
					success: function(e) {
						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						};
						// #endif
						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif		
						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
			console.log('App Launch')
			uni.getStorage({
				key: 'user',
				success: (res) => {
					console.log(res);
					if (res.data.username != '') {
						info.username = res.data.username;
						info.phone = res.data.phone;
						info.profile = res.data.profile;
						info.login_status = true;
					}
				},
				fail: (res) => {
					console.log(res);
				}
			})
		},
		onShow: function() {
			info.appstatus = true;
			console.log('App Show')
			
		},
		onHide: function() {
			info.appstatus = false;
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "uview-ui/index.scss";
	/* @import "app.css"; */ /* 你的项目css */
	
</style>
