// Function to process the email and ping your FastAPI backend
function analyzeEmail() {
    const emailBody = document.querySelector('.a3s.aiL'); 
    
    if (emailBody && !emailBody.hasAttribute('data-spam-checked')) {
        emailBody.setAttribute('data-spam-checked', 'true');

        const text = emailBody.innerText;
        if (!text.trim()) return; 

        console.log("Analyzing Email Text...");

        fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: text })
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            // Read both prediction label AND confidence from your new JSON layout
            if (data && data.prediction && data.confidence !== undefined) {
                injectBanner(emailBody, data.prediction, data.confidence);
            }
        })
        .catch(error => {
            console.warn("FastAPI backend is unreachable:", error.message);
            emailBody.removeAttribute('data-spam-checked');
        });
    }
}

// Upgraded UI Banner function to process text + confidence percentages
function injectBanner(targetElement, prediction, confidence) {
    if (!targetElement || !targetElement.parentNode) return;

    // Remove any existing banner
    const oldBanner = document.getElementById("spam-banner");
    if (oldBanner) oldBanner.remove();

    const banner = document.createElement("div");
    banner.id = "spam-banner";

    const isSpam = prediction === "spam";
    
    // Choose clean, compact wording
    //const badgeText = isSpam ? `⚠ Spam (${confidence}%)` : `✓ Safe (${confidence}%)`;
    const badgeText = isSpam 
    ? `⚠ Spam | ${confidence}% Confidence` 
    : `✓ Safe | ${confidence}% Confidence`;
    
    // Solid background styles matching your original look
    banner.innerText = badgeText;
    banner.style.padding = "6px 12px";
    banner.style.margin = "10px 0";
    banner.style.borderRadius = "20px"; // Rounded pill shape
    banner.style.display = "inline-block";
    banner.style.fontSize = "13px";
    banner.style.fontWeight = "bold";
    banner.style.fontFamily = "Roboto, sans-serif";
    banner.style.color = "white";
    banner.style.backgroundColor = isSpam ? "#D93025" : "#137333";

    // Safely inject it right above the email body
    targetElement.parentNode.insertBefore(banner, targetElement);
}

// Live background observer for SPA monitoring
const observer = new MutationObserver(() => { analyzeEmail(); });
if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
}