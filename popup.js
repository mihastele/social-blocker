document.addEventListener('DOMContentLoaded', async function() {
    // Default sites with proper URL patterns for declarativeNetRequest
    const defaultSites = [
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
    
    // Function to get display name from URL pattern
    function getDisplayName(urlPattern) {
        // Remove the protocol and wildcards
        let displayName = urlPattern
            .replace('*://', '')
            .replace('*.', '')
            .replace('/*', '');
        
        // Special case for youtu.be
        if (displayName.startsWith('youtu.be')) {
            return 'youtu.be';
        }
        
        // Remove subdomains for cleaner display
        const parts = displayName.split('.');
        if (parts.length > 2) {
            return parts.slice(1).join('.');
        }
        return displayName;
    }

    // Load saved settings and initialize UI
    async function initPopup() {
        const result = await chrome.storage.local.get(['blockedSites']);
        const savedSites = result.blockedSites || [];
        const sites = [...new Set([...defaultSites, ...savedSites])];
        const siteList = document.getElementById('site-list');
        
        // Clear existing list
        siteList.innerHTML = '';

        // Create checkboxes for each site
        sites.forEach(site => {
            const li = document.createElement('li');
            li.className = 'site-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.checked = savedSites.length > 0 ? savedSites.includes(site) : true;
            checkbox.id = site;
            
            const displayName = getDisplayName(site);
            const label = document.createElement('label');
            label.className = 'site-name';
            label.htmlFor = site;
            label.textContent = displayName;
            
            li.appendChild(checkbox);
            li.appendChild(label);
            siteList.appendChild(li);
        });

        // Add search functionality
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search sites...';
        searchInput.className = 'search-input';
        searchInput.style.width = '100%';
        searchInput.style.padding = '8px';
        searchInput.style.marginBottom = '10px';
        siteList.parentNode.insertBefore(searchInput, siteList);

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const items = siteList.getElementsByTagName('li');
            
            Array.from(items).forEach(item => {
                const text = item.textContent.toLowerCase();
                item.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }

    // Initialize the popup
    initPopup();

    // Save button click handler
    document.getElementById('save-button').addEventListener('click', async function() {
        const checkboxes = document.querySelectorAll('.checkbox');
        const blockedSites = [];
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                blockedSites.push(checkbox.id);
            }
        });

        try {
            await chrome.storage.local.set({ blockedSites });
            // Give some feedback before closing
            const button = document.getElementById('save-button');
            button.textContent = 'Saved!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                window.close();
            }, 1000);
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Error saving settings. Please try again.');
        }
    });
});
