<template>
	<view class="content">
		
		<cu-custom bgColor="bg-black" :isBack="false">
			<block slot="content">Habit</block>
		</cu-custom>
		
		<view class="cu-bar bg-white justify-center">
			<view class="action flex ">
				<view v-if="login_status == false">
					<text>Please login first! ---> </text>
					<button class="cu-btn round shadow"  @click="login">Login</button>
				</view>
				<view v-else>
					<text>Welcome,</text>
					<block>{{username}}</block>
				</view>
			</view>
		</view>
		<!-- WORK | STUDY -->
		<view class="cu-bar bg-blue margin-top" style="border-radius: 50upx 50upx 0upx 0upx; margin: 30upx 10upx 0upx 10upx;">
			<view class="action">
				<text class="cuIcon-title text-white"></text>WORK | STUDY
			</view>
		</view>
		<view style="padding-left: 10upx; padding-right: 10upx" @click="goWORK">
			<view class="bg-img bg-mask flex align-center radius bg-img" style=" border-radius: 0upx 0upx 50upx 50upx; background-image: url('https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/work.png');height: 414upx;">
				<view class="padding-xl text-white">
					<view class="padding-xs text-xl text-bold">
						WORK | STUDY
					</view>
					<view class="padding-xs text-lg">
						Helping to improve your productivity
					</view>
				</view>
			</view>
		</view>
		<!-- RELAX | SLEEP -->
		<view class="cu-bar bg-cyan margin-top" style="border-radius: 50upx 50upx 0upx 0upx; margin: 30upx 10upx 0upx 10upx;">
			<view class="action">
				<text class="cuIcon-title text-white"></text>RELAX | SLEEP
			</view>
		</view>
		<view style="padding-left: 10upx; padding-right: 10upx; " @click="goRELAX">
			<view class="bg-img bg-mask flex align-center radius shadow-blur bg-img" style="border-radius: 0upx 0upx 50upx 50upx; background-image: url('https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/relax.png');height: 414upx;">
				<view class="padding-xl text-white">
					<view class="padding-xs text-xl text-bold">
						RELAX | SLEEP
					</view>
					<view class="padding-xs text-lg">
						Helping you to rest better
					</view>
				</view>
			</view>
		</view>
		<!-- SPORT | TRAINING -->
		<view class="cu-bar bg-orange margin-top" style="border-radius: 50upx 50upx 0upx 0upx; margin-left: 10upx; margin-right: 10upx;">
			<view class="action">
				<text class="cuIcon-title text-white"></text>SPORT | TRAINING
			</view>
		</view>
		<view style="padding-left: 10upx; padding-right: 10upx; " @click="goSPORT">
			<view class="bg-img bg-mask flex align-center radius shadow-blur bg-img" style="border-radius: 0upx 0upx 50upx 50upx; background-image: url('https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/sport.png');height: 414upx;">
				<view class="padding-xl text-white">
					<view class="padding-xs text-xl text-bold">
						SPORT | TRAINING
					</view>
					<view class="padding-xs text-lg">
						Exercise to strengthen your body
					</view>
				</view>
			</view>
		</view>
		<!-- DIET | NUTRITION -->
		<view class="cu-bar bg-olive margin-top" style="border-radius: 50upx 50upx 0upx 0upx; margin-left: 10upx; margin-right: 10upx;">
			<view class="action">
				<text class="cuIcon-title text-white"></text>DIET | NUTRITION
			</view>
		</view>
		<view style="padding-left: 10upx; padding-right: 10upx; margin-bottom: 110upx;" @click="goDIET">
			<view class="bg-img bg-mask flex align-center radius shadow-blur bg-img" style="border-radius: 0upx 0upx 50upx 50upx; background-image: url('https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/eat.png');height: 414upx;">
				<view class="padding-xl text-white">
					<view class="padding-xs text-xl text-bold">
						DIET | NUTRITION
					</view>
					<view class="padding-xs text-lg">
						Eat healthy for better health
					</view>
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
				// title: 'Hello'
				username: info.username,
				login_status: info.login_status
			}
		},
		onShow() {
			this.username = info.username;
			this.login_status = info.login_status;
		},
		onLoad() {
			console.log(info.login_status)
		},
		methods: {
			login: function(e){
				uni.navigateTo({
					url: '../xiaocong-login/login/login'
				})
			},
			goWORK: function(e){
				uni.navigateTo({
					url:'../habitpage/work/work'
				})
			},
			goRELAX: function(e){
				uni.navigateTo({
					url:'../habitpage/relax/relax'
				})
			},
			goSPORT: function(e){
				uni.navigateTo({
					url:'../habitpage/sport/sport'
				})
			},
			goDIET: function(e){
				uni.navigateTo({
					url:'../habitpage/diet/diet'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
