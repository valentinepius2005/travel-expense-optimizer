// src/services/aiService.js
import axios from 'axios';

export const getAIPrediction = async (inputData) => {
  try {
    const response = await axios.post('http://localhost:5001/predict', inputData);
    return response.data;
  } catch (error) {
    console.error('AI Service Error:', error.message);
    throw error;
  }
};
