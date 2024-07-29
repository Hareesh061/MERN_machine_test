const API_URL = 'http://localhost:5000/api';

export const fetchEmployees = async () => {
  const response = await fetch(`${API_URL}/employees`);
  if (!response.ok) throw new Error('Failed to fetch employees');
  return response.json();
};

