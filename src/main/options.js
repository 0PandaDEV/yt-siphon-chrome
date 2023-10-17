document.getElementById('save').addEventListener('click', function() {
  const frontendUrl = document.getElementById('frontendUrl').value;
  chrome.storage.sync.set({ 'frontendUrl': frontendUrl });
});

// Load any previously saved frontend URL
chrome.storage.sync.get(['frontendUrl'], function(data) {
  if (data.frontendUrl) {
    document.getElementById('frontendUrl').value = data.frontendUrl;
  }
});

// Save state
document.getElementById('save').addEventListener('click', function() {
  const frontendUrl = document.getElementById('frontendUrl').value;
  const instantRedirect = document.getElementById('instantRedirect').checked;
  chrome.storage.sync.set({ 'frontendUrl': frontendUrl, 'instantRedirect': instantRedirect }, function() {
    alert('Settings saved!');
  });
});

// Load state
chrome.storage.sync.get(['frontendUrl', 'instantRedirect'], function(data) {
  if (data.frontendUrl) {
    document.getElementById('frontendUrl').value = data.frontendUrl;
  }
  if (data.instantRedirect !== undefined) {
    document.getElementById('instantRedirect').checked = data.instantRedirect;
  }
});