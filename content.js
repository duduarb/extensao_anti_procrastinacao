chrome.storage.sync.get(['blockedSites', 'customBlockMessage'], (data) => {
  const blockedSites = data.blockedSites || [];
  const customMessage = data.customBlockMessage || 'Vai estudar!';
  const currentUrl = window.location.hostname;

  if (blockedSites.some(site => currentUrl.includes(site))) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    overlay.style.color = 'white';
    overlay.style.fontSize = '50px';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '999999';

    overlay.textContent = customMessage;

    document.body.appendChild(overlay);
  }
});