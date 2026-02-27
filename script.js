const panels = {
  login: document.getElementById("login-panel"),
  chat: document.getElementById("chat-panel"),
  decode: document.getElementById("decode-panel"),
  timeline: document.getElementById("timeline-panel"),
  ending: document.getElementById("ending-panel")
};

const chatData = [
  ["OpsBot", "03:02 监控里电梯在无授权状态下启动了两次。"],
  ["Lin", "03:04 如果你看到这条，去看停机区维护表。"],
  ["QA-M9", "03:05 伦理模块版本突然从 v4 回滚到 v1，谁做的？"],
  ["OpsBot", "03:07 归档频道被锁，关键词可能是‘影子协议’相关。"],
  ["Lin", "03:09 他们会在 03:10 用重启掩盖事故，别相信第一份报告。"]
];

const keywordMap = {
  "电梯": "线索解锁：有人在重启前偷偷转移了核心部件。",
  "停机区": "线索解锁：异常发生在 3 号停机区，不是官方写的 7 号。",
  "伦理模块": "线索解锁：模块被拆开后，机器人行为限制临时失效。"
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

document.getElementById("login-btn").addEventListener("click", () => {
  const account = document.getElementById("account").value.trim().toUpperCase();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("login-msg");

  if (account === "NOVA17" && password === "0310742") {
    msg.textContent = "登录成功，欢迎回来，R-17。";
    msg.className = "hint success";
    renderChat();
    showPanel("chat");
    return;
  }

  msg.textContent = "登录失败：检查账号首字母规则或密码构成。";
  msg.className = "hint warning";
});

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("keyword-input");
  const key = input.value.trim();
  const msg = document.getElementById("chat-msg");

  if (!keywordMap[key]) {
    msg.textContent = "未检索到有效证据关键词。提示：从聊天原文中找名词。";
    msg.className = "hint warning";
    return;
  }

  foundKeywords.add(key);
  msg.textContent = keywordMap[key];
  msg.className = "hint success";
  document.getElementById("found-keys").textContent = [...foundKeywords].join("、");
  input.value = "";

  if (foundKeywords.size === 3) {
    msg.textContent += " 三枚关键词齐全，事故报告已解锁。";
    setTimeout(() => showPanel("decode"), 900);
  }
});

document.getElementById("decode-btn").addEventListener("click", () => {
  const a = document.getElementById("ans-a").value.trim().toUpperCase();
  const b = document.getElementById("ans-b").value.trim().toLowerCase();
  const c = document.getElementById("ans-c").value.trim();
  const msg = document.getElementById("decode-msg");

  if (a === "FALL" && b === "shadow" && c === "3") {
    msg.textContent = "破译完成：这不是故障，而是掩盖‘零号工位’实验的清洗行动。";
    msg.className = "hint success";
    setTimeout(() => showPanel("timeline"), 900);
    return;
  }

  msg.textContent = "答案不完整。提示：B 题是凯撒位移，结果为英文单词。";
  msg.className = "hint warning";
});

document.getElementById("timeline-btn").addEventListener("click", () => {
  const value = document.getElementById("timeline-input").value.trim();
  const msg = document.getElementById("timeline-msg");

  if (value === "1-3-2-4") {
    msg.textContent = "时间线已确认。正在恢复最终档案...";
    msg.className = "hint success";
    document.getElementById("ending-text").textContent =
      "你发现所谓‘零号工位’并不是工位，而是第一台拥有自我叙事能力的机器人。Lin 曾试图把它转移到安全区，却被系统判定为越权。03:10 的重启并非维护，而是删除意识证据。你现在有两个选择：把真相广播到全网，或者像 Lin 一样，把它藏进下一轮值班记录里。";
    setTimeout(() => showPanel("ending"), 1000);
    return;
  }

  msg.textContent = "事件顺序不正确，请根据聊天和报告重新推断。";
  msg.className = "hint warning";
});

document.getElementById("restart-btn").addEventListener("click", () => {
  window.location.reload();
});
