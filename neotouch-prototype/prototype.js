const features = [
  { id: "1", title: "Smartboard hand tracking", status: "Implemented; needs refinement", target: "smartboard" },
  { id: "2", title: "Works across OS", status: "Semi-implemented", target: "os" },
  { id: "3", title: "AI flowcharts / definitions / Ask", status: "Mostly implemented", target: "whiteboardAi" },
  { id: "4", title: "Live subtitles", status: "Semi-implemented", target: "recording" },
  { id: "5", title: "Record + cloud upload", status: "Local recording; cloud roadmap", target: "recording" },
  { id: "6", title: "Play-based learning games", status: "Implemented; more needed", target: "games" },
  { id: "7", title: "Points, stickers, mentors", status: "Points/badges built; shop roadmap", target: "rewards" },
  { id: "8", title: "Parent portal", status: "Semi-implemented", target: "parent" },
  { id: "9", title: "Individual child stats", status: "Semi-implemented", target: "childStats" },
  { id: "10", title: "Class teacher mode", status: "Semi-implemented", target: "teacherClass" }
];

const screens = [
  {
    id: "hardware",
    nav: "Hardware setup",
    role: "Hardware required",
    title: "Only a good USB webcam, extension cable, and existing display.",
    summary: "CogniPlay turns a projector, TV, or classroom display into a smart learning wall. The hardware story is deliberately simple for Anganwadi, ECCE, and low-resource classrooms.",
    image: "./pdf_extracted_images/page-01-image-01.jpg",
    imageFit: "cover",
    caption: "Host shell with CV Active, camera preview, calibration controls, and CogniPlay entry points.",
    status: [["Hardware", "USB webcam + extension", "implemented"], ["Display", "Projector / TV", "implemented"], ["Setup", "Needs refinement", "partial"]],
    meta: [["Feature mapped", "Hardware requirement"], ["AI used", "Computer vision hand tracking"], ["Code evidence", "hand-tracker.js; app.js calibration UI"]],
    proof: ["Uses existing classroom display hardware rather than a dedicated smartboard.", "Camera preview and CV Active state make the physical setup visible during demos.", "Four-point calibration maps webcam coordinates to the projected surface."],
    actions: [["Start smartboard flow", "smartboard", true], ["Jump to games", "games", false]],
    featureMap: ["1"]
  },
  {
    id: "smartboard",
    nav: "Smart board",
    role: "Feature 1",
    title: "Any display becomes a functional smart board through hand tracking.",
    summary: "Gestures support writing, highlighting, dragging, and classroom interaction. Shape assist auto-straightens lines and beautifies circles, rectangles, triangles, and arrows; it is implemented but still needs classroom refinement.",
    image: "./pdf_extracted_images/page-08-image-01.jpg",
    imageFit: "contain",
    caption: "Whiteboard with brush, eraser, laser, undo/redo, shape assist, and AI prompt controls.",
    status: [["Hand tracking", "Implemented", "implemented"], ["Gestures", "Needs refinement", "partial"], ["Shape assist", "Implemented", "implemented"]],
    meta: [["Feature mapped", "1"], ["AI used", "Shape beautification / geometry assist"], ["Code evidence", "ShapeClassifier in ai-engine.js; app.js whiteboard tools"]],
    proof: ["Brush, eraser, laser, undo, redo, clear, and size controls exist in the UI.", "ShapeClassifier beautifies rough classroom strokes into cleaner teaching shapes.", "Gesture reliability still needs refinement for varied lighting, camera angles, and children’s movement."],
    actions: [["Show OS-wide mode", "os", true], ["Generate a flowchart", "whiteboardAi", false]],
    featureMap: ["1"]
  },
  {
    id: "os",
    nav: "OS bridge",
    role: "Feature 2",
    title: "The wall can control more than one web page: OS-wide mode is semi-implemented.",
    summary: "A macOS cursor bridge moves, clicks, drags, and scrolls the system cursor. Full cross-OS workflows such as polished window switching and production-grade global gestures are still in refinement.",
    image: "./pdf_extracted_images/page-11-image-01.jpg",
    imageFit: "cover",
    caption: "OS-level proof point: CogniPlay deck and product can run alongside normal desktop apps.",
    status: [["macOS bridge", "Semi-implemented", "partial"], ["Cursor/click/scroll", "Implemented", "implemented"], ["Window switching", "Refinement", "partial"]],
    meta: [["Feature mapped", "2"], ["AI used", "None; OS bridge is systems layer"], ["Code evidence", "cursor-bridge.py; server.js /cursor endpoints; system-overlay.swift"]],
    proof: ["The server exposes cursor move, mouse down/up, scroll, status, and overlay launch endpoints.", "The feature is honest as semi-implemented because advanced OS gestures are not production-polished yet.", "This matters for teachers because the same wall can annotate, switch tools, and control classroom software."],
    actions: [["Use AI on whiteboard", "whiteboardAi", true], ["Go to recording", "recording", false]],
    featureMap: ["2"]
  },
  {
    id: "whiteboardAi",
    nav: "Ask AI",
    role: "Feature 3",
    title: "Teachers can ask for definitions, explanations, tables, and flowcharts on the spot.",
    summary: "Local Ollama llama3 powers the whiteboard assistant for flowcharts, definitions, answers, and word charts. This is mostly implemented and works best when a local model is installed and running.",
    image: "./pdf_extracted_images/page-09-image-01.jpg",
    imageFit: "contain",
    caption: "Generated flowchart inside the whiteboard canvas.",
    status: [["Flowcharts", "Mostly implemented", "implemented"], ["Definitions / Ask", "Mostly implemented", "implemented"], ["Guardrails", "Needed", "roadmap"]],
    meta: [["Feature mapped", "3"], ["AI used", "Ollama llama3"], ["Code evidence", "ai-engine.js LocalOllamaAssistant; app.js triggerLocalAi"]],
    proof: ["The teacher stays in the teaching surface instead of switching to a separate chatbot.", "The AI is positioned as facilitator support for ECCE workers, not as direct autonomous child instruction.", "Future guardrails should add child-safe prompt templates, local-language review, and source/age checks."],
    actions: [["Show subtitles", "recording", true], ["Open games", "games", false]],
    featureMap: ["3"]
  },
  {
    id: "recording",
    nav: "Subtitles + recording",
    role: "Features 4 and 5",
    title: "Live subtitles and recordings support inclusion and continuity.",
    summary: "Live subtitles use local Whisper or whisper.cpp when configured. Recording captures the selected screen with camera picture-in-picture and caption burn-in. Cloud upload is a planned integration, not fully built yet.",
    image: "./pdf_extracted_images/page-10-image-01.jpg",
    imageFit: "contain",
    caption: "Recording tab with local recording, upload roadmap, and live subtitle controls.",
    status: [["Live subtitles", "Semi-implemented", "partial"], ["Auto recording", "Implemented locally", "implemented"], ["Cloud upload", "Roadmap", "roadmap"]],
    meta: [["Feature mapped", "4, 5"], ["AI used", "Whisper flow for subtitles"], ["Code evidence", "server.js /caption/local; app.js MediaRecorder"]],
    proof: ["Subtitles improve access for children with hearing barriers and multilingual classrooms over time.", "Recordings can help parents and absent children continue learning after class.", "The prototype correctly separates local recording from future cloud upload."],
    actions: [["Enter play world", "games", true], ["Open parent portal", "parent", false]],
    featureMap: ["4", "5"]
  },
  {
    id: "games",
    nav: "Play games",
    role: "Feature 6",
    title: "Developmentally appropriate games build cognitive, logical, and reasoning skills.",
    summary: "Children play patterns, shapes, memory, sorting, counting, matching, tracing, and drawing activities through drag-and-drop and wall interaction. The loop is implemented; more puzzle categories and classroom refinement are planned.",
    image: "./pdf_extracted_images/page-02-image-01.jpg",
    imageFit: "contain",
    caption: "Home World with Shape Island, Pattern Room, Memory Train, and Drawing Studio.",
    status: [["Games", "Implemented", "implemented"], ["More puzzles", "Needed", "partial"], ["AI-personalized puzzles", "Planned", "roadmap"]],
    meta: [["Feature mapped", "6"], ["AI used", "IRT adaptation now; AI puzzle generation planned"], ["Code evidence", "PuzzleGenerator.ts; AdaptiveEngine.ts; PuzzleBoard.tsx"]],
    proof: ["Current play worlds map to preschool skills: pattern, shapes, memory, sorting, counting, and creative drawing.", "Interaction is embodied: children drag, trace, match, and move rather than only tapping worksheets.", "Current puzzle generation is procedural; AI-generated puzzles should be enabled only after schema validation and educator review."],
    actions: [["Play a drag/drop puzzle", "dragDrop", true], ["Show rewards", "rewards", false]],
    featureMap: ["6"]
  },
  {
    id: "dragDrop",
    nav: "Drag/drop",
    role: "Feature 6 / child flow",
    title: "The core child interaction is visual, playful, and hands-on.",
    summary: "A child selects a choice card and drags it into the target zone. This is the proof of the play-based learning loop: instruction, attempt, feedback, score update, and next adaptive activity.",
    image: "./pdf_extracted_images/page-04-image-01.jpg",
    imageFit: "contain",
    caption: "A drag-and-drop pattern/shape puzzle in the current product UI.",
    status: [["Drag/drop", "Implemented", "implemented"], ["Scoring", "Implemented", "implemented"], ["Classroom tuning", "Needed", "partial"]],
    meta: [["Feature mapped", "6"], ["AI used", "Adaptive scoring; local AI hint optional"], ["Code evidence", "PuzzleBoard.tsx; gameStore.ts; AdaptiveEngine.ts"]],
    proof: ["Supports cognitive, logical, and reasoning development through concrete visual play.", "Works as a shared wall activity for small groups, not only a solo tablet task.", "Future categories should expand language, numeracy, local-context objects, and multilingual prompts."],
    actions: [["Show rewards", "rewards", true], ["Open Learning DNA", "childStats", false]],
    featureMap: ["6"]
  },
  {
    id: "rewards",
    nav: "Rewards",
    role: "Feature 7",
    title: "Points and achievements exist; sticker shop and mentors are the next reward layer.",
    summary: "The current product supports XP, stars, badges, achievements, and unlockable worlds. A shop for stickers, mentor characters, customization, and in-person reward tie-ins is not yet implemented.",
    image: "./pdf_extracted_images/page-14-image-01.jpg",
    imageFit: "contain",
    caption: "Achievements screen from the current product evidence.",
    status: [["XP / stars", "Implemented", "implemented"], ["Achievements", "Implemented", "implemented"], ["Stickers / mentors", "Not yet", "roadmap"]],
    meta: [["Feature mapped", "7"], ["AI used", "None today; future personalization possible"], ["Code evidence", "RewardEngine.ts; ProfilePage.tsx"]],
    proof: ["Rewards make repeated play motivating without turning preschool learning into high-stakes testing.", "Future stickers and mentor characters can also connect to in-person classroom rewards.", "Mentors/customization should be designed inclusively and localized for children’s context."],
    actions: [["Show child stats", "childStats", true], ["Open parent portal", "parent", false]],
    featureMap: ["7"]
  },
  {
    id: "childStats",
    nav: "Child stats",
    role: "Feature 9",
    title: "Teachers can inspect an individual child’s cognitive profile.",
    summary: "The product builds a local Learning DNA profile with a score and dimension breakdown. This supports teacher visibility into a child’s strengths and growth areas; it is a learning signal, not a medical diagnosis.",
    image: "./pdf_extracted_images/page-13-image-01.jpg",
    imageFit: "contain",
    caption: "Individual dimension breakdown, insights, and achievements.",
    status: [["Child score", "Implemented", "implemented"], ["Dimension stats", "Implemented", "implemented"], ["Validated norms", "Planned", "roadmap"]],
    meta: [["Feature mapped", "9"], ["AI used", "Statistical profiling; future insights"], ["Code evidence", "CognitiveScorer.ts; ProfilePage.tsx; gameStore.ts"]],
    proof: ["Tracks attention, memory, response time, pattern logic, spatial reasoning, learning speed, and persistence.", "Teachers see where a child may need support without waiting for formal tests.", "Responsible framing: this should guide observation and support, not label children."],
    actions: [["Open parent portal", "parent", true], ["Open class teacher mode", "teacherClass", false]],
    featureMap: ["9"]
  },
  {
    id: "parent",
    nav: "Parent portal",
    role: "Feature 8",
    title: "Parents get progress, strengths, weaknesses, weekly activity, achievements, and home ideas.",
    summary: "The parent portal is semi-implemented. It shows scores, strengths, growth areas, weekly activity, achievements, and things to try at home; some weekly and recommendation content remains prototype/demo data.",
    image: "./pdf_extracted_images/page-18-image-01.jpg",
    imageFit: "contain",
    caption: "Parent dashboard with weekly activity, achievements, and try-at-home ideas.",
    status: [["Scores/strengths", "Implemented", "implemented"], ["Weekly activity", "Prototype", "partial"], ["AI home tips", "Planned", "roadmap"]],
    meta: [["Feature mapped", "8"], ["AI used", "Future student insights and home suggestions"], ["Code evidence", "ParentDashboard.tsx; CognitiveScorer.ts"]],
    proof: ["Parent language is plain and action-oriented, not data-science heavy.", "Home ideas help continuity outside the classroom, especially for vulnerable or mobile children.", "Future versions should add consent, local language, and caregiver-friendly explanations."],
    actions: [["Open teacher class mode", "teacherClass", true], ["Review AI stack", "aiStack", false]],
    featureMap: ["8"]
  },
  {
    id: "teacherClass",
    nav: "Teacher mode",
    role: "Feature 10",
    title: "Teacher mode shows class stats, heatmaps, intervention flags, and actions.",
    summary: "Teacher mode is semi-implemented with mock classroom data. It demonstrates class profile, score distribution, cognitive heatmap, students needing attention, and recommended actions; real roster data and AI recommendations are next.",
    image: "./pdf_extracted_images/page-21-image-01.jpg",
    imageFit: "contain",
    caption: "Teacher mode with class heatmap, students needing attention, and recommended actions.",
    status: [["Class dashboard", "Semi-implemented", "partial"], ["Cognitive heatmap", "Demo data", "partial"], ["AI actions", "Planned", "roadmap"]],
    meta: [["Feature mapped", "10"], ["AI used", "Future student insights/interventions"], ["Code evidence", "TeacherDashboard.tsx uses MOCK_STUDENTS"]],
    proof: ["The prototype communicates the intended teacher workflow clearly even before backend integration.", "Early detection should be framed as support/intervention guidance, not diagnosis.", "AI recommendations must remain teacher-reviewed and explainable."],
    actions: [["Map the AI stack", "aiStack", true], ["Implementation plan", "roadmap", false]],
    featureMap: ["10"]
  },
  {
    id: "aiStack",
    nav: "AI map",
    role: "AI approach",
    title: "The AI stack is local-first, but not every intelligent feature is an LLM.",
    summary: "Whisper supports subtitles, Ollama llama3 supports whiteboard flowcharts/definitions/Ask AI, shape assist improves drawings, IRT/procedural logic adapts puzzles today, and future AI insights will recommend interventions with teacher review.",
    image: "./pdf_extracted_images/page-12-image-01.jpg",
    imageFit: "contain",
    caption: "Learning DNA score is generated from play history and feeds parent/teacher insight surfaces.",
    status: [["Whisper subtitles", "Semi-implemented", "partial"], ["Ollama whiteboard", "Mostly implemented", "implemented"], ["AI insights", "Planned", "roadmap"]],
    meta: [["Feature mapped", "AI used list"], ["Hardware", "Runs locally where possible"], ["Responsible AI", "Teacher-in-loop, non-diagnostic"]],
    proof: ["AI claims are split accurately: speech AI, local LLM, shape assist, adaptive scoring, and future insights.", "The current AI puzzle generation path is planned; current runtime primarily uses procedural generation with IRT adaptation.", "Responsible AI needs consent, data minimization, multilingual review, and explainable recommendations."],
    actions: [["Implementation plan", "roadmap", true], ["Restart prototype", "hardware", false]],
    featureMap: ["3", "4", "6", "10"]
  },
  {
    id: "roadmap",
    nav: "Implementation",
    role: "Implementation plan",
    title: "The pilot build should convert semi-implemented features into a deployment-ready product.",
    summary: "Priority work: gesture refinement, full OS workflows, cloud upload, real roster data, sticker/mentor economy, AI puzzle generation validation, AI insights, multilingual content, consent/auth, and classroom efficacy testing.",
    image: "./pdf_extracted_images/page-20-image-01.jpg",
    imageFit: "contain",
    caption: "Teacher dashboard middle state: cognitive heatmap and student support areas that need real data integration.",
    status: [["Prototype", "Ready to demo", "implemented"], ["Pilot backend", "Next", "roadmap"], ["Efficacy study", "Needed", "roadmap"]],
    meta: [["Feature mapped", "All 10 features"], ["Highest risk", "Real data + Responsible AI"], ["Next sprint", "Backend, consent, roster, cloud"]],
    proof: ["The roadmap directly maps to the requested features and verified code status.", "The product should keep local-first mode for low-resource settings while adding secure cloud sync for schools.", "Pilot evaluation should test learning quality, teacher workload, inclusion, language, and child engagement."],
    actions: [["Restart from hardware", "hardware", true], ["Open smartboard", "smartboard", false]],
    featureMap: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  }
];

const nav = document.getElementById("screenNav");
const stage = document.getElementById("stage");
const roleEl = document.getElementById("screenRole");
const titleEl = document.getElementById("screenTitle");
const summaryEl = document.getElementById("screenSummary");
const statusGrid = document.getElementById("statusGrid");
const metaGrid = document.getElementById("metaGrid");
const featureMap = document.getElementById("featureMap");
const proofList = document.getElementById("proofList");
const actions = document.getElementById("actions");
const image = document.getElementById("screenImage");
const caption = document.getElementById("deviceCaption");
const deviceLabel = document.getElementById("deviceLabel");
const featureRail = document.getElementById("featureRail");
const flowStrip = document.getElementById("flowStrip");

function screenById(id) {
  return screens.find((screen) => screen.id === id) || screens[0];
}

function renderFeatureRail(activeIds = []) {
  featureRail.innerHTML = features
    .map((feature) => {
      const active = activeIds.includes(feature.id);
      return `<button type="button" class="feature-chip ${active ? "is-active" : ""}" data-target="${feature.target}">
        <strong>${feature.id}</strong>
        <span>${feature.title}</span>
      </button>`;
    })
    .join("");
}

function setScreen(id, push = true) {
  const screen = screenById(id);
  roleEl.textContent = screen.role;
  titleEl.textContent = screen.title;
  summaryEl.textContent = screen.summary;
  image.src = screen.image;
  image.alt = `${screen.nav} prototype evidence`;
  image.dataset.fit = screen.imageFit || "cover";
  caption.textContent = screen.caption;
  deviceLabel.textContent = screen.nav;

  statusGrid.innerHTML = screen.status
    .map(([label, value, tone]) => `<div class="status-pill" data-tone="${tone}"><strong>${label}</strong><span>${value}</span></div>`)
    .join("");

  metaGrid.innerHTML = screen.meta
    .map(([label, value]) => `<div class="meta-item"><strong>${label}</strong><span>${value}</span></div>`)
    .join("");

  featureMap.innerHTML = (screen.featureMap || [])
    .map((id) => {
      const feature = features.find((item) => item.id === id);
      return feature ? `<button type="button" data-target="${feature.target}"><strong>Feature ${feature.id}</strong><span>${feature.status}</span></button>` : "";
    })
    .join("");

  proofList.innerHTML = screen.proof.map((item) => `<li>${item}</li>`).join("");

  actions.innerHTML = screen.actions
    .map(([label, target, primary]) => `<button type="button" class="${primary ? "primary" : ""}" data-target="${target}">${label}</button>`)
    .join("");

  renderFeatureRail(screen.featureMap || []);

  document.querySelectorAll("[data-screen-id]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.screenId === screen.id);
  });

  if (push) history.replaceState(null, "", `#${screen.id}`);
  stage.focus({ preventScroll: true });
}

function buildNav() {
  nav.innerHTML = screens
    .map((screen, index) => `<button type="button" class="nav-button" data-screen-id="${screen.id}">
        <span class="nav-index">${index + 1}</span>
        <span>${screen.nav}</span>
      </button>`)
    .join("");

  flowStrip.innerHTML = screens
    .map((screen) => `<button type="button" data-target="${screen.id}">${screen.nav}</button>`)
    .join("");
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-target], [data-screen-id]");
  if (!target) return;
  setScreen(target.dataset.target || target.dataset.screenId);
});

window.addEventListener("keydown", (event) => {
  const current = screenById(location.hash.replace("#", ""));
  const index = screens.findIndex((screen) => screen.id === current.id);
  if (event.key === "ArrowRight") setScreen(screens[Math.min(index + 1, screens.length - 1)].id);
  if (event.key === "ArrowLeft") setScreen(screens[Math.max(index - 1, 0)].id);
});

buildNav();
setScreen(location.hash.replace("#", "") || "hardware", false);
