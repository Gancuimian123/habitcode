<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="false">
			<block slot="backText">Back</block>
			<block slot="content">Profile</block>
		</cu-custom>
		
	<!-- 未登录展示的信息 -->
		<view v-if="login_status == false">
			<view class="cu-card case">
				<view class="cu-item shadow">
					<view class="image">
						<image src="https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/LOGO.png"
						 mode="widthFix"></image>
						 <view class="cu-bar bg-shadeBottom"> 
						 	<text class="text-cut">Please login first.</text>
						 </view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://filepr-1259018500.cos.ap-beijing.myqcloud.com/nmvapp/pics/guest.jpg);"></view>
							<view class="content flex-sub">
								<view class="text-grey">Guest</view>
								<view class="text-gray text-sm flex justify-between">
									No title
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-black margin-tb-sm lg shadow" @click="login">Log In</button>
				</view>
			</view>
		</view>
		
		<!-- 已登录展示的信息 -->
		<view v-if="login_status == true">
			<!-- 个人信息页 -->
			<view class="cu-card case">
				<view class="cu-item shadow">
					<view class="image">
						<image src="https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/hkulogo.jpeg"
						 mode="widthFix"></image>
						<!-- <view class="cu-tag bg-red">Manager</view> -->
						<view class="cu-bar bg-shadeBottom"> 
							<text class="text-cut">Love & Peace.</text>
						</view>
					</view>
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/profile/avatar.jpeg);"></view>
							<view class="content flex-sub">
								<view class="text-grey">{{username}}</view>
								<view class="text-gray text-sm flex justify-between">
									Love & Peace
									<view class="text-gray text-sm">
										<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
										<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
										<text class="cuIcon-messagefill margin-lr-xs"></text> 30
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		
			<!-- HOME/登出按钮 -->
			<view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-black margin-tb-sm lg shadow" @click="gohome">Home</button>
					<button class="cu-btn bg-grey margin-tb-sm lg shadow" @click="logout">Log Out</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import info from "../../common/common_info.js";
	
	export default {
		data() {
			return {
				username: info.username,
				profile: info.proflie,
				login_status: info.login_status
			}
		},
		onShow() {
			this.username = info.username;
			this.profile = info.proflie;
			this.login_status = info.login_status;
		},
		methods: {
			login: function(e){
				// this.login_status = true;
				uni.navigateTo({
					url:"../xiaocong-login/login/login"
				})
			},
			logout: function(e){
				info.login_status = false;
				console.log('login status: '+ info.login_status);
				uni.reLaunch({
					url:'../index/index',
					complete: () => {
						console.log('relunch succesful!');
						uni.showModal({
							title: 'Success!',
							content: 'You Have Loged Out!',
							showCancel: false,
						})
					}
				});
				uni.setStorage({
					key: 'user',
					data: {
						username: ''
					},
					success: (res) => {
						console.log(res);
					}
				})
			},
			gohome: function(e){
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>

<style>

</style>
