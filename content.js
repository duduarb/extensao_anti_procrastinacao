chrome.storage.sync.get('blockedSites', (data) => {
  const blockedSites = data.blockedSites || [];
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

    overlay.textContent = 'PARE AGORA DE PROCRASTINAR! Vai estudar seu safado!';

    document.body.appendChild(overlay);
  }
});