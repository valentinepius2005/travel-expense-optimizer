import React, { useState, useEffect } from 'react';

const Form = () => {
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [trips, setTrips] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  // Load trips from localStorage on component mount
  useEffect(() => {
    const savedTrips = JSON.parse(localStorage.getItem('trips'));
    if (savedTrips) {
      setTrips(savedTrips);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!destination || !budget) return;

    const newTrip = {
      id: Date.now(),
      destination,
      budget: parseFloat(budget),
    };

    const updatedTrips = [newTrip, ...trips];
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));

    setDestination('');
    setBudget('');

    // Show success animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  };

  const handleDelete = (id) => {
    const updatedTrips = trips.filter((trip) => trip.id !== id);
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Destination:</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Budget ($):</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Trip
        </button>
      </form>

      {/* Animation feedback */}
      {showAnimation && (
        <div className="text-green-600 mt-4 animate-bounce font-semibold">
          🎉 Trip Added Successfully!
        </div>
      )}

      {/* Saved Trips List */}
      {trips.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Saved Trips</h2>
          <ul className="space-y-2">
            {trips.map((trip) => (
              <li
                key={trip.id}
                className="p-3 bg-gray-100 rounded flex justify-between items-center"
              >
                <div>
                  <div className="font-medium">{trip.destination}</div>
                  <div className="text-sm text-gray-500">
                    {trip.budget < 500
                      ? '🧳 Backpacker Trip'
                      : trip.budget <= 1500
                      ? '🏖 Comfort Trip'
                      : '✈️ Luxury Trip'}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold">${trip.budget}</span>
                  <button
                    onClick={() => handleDelete(trip.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Form;
