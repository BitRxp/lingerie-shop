export const handleApiError = (error: any) => {
    console.error('API Error:', error.response?.data || error.message);
    alert('An error occurred while processing your request.');
  };
  