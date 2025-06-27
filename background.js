let siteTimes = {};
let currentSite = "";
let lastTime = Date.now();

function trackTime() {
  const now = Date.now();
  const timeSpent = Math.floor((now - lastTime) / 1000); // in seconds
  if (currentSite) {
    if (!siteTimes[currentSite]) {
      siteTimes[currentSite] = 0;
    }
    siteTimes[currentSite] += timeSpent;
    chrome.storage.local.set({ siteTimes });
  }
}

// When user switches tab
chrome.tabs.onActivated.addListener(activeInfo => {
  trackTime();
  chrome.tabs.get(activeInfo.tabId, tab => {
    if (tab && tab.url) {
      currentSite = new URL(tab.url).hostname;
      lastTime = Date.now();
    }
  });
});

// When tab updates (new URL loaded)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    trackTime();
    if (tab.url) {
      currentSite = new URL(tab.url).hostname;
      lastTime = Date.now();
    }
  }
});
