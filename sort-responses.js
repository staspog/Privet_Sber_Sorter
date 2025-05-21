// sort-responses.js
// Скрипт сортирует блоки откликов по количеству дней с момента отправки резюме
// Запуск: вставить в консоль браузера или подключить в Tampermonkey/Greasemonkey

(function() {
  const gridSelector = '.styled__Container-sc-15qm1ik-1.CellGrid-sc-1runec1-0';
  const dateLabelSelector = '.sc-kCMKrZ.dTgKzN';

  const grid = document.querySelector(gridSelector);
  if (!grid) {
    console.error(`Не найден контейнер по селектору: ${gridSelector}`);
    return;
  }

  const cards = Array.from(grid.children);

  function parseDays(card) {
    const label = card.querySelector(dateLabelSelector);
    if (!label) return Infinity;
    const match = label.textContent.match(/(\d+)\s*дн/);
    return match ? parseInt(match[1], 10) : Infinity;
  }

  cards.sort((a, b) => parseDays(a) - parseDays(b));

  cards.forEach(card => grid.appendChild(card));

  console.log('Карточки откликов отсортированы по дате ответа.');
})();
