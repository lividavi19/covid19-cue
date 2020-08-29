// get element(s) reference 
function getNode (e) {return document.querySelector(e);}
function getNodes (e) {return document.querySelectorAll(e);}
// log on the console
function consoleLog (e) {console.log(e)}
function consoleWarn (e) {console.warn(e)}
function consoleError (e) {console.error(e)}
// prepnd zero on number<10
function preppendZero (i) {return i<10 ? `0${i}` : i}
