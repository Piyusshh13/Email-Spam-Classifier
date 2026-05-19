from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained pipeline
pipeline = joblib.load("spam_pipeline.pkl")


# Request Schema
class EmailRequest(BaseModel):
    email: str


# Home Route
@app.get("/")
def home():
    return {
        "message": "Spam Email Classifier API Running"
    }
    
    
@app.post("/predict")
def predict_spam(data: EmailRequest):
    # Strict 0 or 1 prediction
    prediction = int(pipeline.predict([data.email])[0])
    
    # Get probabilities: [[prob_of_ham, prob_of_spam]]
    probabilities = pipeline.predict_proba([data.email])[0]
    
    # Extract the confidence score matching the predicted class
    confidence = probabilities[1] if prediction == 1 else probabilities[0]
    label = "spam" if prediction == 1 else "ham"

    return {
        "prediction": label,
        "confidence": round(float(confidence) * 100, 2) # Returns e.g., 94.52%
    }