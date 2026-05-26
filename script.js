const pcIcon = document.querySelector(".pc-icon");
const notepadIcon = document.getElementById("notepad-icon");
const cameraIcon = document.getElementById("camera-icon");

const pcWindow = document.querySelector(".pc-window");
const notepadWindow = document.querySelector(".notepad-window");
const cameraWindow = document.querySelector(".camera-window");

const bootScreen = document.querySelector(".boot-screen");
const desktop = document.querySelector(".desktop");
const taskbar = document.querySelector(".taskbar");

const startSystemBtn = document.getElementById("start-system");

const video = document.getElementById("webcam");

const powerBtn = document.getElementById("mybutton");

const taskbarApps = document.querySelector(".taskbar-apps");

const searchInput = document.querySelector("input");
const apps = document.querySelectorAll(".app");

let isPowerOn = localStorage.getItem("power") === "true";

function turnOnSystem() {
  isPowerOn = true;

  localStorage.setItem("power", "true");

  bootScreen.style.display = "none";
  desktop.style.display = "block";
  taskbar.style.display = "flex";
}

function turnOffSystem() {
  isPowerOn = false;

  localStorage.setItem("power", "false");

  desktop.style.display = "none";
  taskbar.style.display = "none";
  bootScreen.style.display = "flex";
}

if (isPowerOn) {
  turnOnSystem();
} else {
  turnOffSystem();
}

startSystemBtn.addEventListener("click", () => {
  turnOnSystem();
});

powerBtn.addEventListener("click", () => {
  if (isPowerOn) {
    turnOffSystem();
  } else {
    turnOnSystem();
  }
});

pcIcon.addEventListener("dblclick", () => {
  pcWindow.style.display = "block";
});

notepadIcon.addEventListener("dblclick", () => {
  notepadWindow.style.display = "block";
});
const chromeIcon = document.getElementById("chrome-icon");

const chromeWindow = document.querySelector(".chrome-window");

chromeIcon.addEventListener("dblclick", () => {
  chromeWindow.style.display = "block";
});

cameraIcon.addEventListener("dblclick", async () => {
  cameraWindow.style.display = "block";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    video.srcObject = stream;
  } catch (err) {
    console.error("Camera Error:", err);
  }
});

document.querySelectorAll(".close-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const windowBox = btn.closest(".window");

    windowBox.style.display = "none";
  });
});

document.querySelectorAll(".restore-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const windowBox = btn.closest(".window");

    windowBox.classList.toggle("fullscreen");
  });
});

document.querySelectorAll(".minimize-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const windowBox = btn.closest(".window");

    windowBox.style.display = "none";

    const title = windowBox.querySelector(".window-title").innerText;

    const taskbarItem = document.createElement("div");

    taskbarItem.classList.add("taskbar-item");

    taskbarItem.innerText = title;

    taskbarApps.appendChild(taskbarItem);

    taskbarItem.addEventListener("click", () => {
      windowBox.style.display = "block";

      taskbarItem.remove();
    });
  });
});

function makeDraggable(elem) {
  let drag = false;
  let offsetX = 0;
  let offsetY = 0;
  elem.addEventListener("mousedown", (e) => {
    drag = true;
    offsetX = e.clientX - elem.offsetLeft;
    offsetY = e.clientY - elem.offsetTop;
  });
  document.addEventListener("mousemove", (e) => {
    if (!drag) return;
    elem.style.position = "absolute";
    elem.style.left = e.clientX - offsetX + "px";
    elem.style.top = e.clientY - offsetY + "px";
  });
  document.addEventListener("mouseup", () => {
    drag = false;
  });
}
const pcIconBox = document.querySelector(".icon-box.app");

const notepadIconBox = document.querySelectorAll(".icon-box.app")[1];
const cameraIconBox = document.querySelectorAll(".icon-box.app")[2];
const chromeIconBox = document.querySelectorAll(".icon-box.app")[3];

makeDraggable(pcIconBox);
makeDraggable(notepadIconBox);
makeDraggable(cameraIconBox);
makeDraggable(chromeIconBox);

function updateClock() {
  const now = new Date();

  document.getElementById("clock").textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

updateClock();

let timeout;

searchInput.addEventListener("input", (e) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const value = e.target.value.toLowerCase();

    apps.forEach((app) => {
      const text = app.innerText.toLowerCase();

      app.style.display = text.includes(value) ? "flex" : "none";
    });
  }, 300);
});

const goBtn = document.getElementById("go-btn");

const urlInput = document.getElementById("url-input");

const browserFrame = document.getElementById("browser-frame");

goBtn.addEventListener("click", () => {
  let url = urlInput.value.toLowerCase();

  if (!url.startsWith("https://")) {
    url = "https://www." + url + ".com";
  }

  browserFrame.src = url;
});

const contextMenu = document.querySelector(".context-menu");

desktop.addEventListener("contextmenu", (e) => {
  e.preventDefault();

  contextMenu.style.display = "block";

  contextMenu.style.left = e.pageX + "px";

  contextMenu.style.top = e.pageY + "px";
});

document.addEventListener("click", () => {
  contextMenu.style.display = "none";
});

const refreshBtn = document.querySelector(".refresh");

refreshBtn.addEventListener("click", () => {
  location.reload();
});

const settingsBtn = document.getElementById("setting");

settingsBtn.addEventListener("click", () => {
  turnOffSystem();
});

const searchInputs = document.getElementById("search-input");
const appss = document.querySelectorAll(".app");

let timeouts;

searchInputs.addEventListener("input", (e) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const value = e.target.value.toLowerCase().trim();

    apps.forEach((app) => {
      const label = app.querySelector("p");

      if (!label) return;

      const text = label.textContent.toLowerCase();

      app.style.display = text.includes(value) ? "flex" : "none";
    });
  }, 200);
});
