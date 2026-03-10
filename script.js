// Configuration de base
const REGIONS = ["ITALIE", "GRÈCE", "ASSYRIE", "ÉGYPTE", "NUMIDIE"];
const REGIONS_EMOJI = {
    "ITALIE": "🇮🇹", 
    "GRÈCE": "🇬🇷", 
    "ASSYRIE": "🇸🇾", 
    "ÉGYPTE": "🇪🇬", 
    "NUMIDIE": "🇩🇿"
};

// Types d'unités militaires
const MILITARY_UNITS = {
    INFANTRY: { name: "Infanterie", emoji: "⚔️", icon: "fa-shield-alt", priority: 3 },
    CAVALRY: { name: "Cavalerie", emoji: "🐎", icon: "fa-horse", priority: 2 },
    SIEGE: { name: "Engin de siège", emoji: "🏹", icon: "fa-crosshairs", priority: 1 }
};

// Actions du jeu conformes aux règles avec détails complets
const ACTIONS_BASE = [
    { 
        title: "CONSTRUCTION", 
        icon: "fa-hammer",
        content: `
            <div class="action-layout">
                <div class="cost-indicator">🪨 Coût: 1 Pierre</div>
                <div class="action-options">
                    <div class="option-row">
                        <span class="option-number">1</span>
                        <span class="option-text"><strong>Projet et Village</strong></span>
                    </div>
                    <div class="option-row">
                        <span class="option-number">2</span>
                        <span class="option-text"><strong>Cité et Village</strong></span>
                    </div>
                    <div class="option-row">
                        <span class="option-number">3</span>
                        <span class="option-text"><strong>Village</strong> et <span class="resource-icon">🪨</span></span>
                    </div>
                </div>
                <div class="action-divider">OU</div>
                <div class="priority-note">Ex-aequo = Symbole du conseiller, sinon le plus à droite</div>
            </div>
        `, 
        footer: "⚖️ Ex-aequo = Symbole du conseiller, sinon le plus à droite",
        type: "construction",
        cost: { pierre: 1 },
        production: { pierre: 3 }
    },
    { 
        title: "CONSTRUCTION", 
        icon: "fa-hammer",
        content: `
            <div class="action-layout">
                <div class="cost-indicator">🪨 Coût: 1 Pierre</div>
                <div class="action-options">
                    <div class="option-row">
                        <span class="option-number">1</span>
                        <span class="option-text"><strong>Cité et Village</strong></span>
                    </div>
                    <div class="option-row">
                        <span class="option-number">2</span>
                        <span class="option-text"><strong>Projet et Village</strong></span>
                    </div>
                    <div class="option-row">
                        <span class="option-number">3</span>
                        <span class="option-text"><strong>Village</strong> et <span class="resource-icon">🪨</span></span>
                    </div>
                </div>
                <div class="action-divider">OU</div>
                <div class="priority-note">Ex-aequo = Symbole du conseiller, sinon le plus à droite</div>
            </div>
        `, 
        footer: "⚖️ Ex-aequo = Symbole du conseiller, sinon le plus à droite",
        type: "construction",
        cost: { pierre: 1 },
        production: { pierre: 3 }
    },
    { 
        title: "TECHNOLOGIE", 
        icon: "fa-microchip",
        content: `
            <div class="action-layout">
                <div class="cost-indicator">💡 Coût: 1 Idée</div>
                <div class="action-options">
                    <div class="option-row">
                        <span class="option-number">1</span>
                        <span class="option-text"><strong>? PV</strong> <span class="resource-icon">➕</span> à gauche</span>
                    </div>
                    <div class="option-row">
                        <span class="option-number">2</span>
                        <span class="option-text"><strong>2PV / 3PV</strong> <span class="resource-icon">➕</span> à gauche</span>
                    </div>
                    <div class="option-row">
                        <span class="option-number">3</span>
                        <span class="option-text"><strong>Le plus de symboles</strong> <span class="resource-icon">➕</span> à gauche</span>
                    </div>
                </div>
                <div class="action-divider">OU</div>
                <div class="priority-note">Ex-aequo = Symbole du conseiller, sinon le plus à gauche</div>
            </div>
        `, 
        footer: "⚖️ Ex-aequo = Symbole du conseiller, sinon le plus à gauche",
        type: "tech",
        cost: { idee: 1 },
        production: { idee: 3 }
    },
    { 
        title: "MILITAIRE", 
        icon: "fa-shield-alt",
        content: `
            <div class="action-layout military-layout">
                <div class="military-icon">⚔️</div>
                <div class="military-text">
                    <p><strong>+ TECHNOLOGIE</strong></p>
                    <p class="small-text">Prenez la carte Technologie la plus à gauche</p>
                </div>
            </div>
        `, 
        footer: "⚖️ Ex-aequo = Symbole du conseiller, sinon le plus à gauche",
        type: "military"
    },
    { 
        title: "IMPÔT / TAXE", 
        icon: "fa-coins",
        content: `
            <div class="action-layout pending-layout">
                <div class="cost-indicator">🌾 Coût: 1 Nourriture</div>
                <div class="pending-check">
                    <p><span class="badge">SI</span> <strong>Population</strong> se trouve à côté de la défausse :</p>
                    <p class="pending-result">✅ Gagnez une unité militaire</p>
                </div>
                <div class="action-divider">SINON :</div>
                <div class="pending-action">
                    <p>Prenez la carte <strong>Impôt & Taxe</strong> provoquant le moins de trouble</p>
                    <p class="small-text">Placez-la à côté de la défausse</p>
                </div>
            </div>
        `,
        type: "taxe",
        cost: { nourriture: 1 },
        production: { nourriture: 3 }
    },
    { 
        title: "POPULATION", 
        icon: "fa-users",
        content: `
            <div class="action-layout pending-layout">
                <div class="cost-indicator">🌾 Coût: 1 Nourriture</div>
                <div class="pending-check">
                    <p><span class="badge">SI</span> <strong>Impôt & Taxe</strong> se trouve à côté de la défausse :</p>
                    <p class="pending-result">✅ Gagnez une unité militaire</p>
                </div>
                <div class="action-divider">SINON :</div>
                <div class="pending-action">
                    <p>Prenez la carte <strong>Population</strong> dont le gain est le plus élevé</p>
                    <p class="small-text">Placez-la dans la pile Population</p>
                </div>
            </div>
        `,
        type: "pop",
        cost: { nourriture: 1 },
        production: { nourriture: 3 }
    },
    { 
        title: "REMÉLANGER", 
        icon: "fa-sync-alt",
        content: `
            <div class="action-layout reshuffle-layout">
                <p class="reshuffle-title">Effectuez gratuitement la compétence du conseiller :</p>
                <div class="council-grid" id="council-skills">
                    <!-- Rempli dynamiquement selon le conseiller -->
                </div>
                <div class="action-divider">+</div>
                <p class="reshuffle-bonus">🎁 Gagnez au hasard 1 Merveille ou 1 Succès de civilisation</p>
            </div>
        `,
        type: "reshuffle"
    }
];

// Compétences des conseillers pour la carte Remélanger
const COUNCIL_SKILLS = {
    "General": { icon: "⚔️", text: "Militaire" },
    "Scribe": { icon: "⚔️", text: "Militaire" },
    "Philosophe": { icon: "🔬", text: "Technologie" },
    "Artiste": { icon: "🔬", text: "Technologie" },
    "Magistrat": { icon: "🏗️", text: "Construction" },
    "Ingenieur": { icon: "🏗️", text: "Construction" },
    "Marchand": { icon: "💰", text: "Collectez l'argent du coffre +10" },
    "Pretresse": { icon: "💰", text: "Collectez l'argent du coffre +10" },
    "Agriculteur": { icon: "🌾", text: "Construisez 1 village agricole" }
};

// Bonus des conseillers
const BONUS_MAP = {
    "General": "⚔️ Action Militaire",
    "Scribe": "⚔️ Action Militaire",
    "Philosophe": "🔬 Action Technologie",
    "Artiste": "🔬 Action Technologie",
    "Magistrat": "🏗️ Construction (Cité/Village)",
    "Ingenieur": "🏗️ Construction (Projet/Village)",
    "Marchand": "💰 10 pièces + coffre",
    "Pretresse": "💰 10 pièces + coffre",
    "Agriculteur": "🌾 Village Agricole"
};

// Capacités spéciales des conseillers
const CONSEILLER_SPECIAL = {
    "Artiste": "tech",
    "Ingenieur": "construction_cite",
    "Agriculteur": "village_agricole",
    "General": "military",
    "Magistrat": "construction_projet",
    "Marchand": "argent",
    "Philosophe": "tech",
    "Pretresse": "argent",
    "Scribe": "military"
};

// Coefficients par difficulté (corrigé : valeurs distinctes pour Coriace et Expert)
const DIFFICULTE_DATA = {
    enfantin: { 
        tech: 3, projets: 3, succes: 3, merveilles: 5, 
        argent: 20, pop: 10, cites: 2, villages: 2,
        prod_ressource: 2,
        libelle: "👶 Enfantin"
    },
    modere: { 
        tech: 6, projets: 6, succes: 6, merveilles: 8, 
        argent: 10, pop: 5, cites: 2, villages: 2,
        prod_ressource: 3,
        libelle: "⚖️ Modéré"
    },
    coriace: { 
        tech: 8, projets: 8, succes: 8, merveilles: 10, 
        argent: 7, pop: 6, cites: 2, villages: 2,
        prod_ressource: 4,
        libelle: "🛡️ Coriace"
    },
    expert: { 
        tech: 10, projets: 10, succes: 10, merveilles: 12, 
        argent: 5, pop: 4, cites: 2, villages: 2,
        prod_ressource: 4,
        libelle: "🏆 Expert"
    }
};

// État du jeu étendu (structure simplifiée)
let state = {
    conseiller: "",
    difficulte: "modere",
    expansion: "intermediaire",
    
    setup: {
        heroCradle: null,
        heroSecondCradle: null,
        heroCities: [],
        heroRessources: { idee: 0, pierre: 0, nourriture: 0, argent: 10 },
        playerCradle: null,
        staticRegions: [],
        staticPlacements: []
    },
    
    actionDeck: [],
    discardDeck: [],
    locationDeck: [],
    implantationDeck: [],
    
    pending: null,
    lastCard: null,
    
    // Unités militaires Herobotus
    heroMilitary: {
        infantry: 0,
        cavalry: 0,
        siege: 0
    },
    
    // Piles de cartes Herobotus
    heroPiles: {
        techSymbole: [], // Cartes PV/symbole
        techFixes: [],   // Cartes PV fixes
        projets: [],     // Grands projets
        population: []   // Cartes population
    }
};

// --- INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM chargé, initialisation des écouteurs...");
    
    // Écouteurs d'événements principaux
    const btnStartSetup = document.getElementById('btn-start-setup');
    if (btnStartSetup) btnStartSetup.addEventListener('click', startDetailedSetup);
    
    const btnStartQuick = document.getElementById('btn-start-quick');
    if (btnStartQuick) btnStartQuick.addEventListener('click', startQuickGame);
    
    const btnBackToMain = document.getElementById('btn-back-to-main');
    if (btnBackToMain) btnBackToMain.addEventListener('click', backToMainSetup);
    
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) btnReset.addEventListener('click', resetToSetup);
    
    const btnNext = document.getElementById('btn-next');
    if (btnNext) btnNext.addEventListener('click', drawNextCard);
    
    const btnLoc = document.getElementById('btn-loc');
    if (btnLoc) btnLoc.addEventListener('click', drawLocation);
    
    const btnOpenScore = document.getElementById('btn-open-score');
    if (btnOpenScore) btnOpenScore.addEventListener('click', openScore);
    
    // Boutons de validation
    const btnValidateHeroCities = document.getElementById('btn-validate-hero-cities');
    if (btnValidateHeroCities) btnValidateHeroCities.addEventListener('click', validateHeroCities);
    
    const btnValidateHeroRessources = document.getElementById('btn-validate-hero-ressources');
    if (btnValidateHeroRessources) btnValidateHeroRessources.addEventListener('click', validateHeroRessources);
    
    const btnValidateStatique = document.getElementById('btn-validate-statique');
    if (btnValidateStatique) btnValidateStatique.addEventListener('click', validateStatique);
    
    const btnStartGame = document.getElementById('btn-start-game');
    if (btnStartGame) btnStartGame.addEventListener('click', finalizeSetupAndStart);
    
    // Modal score - fermeture
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeScore);
    
    const modalCloseBtn = document.querySelector('.btn-modal-close');
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeScore);
    
    // Gestionnaires pour les boutons de ressources Herobotus (AJOUT)
    document.querySelectorAll('.hero-res-minus, .hero-res-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isPlus = e.target.classList.contains('hero-res-plus') || e.target.parentElement?.classList.contains('hero-res-plus');
            const button = e.target.classList.contains('hero-res-minus') || e.target.classList.contains('hero-res-plus') ? e.target : e.target.parentElement;
            const resourceType = button.dataset.res;
            const delta = isPlus ? 1 : -1;
            adjustHeroResourceManual(resourceType, delta);
        });
    });
    
    // Initialiser les onglets de score
    initScoreTabs();
    
    console.log("Initialisation terminée");
});

// --- FONCTIONS UTILITAIRES ---

function formatRegionWithEmoji(region) {
    if (!region) return '<span class="region-name">-</span>';
    return `
        <span class="region-display">
            <span class="region-emoji">${REGIONS_EMOJI[region] || '🏛️'}</span>
            <span class="region-name">${region}</span>
        </span>
    `;
}

function formatRegionList(regions) {
    if (!regions || regions.length === 0) {
        return '<span class="region-name">-</span>';
    }
    
    return regions.map(region => `
        <span class="region-badge">
            <span class="region-emoji">${REGIONS_EMOJI[region] || '🏛️'}</span>
            <span class="region-name">${region}</span>
        </span>
    `).join('');
}

function createRegionButton(region, options = {}) {
    const { small = false, selected = false, onClick = null } = options;
    
    const button = document.createElement('button');
    button.className = `region-btn ${small ? 'small' : ''} ${selected ? 'selected' : ''}`;
    button.dataset.region = region;
    
    const emoji = document.createElement('span');
    emoji.className = 'region-emoji';
    emoji.textContent = REGIONS_EMOJI[region] || '🏛️';
    
    const name = document.createElement('span');
    name.className = 'region-name';
    name.textContent = region;
    
    button.appendChild(emoji);
    button.appendChild(name);
    
    if (onClick) {
        button.addEventListener('click', onClick);
    }
    
    return button;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getConseillerLabel(conseiller) {
    const labels = {
        "General": "⚔️ Général", "Scribe": "📜 Scribe", "Philosophe": "🤔 Philosophe",
        "Artiste": "🎨 Artiste", "Magistrat": "⚖️ Magistrat", "Ingenieur": "🏗️ Ingénieur",
        "Marchand": "💰 Marchand", "Pretresse": "🕊️ Prêtresse", "Agriculteur": "🌾 Agriculteur"
    };
    return labels[conseiller] || conseiller;
}

function getExpansionLabel(expansion) {
    const labels = {
        "isolationniste": "🏝️ Isolationniste",
        "intermediaire": "⚖️ Intermédiaire",
        "agressif": "⚔️ Agressif"
    };
    return labels[expansion] || expansion;
}

function getProductionAmount() {
    return DIFFICULTE_DATA[state.difficulte].prod_ressource;
}

function animateResourceChange(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.classList.add('changed');
        setTimeout(() => {
            el.classList.remove('changed');
        }, 300);
    }
}

// --- GESTION DE LA MISE EN PLACE ---

function startDetailedSetup() {
    console.log("Démarrage de la configuration détaillée");
    
    const selectConseiller = document.getElementById('select-conseiller');
    const selectDifficulte = document.getElementById('select-difficulte');
    const selectExpansion = document.getElementById('select-expansion');
    
    if (selectConseiller) state.conseiller = selectConseiller.value;
    if (selectDifficulte) state.difficulte = selectDifficulte.value;
    if (selectExpansion) state.expansion = selectExpansion.value;
    
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('setup-detailed-screen').style.display = 'block';
    
    initStep1();
}

function startQuickGame() {
    console.log("Démarrage de la configuration rapide");
    
    const selectConseiller = document.getElementById('select-conseiller');
    const selectDifficulte = document.getElementById('select-difficulte');
    const selectExpansion = document.getElementById('select-expansion');
    
    if (selectConseiller) state.conseiller = selectConseiller.value;
    if (selectDifficulte) state.difficulte = selectDifficulte.value;
    if (selectExpansion) state.expansion = selectExpansion.value;
    
    const regions = shuffleArray([...REGIONS]);
    
    state.setup.heroCradle = regions[0];
    state.setup.heroSecondCradle = regions[1];
    state.setup.heroCities = [regions[0], regions[1]];
    state.setup.heroRessources = { idee: 2, pierre: 2, nourriture: 2, argent: 10 };
    state.setup.playerCradle = regions[2];
    state.setup.staticRegions = [regions[3], regions[4]];
    state.setup.staticPlacements = [];
    
    finalizeSetupAndStart();
}

function initStep1() {
    const step1 = document.getElementById('step-berceau-hero');
    if (step1) step1.style.display = 'block';
    
    const container = document.getElementById('hero-cradle-selector');
    if (!container) return;
    
    container.innerHTML = '';
    
    REGIONS.forEach(region => {
        const btn = createRegionButton(region, {
            onClick: () => selectHeroCradle(region)
        });
        container.appendChild(btn);
    });
}

function selectHeroCradle(region) {
    state.setup.heroCradle = region;
    
    document.querySelectorAll('#hero-cradle-selector .region-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.region === region) {
            btn.classList.add('selected');
        }
    });
    
    document.getElementById('step-berceau-hero').style.display = 'none';
    initStep2();
}

function initStep2() {
    const step2 = document.getElementById('step-cites-hero');
    if (step2) step2.style.display = 'block';
    
    const availableRegions = REGIONS.filter(r => r !== state.setup.heroCradle);
    const container = document.getElementById('hero-second-berceau');
    if (!container) return;
    
    container.innerHTML = '';
    
    availableRegions.forEach(region => {
        const btn = createRegionButton(region, {
            onClick: () => selectHeroSecondCradle(region)
        });
        container.appendChild(btn);
    });
}

function selectHeroSecondCradle(region) {
    state.setup.heroSecondCradle = region;
    state.setup.heroCities = [state.setup.heroCradle, region];
    
    document.querySelectorAll('#hero-second-berceau .region-btn').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.region === region) {
            btn.classList.add('selected');
        }
    });
    
    const btnValidate = document.getElementById('btn-validate-hero-cities');
    if (btnValidate) btnValidate.disabled = false;
}

function validateHeroCities() {
    document.getElementById('step-cites-hero').style.display = 'none';
    initStep3();
}

function initStep3() {
    const step3 = document.getElementById('step-ressources-hero');
    if (step3) step3.style.display = 'block';
    
    // Simulation des jetons Cache
    const cacheValues = [
        { type: 'idee', value: 3 },
        { type: 'pierre', value: 2 },
        { type: 'nourriture', value: 1 }
    ];
    
    cacheValues.sort((a, b) => b.value - a.value);
    
    const infoDiv = document.getElementById('hero-ressources-info');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <p>📦 Jetons Cache disponibles (simulés) :</p>
            <ul>
                <li>💡 Idée: ${cacheValues[0].value} (plus grand)</li>
                <li>🪨 Pierre: ${cacheValues[1].value}</li>
                <li>🌾 Nourriture: ${cacheValues[2].value} (plus petit)</li>
            </ul>
            <p>➡️ Selon les règles, Herobotus reçoit :</p>
            <p><strong>3 💡 + 2 🪨 + 1 🌾</strong></p>
            <p>💰 Argent de départ: 10 pièces (ajustable)</p>
        `;
    }
    
    state.setup.heroRessources[cacheValues[0].type] = 3;
    state.setup.heroRessources[cacheValues[1].type] = 2;
    state.setup.heroRessources[cacheValues[2].type] = 1;
    state.setup.heroRessources.argent = 10;
    
    const ideeInput = document.getElementById('hero-idee-start');
    if (ideeInput) ideeInput.value = state.setup.heroRessources.idee;
    
    const pierreInput = document.getElementById('hero-pierre-start');
    if (pierreInput) pierreInput.value = state.setup.heroRessources.pierre;
    
    const nourritureInput = document.getElementById('hero-nourriture-start');
    if (nourritureInput) nourritureInput.value = state.setup.heroRessources.nourriture;
    
    const argentInput = document.getElementById('hero-argent-start');
    if (argentInput) argentInput.value = state.setup.heroRessources.argent;
    
    const btnValidate = document.getElementById('btn-validate-hero-ressources');
    if (btnValidate) btnValidate.disabled = false;
}

// Fonction pour ajuster les ressources de départ (appelée depuis le HTML)
function adjustHeroRessource(type, delta) {
    const current = state.setup.heroRessources[type];
    // Max différent selon le type (5 pour les ressources, 20 pour l'argent)
    const maxValue = (type === 'argent') ? 20 : 5;
    const newValue = Math.max(0, Math.min(maxValue, current + delta));
    state.setup.heroRessources[type] = newValue;
    
    const input = document.getElementById(`hero-${type}-start`);
    if (input) input.value = newValue;
    animateResourceChange(`hero-${type}-start`);
}

// NOUVELLE FONCTION: Ajustement manuel des ressources en jeu
function adjustHeroResourceManual(type, delta) {
    if (!state.setup || !state.setup.heroRessources) return;
    
    // Valeur actuelle
    const currentValue = state.setup.heroRessources[type] || 0;
    
    // Limites différentes selon le type
    let maxValue = 20; // par défaut pour l'argent
    if (type !== 'argent') {
        maxValue = 10; // pour les ressources (idée, pierre, nourriture)
    }
    
    const newValue = Math.max(0, Math.min(maxValue, currentValue + delta));
    state.setup.heroRessources[type] = newValue;
    
    // Mettre à jour l'affichage
    const element = document.getElementById(`hero-res-${type}`);
    if (element) {
        element.innerText = newValue;
        animateResourceChange(`hero-res-${type}`);
    }
    
    console.log(`Ressource ${type} ajustée à ${newValue}`);
}

function validateHeroRessources() {
    document.getElementById('step-ressources-hero').style.display = 'none';
    
    // Sauvegarder l'argent aussi
    const argentInput = document.getElementById('hero-argent-start');
    if (argentInput) {
        const argentValue = parseInt(argentInput.value) || 10;
        state.setup.heroRessources.argent = argentValue;
    }
    
    initStep4();
}

function initStep4() {
    const step4 = document.getElementById('step-berceau-joueur');
    if (step4) step4.style.display = 'block';
    
    const availableRegions = REGIONS.filter(r => !state.setup.heroCities.includes(r));
    const container = document.getElementById('player-berceau');
    if (!container) return;
    
    container.innerHTML = '';
    
    availableRegions.forEach(region => {
        const btn = createRegionButton(region, {
            onClick: () => {
                state.setup.playerCradle = region;
                
                container.querySelectorAll('.region-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                
                setTimeout(() => {
                    document.getElementById('step-berceau-joueur').style.display = 'none';
                    initStep5();
                }, 500);
            }
        });
        container.appendChild(btn);
    });
}

function initStep5() {
    const step5 = document.getElementById('step-statique');
    if (step5) step5.style.display = 'block';
    
    const usedRegions = [state.setup.heroCradle, state.setup.heroSecondCradle, state.setup.playerCradle];
    const availableRegions = REGIONS.filter(r => !usedRegions.includes(r));
    
    if (availableRegions.length < 2) {
        alert("Erreur: pas assez de régions disponibles pour le joueur statique");
        return;
    }
    
    const selectors = [
        document.getElementById('statique-select-1'),
        document.getElementById('statique-select-2')
    ];
    
    selectors.forEach((selector, index) => {
        if (!selector) return;
        selector.innerHTML = '';
        availableRegions.forEach(region => {
            const btn = createRegionButton(region, {
                small: true,
                onClick: () => {
                    state.setup.staticRegions[index] = region;
                    
                    selector.querySelectorAll('.region-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    
                    if (state.setup.staticRegions.length === 2 && 
                        state.setup.staticRegions[0] && state.setup.staticRegions[1]) {
                        const btnValidate = document.getElementById('btn-validate-statique');
                        if (btnValidate) btnValidate.disabled = false;
                    }
                }
            });
            selector.appendChild(btn);
        });
    });
}

function validateStatique() {
    document.getElementById('step-statique').style.display = 'none';
    initStep6();
}

function initStep6() {
    const step6 = document.getElementById('step-final');
    if (step6) step6.style.display = 'block';
    
    const recap = document.getElementById('setup-recap');
    if (!recap) return;
    
    recap.innerHTML = `
        <li><i class="fas fa-baby"></i> ${formatRegionWithEmoji(state.setup.heroCradle)} - Berceau Herobotus</li>
        <li><i class="fas fa-city"></i> ${formatRegionWithEmoji(state.setup.heroSecondCradle)} - Deuxième cité Herobotus</li>
        <li><i class="fas fa-coins"></i> Ressources: 💡${state.setup.heroRessources.idee} 🪨${state.setup.heroRessources.pierre} 🌾${state.setup.heroRessources.nourriture} 💰${state.setup.heroRessources.argent}</li>
        <li><i class="fas fa-user"></i> ${formatRegionWithEmoji(state.setup.playerCradle)} - Votre Berceau</li>
        <li><i class="fas fa-chess-board"></i> Joueur statique: ${formatRegionList(state.setup.staticRegions)}</li>
        <li><i class="fas fa-chart-line"></i> Difficulté: ${DIFFICULTE_DATA[state.difficulte].libelle}</li>
        <li><i class="fas fa-crown"></i> Conseiller: ${getConseillerLabel(state.conseiller)}</li>
        <li><i class="fas fa-globe-asia"></i> Expansion: ${getExpansionLabel(state.expansion)}</li>
    `;
}

function finalizeSetupAndStart() {
    console.log("Finalisation et démarrage de la partie");
    
    // Initialisation des unités militaires
    state.heroMilitary = { infantry: 0, cavalry: 0, siege: 0 };
    
    // Initialisation des piles
    state.heroPiles = {
        techSymbole: [],
        techFixes: [],
        projets: [],
        population: []
    };
    
    initializeDecks();
    updateGameUI();
    
    document.getElementById('setup-detailed-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
}

function backToMainSetup() {
    document.getElementById('setup-detailed-screen').style.display = 'none';
    document.getElementById('setup-screen').style.display = 'block';
}

// --- MISE À JOUR DE L'INTERFACE ---

function updateGameUI() {
    const heroCradleEl = document.getElementById('hero-cradle');
    if (heroCradleEl) {
        heroCradleEl.innerHTML = formatRegionWithEmoji(state.setup.heroCradle);
    }
    
    const heroCitiesEl = document.getElementById('hero-cities-list');
    if (heroCitiesEl) {
        heroCitiesEl.innerHTML = formatRegionList(state.setup.heroCities);
    }
    
    const staticCitiesEl = document.getElementById('static-cities-list');
    if (staticCitiesEl) {
        staticCitiesEl.innerHTML = formatRegionList(state.setup.staticRegions);
    }
    
    const infoHeader = document.getElementById('info-header');
    if (infoHeader) {
        infoHeader.innerHTML = `
            <span><i class="fas fa-chart-line"></i> ${DIFFICULTE_DATA[state.difficulte].libelle}</span>
            <span>${BONUS_MAP[state.conseiller]}</span>
        `;
    }
    
    updateHeroRessourcesDisplay();
    updateHeroMilitaryDisplay();
    updateHeroPilesDisplay();
    updateDeckCount();
    updatePendingDisplay();
}

function updateHeroRessourcesDisplay() {
    const ideeEl = document.getElementById('hero-res-idee');
    if (ideeEl) ideeEl.innerText = state.setup.heroRessources.idee;
    
    const pierreEl = document.getElementById('hero-res-pierre');
    if (pierreEl) pierreEl.innerText = state.setup.heroRessources.pierre;
    
    const nourritureEl = document.getElementById('hero-res-nourriture');
    if (nourritureEl) nourritureEl.innerText = state.setup.heroRessources.nourriture;
    
    const argentEl = document.getElementById('hero-res-argent');
    if (argentEl) argentEl.innerText = state.setup.heroRessources.argent;
}

function updateHeroMilitaryDisplay() {
    const infantryEl = document.getElementById('hero-infantry');
    if (infantryEl) infantryEl.innerText = state.heroMilitary.infantry;
    
    const cavalryEl = document.getElementById('hero-cavalry');
    if (cavalryEl) cavalryEl.innerText = state.heroMilitary.cavalry;
    
    const siegeEl = document.getElementById('hero-siege');
    if (siegeEl) siegeEl.innerText = state.heroMilitary.siege;
}

function updateHeroPilesDisplay() {
    const techSymboleEl = document.getElementById('pile-tech-symbole-count');
    if (techSymboleEl) techSymboleEl.innerText = state.heroPiles.techSymbole.length;
    
    const techFixesEl = document.getElementById('pile-tech-fixes-count');
    if (techFixesEl) techFixesEl.innerText = state.heroPiles.techFixes.length;
    
    const projetsEl = document.getElementById('pile-projets-count');
    if (projetsEl) projetsEl.innerText = state.heroPiles.projets.length;
    
    const populationEl = document.getElementById('pile-population-count');
    if (populationEl) populationEl.innerText = state.heroPiles.population.length;
}

function updateDeckCount() {
    const count = state.actionDeck.length;
    const deckCountEl = document.getElementById('deck-count');
    if (deckCountEl) {
        deckCountEl.innerHTML = `<i class="fas fa-layer-group"></i> Cartes : <span>${count}</span>`;
    }
}

function updatePendingDisplay() {
    const pendingText = state.pending ? 
        (state.pending === "taxe" ? "💰 Impôt/Taxe" : "👥 Population") : 
        "-";
    const pendingEl = document.getElementById('pending-display');
    if (pendingEl) {
        pendingEl.innerHTML = `<i class="fas fa-hourglass-half"></i> Attente : <span>${pendingText}</span>`;
    }
}

// --- INITIALISATION DES DECKS ---

function initializeDecks() {
    // Paquet d'actions
    state.actionDeck = [...ACTIONS_BASE];
    shuffleArray(state.actionDeck);
    
    // Paquet de lieux (régions) - pour les cartes Berceau
    state.locationDeck = [];
    for(let i = 0; i < 2; i++) { // 2 exemplaires de chaque région pour les berceaux
        state.locationDeck.push(...REGIONS);
    }
    shuffleArray(state.locationDeck);
    
    // Paquet d'implantation
    state.implantationDeck = createImplantationDeck();
    shuffleArray(state.implantationDeck);
    
    state.discardDeck = [];
    state.pending = null;
}

function createImplantationDeck() {
    const deck = [];
    
    switch(state.expansion) {
        case 'isolationniste':
            if (state.setup.heroCities) {
                state.setup.heroCities.forEach(region => {
                    deck.push({ type: 'region', region: region });
                    deck.push({ type: 'region', region: region });
                });
            }
            if (state.setup.staticRegions) {
                state.setup.staticRegions.forEach(region => {
                    deck.push({ type: 'region', region: region });
                });
            }
            deck.push({ type: 'reshuffle' });
            if (state.setup.heroCradle) deck.push({ type: 'cradle', region: state.setup.heroCradle });
            if (state.setup.heroSecondCradle) deck.push({ type: 'cradle', region: state.setup.heroSecondCradle });
            if (state.setup.staticRegions && state.setup.staticRegions.length > 0) {
                deck.push({ type: 'region', region: state.setup.staticRegions[Math.floor(Math.random() * state.setup.staticRegions.length)] });
            }
            break;
            
        case 'intermediaire':
            REGIONS.forEach(region => {
                deck.push({ type: 'region', region: region });
                deck.push({ type: 'region', region: region });
            });
            deck.push({ type: 'reshuffle' });
            deck.push({ type: 'penurie' });
            deck.push({ type: 'penurie' });
            if (state.setup.heroCradle) deck.push({ type: 'cradle', region: state.setup.heroCradle });
            if (state.setup.staticRegions && state.setup.staticRegions.length > 0) {
                deck.push({ type: 'region', region: state.setup.staticRegions[Math.floor(Math.random() * state.setup.staticRegions.length)] });
            }
            break;
            
        case 'agressif':
            REGIONS.forEach(region => {
                deck.push({ type: 'region', region: region });
                deck.push({ type: 'region', region: region });
            });
            deck.push({ type: 'reshuffle' });
            deck.push({ type: 'penurie' });
            if (state.setup.playerCradle) deck.push({ type: 'region', region: state.setup.playerCradle });
            if (state.setup.staticRegions) {
                state.setup.staticRegions.forEach(region => {
                    deck.push({ type: 'region', region: region });
                });
            }
            break;
    }
    
    return deck;
}

// --- FONCTIONS DE JEU AVEC AUTOMATISATION ---

function drawNextCard() {
    if (state.actionDeck.length === 0) {
        if (state.discardDeck.length === 0) {
            alert("❌ Plus de cartes disponibles !");
            return;
        }
        state.actionDeck = [...state.discardDeck];
        shuffleArray(state.actionDeck);
        state.discardDeck = [];
        alert("🔄 Remélange de la défausse !");
    }

    const card = state.actionDeck.pop();
    state.discardDeck.push(card);
    state.lastCard = card;
    
    displayCard(card);
    updateDeckCount();
}

function displayCard(card) {
    const contentEl = document.getElementById('card-content');
    const titleEl = document.getElementById('card-title');
    
    if (!contentEl || !titleEl) return;
    
    // Mettre à jour le titre avec icône
    titleEl.innerHTML = `<i class="fas ${card.icon || 'fa-dice-d6'}"></i> ${card.title}`;
    
    const priorityRuleEl = document.getElementById('card-priority-rule');
    
    if (card.type === "taxe" || card.type === "pop") {
        contentEl.innerHTML = card.content;
        if (priorityRuleEl) priorityRuleEl.innerHTML = "⚖️ Ex-aequo = Symbole conseiller";
        handlePendingCard(card);
    } else if (card.type === "reshuffle") {
        // Générer la grille des compétences du conseiller
        const skill = COUNCIL_SKILLS[state.conseiller];
        let councilHtml = '';
        
        if (skill) {
            councilHtml = `
                <div class="council-skill">
                    <span class="skill-icon">${skill.icon}</span>
                    <span class="skill-text">${skill.text}</span>
                </div>
            `;
        }
        
        const reshuffleContent = card.content.replace('<div class="council-grid" id="council-skills"></div>', 
            `<div class="council-grid">${councilHtml}</div>`);
        
        contentEl.innerHTML = reshuffleContent;
        if (priorityRuleEl) priorityRuleEl.innerHTML = "🔄 Effet spécial du conseiller";
        
        applyConseillerBonus();
        
        state.actionDeck = [...state.discardDeck, ...state.actionDeck];
        shuffleArray(state.actionDeck);
        state.discardDeck = [];
    } else if (card.type === "military") {
        contentEl.innerHTML = card.content;
        if (priorityRuleEl) priorityRuleEl.innerHTML = card.footer;
        placeMilitaryUnits();
    } else {
        // Pour les actions avec coût (construction, technologie)
        contentEl.innerHTML = card.content;
        if (priorityRuleEl) priorityRuleEl.innerHTML = card.footer;
        handleActionWithCost(card);
    }
    
    updatePendingDisplay();
}

function handleActionWithCost(card) {
    if (!card.cost) return;
    
    const productionAmount = getProductionAmount();
    let canPay = true;
    let missingResource = "";
    let resourceIcon = "";
    
    // Vérifier si Herobotus peut payer (utilisation directe de setup.heroRessources)
    if (card.cost.pierre && state.setup.heroRessources.pierre < card.cost.pierre) {
        canPay = false;
        missingResource = "Pierre";
        resourceIcon = "🪨";
    } else if (card.cost.idee && state.setup.heroRessources.idee < card.cost.idee) {
        canPay = false;
        missingResource = "Idée";
        resourceIcon = "💡";
    } else if (card.cost.nourriture && state.setup.heroRessources.nourriture < card.cost.nourriture) {
        canPay = false;
        missingResource = "Nourriture";
        resourceIcon = "🌾";
    }
    
    const contentEl = document.getElementById('card-content');
    
    if (canPay) {
        // Payer le coût
        if (card.cost.pierre) {
            state.setup.heroRessources.pierre -= card.cost.pierre;
            animateResourceChange('hero-res-pierre');
        }
        if (card.cost.idee) {
            state.setup.heroRessources.idee -= card.cost.idee;
            animateResourceChange('hero-res-idee');
        }
        if (card.cost.nourriture) {
            state.setup.heroRessources.nourriture -= card.cost.nourriture;
            animateResourceChange('hero-res-nourriture');
        }
        
        // Exécuter l'action spécifique
        executeAction(card.type);
        
        // Afficher un message de confirmation
        if (contentEl) {
            contentEl.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i> Action effectuée !<br>
                    <small><i class="fas fa-coins"></i> Herobotus a payé le coût</small>
                </div>
            `;
        }
    } else {
        // Production de ressources
        if (card.production) {
            if (card.production.pierre) {
                state.setup.heroRessources.pierre += productionAmount;
                animateResourceChange('hero-res-pierre');
            }
            if (card.production.idee) {
                state.setup.heroRessources.idee += productionAmount;
                animateResourceChange('hero-res-idee');
            }
            if (card.production.nourriture) {
                state.setup.heroRessources.nourriture += productionAmount;
                animateResourceChange('hero-res-nourriture');
            }
        }
        
        // Afficher un message de production
        if (contentEl) {
            contentEl.innerHTML = `
                <div class="warning-message">
                    <i class="fas fa-exclamation-triangle"></i> Action PRODUCTION<br>
                    <small>${resourceIcon} Herobotus n'avait pas assez de ${missingResource} et produit ${productionAmount} ressources</small>
                </div>
            `;
        }
    }
    
    updateHeroRessourcesDisplay();
}

function executeAction(actionType) {
    // Simuler l'exécution des différentes actions avec ajout aux piles
    switch(actionType) {
        case 'construction':
            // Ajouter un projet aléatoire
            state.heroPiles.projets.push({ type: 'projet', value: Math.floor(Math.random() * 3) + 1 });
            updateHeroPilesDisplay();
            break;
            
        case 'tech':
            // 50% de chance d'être PV/symbole ou PV fixe
            if (Math.random() > 0.5) {
                state.heroPiles.techSymbole.push({ value: Math.floor(Math.random() * 5) + 1 });
            } else {
                state.heroPiles.techFixes.push({ value: Math.floor(Math.random() * 4) + 2 });
            }
            updateHeroPilesDisplay();
            break;
            
        case 'taxe':
            // Collecter l'argent
            state.setup.heroRessources.argent += 10;
            animateResourceChange('hero-res-argent');
            updateHeroRessourcesDisplay();
            break;
            
        case 'pop':
            // Ajouter une carte population
            const popValue = Math.floor(Math.random() * 5) + 1;
            state.heroPiles.population.push({ value: popValue });
            updateHeroPilesDisplay();
            break;
    }
}

function applyConseillerBonus() {
    const special = CONSEILLER_SPECIAL[state.conseiller];
    
    switch(special) {
        case 'tech':
            executeAction('tech');
            break;
        case 'construction_cite':
        case 'construction_projet':
            executeAction('construction');
            break;
        case 'military':
            placeMilitaryUnits();
            break;
        case 'village_agricole':
            // Simulation de village agricole
            console.log("Herobotus place un Village Agricole");
            break;
        case 'argent':
            state.setup.heroRessources.argent += 10;
            animateResourceChange('hero-res-argent');
            updateHeroRessourcesDisplay();
            break;
    }
    
    // Ajouter une merveille ou succès aléatoire
    if (Math.random() > 0.5) {
        state.heroPiles.projets.push({ type: 'merveille' });
    } else {
        state.heroPiles.projets.push({ type: 'succes' });
    }
    updateHeroPilesDisplay();
}

function placeMilitaryUnits() {
    // Piocher une carte implantation pour déterminer la région
    if (state.implantationDeck.length === 0) {
        state.implantationDeck = createImplantationDeck();
        shuffleArray(state.implantationDeck);
    }
    
    const card = state.implantationDeck.pop();
    let region = "ITALIE";
    
    if (card && card.type === 'region') {
        region = card.region;
    } else if (card && card.type === 'cradle') {
        region = card.region;
    } else if (card && card.type === 'penurie') {
        region = state.setup.heroCities && state.setup.heroCities.length > 0 ? state.setup.heroCities[0] : "ITALIE";
    }
    
    // Placement des unités : 1 infanterie et 1 cavalerie
    state.heroMilitary.infantry += 1;
    state.heroMilitary.cavalry += 1;
    
    updateHeroMilitaryDisplay();
    
    // Afficher une notification
    const contentEl = document.getElementById('card-content');
    if (contentEl) {
        contentEl.innerHTML = `
            <div class="success-message">
                <i class="fas fa-shield-alt"></i> Unités placées !<br>
                <small><i class="fas fa-map-marker-alt"></i> ${REGIONS_EMOJI[region] || '🏛️'} ${region}</small>
            </div>
        `;
    }
}

function addMilitaryUnit(type, count = 1) {
    switch(type) {
        case 'infantry':
            state.heroMilitary.infantry += count;
            break;
        case 'cavalry':
            state.heroMilitary.cavalry += count;
            break;
        case 'siege':
            state.heroMilitary.siege += count;
            break;
    }
    updateHeroMilitaryDisplay();
}

function removeMilitaryUnit(type, count = 1, priority = 'siege-first') {
    let remaining = count;
    
    if (priority === 'siege-first') {
        const siegeRemove = Math.min(remaining, state.heroMilitary.siege);
        state.heroMilitary.siege -= siegeRemove;
        remaining -= siegeRemove;
        
        if (remaining > 0) {
            const cavalryRemove = Math.min(remaining, state.heroMilitary.cavalry);
            state.heroMilitary.cavalry -= cavalryRemove;
            remaining -= cavalryRemove;
        }
        
        if (remaining > 0) {
            const infantryRemove = Math.min(remaining, state.heroMilitary.infantry);
            state.heroMilitary.infantry -= infantryRemove;
        }
    } else {
        const infantryRemove = Math.min(remaining, state.heroMilitary.infantry);
        state.heroMilitary.infantry -= infantryRemove;
        remaining -= infantryRemove;
        
        if (remaining > 0) {
            const cavalryRemove = Math.min(remaining, state.heroMilitary.cavalry);
            state.heroMilitary.cavalry -= cavalryRemove;
            remaining -= cavalryRemove;
        }
        
        if (remaining > 0) {
            const siegeRemove = Math.min(remaining, state.heroMilitary.siege);
            state.heroMilitary.siege -= siegeRemove;
        }
    }
    
    updateHeroMilitaryDisplay();
}

function handlePendingCard(card) {
    const contentEl = document.getElementById('card-content');
    const isTaxe = card.type === "taxe";
    const productionAmount = getProductionAmount();
    
    if (!contentEl) return;
    
    if (state.pending === (isTaxe ? "pop" : "taxe")) {
        // Vérifier si Herobotus peut payer le coût de la deuxième carte
        let canPay = true;
        
        if (card.cost && card.cost.nourriture && state.setup.heroRessources.nourriture < card.cost.nourriture) {
            canPay = false;
        }
        
        if (canPay) {
            // Payer le coût
            if (card.cost && card.cost.nourriture) {
                state.setup.heroRessources.nourriture -= card.cost.nourriture;
                animateResourceChange('hero-res-nourriture');
            }
            
            contentEl.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i> Action combinée !<br>
                    <small><i class="fas fa-shield-alt"></i> Herobotus gagne une unité militaire</small>
                </div>
            `;
            
            // Gain d'une unité militaire aléatoire
            const unitTypes = ['infantry', 'cavalry', 'siege'];
            const randomUnit = unitTypes[Math.floor(Math.random() * unitTypes.length)];
            addMilitaryUnit(randomUnit, 1);
            
            // Exécuter l'action spécifique
            executeAction(card.type);
        } else {
            // Production si pas assez de ressources
            if (card.production && card.production.nourriture) {
                state.setup.heroRessources.nourriture += productionAmount;
                animateResourceChange('hero-res-nourriture');
            }
            
            contentEl.innerHTML = `
                <div class="warning-message">
                    <i class="fas fa-exclamation-triangle"></i> Action PRODUCTION<br>
                    <small>🌾 Pas assez de Nourriture, production de ${productionAmount}</small>
                </div>
            `;
        }
        
        state.pending = null;
        const priorityRuleEl = document.getElementById('card-priority-rule');
        if (priorityRuleEl) priorityRuleEl.innerHTML = "<i class='fas fa-check'></i> Action combinée réalisée";
    } else {
        // Vérifier si Herobotus peut payer pour mettre en attente
        let canPay = true;
        
        if (card.cost && card.cost.nourriture && state.setup.heroRessources.nourriture < card.cost.nourriture) {
            canPay = false;
        }
        
        if (canPay) {
            // Payer le coût pour mettre en attente
            if (card.cost && card.cost.nourriture) {
                state.setup.heroRessources.nourriture -= card.cost.nourriture;
                animateResourceChange('hero-res-nourriture');
            }
            
            // Mettre à jour l'affichage pour montrer que la carte est en attente
            state.pending = isTaxe ? "taxe" : "pop";
            const priorityRuleEl = document.getElementById('card-priority-rule');
            if (priorityRuleEl) priorityRuleEl.innerHTML = "<i class='fas fa-hourglass-half'></i> Carte en attente";
        } else {
            // Production si pas assez de ressources
            if (card.production && card.production.nourriture) {
                state.setup.heroRessources.nourriture += productionAmount;
                animateResourceChange('hero-res-nourriture');
            }
            
            contentEl.innerHTML = `
                <div class="warning-message">
                    <i class="fas fa-exclamation-triangle"></i> Action PRODUCTION<br>
                    <small>🌾 Pas assez de Nourriture, production de ${productionAmount}</small>
                </div>
            `;
        }
    }
    
    updateHeroRessourcesDisplay();
    updatePendingDisplay();
}

function drawLocation() {
    if (state.implantationDeck.length === 0) {
        state.implantationDeck = createImplantationDeck();
        shuffleArray(state.implantationDeck);
        alert("🔄 Remélange du paquet d'implantation !");
    }
    
    const card = state.implantationDeck.pop();
    let locationText = "";
    let locationIcon = "fa-map-marker-alt";
    
    if (card && card.type === 'region') {
        locationText = `${REGIONS_EMOJI[card.region] || '🏛️'} ${card.region}`;
    } else if (card && card.type === 'penurie') {
        locationText = "⚠️ PÉNURIE";
        locationIcon = "fa-exclamation-triangle";
    } else if (card && card.type === 'reshuffle') {
        locationText = "🔄 REMÉLANGER";
        locationIcon = "fa-sync-alt";
        state.implantationDeck = createImplantationDeck();
        shuffleArray(state.implantationDeck);
    } else if (card && card.type === 'cradle') {
        locationText = `🏛️ Berceau: ${REGIONS_EMOJI[card.region] || '🏛️'} ${card.region}`;
        locationIcon = "fa-baby";
    }
    
    const locDisplay = document.getElementById('loc-display');
    if (locDisplay) {
        locDisplay.innerHTML = `<i class="fas ${locationIcon}"></i> Lieu : <span>${locationText}</span>`;
    }
}

// --- GESTION DU SCORE ---

function initScoreTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabId = e.target.dataset.tab;
            switchTab(tabId);
        });
    });
    
    const btnCalculateScore = document.getElementById('btn-calculate-score');
    if (btnCalculateScore) btnCalculateScore.addEventListener('click', calculateAndShowResult);
    
    const btnResetSaisie = document.getElementById('btn-reset-saisie');
    if (btnResetSaisie) btnResetSaisie.addEventListener('click', resetAllSaisie);
    
    const btnCalculateHeroScore = document.getElementById('btn-calculate-hero-score');
    if (btnCalculateHeroScore) btnCalculateHeroScore.addEventListener('click', calculateHeroScore);
    
    const btnResetHero = document.getElementById('btn-reset-hero');
    if (btnResetHero) btnResetHero.addEventListener('click', resetHeroSaisie);
    
    const btnBackToSaisie = document.querySelector('.btn-back-to-saisie');
    if (btnBackToSaisie) btnBackToSaisie.addEventListener('click', () => switchTab('saisie'));
}

function openScore() {
    updateDifficulteInfo();
    resetResultatTab();
    switchTab('saisie');
    document.getElementById('modal-score').style.display = "flex";
}

function closeScore() {
    document.getElementById('modal-score').style.display = "none";
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const tab = document.getElementById(`tab-${tabId}`);
    if (tab) tab.classList.add('active');
}

function updateDifficulteInfo() {
    const d = DIFFICULTE_DATA[state.difficulte];
    const scoreDifficulte = document.getElementById('score-difficulte');
    if (scoreDifficulte) {
        scoreDifficulte.innerHTML = `
            <i class="fas fa-chart-line"></i> <strong>${d.libelle}</strong> - Production: ${d.prod_ressource} ressources
        `;
    }
    
    const difficulteRappel = document.getElementById('difficulte-rappel');
    if (difficulteRappel) {
        difficulteRappel.innerHTML = `
            <i class="fas fa-info-circle"></i> Difficulté: ${d.libelle} | Tech: ${d.tech} PV | Projets: ${d.projets} PV | 
            Argent: 1 PV / ${d.argent} | Pop: 1 PV / ${d.pop}
        `;
    }
}

function resetResultatTab() {
    const resultatCategories = document.getElementById('resultat-categories');
    if (resultatCategories) resultatCategories.innerHTML = '';
    
    const finalTotal = document.getElementById('final-total');
    if (finalTotal) finalTotal.innerText = '0';
}

function resetAllSaisie() {
    const inputs = document.querySelectorAll('#tab-saisie .score-input');
    inputs.forEach(input => {
        input.value = '0';
    });
}

function resetHeroSaisie() {
    const inputs = document.querySelectorAll('#tab-hero .score-input');
    inputs.forEach(input => {
        input.value = '0';
    });
    const heroScoreResult = document.getElementById('hero-score-result');
    if (heroScoreResult) heroScoreResult.style.display = 'none';
}

function calculateAndShowResult() {
    const d = DIFFICULTE_DATA[state.difficulte];
    
    const valeurs = {
        cites: parseInt(document.getElementById('sc-cites')?.value) || 0,
        villages: parseInt(document.getElementById('sc-villages')?.value) || 0,
        techSymbole: parseInt(document.getElementById('sc-tech-symbole')?.value) || 0,
        techFixes: parseInt(document.getElementById('sc-tech-fixes')?.value) || 0,
        projets: parseInt(document.getElementById('sc-projets')?.value) || 0,
        succes: parseInt(document.getElementById('sc-succes')?.value) || 0,
        merveilles: parseInt(document.getElementById('sc-merveilles')?.value) || 0,
        argent: parseInt(document.getElementById('sc-argent')?.value) || 0,
        pop: parseInt(document.getElementById('sc-pop')?.value) || 0,
        empire: parseInt(document.getElementById('sc-empire')?.value) || 0
    };
    
    const points = {
        cites: valeurs.cites * 2,
        villages: valeurs.villages * 2,
        techSymbole: valeurs.techSymbole * d.tech,
        techFixes: valeurs.techFixes,
        projets: valeurs.projets * d.projets,
        succes: valeurs.succes * d.succes,
        merveilles: valeurs.merveilles * d.merveilles,
        argent: Math.floor(valeurs.argent / d.argent),
        pop: Math.floor(valeurs.pop / d.pop),
        empire: valeurs.empire
    };
    
    const total = Object.values(points).reduce((a, b) => a + b, 0);
    
    let html = '';
    
    if (valeurs.cites > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">🏛️ Cités</span>
            <span class="value">${valeurs.cites} × 2</span>
            <span class="calculation">=</span>
            <span class="points">${points.cites} PV</span>
        </div>`;
    }
    
    if (valeurs.villages > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">🏡 Villages</span>
            <span class="value">${valeurs.villages} × 2</span>
            <span class="calculation">=</span>
            <span class="points">${points.villages} PV</span>
        </div>`;
    }
    
    if (valeurs.techSymbole > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">📜 Tech PV/symbole</span>
            <span class="value">${valeurs.techSymbole} × ${d.tech}</span>
            <span class="calculation">=</span>
            <span class="points">${points.techSymbole} PV</span>
        </div>`;
    }
    
    if (valeurs.techFixes > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">📚 Tech PV fixes</span>
            <span class="value">${valeurs.techFixes}</span>
            <span class="calculation"></span>
            <span class="points">${points.techFixes} PV</span>
        </div>`;
    }
    
    if (valeurs.projets > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">📐 Grands Projets</span>
            <span class="value">${valeurs.projets} × ${d.projets}</span>
            <span class="calculation">=</span>
            <span class="points">${points.projets} PV</span>
        </div>`;
    }
    
    if (valeurs.succes > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">🏅 Succès</span>
            <span class="value">${valeurs.succes} × ${d.succes}</span>
            <span class="calculation">=</span>
            <span class="points">${points.succes} PV</span>
        </div>`;
    }
    
    if (valeurs.merveilles > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">🏛️ Merveilles</span>
            <span class="value">${valeurs.merveilles} × ${d.merveilles}</span>
            <span class="calculation">=</span>
            <span class="points">${points.merveilles} PV</span>
        </div>`;
    }
    
    if (valeurs.argent > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">💰 Argent</span>
            <span class="value">${valeurs.argent} / ${d.argent}</span>
            <span class="calculation">=</span>
            <span class="points">${points.argent} PV</span>
        </div>`;
    }
    
    if (valeurs.pop > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">👥 Population</span>
            <span class="value">${valeurs.pop} / ${d.pop}</span>
            <span class="calculation">=</span>
            <span class="points">${points.pop} PV</span>
        </div>`;
    }
    
    if (valeurs.empire > 0) {
        html += `<div class="resultat-ligne">
            <span class="label">👑 Majorité Empire</span>
            <span class="value">${valeurs.empire}</span>
            <span class="calculation"></span>
            <span class="points">${points.empire} PV</span>
        </div>`;
    }
    
    if (html === '') {
        html = '<p class="placeholder-text"><i class="fas fa-edit"></i> Aucun élément saisi</p>';
    }
    
    const resultatCategories = document.getElementById('resultat-categories');
    if (resultatCategories) resultatCategories.innerHTML = html;
    
    const finalTotal = document.getElementById('final-total');
    if (finalTotal) finalTotal.innerText = total;
    
    switchTab('resultat');
}

function calculateHeroScore() {
    const d = DIFFICULTE_DATA[state.difficulte];
    
    const heroValues = {
        cites: parseInt(document.getElementById('hero-cites')?.value) || 0,
        villages: parseInt(document.getElementById('hero-villages')?.value) || 0,
        techSymbole: parseInt(document.getElementById('hero-tech-symbole')?.value) || 0,
        techFixes: parseInt(document.getElementById('hero-tech-fixes')?.value) || 0,
        projets: parseInt(document.getElementById('hero-projets')?.value) || 0,
        succes: parseInt(document.getElementById('hero-succes')?.value) || 0,
        merveilles: parseInt(document.getElementById('hero-merveilles')?.value) || 0,
        argent: parseInt(document.getElementById('hero-argent')?.value) || 0,
        pop: parseInt(document.getElementById('hero-pop')?.value) || 0,
        empire: parseInt(document.getElementById('hero-empire')?.value) || 0
    };
    
    const heroPoints = {
        constructions: (heroValues.cites + heroValues.villages) * 2,
        techSymbole: heroValues.techSymbole * d.tech,
        techFixes: heroValues.techFixes,
        projets: heroValues.projets * d.projets,
        succes: heroValues.succes * d.succes,
        merveilles: heroValues.merveilles * d.merveilles,
        argent: Math.floor(heroValues.argent / d.argent),
        pop: Math.floor(heroValues.pop / d.pop),
        empire: heroValues.empire
    };
    
    const heroTotal = Object.values(heroPoints).reduce((a, b) => a + b, 0);
    
    let details = '';
    details += `<div><span>🏛️ Constructions:</span> <span>${heroValues.cites + heroValues.villages} × 2 = ${heroPoints.constructions} PV</span></div>`;
    
    if (heroValues.techSymbole > 0) {
        details += `<div><span>📜 Tech PV/symbole:</span> <span>${heroValues.techSymbole} × ${d.tech} = ${heroPoints.techSymbole} PV</span></div>`;
    }
    
    if (heroValues.techFixes > 0) {
        details += `<div><span>📚 Tech PV fixes:</span> <span>${heroValues.techFixes} PV</span></div>`;
    }
    
    if (heroValues.projets > 0) {
        details += `<div><span>📐 Projets:</span> <span>${heroValues.projets} × ${d.projets} = ${heroPoints.projets} PV</span></div>`;
    }
    
    if (heroValues.succes > 0) {
        details += `<div><span>🏅 Succès:</span> <span>${heroValues.succes} × ${d.succes} = ${heroPoints.succes} PV</span></div>`;
    }
    
    if (heroValues.merveilles > 0) {
        details += `<div><span>🏛️ Merveilles:</span> <span>${heroValues.merveilles} × ${d.merveilles} = ${heroPoints.merveilles} PV</span></div>`;
    }
    
    if (heroValues.argent > 0) {
        details += `<div><span>💰 Argent:</span> <span>${heroValues.argent} / ${d.argent} = ${heroPoints.argent} PV</span></div>`;
    }
    
    if (heroValues.pop > 0) {
        details += `<div><span>👥 Population:</span> <span>${heroValues.pop} / ${d.pop} = ${heroPoints.pop} PV</span></div>`;
    }
    
    if (heroValues.empire > 0) {
        details += `<div><span>👑 Majorité Empire:</span> <span>${heroValues.empire} PV</span></div>`;
    }
    
    const heroScoreDetails = document.getElementById('hero-score-details');
    if (heroScoreDetails) heroScoreDetails.innerHTML = details;
    
    const heroTotalCalc = document.getElementById('hero-total-calc');
    if (heroTotalCalc) heroTotalCalc.innerHTML = `<i class="fas fa-calculator"></i> Score total: ${heroTotal} PV`;
    
    const heroScoreResult = document.getElementById('hero-score-result');
    if (heroScoreResult) heroScoreResult.style.display = 'block';
}

// --- RÉINITIALISATION ---

function resetToSetup() {
    if (confirm("Voulez-vous vraiment quitter la partie en cours ?")) {
        state = {
            conseiller: "",
            difficulte: "modere",
            expansion: "intermediaire",
            setup: {
                heroCradle: null,
                heroSecondCradle: null,
                heroCities: [],
                heroRessources: { idee: 0, pierre: 0, nourriture: 0, argent: 10 },
                playerCradle: null,
                staticRegions: [],
                staticPlacements: []
            },
            actionDeck: [],
            discardDeck: [],
            locationDeck: [],
            implantationDeck: [],
            pending: null,
            lastCard: null,
            heroMilitary: { infantry: 0, cavalry: 0, siege: 0 },
            heroPiles: {
                techSymbole: [],
                techFixes: [],
                projets: [],
                population: []
            }
        };
        
        document.getElementById('setup-screen').style.display = 'block';
        document.getElementById('setup-detailed-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'none';
    }
}

// Rendre les fonctions accessibles globalement pour les appels onclick du HTML
window.adjustHeroRessource = adjustHeroRessource;
window.adjustHeroResourceManual = adjustHeroResourceManual;