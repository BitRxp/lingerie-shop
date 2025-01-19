import { ReportHandler } from 'web-vitals';

/**
 * Функція для вимірювання продуктивності (web-vitals)
 * @param onPerfEntry Функція, яка обробляє метрики продуктивності
 */
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Виклик кожної метрики продуктивності з переданим обробником
      getCLS(onPerfEntry); // Кумулятивне зміщення макета
      getFID(onPerfEntry); // Перша затримка вводу
      getFCP(onPerfEntry); // Перше повне відображення контенту
      getLCP(onPerfEntry); // Найбільше повне відображення контенту
      getTTFB(onPerfEntry); // Час до першого байта
    });
  }
};

export default reportWebVitals;
