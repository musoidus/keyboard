const keys = {
  Backquote: { en: ['`', '~'], ru: ['ё', 'Ë'] },
  Digit1: { en: ['1', '!'], ru: ['1', '!'] },
  Digit2: { en: ['2', '@'], ru: ['2', '"'] },
  Digit3: { en: ['3', '#'], ru: ['3', '№'] },
  Digit4: { en: ['4', '$'], ru: ['4', ';'] },
  Digit5: { en: ['5', '%'], ru: ['5', '%'] },
  Digit6: { en: ['6', '^'], ru: ['6', ':'] },
  Digit7: { en: ['7', '&'], ru: ['7', '?'] },
  Digit8: { en: ['8', '*'], ru: ['8', '*'] },
  Digit9: { en: ['9', '('], ru: ['9', '('] },
  Digit0: { en: ['0', ')'], ru: ['0', ')'] },
  Minus: { en: ['-', '_'], ru: ['-', '_'] },
  Equal: { en: ['=', '+'], ru: ['=', '+'] },
  Backspace: { en: ['delete'], ru: ['delete'] },
  Tab: { en: ['tab'], ru: ['tab'] },
  KeyQ: { en: ['q'], ru: ['й'] },
  KeyW: { en: ['w'], ru: ['ц'] },
  KeyE: { en: ['e'], ru: ['у'] },
  KeyR: { en: ['r'], ru: ['к'] },
  KeyT: { en: ['t'], ru: ['е'] },
  KeyY: { en: ['y'], ru: ['н'] },
  KeyU: { en: ['u'], ru: ['г'] },
  KeyI: { en: ['i'], ru: ['ш'] },
  KeyO: { en: ['o'], ru: ['щ'] },
  KeyP: { en: ['p'], ru: ['з'] },
  BracketLeft: { en: ['[', '{'], ru: ['х', 'Х'] },
  BracketRight: { en: [']', '}'], ru: ['ъ', 'Ъ'] },
  Backslash: { en: ['\\', '|'], ru: ['\\', '/'] },
  CapsLock: { en: ['caps lock', '•'], ru: ['caps lock', '•'] },
  KeyA: { en: ['a'], ru: ['ф'] },
  KeyS: { en: ['s'], ru: ['ы'] },
  KeyD: { en: ['d'], ru: ['в'] },
  KeyF: { en: ['f'], ru: ['а'] },
  KeyG: { en: ['g'], ru: ['п'] },
  KeyH: { en: ['h'], ru: ['р'] },
  KeyJ: { en: ['j'], ru: ['о'] },
  KeyK: { en: ['k'], ru: ['л'] },
  KeyL: { en: ['l'], ru: ['д'] },
  Semicolon: { en: [';', ':'], ru: ['ж', 'Ж'] },
  Quote: { en: ["'", '"'], ru: ['э', 'Э'] },
  Enter: { en: ['return', 'enter'], ru: ['return', 'enter'] },
  ShiftLeft: { en: ['shift'], ru: ['shift'] },
  KeyZ: { en: ['z'], ru: ['я'] },
  KeyX: { en: ['x'], ru: ['ч'] },
  KeyC: { en: ['c'], ru: ['с'] },
  KeyV: { en: ['v'], ru: ['м'] },
  KeyB: { en: ['b'], ru: ['и'] },
  KeyN: { en: ['n'], ru: ['т'] },
  KeyM: { en: ['m'], ru: ['ь'] },
  Comma: { en: [',', '<'], ru: ['б', 'Б'] },
  Period: { en: ['.', '>'], ru: ['ю', 'Ю'] },
  Slash: { en: ['/', '?'], ru: ['.', ','] },
  ShiftRight: { en: ['shift'], ru: ['shift'] },
  fn: { en: ['fn'], ru: ['fn'] },
  ControlLeft: { en: ['control'], ru: ['control'] },
  AltLeft: { en: ['option', 'alt'], ru: ['option', 'alt'] },
  MetaLeft: { en: ['command', '⌘'], ru: ['command', '⌘'] },
  Space: { en: [' '], ru: [' '] },
  MetaRight: { en: ['command', '⌘'], ru: ['command', '⌘'] },
  AltRight: { en: ['option', 'alt'], ru: ['option', 'alt'] },
  ArrowLeft: { en: ['←'], ru: ['←'] },
  Arrows: {
    ArrowUp: ['↑'],
    ArrowDown: ['↓'],
  },
  ArrowRight: { en: ['→'], ru: ['→'] },
};

const sizes = {
  size1: ['MetaLeft', 'MetaRight'],
  size2: ['Backspace', 'Tab'],
  size3: ['CapsLock', 'Enter'],
  size4: ['ShiftRight', 'ShiftLeft'],
  size5: ['Space'],
};

let cursorPosition = 0;
let lang = localStorage.getItem('keyboard-lang') || 'en';

function generatePage() {
  let header = '<h1>MacBook pro 2017 keyboard</h1>';
  let info = '<h2>⌘ to switch languages</h2>';
  let textarea = '<textarea rows="10" cols="70" autofocus></textarea>';
  document.body.insertAdjacentHTML('afterbegin', textarea);
  document.body.insertAdjacentHTML('afterbegin', info);
  document.body.insertAdjacentHTML('afterbegin', header);
  generateKeyboard();
}

function generateKeyboard() {
  let html = '<div class="keyboard-wrapper">';
  for (let key in keys) {
    if (key === 'Arrows') {
      html += '<div class="arrows-wrapper">';
      for (let arrow in keys[key]) {
        html += `<div class='btn' data-keycode='${arrow}'>
        <span class='text-bottom'>${keys[key][arrow]}</span></div>`;
      }
      html += '</div>';
    } else {
      if (lang === 'en') {
        html += `<div class='btn' data-keycode='${key}'><span class='text-top'>
    ${key.startsWith('Key') ? '' : keys[key][lang][1] || ''}
    </span><span class='text-bottom'>${
      key.startsWith('Key')
        ? keys[key][lang][0].toUpperCase()
        : keys[key][lang][0]
    }</span></div>`;
      } else if (lang === 'ru') {
        html += `<div class='btn' data-keycode='${key}'><span class='text-top'>
    ${
      key.startsWith('Key') ||
      key === 'Backquote' ||
      key === 'BracketLeft' ||
      key === 'BracketRight' ||
      key === 'Semicolon' ||
      key === 'Quote' ||
      key === 'Comma' ||
      key === 'Period'
        ? ''
        : keys[key][lang][1] || ''
    }
    </span><span class='text-bottom'>${
      key.startsWith('Key') ||
      key === 'Backquote' ||
      key === 'BracketLeft' ||
      key === 'BracketRight' ||
      key === 'Semicolon' ||
      key === 'Quote' ||
      key === 'Comma' ||
      key === 'Period'
        ? keys[key][lang][0].toUpperCase()
        : keys[key][lang][0]
    }</span></div>`;
      }
    }
  }
  html += '</div>';
  document.body.insertAdjacentHTML('beforeend', html);
  function setSizes() {
    document.querySelectorAll('.btn').forEach(function (el) {
      el.addEventListener('click', btnClickHandler);

      for (let key in sizes) {
        for (let btn of sizes[key]) {
          if (el.dataset.keycode === btn) el.classList.add(`${key}`);
        }
      }
    });
  }
  setSizes();
}

function btnClickHandler(event) {
  const textarea = document.querySelector('textarea');
  let currentKey = event.currentTarget.dataset.keycode;
  let isCapsOn = document
    .querySelector('[data-keycode=CapsLock]')
    .classList.contains('caps-on');
  document
    .querySelector(`[data-keycode=${currentKey}`)
    .classList.add('key-down');

  if (currentKey === 'Backspace') {
    textarea.value =
      textarea.value.substring(0, cursorPosition - 1) +
      textarea.value.substring(cursorPosition, textarea.value.length);
    cursorPosition = cursorPosition - 1;
    textarea.setSelectionRange(cursorPosition, cursorPosition);
    textarea.focus();
  } else if (currentKey === 'MetaLeft' || currentKey === 'MetaRight') {
    lang = lang === 'en' ? 'ru' : 'en';
    localStorage.setItem('keyboard-lang', lang);
    document.querySelector('.keyboard-wrapper').remove();
    generateKeyboard();
    textarea.focus();
  } else if (currentKey === 'CapsLock') {
    document
      .querySelector('[data-keycode=CapsLock]')
      .classList.toggle('caps-on');
    textarea.focus();
    //cursorPosition = textarea.value.length;
  } else if (currentKey === 'ShiftLeft' || currentKey === 'ShiftRight') {
    document
      .querySelector(`[data-keycode=${currentKey}]`)
      .classList.toggle('selected');
    textarea.focus();
    //cursorPosition = textarea.value.length;
  } else if (currentKey === 'Tab') {
    textarea.value += '	';
    textarea.focus();
    // cursorPosition = textarea.value.length;
  } else if (currentKey === 'Enter') {
    textarea.value += '\n';
    textarea.focus();
    // cursorPosition = textarea.value.length;
  } else if (currentKey === 'ArrowLeft') {
    if (cursorPosition >= 1) {
      cursorPosition = cursorPosition - 1;
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    }
    textarea.focus();
  } else if (currentKey === 'ArrowRight') {
    if (cursorPosition <= textarea.value.length - 1) {
      cursorPosition = cursorPosition + 1;
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    }
    textarea.focus();
  } else if (currentKey === 'ArrowUp') {
    cursorPosition = 0;
    textarea.setSelectionRange(cursorPosition, cursorPosition);
    textarea.focus();
  } else if (currentKey === 'ArrowDown') {
    cursorPosition = textarea.value.length;
    textarea.setSelectionRange(cursorPosition, cursorPosition);
    textarea.focus();
  } else if (
    currentKey === 'ControlLeft' ||
    currentKey === 'AltLeft' ||
    currentKey === 'ControlRight' ||
    currentKey === 'AltRight' ||
    currentKey === 'fn'
  ) {
    textarea.value += '';
    textarea.focus();
  } else if (currentKey.startsWith('Key')) {
    if (
      document
        .querySelector(`[data-keycode=ShiftLeft`)
        .classList.contains('selected') ||
      document
        .querySelector(`[data-keycode=ShiftRight`)
        .classList.contains('selected')
    ) {
      textarea.value =
        textarea.value.substring(0, cursorPosition) +
        keys[currentKey][lang][0].toUpperCase() +
        textarea.value.substring(cursorPosition, textarea.value.length);
      cursorPosition = cursorPosition + 1;
      textarea.setSelectionRange(cursorPosition, cursorPosition);
      textarea.focus();

      document
        .querySelector(`[data-keycode=ShiftLeft`)
        .classList.remove('selected');
      document
        .querySelector(`[data-keycode=ShiftRight`)
        .classList.remove('selected');
    } else if (isCapsOn) {
      textarea.value =
        textarea.value.substring(0, cursorPosition) +
        keys[currentKey][lang][0].toUpperCase() +
        textarea.value.substring(cursorPosition, textarea.value.length);
      cursorPosition = cursorPosition + 1;
      textarea.setSelectionRange(cursorPosition, cursorPosition);
      textarea.focus();
    } else {
      textarea.value =
        textarea.value.substring(0, cursorPosition) +
        keys[currentKey][lang][0] +
        textarea.value.substring(cursorPosition, textarea.value.length);
      cursorPosition = cursorPosition + 1;
      textarea.setSelectionRange(cursorPosition, cursorPosition);
      textarea.focus();
    }
    // textarea.focus();
    //cursorPosition = textarea.value.length;
  } else {
    let insert =
      isCapsOn ||
      document
        .querySelector(`[data-keycode=ShiftLeft`)
        .classList.contains('selected') ||
      document
        .querySelector(`[data-keycode=ShiftRight`)
        .classList.contains('selected')
        ? keys[currentKey][lang][1]
        : keys[currentKey][lang][0];

    textarea.value =
      textarea.value.substring(0, cursorPosition) +
      insert +
      textarea.value.substring(cursorPosition, textarea.value.length);

    cursorPosition = cursorPosition + 1;
    textarea.setSelectionRange(cursorPosition, cursorPosition);

    document
      .querySelector(`[data-keycode=ShiftLeft`)
      .classList.remove('selected');
    document
      .querySelector(`[data-keycode=ShiftRight`)
      .classList.remove('selected');

    textarea.focus();
    // cursorPosition = textarea.value.length;
  }
  setTimeout(() => {
    document
      .querySelector(`[data-keycode=${currentKey}`)
      .classList.remove('key-down');
  }, 100);
}

function keyDownHandler(event) {
  document.querySelector('textarea').focus();
  cursorPosition = document.querySelector('textarea').value.length;
  document
    .querySelector(`[data-keycode=${event.code}]`)
    .classList.add('key-down');
}
function keyUpHandler(event) {
  document
    .querySelector(`[data-keycode=${event.code}]`)
    .classList.remove('key-down');
}

generatePage();
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
