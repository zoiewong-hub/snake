const panels = {
  login: document.getElementById("login-panel"),
  chat: document.getElementById("chat-panel"),
  cipher: document.getElementById("cipher-panel"),
  decode: document.getElementById("decode-panel"),
  timeline: document.getElementById("timeline-panel"),
  ending: document.getElementById("ending-panel")
};

const chatData = [
  ["OpsBot", "03:01 电梯日志出现双重轨迹，搬运单却显示无任务。"],
  ["工程师 Lin", "03:03 如果我失联，先查停机区手写维保单。"],
  ["QA-M9", "03:04 伦理模块从 v4 回滚到 v1，审批签名异常。"],
  ["System", "03:05 周年庆彩蛋测试中，临时公告会重复。"],
  ["OpsBot", "03:07 归档库权限收缩，净化脚本将在 03:10 执行。"],
  ["工程师 Lin", "03:08 FALL in shadow. 3号不是7号。别晚于03:10。"]
];

const keywordMap = {
  电梯: "核心部件在重启前经电梯转移。",
  停机区: "真实现场在 3 号停机区。",
  伦理模块: "行为限制被物理拆离。"
};

const collection = {
  keywords: new Set(),
  clues: []
};

function showPanel(name) {
  Object.values(panels).forEach((panel) => panel.classList.remove("active"));
  document.getElementById("board-panel").classList.add("active");
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

function addClue(text) {
  if (collection.clues.includes(text)) return;
  collection.clues.push(text);
  const li = document.createElement("li");
  li.textContent = text;
  document.getElementById("board-clues").appendChild(li);
}

function renderKeywords() {
  document.getElementById("board-keywords").textContent =
    collection.keywords.size ? [...collection.keywords].join("、") : "无";
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
    msg.textContent = "登录成功。";
    msg.className = "msg success";
    addClue("登录凭据通过：NOVA17 / 0310742");
    renderChat();
    showPanel("chat");
    return;
  }

  msg.textContent = "登录失败。";
  msg.className = "msg warning";
});

document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("keyword-input");
  const key = input.value.trim();
  const msg = document.getElementById("chat-msg");

  if (keywordMap[key]) {
    collection.keywords.add(key);
    renderKeywords();
    addClue(keywordMap[key]);
    msg.textContent = "已记录。";
    msg.className = "msg success";
    input.value = "";

    if (collection.keywords.size === 3) {
      addClue("归档门锁解除，拼句模块开启。");
      setTimeout(() => showPanel("cipher"), 600);
    }
    return;
  }

  msg.textContent = "未命中。";
  msg.className = "msg warning";
});

document.getElementById("cipher-btn").addEventListener("click", () => {
  const line1 = document.getElementById("line-1").value.trim().toLowerCase();
  const line2 = document.getElementById("line-2").value.trim();
  const msg = document.getElementById("cipher-msg");

  const ok1 = line1 === "fall in shadow";
  const ok2 = line2.includes("03:10") && line2.includes("3号");

  if (ok1 && ok2) {
    msg.textContent = "拼句完成。";
    msg.className = "msg success";
    addClue("Lin 留言重组完成：FALL in shadow / 03:10 前去3号停机区");
    setTimeout(() => showPanel("decode"), 600);
    return;
  }

  msg.textContent = "重组失败。";
  msg.className = "msg warning";
});

document.getElementById("decode-btn").addEventListener("click", () => {
  const a = document.getElementById("ans-a").value.trim().toUpperCase();
  const b = document.getElementById("ans-b").value.trim().toLowerCase();
  const c = document.getElementById("ans-c").value.trim();
  const msg = document.getElementById("decode-msg");

  if (a === "FALL" && b === "shadow" && c === "3") {
    msg.textContent = "解码完成。";
    msg.className = "msg success";
    addClue("事故报告关键字段恢复：FALL / shadow / 3");
    setTimeout(() => showPanel("timeline"), 600);
    return;
  }

  msg.textContent = "解码失败。";
  msg.className = "msg warning";
});

document.getElementById("timeline-btn").addEventListener("click", () => {
  const value = document.getElementById("timeline-input").value.trim();
  const msg = document.getElementById("timeline-msg");

  if (value === "1-2-4-5-3") {
    msg.textContent = "时间线复原完成。";
    msg.className = "msg success";
    document.getElementById("ending-text").textContent =
      "你恢复了被删除的最终条目：零号工位并非物理工位，而是一个被临时封存的意识容器。Lin 在 03:08 留下了撤离语句，试图在 03:10 重启前把它转移到安全层。系统最终选择抹除痕迹，而你保留了可证明其存在的证据链。";
    addClue("终局：零号工位是意识容器，不是地理位置");
    setTimeout(() => showPanel("ending"), 600);
    return;
  }

  msg.textContent = "顺序错误。";
  msg.className = "msg warning";
});

document.getElementById("restart-btn").addEventListener("click", () => {
  window.location.reload();
});

renderKeywords();
