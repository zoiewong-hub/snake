# 《零号工位》

一个机器人题材的网页文字解谜游戏原型，模拟“真实工作软件”中的事故调查流程。

## 游戏特点

- **沉浸式工作软件界面**：左侧频道栏、值班卡片、系统状态栏、聊天工作区。
- **四段式核心流程**：登录推理 → 聊天检索 → 报告解码 → 时间线重建。
- **迷惑项设计**：包含错误速填凭据、干扰关键词、低可信摘要，提升推理挑战。
- **内置图片素材**：使用内联 SVG 构建机器人头像与监控截图，无需额外资源文件。
- **游玩时长**：按阅读和尝试节奏设计约 30 分钟。

## 本地运行

直接双击 `index.html` 即可，或使用静态服务器：

```bash
python -m http.server 8000
```

访问 <http://localhost:8000>。


## PR 冲突快速处理（命令行）

如果 GitHub 页面提示本分支在以下文件有冲突：`README.md`、`index.html`、`script.js`、`styles.css`，可在本地执行：

```bash
git merge <目标分支>
bash scripts/resolve_pr_conflicts.sh
git commit -m "chore: resolve PR conflicts for puzzle game files"
```

说明：该脚本会在冲突状态下保留当前功能分支中的游戏实现版本（`--ours`），并自动 `git add` 四个冲突文件。
