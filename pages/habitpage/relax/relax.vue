<template>
	<view>
		<cu-custom bgColor="bg-cyan" :isBack="true">

		</cu-custom>
		<!-- 卡片 -->
		<view class=" col-3 padding-sm bg-cyan bg-color-card justify-center">
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
						<image src="https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/relax.png"
						 mode="widthFix"></image>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">Relax | Sleep</text></view>
					</view>
				</view>
			</view>
			<view class="flex flex-wrap">
				<!-- 环形图 -->
				<view class="flex-sub">
					<u-circle-progress class="charts3" :percent="percent" :duration="sleephours*3600000" bg-color="" active-color="#0d9988" :width="300"> 
						<view class="u-progress-content">

							<u-count-down class='u-progress-info' :timestamp="timestamp" separator="colon" separator-size="50" color="#FFFFFF"
							separator-color="#FFFFFF" border-color="#909399" bg-color="F1F1F1" font-size="50" :autoplay="false" ref="uCountDown" @end="endcount()()"></u-count-down>
							
						</view>
					</u-circle-progress>
				</view>
				
				<!-- 步进器+switch按钮 -->
				<view class="flex-sub" >
					<view style="margin-top: 40upx;">
						<view><b>Length of sleep：</b></view>
						<u-number-box v-model="sleephours" :step="0.5" :input-width="190" :positive-integer='false' :min="0.5" @change="boxchange"></u-number-box>
					</view>
					
					<view style="margin-top: 40upx;">
						<view><b>Open Alarm：</b></view>
						<switch class='blue' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" color="#F7F7F7"></switch>
					</view>
				</view>	
			</view>
			
		</view>
		<!-- 分界线 -->
		<u-divider margin-top="30" margin-bottom="30" bg-color="F1F1F1">Click the button to enter/exit sleep mode</u-divider>
		
		<!-- 睡眠按钮 -->
		<view style="text-align: center;">
			
			<u-button style="margin: 10upx; color:#0d9988;" size="default" :plain="true" :ripple="true" shape="circle" @click="startcount()">
				Sleep
			</u-button>
			<u-button style="margin: 10upx;" size="default" :plain="true" type="warning" :ripple="true" shape="circle" @click="endcount()">
				Wake
			</u-button>
			
			<view>
				<u-toast ref="uToast" />
			</view>
		</view>
		
		<!-- 弹窗显示专注模式下的数据 -->
		<template>
			<view>
				<u-popup v-model="show" mode="bottom" border-radius="14" width="500rpx" height="650px" :closeable="true">
					<view style="padding: 50upx; text-align: center;">
						<view><b>Relax | Sleep</b></view>
						<u-divider margin-top="30" margin-bottom="30" bg-color="F1F1F1">Last Night Sleep Report</u-divider>
						<u-row gutter="24" justify="center">
							<u-col span="4">
								<view>Sleep At: 00:00</view>
							</u-col>
							<u-col span="4">
								<view>Wake At: 09:00</view>
							</u-col>
						</u-row>
						
						<!-- 深度 浅度 清醒 -->
						<u-gap></u-gap>
						<u-row gutter="16">
							<u-col span="4" style="text-align: center;">					
									<u-icon name="eye-off" color="#616C84" size="50"></u-icon>
								<view>Deep Sleep</view>
								<view>01:38</view>
							</u-col>
							<u-col span="4" style="text-align: center;">
									<u-icon name="eye-fill" color="#616C84" size="50"></u-icon>
								<view>Light Sleep</view>
								<view>05:14</view>
							</u-col>
							<u-col span="4" style="text-align: center;">
									<u-icon name="eye" color="#616C84" size="50"></u-icon>
								<view>Sober State</view>
								<view>02:08</view>
							</u-col>
						</u-row>

						<!-- 评价 -->
						<u-gap height="30" bg-color="#FFFFFF" ></u-gap>
						<view>Sleep completion</view>
						<u-line-progress :percent="90" active-color="#1cbbb4" :show-percent="true" :striped="true" :striped-active="true" :height="40"></u-line-progress>
						
						<u-gap height="30" bg-color="#FFFFFF" ></u-gap>
						<view>Quality of sleep: Normal</view>
						<u-rate :count="evaluationscore.count" v-model="evaluationscore.value" :colors="evaluationscore.colors" :disabled="true" :gutter="30" :size="30"></u-rate>
						<u-gap></u-gap>
						
						
						<u-divider margin-top="30" margin-bottom="20" bg-color="F1F1F1">Visulization of Sleep Report</u-divider>
					</view>
					
					<!-- 堆叠柱状图 -->
					<view class="qiun-columns">
						<view class="qiun-charts" >
							<canvas canvas-id="canvasColumnStack" id="canvasColumnStack" class="charts"  @touchstart="touchColumn"></canvas>
						</view>
					</view>
					
					<!-- 建议 -->
					
					<view style="padding: 50upx; text-align: center;">
						<u-divider margin-top="10" margin-bottom="30" bg-color="F1F1F1">Suggestions</u-divider>
						<view style="text-align: left;">
							
							<view v-if="sleepsummary == 'Perfect'">Your evaluation of the quality of your sleep this time: Perfect, keep it up!</view>
							<view v-if="sleepsummary == 'Normal'">Your evaluation of the quality of your sleep this time: Normal, you need to optimize your sleep life style</view>
							<view v-if="sleepsummary == 'Poor'">Your evaluation of the quality of your sleep this time: Poor, You need to change your sleep routine immediately!</view>
							
							<u-gap height="10" bg-color="#FFFFFF"></u-gap>
							<view>Your bedtime is late, so it's recommended that you go to bed before 23:00 daily!</view>
							
							<u-gap height="10" bg-color="#FFFFFF"></u-gap>
							<view v-if="sleephours >= 10">You are sleeping for a longer period of time ({{sleephours}}hours), so it is advisable to set an alarm clock to control your sleep!</view>
							
							<u-gap height="10" bg-color="#FFFFFF"></u-gap>
						</view>
					</view>
				</u-popup>
			</view>
		</template>

	</view>
</template>

<script>
	var id = null
	import uCharts from '@/components/u-charts/u-charts.js';
	import info from '@/common/common_info.js'; 
	var _self;
	var canvaColumn=null;
	
	export default {
			data() {
				return {
					switchB: false, //开关状态默认关
					sleephours: 8, //睡眠时长
					timestamp: 0, //展示的时间戳
					timeremain: 0, //剩余时间
					playtimes: 0, //玩手机的次数
					percent: 0, //圆环的百分比，默认0
					show: false, //摘要小卡片默认不展示
					username: info.username,
					orientationData:{ //方向数据
						orientation:[{
							alpha: 0, 
							beta: 0,
							gamma: 0
						}]
					},
					cWidth:'',
					cHeight:'',
					pixelRatio:1,
					SleepData:{
						"ColumnStack": {
								"categories": ["0:00-1:00", "1:00-2:00", "2:00-3:00", "3:00-4:00",
						        "4:00-5:00", "5:00-6:00", "6:00-7:00","7:00-8:00","8:00-9:00"],
						        "series": [{
						        "name": "sober",
						        "data": [20, 0, 0, 17, 0, 0, 24, 22, 40]
						         },{
						        "name": "deep",
						        "data": [10, 20, 13, 10, 20, 14, 6, 8, 2]
						         }, {
						        "name": "light",
						        "data": [30, 40, 47, 33, 40, 46, 30, 30, 18]
						         }]
						    }
					},
					evaluationscore:{
						count: 5,
						value: 2.5,
						colors: ['#8A3335', '#D19A62', '#1cbbb4'],
						},
					sleepsummary: 'Perfect'
					}
				},
			onLoad() {
				_self = this;
				this.cWidth=uni.upx2px(750);
				this.cHeight=uni.upx2px(500);
				// this.getServerData();
			},
			methods: {
				// 切换switch的当前状态值
				SwitchB(e) {
					this.switchB = e.detail.value
				},
				// 第一个步进器的当前状态值
				boxchange(e){
					this.sleephours = e.value;
				},
				// 开始计时
				startcount(){
					let that = this;
					this.timestamp = this.sleephours*3600;
					this.percent = 100;
					// 开始监听手机被动					
					// @TODO 判断期间动了几次手机，值更新在playtimes
					this.watchOrient();	
					this.showToast();
				},
				// 结束计时
				endcount(){
					this.timeremain = (this.sleephours*3600 - this.$refs.uCountDown.seconds); //剩余时间
					this.show = true; //展示摘要小卡片
					this.timestamp = 0; //重置时间戳
					// this.percent = 0;
					// 结束监听手机被动
					this.watchStop();
				
					let ColumnStack={categories:[],series:[]};
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					ColumnStack.categories=this.SleepData.ColumnStack.categories;
					ColumnStack.series=this.SleepData.ColumnStack.series;
					this.showColumnStack("canvasColumnStack",ColumnStack);
				},
				
				// 监听手机动的函数
				watchOrient: function () {
					var that = this;
					if (id) {
						return;
					}
					id = plus.orientation.watchOrientation(function (o) {
						that.orientationData.orientation[0].alpha = o.alpha;
						that.orientationData.orientation[0].beta = o.beta;
						that.orientationData.orientation[0].gamma = o.gamma;
						
						// console.log(parseInt(o.alpha)); //parseInt取整保留整数位值
						// console.log(parseInt(o.beta));
						// console.log(parseInt(o.gamma));
						
					}, function (e) {
						plus.orientation.clearWatch(id);
						id = null;
						console.log("监听失败:" + e.message);
					});
				},
				// 结束监听手机动的函数
				watchStop: function () {
					if (id) {
						plus.orientation.clearWatch(id);
						id = null;
					} else {
						console.log("没有监听设备方向变化");
					}
				},
				// 展示提示消失
				showToast() {
						this.$refs.uToast.show({
							title: 'Sleep Well',
							type: 'success',
							// url: '/pages/user/index'
						})
					},
				showColumnStack(canvasId,chartData){
					canvaColumn=new uCharts({
						$this:_self,
						canvasId: canvasId,
						type: 'column',
						legend:{show:true},
						fontSize:11,
						background:'#FFFFFF',
						pixelRatio:_self.pixelRatio,
						animation: true,
						categories: chartData.categories,
						series: chartData.series,
						xAxis: {
							disableGrid:true,
						},
						yAxis: {
							//disabled:true
						},
						dataLabel: true,
						width: _self.cWidth*_self.pixelRatio,
						height: _self.cHeight*_self.pixelRatio,
						extra: {
							column: {
								type:'stack',
								width: _self.cWidth*_self.pixelRatio*0.5/chartData.categories.length
							}
						  }
					});
					
				},
				touchColumn(e){
					canvaColumn.showToolTip(e, {
						format: function (item, category) {
							return category + ' ' + item.name + ':' + item.data 
						}
					});
				},		
				darkbrightness(){
					uni.setScreenBrightness({
					    value: 0.1,
					    success: function () {
					        console.log('set screen brightness success');
					    }
					});
				},
				getbrightness(){
					uni.getScreenBrightness({
					    success: function (res) {
					        console.log('screen brightness：' + res.value);
							if(res.value >= 0.1){
								this.wake = true;
							}
					    }
					});
				},
			}
		}
</script>

<style>
	.bg-color-card{
		height: 1000rpx;
		border-radius: 0rpx 0rpx 70rpx 70rpx;
	}

	.charts3 {
		position: absolute;
		margin-left: 30upx;
		width: 500upx;
		height: 500upx;
	
	}
	.u-progress-dot {
			width: 16rpx;
			height: 16rpx;
			border-radius: 50%;
			background-color: #FFFFFF;
		}
	.u-progress-content {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	.u-progress-info {
			font-size: 28rpx;
			padding-left: 16rpx;
			letter-spacing: 2rpx
		}
		
	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}
	
	page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
	.qiun-padding{padding:2%; width:96%;}
	.qiun-wrap{display:flex; flex-wrap:wrap;}
	.qiun-rows{display:flex; flex-direction:row !important;}
	.qiun-columns{display:flex; flex-direction:column !important;}
	.qiun-common-mt{margin-top:10upx;}
	.qiun-bg-white{background:#FFFFFF;}
	.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
	.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
	.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
	
</style>
