const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event fired');
    // Prevent the mini-infobar from appearing on mobile
    event.preventDefault();
    // Save the event for later (so we can trigger it manually)
    deferredPrompt = event;
    // Update UI to show the install button
    butInstall.style.display = 'block';
});

butInstall.addEventListener('click', async () => {
    console.log('Install button clicked');
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  }
});

window.addEventListener('appinstalled', (event) => {
  // Hide the install button after installation
  butInstall.style.display = 'none';
  console.log('PWA was installed');
});