<template>
	<view>
		<cu-custom bgColor="bg-orange" :isBack="true">
			<!-- <block slot="content">WORK</block> -->
			<!-- <block slot='right'></block> -->
		</cu-custom>
		<!-- 卡片 -->
		<view class=" col-3 padding-sm bg-orange bg-color-card justify-center">
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
						<image src="https://filepr-1259018500.cos.ap-beijing.myqcloud.com/luhao/img/sport.png"
						 mode="widthFix"></image>
						<view class="cu-bar bg-shadeBottom"> <text class="text-cut">SPORT | TRAINING</text></view>
					</view>
				</view>
			</view>
			<!-- 环形图 -->
			
			<view class="flex flex-wrap">
				<view class="flex-sub">
					<canvas canvas-id="canvasArcbar1" id="canvasArcbar1" class="charts3"></canvas>
				</view>	         
				<view class="flex-sub" >
					<view style="margin-top: 10upx;">
						<text><b>Hours to walk:</b></text>
						<u-number-box v-model="numberbox" :step="0.5" :input-width="190" :positive-integer='false' :min="0.5"></u-number-box>
					</view>
					
					<view style="margin-top: 150upx;">
						<text><b>Remind Break：</b></text>
						<switch class='cyan' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false" color="#F7F7F7"></switch>
					</view>
				</view>	
			</view> -->

			<!-- <view class="uni-padding-wrap uni-common-mt">
				<view class="uni-btn-v">
					<button type="primary" @tap="getOrient">获取设备的方向信息</button>
					<button type="primary" @tap="watchOrient">监听设备的方向变化</button>
					<button type="primary" @tap="watchStop">停止监听</button>
				</view>
				<view class="uni-textarea">
					<textarea :value="value" />
				</view>
			</view> -->
		</view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import info from '@/common/common_info.js'; 
	var _self;
	var canvaArcbar1;
	var canvaColumn=null;
	var id = null
	
	export default {
			data() {
				return {
					cWidth3:'',//圆弧进度图
					cHeight3:'',//圆弧进度图
					arcbarWidth:'',//圆弧进度图，进度条宽度,此设置可使各端宽度一致
					pixelRatio:1,
					switchB: false,
					numberbox: 0.5,
					chartData:{
						series: [{
							name: '   Take a Break',
							data: 0.25,
							color: '#ff3500'
						}]
					},
					title: 'orientation',
					value: '',
					cWidth:'',
					cHeight:'',
					pixelRatio:1,
					serverData:'',
					username: info.username
				}
			},
			onLoad() {
				_self = this;
				this.cWidth3=uni.upx2px(300);//这里要与样式的宽高对应
				this.cHeight3=uni.upx2px(300);//这里要与样式的宽高对应
				this.arcbarWidth=uni.upx2px(24);
				// this.getServerData();
				_self.showArcbar("canvasArcbar1",_self.chartData);
				
				this.cWidth=uni.upx2px(750);
				this.cHeight=uni.upx2px(500);
				this.getServerData();

			},
			onUnload() {
				this.watchStop();
			},
			methods: {
				showArcbar(canvasId,chartData){
					canvaArcbar1=new uCharts({
						$this:this,
						canvasId: canvasId,
						type: 'arcbar',
						fontSize:11,
						legend:{show:false},
						background:'#FFFFFF',
						pixelRatio:1,
						series: chartData.series,
						animation: true,
						width: this.cWidth3,
						height: this.cHeight3,
						dataLabel: true,
						title: {
							name: Math.round(chartData.series[0].data*100)+'%',//这里我自动计算了，您可以直接给任意字符串
							color: '#FFFFFF',
							fontSize: 25
						},
						subtitle: {
							name: chartData.series[0].name,//这里您可以直接给任意字符串
							color: '#FFFFFF',
							fontSize: 15
						},
						extra: {
							arcbar:{
								type:'circle',//整圆类型进度条图
								width: _self.arcbarWidth*_self.pixelRatio,//圆弧的宽度
								startAngle:-0.5//整圆类型只需配置起始角度即可
							}
						}
					});
					
				},
				SwitchB(e) {
					this.switchB = e.detail.value
				},
				getOrient: function () {
					var that = this;
					plus.orientation.getCurrentOrientation(function (o) {
						that.value = "alpha：" + o.alpha + "\nbeta：" + o.beta + "\ngamma：" + o.gamma;
					}, function (e) {
						console.log("获取失败:" + e.message);
					});
				},
				watchOrient: function () {
					var that = this;
					if (id) {
						return;
					}
					id = plus.orientation.watchOrientation(function (o) {
						that.value = "监听设备方向变化信息\n" + "alpha：" + o.alpha + "\nbeta：" + o.beta + "\ngamma：" + o.gamma;
					}, function (e) {
						plus.orientation.clearWatch(id);
						id = null;
						console.log("监听失败:" + e.message);
					});
				},
				watchStop: function () {
					if (id) {
						plus.orientation.clearWatch(id);
						id = null;
					} else {
						console.log("没有监听设备方向变化");
					}
				},
				getServerData(){
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
						_self.serverData=res.data.data;
						let Column={categories:[],series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Column.categories=res.data.data.Column.categories;
						Column.series=res.data.data.Column.series;
						_self.showColumn("canvasColumn",Column);
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				});
			},
				showColumn(canvasId,chartData){
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
								type:'group',
								width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
							}
						  }
					});
					
				},
				getServerData(){
					uni.request({
						url: 'https://www.ucharts.cn/data.json',
						data:{
						},
						success: function(res) {
							console.log(res.data.data)
							//下面这个根据需要保存后台数据，我是为了模拟更新柱状图，所以存下来了
							_self.serverData=res.data.data;
							let Column={categories:[],series:[]};
							//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
							Column.categories=res.data.data.Column.categories;
							Column.series=res.data.data.Column.series;
							_self.showColumn("canvasColumn",Column);
						},
						fail: () => {
							_self.tips="网络错误，小程序端请检查合法域名";
						},
					});
				},
				showColumn(canvasId,chartData){
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
								type:'group',
								width: _self.cWidth*_self.pixelRatio*0.45/chartData.categories.length
							}
						  }
					});
				},
				touchColumn(e){
					canvaColumn.showToolTip(e, {
						format: function (item, category) {
							if(typeof item.data === 'object'){
								return category + ' ' + item.name + ':' + item.data.value 
							}else{
								return category + ' ' + item.name + ':' + item.data 
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
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts3 {
		border: solid 1px #FFFFFF;
		width: 710upx;
		height: 300upx;
		position: relative;
	}

	.charts3 {
		position: absolute;
		margin-left: 30upx;
		width: 300upx;
		height: 300upx;

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
	.qiun-charts{width: 100%; height:500upx;background-color: #FFFFFF; margin-top: 10upx;}
	.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
</style>
