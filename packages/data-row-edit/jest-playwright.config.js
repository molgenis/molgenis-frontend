// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
    browsers: ["chromium", "firefox", "webkit"],
    exitOnPageError: false, 
    launchOptions: {
      headless: true
    }
}