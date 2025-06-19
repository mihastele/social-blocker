const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create build directories if they don't exist
const chromeDir = path.join(__dirname, 'build', 'chrome');
const firefoxDir = path.join(__dirname, 'build', 'firefox');

[chromeDir, firefoxDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Copy common files
const commonFiles = [
  'popup.html',
  'popup.js',
  'icons/'
];

// Copy files to Chrome build
commonFiles.forEach(file => {
  const source = path.join(__dirname, file);
  const dest = path.join(chromeDir, file);
  
  if (fs.lstatSync(source).isDirectory()) {
    copyFolderRecursiveSync(source, dest);
  } else {
    fs.copyFileSync(source, dest);
  }
});

// Copy Chrome manifest
fs.copyFileSync(
  path.join(__dirname, 'manifest.json'),
  path.join(chromeDir, 'manifest.json')
);

// Copy Chrome background script
fs.copyFileSync(
  path.join(__dirname, 'background.js'),
  path.join(chromeDir, 'background.js')
);

// Copy files to Firefox build
commonFiles.forEach(file => {
  const source = path.join(__dirname, file);
  const dest = path.join(firefoxDir, file);
  
  if (fs.lstatSync(source).isDirectory()) {
    copyFolderRecursiveSync(source, dest);
  } else {
    fs.copyFileSync(source, dest);
  }
});

// Copy Firefox manifest
fs.copyFileSync(
  path.join(__dirname, 'manifest.firefox.json'),
  path.join(firefoxDir, 'manifest.json')
);

// Copy Firefox background script
fs.copyFileSync(
  path.join(__dirname, 'background.firefox.js'),
  path.join(firefoxDir, 'background.js')
);

console.log('Build complete!');
console.log(`Chrome build: ${chromeDir}`);
console.log(`Firefox build: ${firefoxDir}`);

// Helper function to copy directories recursively
function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach(file => {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);
      
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}
