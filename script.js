const scheduleEl  = document.getElementById('schedule');
const datePicker  = document.getElementById('datePicker');

let data = {};

// Загружаем данные
fetch('main.json')
  .then(r => r.json())
  .then(json => {
      data = json;
      render();
  });

function render() {
    scheduleEl.innerHTML = '';

    // Сортируем ключи (даты) и выводим ровно в том порядке, как есть
    Object.keys(data)
        .sort()
        .forEach(dateKey => {
            const [y, m, d] = dateKey.split('-').map(Number);
            const dateObj = new Date(y, m - 1, d);

            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';

            const h2 = document.createElement('h2');
            h2.textContent = dateObj.toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            dayDiv.appendChild(h2);

            data[dateKey].forEach(l => {
                dayDiv.appendChild(createCard(l.subject, l.homework));
            });

            scheduleEl.appendChild(dayDiv);
        });
}

function createCard(subject, hw) {
    const cont = document.createElement('div');
    cont.className = 'card-container';

    const card = document.createElement('div');
    card.className = 'card';

    const front = document.createElement('div');
    front.className = 'front';
    front.textContent = subject;

    const back = document.createElement('div');
    back.className = 'back';
    back.innerHTML = `<strong>Домашнее задание:</strong><br>${hw}`;

    card.append(front, back);
    cont.appendChild(card);

    cont.addEventListener('click', () => card.classList.toggle('flipped'));
    return cont;
}