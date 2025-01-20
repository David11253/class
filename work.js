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

  // Функция для обработки дней и построения строк
  const addDayToTable = (week, weekName) => {
    Object.keys(week).forEach((dayKey, dayIndex) => {
      const day = week[dayKey];
      const date = day.date; // Дата дня

      // Для каждого урока в дне
      for (let lessonNum = 1; lessonNum <= 6; lessonNum++) {
        const row = document.createElement("tr");

        // Если первый урок дня — указываем дату и день, иначе оставляем пустыми
        if (lessonNum === 1) {
          row.innerHTML = `
            <td rowspan="6">${date}</td>
          `;
        }

        // Указываем данные для текущего урока
        row.innerHTML += `
          <td>Урок ${lessonNum}</td>
          <td>${day[`lesson${lessonNum}`]}</td>
          <td>${day[`lesson${lessonNum}hom`]}</td>
        `;

        table.appendChild(row);
      }

      // Добавляем пустую строку для визуального пробела между днями
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = "<td colspan='5'>&nbsp;</td>";
      table.appendChild(emptyRow);
    });
  };

  // Добавляем данные по неделям
  Object.keys(lessonOneDayOneWeek).forEach((weekKey) => {
    const week = lessonOneDayOneWeek[weekKey];

    // Добавляем строку с названием недели
    const weekRow = document.createElement("tr");
    weekRow.innerHTML = `<td colspan="5"><strong>${weekKey.toUpperCase()}</strong></td>`;
    table.appendChild(weekRow);

    // Добавляем данные дней этой недели
    addDayToTable(week, weekKey);
  });

  // Добавляем таблицу в body
  document.body.appendChild(table);
});
