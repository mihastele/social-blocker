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

// Generate a unique ID for our ruleset
const RULESET_ID = 'social-blocker-ruleset';

// Initialize the extension
async function initialize() {
  // Load saved settings
  const result = await chrome.storage.local.get(['blockedSites']);
  
  // If no saved settings, use default list
  if (!result.blockedSites) {
    await chrome.storage.local.set({ blockedSites: SOCIAL_MEDIA_SITES });
  }
  
  // Apply the current rules
  await updateBlockingRules();
}

// Update the blocking rules based on saved settings
async function updateBlockingRules() {
  const result = await chrome.storage.local.get(['blockedSites']);
  const blockedSites = result.blockedSites || SOCIAL_MEDIA_SITES;
  
  // Create dynamic rules for each blocked site
  const rules = blockedSites.map((url, index) => ({
    id: index + 1,
    priority: 1,
    action: { type: 'block' },
    condition: {
      urlFilter: url,
      resourceTypes: ['main_frame']
    }
  }));
  
  // Update the rules
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(rule => rule.id), // Remove old rules
    addRules: rules // Add new rules
  });
}

// Listen for changes in storage to update rules
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.blockedSites) {
    updateBlockingRules();
  }
});

// Initialize the extension when installed or updated
chrome.runtime.onInstalled.addListener(initialize);

// Also initialize when the service worker starts
initialize();
