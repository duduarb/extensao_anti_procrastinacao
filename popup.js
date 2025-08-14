document.addEventListener('DOMContentLoaded', () => {
  const siteInput = document.getElementById('siteInput');
  const addSiteBtn = document.getElementById('addSite');
  const siteList = document.getElementById('siteList');
  const messageInput = document.getElementById('customMessage');
  const saveMessageBtn = document.getElementById('saveMessage');

  // carregar a lista dos sites 
  chrome.storage.sync.get('blockedSites', (data) => {
    const blockedSites = data.blockedSites || [];
    renderList(blockedSites);
  });

  // aqui carrega a mensagem
  chrome.storage.sync.get('customBlockMessage', (data) => {
    messageInput.value = data.customBlockMessage || 'Vai estudar!';
  });

  saveMessageBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    chrome.storage.sync.set({ customBlockMessage: message }, () => {
      alert('Mensagem salva!');
    });
  });

  function renderList(sites) {
    siteList.innerHTML = '';
    sites.forEach((site, index) => {
      const li = document.createElement('li');
      li.textContent = site;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remover';
      removeBtn.className = 'removeBtn';
      removeBtn.addEventListener('click', () => {
        removeSite(index);
      });

      li.appendChild(removeBtn);
      siteList.appendChild(li);
    });
  }

  function removeSite(indexToRemove) {
    chrome.storage.sync.get('blockedSites', (data) => {
      const blockedSites = data.blockedSites || [];
      blockedSites.splice(indexToRemove, 1);
      chrome.storage.sync.set({ blockedSites }, () => {
        renderList(blockedSites);
      });
    });
  }

  addSiteBtn.addEventListener('click', () => {
    const site = siteInput.value.trim();
    if (site) {
      chrome.storage.sync.get('blockedSites', (data) => {
        const blockedSites = data.blockedSites || [];
        if (!blockedSites.includes(site)) {
          blockedSites.push(site);
          chrome.storage.sync.set({ blockedSites }, () => {
            renderList(blockedSites);
            siteInput.value = '';
          });
        } else {
          siteInput.value = '';
          alert('Este site já foi adicionado!');
        }
      });
    }
  });
});