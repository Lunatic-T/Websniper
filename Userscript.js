// ==UserScript==
// @name         websniper-cyberspace-update
// @namespace    http://tampermonkey.net/
// @version      1.2.5 - bug fixes
// @description  hi, thanks for using my sniper <3, if you have issues dm me or join this server for updates: discord.gg/7zuFCT8kYJ
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
      zIndex: '9999999999999999999999999999999999999999999999',
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
        const messageContainer = document.querySelector('ol[role="list"]');

        if (!messageContainer) return;

        const messages = messageContainer.querySelectorAll('li[class*="messageListItem"]');
        if (!messages || messages.length === 0) return;
        const latestMessage = messages[messages.length - 1];
        if (!latestMessage) return;

        let messageReal = latestMessage.querySelector('[id^="message-content-"]');
        if (!messageReal) {
            // fallback: find any div that contains a roblox link text
            const allDivs = latestMessage.querySelectorAll('div');
            for (const div of allDivs) {
                if (div.textContent && div.textContent.toLowerCase().includes('roblox.com')) {
                    messageReal = div;
                    break;
                }
            }
        }
        if (!messageReal) {
            console.error('Message content not found for latest message');
            return;
        }

        // Use a stable identifier for the message. If data-list-item-id missing, use element reference
        let messageId = latestMessage.querySelector('[data-list-item-id]')?.getAttribute('data-list-item-id');
        let useElementKey = false;
        if (!messageId) {
            // fallback key — this will be unique per DOM node instance
            messageId = 'el-' + (latestMessage.__snId || (latestMessage.__snId = Math.random().toString(36).slice(2)));
            useElementKey = true;
        }

        // If we've already fully processed this message, skip
        if (processedMessageIds.has(messageId)) {
            //console.debug('Already processed messageId', messageId);
            return;
        }

        const textContent = messageReal.textContent.toLowerCase();

        // keyword checks
        let hasRequiredD = formattedRequiredD.some(keyword => keyword && textContent.includes(keyword.toLowerCase()));
        let hasRequiredG = formattedRequiredG.some(keyword => keyword && textContent.includes(keyword.toLowerCase()));
        let hasRequiredC = formattedRequiredC.some(keyword => keyword && textContent.includes(keyword.toLowerCase()));
        let hasIgnoreKeyword = formattedIgnoreKeywords.some(keyword => keyword && textContent.includes(keyword.toLowerCase()));

        const matchedRequiredD = formattedRequiredD.filter(k => k && textContent.includes(k.toLowerCase()));
        const matchedRequiredG = formattedRequiredG.filter(k => k && textContent.includes(k.toLowerCase()));
        const matchedRequiredC = formattedRequiredC.filter(k => k && textContent.includes(k.toLowerCase()));
        const matchedIgnored = formattedIgnoreKeywords.filter(k => k && textContent.includes(k.toLowerCase()));
         if (matchedIgnored.length > 0) {
             console.warn('Message skipped: contains ignored keywords.', { matchedIgnored });
         }

        // Debug warnings (keeps you informed)
        if (matchedRequiredG.length === 0) console.warn('No requiredG found in message', { matchedRequiredG });
        if (matchedRequiredD.length === 0) console.warn('No requiredD found in message', { matchedRequiredD });
        if (matchedRequiredC.length === 0) console.warn('No requiredC found in message', { matchedRequiredC });
        if (matchedIgnored.length > 0) console.warn('Message contains ignored keywords', { matchedIgnored });

        // MAIN gating condition:
        // require at least one of the groups (G or D or C), and reject if ignore matched or a global checkpass lock is enabled
        if ((!hasRequiredG && !hasRequiredD && !hasRequiredC) || hasIgnoreKeyword || __checkpass__ || pleasewait) {
            // Do not mark as fully processed if pleasewait or temporary condition -- allow re-check later
            // Only mark as processed if it contains ignore keywords (we will never process these) to avoid re-checking forever:
            if (hasIgnoreKeyword) {
                processedMessageIds.add(messageId); // never process ignored messages again
            }
            // If it's a one-off temporary skip (pleasewait/__checkpass__), do not add to processedMessageIds so it will be retried
            console.debug('Skipping message for now (gating/ignore/lock):', { hasRequiredG, hasRequiredD, hasRequiredC, hasIgnoreKeyword, __checkpass__, pleasewait, messageId });
            // ensure pleasewait is false so it won't permanently block future messages (if you intentionally wanted a cooldown, handle separately)
            pleasewait = false;
            return;
        }

        // find roblox link anchors inside message
        const links = messageReal.querySelectorAll('a[href]');
        // improved permissive roblox regex (handles long codes, query params)
        const robloxLinkRegex = /https?:\/\/(?:www\.)?roblox\.com\/(?:games\/\d+\/[^\s?\/]+(?:\?[^ \s]*)?|share\?code=[A-Za-z0-9_-]+)/i;
        const robloxLinks = Array.from(links).filter(link => robloxLinkRegex.test(link.href));

        if (robloxLinks.length === 0) {
            // no link found — mark as processed to avoid infinite retries
            processedMessageIds.add(messageId);
            console.debug('No roblox links found in latest message; marking processed', messageId);
            return;
        }

        // only handle single-link messages (keeps behavior consistent)
        if (robloxLinks.length === 1) {
            // decide which mode from matched keywords
            if (hasRequiredG && !glitchenabled) { logBox("ignored glitch because it is turned off"); processedMessageIds.add(messageId); return; }
            if (hasRequiredC && !cyberspaceenabled) { logBox("ignored cyberspace because it is turned off"); processedMessageIds.add(messageId); return; }
            if (hasRequiredD && !dreamspaceenabled) { logBox("ignored dreamspace because it is turned off"); processedMessageIds.add(messageId); return; }

            // OK, process it
            __checkpass__ = true;
            const originalLink = robloxLinks[0].href;

            // improved convertToDeeplink: use more permissive capture for code
            const convertToDeeplinkImproved = (link) => {
                const shareRegex = /https?:\/\/(?:www\.)?roblox\.com\/share\?code=([^&\s]+)/i;
                const gamesRegex = /https?:\/\/(?:www\.)?roblox\.com\/games\/(\d+)\/[^\s?]+(?:\?[^ ]*privateServerLinkCode=([^&\s]+))?/i;
                let m = link.match(shareRegex);
                if (m) return `roblox://navigation/share_links?code=${m[1]}&type=Server&pid=share&is_retargeting=true`;
                m = link.match(gamesRegex);
                if (m) {
                    const placeId = m[1];
                    const linkCode = m[2] || '';
                    return linkCode ? `roblox://placeID=${placeId}&linkCode=${linkCode}` : `roblox://placeID=${placeId}`;
                }
                return null;
            };

            const deeplink = convertToDeeplinkImproved(originalLink);
            if (deeplink) {
                // rewrite and launch
                robloxLinks[0].href = deeplink;
                robloxLinks[0].textContent = deeplink;
                // open in client (multiple opens as in your code)
                window.open(deeplink, '_self');
                logBox(`Launched in client`);
                audio.play().catch(err => console.warn("Audio failed:", err));
                // mark message as processed so we don't reopen it again
                processedMessageIds.add(messageId);
                // short cooldown before allowing another processed message
                setTimeout(() => { __checkpass__ = false; }, 3000);
                return;
            } else {
                console.error('Failed to convert link to deeplink:', originalLink);
                // mark processed so we don't spam
                processedMessageIds.add(messageId);
                __checkpass__ = false;
                return;
            }
        } else {
            // multiple links - skip and mark processed
            processedMessageIds.add(messageId);
            console.debug('Multiple roblox links found; skipping', messageId);
            return;
        }
    }
    init();
})();
