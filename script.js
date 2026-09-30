document.addEventListener("DOMContentLoaded", () => {
    const taxForm = document.getElementById("taxForm");
    const resultBlock = document.getElementById("resultBlock");

    // Проверяем, есть ли на текущей странице форма калькулятора
    if (taxForm) {
        taxForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Предотвращаем перезагрузку страницы

            // Получаем и преобразуем значения из полей ввода
            const income = parseFloat(document.getElementById("income").value) || 0;
            const deduction = parseFloat(document.getElementById("deduction").value) || 0;
            const ratePercent = parseFloat(document.getElementById("taxRate").value);

            // 1. Расчет налоговой базы (Доход минус вычеты)
            // База не может быть меньше нуля
            let taxBase = income - deduction;
            if (taxBase < 0) {
                taxBase = 0;
            }

            // 2. Расчет чистой суммы налога (НДФЛ)
            const taxAmount = Math.round(taxBase * (ratePercent / 100));

            // 3. Вычисление чистого дохода, оставшегося на руках
            const cleanIncome = income - taxAmount;

            // Сначала скрываем блок, если он уже был открыт, для создания эффекта "перезапуска анимации"
            resultBlock.classList.add("hidden");

            // Небольшой таймаут, чтобы браузер зафиксировал скрытие, затем плавно выводим новые данные
            setTimeout(() => {
                // Записываем текстовые результаты в форму
                document.getElementById("taxBase").textContent = taxBase.toLocaleString('ru-RU');
                document.getElementById("taxAmount").textContent = taxAmount.toLocaleString('ru-RU');
                document.getElementById("cleanIncome").textContent = cleanIncome.toLocaleString('ru-RU');

                // Убираем скрывающий класс, запуская CSS-анимацию развертывания
                resultBlock.classList.remove("hidden");
            }, 150);
        });
    }
});
