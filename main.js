let activeVoice = localStorage.getItem('userVoicePreference') || 'usa-female';

const splash = document.getElementById('splash-container');
const wallet = document.querySelector('.apex-wallet'); 
const selector = document.getElementById('voice-selector');
const buttons = document.querySelectorAll('.spatial-btn');



// --- HELPER FUNCTIONS ---
const loginVoicePath = "audio/british-male";

function announceWithVoice(text) {
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1.1;
    window.speechSynthesis.speak(msg);
}

function playLoginAudio(el) {
    // Assuming playLoginAudio logic exists or use this:
    if (window.currentAudio) window.currentAudio.pause();
    const label = el.getAttribute('data-label') || 'input';
    window.currentAudio = new Audio(`${loginVoicePath}/${label}.mp3`);
    window.currentAudio.load();
    window.currentAudio.play().catch(e => console.log("Audio play blocked"));
}

// --- LOGIN INTERFACE LISTENERS ---
const loginTrigger = document.getElementById('login-trigger');
const passInput = document.getElementById('pass-input');
const passWindow = document.getElementById('password-window');
const confirmBtn = document.getElementById('confirm-btn');

[loginTrigger, passInput, confirmBtn].forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.classList.add('active-focus');
        playLoginAudio(el);
    });
    el.addEventListener('touchstart', (e) => {
        // We don't preventDefault here to allow the click/focus to fire
        el.classList.add('active-focus');
        playLoginAudio(el);
    });
    el.addEventListener('mouseleave', () => el.classList.remove('active-focus'));
    el.addEventListener('touchend', () => el.classList.remove('active-focus'));
});

// OPEN KEYPAD ACTION
loginTrigger.addEventListener('click', () => {
    passWindow.classList.remove('hidden');
    loginTrigger.classList.add('hidden');
    playLoginAudio(passInput);
    setTimeout(() => passInput.focus(), 500);
});

// --- UNIFIED AUTHENTICATION & REVEAL LOGIC ---
let isLoggingIn = false; // VARIABLE: Guard to prevent multiple rapid clicks during the login process

confirmBtn.addEventListener('click', () => {
    if (passInput.value === "demo") {
        isLoggingIn = true;

        confirmBtn.style.pointerEvents = 'none';
        confirmBtn.style.opacity = '0.5';

        const successAudio = new Audio(`${loginVoicePath}/processing.mp3`);
        successAudio.load();
        successAudio.play();

        const textElement = document.querySelector('.perfect');
        if (textElement) textElement.classList.add('drop-off');

        setTimeout(() => {
            splash.style.opacity = '0';
            splash.style.pointerEvents = 'none';
            wallet.classList.add('active');
            wallet.style.opacity = '1';
            wallet.style.pointerEvents = 'auto';

            setTimeout(() => {
                splash.style.display = 'none';
                const intro = new Audio(`audio/${activeVoice}/intro.mp3`);
                intro.load(); 
                intro.play().catch(e => console.log("Dashboard guide ready."));

                isLoggingIn = false;
            }, 1500);
        }, 2500);
    } else {
        const errorAudio = new Audio(`${loginVoicePath}/access_denied.mp3`);
        errorAudio.load();
        errorAudio.play().catch(() => announceWithVoice("Access Denied."));
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
        passInput.value = "";
    }
});

// --- DASHBOARD SETTINGS & NAVIGATION ---
if (selector) {
    selector.addEventListener('touchstart', () => {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance("Select your voice guide");
        window.speechSynthesis.speak(msg);
    });
}

window.setGlobalVoice = function(voiceKey) {
    activeVoice = voiceKey;
    localStorage.setItem('userVoicePreference', voiceKey);
    if (window.currentAudio) window.currentAudio.pause();
    window.currentAudio = new Audio(`audio/${activeVoice}/intro.mp3`);
    window.currentAudio.load();
    window.currentAudio.play().catch(err => console.log("Intro audio missing"));
};
// ----------------- END OF DASHBOARD SETTINGS & NAVIGATION -----------------//

// --- MAIN DASHBOARD BUTTON LOGIC ---
const alertLayer = document.getElementById('alert-layer');
const withdrawLayer = document.getElementById('withdraw-layer');
const cryptoLayer = document.getElementById('crypto-layer');
const depositLayer = document.getElementById('deposit-layer');
const billsLayer = document.getElementById('bills-layer');
const overviewLayer = document.getElementById('overview-layer');
const searchLayer = document.getElementById('search-layer');
const sendLayer = document.getElementById('send-layer');
const addbillLayer = document.getElementById('add-bill-layer');
const statementLayer = document.getElementById('statement-layer');
const profileLayer = document.getElementById('profile-layer');
const limitLayer = document.getElementById('limit-layer');
const securityLayer = document.getElementById('security-layer');

buttons.forEach(btn => {
    const handleExplore = (e) => {
        if (e.type === 'touchstart') e.preventDefault();
        const label = btn.getAttribute('data-label');
        
        buttons.forEach(b => b.classList.remove('active-focus'));
        btn.classList.add('active-focus');

        if (window.currentAudio) window.currentAudio.pause();
        window.currentAudio = new Audio(`audio/${activeVoice}/${label.toLowerCase()}.mp3`);
        window.currentAudio.load(); 
        window.currentAudio.play().catch(err => console.log(`Audio missing: ${label}`));

        if (navigator.vibrate) navigator.vibrate(40);
    };


    btn.addEventListener('mouseenter', handleExplore);
    btn.addEventListener('touchstart', handleExplore);
    btn.addEventListener('mouseleave', () => btn.classList.remove('active-focus'));

    const triggerAction = () => {
        const label = btn.getAttribute('data-label');
        const overviewLayer = document.getElementById('overview-layer');
        const searchLayer = document.getElementById('search-layer');
        const alertLayer = document.getElementById('alert-layer');
        const sendLayer = document.getElementById('send-layer');
        const depositLayer = document.getElementById('deposit-layer');
        const billsLayer = document.getElementById('bills-layer');
        const withdrawLayer = document.getElementById('withdraw-layer');
        const addbillLayer = document.getElementById('add-bill-layer');
        const statementLayer = document.getElementById('statement-layer');
        const cryptoLayer = document.getElementById('crypto-layer');
        const profileLayer = document.getElementById('profile-layer');
        const limitLayer = document.getElementById('limit-layer');
        const securityLayer = document.getElementById('security-layer');

if (window.currentAudio) window.currentAudio.pause();
        if (label === 'deposit') {
            if (depositLayer) {
                depositLayer.classList.add('is-open');
                window.currentAudio = new Audio(`audio/${activeVoice}/deposit_open.mp3`);
                window.currentAudio.load();
                window.currentAudio.play();
            }
        } 
        else if (label === 'confirm' || label === 'close') {
            return;
        } 

else if (label === 'overview') {
    if (overviewLayer) {
        // 1. Force the previous audio (overview.mp3) to stop INSTANTLY
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; 
        }

        // 2. Open the panel
        overviewLayer.classList.add('is-open');

        window.currentAudio = new Audio(`audio/${activeVoice}/overview_open.mp3`);
        window.currentAudio.play().catch(e => console.log("Open audio blocked"));
    }
}

else if (label === 'search') {
    if (searchLayer) {
      
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; 
        }

        searchLayer.classList.add('is-open');

        window.currentAudio = new Audio(`audio/${activeVoice}/search_open.mp3`);
        window.currentAudio.play().catch(e => console.log("Open audio blocked"));
    }
}

else if (label === 'alert') {
    if (alertLayer) {
      
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; 
        }

        alertLayer.classList.add('is-open');

        window.currentAudio = new Audio(`audio/${activeVoice}/alert_open.mp3`);
        window.currentAudio.play().catch(e => console.log("Open audio blocked"));
    }
}

else if (label === 'send') {
    if (sendLayer) {
      
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; 
        }

        sendLayer.classList.add('is-open');

        window.currentAudio = new Audio(`audio/${activeVoice}/send_open.mp3`);
        window.currentAudio.play().catch(e => console.log("Open audio blocked"));
    }
}

else if (label === 'paybills') { 
    if (billsLayer) {
      
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; 
        }

        billsLayer.classList.add('is-open');

        window.currentAudio = new Audio(`audio/${activeVoice}/paybills_open.mp3`);
        window.currentAudio.play().catch(e => console.log("Open audio blocked"));
    }
}

else if (label === 'withdraw') {
    if (withdrawLayer) {
        withdrawLayer.classList.add('is-open');

        if (window.currentAudio) window.currentAudio.pause();
        window.currentAudio = new Audio(`audio/${activeVoice}/withdraw.mp3`);
        window.currentAudio.play();

       
        setTimeout(() => {
            const openAudio = new Audio(`audio/${activeVoice}/withdraw_open.mp3`);
            openAudio.play().then(() => {
              
                window.currentAudio = openAudio;
            }).catch(e => console.log("Open audio blocked"));
        }, 700); 
    }
}

else if (label === 'newpay') {
    if (addbillLayer) {
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; 
        }

        addbillLayer.classList.add('is-open');

        window.currentAudio = new Audio(`audio/${activeVoice}/addbill_open.mp3`);
        window.currentAudio.play().catch(e => console.log("Open audio blocked"));
    }
}

else if (label === 'statements') {
    if (statementLayer) {
        statementLayer.classList.add('is-open');

        // 1. Play "Statement" (Confirmation)
        if (window.currentAudio) window.currentAudio.pause();
        window.currentAudio = new Audio(`audio/${activeVoice}/statement.mp3`);
        window.currentAudio.play();

        // 2. Play "Statement menu is open" (Status)
        setTimeout(() => {
            const openAudio = new Audio(`audio/${activeVoice}/statement_open.mp3`);
            openAudio.play().then(() => {
                // Update the global reference so we can still pause it if needed
                window.currentAudio = openAudio;
            }).catch(e => console.log("Open audio blocked"));
        }, 700); 
    }
}

else if (label === 'invest') {
    if (cryptoLayer) {
        // 1. STOP previous audio immediately
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; // Reset to start
        }

        cryptoLayer.classList.add('is-open');
        if (typeof openInvestmentPanel === "function") openInvestmentPanel();
        if (typeof fetchPrices === "function") fetchPrices();

        // 3. Play the Welcome audio
        window.currentAudio = new Audio(`audio/${activeVoice}/crypto_welcome.mp3`);
        window.currentAudio.play().catch(e => console.log("Crypto welcome blocked"));
    }
}

else if (label === 'profile') {
    if (profileLayer) {

        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; 
        }

        profileLayer.classList.add('is-open');

        window.currentAudio = new Audio(`audio/${activeVoice}/profile_open.mp3`);
        window.currentAudio.play().catch(e => console.log("Open audio blocked"));
    }
}

else if (label === 'limit') {
    if (limitLayer) {
       
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; 
        }

        // 2. Open the panel
        limitLayer.classList.add('is-open');

        window.currentAudio = new Audio(`audio/${activeVoice}/limit_open.mp3`);
        window.currentAudio.play().catch(e => console.log("Open audio blocked"));
    }
}

else if (label === 'security') {
    if (securityLayer) {

        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0; 
        }

        // 2. Open the panel
        securityLayer.classList.add('is-open');

        window.currentAudio = new Audio(`audio/${activeVoice}/security_open.mp3`);
        window.currentAudio.play().catch(e => console.log("Open audio blocked"));
    }
}

        };

    // MOUSE: Double Click
    btn.addEventListener('dblclick', triggerAction);

    // TOUCH: Double Tap Logic
    btn.addEventListener('touchstart', (e) => {
        const now = Date.now();
        const lastTap = parseInt(btn.dataset.lastTap) || 0;
        if (now - lastTap < 300) {
            triggerAction();
        }
        btn.dataset.lastTap = now;
    });
}); 
//----------------- END OF DASHBOARD BUTTON LOGIC -----------------//

// --------------- SEARCH PANEL LOGIC -----------------------------//
const searchSection = document.getElementById('google-search-container');
const internalClose = document.getElementById('close-search-internal');
const clearBtn = document.getElementById('clear-search-btn');
const gInput = document.getElementById('google-input');
const closeS = document.getElementById('close-search');


const searchCloseFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeCloseSearch = () => {
    // 1. Hide the layer immediately
    if (searchLayer) searchLayer.classList.remove('is-open'); 

    // 2. STOP the audio immediately so it doesn't repeat or linger
    if (window.currentAudio) { 
        window.currentAudio.pause(); 
        window.currentAudio.currentTime = 0; 
    }
    
};

if (closeS) {
    closeS.addEventListener('mouseenter', searchCloseFocus);
    closeS.addEventListener('dblclick', executeCloseSearch);

    closeS.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeS.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseSearch(); // Closes the panel and stops audio
        } else {
            searchCloseFocus(); // Plays "close.mp3" to identify the button
        }
        closeS.dataset.lastTap = now;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('scan-btn');
    const searchLayer = document.getElementById('search-layer');
    const resultBox = document.getElementById('google-result-box');
    
    let clickCount = 0;

    // Opens the main #search-layer (the modal form)
    if (scanBtn) {
        scanBtn.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 1) {
                setTimeout(() => { clickCount = 0; }, 300);
            } else if (clickCount === 2) {
                // DOUBLE CLICK CONFIRMED
                searchLayer.classList.add('is-visible');
                clickCount = 0;
            }
        });
    }

    const input = document.getElementById('google-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim() !== "") {
                const query = input.value;
                resultBox.innerText = `Apex Protocol: Pulling investment data for ${query}...`;

                setTimeout(() => {
                    // Redirect to your specific Search Engine ID results
                    window.open(`https://google.com{encodeURIComponent(query)}`, '_blank');
                }, 1000);
            }
        });
    }
});

// ---------- END OF SEARCH/Google Invest Search Engine PANEL-------//

// ------------------ ALERT PANEL LOGIC ---------------------------//
const closeB = document.getElementById('close-alert');

const alertCloseFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    // Identifies the button for blind users
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeCloseAlert = () => {
    // 1. Hide the Alert Layer
    if (alertLayer) alertLayer.classList.remove('is-open'); 
    if (window.currentAudio) { 
        window.currentAudio.pause(); 
        window.currentAudio.currentTime = 0; 
    }
};

if (closeB) {
    // Audio on Hover
    closeB.addEventListener('mouseenter', alertCloseFocus);
    closeB.addEventListener('dblclick', executeCloseAlert);
    closeB.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeB.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseAlert(); // Silent Close
        } else {
            alertCloseFocus(); // Voice identification
        }
        closeB.dataset.lastTap = now;
    });
}

const alertArticleBtn = document.getElementById('fetch-article-btn');
// 1. Audio Preview (Hover/Single Tap)
const handleArticlePreview = () => {
    // GUARD: Wait for the "Alert Panel Open" announcement to finish
    if (window.currentAudio && !window.currentAudio.paused) {
        if (window.currentAudio.src.includes('alert_open')) {
            console.log("Waiting for Alert Open audio to finish...");
            return; 
        }
    }

    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }

    // Explicitly loading the alert article audio
    window.currentAudio = new Audio(`audio/${activeVoice}/load_articlebtn.mp3`);
    window.currentAudio.play().catch(err => console.log("Audio blocked: click once to unlock."));
};

// 2. Action (Double Click/Double Tap)
const handleArticleAction = () => {
    console.log("Opening Alert PDF...");
    window.open('identity_theft.pdf', '_blank');
};

// 3. Attach Listeners to the specific Alert Button
if (alertArticleBtn) {
    // DESKTOP
    alertArticleBtn.addEventListener('mouseenter', handleArticlePreview);
    alertArticleBtn.addEventListener('dblclick', handleArticleAction);

    // MOBILE (iPhone/Android)
    alertArticleBtn.addEventListener('touchstart', (e) => {
        // We don't preventDefault so the browser stays "warm" for the window.open call
        const now = Date.now();
        const lastTap = parseInt(alertArticleBtn.dataset.lastTap) || 0;

        if (now - lastTap < 300) {
            handleArticleAction();
        } else {
            handleArticlePreview();
        }
        alertArticleBtn.dataset.lastTap = now;
    });
}
//---------------- END OF ALERT ---------------------------//

//------------------- ACCOUNT OVERVIEW ----------------------//

const closeOvervwBtn = document.getElementById('close-overview');
const readOverviewBtn = document.getElementById('read-overview');
const closeA = document.getElementById('close-overview');

const handleOvervwFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeCloseOvervw = () => {
    if (overviewLayer) overviewLayer.classList.remove('is-open');
    if (window.currentAudio) window.currentAudio.pause();
    selectedSource = null;
};

if (closeA) {
    
    closeA.addEventListener('mouseenter', handleOvervwFocus);
    closeA.addEventListener('dblclick', executeCloseOvervw);
    closeA.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeA.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseOvervw(); // This hides the overviewLayer because of your updated function!
        } else {
            handleOvervwFocus(); // Plays "close.mp3"
        }
        closeA.dataset.lastTap = now;
    });
}

if (closeOvervwBtn) {
    closeOvervwBtn.addEventListener('mouseenter', handleOvervwFocus);
    closeOvervwBtn.addEventListener('dblclick', executeCloseOvervw);

    closeOvervwBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeOvervwBtn.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseOvervw();
        } else {
            handleOvervwFocus();
        }
        closeOvervwBtn.dataset.lastTap = now;
    });
}

// OPEN PANEL
const openOverviewPanel = () => {
    if (!overviewLayer) return;
    overviewLayer.classList.add('is-open'); // Ensure CSS supports this!
    
    if (window.currentAudio) window.currentAudio.pause();
    window.currentAudio = new Audio(`audio/${activeVoice}/overview_open.mp3`);
    window.currentAudio.play().catch(err => console.log("Overview open audio blocked."));
};

// 2. HOVER PROMPT
const handleOverviewHover = () => {
    // Check if the actual reading is happening
    if (window.currentAudio && !window.currentAudio.paused && window.currentAudio.src.includes('overview_readout')) {
        return; 
    }

    if (window.currentAudio) window.currentAudio.pause();
    window.currentAudio = new Audio(`audio/${activeVoice}/ask_overview.mp3`);
    window.currentAudio.play().catch(err => console.log("Overview hover blocked."));
};

// 3. SINGLE CLICK: Pause
readOverviewBtn.addEventListener('click', () => {
    if (window.currentAudio) window.currentAudio.pause();
});

// 4. DOUBLE CLICK: Readout
readOverviewBtn.addEventListener('dblclick', () => {
    if (window.currentAudio) window.currentAudio.pause();
    window.currentAudio = new Audio(`audio/${activeVoice}/overview_readout.mp3`);
    window.currentAudio.play().catch(err => console.log("Overview readout blocked."));
});

// 5. ATTACH HOVER
readOverviewBtn.addEventListener('mouseenter', handleOverviewHover);

//------------------- ACCOUNT OVERVIEW ENDS -----------------------//

//---------------- SEND funds logic -------------------------------//
const closeSendBtn = document.getElementById('close-send');
const closeD = document.getElementById('close-send');

const handleSendFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeCloseSend = () => {
    if (sendLayer) sendLayer.classList.remove('is-open');
    if (window.currentAudio) window.currentAudio.pause();
    selectedSource = null;
};

if (closeD) {
    // Audio on Hover/Touch
    closeD.addEventListener('mouseenter', handleSendFocus);
    // Double Click to Close
    closeD.addEventListener('dblclick', executeCloseSend);
    //  Double Tap to Close (Mobile)
    closeD.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeD.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseSend(); 
        } else {
            handleSendFocus(); // Plays "close.mp3"
        }
        closeD.dataset.lastTap = now;
    });
}

if (closeSendBtn) {
    closeSendBtn.addEventListener('mouseenter', handleSendFocus);
    closeSendBtn.addEventListener('dblclick', executeCloseSend);

    closeSendBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeSendBtn.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseSend();
        } else {
            handleSendFocus();
        }
        closeSendBtn.dataset.lastTap = now;
    });
}

// 1. Audio logic for the Send Funds Panel
const sendRecipient = document.getElementById('send-recipient');
const sendAmountInput = document.getElementById('send-amount');
const authTransferBtn = document.getElementById('authorize-transfer');

// Helper to play audio based on your activeVoice path
const playSendAudio = (filename) => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    const voice = (typeof activeVoice !== 'undefined') ? activeVoice : 'default';
    window.currentAudio = new Audio(`audio/${voice}/${filename}`);
    window.currentAudio.play().catch(err => console.log(`Missing: ${filename}`));
};

// 2. Mouse Enter
if (sendRecipient) {
    sendRecipient.addEventListener('mouseenter', () => playSendAudio('address_send.mp3'));
    sendRecipient.addEventListener('focus', () => playSendAudio('address_send.mp3'));
}

if (sendAmountInput) {
    sendAmountInput.addEventListener('mouseenter', () => playSendAudio('input_deposit.mp3'));
    sendAmountInput.addEventListener('focus', () => playSendAudio('input_deposit.mp3'));
}

if (authTransferBtn) {
    // Hover Audio
    authTransferBtn.addEventListener('mouseenter', () => playSendAudio('authorize_send.mp3'));

    // Final Action: Double Click to Authorize
    authTransferBtn.addEventListener('dblclick', () => {
        if (sendAmountInput.value > 0) {
            // Reusing your 'confirmed.mp3' for the final success sound
            playSendAudio('authorize_transfer.mp3');
            
            setTimeout(() => {
                const sendLayer = document.getElementById('send-layer');
                if (sendLayer) sendLayer.classList.remove('is-open');
                sendAmountInput.value = "";
                sendRecipient.value = "";
            }, 2500);
        }
    });
}
//---------------- END SEND funds logic --------------------//

//------------------ DEPOSIT PANEL LOGIC ------------------------//
const depInput = document.getElementById('dep-amount');
const closeX = document.getElementById('close-statement');
const closeDepBtn = document.getElementById('close-deposit');
const finalConfirmBtn = document.getElementById('final-deposit-btn');

const handleCloseFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeClose = () => {
    if (depositLayer) depositLayer.classList.remove('is-open');
    
    if (statementLayer) statementLayer.classList.remove('is-open');
    if (window.currentAudio) window.currentAudio.pause();
    selectedSource = null;
    depInput.value = "";
};

if (closeX) {
    // THIS CLOSE BUTTON IS SHARED BETWEEN DEPOSIT AND STATEMENT PANELS, MY BAD FOR THE CONFUSION!
    closeX.addEventListener('mouseenter', handleCloseFocus);
    closeX.addEventListener('dblclick', executeClose);

    closeX.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeX.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeClose(); 
        } else {
            handleCloseFocus(); // Plays "close.mp3"
        }
        closeX.dataset.lastTap = now;
    });
}

if (closeDepBtn) {
    closeDepBtn.addEventListener('mouseenter', handleCloseFocus);
    closeDepBtn.addEventListener('dblclick', executeClose);

    closeDepBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeDepBtn.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeClose();
        } else {
            handleCloseFocus();
        }
        closeDepBtn.dataset.lastTap = now;
    });
}

// INPUT FIELD: Prompt for amount
const handleInputFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/input_deposit.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: input_deposit.mp3"));
};

if (depInput) {
    depInput.addEventListener('mouseenter', handleInputFocus);
    depInput.addEventListener('focus', handleInputFocus);
    depInput.addEventListener('touchstart', (e) => {
        handleInputFocus();
        if (navigator.vibrate) navigator.vibrate(20);
    });
}

// SOURCE SELECTION: Bank vs Crypto
const sourceButtons = document.querySelectorAll('.source-opt');
let selectedSource = null;

sourceButtons.forEach(btn => {
    const handleSourceHover = () => {
        const source = btn.getAttribute('data-source'); // This pulls "bank" or "crypto"
        sourceButtons.forEach(b => b.classList.remove('active-focus'));
        btn.classList.add('active-focus');

        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
        }
        
        // DYNAMIC AUDIO: Loads audio/voice/source_bank.mp3 or audio/voice/source_crypto.mp3
        window.currentAudio = new Audio(`audio/${activeVoice}/source_${source}.mp3`);
        window.currentAudio.play().catch(err => console.log(`Missing: source_${source}.mp3`));
    };

    btn.addEventListener('mouseenter', handleSourceHover);
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleSourceHover();
    });
    
    btn.addEventListener('click', () => {
        selectedSource = btn.getAttribute('data-source');
        if (navigator.vibrate) navigator.vibrate(40);
        setTimeout(() => depInput.focus(), 800); 
    });
});

//  FINAL CONFIRMATION: Logic for confirm_deposit.mp3 and confirmed.mp3
const handleConfirmFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/confirm_deposit.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: confirm_deposit.mp3"));
};

const executeDeposit = () => {
    const amount = depInput.value;
    if (amount > 0 && selectedSource) {
        if (window.currentAudio) window.currentAudio.pause();
        window.currentAudio = new Audio(`audio/${activeVoice}/confirmed.mp3`);
        window.currentAudio.play().then(() => {
            setTimeout(() => {
                depositLayer.classList.remove('is-open');
                depInput.value = "";
                selectedSource = null;
            }, 2500);
        }).catch(err => {
            depositLayer.classList.remove('is-open');
        });
    }
};

if (finalConfirmBtn) {
    finalConfirmBtn.addEventListener('mouseenter', handleConfirmFocus);
    finalConfirmBtn.addEventListener('dblclick', executeDeposit);
    
    finalConfirmBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(finalConfirmBtn.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeDeposit();
        } else {
            handleConfirmFocus();
        }
        finalConfirmBtn.dataset.lastTap = now;
    });
}
//------------------ END DEPOSIT PANEL LOGIC ------------------------//

// ------------------ PAY BILLS logic -------------------------------//
// This line turns "electricbill.mp3" into "Electricbill.mp3"

const closeE = document.getElementById('close-bills');

const billsCloseFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    // Identifies the button for blind users
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeBillsClose = () => {
    // 1. Hide the Alert Layer
    if (billsLayer) billsLayer.classList.remove('is-open'); 

    // 2. Kill the audio immediately (Silent Exit like closeA and closeS)
    if (window.currentAudio) { 
        window.currentAudio.pause(); 
        window.currentAudio.currentTime = 0; 
    }
};

if (closeE) {
    // Audio on Hover
    closeE.addEventListener('mouseenter', billsCloseFocus);

    // Double Click to Close (Desktop)
    closeE.addEventListener('dblclick', executeBillsClose);

    // Double Tap to Close (Mobile Accessibility)
    closeE.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeE.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeBillsClose(); // Silent Close
        } else {
            billsCloseFocus(); // Voice identification
        }
        closeE.dataset.lastTap = now;
    });
}

// 1. Elements
const bDisplay = document.getElementById('selected-bill-display');
const bList = document.getElementById('bill-list');
const bOptions = document.querySelectorAll('.bill-option');
const billRefInput = document.getElementById('bill-reference');
const billAmtInput = document.getElementById('bill-amount');
const confirmBillBtn = document.getElementById('confirm-bill-btn');

// 2. Specialized Audio Helper (Matches your panel audio style)
const playBillAudio = (filename) => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    const voice = (typeof activeVoice !== 'undefined') ? activeVoice : 'default';
    window.currentAudio = new Audio(`audio/${voice}/${filename}`);
    window.currentAudio.play().catch(e => console.log(`Audio missing or blocked: ${filename}`));
};

// 3. Dropdown Toggle & Prompt Logic
const playBillPrompt = () => {
    // Matches your crypto_dropdown.mp3 style
    playBillAudio('bill_dropdown.mp3');
};

if (bDisplay) {
    bDisplay.addEventListener('mouseenter', playBillPrompt);
    bDisplay.addEventListener('touchstart', playBillPrompt);

    bDisplay.addEventListener('click', () => {
        const isOpen = bList.style.display === 'block';
        bList.style.display = isOpen ? 'none' : 'block';
        if (!isOpen) playBillPrompt();
    });
}

// 4. Individual Bill Options (Audio + Hover Effect)
bOptions.forEach(opt => {
    opt.addEventListener('mouseenter', () => {
        // Pull filename from data-audio (e.g., electricbill.mp3)
        const rawFile = opt.getAttribute('data-audio'); 
        
        // Capitalize first letter (Electricbill.mp3) to match crypto logic
        const fileName = rawFile.charAt(0).toUpperCase() + rawFile.slice(1);

        playBillAudio(fileName);
        
        // VISUAL: Light up this option and dim others
        bOptions.forEach(o => o.style.backgroundColor = "transparent");
        opt.style.backgroundColor = "#2a2a2a"; 
    });

    opt.addEventListener('click', () => {
        bDisplay.innerText = opt.innerText; 
        bList.style.display = 'none'; 
        bOptions.forEach(o => o.style.backgroundColor = "transparent");
    });
});

// 5. Input Field & Button Audio
if (billRefInput) {
    billRefInput.addEventListener('mouseenter', () => playBillAudio('account_input.mp3'));
    billRefInput.addEventListener('focus', () => playBillAudio('account_input.mp3'));
}

if (billAmtInput) {
    billAmtInput.addEventListener('mouseenter', () => playBillAudio('input_deposit.mp3'));
    billAmtInput.addEventListener('focus', () => playBillAudio('input_deposit.mp3'));
}

if (confirmBillBtn) {
    confirmBillBtn.addEventListener('mouseenter', () => playBillAudio('authorize_bill.mp3'));

    confirmBillBtn.addEventListener('dblclick', () => {
        if (billAmtInput.value > 0) {
            playBillAudio('authorize_transfer.mp3');
            
            setTimeout(() => {
                const layer = document.getElementById('bills-layer');
                if (layer) layer.classList.remove('is-open');
                
                // Cleanup form
                billAmtInput.value = "";
                billRefInput.value = "";
                bDisplay.innerText = "Select Biller";
            }, 2500);
        }
    });
}

// 6. Global Close (Click Outside)
window.addEventListener('click', (e) => {
    if (bDisplay && e.target !== bDisplay) {
        bList.style.display = 'none';
    }
});

//-------------- END PayBills logic __________________//

// ------------- WITHDRAW BILLS logic --------------------- -------//
const destButtons = document.querySelectorAll('.dest-opt');
const withdrawInput = document.getElementById('with-amount');
const finalWithdrawBtn = document.getElementById('final-withdraw-btn');
const closeF = document.getElementById('close-withdraw');
let selectedDest = null;

// 1. Close Button Logic (Audio on Hover, Double Click to Action)
const withdrawCloseFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeWithdrawClose = () => {
    if (withdrawLayer) withdrawLayer.classList.remove('is-open'); 
    if (window.currentAudio) { 
        window.currentAudio.pause(); 
        window.currentAudio.currentTime = 0; 
    }
};

if (closeF) {
    closeF.addEventListener('mouseenter', withdrawCloseFocus);
    closeF.addEventListener('dblclick', executeWithdrawClose);
    closeF.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeF.dataset.lastTap) || 0;
        if (now - lastTap < 300) {
            executeWithdrawClose();
        } else {
            withdrawCloseFocus();
        }
        closeF.dataset.lastTap = now;
    });
}

// 2. Destination Selection: Bank vs Crypto (Matches Deposit Source Logic)
destButtons.forEach(btn => {
    const handleDestHover = () => {
        const dest = btn.getAttribute('data-dest');
        destButtons.forEach(b => b.classList.remove('active-focus'));
        btn.classList.add('active-focus');

        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
        }
        
        // DYNAMIC AUDIO: source_bank.mp3 or source_crypto.mp3
        window.currentAudio = new Audio(`audio/${activeVoice}/source_${dest}.mp3`);
        window.currentAudio.play().catch(err => console.log(`Missing: source_${dest}.mp3`));
    };

    btn.addEventListener('mouseenter', handleDestHover);
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleDestHover();
    });
    
    btn.addEventListener('click', () => {
        selectedDest = btn.getAttribute('data-dest');
        if (navigator.vibrate) navigator.vibrate(40);
        setTimeout(() => withdrawInput.focus(), 800); 
    });
});

// 3. Final Confirmation Hover Audio
const handleWithdrawConfirmFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    // PLAYED ON HOVER/TOUCH
    window.currentAudio = new Audio(`audio/${activeVoice}/withdraw.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: withdraw.mp3"));
};

// 4. Execution Logic
const executeWithdrawal = () => {
    const amount = withdrawInput.value;
    if (amount > 0 && selectedDest) {
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
        }

        // Create the new audio object
        window.currentAudio = new Audio(`audio/${activeVoice}/authorize_transfer.mp3`);
        
        window.currentAudio.load(); 

        window.currentAudio.play().then(() => {
            console.log("Withdrawal authorized audio playing...");
            setTimeout(() => {
                withdrawLayer.classList.remove('is-open');
                withdrawInput.value = "";
                selectedDest = null;
                destButtons.forEach(b => b.classList.remove('active-focus'));
            }, 2500);
        }).catch(err => {
            console.error("Audio failed on double-click:", err);
            // Close the layer even if audio fails so the user isn't stuck
            withdrawLayer.classList.remove('is-open');
        });
    }
};

// 5. Attach Listeners to Final Button
if (finalWithdrawBtn) {
    // Single hover/touch plays "withdraw.mp3"
    finalWithdrawBtn.addEventListener('mouseenter', handleWithdrawConfirmFocus);

    // Double click executes and plays "authorize_transfer.mp3"
    finalWithdrawBtn.addEventListener('dblclick', executeWithdrawal);
    
    finalWithdrawBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(finalWithdrawBtn.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeWithdrawal(); // Final Action + Authorize sound
        } else {
            handleWithdrawConfirmFocus(); // Hover/Identification sound
        }
        finalWithdrawBtn.dataset.lastTap = now;
    });
}

// 6. Input Field Hover
if (withdrawInput) {
    withdrawInput.addEventListener('mouseenter', () => {
        if (window.currentAudio) { window.currentAudio.pause(); window.currentAudio.currentTime = 0; }
        window.currentAudio = new Audio(`audio/${activeVoice}/input_deposit.mp3`);
        window.currentAudio.play().catch(e => {});
    });
}
//------------------- WITHDRAW FUNDS LOGIC ENDS ---------------------//

//-------------------- PROGRAM NEW BILL PAYMENT ---------------------//
const closeG = document.getElementById('close-add-bill');

const programnewbillClose = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executePrognewbill = () => {
    if (addbillLayer) addbillLayer.classList.remove('is-open'); 
    if (window.currentAudio) { 
        window.currentAudio.pause(); 
        window.currentAudio.currentTime = 0; 
    }
};

if (closeG) {
    closeG.addEventListener('mouseenter', programnewbillClose);
    closeG.addEventListener('dblclick', executePrognewbill);
    closeG.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeG.dataset.lastTap) || 0;
        if (now - lastTap < 300) {
            executePrognewbill();
        } else {
            programnewbillClose();
        }
        closeG.dataset.lastTap = now;
    });
}

const newNameInput = document.getElementById('new-biller-name');
const newAccInput = document.getElementById('new-biller-acc');
const previewText = document.getElementById('preview-text');
const closeAddBill = document.getElementById('close-add-bill');
const confirmAddBtn = document.getElementById('confirm-add-bill');

// 1. Live Preview Update
const updatePreview = () => {
    const name = newNameInput.value || "...";
    const acc = newAccInput.value || "...";
    previewText.innerText = `${name} | Acc: ${acc}`;
};

// 2. Audio Trigger Function (Direct implementation to match working panels)
const triggerAddBillVoice = (fileName) => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    const voice = (typeof activeVoice !== 'undefined') ? activeVoice : 'default';
    window.currentAudio = new Audio(`audio/${voice}/${fileName}`);
    window.currentAudio.load(); // Force load for immediate playback
    window.currentAudio.play().catch(err => console.log(`Audio error: ${fileName}`));
};

// 3. Listeners for Name Input
if (newNameInput) {
    newNameInput.addEventListener('input', updatePreview);
    newNameInput.addEventListener('mouseenter', () => triggerAddBillVoice('biller_name.mp3'));
}

// 4. Listeners for Account Input
if (newAccInput) {
    newAccInput.addEventListener('input', updatePreview);
    newAccInput.addEventListener('mouseenter', () => triggerAddBillVoice('account_number.mp3'));
}

// 5. Register Button Logic
if (confirmAddBtn) {
    confirmAddBtn.addEventListener('mouseenter', () => triggerAddBillVoice('register_biller.mp3'));

    confirmAddBtn.addEventListener('dblclick', () => {
        if (newNameInput.value && newAccInput.value) {
            // Execution Audio
            triggerAddBillVoice('register_newbill.mp3');
            
            previewText.style.color = "#66cc33";
            previewText.innerText = "REGISTRATION SUCCESSFUL";

            setTimeout(() => {
                clearAddBillPanel();
                previewText.style.color = ""; 
            }, 2500);
        }
    });
}

// 6. Clear/Close Logic
const clearAddBillPanel = () => {
    const layer = document.getElementById('add-bill-layer');
    if (layer) layer.classList.remove('is-open');
    if (newNameInput) newNameInput.value = "";
    if (newAccInput) newAccInput.value = "";
    if (previewText) previewText.innerText = "Waiting for input...";
};

if (closeAddBill) {
    closeAddBill.addEventListener('click', clearAddBillPanel);
}
//-------------------- PROGRAM NEW BILL PAYMENT ENDS -----------------//

// ------------ MONTHLY STATEMENT PANEL LOGIC -------------------//
const readBtn = document.getElementById('read-yes');

const openStatementPanel = () => {
    if (!statementLayer) return;
    statementLayer.classList.add('is-open');
    
    // Play: "Statement menu is open."
    if (window.currentAudio) window.currentAudio.pause();
    window.currentAudio = new Audio(`audio/${activeVoice}/statement_open.mp3`);
    window.currentAudio.play().catch(err => console.log("Panel audio blocked."));
};

// 2. HOVER/TOUCH PROMPT: Only plays if not currently reading the data
const handleReadHover = () => {
    // If the readout is playing, don't interrupt it
    if (window.currentAudio && !window.currentAudio.paused && window.currentAudio.src.includes('read_statement')) {
        return; 
    }

    if (window.currentAudio) window.currentAudio.pause();
    window.currentAudio = new Audio(`audio/${activeVoice}/statement_ask.mp3`);
    window.currentAudio.play().catch(err => console.log("Hover audio blocked."));
};

// 3. SINGLE CLICK: Pause only
readBtn.addEventListener('click', (e) => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        console.log("Reading Paused");
    }
});

// 4. DOUBLE CLICK: Play the readout immediately
readBtn.addEventListener('dblclick', (e) => {
    if (window.currentAudio) window.currentAudio.pause();
    
    // Play: "Reading your statement now..."
    window.currentAudio = new Audio(`audio/${activeVoice}/read_statement.mp3`);
    window.currentAudio.play().catch(err => console.log("Double-click readout blocked."));
});

// 5. ATTACH HOVER/TOUCH
readBtn.addEventListener('mouseenter', handleReadHover);
readBtn.addEventListener('touchstart', (e) => {
    // We don't preventDefault so that the 'click' and 'dblclick' can still fire
    handleReadHover();
});

//--------------------- END of MONTHLY STATEMENT -------------------//
//--------------------- INVEST IN CRYPTO ---------------------------//
const options = document.querySelectorAll('.crypto-option');
const buyCryptoBtn = document.getElementById('buy-crypto-btn');
const cryptoAmountInput = document.getElementById('crypto-amount');
const display = document.getElementById('selected-asset-display');
const cryptoList = document.getElementById('crypto-list');
const cryptoSelect = document.getElementById('crypto-select');
const cryptoAmount = document.getElementById('crypto-amount');
const closeCrpBtn = document.getElementById('close-crypto');
const closeC = document.getElementById('close-crypto');

const cryptoCloseFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeCloseCrypto = () => {
    if (cryptoLayer) cryptoLayer.classList.remove('is-open');
    
    if (statementLayer) statementLayer.classList.remove('is-open');
    if (window.currentAudio) window.currentAudio.pause();
    selectedSource = null;
    cryptoAmountInput.value = "";
};

if (closeC) {
    // Audio on Hover/Touch
    closeC.addEventListener('mouseenter', cryptoCloseFocus);

    closeC.addEventListener('dblclick', executeCloseCrypto);

    //  Double Tap to Close (Mobile)
    closeC.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeC.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseCrypto(); // This hides the statementLayer because of your updated function!
        } else {
            cryptoCloseFocus(); // Plays "close.mp3"
        }
        closeC.dataset.lastTap = now;
    });
}

if (closeCrpBtn) {
    closeCrpBtn.addEventListener('mouseenter', cryptoCloseFocus);
    closeCrpBtn.addEventListener('dblclick', executeCloseCrypto);

    closeCrpBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeCrpBtn.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseCrypto();
        } else {
            cryptoCloseFocus();
        }
        closeCrpBtn.dataset.lastTap = now;
    });
}

//---------------- PURCHASING CRYPTO --------------------------------------------//

cryptoAmountInput.addEventListener('mouseenter', () => {
    // 1. Kill any current audio immediately
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }

    // 2. Play the instruction: "Enter the amount in dollars"
    window.currentAudio = new Audio(`audio/${activeVoice}/input_deposit.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: input_deposit.mp3"));
});

// A. DROPDOWN HOVER/TOUCH (The Prompt)
const handleDropdownPrompt = () => {
    // Only play if we aren't already in the middle of selecting a coin
    if (window.currentAudio && !window.currentAudio.paused && 
        (window.currentAudio.src.includes('Bitcoin') || window.currentAudio.src.includes('Etherium'))) {
        return;
    }

    if (window.currentAudio) window.currentAudio.pause();
    window.currentAudio = new Audio(`audio/${activeVoice}/crypto_dropdown.mp3`);
    window.currentAudio.play().catch(e => console.log("Prompt blocked"));
};

// 1. Dropdown Open/Close
const playDropdownPrompt = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    window.currentAudio = new Audio(`audio/${activeVoice}/crypto_dropdown.mp3`);
    window.currentAudio.play().catch(e => console.log("Prompt blocked"));
};

// 1. Toggle Dropdown Open/Close + Trigger Prompt on Hover/Touch/Click
display.addEventListener('mouseenter', playDropdownPrompt); // HOVER
display.addEventListener('touchstart', playDropdownPrompt); // TOUCH

display.addEventListener('click', () => {
    const isOpen = cryptoList.style.display === 'block';
    cryptoList.style.display = isOpen ? 'none' : 'block';

    // Play "crypto_dropdown.mp3" when opening via click
    if (!isOpen) {
        playDropdownPrompt();
    }
});

// 2. Individual Coin Audio (Hover / MouseEnter)
options.forEach(opt => {
    opt.addEventListener('mouseenter', () => {
        // Kill previous audio (like the dropdown prompt)
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
        }

        const coin = opt.getAttribute('data-source'); 
        // Capitalize for the file: Bitcoin.mp3, Ethereum.mp3, etc.
        const fileName = coin.charAt(0).toUpperCase() + coin.slice(1);

        window.currentAudio = new Audio(`audio/${activeVoice}/${fileName}.mp3`);
        window.currentAudio.play().catch(err => console.log(`Missing: ${fileName}.mp3`));
    });

    // 3. Select Coin (Click)
    opt.addEventListener('click', () => {
        display.innerText = opt.innerText; // Update the display text
        cryptoList.style.display = 'none'; // Close list
        
        // Optional: Play a "Selection Confirmed" sound or the coin name again
        console.log("Selected:", opt.getAttribute('data-value'));
    });
});

// Close dropdown if clicking outside
window.addEventListener('click', (e) => {
    if (e.target !== display) {
        cryptoList.style.display = 'none';
    }
});

// Close dropdown if clicking outside
window.addEventListener('click', (e) => {
    if (e.target !== display) {
        cryptoList.style.display = 'none';
    }
});

// C. CONFIRM PURCHASE BUTTON (Hover & Click)
buyCryptoBtn.addEventListener('mouseenter', () => {
    if (window.currentAudio) window.currentAudio.pause();
    window.currentAudio = new Audio(`audio/${activeVoice}/confirm_purchase.mp3`);
    window.currentAudio.play().catch(e => console.log("Confirm prompt blocked"));
});

buyCryptoBtn.addEventListener('dblclick', () => {
    // 1. Immediately kill the "Confirm Purchase" prompt
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }

    // 2. Play the Success audio
    window.currentAudio = new Audio(`audio/${activeVoice}/confirmed_crypto.mp3`);
    window.currentAudio.play().then(() => {
      console.log(`Investment of $${cryptoAmount.value} confirmed via double-click..`);
      // 1500ms (1.5 seconds) allows them to hear the start of the success message
        setTimeout(() => {
            executeCloseCrypto();
        }, 1500);
    })
});

//-------------------------- End of Crypto Purchase --------------------------//

//-------------------------- LIVE CRYPTO DISPLAY --------------------------//
const fetchPrices = async () => {
    
  try {
    // 1. FIXED: Added the correct API paths for each coin
    const [btcRes, ethRes, solRes, carRes] = await Promise.all([
      fetch('https://api.diadata.org/v1/assetQuotation/Bitcoin/0x0000000000000000000000000000000000000000'),
      fetch('https://api.diadata.org/v1/assetQuotation/Ethereum/0x0000000000000000000000000000000000000000'),
      fetch('https://api.diadata.org/v1/assetQuotation/Solana/0x0000000000000000000000000000000000000000'),
      fetch('https://api.diadata.org/v1/assetQuotation/Cardano/0x0000000000000000000000000000000000000000')
    ]);

    const btcData = await btcRes.json();
    const ethData = await ethRes.json();
    const solData = await solRes.json();
    const carData = await carRes.json();

    // 2. Extract and format the prices
    const btc = btcData.Price.toFixed(2);
    const eth = ethData.Price.toFixed(2);
    const sol = solData.Price.toFixed(2);
    const car = carData.Price.toFixed(2);

    // 3. Update the UI - pointing exactly to your placeholder spans
    document.getElementById('btc-val').innerText = `$${btc}`;
    document.getElementById('eth-val').innerText = `$${eth}`;
    document.getElementById('sol-val').innerText = `$${sol}`;
    document.getElementById('car-val').innerText = `$${car}`;

  } catch (err) {
    console.error("Connection Error:", err);
    const errorTags = ['btc-val', 'eth-val', 'sol-val', 'ada-val'];
    errorTags.forEach(id => document.getElementById(id).innerText = "Offline");
  }
};
setInterval(fetchPrices, 30000);
// Call the function so it runs!
fetchPrices();

// IMPORTANT: This triggers the function when the page opens
window.onload = fetchPrices;
//----------------------------END of LIVE CRYPTO ----------------------------------//

//---------------------------- PROFILE PANEL --------------------------------------//
const closeH = document.getElementById('close-profile');

const profileCloseFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    // Identifies the button for blind users
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeCloseProfile = () => {
    // 1. Hide the Alert Layer
    if (profileLayer) profileLayer.classList.remove('is-open'); 
    if (window.currentAudio) { 
        window.currentAudio.pause(); 
        window.currentAudio.currentTime = 0; 
    }
};

if (closeH) {
    // Audio on Hover
    closeH.addEventListener('mouseenter', profileCloseFocus);
    closeH.addEventListener('dblclick', executeCloseProfile);
    closeH.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeH.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseProfile(); // Silent Close
        } else {
            profileCloseFocus(); // Voice identification
        }
        closeH.dataset.lastTap = now;
    });
}
// --- COMPLETE UNIFORM PROFILE LOGIC ---

const pStatusInput = document.getElementById('profile-status-input');
const liveName = document.getElementById('live-name');
const liveStatus = document.getElementById('live-status');
const pDisplay = document.getElementById('selected-avatar-display');
const pList = document.getElementById('avatar-list');
const pOptions = document.querySelectorAll('.avatar-option');
const pPreview = document.getElementById('profile-preview');
const pUpload = document.getElementById('profile-upload');
const finalProfileBtn = document.getElementById('final-profile-btn');


// 1. Audio Handler
const handleProfileAudio = (fileName) => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    const voice = (typeof activeVoice !== 'undefined') ? activeVoice : 'default';
    window.currentAudio = new Audio(`audio/${voice}/${fileName}`);
    window.currentAudio.play().catch(err => console.log(`Missing: ${fileName}`));
};

// 2. Updated Live Logic: Removed name requirement
const updateProfilePreview = () => {
    if (liveStatus && pStatusInput) {
        // If box is empty, show default text, otherwise show typed text
        liveStatus.innerText = pStatusInput.value || "Profile: Online";
    }
};

// 3. Listeners
if (pStatusInput) {
    pStatusInput.addEventListener('input', updateProfilePreview);
    pStatusInput.addEventListener('mouseenter', () => handleProfileAudio('status_input.mp3'));
}


// 3. Dropdown Logic (Matches Crypto/Bills)
pDisplay.addEventListener('mouseenter', () => {
    const isOpen = pList.style.display === 'block';
    pList.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) handleProfileAudio('avatar_dropdown.mp3');
});

pOptions.forEach(opt => {
    opt.addEventListener('mouseenter', () => {
        const audioFile = opt.getAttribute('data-audio');
        handleProfileAudio(audioFile);
        pOptions.forEach(o => o.style.backgroundColor = "transparent");
        opt.style.backgroundColor = "#2a2a2a";
    });

    opt.addEventListener('click', () => {
        pPreview.src = opt.getAttribute('data-img');
        pDisplay.innerText = opt.innerText;
        pList.style.display = 'none';
        updateProfilePreview(); // Refresh the card
    });
});

// 4. Double-Click Custom Upload
pPreview.addEventListener('mouseenter', () => handleProfileAudio('change_photo.mp3'));
pPreview.addEventListener('dblclick', () => pUpload.click());

pUpload.addEventListener('change', function() {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            pPreview.src = e.target.result;
            handleProfileAudio('image_updated.mp3');
        };
        reader.readAsDataURL(this.files[0]);
    }
});

// 5. Final Confirmation (Uniform Double-Click)
const executeProfileUpdate = () => {
    // Plays confirm_profile.mp3 upon successful double-click
    handleProfileAudio('confirm_profile.mp3'); 
    
    setTimeout(() => {
        resetProfilePanel();
    }, 2500);
};

if (finalProfileBtn) {
    finalProfileBtn.addEventListener('mouseenter', () => handleProfileAudio('update_profile.mp3'));
    
    finalProfileBtn.addEventListener('dblclick', executeProfileUpdate);
    
    finalProfileBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(finalProfileBtn.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeProfileUpdate(); // Triggers confirm_profile.mp3
        } else {
            handleProfileAudio('update_profile.mp3'); // Triggers Identification
        }
        finalProfileBtn.dataset.lastTap = now;
    });
}

// 6. Reset & Close Logic
const resetProfilePanel = () => {
    // Ensure the ID matches your HTML (profile-layer)
    const layer = document.getElementById('profile-layer');
    if (layer) layer.classList.remove('is-open');
    
    pNameInput.value = "";
    pStatusInput.value = "";
    liveName.innerText = "New User";
    liveStatus.innerText = "Status: Load an image from your files or select an avatar.";
    
    // Set this to your preferred default image path
    pPreview.src = "IMG_0422.JPG"; 
    
    pDisplay.innerText = "Select Avatar";
    pList.style.display = 'none';
};


if (closeH) closeH.addEventListener('click', resetProfilePanel);

// Close dropdown if clicking outside
window.addEventListener('click', (e) => {
    if (e.target !== pDisplay) pList.style.display = 'none';
});
//---------------------------- END of PROFILE PANEL --------------------------------------//

//---------------------------- LIMIT PANEL LOGIC --------------------------------------//
const closeI = document.getElementById('close-limit');

const limitCloseFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    // Identifies the button for blind users
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeCloseLimit = () => {
   
    if (limitLayer) limitLayer.classList.remove('is-open'); 
    if (window.currentAudio) { 
        window.currentAudio.pause(); 
        window.currentAudio.currentTime = 0; 
    }
};

if (closeI) {
    // Audio on Hover
    closeI.addEventListener('mouseenter', limitCloseFocus);
    closeI.addEventListener('dblclick', executeCloseLimit);
    closeI.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeI.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseLimit(); // Silent Close
        } else {
            limitCloseFocus(); // Voice identification
        }
        closeI.dataset.lastTap = now;
    });
}

// --- SPENDING LIMIT LOGIC ---
const limitSlider = document.getElementById('limit-slider');
const limitText = document.getElementById('live-limit-text');
const finalLimitBtn = document.getElementById('final-limit-btn');
const closeLimitBtn = document.getElementById('close-limit');

// Helper to play pre-recorded MP3 (Matches your uniform panel style)
const playLimitMP3 = (fileName) => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    const voice = (typeof activeVoice !== 'undefined') ? activeVoice : 'default';
    window.currentAudio = new Audio(`audio/${voice}/${fileName}`);
    window.currentAudio.load();
    window.currentAudio.play().catch(e => console.log("Audio blocked"));
};

// 1. INITIAL TOUCH: Play "Slide Here" when user first touches the slider
const handleStartSliding = () => {
    playLimitMP3('slide_here.mp3');
};

// 1. Identification: Play "Slide Here" as soon as the mouse enters
if (limitSlider) {
    limitSlider.addEventListener('mouseenter', () => {
        // Only play if the user isn't already sliding
        playLimitMP3('slide_here.mp3');
    });

    // 2. The Hand-off: Pause the MP3 the MOMENT they click or touch to slide
    const stopMp3ForSpeech = () => {
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
        }
    };

    limitSlider.addEventListener('mousedown', stopMp3ForSpeech);
    limitSlider.addEventListener('touchstart', stopMp3ForSpeech);

    // 3. VISUAL UPDATE: Changes the $ amount on screen as you slide
    limitSlider.addEventListener('input', () => {
        limitText.innerText = `$${limitSlider.value}`;
        
        // Ensure MP3 is dead if they started sliding mid-audio
        stopMp3ForSpeech(); 
    });

    // 4. COMPUTER VOICE: Takes over when the user releases the slider
    limitSlider.addEventListener('change', () => {
        window.speechSynthesis.cancel();
        
        const speech = new SpeechSynthesisUtterance(`Daily limit set to ${limitSlider.value} dollars`);
        speech.rate = 1.1; 
        window.speechSynthesis.speak(speech);

        if (navigator.vibrate) navigator.vibrate(30);
    });
}

// 4. CONFIRMATION: Pause browser audio, Hover pre-recorded audio + Double-click Final Action
if (finalLimitBtn) {
    finalLimitBtn.addEventListener('mouseenter', () => {
        // --- THE FIX ---
        // 1. Immediately silence the computer voice so 'limit_confirm.mp3' is clear
        window.speechSynthesis.cancel();
        
        // 2. Kill any other lingering MP3s (like 'slide_here.mp3')
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
        }

        // 3. Play the identification audio
        playLimitMP3('limit_confirm.mp3');
    });

    finalLimitBtn.addEventListener('dblclick', () => {
        // 1. Double-check silence for both engines
        window.speechSynthesis.cancel();
        if (window.currentAudio) window.currentAudio.pause();

        // 2. Play the final confirmation MP3
        playLimitMP3('final_limit_confirm.mp3');

        // 3. Close the panel
        setTimeout(() => {
            const layer = document.getElementById('limit-layer');
            if (layer) layer.classList.remove('is-open');
            
            // Optional: Reset for next time the panel opens
            limitSlider.value = 500;
            limitText.innerText = "$500";
        }, 2500);
    });

    // Mobile touch support
    finalLimitBtn.addEventListener('touchstart', (e) => {
        // Kill computer voice on first touch of the button too
        window.speechSynthesis.cancel();
        
        const now = Date.now();
        const lastTap = parseInt(finalLimitBtn.dataset.lastTap) || 0;
        if (now - lastTap < 300) {
            finalLimitBtn.dispatchEvent(new Event('dblclick'));
        } else {
            playLimitMP3('limit_confirm.mp3');
        }
        finalLimitBtn.dataset.lastTap = now;
    });
}

// 5. RESET: Clear speech and MP3 if panel is closed via "Close" button
if (closeLimitBtn) {
    closeLimitBtn.addEventListener('click', () => {
        if (window.currentAudio) window.currentAudio.pause();
        window.speechSynthesis.cancel(); // Stops the computer if it's still talking
        document.getElementById('limit-layer').classList.remove('is-open');
    });
}

//---------------------------- END of LIMIT PANEL --------------------------------------//

//---------------------------- Security and Policies PANEL --------------------------------------//
const closeJ = document.getElementById('close-security');

const securityCloseFocus = () => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    // Identifies the button for blind users
    window.currentAudio = new Audio(`audio/${activeVoice}/close.mp3`);
    window.currentAudio.play().catch(err => console.log("Missing: close.mp3"));
};

const executeCloseSecurity = () => {
   
    if (securityLayer) securityLayer.classList.remove('is-open'); 
    if (window.currentAudio) { 
        window.currentAudio.pause(); 
        window.currentAudio.currentTime = 0; 
    }
};

if (closeJ) {
    // Audio on Hover
    closeJ.addEventListener('mouseenter', securityCloseFocus);
    closeJ.addEventListener('dblclick', executeCloseSecurity);
    closeJ.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const now = Date.now();
        const lastTap = parseInt(closeJ.dataset.lastTap) || 0;
        
        if (now - lastTap < 300) {
            executeCloseSecurity(); // Silent Close
        } else {
            securityCloseFocus(); // Voice identification
        }
        closeJ.dataset.lastTap = now;
    });
}

// --- SECURITY & PRIVACY LOGIC (Integrated Pattern) ---
const stealthToggle = document.getElementById('stealth-toggle');

// Helper specific to this panel (reusing your proven logic)
const playSecurityMP3 = (fileName) => {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio.currentTime = 0;
    }
    // Matches your pathing logic: audio/voiceName/filename.mp3
    const voice = (typeof activeVoice !== 'undefined') ? activeVoice : 'default';
    window.currentAudio = new Audio(`audio/${voice}/${fileName}`);
    window.currentAudio.load();
    window.currentAudio.play().catch(e => console.log("Audio blocked or missing:", fileName));
};

if (stealthToggle) {
    // 1. Identification: Play sound as soon as mouse enters
    stealthToggle.addEventListener('mouseenter', () => {
        // Stop any browser speech first to keep audio clear
        window.speechSynthesis.cancel();
        
        // Play the toggle-specific identification sound
        playSecurityMP3('security_toggle.mp3');
    });

    // 2. Double Click Activation
    stealthToggle.addEventListener('dblclick', () => {
        // Kill both engines immediately
        window.speechSynthesis.cancel();
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
        }

        // Apply your global blur CSS
        document.body.classList.add('stealth-active');
        
        // UI Visual Update
        stealthToggle.innerText = "ON";
        stealthToggle.style.backgroundColor = "#66cc33";
        stealthToggle.style.color = "#000";

        // 3. Browser Voice Hand-off
        const msg = new SpeechSynthesisUtterance("stealth authorized");
        msg.rate = 0.9;

        // 4. Panel Cleanup (Runs after voice ends)
        msg.onend = () => {
            // Reuses your existing function to remove 'is-open' and clear audio
            if (typeof executeCloseSecurity === "function") {
                executeCloseSecurity();
            }
            
            // Safety hide
            const securityLayer = document.getElementById('security-layer');
            if (securityLayer) securityLayer.classList.remove('is-open');
        };

        window.speechSynthesis.speak(msg);
    });
}
//---------------------------- END of Security & Policies PANEL --------------------------------------//
//---------------------------- LOG OUT LOGIC --------------------------------------//

const logoutBtn = document.querySelector('[data-label="logout"]');

if (logoutBtn) {
    // 1. Identification (Hover)
    logoutBtn.addEventListener('mouseenter', () => {
        // Updated to the correct filename: logout.mp3
        // If it's in the root, we use the direct name. 
        // If it's in a folder, use: playSecurityMP3('logout.mp3');
        playSecurityMP3('logout.mp3'); 
    });

    // 2. Final Action (Double Click)
    logoutBtn.addEventListener('dblclick', () => {
        // Kill the hover sound immediately
        if (window.currentAudio) {
            window.currentAudio.pause();
            window.currentAudio.currentTime = 0;
        }

        // Play final shutdown audio
        const shutdownAudio = new Audio(`audio/${activeVoice}/system_offline.mp3`);
        
         shutdownAudio.play().then(() => {
            // This waits for the FULL 14 seconds (or however long the file is)
            shutdownAudio.onended = () => {
                window.location.href = 'index.html'; 
            };
        }).catch(() => {
            // Only runs if the audio CANNOT play at all
            // Redirect immediately so the user isn't stuck
            window.location.href = 'index.html';
        });
    });
}



