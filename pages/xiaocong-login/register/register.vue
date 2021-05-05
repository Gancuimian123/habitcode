<template>
	<view class="content">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">Register</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="forget-bg">
				<view class="forget-card">
					<view class="register-head">Register</view>
					<view class="forget-input forget-margin-b">
						<input v-model="phoneno" name="phoneno" type="number" placeholder="Input your phone number" />
					</view>
					<view class="forget-input forget-margin-b">
						<input v-model="username" name="username" placeholder="Input your username" />
					</view>
					<view class="forget-input forget-margin-b">
						<input v-model="password1" name="password1" type="password" placeholder="Input your password" />
					</view>
					<view class="forget-input forget-margin-b">
						<input v-model="password2" name="password2" type="password" placeholder="Confirm your password" />
					</view>
				</view>
			</view>
			<view class="forget-btn">
				<button form-type="submit" class="landing" type="primary">Submit</button>
			</view>
		</form>
	</view>
</template>

<script>
	var  graceChecker = require("../../../common/graceChecker.js");
	import info from '../../../common/common_info.js';
	export default {
		data() {
			return {
				username: '',
				password1: '',
				password2: '',
				phoneno: '',
			}
		},
		
		onLoad() {

		},
		methods: {
			formSubmit: function(e) {
			    console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			    //定义表单规则
				var rule = [
					{name:"phoneno", checkType:"phoneno", checkRule:"", errorMsg: "Not a valid phone number" },
					{name:"username", checkType:"not null", checkRule: "", errorMsg: "Username can not be a null value" },
					{name:"password1", checkType: "string", checkRule: "6,10", errorMsg: "Password length of 6-10 digits"},
					{name:"password2", checkType: "string", checkRule: "6,10", errorMsg: "Password length of 6-10 digits"}
				]
				
				var formdata = e.detail.value
				var checkRes = graceChecker.check(formdata, rule);
				if(this.password1 == this.password2){
					if(checkRes){
						uni.showModal({
						    content: 'Register Success',
						    showCancel: false
						});
						uni.request({
							url: info.url+"/p/register",
							data:{
								username:e.detail.value.username,
								pwd:e.detail.value.password1,
								phone:e.detail.value.phoneno
							},
							method:"GET",
							success(data) {
								console.log(data);
								uni.navigateBack({
									
								})
							}
						})
					}else{
						uni.showToast({
							title: graceChecker.error,
							icon:"none"
						})
					}
				}else{
					uni.showToast({
						title: "Two inconsistent password entries",
						icon: "none"
					})
				}
				
			},
		}
	}
</script>

<style>
	.verify-left{
		width: calc(100% - 260upx);
	}
	.verify-right{
		padding-left: 20upx;
	}
	.verify-btn{
		height: 80upx;
		line-height: 80upx;
		font-size: 28upx;
		width: 240upx;
		border-radius: 8upx;
		background: linear-gradient(left,#0081ff#0081ff,#0081ff#0081ff);
	}
	.verify-left,.verify-right{
		float: left;
	}
	.landing{
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		background: linear-gradient(left,#0081ff#0081ff,#0081ff#0081ff);
	}
	.register-head{
		font-size: 34upx;
		text-align: center;
		padding: 25upx 10upx 55upx 10upx;
	}
	.forget-btn{
		padding: 10upx 20upx;
		margin-top: 430upx;
	}

	.forget-input input{
		background: #F2F5F6;
		font-size: 28upx;
		padding: 10upx 25upx;
		height: 80upx;
		line-height: 62upx;
		border-radius: 8upx;
	}
	.forget-margin-b{
		margin-bottom: 25upx;
	}
	.forget-input{
		padding: 10upx 20upx;
		overflow: auto;
	}
	.forget-card{
		background: #fff;
		border-radius: 12upx;
		padding: 10upx 25upx;
		box-shadow: 0 6upx 18upx rgba(0,0,0,0.12);
		position: relative;
		margin-top: 320upx;
	}
	.forget-bg {
		height: 560upx;
		padding: 25upx;
		background: linear-gradient(#0081ff,#f8f8f8);
	}
</style>
