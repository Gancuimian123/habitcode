<template>
	<view>
		<cu-custom bgColor="bg-olive" :isBack="true">
			<!-- <block slot="content">WORK</block> -->
			<!-- <block slot='right'></block> -->
		</cu-custom>
		<!-- 卡片 -->
		<view class=" col-3 padding-sm bg-olive bg-color-card justify-center">
			<view class="cu-card case">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/profile/luhao_avatar.jpg);"></view>
							<view class="content flex-sub">
								<view class="text-grey">{{username}}</view>
								<view class="text-gray text-sm flex justify-between">
								</view>
							</view>
						</view>
					</view>
					<view class="image">
						<image src="https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/diet.png" mode="widthFix"></image>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">DIET | NUTRITION</text></view>
					</view>
				</view>
			</view>
			<view class="flex flex-wrap qiun-charts3">
				<!-- 环形图 -->
				<view class="flex-sub">
					<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
				</view>
				<!-- 步进器+switch按钮 -->

			</view>
		</view>

		<!-- 弹窗显示专注模式下的数据 -->
		<template>
			<view>
				<u-popup v-model="show" mode="bottom" border-radius="14" width="500rpx" height="400px" :closeable="true">
					<view style="padding: 50upx; text-align: center;">
						<view>工作 | 学习 简报：</view>
						<u-divider margin-top="30" margin-bottom="30" bg-color="F1F1F1"></u-divider>
						<view>专注时长：</view>
						<view>休息周期：</view>
						<view>休息次数：</view>
						<view>专注时玩手机次数：</view>
						<view>今日总计专注时长：</view>
					</view>
				</u-popup>
			</view>
		</template>

	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import F2 from '@/uni_modules/lime-f2/components/lime-f2/f2.min.js';
	import lF2 from '@/uni_modules/lime-f2/components/lime-f2/'
	import info from '@/common/common_info.js'; 
	var _self;
	var canvaArcbar1;

	export default {
		data() {
			return {
				cWidth3: '', //圆弧进度图
				cHeight3: '', //圆弧进度图
				arcbarWidth: '', //圆弧进度图，进度条宽度,此设置可使各端宽度一致
				pixelRatio: 1,
				switchB: false,
				focushours: 0.5,
				breakperoid: 0.5,
				timestamp: 0,
				username: info.username,
				chartData: {
					series: [{
						name: '   kcal',
						data: 0.25,
						color: '#b0fd92'
					}]
				},
				show: false,
				baseData: [{
					genre: '成犬粮',
					sold: 275
				}, {
					genre: '化毛膏',
					sold: 115
				}, {
					genre: '益生菌',
					sold: 120
				}, {
					genre: '氨糖',
					sold: 350
				}, {
					genre: '其它',
					sold: 150
				}],

			}
		},
		onLoad() {
			_self = this;
			this.cWidth3 = uni.upx2px(310); //这里要与样式的宽高对应
			this.cHeight3 = uni.upx2px(310); //这里要与样式的宽高对应
			this.arcbarWidth = uni.upx2px(24);
			// this.getServerData();
			_self.showArcbar("canvasArcbar1", _self.chartData);
		},
		methods: {
			showArcbar(canvasId, chartData) {
				canvaArcbar1 = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'arcbar',
					fontSize: 11,
					legend: {
						show: false
					},
					background: '#FFFFFF',
					pixelRatio: 1,
					series: chartData.series,
					animation: true,
					width: this.cWidth3,
					height: this.cHeight3,
					dataLabel: true,
					title: {
						name: Math.round(chartData.series[0].data * 100) + '%', //这里我自动计算了，您可以直接给任意字符串
						color: '#FFFFFF',
						fontSize: 25
					},
					subtitle: {
						name: chartData.series[0].name, //这里您可以直接给任意字符串
						color: '#FFFFFF',
						fontSize: 15
					},
					extra: {
						arcbar: {
							type: 'circle', //整圆类型进度条图
							width: _self.arcbarWidth * _self.pixelRatio, //圆弧的宽度
							startAngle: -0.5 //整圆类型只需配置起始角度即可
						}
					}
				});

			},
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			startcount() {
				this.timestamp = this.focushours * 3600;
			},
			endcount() {
				this.timestamp = 0;
				this.show = true;
			},

		}
	}
</script>

<style>
	.bg-color-card {
		height: 1000rpx;
		border-radius: 0rpx 0rpx 70rpx 70rpx;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts3 {
		border: solid 1px #FFFFFF;
		width: 100%;
		height: 310upx;
		position: relative;
	}

	.charts3 {
		position: absolute;
		margin-left: 200upx;
		width: 310upx;
		height: 310upx;

	}
</style>
