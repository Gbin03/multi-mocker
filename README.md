# multi-mocker

一款轻量级工具，旨在简化本地前端开发中三种接口的模拟工作：RESTful API、WebSocket、服务器发送事件（SSE）流式接口。并且可分别独立控制每种类型的 mock 是否开启。

## 工程支持说明

其中对于 WebSocket 和 SSE 流式接口是通过 vite 插件的形式实现的，所以目前只支持使用 vite 作为构建工具的前端工程。AJAX 请求接口是使用 mockjs 实现的，所以对前端工程没有构建工具的限制。

## 安装和启动

### 使用 pnpm 安装

```bash
$ pnpm install
```

### Demo 工程启动

```bash
$ pnpm run demo
```

可参照 Demo 工程来配置和使用 multi-mocker

### 注意事项

- demo 工程中有一个存放 mock 数据的文件夹 mock，这个文件夹下是用户自己创建的 mock 数据，可以根据自己的 mock 需求自行修改从而作为相应 mock 接口的响应数据。

- 每种类型的 mock 数据在都需要提供一个统一的入口文件，以 mock ajax.js 是 AJAX 接口类型 mock 数据的入口文件，sse-server.cjs 是 SSE 接口类型 mock 数据的入口文件，ws-server.cjs 是 WebSocket 接口类型 mock 数据的入口文件。SSE 和 WebSocket 两种类型接口的入口文件其实分别是两个 node 脚本入口，分别用于模拟 SSE 和 WebSocket 的服务器，接收并返回 mock 响应。node 脚本文件后缀名（包括间接引用的子脚本）都需要 cjs 结尾，否则会报错。
