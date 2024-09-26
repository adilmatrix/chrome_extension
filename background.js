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
  chrome.storage.local.get(["id_token"], (result) => {
    const token = result.id_token;
    if (token) {
      fetch("http://127.0.0.1:8000/bpo_extension", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    } else {
      console.error("No token found. Please log in.");
    }
  });
}

function sendToLoginApi(email, password) {
  fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.id_token) {
        console.log("Token received:", data.id_token);
        chrome.storage.local.set(
          {
            id_token: data.id_token,
            display_name: data.display_name,
          },
          () => {
            console.log("Token and display name saved.");
          }
        );

        console.log("Login successful. Welcome, " + data.display_name);
        chrome.runtime.sendMessage({ action: "loginSuccess" });
      } else {
        console.error("Login failed: Invalid credentials.");
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
}
