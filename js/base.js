function getNode (e) {return document.querySelector(e);}
function consoleLog (e) {console.log(e);}
function hideNode (e) {e.style.display='none';}
function showFlexNode(e) {e.style.display='flex';}
function showBlockNode (e) {e.style.display='block';}
function nodeFlexVisible (e) {e.style.display=='flex';}
function nodeBlockVisible (e) {e.style.display=='block';}
function nodeHidden (e) {e.style.display=='none';}

// register a service worker
function registerServiceWorker () {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('sw.js')
				//.then((reg) => console.log('service worker registered', reg))
				.catch((err) => console.log('error registering a service worker', err));
		});
	}
}
registerServiceWorker();