import{A as e,B as t,C as n,D as r,E as i,F as a,I as o,L as s,M as c,N as l,O as u,P as d,R as f,S as p,T as m,a as h,b as g,f as _,g as v,h as y,i as b,j as x,k as S,m as C,p as w,r as T,t as E,v as D,w as ee,x as te,y as ne}from"./jsx-runtime-D22peNH6.js";import{l as re,s as ie}from"./club-calendar-Cq9jRduU.js";var O=t(f(),1),k={home:`#/home`,program:`#/program`,library:`#/library`,month:`#/month`,material:`#/material`,scheduled:`#/material/upcoming`,practice:`#/practice`,reflection:`#/reflection`,planner:`#/planner`},ae=/^\d{4}-(?:0[1-9]|1[0-2])$/,A={month:``,material:`/material`,scheduled:`/material/upcoming`,practice:`/practice`,reflection:`/reflection`,planner:`/planner`};function j(e){if(!ae.test(e))throw Error(`Invalid month ID`);return Object.fromEntries(Object.entries(A).map(([t,n])=>[t,`#/months/${e}${n}`]))}function oe(e){let t=new URLSearchParams;return e.query&&t.set(`q`,e.query),e.month&&t.set(`month`,e.month),e.format&&t.set(`format`,e.format),e.rubric&&t.set(`rubric`,e.rubric),t}function se(e){let t=oe(e).toString();return k.library+(t?`?${t}`:``)}function ce(e,t){if(!/^[a-zA-Z0-9_-]+$/.test(t)||t===`upcoming`)throw Error(`Invalid material ID`);return`${j(e).material}/${t}`}function le(e,t,n){let r=oe(t);return r.set(`origin`,`library`),`${n?ce(e,n):j(e).material}?${r}`}function ue(e,t=`home`){if(e.length>2048)return null;let[n,r=``,i]=(e||k[t]).split(`?`);if(i!==void 0)return null;let a=Object.keys(k).find(e=>k[e]===n),o=null,s=null;if(!a){let e=/^#\/months\/(\d{4}-(?:0[1-9]|1[0-2]))(.*)$/.exec(n);if(!e)return null;if(o=e[1],a=Object.keys(A).find(t=>A[t]===e[2]),!a){let t=/^\/material\/([a-zA-Z0-9_-]+)$/.exec(e[2]);t&&(a=`material`,s=t[1])}}if(!a)return null;let c=new URLSearchParams(r);for(let e of c.keys())if(![`q`,`month`,`origin`,`format`,`rubric`].includes(e)||c.getAll(e).length!==1)return null;let l=c.get(`origin`);if(l!==null&&(l!==`library`||a!==`material`)||c.size&&a!==`library`&&(a!==`material`||l!==`library`))return null;let u=c.get(`month`)??``;if(u&&!ae.test(u))return null;let d={query:c.get(`q`)??``,month:u};return c.has(`format`)&&(d.format=c.get(`format`)),c.has(`rubric`)&&(d.rubric=c.get(`rubric`)),{route:a,monthId:o,materialId:s,library:d,origin:l===`library`?`library`:`month`}}var M=E();function de({paragraphs:e}){if(!e.length)return null;let t=e[0].split(`
`).filter(Boolean);return(0,M.jsx)(`div`,{className:`exercise-intro`,children:(0,M.jsxs)(`div`,{className:`exercise-intro-inner`,children:[t.length>1?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(`p`,{className:`exercise-intro-meta`,children:t.slice(0,-1).join(` `)}),(0,M.jsx)(`h2`,{children:t.at(-1)})]}):(0,M.jsx)(`p`,{className:`exercise-intro-title`,children:e[0]}),e.slice(1).map((e,t)=>(0,M.jsx)(`p`,{className:t===0?`exercise-description`:`exercise-context`,children:e},t))]})})}var N={article:`Статья`,video:`Запись встречи`,quiz:`Тренажёр`,collection:`Подборка`},fe=`finhealth.exercise.v1`;function pe(e,t){return a(e)&&e.protocol===`finhealth.exercise.v1`&&e.channel===t&&(e.method===`resize`?typeof e.height==`number`&&Number.isFinite(e.height)&&e.height>=0&&e.height<=1e4:[`init`,`save`].includes(e.method)&&Number.isSafeInteger(e.requestId)&&e.requestId>0)}function me(e,t,n,r){if(!/^[a-z0-9-]+$/i.test(e))throw Error(`Invalid channel`);let i=e=>e.replace(/<\/script/gi,`<\\/script`);return`<!doctype html><html lang="ru" data-channel="${e}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${e}'; style-src 'unsafe-inline'; font-src data:; connect-src 'none'; img-src 'none'; form-action 'none'; base-uri 'none'"><style>${r}</style></head><body><main id="exercise"></main><script nonce="${e}">${i(t)}<\/script><script nonce="${e}">${i(n)}<\/script></body></html>`}var he=`// Included in an isolated document. Authors use only window.FinHealth.
(() => {
  const channel = document.documentElement.dataset.channel;
  let sequence = 0;
  const pending = new Map();
  function request(method, payload) {
    const requestId = ++sequence;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { pending.delete(requestId); reject(new Error('Нет подтверждения сохранения. Повторите попытку.')); }, 10000);
      pending.set(requestId, { resolve, reject, timer });
      parent.postMessage({ protocol: 'finhealth.exercise.v1', channel, requestId, method, payload }, '*');
    });
  }
  addEventListener('message', event => {
    const data = event.data;
    if (event.source !== parent || data?.protocol !== 'finhealth.exercise.v1' || data.channel !== channel || data.method !== 'response') return;
    const task = pending.get(data.requestId);
    if (!task) return;
    clearTimeout(task.timer); pending.delete(data.requestId);
    if (data.ok) task.resolve(data.value); else task.reject(new Error(data.error || 'Не удалось сохранить.'));
  });
  let queue = Promise.resolve();
  function save(payload) {
    const snapshot = structuredClone(payload);
    const next = queue.catch(() => {}).then(() => request('save', snapshot));
    queue = next; return next;
  }
  window.FinHealth = Object.freeze({
    init: () => request('init'), save,
    complete: payload => save({ ...payload, status: 'completed' }),
    resize: height => parent.postMessage({ protocol: 'finhealth.exercise.v1', channel, method: 'resize', height }, '*'),
  });
})();
`,ge=`:root { font-family: var(--fh-font); color: var(--fh-ink); line-height: 1.6; font-size: var(--fh-text-body); color-scheme: light; background: transparent; }
* { box-sizing: border-box; }
body { margin: 0; background: transparent; }
/* Contain child margins and focus rings in the box measured for the host. */
#exercise { display: flow-root; padding: 6px; }
p { margin: 0 0 12px; overflow-wrap: anywhere; }
.instruction { white-space: pre-wrap; font-size: 18px; }
label { display: block; margin-bottom: 8px; font-weight: 600; }
textarea { display: block; width: 100%; resize: vertical; border: 1px solid var(--fh-secondary); border-radius: var(--fh-radius-field); padding: 12px; font: inherit; color: inherit; background: var(--fh-surface); margin-bottom: 16px; }
.check,.choice { display: flex; align-items: flex-start; gap: 12px; }
input { flex-shrink: 0; margin: 3px 0 0; accent-color: var(--fh-ink); width: 20px; height: 20px; }
.question-card { border: 1px solid var(--fh-line); border-radius: var(--fh-radius-content); padding: 24px; margin: 0 0 20px; background: var(--fh-surface); }
fieldset { min-width: 0; border: 0; padding: 0; margin: 0; }
legend { font-size: 18px; line-height: 1.5; font-weight: 650; padding: 0; margin-bottom: 20px; width: 100%; overflow-wrap: anywhere; }
.question-number { display: block; color: var(--fh-secondary); font-size: var(--fh-text-small); font-weight: 500; margin-bottom: 8px; }
.choice { border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); padding: 12px 14px; background: var(--fh-canvas); margin-bottom: 8px; font-weight: 400; cursor: pointer; }
.choice:hover { background: var(--fh-hover); }
.choice:has(input:checked) { border-color: var(--fh-ink); background: var(--fh-selected); }
.choice:has(input:focus-visible) { outline: 3px solid var(--fh-accent); outline-offset: 2px; }
.check { font-weight: 400; padding: 12px 0; }
button { background: var(--fh-ink); color: var(--fh-surface); border: 1px solid var(--fh-ink); border-radius: var(--fh-radius-pill); padding: 10px 20px; min-height: var(--fh-control-height); font: inherit; font-weight: 600; cursor: pointer; }
button:hover { background: var(--fh-action-hover); }
button.secondary { color: var(--fh-secondary); background: transparent; border-color: transparent; text-decoration: underline; text-underline-offset: 3px; }
button.secondary:hover { color: var(--fh-ink); background: var(--fh-hover); }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 20px; }
:focus-visible { outline: 3px solid var(--fh-accent); outline-offset: 3px; }
.save-status { color: var(--fh-secondary); font-size: var(--fh-text-small); }
.visually-hidden { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.quiz-summary { font-size: var(--fh-text-small); color: var(--fh-secondary); margin-bottom: 16px; }
.quiz-progress { display: block; appearance: none; border: 0; border-radius: 4px; overflow: hidden; height: 4px; width: 100%; margin-bottom: 8px; background: var(--fh-line); color: var(--fh-ink); }
.quiz-progress::-webkit-progress-bar { background: var(--fh-line); }
.quiz-progress::-webkit-progress-value { background: var(--fh-ink); }
.quiz-progress::-moz-progress-bar { background: var(--fh-ink); }
.actions + [role=status]:not(:empty):not(.visually-hidden) { margin: 16px 0 0; padding: 12px 16px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); background: var(--fh-canvas); }
.actions + [role=status]:empty { display: none; }
.correct { color: #25613a; }.wrong { color: #85372b; }
.question-card:last-child { margin-bottom: 0; }
[hidden] { display: none !important; }
@media (max-width: 500px) { .question-card { padding: 18px 14px; } legend { font-size: 17px; } .choice { padding: 12px; } }

.choice-text { flex: 1; min-width: 0; }
.choice.answer-correct, .choice.answer-correct:has(input:checked) { border-color: #79a58a; background: #edf6ef; color: #25613a; }
.choice.answer-wrong, .choice.answer-wrong:has(input:checked) { border-color: #ce9990; background: #fcf0ee; color: #85372b; }
[role=status] strong, [role=status] strong + span { display: block; }
[role=status] strong + span { margin-top: 4px; }
`,_e=`// First-party renderer: content enters as plain text through the exercise SDK.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const node = document.createElement(tag); if (text) node.textContent = text; parent.append(node); return node; };
  const button = (text, parent, action) => { const node = el('button', text, parent); node.type = 'button'; node.onclick = action; return node; };
  let context;
  try { context = await FinHealth.init(); }
  catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config } = context;
  const tasks = new Map(config.tasks.map(task => [task.id, task]));
  const categories = new Map(config.categories.map(category => [category.id, category.title]));
  const lines = [...Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => r * 5 + c)),
    ...Array.from({ length: 5 }, (_, c) => Array.from({ length: 5 }, (_, r) => r * 5 + c)), [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]];
  function fresh() {
    const card = config.tasks.map(task => task.id);
    for (let i = card.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [card[i], card[j]] = [card[j], card[i]]; }
    return { card, marks: [] };
  }
  let state = context.record ? structuredClone(context.record.state) : fresh();
  let selected = null; let origin = null; let revision = 0; let lastPayload;
  const winning = () => lines.filter(line => line.every(index => state.marks.includes(state.card[index])));
  const payload = () => ({ state: structuredClone(state), status: winning().length ? 'completed' : state.marks.length ? 'in_progress' : 'not_started', outcome: 'not_applicable' });
  el('h3', config.title).className = 'bingo-title';
  if (config.instructions[0]) el('p', config.instructions[0]).className = 'bingo-open-instruction';
  const instructions = el('details'); instructions.className = 'bingo-instructions';
  el('summary', 'Как играть', instructions);
  const list = el('ul', '', instructions); config.instructions.slice(1).forEach(text => el('li', text, list));
  const actions = el('div'); actions.className = 'actions bingo-controls';
  const newCard = button('Новая карточка', actions, () => confirmChange('new'));
  const reset = button('Сбросить отметки', actions, () => confirmChange('reset')); reset.className = 'secondary';
  button('Распечатать', actions, () => window.print()).className = 'secondary';
  const confirmation = el('div'); confirmation.className = 'bingo-confirm'; confirmation.hidden = true;
  confirmation.setAttribute('role', 'group'); confirmation.setAttribute('aria-labelledby', 'bingo-confirm-text');
  const confirmText = el('p', '', confirmation); confirmText.id = 'bingo-confirm-text';
  let pendingAction = null;
  button('Подтвердить', confirmation, () => {
    const action = pendingAction; confirmation.hidden = true; pendingAction = null; closeDetail(false);
    state = action === 'new' ? fresh() : { card: [...state.card], marks: [] }; renderGrid(); refresh(); persist();
    (action === 'new' ? newCard : reset).focus();
  });
  const cancel = button('Отмена', confirmation, () => {
    const action = pendingAction; confirmation.hidden = true; pendingAction = null; (action === 'new' ? newCard : reset).focus();
  }); cancel.className = 'secondary';
  function confirmChange(action) {
    pendingAction = action; confirmation.hidden = false;
    confirmText.textContent = action === 'new' ? 'Создать новую карточку? Текущая карточка и отметки будут заменены.' : 'Сбросить все отметки? Карточка останется прежней.';
    cancel.focus();
  }
  const stats = el('p'); stats.className = 'bingo-stats'; stats.setAttribute('role', 'status');
  const grid = el('div'); grid.className = 'bingo-grid'; grid.setAttribute('role', 'group'); grid.setAttribute('aria-label', 'Карточка бинго, 5 строк и 5 столбцов');
  const detail = el('section'); detail.className = 'bingo-detail'; detail.hidden = true; detail.setAttribute('aria-labelledby', 'bingo-detail-title');
  const detailCategory = el('p', '', detail); detailCategory.className = 'bingo-category';
  const detailTitle = el('h4', '', detail); detailTitle.id = 'bingo-detail-title'; detailTitle.tabIndex = -1;
  const detailActions = el('div', '', detail); detailActions.className = 'actions';
  const mark = button('', detailActions, () => { toggle(selected); mark.focus(); });
  button('Закрыть', detailActions, () => closeDetail(true)).className = 'secondary';
  function closeDetail(focus) { detail.hidden = true; selected = null; refresh(); if (focus) origin?.focus(); }
  function toggle(id) {
    state = { card: [...state.card], marks: state.marks.includes(id) ? state.marks.filter(item => item !== id) : [...state.marks, id] };
    refresh(); persist();
  }
  function renderGrid() {
    grid.replaceChildren();
    state.card.forEach((id, index) => {
      const task = tasks.get(id);
      const cell = button('', grid, () => {
        if (selected === id) { toggle(id); closeDetail(true); return; }
        selected = id; origin = cell; detailCategory.textContent = categories.get(task.categoryId); detailTitle.textContent = task.text;
        detail.hidden = false; refresh(); detailTitle.focus();
      });
      cell.className = 'bingo-cell'; cell.dataset.taskId = id;
      cell.setAttribute('aria-label', \`Строка \${Math.floor(index / 5) + 1}, столбец \${index % 5 + 1}. \${categories.get(task.categoryId)}. \${task.text}\`);
      cell.setAttribute('aria-controls', 'bingo-detail-title');
      el('span', String(index + 1), cell).className = 'bingo-ordinal';
      el('span', categories.get(task.categoryId), cell).className = 'bingo-category';
      el('span', task.text, cell).className = 'bingo-task';
      el('span', '', cell).className = 'bingo-mark';
    });
  }
  function refresh() {
    const wins = winning(); const winnerIds = new Set(wins.flat().map(index => state.card[index]));
    stats.textContent = \`Выполнено \${state.marks.length} из 25 · \${state.marks.length * 4}%\${wins.length ? \` · Бинго! Линий: \${wins.length}\` : ''}\`;
    for (const cell of grid.children) {
      const id = cell.dataset.taskId; const marked = state.marks.includes(id);
      cell.classList.toggle('bingo-completed', marked); cell.classList.toggle('bingo-winning', winnerIds.has(id));
      cell.setAttribute('aria-expanded', String(selected === id));
      cell.querySelector('.bingo-mark').textContent = winnerIds.has(id) ? '✓ Бинго' : marked ? '✓ Выполнено' : '';
      cell.setAttribute('aria-description', marked ? 'Выполнено. Откройте задание, чтобы снять отметку.' : 'Не выполнено. Откройте задание, чтобы отметить.');
    }
    if (selected) mark.textContent = state.marks.includes(selected) ? 'Снять отметку' : 'Отметить выполненным';
  }
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { if (!confirmation.hidden) cancel.click(); else if (!detail.hidden) closeDetail(true); } });
  const saveStatus = el('p'); saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role', 'status');
  const retry = button('Повторить сохранение', root, () => persist(lastPayload)); retry.hidden = true; retry.className = 'bingo-retry';
  async function persist(value = payload()) {
    lastPayload = structuredClone(value); const current = ++revision; retry.hidden = true;
    saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role', 'status'); saveStatus.textContent = 'Сохраняем…';
    try {
      const response = await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if (current !== revision) return;
      saveStatus.textContent = response.storage === 'browser' ? 'Сохранено в этом браузере' : 'Сохранено до обновления страницы';
    } catch (error) {
      if (current !== revision) return;
      saveStatus.className = 'save-status'; saveStatus.setAttribute('role', 'alert'); saveStatus.textContent = \`\${error.message} Карточка и отметки на месте.\`; retry.hidden = false;
    }
  }
  renderGrid(); refresh();
  if (!context.record) persist(); // Persist the permutation immediately, even with zero marks.
  else if (context.pending) {
    lastPayload = payload(); saveStatus.className = 'save-status'; saveStatus.setAttribute('role', 'alert');
    saveStatus.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; retry.hidden = false;
  }
  const resize = () => FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2);
  resize(); // Offscreen iframe observers may be throttled; supply the initial measured height.
  new ResizeObserver(resize).observe(root);
})();
`,ve=`.bingo-title { margin: 0 0 12px; }
.bingo-instructions { margin-bottom: 12px; }
.bingo-instructions summary { cursor: pointer; }
.bingo-instructions li { margin: 6px 0; }
.bingo-controls { flex-wrap: wrap; }
.bingo-confirm { padding: 12px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); margin: 12px 0; }
.bingo-confirm button { margin: 0 8px 4px 0; }
.bingo-stats { font-weight: 600; }
.bingo-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
.bingo-grid .bingo-cell { display: flex; flex-direction: column; align-items: stretch; gap: 6px; text-align: left; min-width: 0; min-height: 150px; padding: 8px; color: var(--fh-ink); background: var(--fh-surface); border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); overflow-wrap: anywhere; }
.bingo-category { display: block; color: var(--fh-secondary); font-size: 11px; font-weight: 500; }
.bingo-ordinal { font-size: 12px; font-weight: 700; color: var(--fh-secondary); }
.bingo-task { display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; overflow: hidden; font-size: 13px; font-weight: 500; line-height: 1.4; }
.bingo-mark { margin-top: auto; font-size: 11px; font-weight: 700; }
.bingo-grid .bingo-completed { background: var(--fh-selected); border-color: var(--fh-ink); }
.bingo-grid .bingo-winning { box-shadow: inset 0 0 0 2px var(--fh-accent); }
.bingo-grid .bingo-cell[aria-expanded="true"] { outline: 2px solid var(--fh-ink); outline-offset: 1px; }
.bingo-cell:focus-visible, .bingo-detail h4:focus-visible { outline: 3px solid var(--fh-accent); outline-offset: 2px; }
.bingo-detail { padding: 16px; margin-top: 12px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); }
.bingo-detail h4 { margin: 8px 0 16px; font-size: 18px; line-height: 1.5; overflow-wrap: anywhere; }
[hidden] { display: none !important; }
@media (max-width: 400px) {
  .bingo-grid { gap: 3px; }
  .bingo-grid .bingo-cell { padding: 5px 3px; min-height: 115px; }
  .bingo-task { font-size: 12px; -webkit-line-clamp: 3; }
  .bingo-cell .bingo-category { display: none; }
  .bingo-mark { font-size: 11px; }
  .bingo-detail { padding: 12px; }
}
@media print {
  .bingo-controls, .bingo-confirm, .bingo-detail, .save-status, .bingo-retry { display: none !important; }
  .bingo-instructions, .bingo-open-instruction { display: none; }
  .bingo-cell .bingo-category { display: block; }
  .bingo-grid { gap: 4px; }
  .bingo-grid .bingo-cell { color: #000; background: #fff; min-height: 130px; break-inside: avoid; }
  .bingo-task { display: block; overflow: visible; font-size: 12px; }
  .bingo-grid .bingo-winning { box-shadow: none; border: 2px solid #000; }
  .bingo-grid .bingo-cell[aria-expanded="true"] { outline: none; }
}
`,ye=`// First-party renderer. Author content arrives only through the host's private config.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text = '', parent = root) => { const node = document.createElement(tag); node.textContent = text; parent.append(node); return node; };
  let context;
  try { context = await FinHealth.init(); }
  catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const config = context.config;
  const empty = mode => ({ mode, screen: 'intro', index: 0, answers: {}, dialogues: {}, leadValues: [], leadAutomatic: true, reflected: [], missing: [], rule: '' });
  let state = context.record?.state ?? empty('full');
  let revision = 0, lastPayload;
  root.classList.add('compass');
  const content = el('div');
  const status = el('p'); status.className = 'save-status'; status.setAttribute('role', 'status');
  const retry = el('button', 'Повторить сохранение'); retry.type = 'button'; retry.hidden = true;
  retry.onclick = () => persist(lastPayload);
  const counts = () => config.modes[state.mode];
  function payload() {
    return { state: structuredClone(state), status: state.screen === 'result' ? 'completed' : state.screen !== 'intro' || Object.keys(state.answers).length || Object.keys(state.dialogues).length || state.rule ? 'in_progress' : 'not_started', outcome: 'not_applicable' };
  }
  async function persist(value = payload()) {
    lastPayload = structuredClone(value);
    const current = ++revision;
    status.setAttribute('role', 'status'); status.textContent = 'Сохраняем…'; retry.hidden = true;
    try {
      await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if (current !== revision) return;
      status.textContent = 'Сохранено до обновления страницы';
    } catch (error) {
      if (current !== revision) return;
      status.setAttribute('role', 'alert'); status.textContent = \`\${error.message} Ваш ввод на месте.\`; retry.hidden = false;
    }
  }
  function tally() {
    const result = {};
    const bump = (v, weight) => { result[v] = (result[v] ?? 0) + weight; };
    for (const [key, answer] of Object.entries(state.answers)) bump(config.scenarios[Number(key)].options[answer].value, config.weights.situation);
    for (const [key, answer] of Object.entries(state.dialogues)) {
      const d = config.conflicts[Number(key)];
      if (answer.a !== undefined) bump(d.valuesA[answer.a].v, config.weights.dialogue);
      if (answer.b !== undefined) bump(d.valuesB[answer.b].v, config.weights.dialogue);
    }
    return result;
  }
  // Stable sorting preserves the author's first-encounter order for equal weights.
  function sorted() { const weights = tally(); return Object.keys(weights).sort((a, b) => weights[b] - weights[a]); }
  function shownValues() { const ranked = sorted(); return ranked.concat(Object.keys(config.valueLabels).filter(v => !ranked.includes(v))).slice(0, 8); }
  const button = (label, action, parent = content, id) => {
    const node = el('button', label, parent); node.type = 'button'; if (id) node.id = id; node.onclick = action; return node;
  };
  function update(action, focusId) { action(); render(focusId); persist(); }
  function move(screen, index = 0) { update(() => { state.screen = screen; state.index = index; }); }
  function nav(previous, nextLabel, next, disabled = false) {
    const row = el('div', '', content); row.className = 'actions compass-nav';
    button('Назад', previous, row).className = 'secondary';
    button(nextLabel, next, row).disabled = disabled;
  }
  function heading(title, instruction) {
    const h = el('h2', title, content); h.tabIndex = -1; h.id = 'compass-heading';
    if (instruction) el('p', instruction, content).className = 'instruction';
  }
  function choices(label, options, selected, change, prefix) {
    const field = el('fieldset', '', content); el('legend', label, field);
    options.forEach((option, index) => {
      const wrap = el('label', '', field); wrap.className = 'choice';
      const radio = el('input', '', wrap); radio.type = 'radio'; radio.name = prefix; radio.id = \`\${prefix}-\${index}\`;
      radio.checked = selected === index; radio.value = String(index);
      el('span', option.text ?? option.label, wrap).className = 'choice-text';
      radio.onchange = () => update(() => change(index), radio.id);
    });
  }
  function valueChoices(label, key, max, values) {
    const field = el('fieldset', '', content); el('legend', label, field);
    values.forEach(value => {
      const wrap = el('label', '', field); wrap.className = 'choice compass-value';
      const input = el('input', '', wrap); input.type = max === 1 ? 'radio' : 'checkbox'; input.name = key; input.id = \`\${key}-\${value}\`;
      input.checked = state[key].includes(value); input.disabled = max > 1 && !input.checked && state[key].length >= max;
      el('span', config.valueLabels[value], wrap).className = 'choice-text';
      input.onchange = () => update(() => {
        if (key === 'leadValues') state.leadAutomatic = false;
        state[key] = max === 1 ? [value] : input.checked ? [...state[key], value] : state[key].filter(v => v !== value);
      }, input.id);
    });
  }
  function reset(mode = state.mode) {
    if (!Object.keys(state.answers).length && !Object.keys(state.dialogues).length && !state.rule) {
      update(() => { state = empty(mode); }); return;
    }
    const area = el('div', '', content); area.className = 'compass-confirm'; area.setAttribute('role', 'alertdialog'); area.setAttribute('aria-modal', 'false'); area.setAttribute('aria-labelledby', 'compass-reset-title');
    el('p', 'Начать заново? Все ответы и семейное правило будут удалены.', area).id = 'compass-reset-title';
    const cancel = button('Отмена', () => render(state.screen === 'intro' ? \`mode-\${state.mode}\` : 'compass-restart'), area);
    button('Удалить ответы и начать заново', () => update(() => { state = empty(mode); }), area);
    cancel.focus();
  }
  function render(focusId) {
    content.replaceChildren();
    const { situations, dialogues } = counts();
    const progress = el('progress', '', content); progress.className = 'quiz-progress'; progress.max = situations + dialogues + 1;
    progress.value = state.screen === 'result' ? progress.max : Object.keys(state.answers).length + Object.values(state.dialogues).filter(d => d.a !== undefined && d.b !== undefined).length;
    progress.setAttribute('aria-label', 'Пройдено шагов');
    if (state.screen === 'intro') {
      heading(config.text.introTitle, config.text.introBody);
      el('p', config.text.introQuestion, content).className = 'compass-callout';
      const field = el('fieldset', '', content); el('legend', 'Формат прохождения', field);
      for (const [mode, label, duration] of [['full', 'Полная версия', '20–25 мин'], ['short', 'Короткая версия', '10–12 мин']]) {
        const wrap = el('label', '', field); wrap.className = 'choice';
        const input = el('input', '', wrap); input.type = 'radio'; input.name = 'mode'; input.id = \`mode-\${mode}\`; input.checked = state.mode === mode;
        const c = config.modes[mode]; el('span', \`\${label} · \${c.situations} \${c.situations === 3 ? 'ситуации' : 'ситуаций'} · \${c.dialogues} диалога (\${duration})\`, wrap).className = 'choice-text';
        input.onchange = () => reset(mode);
      }
      button('Начать тренажёр', () => move('situations'));
    } else if (state.screen === 'situations') {
      const scenario = config.scenarios[state.index];
      el('p', \`Раунд 1 · Ситуация \${state.index + 1} из \${situations}\`, content).className = 'compass-step';
      heading(config.text.situationsTitle, config.text.situationsInstruction);
      choices(scenario.quote, scenario.options, state.answers[state.index], answer => { state.answers[state.index] = answer; }, 'situation');
      el('p', scenario.meta, content).className = 'compass-step';
      const answer = state.answers[state.index];
      if (answer !== undefined) { const reveal = el('p', scenario.options[answer].sub + config.text.choiceReveal, content); reveal.className = 'compass-callout'; reveal.setAttribute('role', 'status'); }
      nav(() => state.index ? move('situations', state.index - 1) : move('intro'), state.index === situations - 1 ? 'Перейти к раунду 2' : 'Следующая ситуация',
        () => state.index === situations - 1 ? move('dialogues') : move('situations', state.index + 1), answer === undefined);
    } else if (state.screen === 'dialogues') {
      const dialogue = config.conflicts[state.index], answer = state.dialogues[state.index] ?? {};
      el('p', \`Раунд 2 · Диалог \${state.index + 1} из \${dialogues}\`, content).className = 'compass-step';
      heading(config.text.dialoguesTitle, config.text.dialoguesInstruction);
      choices(dialogue.lineA, dialogue.valuesA, answer.a, a => { state.dialogues[state.index] = { ...answer, a }; }, 'dialogue-a');
      choices(dialogue.lineB, dialogue.valuesB, answer.b, b => { state.dialogues[state.index] = { ...answer, b }; }, 'dialogue-b');
      const complete = answer.a !== undefined && answer.b !== undefined;
      if (complete) { const reveal = el('p', dialogue.resolution, content); reveal.className = 'compass-callout'; reveal.setAttribute('role', 'status'); }
      nav(() => state.index ? move('dialogues', state.index - 1) : move('situations', situations - 1), state.index === dialogues - 1 ? 'Перейти к раунду 3' : 'Следующий диалог', () => {
        if (state.index < dialogues - 1) move('dialogues', state.index + 1);
        else update(() => { if (state.leadAutomatic) state.leadValues = sorted().slice(0, 3); state.screen = 'values'; state.index = 0; });
      }, !complete);
    } else if (state.screen === 'values') {
      heading(config.text.valuesTitle, config.text.valuesInstruction);
      const values = shownValues();
      // Keep previously chosen values reachable after revisiting and changing earlier answers.
      const reachable = [...new Set([...values, ...state.leadValues, ...state.reflected, ...state.missing])];
      valueChoices('Ведущие ценности · максимум три', 'leadValues', 3, reachable);
      el('p', config.text.mapHelp, content).className = 'compass-step';
      valueChoices(config.text.reflectedTitle, 'reflected', 1, reachable);
      valueChoices(config.text.missingTitle, 'missing', 1, reachable);
      nav(() => move('dialogues', dialogues - 1), 'Собрать компас', () => move('result'));
    } else {
      heading(config.text.resultTitle, config.text.resultBody);
      const weights = tally(), ranking = sorted(), max = Math.max(1, ...Object.values(weights));
      const list = el('dl', '', content); list.className = 'compass-tally';
      for (const value of ranking.slice(0, 6)) {
        el('dt', config.valueLabels[value], list); const item = el('dd', '', list);
        const bar = el('progress', '', item); bar.max = max; bar.value = weights[value]; bar.setAttribute('aria-label', config.valueLabels[value]);
        el('span', String(weights[value]), item);
      }
      const leading = state.leadValues.length ? state.leadValues : ranking.slice(0, 1);
      el('h3', 'Ведущие ценности', content); el('p', leading.map(v => config.valueLabels[v]).join(' · ') || '—', content);
      for (const [key, title] of [['reflected', config.text.reflectedTitle], ['missing', config.text.missingTitle]]) {
        if (state[key].length) { el('h3', title, content); el('p', state[key].map(v => config.valueLabels[v]).join(' · '), content); }
      }
      el('p', config.text.ruleInstruction, content).className = 'instruction';
      const label = el('label', 'Одно правило потребления для семьи', content); label.htmlFor = 'compass-rule';
      const input = el('textarea', '', content); input.id = 'compass-rule'; input.rows = 3; input.maxLength = 10000; input.placeholder = config.text.rulePlaceholder; input.value = state.rule;
      const printRule = el('p', state.rule, content); printRule.className = 'compass-print-rule';
      input.oninput = () => { state.rule = input.value; printRule.textContent = state.rule; persist(); };
      const examples = el('details', '', content); el('summary', 'Примеры правил', examples);
      for (const rule of config.ruleExamples) button(rule, () => { state.rule = rule; input.value = rule; printRule.textContent = rule; input.focus(); persist(); }, examples).className = 'compass-example';
      nav(() => move('values'), 'Распечатать компас', () => window.print());
    }
    if (state.screen !== 'intro') button('Пройти заново', () => reset(), content, 'compass-restart').className = 'secondary compass-restart';
    (document.getElementById(focusId || 'compass-heading'))?.focus({ preventScroll: true });
  }
  render();
  status.textContent = 'Ответы сохраняются до обновления страницы';
  if (context.pending) { status.setAttribute('role', 'alert'); status.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; lastPayload = payload(); retry.hidden = false; }
  const resize = () => FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2);
  resize(); // Offscreen iframe observers may be throttled; supply the initial measured height.
  new ResizeObserver(resize).observe(root);
})();
`,be=`.compass h2 { margin: 12px 0 16px; font-size: 22px; line-height: 1.35; overflow-wrap: anywhere; }
.compass h3 { margin: 20px 0 8px; font-size: 18px; }
.compass fieldset { margin: 20px 0; }
.compass legend { margin-bottom: 12px; }
.compass .compass-step { color: var(--fh-secondary); font-size: var(--fh-text-small); }
.compass .compass-callout { padding: 16px; border-radius: var(--fh-radius-field); background: var(--fh-canvas); border-left: 3px solid var(--fh-accent); }
.compass-nav { justify-content: space-between; }
.compass-restart { margin-top: 16px; }
.compass .save-status { margin: 12px 0 4px; }
.compass-tally { margin: 20px 0; }
.compass-tally dt { margin-top: 12px; font-weight: 600; overflow-wrap: anywhere; }
.compass-tally dd { display: flex; align-items: center; gap: 12px; margin: 4px 0 0; }
.compass-tally progress { flex: 1; min-width: 0; accent-color: var(--fh-ink); height: 12px; }
.compass summary { cursor: pointer; padding: 8px 0; }
.compass .compass-example { display: block; width: 100%; margin: 8px 0; text-align: left; white-space: normal; background: var(--fh-canvas); color: var(--fh-ink); border-color: var(--fh-line); border-radius: var(--fh-radius-field); overflow-wrap: anywhere; }
.compass-confirm { margin-top: 16px; padding: 16px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); }
.compass-confirm button { margin: 4px 8px 4px 0; }
.compass-print-rule { display: none; }
@media (max-width: 500px) {
  .compass h2 { font-size: 20px; }
  .compass-nav { align-items: stretch; }
  .compass-nav button { flex: 1 1 100%; }
  .compass button { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
}
@media print {
  .compass button, .compass details, .compass textarea, .compass .save-status, .compass .quiz-progress, .compass-confirm { display: none !important; }
  .compass .compass-print-rule { display: block; white-space: pre-wrap; overflow-wrap: anywhere; }
  .compass { color: #000; }
}
`,xe=`// Closed educational content is supplied as plain text by the host.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag,text,parent=root) => {const node=document.createElement(tag); if(text)node.textContent=text; parent.append(node); return node;};
  const button = (text,parent,action) => {const node=el('button',text,parent);node.type='button';node.onclick=action;return node;};
  let context;
  try {context=await FinHealth.init();} catch(error) {el('p',error.message).setAttribute('role','alert');return;}
  const {config}=context;
  let state=context.record?structuredClone(context.record.state):{selected:config.biases[0].id,answers:{}};
  let revision=0;let lastPayload;let confirming=false;
  const tally=()=>{let total=0,correct=0;config.biases.forEach(b=>{const a=state.answers[b.id];if(a?.checked){total++;if(a.choice===b.testQuestions[0].correct)correct++;}});return {total,correct};};
  const payload=()=>{const t=tally();return {state:structuredClone(state),status:t.total===config.biases.length?'completed':Object.keys(state.answers).length?'in_progress':'not_started',outcome:'not_applicable',score:{earned:t.correct,possible:config.biases.length}};};
  el('h3',config.title);el('p',config.introduction);
  const stats=el('p');stats.className='cognitive-stats';stats.setAttribute('role','status');
  const nav=el('nav');nav.className='cognitive-themes';nav.setAttribute('aria-label','Темы тренажёра');
  const panel=el('section');panel.className='cognitive-panel';
  const reset=button('Начать заново',root,()=>{confirming=true;renderConfirm();});reset.className='secondary';
  const confirm=el('div');confirm.hidden=true;
  function renderConfirm(){confirm.replaceChildren();confirm.hidden=!confirming;if(!confirming)return;el('p','Начать заново? Все ответы и результаты проверки будут удалены.',confirm);button('Подтвердить',confirm,()=>{state={selected:config.biases[0].id,answers:{}};confirming=false;renderConfirm();render();persist();reset.focus();});button('Отмена',confirm,()=>{confirming=false;renderConfirm();reset.focus();}).focus();}
  const status=el('p');status.className='visually-hidden';status.setAttribute('role','status');
  const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;
  async function persist(value=payload()) {lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;status.className='visually-hidden';status.setAttribute('role','status');status.textContent='Сохраняем…';try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current===revision)status.textContent='Сохранено до обновления страницы';}catch(error){if(current!==revision)return;status.className='';status.setAttribute('role','alert');status.textContent=\`\${error.message} Ответы на месте.\`;retry.hidden=false;}}
  function refreshStats(){const t=tally();stats.textContent=\`Правильных ответов: \${t.correct} · Всего пройдено: \${t.total} из \${config.biases.length} · Успешность: \${t.total?Math.round(t.correct/t.total*100):0}%\`;}
  function render(focus=false){
    refreshStats();nav.replaceChildren();
    config.biases.forEach(b=>{const item=button(\`\${b.icon}: \${b.name}\`,nav,()=>{state.selected=b.id;render(true);persist();});item.setAttribute('aria-current',String(b.id===state.selected));el('small',b.shortDesc,item);});
    panel.replaceChildren();const b=config.biases.find(b=>b.id===state.selected);const h=el('h4',\`\${b.icon}: \${b.name}\`,panel);h.tabIndex=-1;
    el('h5','Определение',panel);el('p',b.description,panel);el('h5','Как это работает',panel);el('p',b.howItWorks,panel);
    [['Реальные примеры',b.examples],['Как защитить себя',b.tips]].forEach(([title,items])=>{el('h5',title,panel);const ul=el('ul','',panel);items.forEach(v=>el('li',v,ul));});
    el('h5','Проверка понимания',panel);const q=b.testQuestions[0];const field=el('fieldset','',panel);el('legend',q.question,field);const feedback=el('p','',panel);feedback.setAttribute('role','status');
    q.options.forEach((text,i)=>{const label=el('label','',field);const input=el('input','',label);input.type='radio';input.name='cognitive-answer';input.value=String(i);input.checked=state.answers[b.id]?.choice===i;el('span',text,label);input.onchange=()=>{state.answers[b.id]={choice:i,checked:false};showFeedback();refreshStats();persist();};});
    const check=button('Проверить ответ',panel,()=>{const a=state.answers[b.id];if(!a){feedback.textContent='Выберите ответ';feedback.setAttribute('role','alert');return;}a.checked=true;showFeedback();refreshStats();persist();});
    function showFeedback(){const a=state.answers[b.id];check.disabled=!!a?.checked;feedback.textContent='';field.querySelectorAll('label').forEach((label,i)=>{label.classList.toggle('answer-correct',!!a?.checked&&i===q.correct);label.classList.toggle('answer-wrong',!!a?.checked&&i===a.choice&&i!==q.correct);});if(a?.checked){feedback.setAttribute('role','status');feedback.textContent=(a.choice===q.correct?config.feedback.correct:config.feedback.incorrect)+\` Верный ответ: \${q.options[q.correct]}\`;}}
    showFeedback();if(focus)h.focus();resize();
  }
  function resize(){FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);}
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&confirming){confirming=false;renderConfirm();reset.focus();}});
  render();if(context.pending){lastPayload=payload();status.className='';status.setAttribute('role','alert');status.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
  resize();new ResizeObserver(resize).observe(root);
})();
`,Se=`.cognitive-themes { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; margin: 16px 0; }
.cognitive-themes button { text-align: left; min-width: 0; white-space: normal; overflow-wrap: anywhere; }
.cognitive-themes small { display: block; margin-top: 6px; }
.cognitive-themes [aria-current="true"] { background: var(--fh-selected); color: var(--fh-ink); border: 2px solid var(--fh-ink); }
.cognitive-panel { margin: 16px 0; }
.cognitive-panel h4 { font-size: 20px; }
.cognitive-panel h5 { font-size: 16px; margin: 20px 0 8px; }
.cognitive-panel p, .cognitive-panel li { line-height: 1.55; }
.cognitive-panel fieldset { min-width: 0; padding: 12px; border: 1px solid var(--fh-line); }
.cognitive-panel label { display: flex; align-items: start; gap: 10px; padding: 12px 4px; cursor: pointer; }
.cognitive-panel input { flex-shrink: 0; margin-top: 4px; }
.cognitive-stats { font-weight: 600; }
[hidden] { display: none !important; }
@media(max-width:400px) { .cognitive-themes { grid-template-columns: 1fr; } }
.cognitive-panel .answer-correct { color: #25613a; background: #edf6ef; border: 1px solid #79a58a; }
.cognitive-panel .answer-wrong { color: #85372b; background: #fcf0ee; border: 1px solid #ce9990; }
`,Ce=`// Closed educational content is supplied as plain text by the host.
(async()=>{
 const root=document.getElementById('exercise');
 const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};
 const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
 let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
 const {config}=context;
 const shuffle=length=>{const a=Array.from({length},(_,i)=>i);for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const fresh=()=>({screen:'intro',order:shuffle(config.cases.length),optionOrders:config.cases.map(()=>shuffle(config.labels.length)),index:0,answers:{}});
 let state=context.record?structuredClone(context.record.state):fresh();let revision=0;let lastPayload;
 const tally=()=>{let correct=0;const mistakes={},totals={};config.cases.forEach(c=>{totals[c.correct]=(totals[c.correct]||0)+1;mistakes[c.correct]=0;});Object.entries(state.answers).forEach(([key,answer])=>{const c=config.cases[Number(key)];if(config.labels[answer]===c.correct)correct++;else mistakes[c.correct]++;});return {correct,mistakes,totals};};
 const payload=()=>({state:structuredClone(state),status:state.screen==='result'?'completed':state.screen==='cases'?'in_progress':'not_started',outcome:'not_applicable',score:{earned:tally().correct,possible:config.cases.length}});
 el('h3',config.title);const introduction=el('div');config.introduction.forEach(p=>el('p',p,introduction));
 const instructions=el('details');el('summary','Как проходить',instructions);const steps=el('ol','',instructions);config.instructions.forEach(p=>el('li',p,steps));
 const guide=el('details');guide.open=state.screen==='intro';el('summary','Краткая шпаргалка по темпераментам',guide);el('p',config.guideIntroduction,guide);const types=el('div','',guide);types.className='temperament-types';config.types.forEach(t=>{const section=el('section','',types);el('h4',t.label,section);el('p',t.subtitle,section);const ul=el('ul','',section);t.points.forEach(p=>el('li',p,ul));});
 const panel=el('section');panel.className='temperament-panel';
 const confirm=el('div');confirm.hidden=true;
 const reset=button('Пройти заново',root,()=>{confirm.replaceChildren();confirm.hidden=false;el('p','Пройти заново? Ответы и результат будут удалены, порядок кейсов и вариантов изменится.',confirm);button('Подтвердить',confirm,()=>{state=fresh();state.screen='cases';confirm.hidden=true;render(true);persist();});button('Отмена',confirm,()=>{confirm.hidden=true;reset.focus();}).focus();});reset.className='secondary';
 const status=el('p');status.className='visually-hidden';status.setAttribute('role','status');const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;
 async function persist(value=payload()){lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;status.className='visually-hidden';status.setAttribute('role','status');status.textContent='Сохраняем…';try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current===revision)status.textContent='Сохранено до обновления страницы';}catch(error){if(current!==revision)return;status.className='';status.setAttribute('role','alert');status.textContent=\`\${error.message} Ответы на месте.\`;retry.hidden=false;}}
 function render(focus=false){
  panel.replaceChildren();reset.hidden=state.screen==='intro';introduction.hidden=state.screen!=='intro';
  if(state.screen==='intro'){button('Начать кейсы',panel,()=>{state.screen='cases';guide.open=false;render(true);persist();});resize();return;}
  const key=state.order[state.index],c=config.cases[key],answer=state.answers[key];el('p',\`Кейс \${state.index+1} из \${config.cases.length}\`,panel);const title=el('h4',c.title,panel);title.tabIndex=-1;el('p',c.scenario,panel);el('p','На какой тип темперамента это больше всего похоже?',panel);
  const choices=el('div','',panel);choices.className='temperament-choices';choices.setAttribute('role','group');choices.setAttribute('aria-label','Варианты ответа');
  state.optionOrders[key].forEach(i=>{const choice=button(config.labels[i],choices,()=>{if(Object.hasOwn(state.answers,key))return;state.answers[key]=i;if(Object.keys(state.answers).length===config.cases.length)state.screen='result';render(false);persist();panel.querySelector('.temperament-feedback')?.focus();});choice.disabled=answer!==undefined;choice.setAttribute('aria-pressed',String(answer===i));});
  if(answer!==undefined){const feedback=el('div','',panel);feedback.className='temperament-feedback';feedback.tabIndex=-1;feedback.setAttribute('role','status');el('p',answer===config.labels.indexOf(c.correct)?'Ответ верный':'Есть ошибка',feedback);el('p',\`Верный ответ: \${c.correct}\`,feedback);el('h5','Почему',feedback);el('p',c.explanation,feedback);el('h5','Что помогает',feedback);el('p',c.tool,feedback);
   if(state.screen!=='result')button('Следующий кейс',panel,()=>{state.index++;render(true);persist();});
  }
  if(state.screen==='result'){const t=tally();el('h4','Результат тренировки',panel);el('p',\`\${t.correct} / \${config.cases.length}\`,panel);el('p',config.assessment.find(a=>Math.round(t.correct/config.cases.length*100)>=a.minPercent).text,panel);el('h5','Какие типы давались сложнее',panel);const ul=el('ul','',panel);config.labels.forEach(label=>el('li',\`\${label}: \${t.mistakes[label]} ошибок из \${t.totals[label]||0} кейсов\`,ul));config.resultSections.forEach(s=>{el('h5',s.title,panel);const list=el('ul','',panel);s.paragraphs.forEach(p=>el('li',p,list));});el('p',config.resultNote,panel);}
  if(focus)title.focus();resize();
 }
 function resize(){FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);}
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!confirm.hidden){confirm.hidden=true;reset.focus();}});
 render();if(!context.record)persist();else if(context.pending){lastPayload=payload();status.className='';status.setAttribute('role','alert');status.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
 resize();new ResizeObserver(resize).observe(root);
})();
`,we=`.temperament-types { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; }
.temperament-types section { min-width: 0; border: 1px solid var(--fh-line); padding: 12px; border-radius: var(--fh-radius-field); }
.temperament-panel { margin: 20px 0; }
.temperament-panel h4 { font-size: 20px; }
.temperament-panel h5 { font-size: 16px; margin: 20px 0 8px; }
.temperament-panel p, .temperament-panel li, .temperament-types li { line-height: 1.55; }
.temperament-choices { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 8px; }
.temperament-choices button { min-width: 0; white-space: normal; overflow-wrap: anywhere; }
.temperament-choices [aria-pressed="true"] { border: 2px solid var(--fh-ink); background: var(--fh-selected); color: var(--fh-ink); opacity: 1; }
.temperament-feedback { margin: 16px 0; padding: 12px; border: 1px solid var(--fh-line); border-radius: var(--fh-radius-field); }
.temperament-feedback:focus-visible { outline: 3px solid var(--fh-accent); }
[hidden] { display: none !important; }
@media(max-width:400px) { .temperament-types, .temperament-choices { grid-template-columns: 1fr; } }
`,Te=`// Reusable renderer: all learning content arrives through the host configuration.
(async()=>{
  const root=document.getElementById('exercise');
  const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};
  const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
  let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
  const {config}=context;
  el('h3',config.title);config.instructions.forEach(t=>el('p',t));

  const fresh=()=>({answers:Object.fromEntries(config.steps.map(s=>[s.id,''])),checked:[],reflection:''});
  let state=context.record?structuredClone(context.record.state):fresh();
  const numeric=value=>{const normalized=value.trim().replace(',','.');if(!/^\\d+(?:\\.\\d+)?$/.test(normalized))return null;const v=Number(normalized);return Number.isFinite(v)?v:null;};
  const correct=(value,step)=>{const v=numeric(value);return v!==null&&Math.abs(v-step.correct)<=step.tolerance+Number.EPSILON*Math.max(1,Math.abs(v),Math.abs(step.correct))*4;};
  const payload=()=>({state:structuredClone(state),status:config.steps.every(s=>state.checked.includes(s.id))?'completed':state.reflection.trim()||Object.values(state.answers).some(v=>v.trim())?'in_progress':'not_started',outcome:'not_applicable'});
  const scenario=el('section');scenario.className='july-scenario';config.scenario.forEach(t=>el('p',t,scenario));
  const inputs=new Map();const feedbacks=new Map();
  config.steps.forEach((step,index)=>{
    const section=el('section');section.className='july-step';el('h4',\`Шаг \${index+1}\`,section);
    const label=el('label',step.prompt,section);label.htmlFor=step.id;
    const instruction=el('p',step.instruction,section);instruction.id=step.id+'-instruction';
    const row=el('div','',section);row.className='july-input-row';
    const input=el('input','',row);input.id=step.id;input.type='text';input.inputMode='decimal';input.maxLength=100;input.setAttribute('aria-describedby',instruction.id+' '+step.id+'-feedback');inputs.set(step.id,input);
    el('span',step.unit,row);
    const feedback=el('p','',section);feedback.id=step.id+'-feedback';feedback.setAttribute('role','status');feedbacks.set(step.id,feedback);
    button('Проверить',row,()=>{
      if(numeric(input.value)===null){feedback.hidden=false;feedback.textContent='Введите число в поле выше.';input.setAttribute('aria-invalid','true');return;}
      input.removeAttribute('aria-invalid');if(!state.checked.includes(step.id))state.checked.push(step.id);showFeedback(step);persist();
    });
    input.oninput=()=>{state.answers[step.id]=input.value;state.checked=state.checked.filter(id=>id!==step.id);feedback.hidden=true;input.removeAttribute('aria-invalid');persist();};
  });
  function showFeedback(step){const node=feedbacks.get(step.id);node.hidden=!state.checked.includes(step.id);node.textContent=correct(state.answers[step.id],step)?'Верно! '+step.hint:'Не совсем. Попробуйте ещё раз. Подсказка: '+step.hint;}
  const reflection=el('section');reflection.className='july-step';el('h4',config.reflection.title,reflection);el('p',config.reflection.prompt,reflection);
  const label=el('label','Ваш личный пример',reflection);label.htmlFor='cost-reflection';
  const textarea=el('textarea','',reflection);textarea.id='cost-reflection';textarea.rows=4;if(config.reflection.placeholder)textarea.placeholder=config.reflection.placeholder;textarea.maxLength=10000;textarea.oninput=()=>{state.reflection=textarea.value;persist();};
  function restore(){config.steps.forEach(step=>{inputs.get(step.id).value=state.answers[step.id];inputs.get(step.id).removeAttribute('aria-invalid');showFeedback(step);});textarea.value=state.reflection;}

  const saveStatus = el('p'); saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role','status');
  const retry = button('Повторить сохранение',root,()=>persist(lastPayload)); retry.hidden=true;
  let revision=0; let lastPayload;
  async function persist(value=payload()) {
    lastPayload=structuredClone(value); const current=++revision; retry.hidden=true;
    saveStatus.className='save-status visually-hidden'; saveStatus.setAttribute('role','status'); saveStatus.textContent='Сохраняем…';
    try { await (value.status==='completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if(current!==revision)return; saveStatus.textContent='Сохранено до обновления страницы';
    } catch(error) { if(current!==revision)return; saveStatus.className='save-status'; saveStatus.setAttribute('role','alert'); saveStatus.textContent=error.message+' Ответы на месте.'; retry.hidden=false; }
  }
  const clear=button('Очистить ответы',root,()=>{confirmation.hidden=false;cancel.focus();}); clear.className='secondary';
  const confirmation=el('div'); confirmation.className='july-confirm'; confirmation.hidden=true; confirmation.setAttribute('role','group'); confirmation.setAttribute('aria-label','Очистка ответов');
  el('p','Очистить все ответы? Введённые данные будут удалены.',confirmation);
  button('Очистить',confirmation,()=>{state=fresh();restore();confirmation.hidden=true;persist();clear.focus();});
  const cancel=button('Отмена',confirmation,()=>{confirmation.hidden=true;clear.focus();}); cancel.className='secondary';
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!confirmation.hidden)cancel.click();});
  restore();
  if(context.pending){lastPayload=payload();saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
  const resize=()=>FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);resize();new ResizeObserver(resize).observe(root);
})();
`,Ee=`.july-scenario,.july-step { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); overflow-wrap:anywhere; }
.july-step h4 { margin:0 0 12px; font-size:18px; }
.july-step p { white-space:pre-wrap; }
.july-input-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
.july-input-row input { width:120px; min-width:0; height:auto; min-height:var(--fh-control-height); margin:0; padding:8px 12px; border:1px solid var(--fh-secondary); border-radius:var(--fh-radius-field); font:inherit; color:inherit; background:var(--fh-surface); }
.july-step textarea { width:100%; box-sizing:border-box; }
.july-step fieldset { min-width:0; margin:12px 0; padding:8px; border:1px solid var(--fh-line); }
.july-step legend { padding:0 4px; }
.july-choice { display:flex; align-items:flex-start; gap:8px; padding:8px 0; cursor:pointer; }
.july-choice input { flex-shrink:0; margin:3px 0 0; }
.july-step select { width:100%; max-width:300px; }
.july-answer { margin:12px 0; padding:12px; border-left:3px solid var(--fh-accent); background:var(--fh-selected); }
.july-confirm { margin:12px 0; padding:12px; border:1px solid var(--fh-line); }
.july-confirm button { margin:0 8px 4px 0; }
[hidden] { display:none!important; }
@media(max-width:400px){.july-step,.july-scenario {padding:10px;}.july-choice{padding:10px 0;}}
`,De=`// Reusable renderer: all learning content arrives through the host configuration.
(async()=>{
  const root=document.getElementById('exercise');
  const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};
  const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
  let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
  const {config}=context;
  el('h3',config.title);config.instructions.forEach(t=>el('p',t));

  const fresh=()=>({answers:Object.fromEntries(config.exercises.map(e=>[e.id,Object.fromEntries(e.rows.map(r=>[r.id,[]]))])),revealed:[]});
  let state=context.record?structuredClone(context.record.state):fresh();
  const expanded=new Set(state.revealed);
  const payload=()=>({state:structuredClone(state),status:config.exercises.every(e=>state.revealed.includes(e.id)&&e.rows.every(r=>state.answers[e.id][r.id].length))?'completed':state.revealed.length||Object.values(state.answers).some(rows=>Object.values(rows).some(v=>v.length))?'in_progress':'not_started',outcome:'not_applicable'});
  const controls=[];const reveals=[];
  config.exercises.forEach((exercise,index)=>{
    const section=el('section');section.className='july-step';el('h4',\`\${index+1}. \${exercise.title}\`,section);el('p',exercise.skill,section);exercise.context.forEach(t=>el('p',t,section));if(!exercise.rows.some(row=>row.text===exercise.prompt))el('p',exercise.prompt,section);
    exercise.rows.forEach(row=>{
      const field=el('fieldset','',section);el('legend',row.text,field);
      if(exercise.kind==='select'){
        const select=el('select','',field);select.setAttribute('aria-label',row.text);el('option','—',select).value='';
        row.options.forEach(o=>el('option',o.label,select).value=o.value);
        select.onchange=()=>{state.answers[exercise.id][row.id]=select.value?[select.value]:[];persist();};controls.push({exercise,row,select});
      }else{
        row.options.forEach(option=>{
          const label=el('label','',field);label.className='july-choice';const input=el('input','',label);input.type=exercise.kind==='multiple'?'checkbox':'radio';input.name=exercise.id+'-'+row.id;input.value=option.value;el('span',option.label,label);
          input.onchange=()=>{let values=state.answers[exercise.id][row.id];state.answers[exercise.id][row.id]=exercise.kind==='multiple'?(input.checked?[...values.filter(v=>v!==option.value),option.value]:values.filter(v=>v!==option.value)):[option.value];persist();};controls.push({exercise,row,option,input});
        });
      }
    });
    const reveal=button('Проверить ответ',section,()=>{
      if(expanded.has(exercise.id)){expanded.delete(exercise.id);refreshReveal();return;}
      expanded.add(exercise.id);if(!state.revealed.includes(exercise.id))state.revealed.push(exercise.id);refreshReveal();persist();
    });
    const answer=el('div','',section);answer.id=exercise.id+'-answer';answer.className='july-answer';answer.hidden=true;exercise.answer.forEach(t=>el('p',t,answer));reveal.setAttribute('aria-controls',answer.id);reveals.push({exercise,reveal,answer});
    if(exercise.note)el('p',exercise.note,section);
  });
  function refreshReveal(){reveals.forEach(({exercise,reveal,answer})=>{const open=expanded.has(exercise.id);answer.hidden=!open;reveal.textContent=open?'Скрыть ответ':'Проверить ответ';reveal.setAttribute('aria-expanded',String(open));});}
  function restore(){controls.forEach(({exercise,row,select,option,input})=>{const values=state.answers[exercise.id][row.id];if(select)select.value=values[0]||'';else input.checked=values.includes(option.value);});refreshReveal();}

  const saveStatus = el('p'); saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role','status');
  const retry = button('Повторить сохранение',root,()=>persist(lastPayload)); retry.hidden=true;
  let revision=0; let lastPayload;
  async function persist(value=payload()) {
    lastPayload=structuredClone(value); const current=++revision; retry.hidden=true;
    saveStatus.className='save-status visually-hidden'; saveStatus.setAttribute('role','status'); saveStatus.textContent='Сохраняем…';
    try { await (value.status==='completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if(current!==revision)return; saveStatus.textContent='Сохранено до обновления страницы';
    } catch(error) { if(current!==revision)return; saveStatus.className='save-status'; saveStatus.setAttribute('role','alert'); saveStatus.textContent=error.message+' Ответы на месте.'; retry.hidden=false; }
  }
  const clear=button('Очистить ответы',root,()=>{confirmation.hidden=false;cancel.focus();}); clear.className='secondary';
  const confirmation=el('div'); confirmation.className='july-confirm'; confirmation.hidden=true; confirmation.setAttribute('role','group'); confirmation.setAttribute('aria-label','Очистка ответов');
  el('p','Очистить все ответы? Введённые данные будут удалены.',confirmation);
  button('Очистить',confirmation,()=>{state=fresh();expanded.clear();restore();confirmation.hidden=true;persist();clear.focus();});
  const cancel=button('Отмена',confirmation,()=>{confirmation.hidden=true;clear.focus();}); cancel.className='secondary';
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!confirmation.hidden)cancel.click();});
  restore();
  if(context.pending){lastPayload=payload();saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
  const resize=()=>FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);resize();new ResizeObserver(resize).observe(root);
})();
`,Oe=`.july-scenario,.july-step { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); overflow-wrap:anywhere; }
.july-step h4 { margin:0 0 12px; font-size:18px; }
.july-step p { white-space:pre-wrap; }
.july-input-row { display:flex; flex-wrap:wrap; align-items:center; gap:8px; }
.july-input-row input { width:100px; min-width:0; }
.july-step textarea { width:100%; box-sizing:border-box; }
.july-step fieldset { min-width:0; margin:12px 0; padding:8px; border:1px solid var(--fh-line); }
.july-step legend { padding:0 4px; }
.july-choice { display:flex; align-items:flex-start; gap:8px; padding:8px 0; cursor:pointer; }
.july-choice input { flex-shrink:0; margin:3px 0 0; }
.july-step select { width:100%; max-width:300px; min-height:var(--fh-control-height); padding:8px; border:1px solid var(--fh-secondary); border-radius:var(--fh-radius-field); font:inherit; color:inherit; background:var(--fh-surface); }
.july-answer { margin:12px 0; padding:12px; border-left:3px solid var(--fh-accent); background:var(--fh-selected); }
.july-confirm { margin:12px 0; padding:12px; border:1px solid var(--fh-line); }
.july-confirm button { margin:0 8px 4px 0; }
[hidden] { display:none!important; }
@media(max-width:400px){.july-step,.july-scenario {padding:10px;}.july-choice{padding:10px 0;}}
`,ke=`// Learning content is supplied separately by the host.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const n = document.createElement(tag); if (text) n.textContent = text; parent.append(n); return n; };
  const button = (text, parent, action) => { const n = el('button', text, parent); n.type = 'button'; n.onclick = action; return n; };
  let context; try { context = await FinHealth.init(); } catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config } = context;
  config.instructions.forEach(t => el('p', t));
  const fresh = () => ({ days: Array.from({ length: 7 }, () => Array.from({ length: 3 }, () => ({ text: '', kind: '' }))), done: false });
  let state = context.record ? structuredClone(context.record.state) : fresh();
  const stats = () => { const entries = state.days.flat().filter(e => e.text.trim() && e.kind); const t = entries.filter(e => e.kind === 't').length; return { labelled: entries.length, t, percent: entries.length === 21 ? Math.round(t / 21 * 1000) / 10 : null }; };
  const payload = () => { const s = stats(); return { state: structuredClone(state), status: state.done ? 'completed' : state.days.flat().some(e => e.text.trim() || e.kind) ? 'in_progress' : 'not_started', outcome: 'not_applicable', ...(state.done ? { summary: \`Доля записей Т: \${String(s.percent).replace('.', ',')}% (\${s.t} из 21).\` } : {}) }; };
  const fields = [];
  state.days.forEach((day, d) => {
    const section = el('section'); section.className = 'diary-day'; el('h4', \`День \${d + 1}\`, section);
    day.forEach((entry, i) => {
      const row = el('div', '', section); row.className = 'diary-entry'; const id = \`diary-\${d}-\${i}\`;
      const label = el('label', \`Запись \${i + 1}\`, row); label.htmlFor = id;
      const input = el('textarea', '', row); input.id = id; input.maxLength = 1000; input.rows = 2;
      const selectLabel = el('label', 'Отметка', row); selectLabel.htmlFor = id + '-kind';
      const select = el('select', '', row); select.id = id + '-kind';
      for (const [value, title] of [['', 'Выберите Т или П'], ['t', config.marks.t], ['p', config.marks.p]]) { const option = el('option', title, select); option.value = value; }
      const change = () => { state.days[d][i] = { text: input.value, kind: select.value }; state.done = false; renderResult(); persist(); };
      input.oninput = change; select.onchange = change; fields.push({ input, select, d, i });
    });
  });
  const result = el('section'); result.className = 'diary-result';
  el('h4', 'Итог недели', result);
  const progress = el('p', '', result); progress.setAttribute('role', 'status');
  const percent = el('p', '', result);
  el('p', config.calculationNote, result); el('p', config.calculationExample, result);
  const finish = button('Завершить дневник', root, () => { if (stats().labelled !== 21) return; state.done = true; renderResult(); persist(); });
  function renderResult() {
    const s = stats(); progress.textContent = \`Заполнено и отмечено: \${s.labelled} из 21\`;
    percent.hidden = s.percent === null; percent.textContent = s.percent === null ? '' : \`Доля записей Т: \${String(s.percent).replace('.', ',')}% · \${s.t} ÷ 21 × 100\`;
    finish.disabled = s.labelled !== 21 || state.done; finish.textContent = state.done ? 'Дневник завершён' : 'Завершить дневник';
  }
  function restore() { fields.forEach(({ input, select, d, i }) => { input.value = state.days[d][i].text; select.value = state.days[d][i].kind; }); renderResult(); }
  const saveStatus = el('p'); saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role', 'status');
  const retry = button('Повторить сохранение', root, () => persist(lastPayload)); retry.hidden = true;
  let revision = 0; let lastPayload;
  async function persist(value = payload()) {
    lastPayload = structuredClone(value); const current = ++revision; retry.hidden = true;
    saveStatus.className = 'save-status visually-hidden'; saveStatus.setAttribute('role', 'status'); saveStatus.textContent = 'Сохраняем…';
    try { const saved = await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value)); if (current !== revision) return; saveStatus.textContent = saved.storage === 'browser' ? 'Сохранено в этом браузере' : 'Сохранено до обновления страницы'; }
    catch (error) { if (current !== revision) return; saveStatus.className = 'save-status'; saveStatus.setAttribute('role', 'alert'); saveStatus.textContent = error.message + ' Записи на месте.'; retry.hidden = false; }
  }
  const clear = button('Очистить дневник', root, () => { confirmation.hidden = false; cancel.focus(); }); clear.className = 'secondary';
  const confirmation = el('div'); confirmation.className = 'diary-confirm'; confirmation.hidden = true; confirmation.setAttribute('role', 'group'); confirmation.setAttribute('aria-label', 'Очистка дневника');
  el('p', 'Очистить дневник? Все записи и отметки будут удалены.', confirmation);
  button('Очистить', confirmation, () => { state = fresh(); restore(); confirmation.hidden = true; persist(); clear.focus(); });
  const cancel = button('Отмена', confirmation, () => { confirmation.hidden = true; clear.focus(); }); cancel.className = 'secondary';
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !confirmation.hidden) cancel.click(); });
  restore();
  if (context.pending) { lastPayload = payload(); saveStatus.className = 'save-status'; saveStatus.setAttribute('role', 'alert'); saveStatus.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; retry.hidden = false; }
  const resize = () => FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2); resize(); new ResizeObserver(resize).observe(root);
})();
`,Ae=`.diary-day { margin:12px 0; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); padding:14px; min-width:0; }
.diary-day h4 { margin:0 0 12px; font-size:18px; }
.diary-entry { margin:0 0 14px; }
.diary-entry:last-child { margin-bottom:0; }
.diary-entry textarea { min-height:72px; margin-bottom:8px; }
.diary-entry select { width:100%; min-height:var(--fh-control-height); border:1px solid var(--fh-secondary); border-radius:var(--fh-radius-field); background:var(--fh-surface); color:inherit; padding:8px; font:inherit; }
.diary-result { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); }
.diary-result h4 { margin:0 0 8px; }
.diary-confirm { margin:12px 0; padding:12px; border:1px solid var(--fh-line); }
.diary-confirm button { margin:0 8px 4px 0; }
@media(max-width:400px){.diary-day,.diary-result{padding:10px;}}
`,je=`// Content belongs to the host config; this module only renders and saves a session attempt.
(async()=>{
  const root=document.getElementById('exercise');
  const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};
  const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
  let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
  const {config}=context;
  const fresh=()=>({answers:config.statements.map(()=>null),dominant:null,metaphor:null,selectedExercise:null,responses:Object.fromEntries(config.exercises.map(e=>[e.id,Object.fromEntries(e.fields.map(f=>[f.id,'']))])),reflection:Object.fromEntries(config.reflection.map(f=>[f.id,''])),done:false});
  let state=context.record?structuredClone(context.record.state):fresh();
  const result=()=>{
    if(state.answers.some(a=>a===null))return null;
    const total=state.answers.reduce((sum,a)=>sum+a,0);const highest=Math.max(...state.answers);
    return {total,range:config.ranges.find(r=>total>=r.min&&total<=r.max),candidates:config.statements.filter((_,i)=>state.answers[i]===highest).map(s=>s.id)};
  };
  const ready=()=>{const r=result();const e=config.exercises.find(e=>e.id===state.selectedExercise);return !!r&&r.candidates.includes(state.dominant)&&!!e&&e.fields.every(f=>state.responses[e.id][f.id].trim().length);};
  const payload=()=>({state:structuredClone(state),status:state.done?'completed':state.answers.some(a=>a!==null)||state.metaphor!==null||state.selectedExercise!==null||Object.values(state.responses).some(rows=>Object.values(rows).some(Boolean))||Object.values(state.reflection).some(Boolean)?'in_progress':'not_started',outcome:'not_applicable'});
  config.instructions.forEach(t=>el('p',t));
  const controls=[];config.statements.forEach((s,index)=>{
    const field=el('fieldset');field.className='code-card';el('legend',\`\${index+1}. \${s.text}\`,field);
    config.options.forEach(o=>{
      const label=el('label','',field);label.className='code-choice';const input=el('input','',label);input.type='radio';input.name=s.id;input.value=String(o.value);el('span',o.label,label);
      input.onchange=()=>{state.answers[index]=o.value;state.done=false;const r=result();state.dominant=r?(r.candidates.length===1?r.candidates[0]:r.candidates.includes(state.dominant)?state.dominant:null):null;refresh();persist();};controls.push({input,index,value:o.value});
    });
  });
  const diagnostic=el('section');diagnostic.className='code-card';el('h4','Результат диагностики',diagnostic);
  const total=el('p','',diagnostic);total.setAttribute('role','status');
  const dominantText=el('p','',diagnostic);
  const ties=el('fieldset','',diagnostic);el('legend',config.tieInstruction,ties);const tieControls=[];
  config.statements.forEach(s=>{const label=el('label','',ties);label.className='code-choice';const input=el('input','',label);input.type='radio';input.name='dominant';input.value=s.id;el('span',s.dominant,label);input.onchange=()=>{state.dominant=s.id;edited();};tieControls.push({id:s.id,label,input});});
  const metaphor=el('details');el('summary',config.metaphor.prompt,metaphor);const metaphorControls=[];
  config.metaphor.options.forEach(o=>{const label=el('label','',metaphor);label.className='code-choice';const input=el('input','',label);input.type='radio';input.name='metaphor';input.value=o.id;el('span',o.label,label);input.onchange=()=>{state.metaphor=o.id;edited();};metaphorControls.push(input);});
  const selection=el('fieldset');selection.className='code-card';el('legend','Выберите одно упражнение',selection);
  const exerciseControls=[];const panels=[];const areas=[];
  const textarea=(field,parent,get,set)=>{const label=el('label','',parent);label.className='code-field';el('span',field.label,label);const area=el('textarea','',label);area.rows=3;area.maxLength=2000;area.oninput=()=>{set(area.value);edited();};areas.push({area,get});};
  config.exercises.forEach(e=>{
    const label=el('label','',selection);label.className='code-choice';const input=el('input','',label);input.type='radio';input.name='exercise';input.value=e.id;el('span',e.title,label);input.onchange=()=>{state.selectedExercise=e.id;edited();};exerciseControls.push(input);
    const panel=el('section');panel.className='code-card';el('h4',e.title,panel);e.instructions.forEach(t=>el('p',t,panel));const fields=el('div','',panel);fields.className=e.layout==='columns'?'code-columns':'';e.fields.forEach(f=>textarea(f,fields,()=>state.responses[e.id][f.id],v=>state.responses[e.id][f.id]=v));panels.push({id:e.id,panel});
  });
  const reflection=el('details');el('summary','Подводим итоги',reflection);config.reflection.forEach(f=>textarea(f,reflection,()=>state.reflection[f.id],v=>state.reflection[f.id]=v));
  const completion=el('p');completion.setAttribute('role','status');
  const complete=button('Завершить упражнение',root,()=>{if(!ready()){completion.textContent='Ответьте на пять утверждений, выберите доминанту и заполните выбранное упражнение.';return;}state.done=true;refresh();persist();});
  const saveStatus=el('p');saveStatus.className='save-status visually-hidden';saveStatus.setAttribute('role','status');
  const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;
  let lastPayload;let revision=0;
  async function persist(value=payload()){
    lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;saveStatus.className='save-status visually-hidden';saveStatus.setAttribute('role','status');saveStatus.textContent='Сохраняем…';
    try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current!==revision)return;saveStatus.textContent='Сохранено до обновления страницы';}
    catch(error){if(current!==revision)return;saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent=error.message+' Ответы на месте.';retry.hidden=false;}
  }
  function edited(){state.done=false;refresh();persist();}
  function refresh(){
    controls.forEach(({input,index,value})=>input.checked=state.answers[index]===value);
    const r=result();total.textContent=r?\`\${r.total} / 10 · \${r.range.label}\`:'Ответьте на все пять утверждений';
    ties.hidden=!r||r.candidates.length===1;tieControls.forEach(({id,label,input})=>{label.hidden=!r?.candidates.includes(id);input.checked=state.dominant===id;});
    dominantText.hidden=!state.dominant;dominantText.textContent=state.dominant?'Ведущая доминанта: '+config.statements.find(s=>s.id===state.dominant).dominant:'';
    metaphorControls.forEach(input=>input.checked=state.metaphor===input.value);exerciseControls.forEach(input=>input.checked=state.selectedExercise===input.value);panels.forEach(({id,panel})=>panel.hidden=id!==state.selectedExercise);
    completion.textContent=state.done?'Упражнение выполнено':'';complete.disabled=state.done;
  }
  const clear=button('Очистить ответы',root,()=>{confirmation.hidden=false;cancel.focus();});clear.className='secondary';
  const confirmation=el('div');confirmation.className='code-card';confirmation.hidden=true;confirmation.setAttribute('role','group');confirmation.setAttribute('aria-label','Очистка ответов');el('p','Очистить все ответы? Введённые данные будут удалены.',confirmation);
  button('Очистить',confirmation,()=>{state=fresh();areas.forEach(({area,get})=>area.value=get());refresh();confirmation.hidden=true;persist();clear.focus();});
  const cancel=button('Отмена',confirmation,()=>{confirmation.hidden=true;clear.focus();});cancel.className='secondary';document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!confirmation.hidden)cancel.click();});
  areas.forEach(({area,get})=>area.value=get());refresh();
  if(context.pending){lastPayload=payload();saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
  const resize=()=>FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);resize();new ResizeObserver(resize).observe(root);
})();
`,Me=`.code-card { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); min-width:0; overflow-wrap:anywhere; }
.code-card legend { padding:0 4px; max-width:100%; }
.code-card h4 { margin:0 0 12px; font-size:18px; }
.code-choice { display:flex; align-items:flex-start; gap:8px; padding:9px 0; cursor:pointer; }
.code-choice input { flex-shrink:0; margin:3px 0 0; }
.code-field { display:block; margin:12px 0; }
.code-field span { display:block; margin-bottom:6px; }
.code-field textarea { width:100%; box-sizing:border-box; min-width:0; }
#exercise p { white-space:pre-wrap; overflow-wrap:anywhere; }
#exercise details { margin:16px 0; }
#exercise summary { cursor:pointer; overflow-wrap:anywhere; }
.code-card button { margin:0 8px 4px 0; }
[hidden] { display:none!important; }
@media(max-width:400px){.code-card{padding:10px;}}
.code-columns { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
@media(max-width:600px){.code-columns{grid-template-columns:minmax(0,1fr);}}
`,Ne=`// Case content and assessment thresholds are supplied by the host.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const n = document.createElement(tag); if (text) n.textContent = text; parent.append(n); return n; };
  const button = (text, parent, action) => { const n = el('button', text, parent); n.type = 'button'; n.onclick = action; return n; };
  let context; try { context = await FinHealth.init(); } catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config } = context;
  const fresh = () => ({ screen: 'question', index: 0, answers: config.cases.map(() => null) });
  let state = context.record ? structuredClone(context.record.state) : fresh();
  const result = () => { const earned = state.answers.reduce((sum, answer, i) => sum + Number(answer === config.cases[i].correct), 0); const tier = config.result.thresholds.findIndex(max => earned <= max); return { earned, possible: config.cases.length, percent: Math.round(earned / config.cases.length * 100), tier: tier === -1 ? config.result.thresholds.length : tier }; };
  const payload = () => { const r = result(); return { state: structuredClone(state), status: state.screen === 'result' ? 'completed' : state.answers.some(a => a !== null) ? 'in_progress' : 'not_started', outcome: 'not_applicable', score: { earned: r.earned, possible: r.possible }, ...(state.screen === 'result' ? { summary: \`\${r.earned} / \${r.possible} (\${r.percent}%)\` } : {}) }; };
  config.instructions.forEach(t => el('p', t));
  const panel = el('section'); panel.className = 'case-panel';
  const reset = button('Пройти заново', root, () => { confirmation.hidden = false; cancel.focus(); }); reset.className = 'secondary';
  const confirmation = el('div'); confirmation.className = 'case-confirm'; confirmation.hidden = true; confirmation.setAttribute('role', 'group'); confirmation.setAttribute('aria-label', 'Повтор кейсов');
  el('p', 'Пройти заново? Ответы и результат будут удалены.', confirmation);
  button('Подтвердить', confirmation, () => { state = fresh(); confirmation.hidden = true; render(true); persist(); });
  const cancel = button('Отмена', confirmation, () => { confirmation.hidden = true; reset.focus(); }); cancel.className = 'secondary';
  const status = el('p'); status.className = 'visually-hidden'; status.setAttribute('role', 'status');
  const retry = button('Повторить сохранение', root, () => persist(lastPayload)); retry.hidden = true;
  let revision = 0; let lastPayload;
  async function persist(value = payload()) {
    lastPayload = structuredClone(value); const current = ++revision; retry.hidden = true; status.className = 'visually-hidden'; status.setAttribute('role', 'status'); status.textContent = 'Сохраняем…';
    try { await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value)); if (current === revision) status.textContent = 'Сохранено до обновления страницы'; }
    catch (error) { if (current !== revision) return; status.className = ''; status.setAttribute('role', 'alert'); status.textContent = error.message + ' Ответы на месте.'; retry.hidden = false; }
  }
  function render(focus = false) {
    panel.replaceChildren();
    reset.hidden = !state.answers.some(a => a !== null);
    if (state.screen === 'result') {
      const r = result(); const heading = el('h4', 'Результат', panel); heading.tabIndex = -1;
      el('p', \`\${r.earned} / \${r.possible} (\${r.percent}%)\`, panel); el('h5', config.result.titles[r.tier], panel); el('p', config.result.descriptions[r.tier], panel); el('p', config.resultNote, panel);
      if (focus) heading.focus(); resize(); return;
    }
    const c = config.cases[state.index]; const answer = state.answers[state.index];
    const heading = el('h4', c.title, panel); heading.tabIndex = -1; el('p', c.scenario, panel);
    const choices = el('div', '', panel); choices.className = 'case-choices'; choices.setAttribute('role', 'group'); choices.setAttribute('aria-label', 'Варианты ответа');
    c.options.forEach((option, i) => {
      const choice = button(option, choices, () => { if (state.answers[state.index] !== null) return; state.answers[state.index] = i; render(); persist(); panel.querySelector('.case-feedback')?.focus(); });
      choice.className = 'case-choice'; choice.disabled = answer !== null; choice.setAttribute('aria-pressed', String(answer === i));
      if (answer !== null && i === c.correct) choice.className += ' is-correct'; else if (answer === i) choice.className += ' is-wrong';
    });
    if (answer !== null) {
      const feedback = el('div', '', panel); feedback.className = 'case-feedback'; feedback.tabIndex = -1; feedback.setAttribute('role', 'status');
      el('p', answer === c.correct ? 'Ответ верный' : 'Есть ошибка', feedback); el('p', \`Верный ответ: \${c.options[c.correct]}\`, feedback); el('p', c.explanation, feedback);
      button(state.index === config.cases.length - 1 ? 'Показать результат' : 'Далее', panel, () => { if (state.index === config.cases.length - 1) state.screen = 'result'; else state.index++; render(true); persist(); });
    }
    if (focus) heading.focus(); resize();
  }
  function resize() { FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2); }
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !confirmation.hidden) cancel.click(); });
  render();
  if (context.pending) { lastPayload = payload(); status.className = ''; status.setAttribute('role', 'alert'); status.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; retry.hidden = false; }
  resize(); new ResizeObserver(resize).observe(root);
})();
`,Pe=`.case-panel { padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); margin:12px 0; overflow-wrap:anywhere; }
.case-panel h4 { margin:0 0 12px; font-size:18px; }
.case-choices { display:grid; gap:8px; margin:12px 0; }
.case-choice { text-align:left; color:var(--fh-ink); background:var(--fh-surface); border-color:var(--fh-line); border-radius:var(--fh-radius-field); font-weight:400; }
.case-choice:hover { background:var(--fh-hover); }
.case-choice:disabled { cursor:default; opacity:1; }
.case-choice.is-correct { border-color:#79a58a; background:#edf6ef; color:#25613a; }
.case-choice.is-wrong { border-color:#ce9990; background:#fcf0ee; color:#85372b; }
.case-feedback { margin:14px 0; padding:12px; border-left:3px solid var(--fh-accent); background:var(--fh-selected); }
.case-confirm { padding:12px; border:1px solid var(--fh-line); margin:12px 0; }
.case-confirm button { margin:0 8px 4px 0; }
@media(max-width:400px){.case-panel{padding:10px;}}
`,Fe=`(async()=>{
 const root=document.getElementById('exercise');const el=(tag,text,parent=root)=>{const n=document.createElement(tag);if(text)n.textContent=text;parent.append(n);return n;};const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
 let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
 const {config}=context;const fresh=()=>({step:0,recognition:Array.from({length:5},()=>({choice:null,checked:false})),decisions:Array.from({length:3},()=>({choice:null,checked:false})),reflection:{good:'',bad:'',trigger:null,alternative:'',checked:false},rule:{selected:null,custom:'',confirmed:false},done:false});let state=context.record?structuredClone(context.record.state):fresh();
 const tally=()=>{const quiz=(a,qs)=>a.reduce((sum,v,i)=>sum+(v.checked&&v.choice!==null?qs[i].options[v.choice].points:0),0);const blocks=[quiz(state.recognition,config.recognition),quiz(state.decisions,config.decisions),state.reflection.checked?(state.reflection.alternative.trim().length>20?2:1):0,state.rule.confirmed?2:0];return {blocks,total:blocks.reduce((s,n)=>s+n,0)};};
 const ready=()=>state.recognition.every(a=>a.checked)&&state.decisions.every(a=>a.checked)&&state.reflection.checked&&state.rule.confirmed;
 const payload=()=>({state:structuredClone(state),status:state.done?'completed':state.recognition.some(a=>a.choice!==null)||state.decisions.some(a=>a.choice!==null)||Object.values(state.reflection).some(v=>typeof v==='string'?v.length:v!==null&&v!==false)||state.rule.selected!==null||state.rule.custom.length?'in_progress':'not_started',outcome:'not_applicable',score:{earned:tally().total,possible:15}});
 el('p',config.introduction);
 const progress=el('p');progress.setAttribute('role','status');const panels=Array.from({length:5},()=>{const n=el('section');n.className='market-block';return n;});const questions=[];
 function changed(){state.done=false;if(state.step===4)state.step=0;refresh();persist();}
 function step(n){state.step=n;refresh();persist();panels[n].querySelector?.('h4')?.focus();}
 for(const [key,block] of [['recognition',0],['decisions',1]]){
  const panel=panels[block];const heading=el('h4',config.quizBlocks[block].title,panel);heading.tabIndex=-1;el('p',config.quizBlocks[block].introduction,panel);
  config[key].forEach((q,i)=>{
   const section=el('section','',panel);section.className='market-card';el('p',q.scene,section);const field=el('fieldset','',section);el('legend',\`\${i+1}. \${q.question}\`,field);const inputs=[];
   q.options.forEach((o,index)=>{const label=el('label','',field);label.className='market-choice';const input=el('input','',label);input.type='radio';input.name=\`\${key}-\${i}\`;input.value=String(index);el('span',o.label,label);input.onchange=()=>{state[key][i]={choice:index,checked:false};changed();};inputs.push(input);});
   const feedback=el('div','',section);feedback.setAttribute('role','status');feedback.className='market-feedback';const title=el('strong','',feedback);const text=el('p','',feedback);const error=el('p','',section);error.setAttribute('role','alert');
   const check=button('Проверить ответ',section,()=>{if(state[key][i].choice===null){error.textContent='Выберите ответ.';return;}error.textContent='';state[key][i].checked=true;changed();});
   const edit=button('Изменить ответ',section,()=>{state[key][i].checked=false;changed();inputs[state[key][i].choice??0].focus();});edit.className='secondary';questions.push({key,i,section,inputs,feedback,title,text,check,edit});
  });
 }
 const r=config.reflection;el('h4',r.title,panels[2]).tabIndex=-1;el('p',r.introduction,panels[2]);const hint=el('details','',panels[2]);el('summary','Где найти историю покупок',hint);el('p',r.hint,hint);
 const areas=[];const textarea=(labelText,parent,get,set,placeholder)=>{const label=el('label','',parent);label.className='market-field';el('span',labelText,label);const area=el('textarea','',label);area.rows=3;area.maxLength=2000;if(placeholder)area.placeholder=placeholder;area.oninput=()=>{set(area.value);changed();};areas.push({area,get});return area;};
 textarea(r.goodLabel,panels[2],()=>state.reflection.good,v=>{state.reflection.good=v;state.reflection.checked=false;},r.placeholder);textarea(r.badLabel,panels[2],()=>state.reflection.bad,v=>{state.reflection.bad=v;state.reflection.checked=false;},r.placeholder);
 const triggerLabel=el('label','',panels[2]);triggerLabel.className='market-field';el('span',r.triggerLabel,triggerLabel);const trigger=el('select','',triggerLabel);el('option','—',trigger).value='';r.triggers.forEach((t,i)=>el('option',t,trigger).value=String(i));trigger.onchange=()=>{state.reflection.trigger=trigger.value===''?null:Number(trigger.value);state.reflection.checked=false;changed();};textarea(r.alternativeLabel,panels[2],()=>state.reflection.alternative,v=>{state.reflection.alternative=v;state.reflection.checked=false;});
 const reflectionFeedback=el('div','',panels[2]);reflectionFeedback.setAttribute('role','status');reflectionFeedback.className='market-feedback';const reflectionTitle=el('strong','',reflectionFeedback);const reflectionText=el('p','',reflectionFeedback);const reflectionError=el('p','',panels[2]);reflectionError.setAttribute('role','alert');
 button('Завершить разбор',panels[2],()=>{if(!state.reflection.good.trim()&&!state.reflection.bad.trim()){reflectionError.textContent='Укажите хотя бы одну покупку для анализа.';return;}reflectionError.textContent='';state.reflection.checked=true;changed();});
 const rule=config.rule;el('h4',rule.title,panels[3]).tabIndex=-1;el('p',rule.introduction,panels[3]);const ruleField=el('fieldset','',panels[3]);el('legend',rule.question,ruleField);const ruleControls=[];
 rule.options.forEach(o=>{const label=el('label','',ruleField);label.className='market-choice';const input=el('input','',label);input.type='radio';input.name='rule';input.value=o.id;const content=el('span','',label);el('strong',o.title,content);el('span',o.text,content).className='market-rule-text';input.onchange=()=>{state.rule.selected=o.id;state.rule.confirmed=false;changed();};ruleControls.push(input);});
 const customWrap=el('div','',panels[3]);textarea(rule.customLabel,customWrap,()=>state.rule.custom,v=>{state.rule.custom=v;state.rule.confirmed=false;});const ruleError=el('p','',panels[3]);ruleError.setAttribute('role','alert');const confirm=button('Зафиксировать моё правило',panels[3],()=>{const selected=rule.options.find(o=>o.id===state.rule.selected);if(!selected||selected.custom&&!state.rule.custom.trim()){ruleError.textContent=selected?'Пожалуйста, напишите своё правило.':'Выберите правило.';return;}ruleError.textContent='';state.rule.confirmed=true;changed();});
 const nexts=[];for(let i=0;i<4;i++){const nav=el('div','',panels[i]);nav.className='market-nav';if(i)button('Назад',nav,()=>step(i-1)).className='secondary';const next=button(i===3?'Мой результат':'Продолжить',nav,()=>{if(i===3){if(!ready())return;state.done=true;state.step=4;refresh();resultTitle.focus();persist();}else step(i+1);});nexts.push(next);}
 const resultTitle=el('h4','',panels[4]);resultTitle.tabIndex=-1;const resultText=el('p','',panels[4]);const score=el('p','',panels[4]);const blockScores=el('ul','',panels[4]);const scores=Array.from({length:4},()=>el('li','',blockScores));const ruleText=el('p','',panels[4]);const tips=el('details','',panels[4]);el('summary','На следующую распродажу',tips);const list=el('ul','',tips);config.tips.forEach(t=>el('li',t,list));button('Вернуться к ответам',panels[4],()=>step(0)).className='secondary';
 const saveStatus=el('p');saveStatus.className='save-status visually-hidden';saveStatus.setAttribute('role','status');const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;let lastPayload;let revision=0;
 async function persist(value=payload()){lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;saveStatus.className='save-status visually-hidden';saveStatus.setAttribute('role','status');saveStatus.textContent='Сохраняем…';try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current!==revision)return;saveStatus.textContent='Сохранено до обновления страницы';}catch(error){if(current!==revision)return;saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent=error.message+' Ответы на месте.';retry.hidden=false;}}
 function refresh(){
  const t=tally();progress.textContent=\`\${state.step===4?'Завершено':\`Блок \${state.step+1} из 4\`} · \${t.total} / 15\`;panels.forEach((p,i)=>p.hidden=state.step!==i);
  questions.forEach(q=>{const a=state[q.key][q.i];q.section.hidden=q.i>0&&!state[q.key][q.i-1].checked;q.inputs.forEach((input,i)=>{input.checked=a.choice===i;input.disabled=a.checked;});q.feedback.hidden=!a.checked;q.check.hidden=a.checked;q.edit.hidden=!a.checked;if(a.checked){const f=config[q.key][q.i].options[a.choice].feedback;q.feedback.dataset.tone=f.tone;q.title.textContent=f.title;q.text.textContent=f.text;}});
  reflectionFeedback.hidden=!state.reflection.checked;if(state.reflection.checked){const f=t.blocks[2]===2?r.full:r.partial;reflectionFeedback.dataset.tone=f.tone;reflectionTitle.textContent=f.title;reflectionText.textContent=f.text;}
  ruleControls.forEach(input=>input.checked=state.rule.selected===input.value);customWrap.hidden=!rule.options.find(o=>o.id===state.rule.selected)?.custom;confirm.disabled=state.rule.confirmed;confirm.textContent=state.rule.confirmed?'Правило зафиксировано':'Зафиксировать моё правило';
  nexts[0].disabled=!state.recognition.every(a=>a.checked);nexts[1].disabled=!state.decisions.every(a=>a.checked);nexts[2].disabled=!state.reflection.checked;nexts[3].disabled=!ready();
  const result=config.results.find(r=>t.total>=r.min&&t.total<=r.max);resultTitle.textContent=result.title;resultText.textContent=result.text;score.textContent=\`\${t.total} / 15\`;scores.forEach((n,i)=>n.textContent=\`Блок \${i+1}: \${t.blocks[i]} / \${[5,6,2,2][i]}\`);const selected=rule.options.find(o=>o.id===state.rule.selected);ruleText.textContent=selected?(selected.custom?state.rule.custom.trim():selected.value):'';
 }
 const clear=button('Начать заново',root,()=>{confirmation.hidden=false;cancel.focus();});clear.className='secondary';const confirmation=el('div');confirmation.className='market-card';confirmation.hidden=true;confirmation.setAttribute('role','group');confirmation.setAttribute('aria-label','Сброс упражнения');el('p','Начать заново? Ответы и тексты будут удалены.',confirmation);button('Начать заново',confirmation,()=>{state=fresh();restore();confirmation.hidden=true;persist();clear.focus();});const cancel=button('Отмена',confirmation,()=>{confirmation.hidden=true;clear.focus();});cancel.className='secondary';document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!confirmation.hidden)cancel.click();});
 function restore(){areas.forEach(({area,get})=>area.value=get());trigger.value=state.reflection.trigger===null?'':String(state.reflection.trigger);refresh();}restore();
 if(context.pending){lastPayload=payload();saveStatus.className='save-status';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
 const resize=()=>FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);resize();new ResizeObserver(resize).observe(root);
})();
`,Ie=`.market-card { margin:16px 0; padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); min-width:0; overflow-wrap:anywhere; }
.market-block h4 { font-size:18px; margin:16px 0; }
.market-card fieldset,.market-block fieldset { min-width:0; border:0; padding:0; margin:12px 0; }
.market-block legend { padding:0; }
.market-choice { display:flex; gap:8px; align-items:flex-start; padding:10px 0; cursor:pointer; }
.market-choice input { flex-shrink:0; margin:3px 0 0; }
.market-rule-text { display:block; margin-top:4px; }
.market-field { display:block; margin:16px 0; }
.market-field span { display:block; margin-bottom:6px; }
.market-field textarea,.market-field select { width:100%; box-sizing:border-box; min-width:0; }
.market-field select { font:inherit; padding:8px; color:inherit; border:1px solid var(--fh-line); background:var(--fh-surface); border-radius:var(--fh-radius-field); }
.market-feedback { margin:12px 0; padding:12px; background:var(--fh-selected); border-left:3px solid var(--fh-accent); }
.market-nav { display:flex; gap:8px; flex-wrap:wrap; margin:16px 0; }
.market-card button { margin:0 8px 4px 0; }
.market-block p { white-space:pre-wrap; overflow-wrap:anywhere; }
.market-block details { margin:16px 0; }
.market-block summary { cursor:pointer; overflow-wrap:anywhere; }
[hidden]{display:none!important;}
@media(max-width:400px){.market-card{padding:10px;}}
`,Le=`// Author content is supplied by the host as plain text. The runtime has no storage or network access.
(async()=>{
 const root=document.getElementById('exercise');
 const el=(tag,text='',parent=root)=>{const n=document.createElement(tag);n.textContent=text;parent.append(n);return n;};
 const button=(text,parent,action)=>{const n=el('button',text,parent);n.type='button';n.onclick=action;return n;};
 let context;try{context=await FinHealth.init();}catch(error){el('p',error.message).setAttribute('role','alert');return;}
 const c=context.config,u=c.ui,steps=['intro','diag','profile','cases','casesEnd','plan','final'];
 const fresh=(reset=false)=>{const plan=structuredClone(reset?c.resetPlan:c.initialPlan);return {step:'intro',diag:Array(6).fill(null),cases:Array(6).fill(null),caseIdx:0,plan,amountInput:plan.sum?String(plan.sum):''};};
 let state=context.record?structuredClone(context.record.state):fresh(),revision=0,lastPayload,confirming=false;
 const score=()=>state.cases.reduce((n,a,i)=>n+(a!==null&&c.cases[i].options[a].ok?1:0),0);
 const ready=()=>state.plan.goal.trim()&&state.plan.sum>0&&state.plan.term>0;
 const payload=()=>({state:structuredClone(state),status:state.step==='final'?'completed':state.step!=='intro'||state.diag.some(a=>a!==null)||state.cases.some(a=>a!==null)?'in_progress':'not_started',outcome:'not_applicable',score:{earned:score(),possible:6}});
 const number=n=>Number(n).toLocaleString('ru-RU');
 const label=el('p');label.className='credit-step';label.setAttribute('role','status');
 const panel=el('section');panel.className='credit-panel';
 const reset=button('Пройти заново',root,()=>{confirming=true;showConfirm();});reset.className='secondary';
 const confirmation=el('div');confirmation.hidden=true;
 const saveStatus=el('p');saveStatus.className='visually-hidden';saveStatus.setAttribute('role','status');
 const retry=button('Повторить сохранение',root,()=>persist(lastPayload));retry.hidden=true;
 function showConfirm(){confirmation.replaceChildren();confirmation.hidden=!confirming;if(!confirming)return;el('p','Начать заново? Все ответы и план будут удалены.',confirmation);button('Подтвердить',confirmation,()=>{state=fresh(true);confirming=false;showConfirm();render(true);persist();});button('Отмена',confirmation,()=>{confirming=false;showConfirm();reset.focus();}).focus();}
 async function persist(value=payload()){lastPayload=structuredClone(value);const current=++revision;retry.hidden=true;saveStatus.className='visually-hidden';saveStatus.setAttribute('role','status');saveStatus.textContent='Сохраняем…';try{await(value.status==='completed'?FinHealth.complete(value):FinHealth.save(value));if(current===revision)saveStatus.textContent='Сохранено до обновления страницы';}catch(error){if(current!==revision)return;saveStatus.className='';saveStatus.setAttribute('role','alert');saveStatus.textContent=\`\${error.message} Ответы и план на месте.\`;retry.hidden=false;}}
 const move=(step,index)=>{state.step=step;if(index!==undefined)state.caseIdx=index;render(true);persist();};
 function card(parent=panel){const n=el('div','',parent);n.className='credit-card';return n;}
 function actions(){const n=el('div','',panel);n.className='credit-actions';return n;}
 function title(text){const h=el('h4',text,panel);h.tabIndex=-1;return h;}
 function render(focus=false){
  label.textContent=\`Шаг \${steps.indexOf(state.step)+1} из 7\`;panel.replaceChildren();reset.hidden=state.step==='intro'&&!state.diag.some(a=>a!==null);
  let heading;
  if(state.step==='intro'){
   el('p',c.intro,panel);el('p',c.introNote,card());const n=button('Начать →',actions(),()=>move('diag'));if(focus)n.focus();
  }else if(state.step==='diag'){
   heading=title(u.diagTitle);el('p',u.diagIntro,panel);const progress=el('p','',panel);progress.setAttribute('role','status');
   const nextParent=el('div','',panel);nextParent.className='credit-diagnostic';
   let next;
   const update=()=>{const n=state.diag.filter(a=>a!==null).length;progress.textContent=\`\${n} из 6\`;next.disabled=n<6;};
   c.statements.forEach((text,i)=>{const field=el('fieldset','',nextParent);el('legend',\`\${i+1}. \${text}\`,field);const options=el('div','',field);options.className='credit-scale';c.scaleLabels.forEach((text,j)=>{const option=el('label','',options);const input=el('input','',option);input.type='radio';input.name=\`diagnostic-\${i}\`;input.value=String(j+1);input.checked=state.diag[i]===j+1;el('span',text,option);input.onchange=()=>{state.diag[i]=j+1;update();persist();};});});
   next=button('Посмотреть профиль →',actions(),()=>move('profile'));update();
  }else if(state.step==='profile'){
   heading=title(u.profileTitle);el('p',u.profileIntro,panel);const profile=state.diag.map((v,i)=>({v,i})).sort((a,b)=>b.v-a.v||a.i-b.i).map(x=>x.i);
   profile.slice(0,2).forEach(i=>{const t=c.traps[i],n=card();el('p',\`Ловушка \${String(i+1).padStart(2,'0')}\`,n);el('h5',t.name,n);el('p',t.latin,n);el('p',\`Как это у вас работает: \${t.how}.\`,n);el('p',\`Первый шаг: \${t.fix}\`,n);});
   const rest=el('details','',panel);el('summary','Остальные четыре ловушки',rest);el('p',\`\${u.restIntro} \${profile.slice(2).map(i=>c.traps[i].name).join(' · ')}. \${u.restOutro}\`,rest);
   const a=actions();button('← Вернуться к диагностике',a,()=>move('diag'));button('Перейти к кейсам →',a,()=>{state.cases=Array(6).fill(null);move('cases',0);});
  }else if(state.step==='cases'){
   const i=state.caseIdx,q=c.cases[i],answered=state.cases[i];el('p',\`Ситуация \${i+1} из 6 · Узнано: \${score()}\`,panel);heading=title(u.casesTitle);el('p',q.scene,card());
   const field=el('fieldset','',panel);el('legend',q.question,field);
   q.options.forEach((o,j)=>{const b=button(o.text,field,()=>{if(state.cases[i]!==null)return;state.cases[i]=j;render(true);persist();});b.className='credit-option';b.disabled=answered!==null;if(answered!==null){if(o.ok)b.classList.add('answer-correct');else if(j===answered)b.classList.add('answer-wrong');}});
   if(answered!==null){const feedback=card();feedback.setAttribute('role','status');el('p',\`\${q.options[answered].ok?u.correct:u.incorrect} \${q.explain}\`,feedback);el('p',q.tool,feedback);}
   const a=actions();if(i>0)button('← Назад',a,()=>move('cases',i-1));const next=button(i===5?'К итогу →':'Следующая ситуация →',a,()=>i===5?move('casesEnd'):move('cases',i+1));next.disabled=answered===null;
  }else if(state.step==='casesEnd'){
   heading=title('Итог блока «Кейсы»');const s=score();el('p',\`\${s} / 6 · Узнали ловушек\`,card());el('p',c.comments[s>=c.commentThresholds[1]?2:s>=c.commentThresholds[0]?1:0],panel);const a=actions();button('← Вернуться к кейсам',a,()=>move('cases',5));button('Собрать свой план →',a,()=>move('plan'));
  }else if(state.step==='plan'){
   heading=title(u.planTitle);el('p',u.planIntro,panel);const hint=el('details','',panel);el('summary','Как выбрать цель для тренировки',hint);el('p',u.planNote,hint);
   const n=card(),presets=el('div','',n);presets.className='credit-presets';el('p','Готовые тренировочные цели',presets);
   const field=(name,id,type)=>{const label=el('label','',n);label.className='credit-field';el('span',name,label);const input=el('input','',label);input.id=id;input.type=type;return input;};
   const goal=field('На что копите','credit-goal','text');goal.maxLength=80;goal.value=state.plan.goal;
   const sum=field('Сумма цели, ₽','credit-sum','number');sum.min='1';sum.max=String(c.maxSum);sum.step='1';sum.value=state.amountInput;el('p',u.sumHint,n).className='credit-hint';
   const terms=el('fieldset','',n);el('legend','Срок',terms);const termInputs=[];
   c.terms.forEach(t=>{const label=el('label','',terms);const input=el('input','',label);input.type='radio';input.name='credit-term';input.value=String(t);input.checked=state.plan.term===t;termInputs.push(input);el('span',\`\${t} мес\`,label);input.onchange=()=>{state.plan.term=t;update();persist();};});el('p',u.termHint,n).className='credit-hint';
   const autoLabel=el('label','',n);autoLabel.className='credit-auto';const auto=el('input','',autoLabel);auto.type='checkbox';auto.checked=state.plan.autoTransfer;el('span',u.autoLabel,autoLabel);el('p',u.autoNote,n);
   const calc=el('div','',panel);calc.className='credit-calculation';calc.setAttribute('aria-live','polite');const error=el('p','',panel);error.id='credit-sum-error';error.setAttribute('role','alert');sum.setAttribute('aria-describedby','credit-sum-error');
   const a=actions();button('← Назад',a,()=>move('casesEnd'));const next=button('Собрать карточку плана →',a,()=>{if(!ready()||!sum.validity.valid){error.textContent='Заполните цель, сумму и срок';return;}move('final');});
   function update(){calc.replaceChildren();const amount=Number(state.amountInput),amountValid=state.amountInput.trim()&&Number.isFinite(amount)&&Number.isInteger(amount)&&amount>0&&amount<=c.maxSum&&amount===state.plan.sum&&sum.validity.valid;const valid=ready()&&amountValid;next.disabled=!valid;sum.setAttribute('aria-invalid',String(!amountValid));error.textContent=amountValid?'':\`Введите целую сумму от 1 до \${number(c.maxSum)} ₽.\`;if(!valid){el('p','Ежемесячный шаг —',calc);return;}const step=Math.round(state.plan.sum/state.plan.term);el('p',\`Ежемесячный шаг: \${number(step)} ₽\`,calc);el('p',\`\${number(state.plan.sum)} ₽ за \${state.plan.term} мес\`,calc);const light=c.lights.filter(l=>step>l.above).at(-1);if(light){el('p',light.label,calc);el('p',light.note,calc);}if(state.plan.sum>=c.dreamy.sum&&state.plan.term>=c.dreamy.term)el('p',c.dreamy.note,calc);}
   goal.oninput=()=>{state.plan.goal=goal.value;update();persist();};sum.oninput=()=>{state.amountInput=sum.value.slice(0,100);const v=Number(state.amountInput);if(state.amountInput.trim()&&Number.isFinite(v)&&Number.isInteger(v)&&v>0&&v<=c.maxSum)state.plan.sum=v;update();persist();};auto.onchange=()=>{state.plan.autoTransfer=auto.checked;persist();};
   c.presets.forEach(p=>button(\`\${p.label} · \${number(p.sum)} ₽ · \${p.term} мес\`,presets,()=>{state.plan.goal=p.goal;state.plan.sum=p.sum;state.amountInput=String(p.sum);state.plan.term=p.term;goal.value=p.goal;sum.value=state.amountInput;termInputs.forEach(i=>i.checked=Number(i.value)===p.term);update();persist();}));update();
  }else{
   heading=title(u.finalTitle);el('p',u.finalIntro,panel);const p=state.plan,step=Math.round(p.sum/p.term),n=card();el('h5',p.goal,n);
   const dl=el('dl','',n);[['Сумма',\`\${number(p.sum)} ₽\`],['Срок',\`\${p.term} мес\`],['Ежемесячный шаг',\`\${number(step)} ₽\`],['Механизм',p.autoTransfer?'Автоперевод':'Ручной перевод']].forEach(([k,v])=>{el('dt',k,dl);el('dd',v,dl);});
   el('h5',p.autoTransfer?u.autoTitle:u.manualTitle,n);el('p',p.autoTransfer?u.autoFeedback:u.manualFeedback,n);el('h5',u.actionsTitle,n);const ul=el('ul','',n);[u.action1,u.action2,p.autoTransfer?u.actionAuto:u.actionManual].forEach(t=>el('li',t.replaceAll('{goal}',p.goal).replaceAll('{step}',number(step)),ul));el('p',u.finalFoot,n);button('← Изменить план',actions(),()=>move('plan'));
  }
  if(focus&&heading)heading.focus();resize();
 }
 function resize(){FinHealth.resize(Math.ceil(root.getBoundingClientRect().height)+2);}
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&confirming){confirming=false;showConfirm();reset.focus();}});
 render();if(context.pending){lastPayload=payload();saveStatus.className='';saveStatus.setAttribute('role','alert');saveStatus.textContent='Есть несохранённые изменения. Повторите сохранение.';retry.hidden=false;}
 new ResizeObserver(resize).observe(root);resize();
})();
`,Re=`.credit-step { font-weight: 600; }
.credit-panel h4 { font-size: 22px; margin: 16px 0; }
.credit-panel h5 { font-size: 18px; margin: 12px 0; }
.credit-panel p,.credit-panel li { line-height: 1.55; overflow-wrap: anywhere; }
.credit-card { border: 1px solid var(--fh-line); background: var(--fh-surface); border-radius: 14px; padding: 16px; margin: 16px 0; min-width: 0; }
.credit-panel fieldset { min-width: 0; border: 1px solid var(--fh-line); padding: 12px; margin: 12px 0; }
.credit-panel legend { line-height: 1.5; padding: 0 4px; }
.credit-scale { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 8px; }
.credit-scale label { display: flex; align-items: flex-start; gap: 6px; padding: 10px 4px; min-width: 0; overflow-wrap: anywhere; border-radius: 6px; }
.credit-scale label:has(input:checked) { background: var(--fh-selected); outline: 2px solid var(--fh-ink); }
.credit-panel input[type=radio],.credit-panel input[type=checkbox] { flex-shrink: 0; width: 18px; height: 18px; margin: 3px 0; }
.credit-actions { display: flex; gap: 10px; flex-wrap: wrap; margin: 16px 0; }
.credit-option { display: block; width: 100%; text-align: left; white-space: normal; overflow-wrap: anywhere; margin: 8px 0; }
.credit-option:disabled { opacity: 1; }
.credit-option.answer-correct { color: #25613a; background: #edf6ef; border: 1px solid #79a58a; }
.credit-option.answer-wrong { color: #85372b; background: #fcf0ee; border: 1px solid #ce9990; }
.credit-field { display: grid; gap: 6px; margin: 16px 0; }
.credit-field input { width: 100%; box-sizing: border-box; min-width: 0; font: inherit; padding: 10px; }
.credit-panel fieldset label { margin-right: 12px; }
.credit-auto { display: flex; gap: 10px; align-items: start; }
.credit-presets { display: flex; gap: 8px; flex-wrap: wrap; }
.credit-presets p { flex-basis: 100%; margin: 0; }
.credit-hint { font-size: 14px; color: var(--fh-muted); }
.credit-calculation { border-top: 1px solid var(--fh-line); margin: 16px 0; }
.credit-panel dl { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); gap: 8px; }
.credit-panel dd { margin: 0; font-weight: 600; overflow-wrap: anywhere; }
[hidden] { display: none !important; }
@media(max-width:600px) { .credit-scale { grid-template-columns: 1fr; } .credit-scale label { padding: 10px; } }
`,ze=`// Generic yes/no self-assessment. Content and interpretation come from the host.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const node = document.createElement(tag); if (text) node.textContent = text; parent.append(node); return node; };
  const button = (text, parent, action) => { const node = el('button', text, parent); node.type = 'button'; node.onclick = action; return node; };
  let context;
  try { context = await FinHealth.init(); } catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config } = context;
  const fresh = () => ({ screen: 'question', index: 0, answers: config.questions.map(() => null) });
  let state = context.record ? structuredClone(context.record.state) : fresh();
  const payload = () => {
    const earned = state.answers.filter(answer => answer === 'yes').length;
    return { state: structuredClone(state), status: state.screen === 'result' ? 'completed' : state.answers.some(answer => answer !== null) ? 'in_progress' : 'not_started',
      outcome: 'not_applicable', score: { earned, possible: config.questions.length },
      ...(state.screen === 'result' ? { summary: \`\${config.labels.yes}: \${earned} / \${config.questions.length}\`.slice(0, 1000) } : {}) };
  };
  config.instructions.forEach(instruction => el('p', instruction));
  const panel = el('section'); panel.className = 'assessment-panel';
  const reset = button('Пройти заново', root, () => { confirmation.hidden = false; cancel.focus(); resize(); }); reset.className = 'secondary';
  const confirmation = el('div'); confirmation.className = 'assessment-confirm'; confirmation.hidden = true; confirmation.setAttribute('role', 'group'); confirmation.setAttribute('aria-label', 'Повтор самооценки');
  el('p', 'Пройти заново? Ответы и результат будут удалены.', confirmation);
  button('Подтвердить', confirmation, () => { state = fresh(); confirmation.hidden = true; render(true); persist(); });
  const cancel = button('Отмена', confirmation, () => { confirmation.hidden = true; reset.focus(); resize(); }); cancel.className = 'secondary';
  const status = el('p'); status.className = 'visually-hidden'; status.setAttribute('role', 'status');
  const retry = button('Повторить сохранение', root, () => persist(lastPayload)); retry.hidden = true;
  let revision = 0; let lastPayload;
  async function persist(value = payload()) {
    lastPayload = structuredClone(value); const current = ++revision;
    retry.hidden = true; status.className = 'visually-hidden'; status.setAttribute('role', 'status'); status.textContent = 'Сохраняем…';
    try {
      await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if (current === revision) status.textContent = 'Сохранено до обновления страницы';
    } catch (error) {
      if (current !== revision) return;
      status.className = ''; status.setAttribute('role', 'alert'); status.textContent = error.message + ' Ответы на месте.'; retry.hidden = false;
    }
    resize();
  }
  function render(focus = false) {
    panel.replaceChildren(); reset.hidden = !state.answers.some(answer => answer !== null);
    if (state.screen === 'result') {
      const earned = state.answers.filter(answer => answer === 'yes').length;
      const heading = el('h4', 'Результат', panel); heading.tabIndex = -1;
      el('p', \`\${config.labels.yes}: \${earned} / \${config.questions.length}\`, panel);
      const band = config.resultBands?.find(band => earned >= band.min && earned <= band.max);
      if (band) { el('h5', band.title, panel); el('p', band.description, panel); }
      if (config.resultNote) el('p', config.resultNote, panel);
      button('Изменить ответы', panel, () => { state.screen = 'question'; state.index = 0; render(true); persist(); }).className = 'secondary';
      if (focus) heading.focus(); resize(); return;
    }
    el('p', \`Вопрос \${state.index + 1} из \${config.questions.length}\`, panel).className = 'assessment-progress';
    const heading = el('h4', config.questions[state.index].text, panel); heading.tabIndex = -1;
    const choices = el('div', '', panel); choices.className = 'assessment-choices'; choices.setAttribute('role', 'group'); choices.setAttribute('aria-label', 'Ответ');
    const choiceButtons = [];
    ['yes', 'no'].forEach(answer => {
      const choice = button(config.labels[answer], choices, () => {
        state.answers[state.index] = answer; state.screen = 'question';
        reset.hidden = false;
        choiceButtons.forEach(node => node.setAttribute('aria-pressed', String(node === choice)));
        next.disabled = false; persist();
      });
      choice.className = 'assessment-choice'; choice.setAttribute('aria-pressed', String(state.answers[state.index] === answer)); choiceButtons.push(choice);
    });
    const actions = el('div', '', panel); actions.className = 'assessment-actions';
    if (state.index > 0) button('Назад', actions, () => { state.index--; render(true); persist(); }).className = 'secondary';
    const last = state.index === config.questions.length - 1;
    const next = button(last ? 'Посмотреть результат' : 'Далее', actions, () => {
      if (state.answers[state.index] === null || (last && state.answers.some(answer => answer === null))) return;
      if (last) state.screen = 'result'; else state.index++;
      render(true); persist();
    }); next.disabled = state.answers[state.index] === null;
    if (focus) heading.focus(); resize();
  }
  function resize() { FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2); }
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !confirmation.hidden) cancel.click(); });
  render();
  if (context.pending) { lastPayload = payload(); status.className = ''; status.setAttribute('role', 'alert'); status.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; retry.hidden = false; }
  resize(); new ResizeObserver(resize).observe(root);
})();
`,Be=`.assessment-panel { padding:14px; border:1px solid var(--fh-line); border-radius:var(--fh-radius-field); margin:12px 0; overflow-wrap:anywhere; }
.assessment-panel h4 { margin:0 0 12px; font-size:18px; }
.assessment-panel h5 { font-size:16px; margin:16px 0 8px; }
.assessment-progress { color:var(--fh-muted); font-size:14px; }
.assessment-choices { display:flex; flex-wrap:wrap; gap:8px; margin:12px 0; }
.assessment-choice { min-width:90px; background:var(--fh-surface); color:var(--fh-ink); border-color:var(--fh-line); }
.assessment-choice:hover { background:var(--fh-hover); }
.assessment-choice[aria-pressed="true"] { background:var(--fh-selected); border-color:var(--fh-accent); color:var(--fh-ink); }
.assessment-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; }
.assessment-confirm { padding:12px; border:1px solid var(--fh-line); margin:12px 0; }
.assessment-confirm button { margin:0 8px 4px 0; }
@media(max-width:400px){.assessment-panel{padding:10px;}}
`,Ve=`/* Accepted G3 foundation. Source values for the app and Storybook. */
@font-face { font-family: "FinHealth Manrope"; src: url("./assets/fonts/Manrope.ttf") format("truetype"); font-style: normal; font-weight: 200 800; font-display: swap; }
:root {
  --fh-font: "FinHealth Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --fh-ink: #112d4e;
  --fh-secondary: #52657b;
  --fh-canvas: #f7f9fb;
  --fh-surface: #fff;
  --fh-line: #d7e0e7;
  --fh-accent: #e3a940;
  --fh-action-hover: #203e60;
  --fh-selected: #e8eef4;
  --fh-hover: #eef2f6;
  --fh-on-dark: #cad7e3;
  --fh-caption-on-dark: #bdcbd8;
  --fh-demo-ink: #43566d;
  --fh-demo-surface: #e9eef3;
  --fh-text-small: 14px;
  --fh-text-body: 16px;
  --fh-text-lead: 20px;
  --fh-text-section: 26px;
  --fh-text-title: 42px;
  --fh-text-title-mobile: 32px;
  --fh-space-1: 4px;
  --fh-space-2: 8px;
  --fh-space-3: 12px;
  --fh-space-4: 16px;
  --fh-space-6: 24px;
  --fh-space-8: 32px;
  --fh-space-10: 40px;
  --fh-radius-field: 12px;
  --fh-radius-content: 20px;
  --fh-radius-cover: 24px;
  --fh-radius-pill: 999px;
  --fh-control-height: 48px;
  --fh-motion-navigation: 220ms;
  --fh-motion-feedback: 150ms;
}
/* Manrope has no italic face in this file; retain authored emphasis with an oblique. */
em { font-synthesis: style; }
.fh-theme { font-family: var(--fh-font); color: var(--fh-ink); background: var(--fh-canvas); }
@media (prefers-reduced-motion: reduce) {
  :root { --fh-motion-navigation: 0ms; --fh-motion-feedback: 0ms; }
}
`;function He({definition:t,record:a,save:c,title:l,pending:d=!1,storage:f=`session`}){let h=(0,O.useRef)(null),_=(0,O.useRef)({definition:t,record:a,save:c,storage:f,pending:d});(0,O.useEffect)(()=>{_.current={definition:t,record:a,save:c,storage:f,pending:d}},[t,a,c,f,d]);let[v,y]=(0,O.useState)(``),[b,x]=(0,O.useState)(220),[C,w]=(0,O.useState)(``),[T,E]=(0,O.useState)(0),ie=JSON.stringify({key:t.key,manifest:t.manifest,config:t.config}),k=s(t.manifest,e)||s(t.manifest,S);return(0,O.useEffect)(()=>{let a=crypto.randomUUID(),c=!0,l=0,d=Promise.resolve();function f(e){if(e.source!==h.current?.contentWindow||e.origin!==`null`||!pe(e.data,a))return;let t=e.data;if(t.method===`resize`){x(Math.max(120,Math.ceil(t.height)));return}let n=t.requestId;n<=l||(l=n,d=d.then(async()=>{if(!c)return;let{definition:e,record:r,save:i,storage:l,pending:u}=_.current,d=e=>{c&&h.current?.contentWindow?.postMessage({protocol:fe,channel:a,requestId:n,method:`response`,...e},`*`)};try{if(r&&!s(r.manifest,e.manifest))throw Error(`Версия упражнения изменилась. Сохранённый ответ не перезаписан.`);t.method===`init`?(r&&D(e,o(r)),d({ok:!0,value:{manifest:e.manifest,config:e.config,record:r,storage:l,pending:u,mode:`attempt`}}),w(``)):d({ok:!0,value:await i(e,D(e,t.payload))})}catch(e){let n=e instanceof Error?e.message:`Не удалось сохранить упражнение.`;d({ok:!1,error:n}),t.method===`init`&&w(n)}}))}window.addEventListener(`message`,f);let v=[{manifest:e,script:_e,styles:ve},{manifest:S,script:ye,styles:be},{manifest:u,script:xe,styles:Se},{manifest:r,script:Ce,styles:we},{manifest:i,script:Te,styles:Ee},{manifest:p,script:Ne,styles:Pe},{manifest:te,script:Fe,styles:Ie},{manifest:g,script:Le,styles:Re},{manifest:ne,script:ze,styles:Be},{manifest:m,script:De,styles:Oe},{manifest:ee,script:ke,styles:Ae},{manifest:n,script:je,styles:Me}].find(e=>s(t.manifest,e.manifest));return re(async()=>{let{default:e}=await import(`./Manrope-133UG_k2.js`);return{default:e}},[]).then(({default:e})=>{if(!c)return;let t=Ve.replace(`./assets/fonts/Manrope.ttf`,e);y(me(a,he,v?.script??`// Two first-party modules. All content is text; no content HTML is evaluated.
(async () => {
  const root = document.getElementById('exercise');
  const el = (tag, text, parent = root) => { const node = document.createElement(tag); if (text) node.textContent = text; parent.append(node); return node; };
  let context;
  try { context = await FinHealth.init(); }
  catch (error) { el('p', error.message).setAttribute('role', 'alert'); return; }
  const { config, manifest, record, storage } = context;
  let state = record?.state ?? (manifest.id === 'finhealth-note' ? { note: '', done: false } : { answers: {} });
  let revision = 0;
  let lastPayload;
  const status = el('p'); status.className = 'save-status visually-hidden'; status.setAttribute('role', 'status');
  const retry = el('button', 'Повторить сохранение'); retry.type = 'button'; retry.hidden = true;
  retry.onclick = () => persist(lastPayload);
  function payload() {
    if (manifest.id === 'finhealth-note') return { state, status: state.done ? 'completed' : state.note ? 'in_progress' : 'not_started', outcome: 'not_applicable' };
    const checked = config.questions.filter(q => state.answers[q.id]?.checked);
    const correct = checked.filter(q => state.answers[q.id].selected === q.correctOptionId).length;
    return { state, status: checked.length === config.questions.length ? 'completed' : Object.keys(state.answers).length ? 'in_progress' : 'not_started',
      outcome: 'not_applicable', score: { earned: correct, possible: config.questions.length } };
  }
  async function persist(value = payload()) {
    lastPayload = structuredClone(value);
    const current = ++revision;
    status.className = 'save-status visually-hidden'; status.setAttribute('role', 'status'); status.textContent = 'Сохраняем…'; retry.hidden = true;
    try {
      const response = await (value.status === 'completed' ? FinHealth.complete(value) : FinHealth.save(value));
      if (current !== revision) return;
      status.textContent = response.storage === 'browser' ? 'Сохранено в этом браузере' : 'Сохранено до обновления страницы';
    } catch (error) {
      if (current !== revision) return;
      status.className = 'save-status'; status.setAttribute('role', 'alert'); status.textContent = \`\${error.message} Ваш ввод на месте.\`; retry.hidden = false;
    }
  }
  status.textContent = storage === 'browser' ? 'Ответ сохраняется в этом браузере' : 'Ответ сохраняется до обновления страницы';
  if (context.pending) { status.className = 'save-status'; status.setAttribute('role', 'alert'); status.textContent = 'Есть несохранённые изменения. Повторите сохранение.'; lastPayload = payload(); retry.hidden = false; }
  if (manifest.id === 'finhealth-note') {
    for (const text of config.instructions) el('p', text).className = 'instruction';
    const label = el('label', 'Мой ответ или заметка'); label.htmlFor = 'note';
    const input = el('textarea'); input.id = 'note'; input.rows = 3; input.maxLength = 10000; input.value = state.note;
    input.oninput = () => { state = { ...state, note: input.value }; persist(); };
    const checkLabel = el('label'); checkLabel.className = 'check';
    const check = el('input', '', checkLabel); check.type = 'checkbox'; check.checked = state.done;
    el('span', 'Задание выполнено', checkLabel);
    check.onchange = () => { state = { ...state, done: check.checked }; persist(); };
  } else {
    const progress = el('progress'); progress.className = 'quiz-progress'; progress.max = config.questions.length; progress.setAttribute('aria-label', 'Проверено вопросов');
    const summary = el('p'); summary.className = 'quiz-summary'; summary.setAttribute('role', 'status');
    function refreshSummary() {
      const result = payload();
      const checked = Object.values(state.answers).filter(a => a.checked).length;
      progress.value = checked;
      summary.textContent = result.status === 'completed' ? \`Тренажёр выполнен · правильных ответов \${result.score.earned} из \${result.score.possible}\` : \`Проверено \${checked} из \${config.questions.length}\`;
    }
    refreshSummary();
    config.questions.forEach((question, index) => {
      const card = el('div'); card.className = 'question-card';
      const field = el('fieldset', '', card);
      const legend = el('legend', '', field);
      el('span', \`Вопрос \${index + 1} из \${config.questions.length}\`, legend).className = 'question-number';
      el('span', question.prompt, legend);
      const radios = [];
      for (const option of question.options) {
        const label = el('label', '', field); label.className = 'choice';
        const radio = el('input', '', label); radio.type = 'radio'; radio.name = question.id; radio.value = option.id; radio.checked = state.answers[question.id]?.selected === option.id;
        radios.push(radio); el('span', option.text, label).className = 'choice-text';
        radio.onchange = () => {
          const checked = state.answers[question.id]?.checked;
          state = { answers: { ...state.answers, [question.id]: { selected: option.id, checked: false } } };
          feedback.textContent = checked ? 'Ответ изменён. Проверьте его снова.' : ''; feedback.className = '';
          showFeedback(); refreshSummary(); persist();
        };
      }
      const actions = el('div', '', field); actions.className = 'actions';
      const check = el('button', 'Проверить', actions); check.type = 'button';
      const reset = el('button', 'Сбросить', actions); reset.type = 'button'; reset.className = 'secondary'; reset.hidden = !state.answers[question.id]?.checked;
      const feedback = el('p', '', field); feedback.id = \`feedback-\${index}\`; feedback.setAttribute('role', 'status'); field.setAttribute('aria-describedby', feedback.id);
      function showFeedback() {
        const answer = state.answers[question.id];
        reset.hidden = !answer?.checked;
        for (const radio of radios) {
          const label = radio.parentElement;
          label.classList.toggle('answer-correct', Boolean(answer?.checked && radio.value === question.correctOptionId));
          label.classList.toggle('answer-wrong', Boolean(answer?.checked && radio.checked && radio.value !== question.correctOptionId));
        }
        if (!answer?.checked) return;
        const correct = answer.selected === question.correctOptionId;
        feedback.className = 'visually-hidden';
        feedback.replaceChildren();
        el('strong', correct ? '✓ Верно' : '✕ Пока неверно', feedback);
        if (!correct) el('span', \`Правильный ответ: \${question.options.find(o => o.id === question.correctOptionId).text}\`, feedback);
      }
      showFeedback();
      check.onclick = () => {
        const answer = state.answers[question.id];
        if (!answer) { feedback.textContent = 'Выберите вариант перед проверкой.'; return; }
        state = { answers: { ...state.answers, [question.id]: { ...answer, checked: true } } };
        showFeedback(); refreshSummary(); persist();
      };
      reset.onclick = () => {
        const answers = { ...state.answers }; delete answers[question.id]; state = { answers };
        radios.forEach(radio => { radio.checked = false; }); reset.hidden = true;
        feedback.className = ''; feedback.textContent = ''; showFeedback();
        radios[0].focus(); refreshSummary(); persist();
      };
    });
  }
  // Measure a margin-containing content box, never document scrollHeight (which includes iframe height).
  new ResizeObserver(() => FinHealth.resize(Math.ceil(root.getBoundingClientRect().height) + 2)).observe(root);
})();
`,`${t}\n${ge}\n${v?.styles??``}`))}).catch(()=>{c&&w(`Не удалось подготовить оформление упражнения. Повторите запуск.`)}),()=>{c=!1,window.removeEventListener(`message`,f)}},[ie,T]),(0,M.jsxs)(`div`,{className:`exercise-module`,children:[C?(0,M.jsx)(`p`,{role:`alert`,children:C}):null,(0,M.jsx)(`iframe`,{ref:h,srcDoc:v||void 0,title:l,"data-exercise-key":t.key,sandbox:k?`allow-scripts allow-modals`:`allow-scripts`,referrerPolicy:`no-referrer`,style:{width:`100%`,height:b,border:0,display:`block`,background:`transparent`}}),C?(0,M.jsx)(`button`,{type:`button`,onClick:()=>E(e=>e+1),children:`Повторить запуск упражнения`}):null]})}function P({className:e=``,variant:t=`primary`,type:n=`button`,...r}){return(0,M.jsx)(`button`,{...r,type:n,className:`fh-button fh-button--${t} ${e}`})}function F({className:e=``,...t}){return(0,M.jsx)(`a`,{...t,className:`fh-button fh-button--primary ${e}`})}var Ue=e=>e?.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase();function We(e,t,n=[]){if(t==null)throw Error(`[lucide]: iconNode is required when icon name is used`);return{name:Ue(e),size:24,node:t,...n.length>0?{aliases:n}:{}}}var Ge=e=>{let t=``,n=!1;for(let r of e){if(r===`-`||r===`_`||r<=` `){n=t.length>0;continue}t.length===0?t+=r.toLowerCase():t+=n?r.toUpperCase():r,n=!1}return t},Ke=e=>{let t=Ge(e);return t.charAt(0).toUpperCase()+t.slice(1)},I=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),L={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":2,"stroke-linecap":`round`,"stroke-linejoin":`round`};function R(e){return e!=null}function qe(e,t={}){let n=t.attributeNames??{},r=e=>n[e]??e,i=e.size??e.width??L.width,a=e.size??e.height??L.height,o=e.aliases?.filter(e=>typeof e==`string`&&e.trim()!==``).map(e=>`lucide-${e}`)??[],s=[...e.name?[`lucide-${e.name}`]:[],...o],c=t.className?.split(` `).filter(Boolean)??[],l=t.includeDefaultClasses===!1?I(...c):I(`lucide`,...s,...c),u=t.absoluteStrokeWidth?Number(t.strokeWidth??L[`stroke-width`])*Number(e.size??e.width??L.width)/Number(t.size??t.width??L.width):t.strokeWidth??L[`stroke-width`];return[`svg`,{...Object.entries(L).reduce((e,[t,n])=>(e[r(t)]=n,e),{}),...`color`in t&&t.color&&{[r(`stroke`)]:t.color},...`size`in t&&R(t.size)&&{[r(`width`)]:t.size,[r(`height`)]:t.size},...`width`in t&&R(t.width)&&{[r(`width`)]:t.width},...`height`in t&&R(t.height)&&{[r(`height`)]:t.height},[r(`stroke-width`)]:u,...l&&{[r(`class`)]:l},[r(`viewBox`)]:`0 0 ${i} ${a}`,...t.hasA11yProp===!1?{[r(`aria-hidden`)]:`true`}:{},...`attributes`in t&&t.attributes},e.node.map(e=>{let[n,i,a]=e,o=t.nonScalingStroke?{[r(`vector-effect`)]:`non-scaling-stroke`,...i}:i;return a?[n,o,a]:[n,o]})]}function Je(e,t={}){return qe(e,{...t,attributeNames:{...t.attributeNames,class:`className`,"stroke-width":`strokeWidth`,"stroke-linecap":`strokeLinecap`,"stroke-linejoin":`strokeLinejoin`,"vector-effect":`vectorEffect`}})}var Ye=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},Xe=(0,O.createContext)({}),Ze=()=>(0,O.useContext)(Xe),Qe=(0,O.forwardRef)(({color:e,size:t,width:n,height:r,strokeWidth:i,absoluteStrokeWidth:a,nonScalingStroke:o,className:s=``,children:c,iconNode:l=[],icon:u={node:l,aliases:[],size:24},...d},f)=>{let{size:p=24,strokeWidth:m=2,absoluteStrokeWidth:h=!1,nonScalingStroke:g=!1,color:_=`currentColor`,className:v=``}=Ze()??{},y=!!c||Ye(d),[b,x,S=[]]=Je(u,{color:e??_,width:n??t??p,height:r??t??p,strokeWidth:i??m,absoluteStrokeWidth:a??h,nonScalingStroke:o??g,className:I(v,s),hasA11yProp:y,attributes:d});return(0,O.createElement)(b,{ref:f,...x},[...S.map(([e,t])=>(0,O.createElement)(e,t)),...Array.isArray(c)?c:[c]])});function z(e,t=[],n=[]){let r=typeof e==`string`?We(e,t,n):e,i=(0,O.forwardRef)(({className:e,...t},n)=>(0,O.createElement)(Qe,{ref:n,icon:r,className:e,...t}));return r.name&&(i.displayName=Ke(r.name)),i}var $e={name:`arrow-up-right`,size:24,node:[[`path`,{d:`M7 7h10v10`,key:`1tivn9`}],[`path`,{d:`M7 17 17 7`,key:`1vkiza`}]]};$e.node;var et=z($e),tt={name:`book-open`,size:24,node:[[`path`,{d:`M12 5v16`,key:`1f6ucr`}],[`path`,{d:`M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z`,key:`1fyvmf`}]]};tt.node;var nt=z(tt),rt={name:`calendar-days`,size:24,node:[[`path`,{d:`M8 2v3`,key:`1ioesn`}],[`path`,{d:`M16 2v3`,key:`otl347`}],[`rect`,{x:`3`,y:`3`,width:`18`,height:`18`,rx:`2`,key:`h1oib`}],[`path`,{d:`M3 9h18`,key:`1pudct`}],[`path`,{d:`M8 13h.01`,key:`1sbv64`}],[`path`,{d:`M12 13h.01`,key:`y0uutt`}],[`path`,{d:`M16 13h.01`,key:`wip0gl`}],[`path`,{d:`M8 17h.01`,key:`p3bg7i`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}],[`path`,{d:`M16 17h.01`,key:`ql8jdd`}]]};rt.node;var B=z(rt),it={name:`check`,size:24,node:[[`path`,{d:`M20 6 9 17l-5-5`,key:`1gmf2c`}]]};it.node;var at=z(it),ot={name:`chevron-down`,size:24,node:[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]};ot.node;var V=z(ot),st={name:`circle-question-mark`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3`,key:`1u773s`}],[`path`,{d:`M12 17h.01`,key:`p32p05`}]],aliases:[`help-circle`,`circle-help`]};st.node;var ct=z(st),lt={name:`file-text`,size:24,node:[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]};lt.node;var ut=z(lt),dt={name:`layers`,size:24,node:[[`path`,{d:`M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z`,key:`zw3jo`}],[`path`,{d:`M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12`,key:`1wduqc`}],[`path`,{d:`M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17`,key:`kqbvx6`}]],aliases:[`layers-3`]};dt.node;var ft=z(dt),pt={name:`lightbulb`,size:24,node:[[`path`,{d:`M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5`,key:`1gvzjb`}],[`path`,{d:`M9 18h6`,key:`x1upvd`}],[`path`,{d:`M10 22h4`,key:`ceow96`}]]};pt.node;var mt=z(pt),ht={name:`list-checks`,size:24,node:[[`path`,{d:`M13 5h8`,key:`a7qcls`}],[`path`,{d:`M13 12h8`,key:`h98zly`}],[`path`,{d:`M13 19h8`,key:`c3s6r1`}],[`path`,{d:`m3 17 2 2 4-4`,key:`1jhpwq`}],[`path`,{d:`m3 7 2 2 4-4`,key:`1obspn`}]]};ht.node;var H=z(ht),gt={name:`minus`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}]]};gt.node;var _t=z(gt),vt={name:`plus`,size:24,node:[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]};vt.node;var U=z(vt),yt={name:`user-round`,size:24,node:[[`circle`,{cx:`12`,cy:`8`,r:`5`,key:`1hypcn`}],[`path`,{d:`M20 21a8 8 0 0 0-16 0`,key:`rfgkzh`}]],aliases:[`user-2`]};yt.node;var bt=z(yt),xt={name:`video`,size:24,node:[[`path`,{d:`m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5`,key:`ftymec`}],[`rect`,{x:`2`,y:`6`,width:`14`,height:`12`,rx:`2`,key:`158x01`}]]};xt.node;var St=z(xt);function W({tone:e=`status`,className:t=``,...n}){return(0,M.jsx)(`p`,{...n,role:e===`error`?`alert`:`status`,className:`fh-message fh-message--${e} ${t}`})}function G({label:e,hint:t,error:n,optional:r,id:i,className:a=``,...o}){let s=(0,O.useId)(),c=i??s,l=[o[`aria-describedby`],t?`${c}-hint`:null,n?`${c}-error`:null].filter(Boolean).join(` `)||void 0;return(0,M.jsxs)(`div`,{className:`fh-field`,children:[(0,M.jsxs)(`label`,{className:`fh-field-label`,htmlFor:c,children:[e,r?(0,M.jsx)(`span`,{className:`muted`,children:`Необязательно`}):null]}),(0,M.jsx)(`textarea`,{...o,id:c,className:`fh-textarea ${a}`,"aria-invalid":n?!0:o[`aria-invalid`],"aria-describedby":l}),t?(0,M.jsx)(`p`,{className:`fh-field-hint`,id:`${c}-hint`,children:t}):null,n?(0,M.jsx)(W,{tone:`error`,id:`${c}-error`,children:n}):null]})}function Ct({legend:e,options:t,value:n,onChange:r,disabled:i=!1}){let a=(0,O.useId)();return(0,M.jsxs)(`fieldset`,{className:`fh-choice-group`,disabled:i,children:[(0,M.jsx)(`legend`,{children:e}),(0,M.jsx)(`div`,{className:`fh-choice-options`,children:t.map(e=>(0,M.jsxs)(`label`,{children:[(0,M.jsx)(`input`,{type:`radio`,name:a,value:e.value,checked:n===e.value,onChange:()=>r(e.value)}),e.label]},e.value))})]})}function wt({children:e,...t}){return(0,M.jsxs)(`label`,{className:`fh-checkbox`,children:[(0,M.jsx)(`input`,{...t,type:`checkbox`}),e]})}function K({label:e,children:t,trigger:n}){let r=(0,O.useId)(),i=(0,O.useRef)(null),a=(0,O.useRef)(null),o=(0,O.useRef)(!1),s=(0,O.useRef)(void 0),[c,l]=(0,O.useState)(!1),[u,d]=(0,O.useState)({left:16,top:16});function f(){clearTimeout(s.current)}function p(){if(f(),!(o.current||!a.current||a.current.matches(`:popover-open`))){o.current=!0;try{a.current.showPopover()}finally{o.current=!1}}}function m(){f(),s.current=setTimeout(()=>{!i.current?.matches(`:focus`)&&!a.current?.contains(document.activeElement)&&a.current?.hidePopover()},180)}(0,O.useEffect)(()=>()=>clearTimeout(s.current),[]);function h(){if(!i.current||!a.current)return;let e=i.current.getBoundingClientRect(),t=a.current.getBoundingClientRect();d({left:Math.max(16,Math.min(e.left,window.innerWidth-t.width-16)),top:Math.max(16,e.bottom+8+t.height>window.innerHeight-16?e.top-t.height-8:e.bottom+8)})}return(0,O.useEffect)(()=>{if(!c)return;function e(e){e.target instanceof Node&&a.current?.contains(e.target)||a.current?.hidePopover()}return window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),()=>{window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e)}},[c]),(0,M.jsxs)(`div`,{className:`fh-context-hint`,onPointerEnter:e=>{e.pointerType===`mouse`&&p()},onPointerLeave:e=>{e.pointerType===`mouse`&&m()},onFocus:e=>{if(!e.target.matches(`:focus-visible`))return;let t=e.currentTarget;queueMicrotask(()=>{t.contains(document.activeElement)&&p()})},onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||m()},children:[(0,M.jsx)(`button`,{ref:i,type:`button`,className:n?`fh-context-trigger`:`fh-context-icon`,"aria-label":e,"aria-expanded":c,"aria-describedby":c?r:void 0,popoverTarget:r,children:n??(0,M.jsx)(ct,{size:16,"aria-hidden":`true`})}),(0,M.jsx)(`div`,{ref:a,id:r,popover:`auto`,className:`fh-context-panel`,style:u,onPointerEnter:f,onPointerLeave:e=>{e.pointerType===`mouse`&&m()},onToggle:e=>{let t=e.newState===`open`;t&&h(),l(t)},children:t})]})}function Tt({label:e,title:t,description:n,action:r,tone:i=`blue`,headingLevel:a=2,titleId:o}){let s=a===1?`h1`:a===3?`h3`:`h2`,c=Array.isArray(n)?n:n?[n]:[];return(0,M.jsxs)(`header`,{className:`fh-gradient-intro fh-gradient-intro--${i}`,children:[e||r?(0,M.jsxs)(`div`,{className:`fh-gradient-intro__top`,children:[e?(0,M.jsx)(`p`,{className:`fh-gradient-intro__label`,children:e}):null,r?(0,M.jsx)(`div`,{className:`fh-gradient-intro__action`,children:r}):null]}):null,(0,M.jsx)(s,{className:`fh-gradient-intro__title`,id:o,tabIndex:o===`screen-title`?-1:void 0,children:t}),c.map((e,t)=>(0,M.jsx)(`p`,{className:`fh-gradient-intro__description`,children:e},t))]})}function Et({text:e,marks:t=[]}){return ie(e,t).map((e,t)=>{let n=e.text;return e.bold&&(n=(0,M.jsx)(`strong`,{children:n})),e.italic&&(n=(0,M.jsx)(`em`,{children:n})),e.underline&&(n=(0,M.jsx)(`u`,{children:n})),e.tone&&(n=(0,M.jsx)(`span`,{className:`reading-accent reading-accent--${e.tone}`,children:n})),(0,M.jsx)(O.Fragment,{children:n},t)})}function Dt({paragraphs:e,layout:t,marks:n=[],resources:r=[],assignment:i=!1,headingLevel:a=i?3:2,titleId:o,introLabel:s,action:c,children:l}){let u=a===1?`h2`:a===3?`h4`:`h3`,d=(0,O.useId)();function f(t,r=e[t],i=e[t].indexOf(r)){let a=n.filter(e=>e.paragraph===t&&e.to>i&&e.from<i+r.length).map(e=>({...e,from:Math.max(0,e.from-i),to:Math.min(r.length,e.to-i)}));return(0,M.jsx)(Et,{text:r,marks:a})}function p(t){let n=0;return e[t].split(`
`).flatMap(e=>{let t=n;return n+=e.length+1,e.trim()?[{text:e,offset:t}]:[]})}function m(e){return p(e).map((t,n)=>(0,M.jsx)(`li`,{children:f(e,t.text,t.offset)},`${e}-${n}`))}function h(t,n,o=0){let s=e.slice(t.from,t.to+1);if(t.kind===`heading`){let e=`h${Math.min(6,a+1+o)}`;return(0,M.jsx)(e,{className:`reading-heading`,children:f(t.from)},n)}if(t.kind===`group`)return(0,M.jsx)(`section`,{className:`reading-group reading-group--${t.variant} reading-group--${t.tone??(i?`gold`:`blue`)}`,children:t.children.map((e,n)=>h(e,n,o+ +(t.children[0].kind===`heading`&&n>0)))},n);if(t.kind===`items`){let e=t.ordered?`ol`:`ul`;return(0,M.jsx)(e,{className:`reading-list reading-list--structured`,start:t.ordered?t.start:void 0,children:t.children.map((e,t)=>(0,M.jsx)(`li`,{children:h(e,t,o)},t))},n)}if(t.kind===`table`){let e=`${d}-table-${t.from}`,r=(e,t,n)=>(0,M.jsx)(`tr`,{children:e.map((e,n)=>t?(0,M.jsx)(`th`,{scope:`col`,children:e===null?null:f(e)},n):(0,M.jsx)(`td`,{children:e===null?null:f(e)},n))},n);return(0,M.jsx)(`div`,{className:`reading-table-scroll`,role:`region`,"aria-labelledby":e,tabIndex:0,children:(0,M.jsxs)(`table`,{className:`reading-table`,children:[(0,M.jsx)(`caption`,{id:e,className:`reading-sr-only`,children:`Таблица`}),t.header?(0,M.jsx)(`thead`,{children:r(t.rows[0],!0,0)}):null,(0,M.jsx)(`tbody`,{children:t.rows.slice(+!!t.header).map((e,t)=>r(e,!1,t))})]})},n)}return t.kind===`list`?(0,M.jsx)(`ul`,{className:`reading-list`,children:s.flatMap((e,n)=>m(t.from+n))},n):t.kind===`callout`?(0,M.jsx)(`aside`,{className:`reading-callout reading-section--${t.tone??`blue`}`,children:s.map((e,n)=>(0,M.jsx)(`p`,{children:f(t.from+n)},n))},n):t.kind===`steps`?(0,M.jsx)(`ol`,{className:`reading-steps`,children:s.flatMap((e,n)=>{let r=t.from+n,i=p(r);return i.filter((e,t)=>t%2==0).map((e,t)=>{let n=e.text.match(/^(\d+|\p{Extended_Pictographic}\uFE0F?)\s*/u),a=n?e.text.slice(n[0].length):e.text;return(0,M.jsxs)(`li`,{children:[n?(0,M.jsx)(`span`,{className:`reading-step-badge`,children:n[1]}):null,(0,M.jsx)(u,{children:f(r,a,e.offset+(n?.[0].length??0))}),(0,M.jsx)(`p`,{children:f(r,i[t*2+1].text,i[t*2+1].offset)})]},`${r}-${t}`)})})},n):t.kind===`section`?(0,M.jsxs)(`section`,{className:`reading-section reading-section--${t.tone??`blue`}`,children:[(0,M.jsx)(u,{children:f(t.from)}),s.slice(1).map((e,n)=>{let i=t.from+n+1;if(i===t.list)return(0,M.jsx)(`ul`,{className:`reading-list`,children:m(i)},i);let a=i===t.link?.paragraph?r.find(e=>e.id===t.link?.resourceId):void 0;return(0,M.jsx)(`p`,{children:a?.url?(0,M.jsx)(`a`,{href:a.url,target:`_blank`,rel:`noreferrer`,children:f(i)}):f(i)},i)})]},n):(0,M.jsx)(`div`,{className:`reading-${t.kind}`,children:s.map((e,n)=>(0,M.jsx)(`p`,{children:f(t.from+n)},n))},n)}let g=[];for(let e of t)e.kind===`intro`?g.push({intro:e,blocks:[]}):(g.length||g.push({blocks:[]}),g[g.length-1].blocks.push(e));return(0,M.jsx)(`div`,{className:`reading-content${i?` reading-content--assignment`:``}`,children:g.map((t,n)=>{let r=t.intro,u=r?x(e[r.from]):[],d=s??(r?u.filter((e,t)=>t!==r.titleLine).map(e=>e.trim().replace(/[·\s]+$/u,``)).filter(Boolean).join(` · `):``),p=n===g.length-1?l:void 0;return(0,M.jsxs)(`section`,{className:`reading-card`,children:[r?(0,M.jsx)(Tt,{label:d,title:f(r.from,u[r.titleLine]),description:e.slice(r.from+1,r.to+1).map((e,t)=>f(r.from+t+1)),tone:i?`sand`:`blue`,headingLevel:n>0&&a===1?2:a,titleId:n===0?o:void 0,action:n===0?c:void 0}):null,t.blocks.length||p?(0,M.jsxs)(`div`,{className:`reading-card__body`,children:[t.blocks.map((e,t)=>h(e,t)),p]}):null]},n)})})}function Ot({assignment:e,content:t,links:n}){let r=t.materials.filter(t=>e.materialIds.includes(t.id));if(!r.length)return e.category?(0,M.jsx)(`span`,{className:`assignment-sources`,children:e.category}):null;let i=r.length===1?N[r[0].format]:`Материалы: ${r.length}`,a=`${e.category?`${e.category} · `:``}${i}`;return(0,M.jsx)(`div`,{className:`assignment-sources`,children:(0,M.jsx)(K,{label:`${a}. Материалы задания «${e.title}»`,trigger:(0,M.jsxs)(M.Fragment,{children:[a,(0,M.jsx)(V,{size:12,"aria-hidden":`true`})]}),children:(0,M.jsx)(`ul`,{children:r.map(e=>(0,M.jsx)(`li`,{children:(0,M.jsx)(`a`,{href:`${n.month}/material/${e.id}`,children:e.title})},e.id))})})})}function q({assignment:e,content:t,session:n,dispatch:r,links:i,saveExercise:a,exerciseStorage:o,inPlanner:s=!1}){let l=_(e),u=n.exerciseResults[l.key]?.status===`completed`,d=n.planner.assignmentIds.includes(e.id),f=c(e.readingLayout,e.instructions)&&e.readingLayout[0].kind===`intro`?e.readingLayout:void 0,p=(0,M.jsxs)(P,{variant:`text`,onClick:()=>r({type:`plan-assignment`,id:e.id,added:!d}),children:[f?(0,M.jsx)(d?_t:U,{size:14,"aria-hidden":`true`}):null,d?`Убрать из плана`:`В план`]}),m=(0,M.jsxs)(M.Fragment,{children:[s?(0,M.jsx)(Ot,{assignment:e,content:t,links:i}):null,e.programLinks?.length?(0,M.jsx)(`nav`,{className:`screen-actions`,"aria-label":`Шаги задания «${e.title}»`,children:e.programLinks.map(e=>(0,M.jsxs)(`a`,{href:j(e.monthId)[e.destination],children:[e.label,` →`]},`${e.monthId}/${e.destination}`))}):null,(0,M.jsx)(He,{pending:!!n.exerciseDrafts[l.key],definition:l,record:n.exerciseDrafts[l.key]??n.exerciseResults[l.key],title:`Упражнение: ${e.title}`,storage:C(l)?o:`session`,save:a??(async(e,t)=>(r({type:`save-exercise`,definition:e,payload:t}),{storage:`session`}))}),s?null:(0,M.jsx)(`a`,{href:i.planner,children:`Открыть планер →`})]});return(0,M.jsx)(`article`,{className:`planner-task${s?``:` lesson-assignment`}${f?` planner-task--adapted`:``}${u?` planner-task--done`:``}`,"aria-labelledby":`title-${e.id}`,children:f?(0,M.jsx)(Dt,{paragraphs:e.instructions,layout:f,marks:e.readingMarks,assignment:!0,introLabel:`📌 ${t.month} · Задание`,headingLevel:s?3:2,titleId:`title-${e.id}`,action:p,children:m}):(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(`div`,{className:`assignment-heading`,children:[(0,M.jsx)(`h3`,{id:`title-${e.id}`,children:e.title}),p]}),m]})})}function kt(e){let{session:t,content:n,dispatch:r,links:i}=e,a=t.planner,o=n.assignments??[],s=a.assignmentIds.map(e=>o.find(t=>t.id===e)).filter(e=>!!e),c=s.filter(e=>t.exerciseResults[l(`assignment`,e.id)]?.status===`completed`).length+a.tasks.filter(e=>e.done).length,u=s.length+a.tasks.length,d=a.taskDraft??``,[f,p]=(0,O.useState)(``),[m,h]=(0,O.useState)(``);function g(e){if(e.preventDefault(),!d.trim()){p(`Напишите, что хотите сделать.`);return}if(a.tasks.length>=200){p(`В плане уже 200 своих задач. Удалите ненужные, чтобы добавить новую.`);return}r({type:`add-personal-task`,id:crypto.randomUUID(),title:d}),p(``),h(`Своя задача добавлена в план.`)}return(0,M.jsxs)(`main`,{className:`product-main hub-page planner-page`,children:[(0,M.jsx)(`a`,{className:`back-link`,href:i.month,children:`← К месяцу`}),(0,M.jsxs)(`header`,{className:`planner-heading`,children:[(0,M.jsx)(`p`,{className:`eyebrow`,children:n.month}),(0,M.jsxs)(`div`,{className:`planner-title-line`,children:[(0,M.jsx)(`h1`,{id:`screen-title`,tabIndex:-1,children:`Мой планер`}),(0,M.jsxs)(K,{label:`О планере`,children:[(0,M.jsx)(`p`,{children:`Выбирайте задания клуба и добавляйте свои задачи.`}),(0,M.jsx)(`p`,{children:`Ответы не отправляются в клуб и не проверяются экспертом.`})]})]})]}),(0,M.jsx)(`section`,{className:`hub-panel planner-focus`,children:(0,M.jsx)(G,{label:`Основная цель и приоритеты`,id:`planner-goal`,rows:3,maxLength:1e4,value:a.goal,placeholder:`Что хочу изменить или сделать в этом месяце`,onChange:e=>r({type:`edit-planner`,field:`goal`,value:e.target.value})})}),(0,M.jsxs)(`div`,{className:`planner-grid planner-context`,children:[(0,M.jsx)(`section`,{className:`hub-panel`,children:(0,M.jsx)(G,{label:`Важные даты`,id:`planner-dates`,rows:5,maxLength:1e4,value:a.dates,placeholder:`Платежи, встречи, личные сроки`,onChange:e=>r({type:`edit-planner`,field:`dates`,value:e.target.value})})}),(0,M.jsx)(`section`,{className:`hub-panel`,children:(0,M.jsx)(G,{label:`Идеи и мысли`,id:`planner-ideas`,rows:5,maxLength:1e4,value:a.ideas,placeholder:`Что хочется попробовать или обдумать`,onChange:e=>r({type:`edit-planner`,field:`ideas`,value:e.target.value})})})]}),(0,M.jsxs)(`div`,{className:`planner-grid planner-work`,children:[(0,M.jsxs)(`section`,{className:`hub-panel planner-catalog`,"aria-labelledby":`club-tasks`,children:[(0,M.jsxs)(`div`,{className:`planner-title-line`,children:[(0,M.jsx)(`h2`,{id:`club-tasks`,children:`Из клуба`}),(0,M.jsxs)(K,{label:`О заданиях в планере`,children:[(0,M.jsx)(`p`,{children:`Добавляйте в план то, что подходит вам сейчас.`}),(0,M.jsx)(`p`,{children:`Ответ и отметка общие для всех материалов этого месяца, связанных с заданием. Если убрать задание из плана, они сохранятся.`})]})]}),o.length?(0,M.jsx)(`ul`,{className:`planner-list`,children:o.map(e=>{let o=a.assignmentIds.includes(e.id);return(0,M.jsx)(`li`,{children:(0,M.jsxs)(`article`,{className:`planner-catalog-row`,children:[(0,M.jsxs)(`div`,{className:`planner-catalog-copy`,children:[(0,M.jsx)(`h3`,{children:e.title}),(0,M.jsx)(Ot,{assignment:e,content:n,links:i}),t.exerciseResults[l(`assignment`,e.id)]?.status===`completed`?(0,M.jsx)(`span`,{className:`planner-completed`,children:`Выполнено`}):null]}),(0,M.jsx)(P,{className:`planner-catalog-add`,disabled:o,onClick:()=>{r({type:`plan-assignment`,id:e.id,added:!0}),h(`Добавлено в план: ${e.title}`)},children:o?`В плане`:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(U,{size:14,"aria-hidden":`true`}),`В план`]})})]})},e.id)})}):(0,M.jsx)(`p`,{children:`Задания клуба пока не добавлены. Можно начать со своих задач.`})]}),(0,M.jsxs)(`section`,{className:`hub-panel planner-own`,"aria-labelledby":`my-plan`,children:[(0,M.jsxs)(`div`,{className:`planner-section-heading`,children:[(0,M.jsx)(`h2`,{id:`my-plan`,children:`В моём плане`}),u?(0,M.jsxs)(`span`,{className:`planner-count`,children:[c,` из `,u,` выполнено`]}):null]}),(0,M.jsxs)(`form`,{className:`planner-add`,onSubmit:g,children:[(0,M.jsx)(`label`,{htmlFor:`personal-task-title`,children:`Своя задача`}),(0,M.jsx)(`input`,{id:`personal-task-title`,className:`planner-input`,value:d,maxLength:300,placeholder:`Что хочу сделать`,"aria-invalid":!!f,"aria-describedby":f?`personal-task-error`:void 0,onChange:e=>{r({type:`edit-planner`,field:`taskDraft`,value:e.target.value}),p(``)}}),(0,M.jsx)(P,{type:`submit`,children:`Добавить задачу`}),f?(0,M.jsx)(`p`,{id:`personal-task-error`,role:`alert`,children:f}):null]}),(0,M.jsx)(`p`,{className:`planner-announcement`,role:`status`,children:m}),u?null:(0,M.jsx)(`p`,{className:`planner-empty`,children:`В плане пока нет задач.`}),s.map(t=>(0,M.jsx)(q,{...e,assignment:t,inPlanner:!0},t.id)),a.tasks.map(e=>(0,M.jsxs)(`article`,{className:`planner-task${e.done?` planner-task--done`:``}`,"aria-label":`Своя задача: ${e.title}`,children:[(0,M.jsx)(`p`,{className:`eyebrow`,children:`Моя задача`}),(0,M.jsx)(`h3`,{children:e.title}),(0,M.jsx)(G,{id:`personal-${e.id}`,label:`Заметка к задаче`,rows:2,maxLength:1e4,value:e.note,onChange:t=>r({type:`edit-personal-task`,id:e.id,patch:{note:t.target.value}})}),(0,M.jsx)(wt,{checked:e.done,onChange:t=>r({type:`edit-personal-task`,id:e.id,patch:{done:t.target.checked}}),children:`Задача выполнена`}),(0,M.jsx)(P,{variant:`text`,onClick:()=>{r({type:`remove-personal-task`,id:e.id}),h(`Своя задача удалена: ${e.title}`)},children:`Удалить свою задачу`})]},e.id))]})]}),(0,M.jsxs)(`section`,{className:`hub-panel planner-totals`,"aria-labelledby":`planner-totals`,children:[(0,M.jsx)(`h2`,{id:`planner-totals`,children:`Итоги месяца`}),(0,M.jsx)(`p`,{className:`muted`,children:`Мой баланс денег в конце месяца`}),(0,M.jsx)(`div`,{className:`planner-amounts`,children:[{field:`earned`,label:`Заработано`},{field:`spent`,label:`Потрачено`},{field:`invested`,label:`Отложено / инвестировано`}].map(({field:e,label:t})=>(0,M.jsxs)(`label`,{htmlFor:`planner-${e}`,children:[t,(0,M.jsx)(`input`,{className:`planner-input`,id:`planner-${e}`,inputMode:`decimal`,maxLength:50,value:a[e],placeholder:`Сумма`,onChange:t=>r({type:`edit-planner`,field:e,value:t.target.value})})]},e))}),(0,M.jsx)(Ct,{legend:`Моя финансовая удовлетворённость`,value:a.satisfaction,options:[`1`,`2`,`3`,`4`,`5`].map(e=>({value:e,label:e})),onChange:e=>r({type:`edit-planner`,field:`satisfaction`,value:e})}),(0,M.jsxs)(`div`,{className:`planner-rating-hint`,children:[(0,M.jsx)(`span`,{className:`muted`,children:`1 — совсем не доволен · 5 — полностью доволен`}),a.satisfaction?(0,M.jsx)(P,{variant:`text`,onClick:()=>r({type:`edit-planner`,field:`satisfaction`,value:``}),children:`Снять оценку`}):null]})]}),(0,M.jsx)(`div`,{className:`screen-actions`,children:(0,M.jsx)(F,{href:i.month,children:`Вернуться к месяцу`})})]})}function At(e,t){if(t?.state===`upcoming`||t?.state===`live`)return t.joinUrl?{kind:`live`,url:t.joinUrl}:{kind:`unavailable`};if(t?.state===`recording-pending`)return{kind:`pending`};let n=e.recording;return n?.status===`available`&&n.embedUrl?{kind:`recording`,embedUrl:n.embedUrl}:n&&n.status!==`unavailable`&&e.originalUrl?{kind:`original`,url:e.originalUrl}:{kind:n||t?.state===`recorded`?`unavailable`:`none`}}function jt({material:e,content:t,links:n,backLink:r,titleInIntro:i=!1}){return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(`a`,{className:`back-link`,href:r?.href??n.month,children:r?.label??`← К месяцу`}),i?null:(0,M.jsxs)(`div`,{className:`study-title`,children:[(0,M.jsx)(`h1`,{id:`screen-title`,tabIndex:-1,children:e.title}),e.quiz?(0,M.jsx)(K,{label:`Как пройти тренажёр`,children:(0,M.jsx)(`p`,{children:`Выберите и проверьте каждый ответ. Ошибки не мешают завершению. Изменение ответа снимает его проверку.`})}):null]}),(0,M.jsx)(`p`,{className:`muted study-meta`,children:[N[e.format],e.author,t.month,e.minutes&&`${e.minutes} минут`].filter(Boolean).join(` · `)}),!e.recording&&e.originalUrl&&!c(e.readingLayout,e.paragraphs,e.resources.map(e=>e.id))?(0,M.jsx)(`p`,{children:(0,M.jsx)(`a`,{href:e.originalUrl,target:`_blank`,rel:`noreferrer`,children:`Открыть оригинальный урок ↗`})}):null]})}function Mt(e){let{material:t,content:n}=e,r=n.assignments?.filter(e=>e.materialIds.includes(t.id))??[],i=r.length===1&&c(r[0].readingLayout,r[0].instructions)&&r[0].readingLayout[0].kind===`intro`;return r.length?(0,M.jsxs)(`section`,{className:`material-note`,children:[i?null:(0,M.jsxs)(`div`,{className:`compact-title`,children:[(0,M.jsx)(`h2`,{children:`Задания`}),(0,M.jsxs)(K,{label:`О заданиях`,children:[(0,M.jsx)(`p`,{children:`Ответы не отправляются на проверку.`}),(0,M.jsx)(`p`,{children:`Ответ и выполнение общие для всех связанных материалов месяца. Удаление из плана их не стирает.`})]})]}),r.map(t=>(0,M.jsx)(q,{...e,assignment:t},t.id))]}):null}function Nt({material:e,compact:t=!1,exclude:n=[]}){let r=e.resources.filter(r=>!n.includes(r.id)&&(!t||r.status!==`unavailable`&&(r.url!==e.originalUrl||r.kind===`attachment`)));return r.length?(0,M.jsxs)(`section`,{className:`material-resources`,children:[(0,M.jsx)(`h2`,{children:`Связанные материалы`}),(0,M.jsx)(`ul`,{children:r.map(e=>(0,M.jsxs)(`li`,{children:[(0,M.jsxs)(`div`,{children:[t?(0,M.jsxs)(`div`,{className:`compact-title`,children:[(0,M.jsx)(`h3`,{children:e.title}),e.description?(0,M.jsx)(K,{label:`О материале «${e.title}»`,children:(0,M.jsx)(`p`,{children:e.description})}):null]}):(0,M.jsx)(`h3`,{children:e.title}),!t&&e.description?(0,M.jsx)(`p`,{children:e.description}):null,e.status===`available`?null:(0,M.jsx)(`p`,{className:`muted`,children:e.status===`unavailable`?`Недоступно`:`Доступно через оригинал`})]}),e.url&&(!t||e.status!==`unavailable`)?(0,M.jsxs)(`a`,{href:e.url,target:`_blank`,rel:`noreferrer`,children:[e.kind===`attachment`&&e.status===`available`?e.url.endsWith(`.pdf`)?`Открыть PDF`:`Скачать файл`:`К источнику`,` ↗`]}):null]},e.id))})]}):null}function Pt({material:e,event:t,adapted:n=!1}){let r=At(e,t);if(r.kind===`none`)return null;let i=t?.title&&t.title!==e.title?t.title:r.kind===`live`?`Встреча`:`Запись встречи`;return(0,M.jsxs)(`section`,{className:`recording`,"aria-label":i,children:[(0,M.jsx)(`h2`,{children:i}),t?(0,M.jsxs)(`div`,{className:`meeting-meta`,children:[(0,M.jsxs)(`p`,{children:[(0,M.jsx)(B,{size:17,"aria-hidden":`true`}),t.date]}),(0,M.jsxs)(`p`,{children:[(0,M.jsx)(bt,{size:17,"aria-hidden":`true`}),t.host]})]}):null,r.kind===`recording`?(0,M.jsx)(`iframe`,{src:r.embedUrl,title:`Запись: ${e.title}`,allow:`autoplay; fullscreen; picture-in-picture; encrypted-media`,allowFullScreen:!0}):r.kind===`live`?(0,M.jsx)(F,{href:r.url,target:`_blank`,rel:`noreferrer`,children:`Подключиться к встрече ↗`}):r.kind===`pending`?(0,M.jsx)(`p`,{role:`status`,children:`Запись готовится`}):r.kind===`original`?(0,M.jsx)(F,{href:r.url,target:`_blank`,rel:`noreferrer`,children:`Смотреть запись в оригинале ↗`}):(0,M.jsx)(`p`,{className:`muted`,children:`Запись пока недоступна.`}),n?e.resources.filter(e=>e.kind===`attachment`&&e.status!==`unavailable`&&e.url).map(e=>(0,M.jsxs)(`a`,{className:`recording-attachment`,href:e.url,target:`_blank`,rel:`noreferrer`,children:[(0,M.jsx)(ut,{size:22,"aria-hidden":`true`}),(0,M.jsx)(`span`,{children:e.title}),(0,M.jsxs)(`span`,{className:`muted`,children:[e.status===`original`?`В исходном уроке`:e.url.endsWith(`.pdf`)?`PDF`:`Файл`,` ↗`]})]},e.id)):null]})}function Ft(e){let{material:t,session:n,dispatch:r,links:i}=e,a=!!n.materials[t.id]?.viewed,o=c(t.readingLayout,t.paragraphs,t.resources.map(e=>e.id))?t.readingLayout:void 0,s=o?.[0],l=s?.kind===`intro`&&x(t.paragraphs[s.from])[s.titleLine].localeCompare(t.title,`ru`,{sensitivity:`base`})===0,u=e.content.events?.find(e=>e.materialId===t.id),d=o?.flatMap(e=>e.kind===`section`&&e.link?[e.link.resourceId]:[])??[],f=o&&At(t,u).kind!==`none`?t.resources.filter(e=>e.kind===`attachment`&&e.status!==`unavailable`&&e.url).map(e=>e.id):[];return(0,M.jsxs)(`main`,{className:`product-main reading-page${o?` adapted-material`:``}`,children:[(0,M.jsx)(jt,{...e,titleInIntro:l}),o?null:(0,M.jsx)(Pt,{material:t,event:u},t.id),t.contentStatus===`unavailable`?(0,M.jsx)(`p`,{role:`status`,children:`Учебное содержание в исходной странице отсутствует.`}):null,o?(0,M.jsx)(Dt,{paragraphs:t.paragraphs,layout:o,marks:t.readingMarks,resources:t.resources,headingLevel:l?1:2,titleId:l?`screen-title`:void 0}):(0,M.jsx)(`div`,{className:`material-body`,children:t.paragraphs.map((e,t)=>(0,M.jsx)(`p`,{className:`user-text`,children:e},t))}),o?(0,M.jsx)(Pt,{material:t,event:u,adapted:!0},t.id):null,(0,M.jsx)(Nt,{material:t,compact:!!o,exclude:[...d,...f]}),(0,M.jsx)(Mt,{...e}),(0,M.jsxs)(`div`,{className:`screen-actions`,children:[t.contentStatus===`unavailable`?null:(0,M.jsx)(P,{disabled:a,onClick:()=>r({type:`view-material`,materialId:t.id}),children:a?`Просмотрено`:`Отметить как просмотренное`}),(0,M.jsxs)(`a`,{href:e.backLink?.href??i.month,children:[e.backLink?`К результатам поиска`:`К материалам месяца`,` →`]})]}),(0,M.jsx)(`span`,{className:`visually-hidden`,role:`status`,children:a?`Просмотр отмечен.`:``})]})}function It(e){let{material:t,session:n,dispatch:r,links:i}=e,a=y(t);return(0,M.jsxs)(`main`,{className:`product-main reading-page quiz-page`,children:[(0,M.jsx)(jt,{...e}),(0,M.jsx)(de,{paragraphs:t.paragraphs}),(0,M.jsx)(He,{pending:!!n.exerciseDrafts[a.key],definition:a,record:n.exerciseDrafts[a.key]??n.exerciseResults[a.key],title:`Тренажёр: ${t.title}`,save:e.saveExercise??(async(e,t)=>(r({type:`save-exercise`,definition:e,payload:t}),{storage:`session`}))}),(0,M.jsx)(Nt,{material:t}),(0,M.jsx)(Mt,{...e}),(0,M.jsxs)(`div`,{className:`screen-actions`,children:[(0,M.jsx)(F,{href:i.month,children:`К месяцу`}),(0,M.jsx)(`a`,{href:i.reflection,children:`Личный вывод`})]})]})}function J({name:e}){let t={arrow:(0,M.jsx)(M.Fragment,{children:(0,M.jsx)(`path`,{d:`M4 12h15M13 6l6 6-6 6`})}),chevron:(0,M.jsx)(`path`,{d:`m6 9 6 6 6-6`}),file:(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(`path`,{d:`M6 3h8l4 4v14H6z`}),(0,M.jsx)(`path`,{d:`M14 3v5h4`})]}),download:(0,M.jsx)(M.Fragment,{children:(0,M.jsx)(`path`,{d:`M12 3v12m-4-4 4 4 4-4M5 16v4h14v-4`})})};return(0,M.jsx)(`svg`,{className:`icon icon--${e}`,width:`24`,height:`24`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.7`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`,focusable:`false`,children:t[e]})}function Y({children:e,message:t}){let[n,r]=(0,O.useState)(!1),i=(0,O.useId)();return(0,M.jsxs)(`div`,{className:`boundary`,children:[(0,M.jsx)(P,{variant:`text`,onClick:()=>r(e=>!e),"aria-expanded":n,"aria-controls":n?i:void 0,children:e}),n?(0,M.jsx)(W,{id:i,children:t}):null]})}var Lt={calendar:`finhealth.widget-expanded.v1.calendar`,planner:`finhealth.widget-expanded.v1.planner`},Rt=()=>typeof window>`u`?void 0:window.localStorage;function zt(e,t=Rt){try{return t()?.getItem(Lt[e])!==`false`}catch{return!0}}function Bt(e,t,n=Rt){try{let r=n();return r?(r.setItem(Lt[e],String(t)),!0):!1}catch{return!1}}function Vt(e){let[t,n]=(0,O.useState)(()=>zt(e)),[r,i]=(0,O.useState)(!1);function a(){let r=!t;n(r),i(!Bt(e,r))}return{isOpen:t,toggle:a,storageError:r}}function X({text:e}){let[t,n]=(0,O.useState)(!1),r=e.length>200;return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(`p`,{className:`planner-widget-text`,children:r&&!t?`${e.slice(0,180).trimEnd()}…`:e}),r?(0,M.jsx)(`button`,{type:`button`,className:`planner-widget-link`,"aria-expanded":t,onClick:()=>n(e=>!e),children:t?`Свернуть`:`Показать полностью`}):null]})}function Ht({assignment:e,session:t,dispatch:n,saveExercise:r,plannerHref:i}){let a=_(e),o=t.exerciseResults[a.key],c=t.exerciseDrafts[a.key],[l,u]=(0,O.useState)(!1),[f,p]=(0,O.useState)(null),m=s(a.manifest,d)&&(!o||s(o.manifest,a.manifest))&&(!c||s(c.manifest,a.manifest)),h=o?.status===`completed`;async function g(e){u(!0);try{let t=w({...v(c??o),done:e});r?await r(a,t):n({type:`save-exercise`,definition:a,payload:t}),p(null)}catch{p(e)}finally{u(!1)}}return(0,M.jsxs)(`li`,{className:`planner-widget-club-task`,children:[(0,M.jsxs)(`div`,{className:`planner-widget-task${h?` is-done`:``}`,children:[m?(0,M.jsx)(`input`,{type:`checkbox`,"aria-label":e.title,checked:h,disabled:l,onChange:e=>void g(e.target.checked)}):h?(0,M.jsx)(at,{size:17,"aria-label":`Выполнено`}):null,(0,M.jsx)(`a`,{href:i,children:e.title})]}),l?(0,M.jsx)(`p`,{className:`planner-widget-notice`,role:`status`,children:`Сохраняем отметку…`}):m&&(f!==null||c)?(0,M.jsxs)(`p`,{className:`planner-widget-error`,role:`alert`,children:[`Изменения задания не сохранены. `,(0,M.jsx)(`button`,{type:`button`,onClick:()=>void g(f??v(c).done),children:`Повторить сохранение`})]}):null]})}function Ut({content:e,session:t,dispatch:n,plannerHref:r,saveExercise:i,className:a=``}){let o=(0,O.useId)(),{isOpen:s,toggle:c,storageError:l}=Vt(`planner`),u=t.planner,d=e.assignments??[],f=u.assignmentIds.flatMap(e=>{let t=d.find(t=>t.id===e);return t?[t]:[]}),[p]=(0,O.useState)(()=>d.filter(e=>!u.assignmentIds.includes(e.id)).slice(0,2).map(e=>e.id)),m=d.filter(e=>p.includes(e.id)),[h,g]=(0,O.useState)(!1),[v,y]=(0,O.useState)(``),[b,x]=(0,O.useState)(``),S=f.length+u.tasks.length,C=f.filter(e=>t.exerciseResults[_(e).key]?.status===`completed`).length+u.tasks.filter(e=>e.done).length,w=h?f:f.slice(0,3),T=h?u.tasks:u.tasks.slice(0,Math.max(0,3-w.length)),E=[[`earned`,`Заработано`],[`spent`,`Потрачено`],[`invested`,`Отложено / инвестировано`]].filter(([e])=>u[e].trim()),D=E.length>0||!!u.satisfaction;function ee(e){if(e.preventDefault(),!u.taskDraft?.trim()){y(`Напишите, что хотите сделать.`);return}if(u.tasks.length>=200){y(`В плане уже 200 своих задач. Удалите ненужные в планере, чтобы добавить новую.`);return}n({type:`add-personal-task`,id:crypto.randomUUID(),title:u.taskDraft}),g(!0),y(``),x(`Своя задача добавлена в план.`)}return(0,M.jsxs)(`section`,{className:`planner-widget ${a}`,"aria-labelledby":`${o}-title`,children:[(0,M.jsx)(`header`,{className:`planner-widget-header`,children:(0,M.jsx)(`h2`,{className:`widget-heading`,id:`${o}-title`,children:(0,M.jsxs)(`button`,{type:`button`,className:`widget-toggle`,"aria-expanded":s,"aria-controls":`${o}-body`,onClick:c,children:[(0,M.jsx)(H,{className:`widget-heading-icon`,size:20,"aria-hidden":`true`}),(0,M.jsx)(`span`,{children:`Мой план`}),(0,M.jsx)(V,{className:`widget-toggle-chevron`,size:18,"aria-hidden":`true`})]})})}),l?(0,M.jsx)(`p`,{className:`widget-storage-error`,role:`status`,children:`Не удалось запомнить вид плана. Попробуйте переключить ещё раз.`}):null,(0,M.jsxs)(`div`,{id:`${o}-body`,className:`widget-disclosure-body`,hidden:!s,children:[(0,M.jsxs)(`div`,{className:`planner-widget-meta`,children:[(0,M.jsxs)(`div`,{className:`planner-widget-title`,children:[(0,M.jsx)(`p`,{className:`planner-widget-month`,children:e.month}),(0,M.jsx)(K,{label:`О личном плане`,children:(0,M.jsx)(`p`,{children:`Добавляйте свои задачи и выбирайте задания клуба. Бинго и тренажёры выполняются внутри задания.`})})]}),(0,M.jsxs)(`a`,{className:`planner-widget-link`,href:r,children:[`Планер`,(0,M.jsx)(et,{size:15,"aria-hidden":`true`})]})]}),u.goal.trim()?(0,M.jsxs)(`div`,{className:`planner-widget-goal`,children:[(0,M.jsx)(`h3`,{children:`Цель месяца`}),(0,M.jsx)(X,{text:u.goal})]}):null,u.dates.trim()||u.ideas.trim()?(0,M.jsxs)(`div`,{className:`planner-widget-context`,children:[u.dates.trim()?(0,M.jsxs)(`div`,{children:[(0,M.jsxs)(`h3`,{children:[(0,M.jsx)(B,{size:14,"aria-hidden":`true`}),`Важные даты`]}),(0,M.jsx)(X,{text:u.dates})]}):null,u.ideas.trim()?(0,M.jsxs)(`div`,{children:[(0,M.jsxs)(`h3`,{children:[(0,M.jsx)(mt,{size:14,"aria-hidden":`true`}),`Мысли`]}),(0,M.jsx)(X,{text:u.ideas})]}):null]}):null,(0,M.jsxs)(`div`,{className:`planner-widget-work`,children:[(0,M.jsxs)(`div`,{className:`planner-widget-section-title`,children:[(0,M.jsx)(`h3`,{children:`В моём плане`}),S?(0,M.jsxs)(`span`,{children:[C,` из `,S,` выполнено`]}):null]}),S?(0,M.jsxs)(`ul`,{className:`planner-widget-tasks`,children:[w.map(e=>(0,M.jsx)(Ht,{assignment:e,session:t,dispatch:n,saveExercise:i,plannerHref:r},e.id)),T.map(e=>(0,M.jsx)(`li`,{children:(0,M.jsxs)(`label`,{className:`planner-widget-task${e.done?` is-done`:``}`,children:[(0,M.jsx)(`input`,{type:`checkbox`,checked:e.done,onChange:t=>n({type:`edit-personal-task`,id:e.id,patch:{done:t.target.checked}})}),(0,M.jsx)(`span`,{children:e.title})]})},e.id))]}):(0,M.jsx)(`p`,{className:`planner-widget-empty`,children:`В плане пока нет задач.`}),S>3?(0,M.jsx)(`button`,{type:`button`,className:`planner-widget-link`,"aria-expanded":h,onClick:()=>g(e=>!e),children:h?`Свернуть список`:`Ещё ${S-3}`}):null,(0,M.jsxs)(`form`,{className:`planner-widget-add`,onSubmit:ee,noValidate:!0,children:[(0,M.jsx)(`label`,{htmlFor:`${o}-task`,children:`Своя задача`}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`input`,{id:`${o}-task`,maxLength:300,value:u.taskDraft??``,placeholder:`Что хочу сделать`,"aria-invalid":!!v,"aria-describedby":v?`${o}-error`:void 0,onChange:e=>{n({type:`edit-planner`,field:`taskDraft`,value:e.target.value}),y(``)}}),(0,M.jsx)(`button`,{type:`submit`,"aria-label":`Добавить задачу`,disabled:!u.taskDraft?.trim(),children:(0,M.jsx)(U,{size:18,"aria-hidden":`true`})})]}),v?(0,M.jsx)(`p`,{className:`planner-widget-error`,id:`${o}-error`,role:`alert`,children:v}):null]})]}),m.length?(0,M.jsxs)(`div`,{className:`planner-widget-suggestions`,children:[(0,M.jsx)(`h3`,{children:`Можно взять из клуба`}),m.map(e=>{let t=u.assignmentIds.includes(e.id);return(0,M.jsxs)(`button`,{type:`button`,disabled:t,"aria-label":`${t?`В плане`:`В план`}: ${e.title}`,onClick:()=>{n({type:`plan-assignment`,id:e.id,added:!0}),g(!0),x(`Добавлено в план: ${e.title}`)},children:[(0,M.jsx)(`span`,{children:e.title}),(0,M.jsxs)(`span`,{className:`planner-widget-offer-action`,children:[t?(0,M.jsx)(at,{size:14,"aria-hidden":`true`}):(0,M.jsx)(U,{size:14,"aria-hidden":`true`}),t?`В плане`:`В план`]})]},e.id)})]}):null,D?(0,M.jsxs)(`section`,{className:`planner-widget-totals`,"aria-labelledby":`${o}-totals`,children:[(0,M.jsx)(`h3`,{id:`${o}-totals`,children:`Итоги месяца`}),E.length?(0,M.jsx)(`dl`,{children:E.map(([e,t])=>(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`dt`,{children:t}),(0,M.jsx)(`dd`,{children:u[e]})]},e))}):null,u.satisfaction?(0,M.jsxs)(`p`,{className:`planner-widget-rating`,children:[`Финансовая удовлетворённость `,(0,M.jsxs)(`strong`,{children:[u.satisfaction,` из 5`]})]}):null]}):null,(0,M.jsx)(`p`,{className:`visually-hidden`,role:`status`,children:b})]})]})}var Wt={article:nt,video:St,quiz:H,collection:ft};function Z({format:e,size:t=18}){let n=Wt[e];return(0,M.jsx)(n,{size:t,"aria-hidden":`true`})}function Gt({material:e,session:t,content:n,href:r,library:i=!1,month:a,hideFormat:o=!1,continueReading:s=!1}){let c=(0,O.useId)(),l=i?`h2`:`h3`,u=i?void 0:n.events?.find(t=>t.materialId===e.id)?.date,d=T(t,e),f=e.contentStatus===`unavailable`?`Материал отсутствует`:d?e.format===`quiz`?`Тренажёр выполнен`:`Просмотрено`:s?`Продолжить`:null,p=i?[!o&&N[e.format],a]:[N[e.format],e.author,u];return(0,M.jsxs)(`a`,{className:`material-row${i?` material-row--library`:``}`,href:r,"aria-labelledby":`${c}-title`,"aria-describedby":`${c}-details${i&&f?` ${c}-status`:``}`,children:[i?null:(0,M.jsx)(`span`,{className:`material-row-format`,children:(0,M.jsx)(Z,{format:e.format})}),(0,M.jsxs)(`div`,{className:`material-row-copy`,children:[(0,M.jsx)(l,{id:`${c}-title`,children:e.title}),i&&e.author?(0,M.jsx)(`p`,{className:`material-row-author`,children:e.author}):null,i?null:(0,M.jsxs)(`p`,{id:`${c}-details`,className:`material-row-meta`,children:[p.filter(Boolean).join(` · `),f?(0,M.jsxs)(M.Fragment,{children:[` · `,(0,M.jsx)(`span`,{className:`material-row-completed`,children:f})]}):null]})]}),i?(0,M.jsxs)(`div`,{className:`material-row-side`,children:[(0,M.jsx)(`p`,{id:`${c}-details`,className:`material-row-meta`,children:p.filter(Boolean).join(` · `)}),f?(0,M.jsx)(`span`,{id:`${c}-status`,className:`material-row-status`,children:f}):null]}):null,(0,M.jsx)(J,{name:`arrow`})]})}function Kt({content:e}){return(0,M.jsxs)(`section`,{className:`month-news`,children:[(0,M.jsxs)(`div`,{className:`compact-title`,children:[(0,M.jsx)(`h2`,{children:`Новости`}),e.newsStatus===`unavailable`?(0,M.jsx)(K,{label:`О выпуске новостей`,children:(0,M.jsx)(`p`,{children:e.news})}):null]}),(0,M.jsx)(`p`,{className:`muted`,children:e.newsStatus===`unavailable`?`Выпуск этого месяца недоступен.`:e.news})]})}var qt=[{key:`consumption`,wide:`/FinHealth-demo/assets/hero-wide-DxglV9zy.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-abmDUc0X.webp`,square:`/FinHealth-demo/assets/program-square-DSmffvXZ.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-CkLPO4lR.webp`},{key:`psychology`,wide:`/FinHealth-demo/assets/hero-wide-BNCrl7Po.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-Rqjc1q_s.webp`,square:`/FinHealth-demo/assets/program-square-BLoJYEc7.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-B_td8y-L.webp`},{key:`budget`,wide:`/FinHealth-demo/assets/hero-wide-lkyqJgV8.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-DMt2rDtQ.webp`,square:`/FinHealth-demo/assets/program-square-D7GSO86y.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-B-TDClBG.webp`},{key:`shopping`,wide:`/FinHealth-demo/assets/hero-wide-D1t8hVzX.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-D6BhScnY.webp`,square:`/FinHealth-demo/assets/program-square-D0USFJ6i.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-Bc3SzZ86.webp`},{key:`ecology`,wide:`/FinHealth-demo/assets/hero-wide-CTSsor2h.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-B33wdNK3.webp`,square:`/FinHealth-demo/assets/program-square-BvoXdI1u.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-BF0BAWeT.webp`},{key:`marketplaces`,wide:`/FinHealth-demo/assets/hero-wide-BlSv2sDB.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-C_ayEsTf.webp`,square:`/FinHealth-demo/assets/program-square-728y6RWf.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-BKhhwmEQ.webp`},{key:`quality`,wide:`/FinHealth-demo/assets/hero-wide-eFZvtDH4.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-Cgbgh5KU.webp`,square:`/FinHealth-demo/assets/program-square-CWVG6N-f.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-lzFcvq5m.webp`},{key:`family`,wide:`/FinHealth-demo/assets/hero-wide-Ba9q5fD2.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-wNiynAd5.webp`,square:`/FinHealth-demo/assets/program-square-vwghiM2C.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-Ct3q6Ew6.webp`},{key:`sharing`,wide:`/FinHealth-demo/assets/hero-wide-Ce_K2CJh.webp`,landscape:`/FinHealth-demo/assets/cover-landscape-BQCXzEme.webp`,square:`/FinHealth-demo/assets/program-square-BAq_zC4w.webp`,portrait:`/FinHealth-demo/assets/mobile-portrait-BcaNzxIB.webp`}];function Jt(e,t){let n=t?t.theme===e?t.key:void 0:e?.startsWith(`Культура шеринга`)?`sharing`:void 0;return qt.find(e=>e.key===n)}function Yt(e,t){return!!Jt(e,t)}function Xt({theme:e,binding:t,format:n,priority:r=!1}){let i=Jt(e,t);if(!i)return null;let{wide:a,landscape:o,square:s,portrait:c}=i,l=n===`wide`?[a,2160,720]:n===`landscape`||n===`card`?[o,1600,900]:[s,1200,1200];return(0,M.jsxs)(`picture`,{className:`month-artwork month-artwork--${n}`,"data-artwork":i.key,"aria-hidden":`true`,children:[n!==`square`&&n!==`card`?(0,M.jsx)(`source`,{media:`(max-width: 600px)`,srcSet:c,width:1080,height:1440}):null,(0,M.jsx)(`img`,{src:l[0],width:l[1],height:l[2],alt:``,decoding:`async`,loading:r?`eager`:`lazy`,fetchPriority:r?`high`:`auto`})]})}var Zt=()=>window.matchMedia(`(max-width: 1050px)`).matches;function Qt(e){let t=window.matchMedia(`(max-width: 1050px)`);return t.addEventListener(`change`,e),()=>t.removeEventListener(`change`,e)}function $t({session:e,content:t,links:n,currentMonthLink:r,dispatch:i,saveExercise:a}){let o=(0,O.useId)(),s=(0,O.useSyncExternalStore)(Qt,Zt,()=>!1),c=h(e,t),l=t.rubrics??[...new Set(t.materials.map(e=>e.rubric))],u=t.events?.filter(e=>!t.materials.some(t=>t.id===e.materialId))??[],d=t.newsStatus!==`unavailable`&&!!t.news,f=(0,M.jsxs)(`header`,{className:`club-month-hero${Yt(t.theme,t.artwork)?` club-month-hero--illustrated`:``}`,children:[(0,M.jsxs)(`div`,{className:`club-month-heading`,children:[(0,M.jsx)(`p`,{className:`eyebrow`,children:t.month}),(0,M.jsx)(`h1`,{id:`screen-title`,tabIndex:-1,children:t.theme}),t.question.trim()?(0,M.jsx)(`p`,{className:`club-month-question`,children:t.question}):null]}),Yt(t.theme,t.artwork)?(0,M.jsx)(Xt,{binding:t.artwork,theme:t.theme,format:`landscape`,priority:!0}):null,t.introduction.trim()?(0,M.jsx)(`div`,{className:`club-month-introduction`,children:t.introduction.trim().split(/\n\s*\n/).map((e,t)=>(0,M.jsx)(`p`,{children:e},t))}):null]},`hero`),p=(0,M.jsxs)(`section`,{className:`club-month-materials`,"aria-label":`Материалы месяца`,children:[l.map((r,i)=>(0,M.jsxs)(`section`,{className:`club-month-panel club-month-rubric`,"aria-labelledby":`${o}-rubric-${i}`,children:[(0,M.jsx)(`h2`,{id:`${o}-rubric-${i}`,children:r}),(0,M.jsx)(`ul`,{className:`material-list`,children:t.materials.filter(e=>e.rubric===r).map(r=>(0,M.jsx)(`li`,{children:(0,M.jsx)(Gt,{material:r,session:e,content:t,continueReading:c?.kind===`material`&&c.materialId===r.id,href:`${n.month}/material/${r.id}`})},r.id))})]},r)),!t.materials.some(e=>e.quiz)&&(t.practice.light.length>0||t.practice.advanced.length>0)?(0,M.jsxs)(`a`,{className:`club-month-panel club-month-extra`,href:n.practice,children:[(0,M.jsx)(`span`,{className:`material-row-format`,children:(0,M.jsx)(Z,{format:`quiz`})}),(0,M.jsxs)(`span`,{children:[t.practice.title,(0,M.jsx)(`span`,{className:`muted`,children:b(e,t)?`Практика выполнена`:c?.kind===`practice`?`Продолжить`:`Тренажёр`})]}),(0,M.jsx)(J,{name:`arrow`})]}):null,t.upcoming?(0,M.jsxs)(`a`,{className:`club-month-panel club-month-extra`,href:n.scheduled,children:[(0,M.jsx)(`span`,{className:`material-row-format`,children:(0,M.jsx)(B,{size:18,"aria-hidden":`true`})}),(0,M.jsxs)(`span`,{children:[t.upcoming.title,(0,M.jsxs)(`span`,{className:`muted`,children:[`Откроется `,t.upcoming.opens]})]}),(0,M.jsx)(J,{name:`arrow`})]}):null]},`materials`),m=(0,M.jsx)(Ut,{content:t,session:e,dispatch:i,saveExercise:a,plannerHref:n.planner},`planner`),g=e.reflectionSaved?(0,M.jsxs)(`section`,{className:`club-month-panel club-month-reflection`,"aria-labelledby":`${o}-reflection`,children:[(0,M.jsx)(`h2`,{id:`${o}-reflection`,children:`Мой вывод`}),(0,M.jsx)(`p`,{className:`user-text`,children:e.reflectionSaved}),(0,M.jsxs)(`a`,{className:`club-month-text-link`,href:n.reflection,children:[`Изменить вывод`,(0,M.jsx)(J,{name:`arrow`})]})]},`reflection`):(0,M.jsxs)(`a`,{className:`club-month-panel club-month-reflection-empty`,href:n.reflection,children:[`Записать вывод`,(0,M.jsx)(J,{name:`arrow`})]},`reflection`),_=u.length||t.event||d?(0,M.jsxs)(`div`,{className:`club-month-extras`,children:[u.map(e=>(0,M.jsxs)(`section`,{className:`club-month-panel`,children:[(0,M.jsx)(`h2`,{children:e.title}),(0,M.jsxs)(`p`,{className:`muted`,children:[e.date,` · `,e.host]})]},e.materialId)),t.event?(0,M.jsxs)(`section`,{className:`club-month-panel`,children:[(0,M.jsx)(`h2`,{children:t.event.recorded?`Встреча месяца`:`Ближайшая встреча`}),(0,M.jsx)(`h3`,{children:t.event.title}),(0,M.jsxs)(`p`,{className:`muted`,children:[t.event.date,` · `,t.event.host]}),(0,M.jsx)(Y,{message:`Карточка эфира ещё не реализована.`,children:`О встрече`})]}):null,d?(0,M.jsx)(Kt,{content:t}):null]},`extras`):null;return(0,M.jsxs)(`main`,{className:`product-main month-page club-month`,children:[n.month===r?null:(0,M.jsx)(`nav`,{className:`month-breadcrumbs`,"aria-label":`Навигация месяца`,children:(0,M.jsx)(`a`,{href:r,children:`К текущему месяцу →`})}),(0,M.jsx)(`div`,{className:`club-month-grid`,children:s?(0,M.jsxs)(M.Fragment,{children:[f,p,m,g,_]}):(0,M.jsxs)(M.Fragment,{children:[(0,M.jsxs)(`div`,{className:`club-month-column club-month-column-main`,children:[f,p]}),(0,M.jsxs)(`div`,{className:`club-month-column club-month-column-side`,children:[m,g,_]})]})})]})}function Q({children:e,eyebrow:t,help:n}){return(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(`p`,{className:`eyebrow`,children:t}),(0,M.jsxs)(`div`,{className:`study-title`,children:[(0,M.jsx)(`h1`,{id:`screen-title`,tabIndex:-1,children:e}),n]})]})}function $({links:e}){return(0,M.jsx)(`a`,{className:`back-link`,href:e.month,children:`← К месяцу`})}function en({links:e}){return(0,M.jsx)(`div`,{className:`file-links`,children:(0,M.jsxs)(`a`,{href:e.planner,children:[(0,M.jsx)(J,{name:`file`}),(0,M.jsx)(`span`,{children:`Открыть планер и задачи месяца`}),(0,M.jsx)(J,{name:`arrow`})]})})}function tn(e){let t=e.content.materials.find(t=>t.id===e.materialId)??e.content.materials[0];return t.quiz?(0,M.jsx)(It,{...e,material:t}):(0,M.jsx)(Ft,{...e,material:t})}function nn({content:e,links:t}){return e.upcoming?(0,M.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,M.jsx)($,{links:t}),(0,M.jsx)(Q,{eyebrow:`Будущий материал`,children:e.upcoming.title}),(0,M.jsxs)(`p`,{className:`muted`,children:[`Откроется `,e.upcoming.opens]}),(0,M.jsxs)(`div`,{className:`screen-actions`,children:[(0,M.jsx)(F,{href:t.material,children:`Открыть доступный материал`}),(0,M.jsx)(`a`,{href:t.practice,children:`К практике месяца →`})]})]}):(0,M.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,M.jsx)($,{links:t}),(0,M.jsx)(Q,{eyebrow:e.month,children:`Будущий материал не объявлен`})]})}function rn(e){let t=e.content.materials.find(e=>e.quiz);return t?(0,M.jsx)(It,{...e,material:t}):!e.content.practice.light.length&&!e.content.practice.advanced.length?(0,M.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,M.jsx)($,{links:e.links}),(0,M.jsx)(Q,{eyebrow:e.content.month,children:`Практика в материалах месяца`}),(0,M.jsx)(`p`,{children:`Отдельное упражнение здесь не опубликовано. Задания и ссылки на оригинальные тренажёры находятся в материалах.`})]}):(0,M.jsx)(an,{...e})}function an({session:e,content:t,dispatch:n,savePractice:r,links:i}){let a=e.practiceDraft;return(0,M.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,M.jsx)($,{links:i}),(0,M.jsx)(Q,{eyebrow:`${t.month} · тренажёр месяца`,help:(0,M.jsx)(K,{label:`О тренажёре`,children:(0,M.jsx)(`p`,{children:`Выберите вариант, выполните шаги и сохраните отметку выполнения. Заметка — для вас, без проверки экспертом.`})}),children:t.practice.title}),(0,M.jsxs)(`form`,{onSubmit:e=>{e.preventDefault(),r()},children:[(0,M.jsx)(Ct,{legend:`Какой вариант вам подходит?`,value:a.level,options:[{value:`light`,label:`Лёгкий · один вопрос`},{value:`advanced`,label:`Расширенный · общий план`}],onChange:e=>n({type:`edit-practice`,patch:{level:e}})}),(0,M.jsx)(`ol`,{className:`practice-instructions`,children:t.practice[a.level].map(e=>(0,M.jsx)(`li`,{children:e},e))}),(0,M.jsx)(en,{links:i}),(0,M.jsx)(G,{id:`practice-note`,label:`Мой результат`,rows:4,value:a.note,onChange:e=>n({type:`edit-practice`,patch:{note:e.target.value}})}),(0,M.jsx)(wt,{checked:a.done,onChange:e=>n({type:`edit-practice`,patch:{done:e.target.checked}}),children:`Практика выполнена`}),e.practiceStatus===`save-error`?(0,M.jsx)(W,{tone:`error`,children:`Не удалось сохранить результат. Ваш ввод на месте. Попробуйте ещё раз.`}):null,(0,M.jsxs)(`div`,{className:`screen-actions`,children:[(0,M.jsx)(P,{type:`submit`,children:e.practiceStatus===`save-error`?`Повторить сохранение`:`Сохранить результат`}),(0,M.jsx)(`a`,{href:i.reflection,children:`Сформулировать вывод →`})]}),e.practiceStatus===`saved`?(0,M.jsx)(W,{children:e.practiceSaved?.done?`Результат сохранён.`:`Черновик сохранён. Практика пока не выполнена.`}):null]}),(0,M.jsx)(Y,{message:`Вопросы появятся в карточке эфира. Этот экран ещё не реализован; ваша заметка никуда не отправлена.`,children:`Задать вопрос эксперту`})]})}function on({session:e,dispatch:t,saveReflection:n,links:r}){let i=e.reflectionStatus===`validation-error`;return(0,M.jsxs)(`main`,{className:`product-main reading-page`,children:[(0,M.jsx)($,{links:r}),(0,M.jsx)(Q,{eyebrow:`Личный итог месяца`,help:(0,M.jsx)(K,{label:`О личном выводе`,children:(0,M.jsx)(`p`,{children:`Достаточно одной мысли или правила для себя. Здесь нет правильного ответа или оценки.`})}),children:`Что вы заберёте из этого месяца?`}),(0,M.jsxs)(`form`,{noValidate:!0,onSubmit:e=>{e.preventDefault(),n()},children:[(0,M.jsx)(G,{id:`reflection-text`,label:`Моё правило на следующий месяц`,rows:5,value:e.reflectionDraft,error:i?`Запишите вывод или вернитесь к месяцу.`:void 0,onChange:e=>t({type:`edit-reflection`,text:e.target.value})}),e.reflectionStatus===`save-error`?(0,M.jsx)(W,{tone:`error`,children:`Не удалось сохранить вывод. Текст остался на месте. Попробуйте ещё раз.`}):null,(0,M.jsxs)(`div`,{className:`screen-actions`,children:[(0,M.jsx)(P,{type:`submit`,children:e.reflectionStatus===`save-error`?`Повторить сохранение`:`Сохранить вывод`}),(0,M.jsx)(`a`,{href:r.month,children:`Вернуться к месяцу`})]})]})]})}var sn={month:$t,material:tn,scheduled:nn,practice:rn,reflection:on,planner:kt};export{le as C,ue as D,j as E,k as O,N as S,ce as T,nt as _,Gt as a,F as b,Ut as c,J as d,q as f,B as g,V as h,Yt as i,Vt as l,H as m,sn as n,Kt as o,K as p,Xt as r,Z as s,tn as t,Y as u,et as v,se as w,P as x,z as y};