chrome.runtime.onInstalled.addListener(() => {
  console.log("Background worker is active");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractData") {
    console.log("Received extracted data:", message.data);
    sendToApi(message.data);
  }
  
  if (message.action === "login") {
    const { email, password } = message;
    console.log("Received login credentials", email, password);
    sendToLoginApi(email, password);
  }
});

function sendToApi(data) {
  console.log("Sending extracted data to API...");

  fetch("http://127.0.0.1:8000/bpo_extension", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), 
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("Data successfully sent to the API:", responseData);
    })
    .catch((error) => {
      console.error("Error sending data to the API:", error);
    });
}

function sendToLoginApi(email, password) {
  console.log("Sending login data to API...");

  fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("Login data successfully sent to the API:", responseData);
    })
    .catch((error) => {
      console.error("Error sending login data to the API:", error);
    });
}
