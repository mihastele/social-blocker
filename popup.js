document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.local.get(['blockedSites'], function(result) {
        const defaultSites = [
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
        
        // Merge default sites with saved blocked sites
        const savedSites = result.blockedSites || [];
        const sites = [...new Set([...defaultSites, ...savedSites])];
        
        // Create checkboxes for each site
        const siteList = document.getElementById('site-list');
        sites.forEach(site => {
            const li = document.createElement('li');
            li.className = 'site-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.checked = savedSites.length > 0 ? savedSites.includes(site) : true;
            checkbox.id = site;
            
            const label = document.createElement('label');
            label.className = 'site-name';
            label.htmlFor = site;
            label.textContent = site;
            
            li.appendChild(checkbox);
            li.appendChild(label);
            siteList.appendChild(li);
        });
    });

    // Save button click handler
    document.getElementById('save-button').addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('.checkbox');
        const blockedSites = [];
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                blockedSites.push(checkbox.id);
            }
        });

        chrome.storage.local.set({ blockedSites }, function() {
            // Close the popup
            window.close();
        });
    });
});
