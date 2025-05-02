import os
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Sample synthetic data (replace with your real dataset if available)
data = pd.DataFrame({
    "days": [3, 5, 7, 10, 2, 4, 6, 8],
    "distance": [100, 300, 700, 1200, 50, 150, 500, 900],
    "transport_mode": ["car", "train", "flight", "car", "train", "flight", "car", "flight"],
    "accommodation_type": ["hotel", "hostel", "airbnb", "hotel", "hostel", "hotel", "airbnb", "hostel"],
    "food_preference": ["veg", "non-veg", "vegan", "veg", "non-veg", "veg", "vegan", "veg"],
    "expense": [3000, 4500, 10000, 8000, 2500, 4000, 7000, 9500]
})

# Encode categorical columns
transport_modes = {"car": 0, "train": 1, "flight": 2}
accommodation_types = {"hotel": 0, "hostel": 1, "airbnb": 2}
food_preferences = {"veg": 0, "non-veg": 1, "vegan": 2}

data["transport_mode"] = data["transport_mode"].map(transport_modes)
data["accommodation_type"] = data["accommodation_type"].map(accommodation_types)
data["food_preference"] = data["food_preference"].map(food_preferences)

# Feature and label separation
X = data[["days", "distance", "transport_mode", "accommodation_type", "food_preference"]]
y = data["expense"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
print(f"Model trained. MSE on test set: {mse:.2f}")

# Save the model
model_dir = os.path.join(os.path.dirname(__file__), 'app', 'model')  # Corrected path
os.makedirs(model_dir, exist_ok=True)  # Ensure directory exists
model_path = os.path.join(model_dir, "ai_model.pkl")

with open(model_path, "wb") as f:
    pickle.dump(model, f)

print(f"Model saved at {model_path}")
