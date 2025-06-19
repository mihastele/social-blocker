# Social Media Blocker

A browser extension that helps you stay focused by blocking access to social media websites. Compatible with both Chrome and Firefox.

## Features

- Block multiple social media websites
- Customize which sites to block
- Simple and intuitive interface
- Cross-browser compatibility (Chrome and Firefox)
- Persistent settings across browser sessions

## Installation

### For Chrome:
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `node build.js` to create the build files
4. Open Chrome and go to `chrome://extensions/`
5. Enable "Developer mode" in the top right corner
6. Click "Load unpacked" and select the `build/chrome` directory

### For Firefox:
1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `node build.js` to create the build files
4. Open Firefox and go to `about:debugging#/runtime/this-firefox`
5. Click "Load Temporary Add-on" and select `build/firefox/manifest.json`

> **Note**: For a permanent installation in Firefox, you'll need to package the extension and sign it with Mozilla Add-ons.

## Usage

1. Click on the extension icon in the Chrome toolbar
2. A popup will appear showing a list of social media sites
3. Check/uncheck the boxes next to each site to enable/disable blocking
4. Click "Save Settings" to apply your changes

## How it works

The extension intercepts navigation requests to social media websites using the browser's webRequest API. When a blocked site is accessed, the request is automatically cancelled.

- **Chrome**: Uses Manifest V3 with declarativeNetRequest for better performance
- **Firefox**: Uses Manifest V2 with webRequest API for compatibility

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