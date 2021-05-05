import {
	pixelRatio
} from './utils';

const UNI_CANVAS_CONTEXT_MAP = {
	// #ifndef MP-WEIXIN
	fillStyle: 'FillStyle',
	fontSize: 'FontSize',
	globalAlpha: 'GlobalAlpha',
	opacity: 'GlobalAlpha',
	lineCap: 'LineCap',
	lineJoin: 'LineJoin',
	lineWidth: 'LineWidth',
	miterLimit: 'MiterLimit',
	strokeStyle: 'StrokeStyle',
	textAlign: 'TextAlign',
	textBaseline: 'TextBaseline',
	shadow: 'Shadow',
	// #endif
	// #ifdef MP-TOUTIAO || H5
	font: 'FontSize',
	// #endif
};

function strLen(str) {
	let len = 0;
	for (let i = 0; i < str.length; i++) {
		if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
			len++;
		} else {
			len += 2;
		}
	}
	return len;
}

// 头条小程序目前仅支持 setFontSize
// f2 会将所有属性整合为 font 简写，从中提取 fontSize 支持
const fontSizeReg = /(\d*)px/;
export default (ctx) => {
	// #ifdef H5 || APP-PLUS
	ctx.uniTransform = ctx.transform
	ctx.transform = (...agrs) => {
		if (ctx.draw && agrs[6]) {
			agrs[4] *= pixelRatio
			agrs[5] *= pixelRatio
		}
		ctx.uniTransform(...agrs)
	}
	// #endif

	// 钉钉钉钉小程序框架不支持 measureText 方法，用此方法 mock
	if (!ctx.measureText) {
		ctx.measureText = text => {
			let fontSize = 12;
			const font = ctx.__font;
			if (font) {
				fontSize = parseInt(font.split(' ')[3], 10);
			}
			fontSize /= 2;
			return {
				width: strLen(text) * fontSize
			};
		}
	}
	Object.keys(UNI_CANVAS_CONTEXT_MAP).forEach(key => {
		Object.defineProperty(ctx, key, {
			set(val) {
				const name = `set${UNI_CANVAS_CONTEXT_MAP[key]}`;
				if (!ctx[name]) {
					return;
				}
				if (key === 'font' && fontSizeReg.test(val)) {
					const match = fontSizeReg.exec(val);
					ctx[name](match[1]);
					return;
				}
				if (key === 'shadow' && Array.isArray(val)) {
					ctx[name](...val);
					return;
				}
				ctx[name](val);
			}
		});
	});
	return ctx
}
