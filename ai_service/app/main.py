# ai_service/app/main.py

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from services.model_service import load_model, preprocess_input, predict_price

# ✅ Customized FastAPI app
app = FastAPI(
    title="Travel Expense Optimizer",
    description="AI-powered service to predict travel costs based on user inputs.",
    version="1.0.0"
)

# ✅ Load model once on startup
model = load_model()

# ✅ Input schema aligned with training features
class ExpenseInput(BaseModel):
    days: int
    distance: float
    transport_mode: str
    accommodation_type: str
    food_preference: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the Travel Expense Optimizer AI Service"}

@app.post("/predict/")
def predict_expense(expense: ExpenseInput):
    try:
        input_data = preprocess_input(expense.dict())
        prediction = predict_price(model, input_data)
        return {"predicted_total_expense": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
