import React, { useState } from 'react';
import axios from 'axios';

const PricePredictor = () => {
  const [inputs, setInputs] = useState({
    days_in_advance: '',
    seasonality: '',
    weekday_flag: ''
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const predictPrice = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/predict', {
        ...inputs,
        days_in_advance: parseInt(inputs.days_in_advance),
        seasonality: parseInt(inputs.seasonality),
        weekday_flag: parseInt(inputs.weekday_flag)
      });
      setPredictedPrice(response.data.predicted_price);
    } catch (error) {
      alert("Prediction failed. Make sure the backend is running!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8 border border-blue-200">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">🎯 Smart Price Predictor</h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="number"
          name="days_in_advance"
          value={inputs.days_in_advance}
          onChange={handleChange}
          placeholder="Days in advance"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="seasonality"
          value={inputs.seasonality}
          onChange={handleChange}
          placeholder="Seasonality (1-10)"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          name="weekday_flag"
          value={inputs.weekday_flag}
          onChange={handleChange}
          placeholder="Weekday flag (1 = weekday, 0 = weekend)"
          className="border p-2 rounded w-full"
        />

        <button
          onClick={predictPrice}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? 'Predicting...' : 'Predict Price 💸'}
        </button>
      </div>

      {predictedPrice !== null && (
        <div className="mt-6 bg-green-100 p-4 rounded shadow text-green-800 text-center font-bold">
          Predicted Price: ₹{predictedPrice}
        </div>
      )}
    </div>
  );
};

export default PricePredictor;
