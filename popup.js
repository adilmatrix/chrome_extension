// For scraping logic
document.getElementById("scrape").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"], // Executes content script for scraping
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login-btn");

  loginButton.addEventListener("click", function () {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      document.getElementById("error-msg").textContent =
        "Please fill in both fields.";
      document.getElementById("error-msg").style.display = "block";
      return;
    }

    chrome.runtime.sendMessage({
      action: "login",
      email: email,
      password: password,
    });
  });
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "loginSuccess") {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("welcome-section").classList.remove("hidden");
    document.getElementById("vacant-rate").addEventListener("click", () => {
      console.log("Vacant Rate clicked");
    });
    document.getElementById("comp-rate").addEventListener("click", () => {
      console.log("Comp Rate clicked");
    });
  }
});
