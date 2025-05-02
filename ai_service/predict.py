import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))
from utils.helpers import load_model, preprocess_input, predict_price

# Example usage
model = load_model()
input_data = {
    "days_until_travel": 20,
    "season": "Spring",
    "is_weekend": False
}

features = preprocess_input(input_data)
price = predict_price(model, features)
print(f"Predicted price: ₹{price}")
