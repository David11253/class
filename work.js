// work.js
document.addEventListener("DOMContentLoaded", () => {
  const table = document.createElement("table");
  table.border = "1";

  // Заголовки таблицы
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
    <th>Дата</th>
    <th>Урок</th>
    <th>Информация</th>
    <th>Домашнее задание</th>
  `;
  table.appendChild(headerRow);

  // Функция для открытия модального окна с домашним заданием
  const openModal = (homework) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <h3>Домашнее задание</h3>
        <p>${homework}</p>
      </div>
    `;
    
    // Добавляем модальное окно в body
    document.body.appendChild(modal);
    
    // Закрыть модальное окно при нажатии на кнопку
    modal.querySelector(".close-btn").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    // Закрыть модальное окно при клике за пределами окна
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  };

  // Функция для обработки дней и построения строк
  const addDayToTable = (week, weekName) => {
    Object.keys(week).forEach((dayKey, dayIndex) => {
      const day = week[dayKey];
      const date = day.date; // Дата дня

      // Для каждого урока в дне
      for (let lessonNum = 1; lessonNum <= 6; lessonNum++) {
        const row = document.createElement("tr");

        // Если первый урок дня — указываем дату, иначе оставляем пустыми
        if (lessonNum === 1) {
          row.innerHTML = `
            <td rowspan="6">${date}</td>
          `;
        }

        // Указываем данные для текущего урока
        row.innerHTML += `
          <td>Урок ${lessonNum}</td>
          <td>${day[`lesson${lessonNum}`]}</td>
          <td class="homework" data-homework="${day[`lesson${lessonNum}hom`]}">Посмотреть дз</td>
        `;

        table.appendChild(row);
      }

      // Добавляем пустую строку для визуального пробела между днями
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = "<td colspan='4'>&nbsp;</td>";  // Уменьшаем colspan до 4
      table.appendChild(emptyRow);
    });
  };

  // Добавляем обработчик нажатия на домашку
  document.body.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("homework")) {
      const homework = e.target.getAttribute("data-homework");
      openModal(homework);
    }
  });

  // Добавляем данные по неделям
  Object.keys(lessonOneDayOneWeek).forEach((weekKey) => {
    const week = lessonOneDayOneWeek[weekKey];

    // Добавляем строку с названием недели
    const weekRow = document.createElement("tr");
    weekRow.innerHTML = `<td colspan="4"><strong>${weekKey.toUpperCase()}</strong></td>`; // Уменьшаем colspan до 4
    table.appendChild(weekRow);

    // Добавляем данные дней этой недели
    addDayToTable(week, weekKey);
  });

  // Добавляем таблицу в body
  document.body.appendChild(table);
});
