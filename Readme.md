# Social Media Blocker

A Chrome extension that helps you stay focused by blocking access to social media websites.

## Features

- Block multiple social media websites
- Customize which sites to block
- Simple and intuitive interface
- Uses Chrome's Manifest V3 for better performance

## Installation

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click on the extension icon in the Chrome toolbar
2. A popup will appear showing a list of social media sites
3. Check/uncheck the boxes next to each site to enable/disable blocking
4. Click "Save Settings" to apply your changes

## How it works

The extension uses Chrome's webRequest API to intercept navigation requests to social media websites. When a blocked site is accessed, the request is automatically cancelled.

## Supported Sites

- Facebook
- Twitter
- Instagram
- TikTok
- Reddit
- LinkedIn
- Pinterest
- Snapchat

## Contributing

Feel free to fork this repository and submit pull requests to add more features or improve existing functionality.

## License

This project is licensed under the MIT License - see the LICENSE file for details.