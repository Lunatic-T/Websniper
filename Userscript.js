// ==UserScript==
// @name         we snipe those..!!
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  by .lunary.
// @author       You
// @match        https://discord.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const dreamspaceenabled = true
    const glitchenabled = true
    const audio = new Audio("https://cdn.discordapp.com/attachments/1359827364560765070/1369249891339075594/yt1s.com_-_Vine_Boom_Sound_Effect.mp3?ex=681b2cd5&is=6819db55&hm=02081ecb280c759228d99ce5644e544cc404c249277752f50170a3ca8beeee63&"); // Change URL if desired
    audio.volume = 0.5; // Set volume (0.0 to 1.0)
        // Create console container
    // Create the log box UI
    const box = document.createElement('div');
    box.id = 'logBox';
    box.style.position = 'fixed';
    box.style.top = '10px';
    box.style.right = '10px';
    box.style.width = '700px';
    box.style.maxHeight = '300px';
    box.style.overflowY = 'auto';
    box.style.background = 'rgba(20, 20, 20, 0.95)';
    box.style.color = '#0f0';
    box.style.fontFamily = 'monospace';
    box.style.fontSize = '12px';
    box.style.padding = '10px';
    box.style.border = '1px solid #333';
    box.style.borderRadius = '8px';
    box.style.zIndex = '999999';
    box.style.cursor = 'move';
    box.innerHTML = '<strong>🟢 LogBox</strong><br>';
    document.body.appendChild(box);

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

    // Define the global logBox function
    function logBox(message) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-GB', { hour12: false });
        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
        const timestamp = `${time}.${milliseconds}`;
        const entry = document.createElement('div');
        entry.textContent = `[${timestamp}] ${message}`;
        box.appendChild(entry);
        box.scrollTop = box.scrollHeight;
    };

    // Initial message
    logBox('by .lunary.');
    // Store the set of processed message IDs
    let processedMessageIds = new Set();
    let deeelay = 25
    let pleasewait = true
    // Function to convert a share link to a deeplink
function convertToDeeplink(link) {
    logBox(`deeplink function`);

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



// List of required keywords (at least one must be present)
const requiredG= ["glich",
    "glith",
    "glitc",
    "glict",
    "glticj",
    "gltch",
    "gltc",
    "glth",
    "glch",
    "clitch",
    "glitch",
    "gliutch",
    "error",
    "eror",
    "errror",
    "glutch",
    "gl;itch",
    "glih",
    "6litch",
    "9litch",
    "gl1tch",
    "gl17ch",
    "glitxh",
    "gliotch",
    "GTILTJ",
    "gtiltj",
    "jkoin",
    "glitvh",
    "glit",
    "glotch",
    "G1ITC",
    "GFFLITCH",
    "GKITCH",
    "litch",
    "glithc",
    "glictch",
    "glicth",
    "glitchh",
    "gliych",
    "glichh",
    "gitch",
    "gich",
    "glitfh",
    "gluch",
    "glifch",
    "g,itch",
    "g.itch",
    "gkitch",
    "gkltich",
    "gkitchh",
    "gkitvh",
    "gklitch",
    "glktich",
    "gkltch",
    "glit",
    "itch",
    "gli",
    "gkit",
    "litc",
    "icth"
];

const requiredD = [
    "dream",
    "dreamscap",
    "dremscape",
    "deamscape",
    "dreamscape",
    "dream",
    "dreem",
    "dreemscape",
    "dreamscap",
    "dreamscape",
    "drem",
    "dremscape",
    "deamscape",
    "dremescap",
    "dramscape",
    "dreaspace",
    "dreamspac",
    "dreamspcae",
    "dreamscae",
    "dremspace",
    "dremspae",
    "dremspac",
    "dramscap",
    "deemscape",
    "dreanscape",
    "dremmscape",
    "dreamsapce",
    "dreamspaec",
    "dre4mscape",
    "dre@mscape",
    "dreamscrape",
    "dremsapce",
    "dr34msc4pe",
    "pink"
];

// List of ignore keywords (if any are present, skip the message)
const ignoreKeywords = ["hunt",
    "https://www.roblox.com/share?code=9d338173d1319d46843707848ac6e0d0&type=Server",
    "hear",
    "try",
    "lf",
    "look",
    "pls",
    "please",
    "gif",
    "tenor",
    "need",
    "want",
    "bait",
    "not<space>a",
    "totally",
    "pop",
    "isnt",
    "isn't",
    "giv",
    "dm",
    "wait",
    "next",
    "no<space>glitch",
    "pay",
    "no<space>jester",
    "lucky",
    "cant<space>join",
    "spawning<space>soon",
    "had",
    "guaranteed",
    "if<space>we<space>get",
    "giving",
    "luck<space>server",
    "help",
    "flex",
    "using",
    "farm",
    "post",
    "saw",
    "lets<space>cook",
    "never",
    "was",
    "last",
    "soon",
    "where",
    "when",
    "gamepass",
    "gift",
    "skibidi",
    "rizz",
    "havent",
    "haven't",
    "search",
    "jk",
    "find",
    "aura",
    "doesnt",
    "doesn't",
    "surfer",
    "cult",
    "gyat",
    "garg",
    "biome<space>random",
    "gang",
    "hoping",
    "hope",
    "summon",
    "glitch<space>biome<space>soon",
    "alpha",
    "beta",
    "ping",
    "era",
    "ignore",
    "suffer",
    "cost",
    "arua",
    "areua",
    "protest",
    "any<space>real",
    "msg",
    "lemme<space>get",
    "anyone",
    "anybody",
    "maybe",
    "sovereign",
    "ago",
    "opression",
    "oppresion",
    "who",
    "why",
    "miss",
    "is<space>easy",
    "message",
    "gimmie",
    "spotted<space>the<space>sol",
    "begging",
    "streaming",
    "has<space>there<space>been",
    "depression",
    "you<space>do<space>not<space>have",
    "you<space>dont<space>have",
    "might",
    "at<space>this<space>point",
    "opening",
    "chat",
    "send<space>me",
    "staring",
    "if<space>i<space>dont<space>get<space>a",
    "any<space>one",
    "if<space>someone<space>says",
    "in<space>the<space>bag",
    "the<space>server<space>below",
    "ain't<space>ever",
    "pleaze",
    "bug",
    "if<space>i<space>get",
    "father",
    "possible",
    "how<space>long<space>till",
    "how<space>long<space>untill",
    "if<space>i<space>dont<space>get",
    "if<space>i<space>don't<space>get",
    "care",
    "beg",
    "imaginary",
    "going<space>to<space>use",
    "fake<space>glitch",
    "neeed",
    "fake",
    "pray",
    "profile",
    "gate",
    "no<space>more",
    "report",
    "without<space>g",
    "memories",
    "job",
    "error<space>code",
    "didn't",
    "not",
    "ask",
    "gimme",
    "br<space>or<space>sc",
    "long<space>gone",
    "talk<space>and<space>chill",
    "random<space>link",
    "random",
    "ty<space>for",
    "eyes",
    "hanting",
    "if<space>you<space>have",
    "if<space>u<space>have",
    "pwease",
    "appears",
    "someone<space>get",
    "watching",
    "superstar",
    "someone<space>tell",
    "gonna<space>use",
    "pulled",
    "fixed",
    "ban",
    "faking",
    "click",
    "mroe",
    "faek",
    "tysm",
    "lied",
    "lying",
    "pliz",
    "feel",
    "stfu",
    "children",
    "rolls",
    "rune<space>biome",
    "dual",
    "sc<space>or<space>br",
    "jester<space>chance",
    "prob<space>a<space>glitch",
    "if<space>your<space>server",
    "queue",
    "witness",
    "thank",
    "send<space>glitch",
    "doing",
    "jester?",
    "hello",
    "hi",
    "test",
    "wrong",
    "watting",
    "ebddf98b67ed234591faf27f60fc1173",
    "waiting",
    "sailor",
    "screen",
    "overshoot",
    "slick",
    "wanna",
    "don\u2019t<space>join",
    "d351817a9ecca94990239e27102bf9dc",
    "1adeeadc16713a4999a9d34f1ead0cf1",
    "ples",
    "scam",
    "plis",
    "not<space>here",
    "bailt",
    "bot",
    "0714c5687555f64f84eb7d224f014803",
    "66e2cc4cebf4464786f210c6b2f42d53",
    "(n0/t<space>real[ly)",
    "fuck",
    "macro",
    "wont",
    "super<space>star",
    "stigma",
    "spotted<space>the<space>sol",
    "told<space>me",
    "fek",
    "https://www.roblox.com/share?code=5dcdf8d9222a0d45bba71c8c55d2471e&type=Server",
    "global",
    "gear<space>a",
    "gear<space>b",
    "same<space>link",
    "glitter",
    "glitch?",
    "dm me",
    "hunting",
    "repost",
    "lucky",
    "any",
    "corruption",
    "hell",
    "snow",
    "rain",
    "null",
    "normal",
    "wind",
    "starfall",
    "luck",
    "stacked",
    "oppression",
    "memory",
    "oblivion",
    "candle",
    "react",
    "lose",
    "how<space>many",
    "what",
    "dutchman",
    "instead<space>of",
    "any<space>glitch",
    "history",
    "text",
    "abyssal",
    "seen",
    "sandstorm",
    "sand<space>storm",
    "jester",
    "rich",
    "haven\u2019t",
    "spam",
    "animations",
    "even",
    "TYSM",
    "RADIANT",
    "global",
    "cooked",
    "dont<space>join",
    "script",
    "hack",
    "make",
    "gone",
    "just<space>kidding",
    "Js<space>kidding",
    "jst<space>kidding",
    "trade",
    "trading",
    "ritual",
    "pinch",
    "developers",
    "stop",
    "orange",
    "astraldi",
    "astrald",
    "asstrald",
    "hi",
    "ended",
    "wild",
    "double",
    "sniper",
    "graveyard",
    "grave",
    "hallaween",
    "failed",
    "afk",
    "quest",
    "lately",
    "since",
    "manifestation",
    "present",
    "transpire",
    "riany",
    "pumpkin",
    "chances",
    "chance",
    "someone<space>got",
    "dont<space>deserve",
    "pleez",
    "dupe",
    "pump",
    "wen",
    "not<space>glitch",
    "bailt",
    "andrord",
    "nick",
    "android",
    "can<space>someone<space>send",
    "slide",
    "yard",
    "dumbass",
    "strange<space>controller",
    "biome<space>randomizer",
    "archangel",
    "got<space>in<space>glitch",
    "use<space>in<space>glitch",
    "snipes",
    "s1",
    "s2",
    "bloodlust",
    "NO",
    "nighttime",
    "real<space>glitch?",
    "owner",
    "beit",
    "||not||",
    "spelt",
    "change",
    "position",
    "not",
    "is<space>there",
    "lie",
    "clitch",
    "method",
    "impeached",
    "leave",
    "grinding",
    "(no)",
    "snipe",
    "cycling",
    "nvm",
    "so",
    "memmy",
    "had",
    "wont",
    "dawg",
    "aint",
    "totally",
    "badge",
    "amount",
    "general",
    ">",
    "glitch?",
    "is not",
    "shorturl",
    "snitch"
];
const formatKeywords = (keywords) => keywords.map(keyword => keyword.replace(/<space>/g, ' '));

// Apply the formatting to both lists
const formattedRequiredD = formatKeywords(requiredD);
const formattedRequiredG = formatKeywords(requiredG);

const formattedIgnoreKeywords = formatKeywords(ignoreKeywords);
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
    const hasRequiredD = formattedRequiredD.some(keyword => textContent.includes(keyword.toLowerCase()));
    const hasRequiredG = formattedRequiredG.some(keyword => textContent.includes(keyword.toLowerCase()));

    // Check for ignore keywords
    const hasIgnoreKeyword = formattedIgnoreKeywords.some(keyword => textContent.includes(keyword.toLowerCase()));

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

    if (!hasRequiredG || !hasRequiredD || hasIgnoreKeyword || __checkpass__ || pleasewait) {
        console.log(messageReal);
        pleasewait = false
        return;
    }

    if (hasRequiredG) {
        if (!glitchenabled) return;
        logBox("Glitch..?");
    }
    if (hasRequiredD) {
        if (!dreamspaceenabled) return;
        logBox("Dreamspace..?");
    }

    const links = messageReal.querySelectorAll('a');
    const robloxLinkRegex = /https:\/\/www\.roblox\.com\/(?:games\/\d+\/[^\s?]+(?:\?[^ ]*)?|share\?code=[a-z0-9]+[^ ]*)/i;

    const robloxLinks = Array.from(links).filter(link => robloxLinkRegex.test(link.href));
    if (robloxLinks.length === 1) {
        logBox("DETECTED LINK");
        if (hasRequiredG) {
            if (!glitchenabled) return;
            logBox("Glitch..?");
        }
        if (hasRequiredD) {
            if (!dreamspaceenabled) return;
            logBox("Dreamspace..?");
        }
        __checkpass__ = true
        const originalLink = robloxLinks[0].href;
        const deeplink = convertToDeeplink(originalLink);
        if (deeplink) {
            robloxLinks[0].href = deeplink;
            robloxLinks[0].textContent = deeplink;
            window.open(deeplink, '_self');
            logBox(`launched "${deeplink}"`);
            audio.play().catch(err => {
            console.warn("Sound playback failed (usually due to browser autoplay policy):", err);
            });
            setTimeout(() => {
                 __checkpass__ = false
            }, 3000);
        }
    }
}


    // Continuously check for the latest message every 50ms
    setInterval(processLatestMessage, deeelay); // Check the latest message every 50ms
})();
