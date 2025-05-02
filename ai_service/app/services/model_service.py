# model_service.py
import pickle
import os

def load_model():
    model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'ai_model.pkl')
    model_path = os.path.abspath(model_path)

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model file not found at {model_path}")

    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    return model
def preprocess_input(data: dict):
    # Example preprocessing logic (modify as per your model's training pipeline)
    features = [
        data["days"], 
        data["distance"], 
        data["transport_mode"], 
        data["accommodation_type"], 
        data["food_preference"]
    ]
    return features
def predict_price(model, features):
    return model.predict([features])[0]