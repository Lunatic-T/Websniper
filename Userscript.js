// ==UserScript==
// @name         we snipe those..!!
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  by .lunary.
// @author       You
// @match        https://discord.com/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @run-at       document-end
// ==/UserScript==

(async function() {
    'use strict';
    let dreamspaceenabled = true
    let glitchenabled = true
    let formattedRequiredG = [], formattedRequiredD = [], formattedIgnoreKeywords = [], ignoreKeywords = [], requiredG = [], requiredD = [];
    const audio = new Audio("put a .mp3 or any other form of audio link here (might have issues playing due to reaching to another site)"); // this is the sound that plays when a link is sniped

    const box = document.createElement('div');
    box.id = 'logBox';
    box.style.position = 'fixed';
    box.style.top = '10px';
    box.style.right = '10px';
    box.style.width = '500px';
    box.style.height = '200px'; 
    box.style.background = 'rgba(100, 100, 100, 0.5)';
    box.style.backdropFilter = 'blur(8px)';
    box.style.webkitBackdropFilter = 'blur(8px)';
    box.style.color = '#FFF';
    box.style.fontFamily = 'monospace';
    box.style.fontSize = '12px';
    box.style.padding = '10px';
    box.style.border = '1px solid #FFF';
    box.style.borderRadius = '8px';
    box.style.zIndex = '999999';
    box.style.cursor = 'move';
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    
    const title = document.createElement('button');
    title.textContent = 'Debug Box';
    title.style.padding = '5px 10px';
    title.style.setProperty('cursor', 'default', 'important');

    const titleheader = document.createElement('div');
    titleheader.style.position = 'absolute';
    titleheader.style.top = '10px';
    titleheader.style.left = '10px';
    titleheader.style.display = 'flex';
    titleheader.style.gap = '10px';

    box.appendChild(titleheader);
    titleheader.appendChild(title);

    const logContent = document.createElement('div');
    logContent.style.width = '400px';
    logContent.style.height = '175px'; // less tall
    logContent.style.paddingBottom = '6px'; // bottom padding so last text isn’t cut off
    logContent.style.boxSizing = 'border-box'; // include padding in height
    logContent.style.overflowY = 'auto';
    logContent.style.color = '#FFF';
    logContent.style.fontFamily = 'monospace';
    logContent.style.fontSize = '12px';
    logContent.style.lineHeight = '1.2em'; // adjust line height if needed
    logContent.style.display = 'flex';
    logContent.style.flexDirection = 'column';
    logContent.style.zIndex = '999999';
    logContent.style.position = 'absolute';
    logContent.style.top = '40px';
    logContent.style.right = '110px';

    box.appendChild(document.createElement('br'));

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.position = 'absolute';
    buttonsContainer.style.top = '10px';
    buttonsContainer.style.right = '10px';
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.gap = '10px';

    const Gbutton = document.createElement('button');
    Gbutton.textContent = `glitch: ${glitchenabled}`;
    Gbutton.style.padding = '5px 10px';

    const Dbutton = document.createElement('button');
    Dbutton.textContent = `dreamspace: ${dreamspaceenabled}`;
    Dbutton.style.padding = '5px 10px';

    const clearbtn = document.createElement('button');
    clearbtn.textContent = 'clear logs';
    clearbtn.style.padding = '5px 10px';

    box.appendChild(logContent);
    buttonsContainer.appendChild(Gbutton);
    buttonsContainer.appendChild(Dbutton);
    buttonsContainer.appendChild(clearbtn);
    box.appendChild(buttonsContainer);
    document.body.appendChild(box);
    const buttonStyle = {
        background: 'rgba(80, 80, 80, 0.80)',
        color: '#FFF',
        fontFamily: 'monospace',
        fontSize: '12px',
        border: '1px solid #FFF',
        borderRadius: '8px',
        padding: '5px 10px',
        userSelect: 'none',
    };
    Object.assign(Gbutton.style, buttonStyle);
    Object.assign(Dbutton.style, buttonStyle);
    Object.assign(clearbtn.style, buttonStyle);
    Object.assign(title.style, buttonStyle);




    Gbutton.addEventListener('mouseenter', () => {
        Gbutton.style.background = 'rgba(100, 100, 100, 0.85)';
    });
    Gbutton.addEventListener('mouseleave', () => {
        Gbutton.style.background = 'rgba(80, 80, 80, 0.80)';
    });
    Dbutton.addEventListener('mouseenter', () => {
        Dbutton.style.background = 'rgba(100, 100, 100, 0.85)';
    });
    Dbutton.addEventListener('mouseleave', () => {
        Dbutton.style.background = 'rgba(80, 80, 80, 0.80)';
    });
    clearbtn.addEventListener('mouseenter', () => {
        clearbtn.style.background = 'rgba(100, 100, 100, 0.85)';
    });
    clearbtn.addEventListener('mouseleave', () => {
        clearbtn.style.background = 'rgba(80, 80, 80, 0.80)';
    });

    // Make it draggable
    let dragging = false, offsetX = 0, offsetY = 0;
    box.addEventListener('mousedown', (e) => {
        dragging = true;
        offsetX = e.clientX - box.getBoundingClientRect().left;
        offsetY = e.clientY - box.getBoundingClientRect().top;
        e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
        if (dragging) {
            box.style.left = (e.clientX - offsetX) + 'px';
            box.style.top = (e.clientY - offsetY) + 'px';
            box.style.right = 'auto';
        }
    });
    document.addEventListener('mouseup', () => {
        dragging = false;
    });

    function logBox(message) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-GB', { hour12: false });
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
        const timestamp = `${time}.${milliseconds}`;
        const entry = document.createElement('div');
        entry.textContent = `[${timestamp}] ${message}`;
        logContent.appendChild(entry);
        logContent.scrollTop = logContent.scrollHeight;
    };

    Gbutton.addEventListener('click', () => {
        if (glitchenabled) {glitchenabled = false; logBox("No longer sniping glitch")} else {glitchenabled = true; logBox("Sniping glitch");}
        Gbutton.textContent = `glitch: ${glitchenabled}`;
    });

    Dbutton.addEventListener('click', () => {
        if (dreamspaceenabled) {dreamspaceenabled = false; logBox("No longer sniping dreamspace");} else {dreamspaceenabled = true; logBox("Sniping dreamspace");}
        Dbutton.textContent = `dreamspace: ${dreamspaceenabled}`;
    });

    clearbtn.addEventListener('click', () => {
        logContent.innerHTML = '';
    });

    function fetchJSON(url) {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url: url,
          headers: {
            "Accept": "application/json"
          },
          onload: function(response) {
            if (response.status >= 200 && response.status < 300) {
              try {
                const data = JSON.parse(response.responseText);
                resolve(data);
              } catch (e) {
                reject(new Error("Failed to parse JSON"));
              }
            } else {
              reject(new Error(`HTTP error! status: ${response.status}`));
            }
          },
          onerror: function(err) {
            reject(new Error("Network error"));
          }
        });
      });
    }

    logBox('by .lunary.');
    if (!glitchenabled) {logBox("Glitch will not be sniped (glitchenabled = false)"); return} else {logBox("Glitch will be sniped");}
    if (!dreamspaceenabled) {logBox("Dreamspace will not be sniped (dreamspaceenabled = false)"); return} else {logBox("Dreamspace will be sniped");}

    // get keyword list (took so long bro i suck at this)
    let processedMessageIds = new Set();
    let deeelay = 25
    let pleasewait = true

    function convertToDeeplink(link) {
         const regex = /https:\/\/www\.roblox\.com\/share\?code=([a-zA-Z0-9]+)/;
         const regex2 = /https:\/\/www\.roblox\.com\/games\/15532962292\/[^\s?]+(?:\?privateServerLinkCode=([a-zA-Z0-9]+))?/;
         const match = link.match(regex);
         const match2 = link.match(regex2);
         if (match) {
             const accessCode = match[1];
             const deeplink = `roblox://navigation/share_links?code=${accessCode}&type=Server&pid=share&is_retargeting=true`;
             logBox(`Converted`);
             return deeplink;
         }
         if (match2) {
             const accessCode2 = match2[1];
             const deeplink2 = `roblox://placeID=15532962292&linkCode=${accessCode2}`;
             logBox(`Converted`);
             return deeplink2;
         }
         logBox(`Invalid: ${link}`);
         return null;
     }
     const formatKeywords = (keywords) => keywords.map(keyword => keyword.replace(/<space>/g, ' '));
       async function init() {
           try {
               const json = await fetchJSON('https://raw.githubusercontent.com/Lunatic-T/Websniper/main/Keywords.json');
               logBox('fetched keyword data');
               requiredD = json.requiredD
               requiredG = json.requiredG
               ignoreKeywords = json.ignoreKeywords
               formattedRequiredG = formatKeywords(requiredG);
               formattedRequiredD = formatKeywords(requiredD);
               formattedIgnoreKeywords = formatKeywords(ignoreKeywords);

               setInterval(processLatestMessage, deeelay);
           } catch(e) {
               console.error("Failed to fetch JSON:", e);
               logBox("Error fetching keywords, aborting.");
           }
       }
     let __checkpass__ = false
         // Function to process and click only the latest message
     function processLatestMessage() {
         const messageContainer = document.querySelector('[class*="scrollerInner_"]');
         if (!messageContainer) return;

         const messages = messageContainer.querySelectorAll('[class^="message_"]');
         const latestMessage = messages[messages.length - 1];
         if (!latestMessage) return;
         let messageReal = latestMessage.querySelector('[class*="messageContent"]');
         if (!messageReal) {
             // Try fallback: look for any div with text inside
             const allDivs = latestMessage.querySelectorAll('div');
             for (const div of allDivs) {
                 if (div.textContent && div.textContent.includes('roblox.com')) {
                     messageReal = div;
                     break;
                 }
             }
         }

         if (!messageReal) {
             console.error('Message content not found');
             return;
         }
         const messageId = latestMessage.getAttribute('data-list-item-id');
         if (processedMessageIds.has(messageId)) return;
         processedMessageIds.add(messageId);

         const textContent = messageReal.textContent.toLowerCase();
         // Check for required keywords

         let hasRequiredD = formattedRequiredD.some(keyword => textContent.includes(keyword.toLowerCase()));
         let hasRequiredG = formattedRequiredG.some(keyword => textContent.includes(keyword.toLowerCase()));

         // Check for ignore keywords
         let hasIgnoreKeyword = formattedIgnoreKeywords.some(keyword => textContent.includes(keyword.toLowerCase()));

         // Detect individual keyword matches
         const matchedRequiredD = formattedRequiredD.filter(k => textContent.includes(k.toLowerCase()));
         const matchedRequiredG = formattedRequiredG.filter(k => textContent.includes(k.toLowerCase()));

         const matchedIgnored = formattedIgnoreKeywords.filter(k => textContent.includes(k.toLowerCase()));

         if (matchedRequiredG.length === 0) {
             console.warn('Message skipped: missing required keywords.', { requiredKeywords: formattedRequiredG });
         }
         if (matchedRequiredD.length === 0) {
             console.warn('Message skipped: missing required keywords.', { requiredKeywords: formattedRequiredD });
         }

         if (matchedIgnored.length > 0) {
             console.warn('Message skipped: contains ignored keywords.', { matchedIgnored });
         }

         if (!hasRequiredG && !hasRequiredD || hasIgnoreKeyword || __checkpass__ || pleasewait) {
             console.log(messageReal);
             pleasewait = false
             return;
         }

         const links = messageReal.querySelectorAll('a');
         const robloxLinkRegex = /https:\/\/www\.roblox\.com\/(?:games\/\d+\/[^\s?]+(?:\?[^ ]*)?|share\?code=[a-z0-9]+[^ ]*)/i;

         const robloxLinks = Array.from(links).filter(link => robloxLinkRegex.test(link.href));
         if (robloxLinks.length === 1) {
             if (hasRequiredG) {
                 if (!glitchenabled) {logBox("ignored glitch"); return}
                 logBox("Glitch..?");
             }
             if (hasRequiredD) {
                 if (!dreamspaceenabled) {logBox("ignored dreamspace"); return;}
                 logBox("Dreamspace..?");
             }
             __checkpass__ = true
             const originalLink = robloxLinks[0].href;
             const deeplink = convertToDeeplink(originalLink);
             if (deeplink) {
                 robloxLinks[0].href = deeplink;
                 robloxLinks[0].textContent = deeplink;
                 window.open(deeplink, '_self');
                 window.open(deeplink, '_self');
                 window.open(deeplink, '_self');
                 logBox(`Launched in client`)
                 audio.play().catch(err => {
                 console.warn("Sound playback failed (usually due to browser autoplay policy):", err);
                 });
                 setTimeout(() => {
                      __checkpass__ = false
                 }, 3000);
             }
         }
     }
    init();
})();
