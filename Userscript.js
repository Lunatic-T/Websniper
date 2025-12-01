// ==UserScript==
// @name         websniper-cyberspace-update
// @namespace    http://tampermonkey.net/
// @version      1.2.5
// @description  hi, thanks for using my sniper <3, if you have issues dm me or join this server for more of my projects: discord.gg/7zuFCT8kYJ
// @author       .lunary. on dc (dms open)
// @match        https://discord.com/*
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @run-at       document-end
// ==/UserScript==

(async function() {
    'use strict';
    let dreamspaceenabled = true
    let cyberspaceenabled = true
    let glitchenabled = true
    let formattedRequiredG = [], formattedRequiredD = [], formattedRequiredC = [], formattedIgnoreKeywords = [], ignoreKeywords = [], requiredG = [], requiredD = [], requiredC = [];
    const audio = new Audio("put a .mp3 or any other form of audio link here (might have issues playing due to reaching to another site)"); // this is the sound that plays when a link is sniped

    // --- outer box (keep yours or replace with this) ---
    const box = document.createElement('div');
    box.id = 'logBox';
    Object.assign(box.style, {
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '600px',
      height: '250px',
      background: 'rgba(100, 100, 100, 0.5)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: '#FFF',
      fontFamily: 'monospace',
      fontSize: '12px',
      padding: '10px',
      border: '1px solid #FFF',
      borderRadius: '8px',
      zIndex: '999999',
      cursor: 'move',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box' // make padding count toward width/height
    });

    // --- top header row (title + buttons on one line) ---
    const headerRow = document.createElement('div');
    Object.assign(headerRow.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      gap: '8px',
      boxSizing: 'border-box'
    });

    // title (left side)
    const title = document.createElement('div');
    title.textContent = 'Debug Box';
    Object.assign(title.style, {
      padding: '5px 10px',
      cursor: 'default',
      userSelect: 'none',
      display: 'inline-block'
    });

    // buttons container (right side of header)
    const headerButtons = document.createElement('div');
    Object.assign(headerButtons.style, {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    });

    // create your toggle buttons (Gbutton, Dbutton, Cbutton) and clear
    const Gbutton = document.createElement('button');
    Gbutton.textContent = `glitch: ${glitchenabled}`;
    const Dbutton = document.createElement('button');
    Dbutton.textContent = `dreamspace: ${dreamspaceenabled}`;
    const Cbutton = document.createElement('button');
    Cbutton.textContent = `cyberspace: ${cyberspaceenabled}`;
    const clearbtn = document.createElement('button');
    clearbtn.textContent = 'clear logs';

    // uniform button styling
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
    Object.assign(Cbutton.style, buttonStyle);
    Object.assign(clearbtn.style, buttonStyle);
    Object.assign(title.style, buttonStyle);

    // append header stuff
    headerButtons.appendChild(Gbutton);
    headerButtons.appendChild(Dbutton);
    headerButtons.appendChild(Cbutton);
    headerButtons.appendChild(clearbtn);
    headerRow.appendChild(title);
    headerRow.appendChild(headerButtons);
    box.appendChild(headerRow);

    // small spacer if needed
    const spacer = document.createElement('div');
    spacer.style.height = '8px';
    box.appendChild(spacer);

    // --- log content area (flow child, not absolute) ---
    const logContent = document.createElement('div');
    Object.assign(logContent.style, {
      width: '100%',
      height: 'calc(100% - 40px)',
      padding: '6px 8px',
      boxSizing: 'border-box',
      overflowY: 'auto',
      color: '#FFF',
      fontFamily: 'monospace',
      fontSize: '12px',
      lineHeight: '1.2em',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    });
    box.appendChild(logContent);

    // optional: small footer row or status line
    const footer = document.createElement('div');
    Object.assign(footer.style, {
      marginTop: '6px',
      fontSize: '11px',
      opacity: '0.9',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    });

    // add to document
    document.body.appendChild(box);





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
    Cbutton.addEventListener('mouseenter', () => {
        Cbutton.style.background = 'rgba(100, 100, 100, 0.85)';
    });
    Cbutton.addEventListener('mouseleave', () => {
        Cbutton.style.background = 'rgba(80, 80, 80, 0.80)';
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

    Cbutton.addEventListener('click', () => {
        if (cyberspaceenabled) {cyberspaceenabled = false; logBox("No longer sniping cyberspace");} else {cyberspaceenabled = true; logBox("Sniping cyberspace");}
        Cbutton.textContent = `cyberspace: ${cyberspaceenabled}`;
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
    if (!cyberspaceenabled) {logBox("Cyberspace will not be sniped (cyberspaceenabled = false)"); return} else {logBox("Cyberspace will be sniped");}

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
               requiredC = json.requiredC
               ignoreKeywords = json.ignoreKeywords
               formattedRequiredG = formatKeywords(requiredG);
               formattedRequiredD = formatKeywords(requiredD);
               formattedRequiredC = formatKeywords(requiredC);
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
         let hasRequiredC = formattedRequiredC.some(keyword => textContent.includes(keyword.toLowerCase()));

         // Check for ignore keywords
         let hasIgnoreKeyword = formattedIgnoreKeywords.some(keyword => textContent.includes(keyword.toLowerCase()));

         // Detect individual keyword matches
         const matchedRequiredD = formattedRequiredD.filter(k => textContent.includes(k.toLowerCase()));
         const matchedRequiredG = formattedRequiredG.filter(k => textContent.includes(k.toLowerCase()));
         const matchedRequiredC = formattedRequiredC.filter(k => textContent.includes(k.toLowerCase()));

         const matchedIgnored = formattedIgnoreKeywords.filter(k => textContent.includes(k.toLowerCase()));

         if (matchedRequiredG.length === 0) {
             console.warn('Message skipped: missing required keywords.', { requiredKeywords: formattedRequiredG });
         }
         if (matchedRequiredD.length === 0) {
             console.warn('Message skipped: missing required keywords.', { requiredKeywords: formattedRequiredD });
         }
         if (matchedRequiredC.length === 0) {
             console.warn('Message skipped: missing required keywords.', { requiredKeywords: formattedRequiredC });
         }

         if (matchedIgnored.length > 0) {
             console.warn('Message skipped: contains ignored keywords.', { matchedIgnored });
         }

         if (!hasRequiredG && !hasRequiredD && !hasRequiredC || hasIgnoreKeyword || __checkpass__ || pleasewait) {
             console.log(messageReal);
             pleasewait = false
             return;
         }

         const links = messageReal.querySelectorAll('a');
         const robloxLinkRegex = /https:\/\/www\.roblox\.com\/(?:games\/\d+\/[^\s?]+(?:\?[^ ]*)?|share\?code=[a-z0-9]+[^ ]*)/i;

         const robloxLinks = Array.from(links).filter(link => robloxLinkRegex.test(link.href));
         if (robloxLinks.length === 1) {

             if (hasRequiredG) {
                 if (!glitchenabled) {logBox("ignored glitch because it is turned off"); return}
                 logBox("Glitch..?");
             } else if (hasRequiredC) {
                 if (!cyberspaceenabled) {logBox("ignored cyberspace because it is turned off"); return;}
                 logBox("Cyberspace..?");
             } else if (hasRequiredD) {
                 if (!dreamspaceenabled) {logBox("ignored dreamspace because it is turned off"); return;}
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
