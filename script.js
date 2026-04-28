'use strict';

// ============================================================
// テンプレート画像の実サイズ（ px ）
// ここを変えると全座標が自動スケールされます
// ============================================================
const TMPL_W = 1055;
const TMPL_H = 1491;

// ============================================================
// フィールド定義
// x, y, w はすべて TMPL_W × TMPL_H を基準とした座標（px）
//   x  = テキスト描画開始 x
//   y  = テキストの baseline y（≒ 点線の高さ）
//   w  = 使用可能な横幅
//   fs = Canvas 描画フォントサイズ（px）
//   lh = 行間（wrap:true のみ使用）
// ============================================================
const FIELDS = [
  // ── 左カラム ──────────────────────────────
  { key:'name',            label:'おなまえ',
    x:108, y:302, w:445, fs:37, lh:0,  maxLength:12, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'nickname',        label:'ニックネーム',
    x:108, y:411, w:400, fs:31, lh:0,  maxLength:10, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'birthday',        label:'たんじょうび',
    x:145, y:519, w:350, fs:31, lh:0,  maxLength:8,  wrap:false, maxLines:1,
    kind:'text', placeholder:'6/15', align:'left' },

  { key:'zodiac',          label:'星座',
    x:108, y:627, w:192, fs:31, lh:0,  maxLength:5,  wrap:false, maxLines:1,
    kind:'text', placeholder:'うお座', align:'left' },

  { key:'bloodType',       label:'血液型',
    x:402, y:627, w:105, fs:31, lh:0,  maxLength:2,  wrap:false, maxLines:1,
    kind:'select', options:['','A','B','O','AB'], align:'center' },

  { key:'address',         label:'住んでるところ',
    x:108, y:735, w:445, fs:31, lh:0,  maxLength:12, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'favoriteFood',    label:'好きな食べもの',
    x:108, y:843, w:405, fs:31, lh:0,  maxLength:12, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'dislikedFood',    label:'きらいな食べもの',
    x:108, y:951, w:405, fs:31, lh:0,  maxLength:12, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'favoriteColor',   label:'好きな色',
    x:108, y:1059, w:252, fs:28, lh:0,  maxLength:10, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'favoriteSubject', label:'好きな教科',
    x:108, y:1167, w:430, fs:31, lh:0,  maxLength:10, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'weakSubject',     label:'苦手な教科',
    x:108, y:1275, w:430, fs:31, lh:0,  maxLength:10, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'club',            label:'部活',
    x:108, y:1383, w:430, fs:31, lh:0,  maxLength:10, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  // ── 右カラム ──────────────────────────────
  { key:'hobby',           label:'趣味',
    x:678, y:411, w:280, fs:28, lh:0,  maxLength:9,  wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'skill',           label:'特技',
    x:678, y:519, w:280, fs:28, lh:0,  maxLength:9,  wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'myBoom',          label:'マイブーム',
    x:678, y:627, w:265, fs:28, lh:0,  maxLength:9,  wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'favoriteType',    label:'好きなタイプ',
    x:678, y:735, w:258, fs:28, lh:0,  maxLength:9,  wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'dream',           label:'将来の夢',
    x:678, y:843, w:268, fs:28, lh:0,  maxLength:9,  wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'holiday',         label:'休みの日なにしてる？',
    x:678, y:951, w:258, fs:26, lh:0,  maxLength:10, wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  { key:'wantNow',         label:'今いちばんほしいもの',
    x:678, y:1059, w:252, fs:26, lh:0,  maxLength:9,  wrap:false, maxLines:1,
    kind:'text', placeholder:'', align:'left' },

  // ── ひとことメッセージ（複数行） ────────────
  { key:'message',         label:'ひとことメッセージ',
    x:678, y:1167, w:272, fs:26, lh:38, maxLength:54, wrap:true,  maxLines:3,
    kind:'textarea', placeholder:'自由に書いてね♪', align:'left' },
];

// ============================================================
const FONT_FAMILY = "'Kosugi Maru','Hiragino Maru Gothic ProN','BIZ UDPGothic',sans-serif";
const TEXT_COLOR  = '#333333';
const TMPL_SRC    = 'assets/profile-template.png';

// ============================================================
// 初期化
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildOverlay();
  positionFields();               // 初回レイアウト
  window.addEventListener('resize', positionFields);

  document.getElementById('generate-btn').addEventListener('click', handleGenerate);
  document.getElementById('back-btn').addEventListener('click', showEdit);
});

// ============================================================
// オーバーレイ生成（テンプレート上に入力要素を配置）
// ============================================================
function buildOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.innerHTML = '';

  FIELDS.forEach(field => {
    let el;

    if (field.kind === 'select') {
      el = document.createElement('select');
      el.className = 'ov-select';
      (field.options || []).forEach(opt => {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = opt === '' ? '—' : opt;
        el.appendChild(o);
      });

    } else if (field.kind === 'textarea') {
      el = document.createElement('textarea');
      el.className    = 'ov-textarea';
      el.maxLength    = field.maxLength;
      el.rows         = field.maxLines;
      el.placeholder  = field.placeholder || '';

    } else {
      el = document.createElement('input');
      el.type         = 'text';
      el.className    = 'ov-input';
      el.maxLength    = field.maxLength;
      el.placeholder  = field.placeholder || '';
      el.autocomplete = 'off';
      // 改行キーで次フィールドへ移動
      el.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });
    }

    el.id   = `ov-${field.key}`;
    el.name = field.key;
    overlay.appendChild(el);
  });
}

// ============================================================
// 全フィールドの表示位置・サイズを画像の表示サイズに合わせて計算
// ============================================================
function positionFields() {
  const img = document.getElementById('template-img');
  if (!img.offsetWidth) return;           // 画像未ロードなら skip

  const dispW = img.offsetWidth;
  const dispH = img.offsetHeight;
  const scale = dispW / TMPL_W;          // 縦横比は維持されるので共通スケール

  FIELDS.forEach(field => {
    const el = document.getElementById(`ov-${field.key}`);
    if (!el) return;

    const fs = Math.max(10, field.fs * scale);  // フォントサイズ（最低10px）

    el.style.fontSize = fs + 'px';
    el.style.width    = (field.w * scale) + 'px';
    el.style.left     = (field.x * scale) + 'px';

    if (field.kind === 'textarea') {
      // textarea: y は1行目のbaseline → top = y - fontSize
      const lineH = field.lh * scale;
      el.style.top        = ((field.y - fs) * scale) + 'px';
      el.style.lineHeight = lineH + 'px';
      el.style.height     = (lineH * field.maxLines) + 'px';
    } else {
      // input / select: top = baseline - fontSize
      el.style.top    = ((field.y - fs) * scale) + 'px';
      el.style.height = (fs * 1.3) + 'px';       // 適度な高さ（タップしやすく）
    }

    // 中央揃え（血液型）
    if (field.align === 'center') {
      el.style.textAlign = 'center';
    }
  });
}

// ============================================================
// 生成ボタン処理
// ============================================================
async function handleGenerate() {
  const btn = document.getElementById('generate-btn');
  btn.disabled    = true;
  btn.textContent = '生成中…';

  try {
    const data    = collectValues();
    const dataURL = await renderCanvas(data);
    showPreview(dataURL);
  } catch (err) {
    console.error(err);
    alert('画像の生成に失敗しました。\nassets/profile-template.png が存在するか確認してください。');
  } finally {
    btn.disabled    = false;
    btn.textContent = '✨ 完成画像を作る';
  }
}

// ============================================================
// 入力値の収集
// ============================================================
function collectValues() {
  const data = {};
  FIELDS.forEach(f => {
    const el = document.getElementById(`ov-${f.key}`);
    data[f.key] = el ? el.value.trim() : '';
  });
  return data;
}

// ============================================================
// Canvas 描画（フル解像度 TMPL_W × TMPL_H で出力）
// ============================================================
async function renderCanvas(data) {
  const tmpl = await loadImage(TMPL_SRC);

  const canvas  = document.getElementById('canvas');
  canvas.width  = tmpl.naturalWidth;
  canvas.height = tmpl.naturalHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(tmpl, 0, 0);

  await document.fonts.ready;   // Webフォント読み込み完了を待つ

  FIELDS.forEach(field => {
    const value = data[field.key];
    if (!value) return;

    ctx.save();
    ctx.font         = `${field.fs}px ${FONT_FAMILY}`;
    ctx.fillStyle    = TEXT_COLOR;
    ctx.textBaseline = 'alphabetic';

    if (field.wrap) {
      drawWrapped(ctx, value, field);
    } else {
      drawSingle(ctx, value, field);
    }
    ctx.restore();
  });

  return canvas.toDataURL('image/png');
}

// ============================================================
// 1行テキスト描画
// ============================================================
function drawSingle(ctx, value, field) {
  ctx.textAlign = field.align || 'left';
  const drawX = field.align === 'center'
    ? field.x + field.w / 2
    : field.x;
  ctx.fillText(value.slice(0, field.maxLength), drawX, field.y);
}

// ============================================================
// 複数行テキスト描画（ひとことメッセージ）
// ============================================================
function drawWrapped(ctx, value, field) {
  ctx.textAlign = 'left';
  const lines = splitLines(ctx, value, field.w, field.maxLines);
  lines.forEach((line, i) => {
    ctx.fillText(line, field.x, field.y + i * field.lh);
  });
}

// ============================================================
// 自動改行：measureText で幅超過したら折り返す
// ============================================================
function splitLines(ctx, text, maxWidth, maxLines) {
  const lines = [];
  let cur = '';
  for (const ch of text) {
    const test = cur + ch;
    if (ctx.measureText(test).width > maxWidth && cur !== '') {
      lines.push(cur);
      cur = ch;
      if (lines.length >= maxLines) { cur = ''; break; }
    } else {
      cur = test;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  return lines;
}

// ============================================================
// 画像読み込み（Promise）
// ============================================================
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img   = new Image();
    img.onload  = () => resolve(img);
    img.onerror = () => reject(new Error('画像を読み込めませんでした: ' + src));
    img.src     = src;
  });
}

// ============================================================
// プレビュー画面を表示
// ============================================================
function showPreview(dataURL) {
  document.getElementById('preview-img').src = dataURL;
  document.getElementById('edit-screen').classList.add('hidden');
  document.getElementById('preview-screen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
// 編集画面に戻る（入力値はそのまま残る）
// ============================================================
function showEdit() {
  document.getElementById('preview-screen').classList.add('hidden');
  document.getElementById('edit-screen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
