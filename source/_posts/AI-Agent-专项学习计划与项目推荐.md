---
title: AI-Agent 专项学习计划与项目推荐
abbrlink: 42817
date: 2026-07-20 10:00:00
categories:
  - Tech
tags:
  - AI
  - Agent
  - 学习
  - 职业
---

1|# AI Agent 专项学习计划与项目推荐
     2|
     3|---
     4|
     5|## 一、学习路线总览（12 周）
     6|
     7|```
     8|第 1-2 周  基础入门    Agent 原理 + 框架选型
     9|第 3-4 周  核心技能    RAG + Tool Calling + MCP
    10|第 5-6 周  Harness 工程  Agent 网关、权限、上下文
    11|第 7-8 周  项目实战    做一个完整可展示的作品
    12|第 9-10 周  Multi-Agent  多 Agent 编排 + 生产部署
    13|第 11-12 周 冲刺优化    面试准备 + 作品打磨 + 开源贡献
    14|```
    15|
    16|---
    17|
    18|## 二、详细周计划
    19|
    20|### 第 1 周：Agent 基础知识
    21|
    22|**目标**：理解 Agent 是什么，能说清楚 Agent Loop 的完整流程
    23|
    24|- 看 [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) 第 1-3 课
    25|- 看 [Datawhale hello-agents](https://github.com/datawhalechina/hello-agents) 第 1-4 章（概念 + 发展史 + LLM 基础 + 经典范式 ReAct/P&S/Reflection）
    26|- 手写一个 **最小 Agent Loop**（50-100 行 Python）
    27|
    28|```python
    29|# 最小 Agent Loop 骨架
    30|def agent_loop(user_input, tools, max_steps=10):
    31|    messages = [{"role": "user", "content": user_input}]
    32|    for step in range(max_steps):
    33|        response = llm(messages, tools=tools)  # 调用 LLM
    34|        if response.stop_reason == "tool_calls":
    35|            for tool_call in response.tool_calls:
    36|                result = execute_tool(tool_call)  # 执行工具
    37|                messages.append({"role": "tool", ...})
    38|        else:
    39|            return response.content
    40|    return "Max steps reached"
    41|```
    42|
    43|**交付物**：一个能调函数/搜索的极简 Agent demo，README 说明架构
    44|
    45|---
    46|
    47|### 第 2 周：框架选型与上手
    48|
    49|**目标**：选一个主攻框架，跑通官方示例
    50|
    51|**主攻选型建议**：
    52|
    53|| 框架 | 适合场景 | 理由 |
    54||---|---|---|
    55|| **LangChain/LangGraph** | 通用 Agent 开发 | 生态最大，JD 出现率最高，推荐主攻 |
    56|| **OpenAI Agents SDK** | 快速原型 | 官方出品，代码简洁，适合入门理解 |
    57|| **AutoGen** | 企业级多 Agent | 微软背书，国内企业采用率高 |
    58|
    59|**行动**：
    60|
    61|- 跑通 LangChain 官方 Quickstart
    62|- 跑通 LangGraph 的 Agent 示例
    63|- 对比两种实现方式的差异（Chain vs Graph）
    64|
    65|**交付物**：用 LangGraph 实现一个带 Tool Calling 的问答 Agent
    66|
    67|---
    68|
    69|### 第 3 周：RAG 流水线
    70|
    71|**目标**：掌握 RAG 全流程，能独立搭建知识库问答系统
    72|
    73|**学习内容**：
    74|
    75|- 文档解析（PDF/Markdown/HTML）
    76|- Chunk 策略（Fixed-size, Semantic, Agentic）
    77|- Embedding 模型选型（text-embedding-3-small, bge-m3, m3e）
    78|- 向量数据库（Chroma 上手最简单，Milvus 最工业级）
    79|- Retrieval 策略（相似度搜索、MMR、Hybrid Search）
    80|- Reranker 排序
    81|- 带引用的 Answer Generation
    82|
    83|**推荐项目**：**Paper Agent**（论文阅读助手）
    84|
    85|```
    86|用户输入论文链接/PDF → 解析 → Chunk → Embed → 存储 → 
    87|用户提问 → Retrieve → Rerank → LLM 生成带引用的回答
    88|```
    89|
    90|**交付物**：一个能上传 PDF 并回答问题的 RAG Agent
    91|
    92|---
    93|
    94|### 第 4 周：MCP 协议
    95|
    96|**目标**：理解 MCP 协议，能自己写 MCP Server
    97|
    98|**学习内容**：
    99|
   100|- 看 [microsoft/mcp-for-beginners](https://github.com/microsoft/mcp-for-beginners) Module 0-3
   101|- 理解 MCP 核心概念：Resources, Tools, Prompts, Sampling
   102|- 理解 stdio 传输 vs HTTP 传输
   103|- 写第一个 MCP Server（如：天气查询、文件操作、数据库查询）
   104|
   105|**交付物**：一个功能性 MCP Server（建议做 **PostgreSQL MCP Server** 或 **文件系统 MCP Server**），能被 Claude/Cline 调用
   106|
   107|---
   108|
   109|### 第 5 周：Agent Harness 工程
   110|
   111|**目标**：理解 Agent 生产化的基础设施，这是 **#1 招聘缺口**
   112|
   113|**学习内容**：
   114|
   115|- 工具注册与发现（Tool Registry）
   116|- 权限门控（Permission Gate）
   117|- 上下文管理（Context Window 控制、压缩策略）
   118|- 会话存储（Session Store）
   119|- 链路追踪（Trace Logging）
   120|- 错误恢复与重试
   121|- 沙箱执行（Sandbox）
   122|
   123|**推荐项目**：**Tiny Agent Gateway**
   124|
   125|```
   126|输入 → 认证/权限 → 上下文组装 → Agent Loop → 工具执行（沙箱）→ 
   127|Trace 记录 → 输出 → 会话存储
   128|```
   129|
   130|参考 read-pdf 等实际 Skill 的实现结构，理解 `SKILL.md` + 工具的注册模式。
   131|
   132|**交付物**：一个小型 Agent Gateway demo，展示工具注册 + 权限 + trace 三大模块
   133|
   134|---
   135|
   136|### 第 6 周：Context Engineering + 记忆系统
   137|
   138|**目标**：掌握上下文工程这一新兴关键能力
   139|
   140|**学习内容**：
   141|
   142|- [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) 第 12 课 Context Engineering
   143|- 上下文压缩策略：总结、丢弃、优先级排序
   144|- 记忆系统：短期（窗口）、中期（摘要）、长期（向量/知识图谱）
   145|- 多轮对话中的上下文管理
   146|
   147|**行动**：
   148|
   149|- 对比不同 Context 管理策略的效果
   150|- 实现一个带记忆管理的 Agent
   151|
   152|**交付物**：对 Harness 项目增加上下文压缩 + 记忆管理模块
   153|
   154|---
   155|
   156|### 第 7-8 周：完整项目实战（核心阶段）
   157|
   158|选择一个完整项目认真完成，这是简历上的 **关键作品**。推荐以下方向：
   159|
   160|#### 项目 A：编码 Agent（最通吃，推荐首选）
   161|
   162|构建一个类 Claude Code 的编码 Agent，能读写文件、执行命令、在代码库中完成任务。
   163|
   164|```
   165|技术栈：Python + LangGraph + MCP File System Server
   166|功能：
   167|  - 文件读写（单个 + 批量）
   168|  - Shell 命令执行（沙箱）
   169|  - 代码搜索（Grep/Glob）
   170|  - 文件编辑（Find & Replace）
   171|  - 项目上下文理解
   172|```
   173|
   174|**参考**：[shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) — 7000 行的 Nano Claude Code
   175|
   176|#### 项目 B：Deep Research Agent
   177|
   178|复现类 ChatGPT Deep Research 的深度研究 Agent。
   179|
   180|```
   181|技术栈：Python + LangGraph + Tavily/Brave Search + MCP
   182|流程：
   183|  用户提问 → 规划子问题 → 并行搜索 → 阅读 → 
   184|  整合 → 发现矛盾 → 再次搜索 → 输出结构化报告
   185|```
   186|
   187|**参考**：hello-agents 第 14 章 DeepResearch Agent 复现
   188|
   189|#### 项目 C：Multi-Agent 协作系统
   190|
   191|```
   192|技术栈：LangGraph / CrewAI + MCP
   193|Agent 角色：
   194|  - Planner：分解任务
   195|  - Researcher：搜索与收集信息
   196|  - Writer：撰写内容
   197|  - Reviewer：审查与修订
   198|```
   199|
   200|**交付物**：GitHub 开源项目，包含 README、架构图、部署文档、demo 视频链接
   201|
   202|---
   203|
   204|### 第 9-10 周：Multi-Agent + 生产部署
   205|
   206|**学习内容**：
   207|
   208|- [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) 第 8 课 Multi-Agent
   209|- [hello-agents](https://github.com/datawhalechina/hello-agents) 第 11 章 评估体系
   210|- Docker 容器化 Agent
   211|- CI/CD for Agents
   212|- 监控与可观测性（LangSmith、LangFuse）
   213|- 成本优化（缓存、模型路由、Token 管理）
   214|
   215|**交付物**：将第 7-8 周的项目容器化，加 CI/CD + 监控
   216|
   217|---
   218|
   219|### 第 11-12 周：面试准备 + 开源贡献
   220|
   221|**面试准备**：
   222|
   223|- 刷 [AgentGuide 面试题库](https://github.com/adongwanai/AgentGuide)（1000+ 题）
   224|- 准备以下常见面试题：
   225|  - Agent Loop 的实现原理
   226|  - LangGraph 的状态管理机制
   227|  - RAG 的 Chunk 策略选择
   228|  - Context Window 满了怎么办
   229|  - MCP 和 Function Calling 的区别
   230|  - Multi-Agent 的通信与协调方案
   231|  - Agent 的安全性（Prompt Injection、工具权限）
   232|- 准备项目演示：架构设计、关键难点、技术选型理由
   233|
   234|**开源贡献**：
   235|
   236|- 给 LangChain / LangGraph 提 PR（即使是文档改进）
   237|- 发布自己做的 MCP Server 到 npm/pip
   238|- 在 GitHub Discussions 中活跃参与 AI Agent 话题
   239|
   240|---
   241|
   242|## 三、项目推荐总表
   243|
   244|| 项目 | 周期 | 难度 | 技术栈 | 展示价值 |
   245||---|---|---|---|---|
   246|| **编码 Agent** | 2 周 | 高 | Python + LangGraph + MCP | ★★★★★ |
   247|| **Paper Agent** | 1 周 | 中 | Python + RAG + Chroma | ★★★★ |
   248|| **Travel Agent** | 2 周 | 高 | Python + MCP + Multi-Agent | ★★★★ |
   249|| **Deep Research Agent** | 2 周 | 高 | Python + LangGraph + Search | ★★★★★ |
   250|| **MCP Server** | 1 周 | 中 | Python/TS + MCP SDK | ★★★ |
   251|| **Agent Gateway/Harness** | 2 周 | 高 | Python + 权限 + Trace | ★★★★★ |
   252|| **Web Agent** | 2 周 | 高 | Playwright + LLM | ★★★★ |
   253|| **赛博小镇** | 3 周 | 高 | Multi-Agent + Game | ★★★ |
   254|| **Tiny Claude Code** | 2 周 | 高 | Agent Loop + Tool Use | ★★★★★ |
   255|| **Multi-Agent 写作系统** | 1 周 | 中 | CrewAI/LangGraph | ★★★★ |
   256|
   257|---
   258|
   259|## 四、学习资源索引
   260|
   261|### 教程课程
   262|
   263|| 资源 | 适合阶段 | 链接 |
   264||---|---|---|
   265|| Datawhale hello-agents | 入门→高级 | [github.com/datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents) |
   266|| Microsoft AI Agents for Beginners | 入门→中级 | [github.com/microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) |
   267|| Microsoft MCP for Beginners | 中级 | [github.com/microsoft/mcp-for-beginners](https://github.com/microsoft/mcp-for-beginners) |
   268|| AgentGuide（求职向） | 全阶段 | [github.com/adongwanai/AgentGuide](https://github.com/adongwanai/AgentGuide) |
   269|| Microsoft LangChain for Beginners | 中级 | Microsoft Learn |
   270|| shareAI-lab/learn-claude-code | 高级 | [github.com/shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) |
   271|
   272|### 推荐框架优先级
   273|
   274|```
   275|首选：LangChain + LangGraph（生态最大，JD 出现率最高）
   276|次选：OpenAI Agents SDK（官方出品，快速上手）
   277|补充：AutoGen（企业级）、CrewAI（多 Agent）、Pydantic AI（类型安全）
   278|关注：Mastra（TypeScript 新星）
   279|```
   280|
   281|### 中文社区资源
   282|
   283|- **知乎**：搜索 "AI Agent 开发实战"、"LangGraph 教程"
   284|- **B站**：Datawhale hello-agents 视频讲解
   285|- **GitHub**：AgentGuide、hello-agents 的 discussions
   286|
   287|---
   288|
   289|## 五、关键建议
   290|
   291|1. **先做后学** — 不要花太多时间看文档，第 1 周就要写代码跑 Agent Loop
   292|2. **作品导向** — 简历上 1 个高质量编码 Agent > 3 个入门 demo
   293|3. **开源可见** — 项目发 GitHub，README 写清楚架构和技术选型理由
   294|4. **理解深一层** — 面试考的不是会不会用 LangChain，是懂不懂 Agent 原理
   295|5. **关注 Context Engineering** — 这是 2026 年最热的新技能点
   296|6. **MCP 是必选项** — 面试中 MCP 相关问题的出现频率在快速上升
   297|7. **英语能力** — 大部分高质量文档和社区讨论是英文的
   298|8. **保持更新** — AI Agent 领域变化极快，每周看一次 GitHub Trending
   299|
   300|---
   301|
   302|*计划编制于 2025-07-20，基于最新市场数据*
   303|