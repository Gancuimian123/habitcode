<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">

		</cu-custom>
		<!-- 卡片 -->
		<view class=" col-3 padding-sm bg-blue bg-color-card justify-center">
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
						<image src="https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/work.png"
						 mode="widthFix"></image>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">STUDY | WORK</text></view>
					</view>
				</view>
			</view>
			<view class="flex flex-wrap">
				<!-- 环形图 -->
				<view class="flex-sub">
					<u-circle-progress class="charts3" :percent="percent" :duration="breakperoid*3600000" bg-color="" active-color="#61AFEF" :width="300"> 
						<view class="u-progress-content">
							<view class="u-progress-dot"></view>
							<text class='u-progress-info'>Counting</text>
						</view>
					</u-circle-progress>
				</view>
				
				<!-- 步进器+switch按钮 -->
				<view class="flex-sub" >
					<view style="margin-top: 10upx;">
						<view><b>Hours of focus mode：</b></view>
						<u-number-box v-model="focushours" :step="0.5" :input-width="190" :positive-integer='false' :min="0.5" @change="boxchange"></u-number-box>
					</view>
					<view style="margin-top: 20upx;">
						<view><b>Period of taking break：</b></view>
						<u-number-box v-model="breakperoid" :step="0.5" :max="focushours" :input-width="190" :positive-integer='false' :min="0.5"></u-number-box>
					</view>
					<!-- switch按钮，切换是否提醒 -->
					<view style="margin-top: 20upx;">
						<view><b>Remind me take a break：</b></view>
						<switch class='cyan' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" color="#F7F7F7"></switch>
					</view>
				</view>	
			</view>
			<view style="padding-left: 100upx; margin-top: 20upx;">
				<text>Combine work and rest to be productive</text>
			</view>
		</view>
		<!-- 分界线 -->
		<u-divider margin-top="30" margin-bottom="30" bg-color="F1F1F1">Click the button to enter/exit focus mode</u-divider>
		
		<!-- 专注模式按钮 -->
		<view style="text-align: center;">
			<u-count-down :timestamp="timestamp" separator="colon" separator-size="28" 
			separator-color="#606266" border-color="#909399" bg-color="F1F1F1" font-size="80" :autoplay="false" ref="uCountDown" @end="endcount()()"></u-count-down>
			
			<u-button style="margin: 10upx;" size="default" :plain="true" type="primary" :ripple="true" shape="circle" @click="startcount()">
				Start
			</u-button>
			<u-button style="margin: 10upx;" size="default" :plain="true" type="warning" :ripple="true" shape="circle" @click="endcount()">
				End
			</u-button>
		</view>
		
		<!-- 弹窗显示专注模式下的数据 -->
		<template>
			<view>
				<u-popup v-model="show" mode="bottom" border-radius="14" width="500rpx" height="650px" :closeable="true">
					<view style="padding: 50upx; text-align: center;">
						<view><b>Work | Study</b></view>
						<u-divider margin-top="30" margin-bottom="30" bg-color="F1F1F1">Focus Mode Briefs</u-divider>
						<view>Length of focus：{{(timeremain/60).toFixed(2)}}min</view>
						<view>Break cycle：{{breakperoid}} h</view>
						<view>Break times：{{parseInt(focushours / breakperoid)}}</view>
						<view>Number of times you played phone：{{playtimes}}</view>
						<u-gap height="10" bg-color="#FFFFFF"></u-gap>
						<u-table>
							<u-tr class="u-tr">
								<u-th class="u-th">Sequence</u-th>
								<u-th class="u-th">Time</u-th>
							</u-tr>
							<u-tr v-for="(item, index) in playRecord" :key="item.index">
								<u-td class="u-td">{{item.index}}</u-td>
								<u-td class="u-td">{{item.time}}</u-td>
							</u-tr>
						</u-table>
						
						<!-- 可视化 -->
						<!-- 进度条 -->
						<u-divider margin-top="30" margin-bottom="30" bg-color="F1F1F1">Diagrams</u-divider>
						<view>Focused mode completion</view>
						<u-line-progress :percent="lineprecent" active-color="#0081ff" :show-percent="true" :striped="true" :striped-active="true" :height="40"></u-line-progress>
						
						<!-- 评价 -->
						<u-gap height="20" bg-color="#FFFFFF" ></u-gap>
						<view>Evaluation of this focus mode</view>
						<u-rate :count="evaluationscore.count" v-model="evaluationscore.value" :colors="evaluationscore.colors" :disabled="true" :gutter="50" :size="50"></u-rate>
						
						<!-- 建议 -->
						
						<u-divider margin-top="30" margin-bottom="30" bg-color="F1F1F1">Suggestions</u-divider>
						<view style="text-align: left;">
							<view v-if="autofinished == false">You have not completed your goal for this focus mode, so we recommend that you stick to your goal afterwards.</view>
							<u-gap height="10" bg-color="#FFFFFF"></u-gap>
							
							<view v-if="playtimes > 0">You have been playing with your phone a lot in this focus mode, so we suggest you focus more on your work.</view>
							<u-gap height="10" bg-color="#FFFFFF"></u-gap>
							
							<view v-if="focushours >= 4 && breakperoid >= 1">You have been working for a long time and have taken very few breaks, so it is advisable to combine work and rest.</view>
							<u-gap height="10" bg-color="#FFFFFF"></u-gap>
						</view>
						
					</view>
				</u-popup>
			</view>
		</template>X

	</view>
</template>

<script>
	import common_info from '@/common/common_info.js';
	import work from './work_data.js';
	
	var id = null
	
	export default {
			data() {
				return {
					switchB: false, //开关状态默认关
					focushours: 0.5, //专注时长
					breakperoid: 0.5, //休息周期
					timestamp: 0, //展示的时间戳
					timeremain: 0, //剩余时间
					isPlaying: false,
					playtimes: 0, //玩手机的次数
					percent: 0, //圆环的百分比，默认0
					show: false, //摘要小卡片默认不展示
					lineprecent: 15, //摘要中进度条的百分比
					watch: false, //是否处于监控手机方向模式
					alpha: 0, //手机z方向
					beta: 0, //手机x方向
					gamma: 0, //手机y方向
					appstatus: common_info.appstatus, //是否处于软件开启状态
					username: common_info.username,
					autofinished: false,
					evaluationscore:{ //五颗星星的评分
						count: 5, //一共几颗星
						value: 2, //评价是多少
						colors: ['#8A3335', '#D19A62', '#0081ff'], //三挡颜色值
					},
					playRecord:[],
				}
			},
			onLoad() {	
			},
			onBackPress() {
				this.watchStop();
			},
			methods: {
				// 切换switch的当前状态值
				SwitchB(e) {
					this.switchB = e.detail.value
				},
				// 第一个步进器的当前状态值
				boxchange(e){
					this.focushours = e.value;
				},
				// 开始计时
				startcount(){
					work.isWork = true;
					
					this.timestamp = this.focushours*3600;
					this.percent = 100;
					// 开始监听手机被动					
					// @TODO 判断期间动了几次手机，值更新在playtimes
					// this.getOrient();
					this.watchOrient();	
				},
				// 结束计时
				endcount(){
					work.isWork = false;
					this.timeremain = (this.focushours*3600 - this.$refs.uCountDown.seconds); //剩余时间
					this.show = true; //展示摘要小卡片
					this.timestamp = 0; //重置时间戳
					this.lineprecent = (this.timeremain/(this.focushours*3600))
					// this.percent = 0;
					// 结束监听手机被动
					this.watchStop();
					console.log("玩了"+this.playtimes+"次手机");
					console.log("剩余时间"+this.timeremain);
					console.log("目标百分比"+this.lineprecent);
				},
				// 获取当前手机的方向信息
				getOrient: function(){
					var that = this;
					if(id){
						return;
					}
					id = plus.orientation.getCurrentOrientation(function(o){
						if (!work.isPlay) work.start = new Date();
						if(that.alpha != parseInt(o.alpha) || that.beta != parseInt(o.beta) || that.gamma != parseInt(o.gamma)){
							that.alpha = parseInt(o.alpha);
							that.beta = parseInt(o.beta);
							that.gamma = parseInt(o.gamma);
							work.isPlay = true;
							
							console.log("手机在动");
							console.log(parseInt(o.alpha)); //parseInt取整保留整数位值
							console.log(parseInt(o.beta));
							console.log(parseInt(o.gamma));
							return true; //手机在动
						}
						else{
							if (work.isPlay) {
								work.end = new Date();
								work.isPlay = false;
								console.log(work.start.toLocaleTimeString());
								console.log(work.end.toLocaleTimeString());
								that.playtimes++;
								console.log("玩了"+that.playtimes+"次手机");
								
								that.playRecord.push({"index": that.playtimes,"time":work.start.toLocaleTimeString()});
								console.log(that.playRecord);
							}
							
							console.log("手机在静止");
							return false; //手机在静止状态
						}
					})
				},
				// 监听手机动的函数
				watchOrient: function () {
					let that = this;
					this.watch = true;
					
					let WatchTimer = setInterval(function(){
						// 判断处在监控状态
						if(that.watch == true){
							// 判断是否在软件内
							if(common_info.appstatus == false){
								that.getOrient();
								// console.log("在玩手机")
							}
							else{
								// console.log("在软件内")
							}
						}
						else{
							console.log("watch mission finished");
							clearInterval(WatchTimer);
						}
					},1000);
					
				},
				// 结束监听手机动的函数
				watchStop: function () {
					if(this.watch == true){
						this.watch = false; //关闭监控状态
					}
					else{
						console.log("no watch mission on");
					}
				}
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
</style>
