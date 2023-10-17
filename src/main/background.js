const YOUTUBE_HOSTNAME = 'www.youtube.com';
const DEFAULT_FRONTEND_URL = 'piped.video';
const YOUTUBE_VIDEO_PATH = '/watch';

chrome.storage.sync.get(['frontendUrl'], function(data) {
  if (!data || !data.frontendUrl) {
    chrome.storage.sync.set({ 'frontendUrl': DEFAULT_FRONTEND_URL });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    let url = new URL(tab.url);
    if (url.hostname === YOUTUBE_HOSTNAME && url.pathname.startsWith(YOUTUBE_VIDEO_PATH)) {
      chrome.storage.sync.get(['frontendUrl', 'instantRedirect'], function(data) {
        if (data.instantRedirect) {
          let frontend = data.frontendUrl;
          let newUrl = tab.url.replace(YOUTUBE_HOSTNAME, frontend);
          chrome.tabs.update(tabId, { url: newUrl });
        }
      });
    }
  }
});

chrome.commands.onCommand.addListener(function(command) {
  if (command === 'open_alt_frontend') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let url = new URL(tabs[0].url);
      if (url.hostname === YOUTUBE_HOSTNAME && url.pathname.startsWith(YOUTUBE_VIDEO_PATH)) {
        chrome.storage.sync.get(['frontendUrl', 'instantRedirect'], function(data) {
          if (!data.instantRedirect && data.frontendUrl) {
            let frontend = data.frontendUrl;
            let newUrl = tabs[0].url.replace(YOUTUBE_HOSTNAME, frontend);
            chrome.tabs.update(tabs[0].id, { url: newUrl });
          }
        });
      }
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: 'main/options.html' });
});