const SOCIAL_MEDIA_SITES = [
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "tiktok.com",
  "reddit.com",
  "linkedin.com",
  "pinterest.com",
  "snapchat.com",
  "youtube.com",
  "youtu.be",
  "whatsapp.com",
  "messenger.com",
  "tumblr.com",
  "weibo.com",
  "wechat.com",
  "telegram.org",
  "discord.com",
  "twitch.tv",
  "vimeo.com",
  "9gag.com"
];

// Load blocked sites from storage
chrome.storage.local.get(['blockedSites'], (result) => {
  if (!result.blockedSites) {
    chrome.storage.local.set({ blockedSites: SOCIAL_MEDIA_SITES });
  }
});

// Listen for web requests and block social media sites
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    chrome.storage.local.get(['blockedSites'], (result) => {
      const blockedSites = result.blockedSites || SOCIAL_MEDIA_SITES;
      const url = new URL(details.url);
      
      if (blockedSites.includes(url.hostname)) {
        return { cancel: true };
      }
    });
  },
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["blocking"]
);
