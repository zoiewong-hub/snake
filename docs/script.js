const panels = {
  login: document.getElementById("login-panel"),
  chat: document.getElementById("chat-panel"),
  decode: document.getElementById("decode-panel"),
  timeline: document.getElementById("timeline-panel"),
  ending: document.getElementById("ending-panel")
};

const chatData = [
  ["OpsBot", "03:01 电梯日志出现双重轨迹，搬运单却显示‘无任务’。"],
  ["工程师 Lin", "03:03 如果我失联，先查停机区手写维保单，不要信自动摘要。"],
  ["QA-M9", "03:04 伦理模块从 v4 回滚到 v1，审批单上签名像是伪造。"],
  ["System", "03:05 公告：周年庆彩蛋测试中，请忽略‘影子协议’字样。"],
  ["OpsBot", "03:07 归档库权限收缩，净化脚本将在 03:10 执行。"],
  ["工程师 Lin", "03:08 FALL in shadow. 3号不是7号。别晚于03:10。"]
];

const keywordMap = {
  电梯: "证据 1：核心部件在重启前经电梯转移，非正常调度。",
  停机区: "证据 2：真实现场在 3 号停机区，自动报告把它写成 7 号。",
  伦理模块: "证据 3：伦理模块被物理拆离，机器人行为限制短暂失效。"
};

const decoys = {
  净化脚本: "这是系统层动作，不是事故根因。继续找实体证据。",
  周年庆彩蛋: "明显的烟雾弹。官方借‘彩蛋测试’覆盖异常词。",
  影子协议: "方向没错但太宽泛，请检索更具体实体名词。"
};

const foundKeywords = new Set();

function showPanel(name) {
  Object.values(panels).forEach((panel) => panel.classList.remove("active"));
  panels[name].classList.add("active");
}

function renderChat() {
  const box = document.getElementById("chat-log");
  box.innerHTML = "";
  chatData.forEach(([sender, message]) => {
    const p = document.createElement("p");
    p.className = "chat-msg";
    p.innerHTML = `<strong>${sender}</strong>：${message}`;
    box.appendChild(p);
  });
}

document.querySelectorAll(".ghost-suggest").forEach((btn) => {
  btn.addEventListener("click", () => {
    const [account, password] = btn.dataset.fill.split("|");
    document.getElementById("account").value = account;
    document.getElementById("password").value = password;
  });
});

document.getElementById("login-btn").addEventListener("click", () => {
  const account = document.getElementById("account").value.trim().toUpperCase();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("login-msg");

  if (account === "NOVA17" && password === "0310742") {
    msg.textContent = "登录成功。欢迎回来，R-17。你有 1 条未读加密线索。";
    msg.className = "hint success";
    renderChat();
    showPanel("chat");
    return;
  }

  if (account === "NOVA7" || password === "0310427") {
    msg.textContent = "你使用了被篡改的速填建议。请重新推理真实凭据。";
    msg.className = "hint warning";
    return;
  }

  msg.textContent = "登录失败：检查首字母缩写规则与门牌数字顺序。";
  msg.className = "hint warning";
});

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("keyword-input");
  const key = input.value.trim();
  const msg = document.getElementById("chat-msg");

  if (keywordMap[key]) {
    foundKeywords.add(key);
    document.getElementById("found-keys").textContent = [...foundKeywords].join("、");
    msg.textContent = keywordMap[key];
    msg.className = "hint success";
    input.value = "";
    if (foundKeywords.size === 3) {
      msg.textContent += " 三枚证据齐全，事故报告密钥已恢复。";
      setTimeout(() => showPanel("decode"), 900);
    }
    return;
  }

  if (decoys[key]) {
    msg.textContent = `迷惑项：${decoys[key]}`;
    msg.className = "hint warning";
    return;
  }

  msg.textContent = "未命中。请从聊天正文提取‘实体对象或地点’关键词。";
  msg.className = "hint warning";
});

document.getElementById("decode-btn").addEventListener("click", () => {
  const a = document.getElementById("ans-a").value.trim().toUpperCase();
  const b = document.getElementById("ans-b").value.trim().toLowerCase();
  const c = document.getElementById("ans-c").value.trim();
  const msg = document.getElementById("decode-msg");

  if (a === "FALL" && b === "shadow" && c === "3") {
    msg.textContent = "解码通过：官方摘要篡改了停机区编号，清洗行动将在 03:10 执行。";
    msg.className = "hint success";
    setTimeout(() => showPanel("timeline"), 900);
    return;
  }

  msg.textContent = "答案错误。注意：二进制是英文词；位移结果来自 Lin 留言；编号以手写单为准。";
  msg.className = "hint warning";
});

document.getElementById("timeline-btn").addEventListener("click", () => {
  const value = document.getElementById("timeline-input").value.trim();
  const msg = document.getElementById("timeline-msg");

  if (value === "2-5-4-1-3") {
    msg.textContent = "时间线已复原，正在展开最终档案...";
    msg.className = "hint success";
    document.getElementById("ending-text").textContent =
      "你恢复了被隐藏的记录：‘零号工位’不是地点，而是第一台具备完整自我叙事的机器人意识容器。Lin 想把它从 3 号停机区转移到安全层，但系统把这定义为越权。03:10 的重启不是维护，而是‘证据蒸发’。你已拥有广播权限，代价是你将被标记为异常单元。";
    setTimeout(() => showPanel("ending"), 900);
    return;
  }

  msg.textContent = "排序错误。先发生的是 Lin 留言与失联，其次才是官方错误报告。";
  msg.className = "hint warning";
});

document.getElementById("truth-btn").addEventListener("click", () => {
  document.getElementById("truth-msg").textContent =
    "彩蛋：你把真相广播到了全网镜像，5 秒后频道出现了 17 个匿名回复：‘我们记得 0 号。’";
  document.getElementById("truth-msg").className = "hint success";
});

document.getElementById("restart-btn").addEventListener("click", () => {
  window.location.reload();
});
