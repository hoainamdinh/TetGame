/**
 * ============================================================
 * THE TET CIPHER WHEEL — Main Game Engine
 * ============================================================
 * Handles: Screen navigation, game flow, timer, scoring,
 *          round logic, sound effects, animations, confetti.
 * ============================================================
 */

/* ── Sound Effects (Web Audio API) ── */
const SFX = {
  ctx: null,

  /** Initialize AudioContext on first user interaction */
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  /** Play a simple "ting" sound for correct answers */
  ting() {
    this.init();
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  },

  /** Play a buzzer sound when time is up or wrong */
  buzzer() {
    this.init();
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  },

  /** Short click sound */
  click() {
    this.init();
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  },

  /** Triumphant fanfare for game end */
  fanfare() {
    this.init();
    const ctx = this.ctx;
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.6);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.6);
    });
  },

  /** Tick sound for timer warning */
  tick() {
    this.init();
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }
};

/* ── Sakura Petal Generator ── */
function createSakuraPetals() {
  const container = document.getElementById('sakuraContainer');
  if (!container) return;
  container.innerHTML = '';
  const petalCount = 30;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.classList.add('sakura-petal');
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (6 + Math.random() * 8) + 's';
    petal.style.animationDelay = (Math.random() * 10) + 's';
    petal.style.opacity = 0.3 + Math.random() * 0.5;
    container.appendChild(petal);
  }
}

/* ── Confetti Helper ── */
function fireConfetti() {
  if (typeof confetti === 'function') {
    // Burst from center
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D32F2F', '#FFD700', '#FF6F00', '#388E3C', '#FF4081']
    });
    // Side cannons
    setTimeout(() => {
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
    }, 200);
  }
}

/** Big confetti for game end */
function fireBigConfetti() {
  if (typeof confetti !== 'function') return;
  const duration = 3000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#D32F2F', '#FFD700', '#FF6F00']
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#388E3C', '#FF4081', '#FFD700']
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ── Points Popup Animation ── */
function showPointsPopup(points, isPositive = true) {
  const el = document.createElement('div');
  el.className = `points-popup ${isPositive ? 'positive' : 'negative'}`;
  el.textContent = isPositive ? `+${points}` : `${points}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1600);
}

/* ── Question Visual HTML Helper ── */
function getQuestionVisualHtml(questionId, showImage = false) {
  const visual = typeof QUESTION_VISUALS !== 'undefined' ? QUESTION_VISUALS[questionId] : null;
  if (!visual) return '';

  if (showImage && visual.image) {
    return `
      <div class="answer-image-container">
        <img class="answer-image"
             src="${visual.image}"
             alt="${visual.alt || ''}"
             loading="lazy"
             onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <div class="answer-image-fallback" style="display:none;">${visual.emoji}</div>
      </div>
    `;
  }
  return `<div class="question-emoji-visual">${visual.emoji}</div>`;
}

/* ══════════════════════════════════════════
   MAIN GAME OBJECT
   ══════════════════════════════════════════ */
const Game = {
  // ── State ──
  scores: [0, 0, 0, 0],              // Scores for 4 teams
  completedRounds: new Set(),         // Track which rounds are done
  currentRound: null,                 // 'round1' | 'round2' | 'round3' | 'round4'
  currentQuestionIndex: 0,            // 0-9 within a round
  timerInterval: null,
  timerValue: 30,
  isTimerRunning: false,
  isAnswerRevealed: false,
  hint2Shown: false,                  // For Round 2
  envelopePoints: [],                 // Random points for 10 envelopes
  envelopesOpened: new Set(),         // Which envelopes have been opened
  currentEnvelopeIndex: null,         // Currently selected envelope
  currentEnvelopePointValue: 0,       // Points hidden in current envelope
  isDoubled: false,                   // Whether current envelope bet is doubled
  pendingAwardPoints: 0,             // Points to award after team selection

  /* ── Initialize ── */
  init() {
    createSakuraPetals();
    // Fresh start on page load — don't restore old scores
    this.clearStorage();
    this.renderAllLeaderboards();
  },

  /* ── Screen Navigation ── */
  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
    }
    // Show/hide floating leaderboard (only during gameplay screens)
    const floatingLB = document.getElementById('floatingLeaderboard');
    if (floatingLB) {
      const showOn = ['gameScreen', 'envelopeSelectScreen'];
      floatingLB.style.display = showOn.includes(screenId) ? 'block' : 'none';
    }
    // Refresh leaderboards when going to round select
    if (screenId === 'roundSelectScreen') {
      this.renderRoundCards();
      this.renderAllLeaderboards();
    }
  },

  /* ── Start Game ── */
  startGame() {
    SFX.click();
    this.showScreen('roundSelectScreen');
    this.renderRoundCards();
  },

  /* ── Render Round Selection Cards ── */
  renderRoundCards() {
    const container = document.getElementById('roundCardContainer');
    if (!container) return;

    const rounds = [
      { key: 'round1', data: GAME_DATA.round1 },
      { key: 'round2', data: GAME_DATA.round2 },
      { key: 'round3', data: GAME_DATA.round3 },
      { key: 'round4', data: GAME_DATA.round4 },
    ];

    container.innerHTML = rounds.map(r => {
      const done = this.completedRounds.has(r.key);
      return `
        <div class="round-card ${done ? 'completed' : ''}" 
             style="border-left-color:${r.data.color};"
             onclick="${done ? '' : `Game.selectRound('${r.key}')`}"
             ${done ? 'title="Round completed!"' : ''}>
          <div class="round-card-title">${r.data.icon} ${r.data.name}</div>
          <div class="round-card-desc">${r.data.descriptionVi}</div>
        </div>
      `;
    }).join('');
  },

  /* ── Select a Round ── */
  selectRound(roundKey) {
    if (this.completedRounds.has(roundKey)) return;
    SFX.click();
    this.currentRound = roundKey;
    this.currentQuestionIndex = 0;
    this.isAnswerRevealed = false;
    this.hint2Shown = false;

    // Show round intro overlay
    const roundData = GAME_DATA[roundKey];
    const overlay = document.getElementById('roundIntroOverlay');
    document.getElementById('roundIntroTitle').textContent = `${roundData.icon} ${roundData.name}`;
    document.getElementById('roundIntroDesc').innerHTML = `
      <div>${roundData.description}</div>
      <div class="mt-2 opacity-70">${roundData.descriptionVi}</div>
    `;
    overlay.classList.add('active');

    document.getElementById('roundIntroStart').onclick = () => {
      overlay.classList.remove('active');
      if (roundKey === 'round4') {
        this.startRound4();
      } else {
        this.showScreen('gameScreen');
        this.loadQuestion();
      }
    };
  },

  /* ── Load a Question (Rounds 1-3) ── */
  loadQuestion() {
    this.stopTimer();
    this.isAnswerRevealed = false;
    this.hint2Shown = false;

    // Remove cinematic reveal mode from previous question
    const prevCard = document.getElementById('questionCard');
    if (prevCard) prevCard.classList.remove('cinematic-reveal-mode');

    const roundData = GAME_DATA[this.currentRound];
    const questions = roundData.questions;
    const q = questions[this.currentQuestionIndex];

    // Update top bar
    document.getElementById('roundIcon').textContent = roundData.icon;
    document.getElementById('roundName').textContent = roundData.name;
    document.getElementById('questionCounter').textContent =
      `Q ${this.currentQuestionIndex + 1} / ${questions.length}`;

    // Render question based on round type
    const card = document.getElementById('questionCard');
    const controls = document.getElementById('questionControls');

    if (this.currentRound === 'round1') {
      this.renderScrambleQuestion(card, q);
      controls.innerHTML = `
        <button class="btn btn-primary" onclick="Game.revealAnswer()">🔓 Reveal Answer</button>
        <button class="btn btn-success" onclick="Game.openAwardModal(${roundData.pointsPerQuestion})" style="display:none;" id="awardBtn">✅ Award Points (${roundData.pointsPerQuestion} pts)</button>
        <button class="btn btn-sm btn-secondary" style="color:var(--text-dark);border-color:#ccc;display:none;" id="nextBtn" onclick="Game.nextQuestion()">Next →</button>
      `;
    } else if (this.currentRound === 'round2') {
      this.renderRiddleQuestion(card, q);
      controls.innerHTML = `
        <button class="btn btn-primary" onclick="Game.showHint2()" id="hint2Btn">💡 Show Hint 2 (10 pts)</button>
        <button class="btn btn-primary" onclick="Game.revealAnswer()" id="revealBtn">🔓 Reveal Answer</button>
        <button class="btn btn-success" onclick="Game.openAwardModal(${roundData.pointsHint1})" style="display:none;" id="awardBtn">✅ Award Points (<span id="awardPtsLabel">${roundData.pointsHint1}</span> pts)</button>
        <button class="btn btn-sm btn-secondary" style="color:var(--text-dark);border-color:#ccc;display:none;" id="nextBtn" onclick="Game.nextQuestion()">Next →</button>
      `;
    } else if (this.currentRound === 'round3') {
      this.renderCipherQuestion(card, q);
      controls.innerHTML = `
        <button class="btn btn-primary" onclick="Game.revealAnswer()">🔓 Reveal Answer</button>
        <button class="btn btn-success" onclick="Game.openAwardModal(${roundData.pointsPerQuestion})" style="display:none;" id="awardBtn">✅ Award Points (${roundData.pointsPerQuestion} pts)</button>
        <button class="btn btn-sm btn-secondary" style="color:var(--text-dark);border-color:#ccc;display:none;" id="nextBtn" onclick="Game.nextQuestion()">Next →</button>
      `;
    }

    // Start timer
    this.startTimer();
    this.renderAllLeaderboards();
  },

  /* ── Render: Round 1 (Scramble) ── */
  renderScrambleQuestion(card, q) {
    const wordsHtml = q.scrambled.map(word => {
      const letters = word.split('-');
      const lettersHtml = letters.map(l =>
        `<div class="scramble-letter">${l}</div>`
      ).join('');
      return `<div class="scramble-word">${lettersHtml}</div>`;
    }).join('<div class="scramble-slash">/</div>');

    card.innerHTML = `
      <div class="question-main-content">
        <div class="text-sm font-bold opacity-50 uppercase tracking-wider">Question ${q.id}</div>
        ${getQuestionVisualHtml(q.id)}
        <div class="text-lg font-semibold text-gray-500 mb-2">Unscramble the letters:</div>
        <div class="scramble-display">${wordsHtml}</div>
      </div>
      <div id="answerReveal"></div>
    `;
  },

  /* ── Render: Round 2 (Riddles) ── */
  renderRiddleQuestion(card, q) {
    card.innerHTML = `
      <div class="question-main-content">
        <div class="text-sm font-bold opacity-50 uppercase tracking-wider">Question ${q.id}</div>
        ${getQuestionVisualHtml(q.id)}
        <div class="hint-box">
          <div class="hint-label">Hint 1 (20 pts)</div>
          <div>${q.hint1}</div>
        </div>
        <div class="hint-box" id="hint2Box" style="display:none;">
          <div class="hint-label" style="background:#FF9800;">Hint 2 (10 pts)</div>
          <div>${q.hint2}</div>
        </div>
      </div>
      <div id="answerReveal"></div>
    `;
  },

  /* ── Render: Round 3 (Cipher) ── */
  renderCipherQuestion(card, q) {
    // Build cipher reference table
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const tableHtml = alphabet.split('').map((letter, i) => `
      <div class="cipher-cell">
        <span class="cipher-cell-letter">${letter}</span>
        <span class="cipher-cell-number">${i + 1}</span>
      </div>
    `).join('');

    const wordCountHint = q.wordCount ? `<div class="text-sm font-semibold mt-1" style="color:var(--secondary);">🔤 ${q.wordCount} words</div>` : '';

    card.innerHTML = `
      <div class="question-main-content">
        <div class="text-sm font-bold opacity-50 uppercase tracking-wider">Question ${q.id}</div>
        ${getQuestionVisualHtml(q.id)}
        <div class="text-lg font-semibold text-gray-500 mb-2">Decode this cipher:</div>
        <div class="cipher-code">${q.cipherDisplay}</div>
        ${wordCountHint}
        <details class="w-full max-w-xl mt-2">
          <summary class="cursor-pointer text-sm font-bold" style="color:var(--primary);">📋 Show Cipher Key (A=1, B=2...)</summary>
          <div class="cipher-table mt-2">${tableHtml}</div>
        </details>
      </div>
      <div id="answerReveal"></div>
    `;
  },

  /* ── Show Hint 2 (Round 2) ── */
  showHint2() {
    if (this.hint2Shown) return;
    SFX.click();
    this.hint2Shown = true;
    const hint2Box = document.getElementById('hint2Box');
    if (hint2Box) {
      hint2Box.style.display = 'block';
      hint2Box.classList.add('bounce-in');
    }
    const hint2Btn = document.getElementById('hint2Btn');
    if (hint2Btn) hint2Btn.disabled = true;
  },

  /* ── Reveal Answer ── */
  revealAnswer() {
    if (this.isAnswerRevealed) return;
    this.isAnswerRevealed = true;
    this.stopTimer();
    SFX.click();

    const roundData = GAME_DATA[this.currentRound];
    const q = roundData.questions[this.currentQuestionIndex];
    let answer = q.answer;
    let meaningHtml = q.meaningVi ? `<div class="meaning-vi">🇻🇳 ${q.meaningVi}</div>` : '';

    const revealEl = document.getElementById('answerReveal');
    if (revealEl) {
      revealEl.innerHTML = `
        <div class="answer-reveal neutral">
          ${answer}
        </div>
        ${meaningHtml}
        ${getQuestionVisualHtml(q.id, true)}
      `;
    }

    // Cinematic reveal — hide question, enlarge image & answer
    const card = document.getElementById('questionCard');
    if (card) card.classList.add('cinematic-reveal-mode');

    // Show award + next buttons, hide reveal buttons
    const awardBtn = document.getElementById('awardBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (awardBtn) awardBtn.style.display = 'inline-flex';
    if (nextBtn) nextBtn.style.display = 'inline-flex';

    // Update point value for Round 2 depending on hint2
    if (this.currentRound === 'round2') {
      const pts = this.hint2Shown ? roundData.pointsHint2 : roundData.pointsHint1;
      if (awardBtn) {
        awardBtn.textContent = `✅ Award Points (${pts} pts)`;
        awardBtn.onclick = () => Game.openAwardModal(pts);
      }
      const hint2Btn = document.getElementById('hint2Btn');
      if (hint2Btn) hint2Btn.style.display = 'none';
      const revealBtn = document.getElementById('revealBtn');
      if (revealBtn) revealBtn.style.display = 'none';
    }
  },

  /* ── Timer ── */
  startTimer() {
    this.timerValue = 30;
    this.isTimerRunning = true;
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timerValue--;
      this.updateTimerDisplay();

      // Tick sound in last 5 seconds
      if (this.timerValue <= 5 && this.timerValue > 0) {
        SFX.tick();
      }

      if (this.timerValue <= 0) {
        this.stopTimer();
        SFX.buzzer();
        this.onTimerEnd();
      }
    }, 1000);
  },

  stopTimer() {
    this.isTimerRunning = false;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  updateTimerDisplay() {
    const bar = document.getElementById('timerBar');
    const text = document.getElementById('timerText');
    if (!bar || !text) return;

    const pct = (this.timerValue / 30) * 100;
    bar.style.width = pct + '%';
    text.textContent = this.timerValue;

    // Color states
    bar.classList.remove('warning', 'danger');
    text.classList.remove('danger-text');

    if (this.timerValue <= 5) {
      bar.classList.add('danger');
      text.classList.add('danger-text');
    } else if (this.timerValue <= 10) {
      bar.classList.add('warning');
    }
  },

  onTimerEnd() {
    // Auto-reveal answer when timer hits 0
    if (!this.isAnswerRevealed) {
      // Shake the card
      const card = document.getElementById('questionCard');
      if (card) {
        card.classList.add('shake');
        setTimeout(() => card.classList.remove('shake'), 600);
      }
      this.revealAnswer();
    }
  },

  /* ── Next Question ── */
  nextQuestion() {
    SFX.click();
    const roundData = GAME_DATA[this.currentRound];
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex >= roundData.questions.length) {
      // Round completed
      this.completedRounds.add(this.currentRound);
      this.backToRoundSelect();
    } else {
      this.loadQuestion();
    }
  },

  /* ── Back to Round Select ── */
  backToRoundSelect() {
    this.stopTimer();
    this.showScreen('roundSelectScreen');
    this.saveScoresToStorage();
  },

  /* ─────────────────────────────────
     ROUND 4: Lucky Envelope Logic
     ───────────────────────────────── */

  startRound4() {
    // Generate random points for 10 envelopes (10-50, multiples of 10)
    this.envelopePoints = [];
    for (let i = 0; i < 10; i++) {
      this.envelopePoints.push(Math.ceil(Math.random() * 5) * 10); // 10, 20, 30, 40, or 50
    }
    this.envelopesOpened = new Set();
    this.currentEnvelopeIndex = null;
    this.showScreen('envelopeSelectScreen');
    this.renderEnvelopes();
    this.renderAllLeaderboards();
  },

  renderEnvelopes() {
    const grid = document.getElementById('envelopeGrid');
    if (!grid) return;

    grid.innerHTML = GAME_DATA.round4.questions.map((q, i) => {
      const isOpened = this.envelopesOpened.has(i);
      return `
        <div class="envelope ${isOpened ? 'opened' : ''}" 
             onclick="${isOpened ? '' : `Game.pickEnvelope(${i})`}"
             id="envelope${i}">
          ${isOpened ? '✓' : '🧧'}
          <div class="envelope-number">${i + 1}</div>
        </div>
      `;
    }).join('');
  },

  pickEnvelope(index) {
    if (this.envelopesOpened.has(index)) return;
    SFX.click();
    this.currentEnvelopeIndex = index;
    this.currentEnvelopePointValue = this.envelopePoints[index];
    this.isDoubled = false;

    // Show double bet modal
    document.getElementById('doubleModalPoints').textContent = this.currentEnvelopePointValue;
    document.getElementById('doubleModal').classList.add('active');
  },

  acceptDouble() {
    SFX.click();
    this.isDoubled = true;
    document.getElementById('doubleModal').classList.remove('active');
    this.showEnvelopeQuestion();
  },

  declineDouble() {
    SFX.click();
    this.isDoubled = false;
    document.getElementById('doubleModal').classList.remove('active');
    this.showEnvelopeQuestion();
  },

  showEnvelopeQuestion() {
    const q = GAME_DATA.round4.questions[this.currentEnvelopeIndex];
    this.currentQuestionIndex = this.currentEnvelopeIndex;
    this.isAnswerRevealed = false;

    // Remove cinematic reveal mode from previous question
    const prevCard = document.getElementById('questionCard');
    if (prevCard) prevCard.classList.remove('cinematic-reveal-mode');

    this.showScreen('gameScreen');

    // Update top bar
    const roundData = GAME_DATA.round4;
    document.getElementById('roundIcon').textContent = roundData.icon;
    document.getElementById('roundName').textContent = roundData.name;
    document.getElementById('questionCounter').textContent =
      `Envelope ${this.currentEnvelopeIndex + 1}`;

    const card = document.getElementById('questionCard');
    const controls = document.getElementById('questionControls');

    // Build options for multiple choice
    let optionsHtml = '';
    if (q.options) {
      optionsHtml = `<div class="mc-options">${q.options.map(o => `<div class="mc-option">${o}</div>`).join('')}</div>`;
    }

    const pts = this.isDoubled ? this.currentEnvelopePointValue * 2 : this.currentEnvelopePointValue;
    const doubleHtml = this.isDoubled
      ? `<div class="double-badge">🔥 DOUBLE BET — ${pts} pts</div>`
      : `<div class="text-sm font-semibold" style="color:var(--secondary);">💰 ${pts} points</div>`;

    card.innerHTML = `
      <div class="question-main-content">
        <div class="text-sm font-bold opacity-50 uppercase tracking-wider">Question ${q.id}</div>
        ${getQuestionVisualHtml(q.id)}
        <span class="q-type-badge">${q.type}</span>
        ${doubleHtml}
        <div class="text-xl font-bold mt-2 leading-relaxed" style="max-width:600px;">${q.question}</div>
        ${optionsHtml}
      </div>
      <div id="answerReveal"></div>
    `;

    controls.innerHTML = `
      <button class="btn btn-primary" onclick="Game.revealEnvelopeAnswer()">🔓 Reveal Answer</button>
      <button class="btn btn-success" onclick="Game.openAwardModal(${pts})" style="display:none;" id="awardBtn">✅ Correct! Award ${pts} pts</button>
      <button class="btn btn-sm btn-danger" onclick="Game.envelopeWrong()" style="display:none;" id="wrongBtn">❌ Wrong Answer</button>
      <button class="btn btn-sm btn-secondary" style="color:var(--text-dark);border-color:#ccc;display:none;" id="nextBtn" onclick="Game.returnToEnvelopes()">← Back to Envelopes</button>
    `;

    this.startTimer();
    this.renderAllLeaderboards();
  },

  revealEnvelopeAnswer() {
    if (this.isAnswerRevealed) return;
    this.isAnswerRevealed = true;
    this.stopTimer();
    SFX.click();

    const q = GAME_DATA.round4.questions[this.currentEnvelopeIndex];
    const revealEl = document.getElementById('answerReveal');
    const answerText = q.answerFull ? `${q.answer} (${q.answerFull})` : q.answer;
    const meaningHtml = q.meaningVi ? `<div class="meaning-vi">🇻🇳 ${q.meaningVi}</div>` : '';

    if (revealEl) {
      revealEl.innerHTML = `
        <div class="answer-reveal neutral">${answerText}</div>
        ${meaningHtml}
        ${getQuestionVisualHtml(q.id, true)}
      `;
    }

    // Cinematic reveal — hide question, enlarge image & answer
    const card = document.getElementById('questionCard');
    if (card) card.classList.add('cinematic-reveal-mode');

    // Show award, wrong, and next buttons
    const awardBtn = document.getElementById('awardBtn');
    const wrongBtn = document.getElementById('wrongBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (awardBtn) awardBtn.style.display = 'inline-flex';
    if (wrongBtn) wrongBtn.style.display = 'inline-flex';
    if (nextBtn) nextBtn.style.display = 'inline-flex';
  },

  envelopeWrong() {
    SFX.buzzer();
    const card = document.getElementById('questionCard');
    if (card) {
      card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 600);
    }
    // Mark envelope as opened and return
    this.envelopesOpened.add(this.currentEnvelopeIndex);
    setTimeout(() => this.returnToEnvelopes(), 800);
  },

  returnToEnvelopes() {
    this.stopTimer();
    this.envelopesOpened.add(this.currentEnvelopeIndex);
    this.showScreen('envelopeSelectScreen');
    this.renderEnvelopes();
    this.renderAllLeaderboards();

    // Check if all envelopes are opened
    if (this.envelopesOpened.size >= 10) {
      this.completedRounds.add('round4');
      setTimeout(() => this.backToRoundSelect(), 500);
    }
  },

  /* ─────────────────────────────────
     SCORE MANAGEMENT
     ───────────────────────────────── */

  /** Open the Award Points modal */
  openAwardModal(points) {
    this.pendingAwardPoints = points;
    const modal = document.getElementById('awardModal');
    const teamsDiv = document.getElementById('awardModalTeams');
    document.getElementById('awardModalTitle').textContent = `🎉 Award ${points} Points`;

    teamsDiv.innerHTML = TEAM_NAMES.map((name, i) => `
      <button class="modal-team-btn" onclick="Game.awardPoints(${i}, ${points})">
        ${name} <span class="text-gray-400">(${this.scores[i]} pts)</span>
      </button>
    `).join('');

    modal.classList.add('active');
  },

  /** Award points to a team */
  awardPoints(teamIndex, points) {
    this.scores[teamIndex] += points;
    SFX.ting();
    fireConfetti();
    showPointsPopup(points, true);

    // Flash answer as correct
    const revealEl = document.getElementById('answerReveal');
    if (revealEl) {
      const answerDiv = revealEl.querySelector('.answer-reveal');
      if (answerDiv) {
        answerDiv.classList.remove('neutral');
        answerDiv.classList.add('correct');
      }
    }

    this.closeAwardModal();
    this.renderAllLeaderboards();
    this.saveScoresToStorage();
  },

  closeAwardModal() {
    document.getElementById('awardModal').classList.remove('active');
  },

  /** Toggle floating leaderboard collapse/expand */
  toggleFloatingLeaderboard() {
    const lb = document.getElementById('floatingLeaderboard');
    const toggle = document.getElementById('floatingLeaderboardToggle');
    if (lb) {
      lb.classList.toggle('collapsed');
      if (toggle) toggle.textContent = lb.classList.contains('collapsed') ? '▲' : '▼';
    }
  },

  /** Manual score adjustment from leaderboard */
  adjustScore(teamIndex, delta) {
    this.scores[teamIndex] = Math.max(0, this.scores[teamIndex] + delta);
    SFX.click();
    this.renderAllLeaderboards();
    this.saveScoresToStorage();
  },

  /* ─────────────────────────────────
     LEADERBOARD RENDERING
     ───────────────────────────────── */

  renderAllLeaderboards() {
    const targets = [
      'leaderboardMiniContent',
      'floatingLeaderboardContent'
    ];

    const html = TEAM_NAMES.map((name, i) => `
      <div class="team-row">
        <span class="team-name">${name}</span>
        <div class="flex items-center gap-2">
          <button class="score-sub-btn" onclick="event.stopPropagation();Game.adjustScore(${i},-5);">−</button>
          <span class="team-score">${this.scores[i]}</span>
          <button class="score-add-btn" onclick="event.stopPropagation();Game.adjustScore(${i},5);">+</button>
        </div>
      </div>
    `).join('');

    targets.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    });
  },

  /* ─────────────────────────────────
     RESULTS / GAME END
     ───────────────────────────────── */

  showResults() {
    SFX.fanfare();
    this.showScreen('resultsScreen');

    // Find winner
    const maxScore = Math.max(...this.scores);
    const winnerIndex = this.scores.indexOf(maxScore);

    document.getElementById('winnerName').textContent = TEAM_NAMES[winnerIndex];
    document.getElementById('winnerLabel').textContent =
      maxScore > 0 ? `is the CHAMPION with ${maxScore} points! 🎉` : 'No points scored yet!';

    // Render final score cards
    const finalDiv = document.getElementById('finalScores');
    // Sort teams by score descending for display
    const sorted = TEAM_NAMES.map((name, i) => ({ name, score: this.scores[i], idx: i }))
      .sort((a, b) => b.score - a.score);

    finalDiv.innerHTML = sorted.map((t, rank) => `
      <div class="final-score-card ${rank === 0 ? 'winner' : ''}">
        <div class="text-sm opacity-70">${rank === 0 ? '👑' : `#${rank + 1}`}</div>
        <div class="font-bold text-lg">${t.name}</div>
        <div class="final-score-value">${t.score}</div>
      </div>
    `).join('');

    // Big confetti
    setTimeout(() => fireBigConfetti(), 300);
  },

  resetGame() {
    SFX.click();
    this.scores = [0, 0, 0, 0];
    this.completedRounds.clear();
    this.currentRound = null;
    this.currentQuestionIndex = 0;
    this.envelopesOpened.clear();
    this.saveScoresToStorage();
    this.showScreen('homeScreen');
  },

  /* ─────────────────────────────────
     LOCAL STORAGE (persist scores)
     ───────────────────────────────── */

  saveScoresToStorage() {
    try {
      localStorage.setItem('tetCipherWheel_scores', JSON.stringify(this.scores));
      localStorage.setItem('tetCipherWheel_completed', JSON.stringify([...this.completedRounds]));
    } catch (e) { /* ignore */ }
  },

  loadScoresFromStorage() {
    try {
      const saved = localStorage.getItem('tetCipherWheel_scores');
      const completed = localStorage.getItem('tetCipherWheel_completed');
      if (saved) this.scores = JSON.parse(saved);
      if (completed) this.completedRounds = new Set(JSON.parse(completed));
    } catch (e) { /* ignore */ }
  },

  clearStorage() {
    try {
      localStorage.removeItem('tetCipherWheel_scores');
      localStorage.removeItem('tetCipherWheel_completed');
    } catch (e) { /* ignore */ }
  }
};

/* ── Initialize on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  Game.init();
});
