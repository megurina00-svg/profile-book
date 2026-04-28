'use strict';

// ============================================================
// 項目設定オブジェクト
// x, y, boxWidth はテンプレ画像サイズ（750×1050）基準の推定値
// 実機確認後、各値を微調整してください
// ============================================================
const FIELDS = [
  {
    key: 'name',            label: 'おなまえ',
    maxLength: 12,          maxLines: 1,
    fontSize: 26,           lineHeight: 0,
    x: 82,                  y: 207,
    boxWidth: 320,          boxHeight: 42,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'nickname',        label: 'ニックネーム',
    maxLength: 10,          maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 82,                  y: 268,
    boxWidth: 295,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'birthday',        label: 'たんじょうび',
    maxLength: 8,           maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 100,                 y: 338,
    boxWidth: 270,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: '例：6/15'
  },
  {
    key: 'zodiac',          label: '星座',
    maxLength: 5,           maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 82,                  y: 410,
    boxWidth: 140,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: '例：うお座'
  },
  {
    key: 'bloodType',       label: '血液型',
    maxLength: 2,           maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 327,                 y: 410,
    boxWidth: 60,           boxHeight: 38,
    align: 'center',        baseline: 'alphabetic',
    wrap: false,
    type: 'select',         options: ['', 'A', 'B', 'O', 'AB']
  },
  {
    key: 'address',         label: '住んでるところ',
    maxLength: 12,          maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 82,                  y: 480,
    boxWidth: 335,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'favoriteFood',    label: '好きな食べもの',
    maxLength: 12,          maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 82,                  y: 550,
    boxWidth: 295,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'dislikedFood',    label: 'きらいな食べもの',
    maxLength: 12,          maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 82,                  y: 620,
    boxWidth: 295,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'favoriteColor',   label: '好きな色',
    maxLength: 10,          maxLines: 1,
    fontSize: 20,           lineHeight: 0,
    x: 82,                  y: 690,
    boxWidth: 180,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'favoriteSubject', label: '好きな教科',
    maxLength: 10,          maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 82,                  y: 760,
    boxWidth: 310,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'weakSubject',     label: '苦手な教科',
    maxLength: 10,          maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 82,                  y: 830,
    boxWidth: 310,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'club',            label: '部活',
    maxLength: 10,          maxLines: 1,
    fontSize: 22,           lineHeight: 0,
    x: 82,                  y: 900,
    boxWidth: 310,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'hobby',           label: '趣味',
    maxLength: 9,           maxLines: 1,
    fontSize: 20,           lineHeight: 0,
    x: 500,                 y: 268,
    boxWidth: 188,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'skill',           label: '特技',
    maxLength: 9,           maxLines: 1,
    fontSize: 20,           lineHeight: 0,
    x: 500,                 y: 338,
    boxWidth: 195,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'myBoom',          label: 'マイブーム',
    maxLength: 9,           maxLines: 1,
    fontSize: 20,           lineHeight: 0,
    x: 500,                 y: 408,
    boxWidth: 180,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'favoriteType',    label: '好きなタイプ',
    maxLength: 9,           maxLines: 1,
    fontSize: 20,           lineHeight: 0,
    x: 500,                 y: 478,
    boxWidth: 175,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'dream',           label: '将来の夢',
    maxLength: 9,           maxLines: 1,
    fontSize: 20,           lineHeight: 0,
    x: 500,                 y: 548,
    boxWidth: 185,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'holiday',         label: '休みの日なにしてる？',
    maxLength: 10,          maxLines: 1,
    fontSize: 18,           lineHeight: 0,
    x: 500,                 y: 618,
    boxWidth: 185,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'wantNow',         label: '今いちばんほしいもの',
    maxLength: 9,           maxLines: 1,
    fontSize: 18,           lineHeight: 0,
    x: 500,                 y: 688,
    boxWidth: 180,          boxHeight: 38,
    align: 'left',          baseline: 'alphabetic',
    wrap: false,            placeholder: ''
  },
  {
    key: 'message',         label: 'ひとことメッセージ',
    maxLength: 54,          maxLines: 3,
    fontSize: 18,           lineHeight: 24,
    x: 490,                 y: 760,
    boxWidth: 200,          boxHeight: 175,
    align: 'left',          baseline: 'alphabetic',
    wrap: true,             placeholder: '自由に書いてね♪'
  }
];

// ============================================================
// 定数
// ============================================================
const FONT_FAMILY  = "'Kosugi Maru', 'Hiragino Maru Gothic ProN', 'BIZ UDPGothic', sans-serif";
const TEXT_COLOR   = '#333333';
const TEMPLATE_SRC = 'assets/profile-template.png';

// ============================================================
// 状態管理（「戻る」ボタン用）
// ============================================================
let savedFormValues = {};

// ============================================================
// 初期化
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildForm();
  document.getElementById('generate-btn').addEventListener('click', handleGenerate);
  document.getElementById('back-btn').addEventListener('click', showForm);
});

// ============================================================
// フォーム自動生成
// ============================================================
function buildForm() {
  const form = document.getElementById('profile-form');
  form.innerHTML = '';

  FIELDS.forEach(field => {
    const group = document.createElement('div');
    group.className = 'field-group';

    const label = document.createElement('label');
    label.className   = 'field-label';
    label.htmlFor     = field.key;
    label.textContent = field.label;
    group.appendChild(label);

    if (field.type === 'select') {
      group.appendChild(buildSelect(field));
    } else if (field.wrap) {
      group.appendChild(buildTextarea(field));
      group.appendChild(buildCharCounter(field));
    } else {
      group.appendChild(buildInput(field));
    }

    form.appendChild(group);
  });
}

function buildInput(field) {
  const el = document.createElement('input');
  el.type         = 'text';
  el.id           = field.key;
  el.name         = field.key;
  el.className    = 'field-input';
  el.maxLength    = field.maxLength;
  el.placeholder  = field.placeholder || '';
  el.autocomplete = 'off';

  // Enter キーで改行・送信しない
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') e.preventDefault();
  });

  return el;
}

function buildSelect(field) {
  const el = document.createElement('select');
  el.id        = field.key;
  el.name      = field.key;
  el.className = 'field-select';

  field.options.forEach(opt => {
    const option = document.createElement('option');
    option.value       = opt;
    option.textContent = opt === '' ? '（選ばない）' : opt;
    el.appendChild(option);
  });

  return el;
}

function buildTextarea(field) {
  const el = document.createElement('textarea');
  el.id          = field.key;
  el.name        = field.key;
  el.className   = 'field-textarea';
  el.maxLength   = field.maxLength;
  el.rows        = field.maxLines + 1;
  el.placeholder = field.placeholder || '';

  el.addEventListener('input', () => {
    updateCharCounter(field, el.value.length);
  });

  return el;
}

function buildCharCounter(field) {
  const counter = document.createElement('div');
  counter.className   = 'char-count';
  counter.id          = `${field.key}-count`;
  counter.textContent = `0 / ${field.maxLength}`;
  return counter;
}

function updateCharCounter(field, length) {
  const counter = document.getElementById(`${field.key}-count`);
  if (!counter) return;
  counter.textContent = `${length} / ${field.maxLength}`;
  counter.classList.toggle('near-limit', length >= Math.floor(field.maxLength * 0.8));
}

// ============================================================
// フォーム値の収集
// ============================================================
function collectFormData() {
  const data = {};
  FIELDS.forEach(field => {
    const el = document.getElementById(field.key);
    data[field.key] = el ? el.value.trim() : '';
  });
  return data;
}

// ============================================================
// フォーム値の復元（「戻る」押下時）
// ============================================================
function restoreFormValues(data) {
  FIELDS.forEach(field => {
    const el = document.getElementById(field.key);
    if (!el || data[field.key] === undefined) return;
    el.value = data[field.key];
    if (field.wrap) {
      updateCharCounter(field, data[field.key].length);
    }
  });
}

// ============================================================
// 生成ボタン処理
// ============================================================
async function handleGenerate() {
  savedFormValues = collectFormData();

  const btn = document.getElementById('generate-btn');
  btn.disabled    = true;
  btn.textContent = '生成中…';

  try {
    const dataURL = await renderProfileImage(savedFormValues);
    showPreview(dataURL);
  } catch (err) {
    console.error(err);
    alert('画像の生成に失敗しました。\nassets/profile-template.png が存在するか確認してください。');
  } finally {
    btn.disabled    = false;
    btn.textContent = '✨ 生成する';
  }
}

// ============================================================
// Canvas 描画：メイン
// ============================================================
async function renderProfileImage(data) {
  const templateImg = await loadImage(TEMPLATE_SRC);

  const canvas  = document.getElementById('canvas');
  canvas.width  = templateImg.naturalWidth;
  canvas.height = templateImg.naturalHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(templateImg, 0, 0);

  // Webフォント読み込み完了を待つ（ここを省略するとフォントがズレる）
  await document.fonts.ready;

  FIELDS.forEach(field => {
    const value = data[field.key];
    if (!value) return;
    drawField(ctx, field, value);
  });

  return canvas.toDataURL('image/png');
}

// ============================================================
// フィールド描画（1行 / 複数行の振り分け）
// ============================================================
function drawField(ctx, field, value) {
  ctx.save();
  ctx.font         = `${field.fontSize}px ${FONT_FAMILY}`;
  ctx.fillStyle    = TEXT_COLOR;
  ctx.textBaseline = field.baseline;

  if (field.wrap) {
    drawWrappedText(ctx, value, field);
  } else {
    drawSingleLineText(ctx, value, field);
  }

  ctx.restore();
}

// ============================================================
// 1行テキスト描画
// ============================================================
function drawSingleLineText(ctx, value, field) {
  ctx.textAlign = field.align;

  const drawX = field.align === 'center'
    ? field.x + field.boxWidth / 2
    : field.x;

  ctx.fillText(value.slice(0, field.maxLength), drawX, field.y);
}

// ============================================================
// 複数行テキスト描画（ひとことメッセージ専用）
// ============================================================
function drawWrappedText(ctx, value, field) {
  ctx.textAlign = 'left';

  const lines = breakIntoLines(ctx, value, field.boxWidth, field.maxLines);

  lines.forEach((line, i) => {
    ctx.fillText(line, field.x, field.y + i * field.lineHeight);
  });
}

// ============================================================
// 自動改行処理
// measureText で毎文字チェックし、boxWidth を超えたら折り返す
// ============================================================
function breakIntoLines(ctx, text, maxWidth, maxLines) {
  const lines = [];
  let currentLine = '';

  for (const char of text) {
    const candidate = currentLine + char;

    if (ctx.measureText(candidate).width > maxWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = char;

      if (lines.length >= maxLines) {
        currentLine = '';
        break;
      }
    } else {
      currentLine = candidate;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  return lines;
}

// ============================================================
// 画像読み込み（Promise化）
// ============================================================
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img   = new Image();
    img.onload  = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src     = src;
  });
}

// ============================================================
// プレビュー画面を表示
// ============================================================
function showPreview(dataURL) {
  document.getElementById('preview-img').src = dataURL;
  document.getElementById('form-screen').classList.add('hidden');
  document.getElementById('preview-screen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// フォーム画面に戻る（入力内容を保持）
// ============================================================
function showForm() {
  document.getElementById('preview-screen').classList.add('hidden');
  document.getElementById('form-screen').classList.remove('hidden');
  restoreFormValues(savedFormValues);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
