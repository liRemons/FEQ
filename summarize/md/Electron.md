#### 主进程和渲染进程

在桌面端应用中，进程分为主进程和渲染进程。

以 electron + vue 为例：

- 采用发布订阅模式，主进程通过 `ipcMain.on` 接收渲染进程发送的事件, 通过 `mainWindow.webContents.send` 发送事件
- vue入口文件中通过 `ipcRenderer.send `发送该事件 ，`ipcRenderer.on`接收事件

#### `localStorage,sessionStroge ` 存储如何实现？

目前还没找到好的解决办法，下面几种解决方式

- 采用状态管理系统，类似于 vuex、redux
- 第三方库 `electron-localStorage`
- 重写方法，以读写文件的形式存储信息，主进程和渲染进程交互，将存储信息以 `json`文件形式保存本地，曲线救国的方式（推荐）

#### 首次安装或打包失败？

说实话electron这个问题困扰了很久（主要是懒）
在公司里也有项目，也已经配好了运行及打包环境，
但是在自己的电脑上因为网络的原因，没能够运行起来。
下面记录一下我踩过的坑

1. 关于electron首次运行及打包时需下载文件，但由于没法科学上网的原因，导致经常下载失败，还好有万能的淘宝
2. 下面隆重介绍

项目根目录下新建`.npmrc`文件 分别配置运行时下载的electron包和打包时所需的包，使用淘宝源下载（亲测有效）
`ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ `

`ELECTRON_BUILDER_BINARIES_MIRROR=http://npm.taobao.org/mirrors/electron-builder-binaries/`

如果您想自定义electron 的安装位置
项目根目录新建`install.nsh`文件：

```nsis
!macro preInit
      SetRegView 64
      WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\szlims_winapp"
      WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\szlims_winapp"
      SetRegView 32
      WriteRegExpandStr HKLM "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\szlims_winapp"
      WriteRegExpandStr HKCU "${INSTALL_REGISTRY_KEY}" InstallLocation "C:\Users\Administrator\AppData\szlims_winapp"
!macroend
```

package.json 增加 `nsis:{"include": "./install.nsh"}`

如果项目里引入了dll文件
package.json `build:{ "extraResources": { "from": "要打包的路径", "to": "打包到哪里" },}`

#### 如何设置开发者调试工具？

`mainWindow.webContents.openDevTools();`

#### 如何监听文件下载进度？

也是采用发布订阅模式

```javascript
mainWindow.webContents.session.on(
    "will-download",
    (event, item, webContents) => {
      // 去除这里可以自定义保存位置
      // const filePath = path.join(app.getPath("downloads"), item.getFilename());
      // item.setSavePath(filePath);

      item.on("updated", (event, state) => {
        // 计算当前下载的进度
        num = ((item.getReceivedBytes() / item.getTotalBytes()) * 100).toFixed(
          2
        );
        if (state === "progressing") {
          mainWindow.webContents.send("getScheduleEvent", [
            num,
            item.getSavePath(),
          ]);
          if (item.isPaused()) {
          } else {
            
          }
        } else if (state === "interrupted") {
          console.log("终止下载");
        }
      });
      item.on("done", (event, state) => {
        if (state === "completed") {
          mainWindow.webContents.send("getScheduleEvent", [
            "下载成功",
              // 发送当前保存的位置
            item.getSavePath(),
          ]);
        } else if (state === "cancelled") {
          mainWindow.webContents.send("getScheduleEvent", [
            "取消下载",
            item.getSavePath(),
          ]);
        } else {
          //...
        }
      });
    }
  );
```

#### 结语：

目前还是刚入门electron的小白，在这里推荐几个地址：

[苏南大叔博客](https://newsn.net/)

[Electron官方文档](http://www.electronjs.org/)

[个人网站持续更新](http://remons.gitee.io/)