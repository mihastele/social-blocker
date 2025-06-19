document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.local.get(['blockedSites'], function(result) {
        const sites = result.blockedSites || [
            "facebook.com",
            "twitter.com",
            "instagram.com",
            "tiktok.com",
            "reddit.com",
            "linkedin.com",
            "pinterest.com",
            "snapchat.com",
            "youtube.com"
        ];
        
        // Create checkboxes for each site
        const siteList = document.getElementById('site-list');
        sites.forEach(site => {
            const li = document.createElement('li');
            li.className = 'site-item';
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'checkbox';
            checkbox.checked = true;
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
