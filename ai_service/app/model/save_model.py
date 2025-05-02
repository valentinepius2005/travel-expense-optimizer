import pickle
from sklearn.linear_model import LinearRegression

# Dummy data with 3 features
X = [
    [30, 1, 0],
    [15, 0, 1],
    [45, 1, 1],
    [60, 0, 0],
]
y = [3000, 5000, 3500, 2500]  # dummy prices

model = LinearRegression()
model.fit(X, y)

# Save the model
with open('model/ai_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("✅ Dummy model saved to model/ai_model.pkl with 3 feature inputs.")
