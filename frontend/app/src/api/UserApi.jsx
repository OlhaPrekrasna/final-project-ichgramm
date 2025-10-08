import { $api } from './Api.jsx';

// Function to get a user by ID
export const getUserByIdApi = async (userId) => {
  try {
    // Send a GET request to the backend API at /user/:id
    const { data } = await $api.get(`/user/${userId}`);

    // Return the response body (user data)
    return data;
  } catch (e) {
    // If the request fails (e.g., server unavailable or returned an error),
    // log the error to the console for developers
    console.error('API error:', e);

    // Throw a readable error message for the UI
    throw new Error('Error fetching user');
  }
};

