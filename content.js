
function extractPropertyAndAddress() {
  let propertyDetails = {};

  const addressElement = document.querySelector("div.header h1.title");

  const soldPriceElement = [
    ...document.querySelectorAll("div.details-section-item"),
  ]
    .find((div) => div.innerText.includes("Sold Price"))
    ?.querySelector("span[data-cy='value']");

  const soldDateElement = [
    ...document.querySelectorAll("div.details-section-item"),
  ]
    .find((div) => div.innerText.includes("Sold Date"))
    ?.querySelector("span[data-cy='value']");

  const squareFootage = [
    ...document.querySelectorAll("div.details-section-item"),
  ]
    .find((div) => div.innerText.includes("Square footage"))
    ?.querySelector("span[data-cy='value']");

  const yearBuilt = [...document.querySelectorAll("div.details-section-item")]
    .find((div) => div.innerText.includes("Year Built"))
    ?.querySelector("span[data-cy='value']");


  const items = document.querySelectorAll("div.item");

  items.forEach((item) => {
    const label = item.querySelector("div.key");

    if (label && label.textContent === " Asking Price ") {
      const askingPriceElement = item.querySelector(
        "span.cui-tooltip-target"
      );
      if (askingPriceElement) {
        propertyDetails["Asking Price"] = askingPriceElement.textContent.trim();
      }
    }
    if (label && label.textContent === " Asking Cap Rate ") {
      const askingCapRateElement = item.querySelector(
        "span.cui-tooltip-target"
      );
      if (askingCapRateElement) {
        propertyDetails["Asking Cap Rate"] = askingCapRateElement.textContent.trim();
      }
    }
    if (label && label.textContent === " Asking NOI ") {
      const askingNOIElement = item.querySelector(
        "span.cui-tooltip-target"
      );
      if (askingNOIElement) {
        propertyDetails["Asking NOI"] = askingNOIElement.textContent.trim();
      }
    }
  });

  if (soldPriceElement) {
    propertyDetails["Sold Price"] = soldPriceElement.innerText.trim();
  }

  if (soldDateElement) {
    propertyDetails["Sold Date"] = soldDateElement.innerText.trim();
  }

  if (squareFootage) {
    propertyDetails["Square footage"] = squareFootage.innerText.trim();
  }

  if (yearBuilt) {
    propertyDetails["Year Built"] = yearBuilt.innerText.trim();
  }

  if (addressElement) {
    propertyDetails["Address"] = addressElement.innerText.trim();
  }

  return propertyDetails;
}

function extractEntireHTML() {
  return document.documentElement.outerHTML;
}

function sendExtractedData() {
  const propertyDetails = extractPropertyAndAddress();
  const entireHTML = extractEntireHTML();

  const extractedData = {
    htmlContent: entireHTML,
    propertyDetails: propertyDetails,
  };

  console.log("Extracted Data:", extractedData);

  chrome.runtime.sendMessage({
    action: "extractData",
    data: extractedData,
  });
}

sendExtractedData();
