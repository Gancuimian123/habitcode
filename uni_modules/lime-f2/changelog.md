## 0.4.0（2021-04-08）
- update: antv F2 version 更新到 `3.8.6`
- add: `f2-all`,`f2-simple`等文件，默认只提供`f2.min.js`,如果需要`f2-all`或`f2-simple`可去码云下载按自已需要引入！
- fix: 修复钉钉小程序measureText undefined的问题
- fix: 修复小程序因`hammer`引用报错
## 0.3.0（2021-04-06）
- 增加 `redraw(callback)` 方法重绘
- 增加 `clear()` 方法清空图表
- 增加 `changeData(data)` 方法更新图表，需要传数据
- 增加 `repaint()` 方法更新图表：`source` 数据源 更新后，在需要的时候调用
- 增加 `source` 数据源 和 `is-auto-play` 开启自动更新，配置这两个参数只要 `source` 数据源更新，就会更新图表
## 0.2.2（2021-04-05）
- 修复微信小程序缺少`Transform`报错问题
## 0.2.1（2021-04-04）
- 考虑到不是所有人需要`nvue`，所以`webview`改为网络路径
- 当然你也可以把html下载放置到项目根目录的`hybrid`文件夹下
## 0.2.0（2021-04-04）
- 基于 `webview` 实现兼容 `nvue`
## 0.1.0（2021-04-02）
- 第一次上传，基本全端兼容，使用方法与官网一致。
