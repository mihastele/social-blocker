const SOCIAL_MEDIA_SITES = [
  "*://*.facebook.com/*",
  "*://*.twitter.com/*",
  "*://*.instagram.com/*",
  "*://*.tiktok.com/*",
  "*://*.reddit.com/*",
  "*://*.linkedin.com/*",
  "*://*.pinterest.com/*",
  "*://*.snapchat.com/*",
  "*://*.youtube.com/*",
  "*://youtu.be/*",
  "*://*.whatsapp.com/*",
  "*://*.messenger.com/*",
  "*://*.tumblr.com/*",
  "*://*.weibo.com/*",
  "*://*.wechat.com/*",
  "*://*.telegram.org/*",
  "*://*.discord.com/*",
  "*://*.twitch.tv/*",
  "*://*.vimeo.com/*",
  "*://*.9gag.com/*"
];

// Initialize the extension
async function initialize() {
  // Load saved settings
  const result = await browser.storage.local.get(['blockedSites']);
  
  // If no saved settings, use default list
  if (!result.blockedSites) {
    await browser.storage.local.set({ blockedSites: SOCIAL_MEDIA_SITES });
  }
  
  // Apply the current rules
  await updateBlockingRules();
}

// Update the blocking rules based on saved settings
async function updateBlockingRules() {
  // First, remove any existing listeners to prevent duplicates
  if (browser.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    browser.webRequest.onBeforeRequest.removeListener(blockRequest);
  }
  
  const result = await browser.storage.local.get(['blockedSites']);
  const blockedSites = result.blockedSites || SOCIAL_MEDIA_SITES;
  
  // Add listener for the blocked sites
  browser.webRequest.onBeforeRequest.addListener(
    blockRequest,
    { urls: blockedSites },
    ["blocking"]
  );
}

// Block the request
function blockRequest(details) {
  return { cancel: true };
}

// Listen for changes in storage to update rules
browser.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.blockedSites) {
    updateBlockingRules();
  }
});

// Initialize the extension
initialize();
