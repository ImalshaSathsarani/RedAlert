from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from datetime import datetime

# Load artifacts
model = joblib.load("BloodDonationEligibilityModel3.joblib")
label_encoders = joblib.load("LabelEncoders3.joblib")
mlb_dict = joblib.load("MultiLabelBinarizers3.joblib")

# Define multiselect columns
multiselect_columns = ['ChronicIllnessDetails', 'MedicationDetails', 'VaccineDetails', 'AllergyDetails']

# FastAPI app
app = FastAPI()

# Input schema (match your dataset’s features BEFORE preprocessing)
class InputData(BaseModel):
    Age: int
    Gender: str
    Weight: float
    LastDonationDate: str   # in "YYYY-MM-DD" format
    ChronicIllness: str
    ChronicIllnessDetails: list[str] = []
    MedicationDetails: list[str] = []
    VaccineDetails: list[str] = []
    AllergyDetails: list[str] = []

@app.get("/")
def root():
    return {"message": "Blood Donation Eligibility Model API is running..."}

@app.post("/predict")
def predict(data: InputData):
    # Convert input into a DataFrame
    df = pd.DataFrame([data.dict()])

    # Handle LastDonationDate -> DaysSinceLastDonation
    df["LastDonationDate"] = pd.to_datetime(df["LastDonationDate"])
    today = pd.to_datetime(datetime.today().date())
    df["DaysSinceLastDonation"] = (today - df["LastDonationDate"]).dt.days
    df.drop(columns=["LastDonationDate"], inplace=True)

    # Process multiselect fields with MultiLabelBinarizer
    mlb_dfs = []
    for col in multiselect_columns:
        mlb = mlb_dict.get(col)
        binarized = pd.DataFrame(
            mlb.transform([df[col][0]]), 
            columns=[f"{col}_{cls}" for cls in mlb.classes_]
        )
        mlb_dfs.append(binarized)
    df.drop(columns=multiselect_columns, inplace=True)
    df = pd.concat([df] + mlb_dfs, axis=1)

    # Apply LabelEncoders for categorical columns
    for col, le in label_encoders.items():
        if col in df.columns:
            df[col] = le.transform(df[col])

    # Predict
    prediction = model.predict(df)
    return {"prediction": prediction.tolist()}
