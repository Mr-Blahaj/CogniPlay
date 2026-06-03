/**
 * Static TouchWall/CogniPlay clickable prototype controller.
 * HTML and CSS are intentionally left unchanged; this file removes runtime
 * server/webcam/OS dependencies and fills the existing CogniPlay iframe with
 * a static, playable puzzle UI.
 */

document.addEventListener("DOMContentLoaded", () => {
  const state = createState();

  installStaticPuzzleFrame(state);
  bindTabs();
  bindCalibrationPreview();
  bindWhiteboardPreview();
  bindRecordingPreview();
  bindDockButtons();
  bindSettingsControls();
  bindPointerCursor();
  seedTelemetry();
  resizeCanvases();

  window.addEventListener("resize", resizeCanvases);
  log("Static prototype ready. No server, webcam, recorder, OS bridge, or backend is used.");
});

const ARC_COLORS = [
  "#111111", "#315C52", "#B96B5E", "#7E9E80", "#D6BB91",
  "#B9B2A8", "#B9828B", "#A99173", "#9DC8C3", "#6B604F"
];

function createState() {
  return {
    calibrationStep: 0,
    activeApp: "puzzles",
    activeDrawColor: "#00f2fe",
    brushSize: 8,
    puzzleSection: "patterns",
    puzzleIndex: 0,
    selectedOption: null,
    showResult: false,
    isCorrect: null,
    hint: null,
    hintsUsed: 0,
    sessionPuzzleCount: 0,
    puzzles: {
      patterns: {
        label: "Pattern Play",
        puzzles: [
          {
            category: "Pattern Play",
            instruction: "Watch the pattern. What comes next?",
            hint: "The same color block moves from the left side to the right side.",
            examplePairs: [
              { input: grid([[1,0,0],[1,0,0],[0,0,0]]), output: grid([[0,0,1],[0,0,1],[0,0,0]]) },
              { input: grid([[0,2,0],[0,2,0],[0,0,0]]), output: grid([[0,0,0],[0,0,0],[0,2,2]]) }
            ],
            testInput: grid([[0,0,0],[3,3,0],[0,0,0]]),
            options: [
              { id: "a", label: "Move right", grid: grid([[0,0,0],[0,3,3],[0,0,0]]) },
              { id: "b", label: "Move down", grid: grid([[0,0,0],[0,0,0],[3,3,0]]) },
              { id: "c", label: "Stay", grid: grid([[0,0,0],[3,3,0],[0,0,0]]) },
              { id: "d", label: "Split", grid: grid([[3,0,3],[0,0,0],[0,0,0]]) }
            ],
            correctAnswer: "a"
          },
          {
            category: "Pattern Play",
            instruction: "The shape grows one step each time. Choose the next grid.",
            hint: "Count how many warm tiles appear in each example.",
            examplePairs: [
              { input: grid([[4,0,0],[0,0,0],[0,0,0]]), output: grid([[4,4,0],[0,0,0],[0,0,0]]) },
              { input: grid([[4,4,0],[0,0,0],[0,0,0]]), output: grid([[4,4,4],[0,0,0],[0,0,0]]) }
            ],
            testInput: grid([[4,4,4],[0,0,0],[0,0,0]]),
            options: [
              { id: "a", label: "Add one below", grid: grid([[4,4,4],[4,0,0],[0,0,0]]) },
              { id: "b", label: "Remove one", grid: grid([[4,4,0],[0,0,0],[0,0,0]]) },
              { id: "c", label: "Move row", grid: grid([[0,0,0],[4,4,4],[0,0,0]]) },
              { id: "d", label: "Flip color", grid: grid([[2,2,2],[0,0,0],[0,0,0]]) }
            ],
            correctAnswer: "a"
          }
        ]
      },
      logic: {
        label: "Odd One Out",
        puzzles: [
          {
            category: "Odd One Out",
            instruction: "Which choice does not follow the group?",
            hint: "Three choices have the same shape and one has a different shape.",
            elements: [
              [{ type: "square", color: 1, size: 2, rotation: 0 }],
              [{ type: "square", color: 1, size: 2, rotation: 0 }],
              [{ type: "square", color: 1, size: 2, rotation: 0 }],
              [{ type: "circle", color: 1, size: 2, rotation: 0 }]
            ],
            options: [
              { id: "a", label: "Tile 1", elements: [{ type: "square", color: 1, size: 1, rotation: 0 }] },
              { id: "b", label: "Tile 2", elements: [{ type: "square", color: 1, size: 1, rotation: 0 }] },
              { id: "c", label: "Tile 3", elements: [{ type: "square", color: 1, size: 1, rotation: 0 }] },
              { id: "d", label: "Tile 4", elements: [{ type: "circle", color: 1, size: 1, rotation: 0 }] }
            ],
            correctAnswer: "d"
          },
          {
            category: "Odd One Out",
            instruction: "Find the piece that breaks the rule.",
            hint: "Look at color, not shape.",
            elements: [
              [{ type: "circle", color: 3, size: 2, rotation: 0 }],
              [{ type: "triangle", color: 3, size: 2, rotation: 0 }],
              [{ type: "diamond", color: 3, size: 2, rotation: 0 }],
              [{ type: "circle", color: 2, size: 2, rotation: 0 }]
            ],
            options: [
              { id: "a", label: "Green circle", elements: [{ type: "circle", color: 3, size: 1, rotation: 0 }] },
              { id: "b", label: "Green triangle", elements: [{ type: "triangle", color: 3, size: 1, rotation: 0 }] },
              { id: "c", label: "Green diamond", elements: [{ type: "diamond", color: 3, size: 1, rotation: 0 }] },
              { id: "d", label: "Red circle", elements: [{ type: "circle", color: 2, size: 1, rotation: 0 }] }
            ],
            correctAnswer: "d"
          }
        ]
      },
      spatial: {
        label: "Spatial Assembly",
        puzzles: [
          {
            category: "Spatial Assembly",
            instruction: "Complete the 2 by 2 grid.",
            hint: "The bottom row repeats the shapes from the top row with the warm color.",
            grid: grid([[1,2],[4,0]]),
            options: [
              { id: "a", label: "Warm red", grid: grid([[1,2],[4,2]]) },
              { id: "b", label: "Warm blue", grid: grid([[1,2],[4,1]]) },
              { id: "c", label: "Empty", grid: grid([[1,2],[4,0]]) },
              { id: "d", label: "All warm", grid: grid([[4,4],[4,4]]) }
            ],
            correctAnswer: "a"
          },
          {
            category: "Spatial Assembly",
            instruction: "Where does the marker move next?",
            hint: "The marker moves clockwise around the corners.",
            grid: grid([[8,0,8],[0,0,0],[0,0,8]]),
            options: [
              { id: "a", label: "Bottom left", grid: grid([[8,0,8],[0,0,0],[8,0,8]]) },
              { id: "b", label: "Center", grid: grid([[8,0,8],[0,8,0],[0,0,8]]) },
              { id: "c", label: "Top middle", grid: grid([[8,8,8],[0,0,0],[0,0,8]]) },
              { id: "d", label: "Right middle", grid: grid([[8,0,8],[0,0,8],[0,0,8]]) }
            ],
            correctAnswer: "a"
          }
        ]
      }
    }
  };
}

function grid(cells) {
  return { width: cells[0].length, height: cells.length, cells };
}

function installStaticPuzzleFrame(state) {
  const frame = document.getElementById("cogniplay-frame");
  if (!frame) return;

  frame.removeAttribute("src");
  frame.removeAttribute("allow");
  frame.srcdoc = getPuzzleFrameHtml();

  frame.addEventListener("load", () => {
    renderPuzzleFrame(state);
  });
}

function getPuzzleFrameHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
${getCogniPlayCss()}
</style>
</head>
<body>
  <div id="root"></div>
</body>
</html>`;
}

function getCogniPlayCss() {
  return `
:root {
  --ink: #111111;
  --ink-soft: #343434;
  --ink-muted: #6f6a62;
  --paper: #fffdfa;
  --paper-warm: #f8f4ed;
  --paper-soft: #f1ece3;
  --paper-line: #ded8cf;
  --paper-shadow: 0 18px 48px rgba(31, 28, 23, 0.09);
  --paper-shadow-sm: 0 8px 24px rgba(31, 28, 23, 0.07);
  --color-secondary-600: #24483f;
  --color-secondary-700: #1a3831;
  --color-success: #22C55E;
  --color-error: #EF4444;
  --color-gold-400: #FBBF24;
  --glass-bg: rgba(255, 253, 250, 0.82);
  --glass-bg-hover: rgba(255, 255, 255, 0.94);
  --glass-border: rgba(42, 38, 32, 0.12);
  --glass-border-hover: rgba(42, 38, 32, 0.22);
  --glass-shadow: var(--paper-shadow-sm);
  --glass-shadow-lg: var(--paper-shadow);
  --glass-blur: 18px;
  --font-display: 'Outfit', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --touch-min: 48px;
  --touch-lg: 64px;
  --radius-lg: 8px;
  --radius-xl: 8px;
  --radius-full: 9999px;
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body, #root { min-height: 100%; }
body {
  font-family: var(--font-body);
  line-height: 1.6;
  color: var(--ink);
  background:
    linear-gradient(rgba(255,255,255,0.48), rgba(255,255,255,0.48)),
    repeating-linear-gradient(0deg, rgba(17,17,17,0.025) 0, rgba(17,17,17,0.025) 1px, transparent 1px, transparent 32px),
    repeating-linear-gradient(90deg, rgba(17,17,17,0.02) 0, rgba(17,17,17,0.02) 1px, transparent 1px, transparent 32px),
    #f7f2e9;
  overflow-x: hidden;
}
h1,h2,h3,h4 { font-family: var(--font-display); color: var(--ink); letter-spacing: 0; }
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--touch-min);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-base);
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
  user-select: none;
  position: relative;
  overflow: hidden;
}
.btn:active { transform: scale(0.97); }
.btn:disabled { cursor: default; }
.btn--primary { background: var(--ink); color: white; box-shadow: 0 10px 24px rgba(17,17,17,0.18); }
.btn--secondary { background: var(--glass-bg); backdrop-filter: blur(var(--glass-blur)); border: 1px solid var(--glass-border); color: var(--ink); }
.btn--accent { background: var(--color-secondary-700); color: white; box-shadow: 0 10px 24px rgba(26,56,49,0.18); }
.btn--lg { min-height: var(--touch-lg); padding: var(--space-4) var(--space-8); font-size: var(--text-lg); border-radius: var(--radius-xl); }
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--glass-shadow);
  transition: all var(--transition-base);
}
.glass-card--static:hover { transform: none; }
.badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  font-family: var(--font-display);
}
.badge--accent { background: var(--paper-soft); color: var(--ink-muted); border: 1px solid var(--paper-line); }
.quiet-meta { color: var(--ink-muted) !important; font-size: var(--text-sm); }
.settings-shell { position: relative; }
.settings-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: min(340px, calc(100vw - 32px));
  padding: var(--space-4);
  background: rgba(255,253,250,0.98);
  border: 1px solid var(--paper-line);
  border-radius: var(--radius-lg);
  box-shadow: var(--paper-shadow);
  z-index: 10;
}
.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) 0;
  border-top: 1px solid var(--paper-line);
  color: var(--ink);
}
.toggle-pill {
  width: 56px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid var(--paper-line);
  background: var(--paper-soft);
  padding: 3px;
  cursor: pointer;
}
.toggle-pill span { display: block; width: 24px; height: 24px; border-radius: 50%; background: var(--ink); }
.play-viewport {
  overflow: auto;
  overscroll-behavior: contain;
  touch-action: none;
  max-height: min(68vh, 720px);
  border: 1px solid var(--paper-line);
  border-radius: var(--radius-lg);
  background: #fffefa;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.8);
}
.play-canvas {
  min-width: max-content;
  min-height: 360px;
  padding: var(--space-5);
  transform-origin: 0 0;
  cursor: grab;
}
.arc-grid {
  display: inline-grid;
  gap: 2px;
  background: var(--paper-warm);
  border-radius: 10px;
  padding: 3px;
  border: 2px solid var(--paper-line);
}
.arc-cell { transition: all var(--transition-fast); cursor: default; position: relative; }
.option-card {
  background: var(--paper);
  border: 2px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--touch-lg);
  user-select: none;
  color: var(--ink);
}
.option-card:hover { border-color: var(--ink); background: var(--paper-warm); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(139,92,246,0.2); }
.option-card--selected { border-color: var(--ink); background: var(--paper-soft); box-shadow: 0 0 0 3px rgba(17,17,17,0.08); }
.option-card--correct { border-color: var(--color-success); background: rgba(34,197,94,0.15); box-shadow: 0 0 20px rgba(34,197,94,0.3); animation: correctPulse 0.6s ease-out; }
.option-card--wrong { border-color: var(--color-error); background: rgba(239,68,68,0.1); animation: wrongShake 0.5s ease-out; }
.star { display: inline-block; font-size: 2rem; transition: all var(--transition-spring); }
.star--earned { color: var(--color-gold-400); filter: drop-shadow(0 0 8px rgba(251,191,36,0.5)); animation: starEarn 0.5s ease-out; }
.star--empty { color: rgba(255,255,255,0.15); }
.cogniplay-page { min-height: 100vh; padding: var(--space-4) var(--space-6); position: relative; }
.cogniplay-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto var(--space-6);
  position: relative;
  z-index: 20;
  max-width: 800px;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.cogniplay-score-pill {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--glass-bg);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--glass-border);
}
.cogniplay-board { display: flex; flex-direction: column; gap: var(--space-6); max-width: 800px; margin: 0 auto; width: 100%; }
.hint-box { background: var(--paper-warm); border: 1px solid var(--paper-line); border-radius: var(--radius-lg); padding: var(--space-4); text-align: center; color: var(--ink); }
.example-pair { display: flex; align-items: center; gap: var(--space-3); }
.element-panel { display: flex; flex-wrap: wrap; gap: var(--space-3); justify-content: center; padding: var(--space-4); background: var(--paper-warm); border-radius: var(--radius-lg); border: 1px solid var(--paper-line); }
.element-tile { display: inline-flex; align-items: center; justify-content: center; min-width: 80px; min-height: 80px; }
.result-block { display: flex; flex-direction: column; align-items: center; gap: var(--space-4); width: 100%; }
.lovely { font-size: var(--text-3xl); font-family: var(--font-display); font-weight: 800; color: var(--color-secondary-600); }
.almost { font-size: var(--text-2xl); font-family: var(--font-display); font-weight: 700; color: var(--ink); }
@keyframes correctPulse { 0%{transform:scale(1)} 50%{transform:scale(1.05)} 100%{transform:scale(1)} }
@keyframes wrongShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }
@keyframes starEarn { 0%{transform:scale(0) rotate(-180deg);opacity:0} 60%{transform:scale(1.3) rotate(10deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
`;
}

function renderPuzzleFrame(state) {
  const frame = document.getElementById("cogniplay-frame");
  const doc = frame?.contentDocument;
  const root = doc?.getElementById("root");
  if (!root) return;

  const puzzle = getCurrentPuzzle(state);
  const stars = state.showResult && state.isCorrect ? Math.max(1, 3 - state.hintsUsed) : 0;
  root.innerHTML = `
    <div class="cogniplay-page">
      <div class="cogniplay-topbar">
        <button class="btn btn--secondary" data-action="worlds" style="font-size: var(--text-sm);">Worlds</button>
        <div style="display: flex; align-items: center; gap: var(--space-4); flex-wrap: wrap;">
          <span class="quiet-meta">Play ${state.sessionPuzzleCount + 1}</span>
          <div class="cogniplay-score-pill">
            <span style="font-size: 1rem;">🌱</span>
            <span style="font-family: var(--font-display); font-weight: 700; color: var(--ink); font-size: var(--text-sm);">104</span>
          </div>
          <span class="quiet-meta">Shelf 2</span>
          <div class="settings-shell">
            <button class="btn btn--secondary" data-action="settings" aria-expanded="false" style="font-size: var(--text-sm);">Settings</button>
            <div class="settings-menu" id="settings-menu" hidden>
              <h4 style="margin-bottom: var(--space-2);">Settings</h4>
              <p style="font-size: var(--text-sm); color: var(--ink-muted); margin-bottom: var(--space-2);">Adult controls stay here so the play space remains quiet.</p>
              <div class="settings-row"><div><strong>Local AI ideas</strong><div style="font-size: var(--text-xs); color: var(--ink-muted);">Static prototype mode.</div></div><button class="toggle-pill" aria-checked="false"><span></span></button></div>
              <div class="settings-row"><button class="btn btn--secondary" style="width: 100%;">Parent Dashboard</button></div>
              <div class="settings-row"><button class="btn btn--secondary" style="width: 100%;">Teacher Mode</button></div>
            </div>
          </div>
        </div>
      </div>

      <div class="cogniplay-board">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="badge badge--accent">${escapeHtml(puzzle.category)}</span>
          <span class="quiet-meta">Pinch to zoom · drag empty space to move</span>
        </div>

        <div class="glass-card glass-card--static" style="padding: var(--space-5); text-align: center;">
          <h3 style="font-size: var(--text-xl); font-weight: 600; white-space: pre-line; line-height: 1.5;">${escapeHtml(puzzle.instruction)}</h3>
        </div>

        ${state.hint ? `<div class="hint-box">Try this: ${escapeHtml(state.hint)}</div>` : ""}

        <div class="play-viewport">
          <div class="play-canvas" style="transform: scale(1);">
            ${renderPuzzleContent(puzzle)}
            ${renderOptions(puzzle, state)}
          </div>
        </div>

        <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;">
          ${!state.showResult ? `
            <button class="btn btn--secondary" data-action="hint" ${state.hintsUsed >= 3 ? "disabled" : ""} style="opacity: ${state.hintsUsed >= 3 ? "0.4" : "1"};">Gentle Hint (${3 - state.hintsUsed})</button>
            <button class="btn btn--primary btn--lg" data-action="submit" ${state.selectedOption ? "" : "disabled"} style="opacity: ${state.selectedOption ? "1" : "0.4"}; min-width: 160px;">Try It</button>
          ` : `
            <div class="result-block">
              ${state.isCorrect ? `<div class="lovely">Lovely</div>${renderStars(stars)}` : `<div class="almost">Almost. Try another one.</div>`}
              <button class="btn btn--accent btn--lg" data-action="next" style="min-width: 200px;">Next Play</button>
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  root.querySelectorAll("[data-option-id]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.showResult) return;
      state.selectedOption = button.dataset.optionId;
      renderPuzzleFrame(state);
    });
  });
  root.querySelector("[data-action='worlds']")?.addEventListener("click", () => cyclePuzzleSection(state));
  root.querySelector("[data-action='settings']")?.addEventListener("click", () => {
    const menu = doc.getElementById("settings-menu");
    menu.hidden = !menu.hidden;
  });
  root.querySelector("[data-action='hint']")?.addEventListener("click", () => {
    state.hint = puzzle.hint;
    state.hintsUsed += 1;
    renderPuzzleFrame(state);
  });
  root.querySelector("[data-action='submit']")?.addEventListener("click", () => {
    state.showResult = true;
    state.isCorrect = state.selectedOption === puzzle.correctAnswer;
    renderPuzzleFrame(state);
  });
  root.querySelector("[data-action='next']")?.addEventListener("click", () => nextPuzzle(state));
}

function getCurrentPuzzle(state) {
  return state.puzzles[state.puzzleSection].puzzles[state.puzzleIndex];
}

function cyclePuzzleSection(state) {
  const keys = Object.keys(state.puzzles);
  const nextIndex = (keys.indexOf(state.puzzleSection) + 1) % keys.length;
  state.puzzleSection = keys[nextIndex];
  state.puzzleIndex = 0;
  resetPuzzleState(state);
  renderPuzzleFrame(state);
}

function nextPuzzle(state) {
  const count = state.puzzles[state.puzzleSection].puzzles.length;
  state.sessionPuzzleCount += 1;
  if (state.puzzleIndex < count - 1) {
    state.puzzleIndex += 1;
  } else {
    cyclePuzzleSection(state);
    return;
  }
  resetPuzzleState(state);
  renderPuzzleFrame(state);
}

function resetPuzzleState(state) {
  state.selectedOption = null;
  state.showResult = false;
  state.isCorrect = null;
  state.hint = null;
  state.hintsUsed = 0;
}

function renderPuzzleContent(puzzle) {
  if (Array.isArray(puzzle.examplePairs)) {
    return `
      <div style="display: flex; flex-direction: column; gap: var(--space-4);">
        <span class="quiet-meta" style="font-family: var(--font-display); font-weight: 600;">Watch the pattern</span>
        <div style="display: flex; gap: var(--space-6); flex-wrap: wrap; justify-content: center;">
          ${puzzle.examplePairs.map((pair, index) => `
            <div class="example-pair">
              ${renderGrid(pair.input, "sm", `Start ${index + 1}`)}
              <span style="font-size: 1.5rem; color: var(--ink);">→</span>
              ${renderGrid(pair.output, "sm", `Then ${index + 1}`)}
            </div>
          `).join("")}
        </div>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: var(--space-3); margin-top: var(--space-5);">
        <span class="quiet-meta" style="font-family: var(--font-display); font-weight: 600;">What comes next?</span>
        ${renderGrid(puzzle.testInput, "md")}
      </div>
    `;
  }

  if (puzzle.grid) {
    return `<div style="display: flex; flex-direction: column; align-items: center; gap: var(--space-3); justify-content: center;">${renderGrid(puzzle.grid, "lg")}</div>`;
  }

  return `
    <div class="element-panel">
      ${puzzle.elements.map((group) => `<div class="element-tile">${group.map((element) => renderShape(element, 56)).join("")}</div>`).join("")}
    </div>
  `;
}

function renderOptions(puzzle, state) {
  return `
    <div style="display: grid; grid-template-columns: repeat(2, minmax(140px, 1fr)); gap: var(--space-3); margin-top: var(--space-5);">
      ${puzzle.options.map((option) => {
        const isSelected = state.selectedOption === option.id;
        const isCorrect = state.showResult && option.id === puzzle.correctAnswer;
        const isWrong = state.showResult && isSelected && !state.isCorrect;
        const classes = ["option-card", isSelected && !state.showResult ? "option-card--selected" : "", isCorrect ? "option-card--correct" : "", isWrong ? "option-card--wrong" : ""].filter(Boolean).join(" ");
        return `
          <button class="${classes}" data-option-id="${escapeHtml(option.id)}" ${state.showResult ? "disabled" : ""} style="flex-direction: column; gap: var(--space-2); cursor: ${state.showResult ? "default" : "pointer"}; min-height: ${option.grid ? "auto" : "72px"}; padding: ${option.grid ? "var(--space-3)" : "var(--space-4)"};">
            ${option.grid ? renderGrid(option.grid, "sm") : ""}
            ${option.elements ? `<div style="display: flex; align-items: center; justify-content: center; gap: var(--space-2); flex-wrap: wrap;">${option.elements.map((element) => renderShape(element, 38)).join("")}</div>` : ""}
            <span style="font-size: ${option.grid ? "var(--text-xs)" : "var(--text-base)"}; font-weight: 500;">${escapeHtml(option.label)}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function renderGrid(gridData, sizeName = "md", label = "") {
  const sizes = { sm: 28, md: 40, lg: 56, xl: 72 };
  const size = sizes[sizeName] || 40;
  return `
    <div style="display: inline-flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="arc-grid" style="grid-template-columns: repeat(${gridData.width}, ${size}px);">
        ${gridData.cells.flatMap((row) => row.map((cell) => `<div class="arc-cell" style="width:${size}px;height:${size}px;border-radius:${size > 50 ? 8 : 4}px;background:${ARC_COLORS[cell] || ARC_COLORS[0]};border:1px solid rgba(17,17,17,0.08);"></div>`)).join("")}
      </div>
      ${label ? `<span style="font-size:0.85rem;color:var(--ink-muted);font-family:var(--font-display);">${escapeHtml(label)}</span>` : ""}
    </div>
  `;
}

function renderShape(element, size = 48) {
  const color = ARC_COLORS[element.color] || ARC_COLORS[1];
  const scale = element.size === 1 ? 0.7 : element.size === 2 ? 1 : 1.3;
  const actual = size * scale;
  const path = getShapePath(element.type, actual);
  const shape = element.type === "circle"
    ? `<circle cx="${actual / 2}" cy="${actual / 2}" r="${actual * 0.4}" fill="${color}" stroke="rgba(17,17,17,0.18)" stroke-width="1" />`
    : `<path d="${path}" fill="${color}" stroke="rgba(17,17,17,0.18)" stroke-width="1" />`;
  return `<div style="display:inline-flex;align-items:center;justify-content:center;width:${actual}px;height:${actual}px;"><svg width="${actual}" height="${actual}" viewBox="0 0 ${actual} ${actual}" style="transform:rotate(${element.rotation || 0}deg);">${shape}</svg></div>`;
}

function getShapePath(type, size) {
  const h = size / 2;
  if (type === "triangle") return `M ${h} ${h * 0.2} L ${h * 1.8} ${h * 1.8} L ${h * 0.2} ${h * 1.8} Z`;
  if (type === "diamond") return `M ${h} ${h * 0.2} L ${h * 1.8} ${h} L ${h} ${h * 1.8} L ${h * 0.2} ${h} Z`;
  return `M ${h * 0.3} ${h * 0.3} L ${h * 1.7} ${h * 0.3} L ${h * 1.7} ${h * 1.7} L ${h * 0.3} ${h * 1.7} Z`;
}

function renderStars(stars) {
  return `<div style="display:flex;gap:var(--space-2);">${[0,1,2].map((index) => `<span class="star ${index < stars ? "star--earned" : "star--empty"}">★</span>`).join("")}</div>`;
}

function bindTabs() {
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => openApp(button.dataset.app));
  });
}

function openApp(appName) {
  document.querySelectorAll(".tab-btn").forEach((button) => button.classList.toggle("active", button.dataset.app === appName));
  document.querySelectorAll(".app-view").forEach((view) => view.classList.toggle("active", view.id === `app-${appName}`));
  log(`Opened ${appName}.`);
}

function bindCalibrationPreview() {
  const overlay = document.getElementById("calibration-overlay");
  const instruction = document.getElementById("calibration-instruction");
  let step = 0;

  const update = () => {
    const names = ["Top-Left", "Top-Right", "Bottom-Right", "Bottom-Left"];
    instruction.innerHTML = `Please touch the glowing <strong style="color: var(--accent-yellow);">${names[step]}</strong> corner.`;
    document.querySelectorAll(".calibration-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === step);
      dot.classList.toggle("completed", index < step);
    });
    document.querySelectorAll(".step-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === step);
      dot.classList.toggle("completed", index < step);
    });
  };

  const start = () => {
    step = 0;
    overlay.classList.add("active");
    update();
    log("Calibration preview opened.");
  };

  document.getElementById("start-calibration-btn")?.addEventListener("click", start);
  document.getElementById("open-calibration-window")?.addEventListener("click", start);
  document.getElementById("cancel-calibration-btn")?.addEventListener("click", () => overlay.classList.remove("active"));
  document.getElementById("reset-calibration-btn")?.addEventListener("click", () => {
    document.getElementById("calibration-status").textContent = "Status: Uncalibrated";
    document.getElementById("debug-matrix").textContent = "Not Calibrated";
    log("Calibration preview reset.");
  });
  document.getElementById("auto-calibration-btn")?.addEventListener("click", () => {
    document.getElementById("calibration-status").textContent = "Status: Auto-calibration previewed";
    document.getElementById("debug-matrix").textContent = "Prototype matrix\n[ 1.000, 0.006, 0.000 ]\n[ 0.004, 0.998, 0.000 ]\n[ 0.000, 0.000, 1.000 ]";
    log("Auto-calibration preview completed.");
  });
  document.querySelectorAll(".calibration-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      if (Number(dot.dataset.corner) !== step) return;
      step += 1;
      if (step >= 4) {
        document.getElementById("calibration-status").textContent = "Status: Calibrated ✓";
        overlay.classList.remove("active");
        log("Calibration preview completed.");
      } else {
        update();
      }
    });
  });
}

function bindWhiteboardPreview() {
  document.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      document.querySelectorAll(".color-swatch").forEach((item) => item.classList.remove("active"));
      swatch.classList.add("active");
      log(`Selected color ${swatch.dataset.color}.`);
    });
  });

  document.getElementById("clear-canvas-btn")?.addEventListener("click", drawWhiteboard);

  window.whiteboardSetTool = (tool) => {
    document.querySelectorAll(".tool-btn").forEach((button) => button.classList.toggle("active", button.textContent.toLowerCase().includes(tool)));
    log(`${tool} tool selected.`);
  };
  window.whiteboardUndo = () => log("Undo previewed.");
  window.whiteboardRedo = () => log("Redo previewed.");
  window.toggleAiShapeAssist = (enabled) => log(`AI Shape Assist ${enabled ? "on" : "off"}.`);
  window.triggerLocalAi = (_prompt, mode) => log(`${mode === "flowchart" ? "Flowchart" : "Ask"} previewed.`);
  window.toggleVirtualKeyboard = () => {
    const keyboard = document.getElementById("virtual-keyboard");
    keyboard.style.display = keyboard.style.display === "flex" ? "none" : "flex";
  };

  const keys = [["Q","W","E","R","T","Y","U","I","O","P"], ["A","S","D","F","G","H","J","K","L"], ["Z","X","C","V","B","N","M"], ["Space"]];
  const keyRoot = document.getElementById("vk-keys");
  if (keyRoot) {
    keyRoot.innerHTML = keys.map((row) => `<div class="vk-row">${row.map((key) => `<button class="vk-key ${key === "Space" ? "spacebar" : ""}">${key}</button>`).join("")}</div>`).join("");
    keyRoot.addEventListener("click", (event) => {
      if (!event.target.classList.contains("vk-key")) return;
      const input = document.getElementById("ai-prompt-input");
      input.value += event.target.textContent === "Space" ? " " : event.target.textContent.toLowerCase();
    });
  }
}

function bindRecordingPreview() {
  const status = document.getElementById("recording-status");
  const captions = document.getElementById("live-caption-preview");
  document.getElementById("record-session-btn")?.addEventListener("click", () => {
    status.textContent = "Recording preview started. No screen, camera, microphone, or files are captured.";
    captions.textContent = "Caption preview: Today we are solving a pattern puzzle together.";
    log("Recording preview started.");
  });
  document.getElementById("upload-session-btn")?.addEventListener("click", () => {
    status.textContent = "Upload previewed. Cloud upload is disabled for static demo.";
  });
  document.getElementById("captions-session-btn")?.addEventListener("click", () => {
    status.textContent = "Live subtitles previewed without Whisper or microphone access.";
    captions.textContent = "Caption preview: Look for what repeats, then choose the missing tile.";
  });
}

function bindDockButtons() {
  document.getElementById("toggle-tracking-btn")?.addEventListener("click", () => {
    const badge = document.getElementById("top-status-badge");
    const dot = badge?.querySelector(".status-indicator-dot");
    const active = badge?.classList.toggle("inactive") === false;
    document.getElementById("top-status-text").textContent = active ? "CV Preview" : "CV Off";
    document.getElementById("toggle-tracking-btn").innerHTML = active ? "<span>⏹</span> Stop Hand Tracking" : "<span>🚀</span> Start Hand Tracking";
    if (dot) dot.style.background = active ? "var(--accent-green)" : "var(--accent-red)";
    log(active ? "Simulated CV preview started." : "Simulated CV preview stopped.");
  });
  document.getElementById("open-cogniplay-window")?.addEventListener("click", () => openApp("puzzles"));
  document.getElementById("open-recording-window")?.addEventListener("click", () => openApp("recording"));
  document.getElementById("open-os-overlay-btn")?.addEventListener("click", () => openApp("canvas"));
  document.getElementById("clear-logs-btn")?.addEventListener("click", () => {
    document.getElementById("log-terminal").textContent = "Logs cleared.";
  });
}

function bindSettingsControls() {
  const pairs = [
    ["brush-size", "brush-size-val", (v) => `${v}px`],
    ["angle-drift-strength", "angle-drift-val", (v) => `${v}%`],
    ["cursor-x-offset", "x-offset-val", (v) => `${v}px`],
    ["cursor-y-offset", "y-offset-val", (v) => `${v}px`],
    ["filter-alpha", "alpha-val", (v) => (Number(v) / 100).toFixed(2)],
    ["filter-beta", "beta-val", (v) => (Number(v) / 100).toFixed(2)]
  ];
  pairs.forEach(([inputId, outputId, format]) => {
    document.getElementById(inputId)?.addEventListener("input", (event) => {
      document.getElementById(outputId).textContent = format(event.target.value);
      if (inputId === "brush-size") drawWhiteboard();
    });
  });
  document.getElementById("grid-division-count")?.addEventListener("input", (event) => {
    event.target.previousElementSibling.querySelector(".value-display").textContent = `${event.target.value} x ${event.target.value}`;
  });
  window.setDistanceFromScreen = (value) => log(`Distance preview set to ${value || "Auto"}.`);
  window.toggleSystemCursor = (enabled) => {
    document.getElementById("sys-cursor-status").textContent = enabled ? "System cursor preview only" : "🔴 Bridge Offline";
  };
}

function bindPointerCursor() {
  const cursor = document.getElementById("custom-cursor");
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  window.addEventListener("pointerdown", () => cursor.classList.add("clicking"));
  window.addEventListener("pointerup", () => cursor.classList.remove("clicking"));
}

function resizeCanvases() {
  const overlay = document.getElementById("overlay-canvas");
  const webcam = document.getElementById("webcam-feed");
  if (overlay && webcam) {
    overlay.width = webcam.clientWidth || 320;
    overlay.height = webcam.clientHeight || 240;
    const ctx = overlay.getContext("2d");
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    ctx.fillStyle = "rgba(0,242,254,0.14)";
    ctx.fillRect(0, 0, overlay.width, overlay.height);
    ctx.fillStyle = "var(--accent-cyan)";
    ctx.font = "14px sans-serif";
    ctx.fillText("Camera disabled in static prototype", 16, 28);
  }
  drawWhiteboard();
}

function drawWhiteboard() {
  const canvas = document.getElementById("paint-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = Math.max(1, rect.width);
  canvas.height = Math.max(1, rect.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#111111";
  ctx.font = "700 26px Inter, sans-serif";
  ctx.fillText("Whiteboard preview", 56, 56);
}

function drawLine(ctx, color, points) {
  ctx.strokeStyle = color;
  ctx.lineWidth = Number(document.getElementById("brush-size")?.value || 8);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  points.forEach(([x, y], index) => {
    const px = x * (ctx.canvas.width / 760);
    const py = y * (ctx.canvas.height / 420);
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.stroke();
}

function seedTelemetry() {
  document.getElementById("val-fps").textContent = "60 FPS";
  document.getElementById("val-z").textContent = "0.42";
  document.getElementById("metric-pinch-val").textContent = "0.318";
  document.getElementById("metric-depth-val").textContent = "0.612";
  document.getElementById("fill-pinch").style.width = "48%";
  document.getElementById("fill-depth").style.width = "70%";
  document.getElementById("debug-matrix").textContent = "Prototype matrix\n[ 1.000, 0.006, 0.000 ]\n[ 0.004, 0.998, 0.000 ]\n[ 0.000, 0.000, 1.000 ]";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function log(message) {
  const terminal = document.getElementById("log-terminal");
  if (!terminal) return;
  terminal.textContent += `\n[${new Date().toLocaleTimeString()}] ${message}`;
  terminal.scrollTop = terminal.scrollHeight;
}
