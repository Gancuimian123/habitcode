<template>
	<view class="content">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">Login</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="login-bg">
				<view class="login-card">
					<view class="login-head">Login</view>
					<view class="login-input ">
						<input name="phone" placeholder="phone number" />
					</view>
					<view class="login-input">
						<input name="password" type="password" placeholder="password" />
					</view>
					<view class="login-function">
						<view class="login-forget" @click="go_forget">Forget password?</view>
						<view class="login-register" @click="go_register">Register></view>
					</view>
				</view>
			</view>
			<view class="login-btn">
				<button form-type="submit" class="landing" type="primary" @tap="">Login</button>
			</view>
		</form>
	</view>
</template>

<script>
	import info from '../../../common/common_info.js';
	var  graceChecker = require("../../../common/graceChecker.js");
	
	export default {
		data() {
			return {
				title: 'Hello',
				login_status: info.login_status
			}
		},
		onLoad() {

		},
		methods: {
			formSubmit: function(e) {
                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                //定义表单规则
				var rule = [
					{name:"phone", checkType:"phoneno", checkRule:"", errorMsg: "Not a valid phone number"},
					{name:"password"}
				]
				
				var formdata = e.detail.value
				var checkRes = graceChecker.check(formdata, rule);
				uni.request({
					url: info.url+"/p/login",
					data:{
						phone:e.detail.value.phone,
						pwd:e.detail.value.password
					},
					method:"GET",
					success(data) {
						console.log(data);
						if (data.statusCode != 200) {
							console.log(data.errMsg);
							uni.showModal({
							    content: 'data.errMsg',
							    showCancel: false
							});
						}
						else {
							if (data.data == '') {
								uni.showModal({
								    content: 'password or phone is wrong',
								    showCancel: false
								});
								console.log("password or phone is wrong")
							}
							else {
								info.login_status = true;
								info.username = data.data.split("&")[0].split("=")[1];
								info.phone = e.detail.value.phone;
								info.profile = data.data.split("&")[2].split("=")[1];
								uni.showModal({
								    content: 'Login Success',
								    showCancel: false
								});
								uni.setStorage({
									key: 'user',
									data: {
										phone: info.phone,
										username: info.username,
										profile: info.profile
									},
									success: (res) => {
										console.log(res);
									}
								})
								uni.switchTab({
									url: '../../profile/profile'
								})
							}
						}
					}
				})
            },
			go_forget(){
				// uni.navigateTo({
				//     url: '../forget/forget'
				// })
			},
			go_register(){
				uni.navigateTo({
					url: '../register/register'
				})
			},
			go_profile(){
				console.log(this.username);
				console.log(this.password);
				
				//判断是否已经登录
				
				// if(info.login_status = true){
				// 	uni.showModal({
				// 		title: "sorry",
				// 		content: 'You have already loged in'
				// 	})
				// }
				// else{
					info.login_status = true;
					uni.switchTab({
						url: '../../profile/profile'
					})
				// }
			}
			
		}
	}
</script>

<style>
	.landing{
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		background: linear-gradient(left,#0081ff,#0081ff);
	}
	.login-btn{
		padding: 10upx 20upx;
		margin-top: 350upx;
	}
	.login-function{
		overflow: auto;
		padding: 20upx 20upx 30upx 20upx;
	}
	.login-forget{
		float: left;
		font-size: 26upx;
		color: #999;
	}
	.login-register{
		color: #666;
		float: right;
		font-size: 26upx;

	}
	.login-input input{
		background: #F2F5F6;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 80upx;
		line-height: 62upx;
		border-radius: 8upx;
	}
	.login-margin-b{
		margin-bottom: 25upx;
	}
	.login-input{
		padding: 10upx 20upx;
	}
	.login-head{
		font-size: 34upx;
		text-align: center;
		padding: 25upx 10upx 55upx 10upx;
	}
	.login-card{
		background: #fff;
		border-radius: 12upx;
		padding: 10upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0,0,0,0.12);
		position: relative;
		margin-top: 320upx;
	}
	.login-bg {
		height: 560upx;
		padding: 25upx;
		background: linear-gradient(#0081ff,#f8f8f8);
	}
</style>
