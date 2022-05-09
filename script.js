const keys = {
  Backquote: ['`', '~'],
  Digit1: ['1', '!'],
  Digit2: ['2', '@'],
  Digit3: ['3', '#'],
  Digit4: ['4', '$'],
  Digit5: ['5', '%'],
  Digit6: ['6', '^'],
  Digit7: ['7', '&'],
  Digit8: ['8', '*'],
  Digit9: ['9', '('],
  Digit0: ['0', ')'],
  Minus: ['-', '_'],
  Equal: ['=', '+'],
  Backspace: ['delete'],
  Tab: ['tab'],
  KeyQ: ['q', 'й'],
  KeyW: ['w', 'ц'],
  KeyE: ['e', 'у'],
  KeyR: ['r', 'к'],
  KeyT: ['t', 'е'],
  KeyY: ['y', 'н'],
  KeyU: ['u', 'г'],
  KeyI: ['i', 'ш'],
  KeyO: ['o', 'щ'],
  KeyP: ['p', 'з'],
  BracketLeft: ['[', '{'],
  BracketRight: [']', '}'],
  Backslash: ['\\', '|'],
  CapsLock: ['caps lock', '•'],
  KeyA: ['a', 'ф'],
  KeyS: ['s', 'ы'],
  KeyD: ['d', 'в'],
  KeyF: ['f', 'а'],
  KeyG: ['g', 'п'],
  KeyH: ['h', 'р'],
  KeyJ: ['j', 'о'],
  KeyK: ['k', 'л'],
  KeyL: ['l', 'д'],
  Semicolon: [';', ':'],
  Quote: ["'", '"'],
  Enter: ['return', 'enter'],
  ShiftLeft: ['shift'],
  KeyZ: ['z', 'я'],
  KeyX: ['x', 'ч'],
  KeyC: ['c', 'с'],
  KeyV: ['v', 'м'],
  KeyB: ['b', 'и'],
  KeyN: ['n', 'т'],
  KeyM: ['m', 'ь'],
  Comma: [',', '<'],
  Period: ['.', '>'],
  Slash: ['/', '?'],
  ShiftRight: ['shift'],
  fn: ['fn'],
  ControlLeft: ['control'],
  AltLeft: ['option', 'alt'],
  MetaLeft: ['command', '⌘'],
  Space: [' '],
  MetaRight: ['command', '⌘'],
  AltRight: ['option', 'alt'],
  ArrowLeft: ['←'],
  Arrows: {
    ArrowUp: ['↑'],
    ArrowDown: ['↓'],
  },
  ArrowRight: ['→'],
};

const sizes = {
  size1: ['MetaLeft', 'MetaRight'],
  size2: ['Backspace', 'Tab'],
  size3: ['CapsLock', 'Enter'],
  size4: ['ShiftRight', 'ShiftLeft'],
  size5: ['Space'],
};

let cursorPosition = 0;

function generatePage() {
  let header = '<h1>MacBook pro 2017 keyboard</h1>';
  let textarea = '<textarea rows="10" cols="70" autofocus></textarea>';
  document.body.insertAdjacentHTML('afterbegin', textarea);
  document.body.insertAdjacentHTML('afterbegin', header);
  generateKeyboard();
}

function generateKeyboard() {
  let html = '<div class="keyboard-wrapper">';
  for (let key in keys) {
    if (key === 'Arrows') {
      //MAKE ARROW SECTION
      html += '<div class="arrows-wrapper">';
      for (let arrow in keys[key]) {
        html += `<div class='btn' data-keycode='${arrow}'>
        <span class='text-bottom'>${keys[key][arrow]}</span></div>`;
      }
      html += '</div>';
    } else {
      html += `<div class='btn' data-keycode='${key}'><span class='text-top'>
    ${key.startsWith('Key') ? '' : keys[key][1] || ''}
    </span><span class='text-bottom'>${
      key.startsWith('Key') ? keys[key][0].toUpperCase() : keys[key][0]
    }</span></div>`;
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

  if (currentKey === 'Backspace') {
    textarea.value = textarea.value.substring(0, textarea.value.length - 1);
    textarea.focus();
    cursorPosition = textarea.value.length;
  } else if (currentKey === 'CapsLock') {
    document
      .querySelector('[data-keycode=CapsLock]')
      .classList.toggle('caps-on');
    textarea.focus();
    cursorPosition = textarea.value.length;
  } else if (currentKey === 'ShiftLeft' || currentKey === 'ShiftRight') {
    document
      .querySelector(`[data-keycode=${currentKey}]`)
      .classList.toggle('selected');
    textarea.focus();
    cursorPosition = textarea.value.length;
  } else if (currentKey === 'Tab') {
    textarea.value += '	';
    textarea.focus();
    cursorPosition = textarea.value.length;
  } else if (currentKey === 'Enter') {
    textarea.value += '\n';
    textarea.focus();
    cursorPosition = textarea.value.length;
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
  } else if (currentKey.startsWith('Key')) {
    if (
      document
        .querySelector(`[data-keycode=ShiftLeft`)
        .classList.contains('selected') ||
      document
        .querySelector(`[data-keycode=ShiftRight`)
        .classList.contains('selected')
    ) {
      textarea.value += keys[currentKey][0].toUpperCase();

      document
        .querySelector(`[data-keycode=ShiftLeft`)
        .classList.remove('selected');
      document
        .querySelector(`[data-keycode=ShiftRight`)
        .classList.remove('selected');
    } else if (isCapsOn) {
      textarea.value += keys[currentKey][0].toUpperCase();
    } else {
      textarea.value += keys[currentKey][0];
    }
    textarea.focus();
    cursorPosition = textarea.value.length;
  } else {
    textarea.value +=
      isCapsOn ||
      document
        .querySelector(`[data-keycode=ShiftLeft`)
        .classList.contains('selected') ||
      document
        .querySelector(`[data-keycode=ShiftRight`)
        .classList.contains('selected')
        ? keys[currentKey][1]
        : keys[currentKey][0];

    document
      .querySelector(`[data-keycode=ShiftLeft`)
      .classList.remove('selected');
    document
      .querySelector(`[data-keycode=ShiftRight`)
      .classList.remove('selected');

    textarea.focus();
    cursorPosition = textarea.value.length;
  }
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
