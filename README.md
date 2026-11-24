# Native Shell Studio

一个使用 [Longbridge Native Shell](https://github.com/longbridge/nsh) v0.6.1 的跨平台原生 UI 实验工作台，使用 TSX / Signals / nsh/base，而不是 React 或 WebView 桌面外壳。

## 功能

- Overview：实时平台、尺寸、缩放和外观信息
- Components：15 项预览（Button、Input、Textarea、Checkbox、Switch、Slider、Select、Tabs、Progress、Badge、Dialog、Alert、Panel、Separator、虚拟 List），搜索、属性检查器和源码复制
- Themes：5 套配色，系统/浅色/深色，保存配置、复制主题 JSON
- Motion：原生过渡、Switch、Tabs，减少动态效果支持
- Native APIs：剪贴板、存储、窗口、菜单，能力检测
- Tasks：本地任务新增、编辑、完成、筛选、搜索、优先级、删除确认与持久化
- Settings：导航和 Inspector 布局

## 开发

从 [v0.6.1 Release](https://github.com/longbridge/nsh/releases/tag/v0.6.1) 安装相应 CLI；参见 [安装文档](https://nsh.dev/docs/installation)。

```sh
nsh --version
nsh check
nsh test
nsh build
nsh run
nsh run --target web
```

桌面打包需要对应操作系统。Windows 10 1809+、macOS 14+、Linux GTK 4.14+（预构建运行时还需要 glibc 2.39+）。

```sh
nsh package --target windows
nsh package --target macos
nsh package --target web -o dist
```

GitHub Pages 目标地址：https://weepwood.github.io/nsh-demo/ 。需仓库 Settings → Pages → Source 设为 GitHub Actions；首次部署以 Actions 状态为准。

CI 构建、测试与发行见 .github/workflows。main 推送触发版本检查：仅在类型检查、构建、测试与 Windows/macOS 安装包均成功后发布当前版本，已发布版本不会被覆盖。Windows 提供 Inno Setup EXE 与便携 ZIP；macOS Apple Silicon 提供 DMG 与 APP ZIP。未公证的 macOS 包可能被 Gatekeeper 阻止，Windows 安装包未签名。原生实际视觉与性能以真机测试为准。

## 结构

App.tsx → src/app/Shell.tsx → src/features → src/ui；独立 stores、theme 和 tasks/store。使用官方 API 的基础能力，非所有组件都是框架直接提供的。

## 规划

v0.1：基础工程、15 个演示、任务示例、主题、CI。后续：自定义标题栏、Spring / Shader、更多高级组件、文件/通知/托盘、主题导入、Rust 扩展、正式签名、公证和安装器。

## License

Apache-2.0. 框架版权归 Longbridge 和相应贡献者。

