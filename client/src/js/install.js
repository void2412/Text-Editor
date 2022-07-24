const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
	window.deferredPrompt = event;
	
});

butInstall.addEventListener('click', async () => {
	const promptEvent = window.deferredPrompt;

  	if (!promptEvent) {
   		return;
  	}

	promptEvent.prompt();

  	window.deferredPrompt = null;
});

window.addEventListener('appinstalled', (event) => {
	window.deferredPrompt = null
});
