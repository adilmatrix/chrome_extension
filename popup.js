document.getElementById("scrape").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", function () {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    chrome.runtime.sendMessage({
      action: "login",
      email: email,
      password: password,
    });
  });
});
