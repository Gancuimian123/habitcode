<template>
	<view class="content">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="content">Forget</block>
		</cu-custom>
		<view class="forget-bg">
			<view class="forget-card">
				<view class="forget-head">Forget</view>
				<view class="forget-input forget-margin-b">
					<input type="number" placeholder="Input your email address" />
				</view>
				<view class="forget-input forget-margin-b">
					<view class="verify-left">
						<input type="number" placeholder="Input verify code" />
					</view>
					<view class="verify-right">
						<button class="verify-btn" type="primary">Obtain v-code</button>
					</view>
				</view>
				<view class="forget-input">
					<input type="number" placeholder="Input password"/>
				</view>
			</view>
		</view>
		<view class="forget-btn">
			<button class="landing" type="primary">Submit</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

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
		background: linear-gradient(left,#0081ff,#0081ff);
	}
	.verify-left,.verify-right{
		float: left;
	}
	.landing{
		height: 84upx;
		line-height: 84upx;
		border-radius: 44upx;
		font-size: 32upx;
		background: linear-gradient(left,#0081ff,#0081ff);
	}
	.forget-btn{
		padding: 10upx 20upx;
		margin-top: 380upx;
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
		background: linear-gradient(#282C35,#ABB2B6);
	}
	.forget-head{
		font-size: 34upx;
		text-align: center;
		padding: 25upx 10upx 55upx 10upx;
	}
</style>
