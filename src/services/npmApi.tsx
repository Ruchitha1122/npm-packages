
const BASE_URL = 'https://api.npms.io/v2/search?q=';

export const searchNpmPackages = async (query: string) => {
  try {
    const response = await fetch(`${BASE_URL}${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching npm packages:', error);
    throw error;
  }
};
