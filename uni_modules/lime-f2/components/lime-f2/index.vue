<template>
	<view class="l-f2" :style="customStyle">
		<!-- #ifndef APP-NVUE -->
		<canvas class="l-f2__canvas" v-if="use2dCanvas" type="2d" :ref="canvasId" :id="canvasId" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" />
		<canvas
			class="l-f2__canvas"
			v-else
			:ref="canvasId"
			:width="width"
			:height="height"
			:canvas-id="canvasId"
			:id="canvasId"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		/>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<web-view
			class="l-f2__canvas"
			:id="canvasId"
			ref="webview"
			src="http://liangei.gitee.io/limeui/hybrid/html/lime-ui/lime-f2/index.html"
			@pagefinish="onFinish"
			@onPostMessage="onSuccess"
		></web-view>
		<!-- #endif -->
	</view>
</template>
<script>
// #ifndef APP-NVUE
import extendContext from './canvas';
import { compareVersion, wrapEvent, pixelRatio } from './utils';
// #endif
export default {
	// version: '0.2.3'
	name: 'l-f2',
	props: {
		// #ifdef MP-WEIXIN
		type: {
			type: String,
			default: '2d'
		},
		// #endif
		// #ifdef APP-NVUE
		params: {
			type: Object,
			default: () => {}
		},
		// #endif
		customStyle: String,
		source: {
			type: Array,
			default: () => []
		},
		isAutoPlay: Boolean
	},
	data() {
		return {
			// #ifndef MP-WEIXIN || MP-QQ
			canvasId: `l-f2${this._uid}`,
			// #endif
			// #ifdef MP-WEIXIN || MP-QQ
			canvasId: `l-f2`,
			// #endif
			// #ifdef MP-WEIXIN
			use2dCanvas: true,
			// #endif
			// #ifndef MP-WEIXIN
			use2dCanvas: false,
			// #endif
			// #ifndef APP-NVUE
			width: null,
			height: null,
			config: {},
			// #endif
			// #ifdef APP-NVUE
			isDone: false
			// #endif
		};
	},
	watch: {
		isAutoPlay(val) {
			if (val) {
				this.changeData(this.source);
			}
		},
		source: {
			handler: function(data) {
				if (this.isAutoPlay) {
					this.changeData(data);
				}
			},
			deep: true
		}
	},
	// #ifdef MP-WEIXIN
	created() {
		const { SDKVersion, version, platform, environment } = wx.getSystemInfoSync();
		this.use2dCanvas = this.type === '2d' && compareVersion(SDKVersion, '2.9.2') >= 0 && !((/ios/i.test(platform) && /7.0.20/.test(version)) || /wxwork/i.test(environment));
	},
	// #endif
	methods: {
		// #ifdef APP-NVUE
		onFinish() {
			this.isDone = true;
		},
		// #endif
		async init(func, params = null) {
			// #ifdef APP-NVUE
			this.$watch(
				'isDone',
				(n, o) => {
					(n || o) && this.$refs.webview.evalJs(`init(${func.toString()}, ${JSON.stringify(params || this.params)})`);
				},
				{
					immediate: true
				}
			);
			// #endif
			// #ifndef APP-NVUE
			const config = await this.getContext();
			const chart = func(config);
			if (chart) {
				this.chart = chart;
				this.canvasEl = chart.get('el');
			}
			// #endif
		},
		changeData(data) {
			// #ifndef APP-NVUE
			if (this.chart) {
				this.chart.changeData(data || this.source);
			}
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`changeData(${JSON.stringify(data || this.source)})`);
			// #endif
		},
		clear() {
			// #ifndef APP-NVUE
			if (this.chart) {
				this.chart.clear();
			}
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`clear()`);
			// #endif
		},
		repaint() {
			this.changeData(this.source);
		},
		redraw(func, params = null) {
			// #ifndef APP-NVUE
			func(this.chart);
			// #endif
			// #ifdef APP-NVUE
			this.$refs.webview.evalJs(`redraw(${func.toString()}, ${JSON.stringify(params || this.params)})`);
			// #endif
		},
		// #ifndef APP-NVUE
		getContext() {
			const { use2dCanvas, type = '2d', config } = this;
			if (config.context) {
				return Promise.resolve(config);
			}
			if (use2dCanvas) {
				return new Promise(resolve => {
					uni.createSelectorQuery()
						.in(this)
						.select(`#${this.canvasId}`)
						.fields({
							node: true,
							size: true
						})
						.exec(res => {
							const { node, width, height } = res[0];
							const context = node.getContext(type);
							const uniContext = extendContext(context);
							node.width = width * pixelRatio;
							node.height = height * pixelRatio;
							this.config = {context: uniContext, width, height, pixelRatio };
							resolve(this.config);
						});
				});
			}
			return new Promise(resolve => {
				uni.createSelectorQuery()
					.in(this)
					.select(`#${this.canvasId}`)
					.boundingClientRect()
					.exec(res => {
						if (res) {
							const { width, height } = res[0];
							const context = uni.createCanvasContext(this.canvasId, this);
							const uniContext = extendContext(context);
							this.width = width * pixelRatio;
							this.height = height * pixelRatio;
							this.config = {context: uniContext, width, height, pixelRatio };
							resolve(this.config);
						}
					});
			});
		},
		touchStart(e) {
			const canvasEl = this.canvasEl;
			if (!canvasEl) return;
			canvasEl.dispatchEvent('touchstart', wrapEvent(e));
			// if (this.canvasEl) {
			// 	this.canvasEl.dispatchEvent('touchstart', wrapEvent(e));
			// }
		},
		touchMove(e) {
			const canvasEl = this.canvasEl;
			if (!canvasEl) return;
			canvasEl.dispatchEvent('touchmove', wrapEvent(e));
			// if (this.canvasEl) {
			// 	this.canvasEl.dispatchEvent('touchmove', wrapEvent(e));
			// }
		},
		touchEnd(e) {
			const canvasEl = this.canvasEl;
			if (!canvasEl) return;
			canvasEl.dispatchEvent('touchend', wrapEvent(e));
			// if (this.canvasEl) {
			// 	this.canvasEl.dispatchEvent('touchend', wrapEvent(e));
			// }
		},
		press(e) {
			const canvasEl = this.canvasEl;
			if (!canvasEl) return;
			canvasEl.dispatchEvent('press', wrapEvent(e));
		}
		// #endif
	}
};
</script>
<style scoped lang="stylus">
full()
	// #ifndef APP-NVUE
	width 100%
	height 100%
	// #endif
	// #ifdef APP-NVUE
	flex 1
	// #endif
.l-f2
	full()
	position relative
	&__canvas
		full()
</style>
