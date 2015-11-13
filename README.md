# think-debug-toolbar

为使用 [ThinkJS 2.0](https://thinkjs.org) 开发的项目增加一个调试工具条，可以在开发环境下快速查看以下信息：

* HTTP 请求；
* HTTP 响应；
* ThinkJS Session；
* ThinkJS View 变量；
* 模板文件信息；
* ThinkJS 配置；
* ThinkJS 环境变量；

本插件在 [devoidfury/express-debug](https://github.com/devoidfury/express-debug) 基础上开发，为 ThinkJS 做了大量调整，仅适用于 ThinkJS 2.0。

这里有两张截图：[截图一](http://i.imgur.com/kHKUFMf.png)、[截图二](http://i.imgur.com/kV5OC1S.png)。

## 安装

```sh
npm install think-debug-toolbar --save
```

## 使用

### 注册 middleware

打开这个文件：`src/common/bootstrap/middleware.js`（如果不存在则新建），写入以下代码：

```js
'use strict';

import debugToolbar from 'think-debug-toolbar';

let conf = {
	panels: ['request', 'session', 'view', 'template', 'response', 'config', 'info'],
	depth: 4,
	extra_attrs: '',
	disabled: false,
	sort: false
};

think.middleware('debug_toolbar', debugToolbar(conf));
```

以上代码中的 `conf` 为默认配置，具体含义如下：

* `panels` - 通过这个配置可以只启用部分面板或者调整面板顺序；
* `depth` - 设置显示信息的最大层级；
* `extra_attrs` - 给显示在页面上的悬浮按钮增加额外属性；
* `disabled` - 临时禁用调试工具条；
* `sort` - 显示信息前是否需要基于 key 做排序；

### 配置 hook

打开这个文件：`src/common/config/hook.js`（如果不存在则新建），写入以下代码：

```js
'use strict';

export default {
	view_filter : ['append', 'debug_toolbar'],
}
```

如果你的 `hook.js` 有其他配置，请自行调整，不要直接覆盖。

如果一切正常，刷新页面后，应该会出现一个浮层按钮，点击按钮就可以查看丰富的调试信息了。

### 注意事项

本工具只会在开发环境启用（通过判断 `think.env` 是否等于 `development` 来决定是否启用）。需要注意的是：**一定不要在线上启用开发模式**。

## LICENSE

MIT

