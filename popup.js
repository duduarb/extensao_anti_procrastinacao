document.addEventListener('DOMContentLoaded', () => {
  const siteInput = document.getElementById('siteInput');
  const addSiteBtn = document.getElementById('addSite');
  const siteList = document.getElementById('siteList');

  // função para renderizar a lista dos sites bloqeados
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

  // função para remover algum site da lista
  function removeSite(indexToRemove) {
    chrome.storage.sync.get('blockedSites', (data) => {
      const blockedSites = data.blockedSites || [];
      blockedSites.splice(indexToRemove, 1); // Remove 1 elemento a partir do índice
      chrome.storage.sync.set({blockedSites}, () => {
        renderList(blockedSites);
      });
    });
  }

  // carrega a lista de sites salvos ao abrir o pop-up
  chrome.storage.sync.get('blockedSites', (data) => {
    const blockedSites = data.blockedSites || [];
    renderList(blockedSites);
  });

  // adiciona um novo site
  addSiteBtn.addEventListener('click', () => {
    const site = siteInput.value.trim();
    if (site) {
      chrome.storage.sync.get('blockedSites', (data) => {
        const blockedSites = data.blockedSites || [];
        if (!blockedSites.includes(site)) { // verifica se o site já não está na lista
          blockedSites.push(site);
          chrome.storage.sync.set({blockedSites}, () => {
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