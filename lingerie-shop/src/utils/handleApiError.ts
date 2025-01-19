/**
 * Обробка помилок API
 * @param error Об'єкт помилки, отриманий від axios
 */
export const handleApiError = (error: any) => {
  if (error.response) {
    // Помилка відповіді від сервера
    const { status, data } = error.response;
    console.error(`API Error [${status}]:`, data);

    // Спеціальні повідомлення для деяких статусів
    switch (status) {
      case 400:
        alert('Bad Request. Please check your input.');
        break;
      case 401:
        alert('Unauthorized. Please log in.');
        break;
      case 403:
        alert('Forbidden. You do not have permission to perform this action.');
        break;
      case 404:
        alert('Resource not found.');
        break;
      case 500:
        alert('Server error. Please try again later.');
        break;
      default:
        alert('An error occurred while processing your request.');
        break;
    }
  } else if (error.request) {
    // Помилка, коли запит був відправлений, але відповіді немає
    console.error('No response received:', error.request);
    alert('No response from the server. Please check your internet connection.');
  } else {
    // Помилка при налаштуванні запиту
    console.error('Error during request setup:', error.message);
    alert('An unexpected error occurred. Please try again.');
  }
};
