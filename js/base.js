// get element(s) reference 
const getNode = (e) => {return document.querySelector(e);};
const getNodes = (e) => {return document.querySelectorAll(e);};;
// log on the console
const consoleLog = (e) => {console.log(e)};
const consoleWarn = (e) => {console.warn(e)};
const consoleError = (e) => {console.error(e)};
// prepnd zero on number<10
const preppendZero = (i) => {return i<10 ? `0${i}` : i};

// stting lents' textContent
const setText = (classNode, displayText) => {
    getNodes(`${classNode}`).forEach(node => {
        node.textContent = `${displayText}`;
    });
};