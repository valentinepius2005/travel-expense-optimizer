from fastapi import FastAPI
from app.services.model_service import load_model

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Travel Expense Optimizer is running!"}
