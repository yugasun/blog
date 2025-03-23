---
title: 初探 MCP：给大模型插上 USB-C 接口？
desc: 初探 MCP：给大模型插上 USB-C 接口？
reward: true
date: 2025-03-23 14:15:46
summary: '最近发现身边的 AI 开发者们都在聊一个叫 MCP 的新协议，有人说它是「AI 时代的 USB-C」，有人甚至用它做出了能自动写代码的 IDE！作为技术圈的吃瓜群众，我决定扒一扒这个神奇的 MCP，看看它到底是如何让 AI 模型和各种数据源、工具无缝联动的。'
tags:
  - MCP
  - MCP Server
  - LLM
  - AIGC
---

## 一、为什么写这篇博客？

最近发现身边的 AI 开发者们都在聊一个叫 MCP 的新协议，有人说它是「AI 时代的 USB-C」，有人甚至用它做出了能自动写代码的 IDE！作为技术圈的吃瓜群众，我决定扒一扒这个神奇的 MCP，看看它到底是如何让 AI 模型和各种数据源、工具无缝联动的。

## 二、MCP 到底是什么？

简单来说，**MCP（Model Context Protocol）是 AI 模型与外部世界沟通的「通用插座」**。想象一下，你有一个智能助手，它不仅能回答问题，还能直接调用你的 GitHub 创建仓库、用搜索引擎查资料、**自动基于设计文稿生成前端页面**，甚至根据你的代码库生成符合项目风格的代码——这背后的功臣就是 MCP。

**它解决了什么问题？**  
过去，让 AI 模型连接不同数据源需要为每个平台写定制代码（比如用 Python 调 GitHub API，用 JavaScript 连数据库），不仅效率低，还容易出 bug。MCP 就像一个翻译官，用标准化的方式让 AI 模型能统一对接各种工具和数据，开发者再也不用为「方言」头疼了。

## 三、MCP 的核心魅力：三大「乐高积木」架构

MCP 的设计灵感来自客户端 - 服务器模式，但更轻量灵活：

1.  **MCP 主机**：你的 AI 工具（比如 Claude 桌面端、Cursor 编辑器）。
1.  **MCP 客户端**：负责和服务器建立一对一的连接。
1.  **MCP 服务器**：像一个个「功能插件」，比如能连 GitHub 的服务器、能搜索网页的服务器。

MCP 采用三层架构实现智能协作，就像指挥家（AI 主机）、乐手（工具服务器）和乐谱（上下文协议）的完美配合：

![MCP Flow](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1240b47a5ecb43b19f8be91abca405b8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgeXVnYXN1bg==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzM1MDk2NzE3MDYzNDI1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1742796683&x-orig-sign=tiOqWbxNZ2peqxb%2BuN5Thpp7mTs%3D)

MCP Flow

举个栗子 🌰：当你让 AI 整理 GitHub 仓库时：

1.  大脑（AI 主机）收到 "整理 Issue" 的指令
1.  神经系统（上下文协议）扫描可用工具
1.  GitHub 工具服务器（乐手）被选中执行操作
1.  工具从 GitHub API（数据源）获取 Issue 数据
1.  结果通过神经反馈回大脑，生成自然语言回答

## 四、MCP Server 原理

MCP Server 是 MCP 的核心，也是整个系统运转的核心模块，所有与外界或者第三方服务交互都是通过它注册的工具来完成的，比如一下代码：

```
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export class FigmaMcpServer {
  private readonly server: McpServer;
  private readonly figmaService: FigmaService;
  private sseTransport: SSEServerTransport | null = null;

  constructor(figmaApiKey: string) {
    this.figmaService = new FigmaService(figmaApiKey);
    
    // 1. 初始化 MCP 服务
    this.server = new McpServer(
      {
        name: "Figma MCP Server",
        version: "0.1.12",
      },
      {
        capabilities: {
          logging: {},
          tools: {},
        },
      },
    );

    this.registerTools();
  }

  // 2. 注册工具
  private registerTools(): void {
    // 工具1：获取 Figma 文件数据信息
    this.server.tool(
      "get_figma_data",
      "When the nodeId cannot be obtained, obtain the layout information about the entire Figma file",
      {
       // 工具参数定义
      },
      async ({ fileKey, nodeId, depth }) => {
        // 获取 Figma 数据...
      },
    );
    // 工具2：下载 Figma 图片
    this.server.tool(
      "download_figma_images",
      "Download SVG and PNG images used in a Figma file based on the IDs of image or icon nodes",
      {
        // 工具参数定义
      },
      async ({ fileKey, nodes, localPath }) => {
        // 存储图片逻辑...
      },
    );
  }

  async connect(transport: Transport): Promise<void> {
    await this.server.connect(transport);
  }

  // 3. 定义通信接口，并启动服务
  async startHttpServer(port: number): Promise<void> {
    const app = express();

    app.get("/sse", async (req: Request, res: Response) => {
      // 建立通信链接
    });

    app.post("/messages", async (req: Request, res: Response) => {
      // 获取主机推送消息，进行相关逻辑处理
    });


    // 启动服务
    app.listen(port);
  }
}
```

以上代码主要有三个核心步骤：

1.  初始化 MCP 服务: 用来定义该 MCP 的一些描述信息，比如名称、版本等。
1.  注册工具：核心步骤，用来定义该 MCP Server 注册哪些工具能力，这里定义了两个：获取 Figma 文件数据信息 和 下载 Figma 图片。
1.  定义通信接口，并启动服务：比如 /sse 接口。

了解了 MCP 的基本原理，接下来我们来上手实验一下。

## 五、5 分钟上手 MCP：以 Cursor 为例

**Step 1：安装 Cursor IDE **

打开您的网络浏览器，访问 Cursor 的官方网站：https://www.cursor.com/cn 下载适合自己系统的安装包，像装普通软件一样搞定它。

**Step 2：本地运行 Figma-MCP **

- 申请 Figma 的个人访问令牌（用于获取 Figma 设计文件）。
- 启动 Figma-MCP Server 服务

```
# 1. 克隆代码
git clone https://github.com/GLips/Figma-Context-MCP

# 2. 配置 Figma Personal access tokens
cp .env.example .env

# 3. 安装依赖并启动服务
pnpm install && pnpm run dev
```

启动后控制台会显示如下：

![Run Figma MCP Server](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/effbe589ab1f45d6bcf9fc138c09b583~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgeXVnYXN1bg==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzM1MDk2NzE3MDYzNDI1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1742796683&x-orig-sign=Nf%2BS0bYh%2F8HMSfrXHiai9HsafHY%3D)

Run Figma MCP Server

**Step 3：配置 MCP 服务器**

打开 Cursor 编辑器，在项目根目录下，创建文件夹 `.cursor`，并同时创建一个配置文件（比如 `mcp.config.json`），告诉 Cursor 去哪里找这些服务器。例如：

```
{
  "mcpServers": {
    "server-name": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

**Step 4：验证工具**  
在 Cursor 里输入指令，直接在 Cursor 的对话框里面粘贴，任意一个 Figma 的设计链接，如下图所示：

![Cursor Call Figma MCP Tools](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/1dae0ad13b1c4ae09b014c9dba146aff~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgeXVnYXN1bg==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzM1MDk2NzE3MDYzNDI1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1742796683&x-orig-sign=xUME9l6eZ6Td2%2B2OOGVaDZnnCdM%3D)

Cursor Call Figma MCP Tools

> “
>
> 如果没有的话，可以用这个免费模板复制到自己的账号中 https://www.figma.com/community/plugin/1341170884167742321/figma-templates-free，创建到自己 Figma 中后，然后复制该设计链接。

然后点击 `Run tool` 按钮，Cursor 编辑器便会自动帮你获取改设计稿的所有图片，并自动基于改设计稿内容生成前端页面，当然现在生成的样式跟实际还是有很多差距的，需要前端研发进行优化处理。

![Cursor auto get design images](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/07bd2000c52845348e67fde0ef289409~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgeXVnYXN1bg==:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMzM1MDk2NzE3MDYzNDI1MyJ9&rk3s=e9ecf3d6&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1742796683&x-orig-sign=RAKGtQ40XZ3TmOsY5yPc7Z4ZZ4E%3D)

Cursor auto get design images

## 六、MCP 的进阶魔法：上下文管理

MCP 不仅能传数据，还能传递「上下文」。比如在 Cursor 编辑器中：

- **代码感知**：当你输入 `response.`，MCP 会根据项目的 FastAPI 框架自动补全 `status_code`。
- **项目结构理解**：它能扫描你的 `package.json` 和 Git 历史，生成符合现有架构的代码。
- **动态更新**：你保存文件或安装新依赖时，MCP 会自动更新上下文，保持 AI 始终「在线」。

## 七、为什么大厂都在拥抱 MCP？

对比传统 API，MCP 有三大「超能力」：

1.  **模块化部署**：不同语言写的模块（比如 Python 数据处理 + C++ 模型推理）可以无缝协作。
1.  **零耦合扩展**：更换 AI 模型或数据源时，只需改配置文件，不用重写代码。
1.  **双向通信**：支持事件通知和流式交互，就像扩展坞既能传数据又能供电。比如 AI 可以订阅股票变动通知，而无需轮询 API。

## 八、MCP 与 Function Calling 的区别：从「功能调用」到「智能代理」

| 维度         | Function Calling               | MCP                          |
| ------------ | ------------------------------ | ---------------------------- |
| **协议性质** | 模型私有接口（如 OpenAI 规范） | 开放标准协议（JSON-RPC 2.0） |
| **扩展性**   | 需预定义函数                   | 动态发现新工具               |
| **交互模式** | 同步请求-响应                  | 支持异步事件通知             |
| **开发成本** | 重复适配多模型接口             | 一次开发兼容所有 MCP 主机    |
| **适用场景** | 简单任务原型开发               | 企业级复杂系统集成           |

Function Calling 更像是 AI 的「快捷键」，而 MCP 正在构建 AI 的「操作系统」。随着 MCP 生态的完善，未来的 AI 助手将像智能手机一样：

- **应用商店化**：用户可自由安装天气、代码管理等 MCP 工具
- **跨平台兼容**：一个工具服务器能同时服务多个模型
- **自主进化**：AI 能根据任务需求主动发现新工具，就像手机自动识别新外设 现在，当你在思考如何让 AI 调用外部工具时，或许该问自己：是想给它配个「专用充电线」，还是装个「万能扩展坞」？🔌✨

## 九、未来已来：MCP 的 N 种玩法

- **AI 驱动 IDE**：Cursor 编辑器用 MCP 实现了「全项目感知」代码生成。
- **智能客服**：语音识别、NLP 模块解耦，响应速度提升 50%。
- **电商推荐**：动态切换推荐算法，无需修改前端代码。

## 十、总结：MCP 让 AI 真正「活」起来

从写博客的过程中，我深刻感受到 MCP 正在重塑 AI 开发的方式——它不仅是一个协议，更是一种思维：**让 AI 模型像人类一样，主动理解环境、调用工具，而不是被动等待指令**。

如果你也想让自己的 AI 项目「开挂」，不妨从搭建第一个 MCP 服务器开始。说不定下一个用 AI 自动写代码的人，就是你！

**最后**：想试试快速尝试 MCP？可以去 [MCP 官方文档](https://mcp-docs.cn) 下载示例代码，5 分钟就能让你的 AI 工具「学会」新技能！ 🚀

## 参考资源

- [官方 MCP 介绍](https://modelcontextprotocol.io/introduction)
- [Cursor MCP](https://docs.cursor.com/context/model-context-protocol)
- [Figma MCP Server](https://github.com/GLips/Figma-Context-MCP)
