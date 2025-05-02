from pydantic import BaseModel

class TravelInput(BaseModel):
    days_until_travel: int
    seasonality: str  # e.g., "Spring", "Winter"
    weekday_flag: bool
