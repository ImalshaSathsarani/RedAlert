import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Set seed for reproducibility
random.seed(42)
np.random.seed(42)

# Constants
NUM_RECORDS = 10000
TODAY = datetime.today()

# Categorical options
genders = ["Male", "Female"]
chronic_conditions = [
    "Diabetes", "Hypertension", "Heart Disease", "Kidney Disease", "Asthma",
    "Epilepsy", "Cancer", "None", "Other"
]
medications = [
    "Blood Thinners", "Insulin", "Steroids", "Antibiotics", "Antihypertensives",
    "Asthma Inhalers", "Antiepileptics", "Painkillers", "Antidepressants", "None", "Other"
]
allergies = [
    "Pollen", "Dust", "Food", "Medication", "Latex", "Bee/Wasps", "None", "Other"
]
vaccines = [
    "COVID-19 Vaccine", "Hepatitis B", "Influenza", "Yellow Fever", "Typhoid",
    "Tetanus", "Rabies", "MMR", "None", "Other"
]
smoking = ["Yes", "Occasionally", "No"]
alcohol = ["Yes", "Occasionally", "No"]
yes_no = ["Yes", "No"]

# Eligibility rules
def determine_eligibility(row):
    # Key disqualifying conditions
    if row['Age'] < 18 or row['Weight'] < 50:
        return "No"
    if row['ColdFever7Days'] == "Yes":
        return "No"
    if row['Surgery6Months'] == "Yes":
        return "No"
    if row['Medications'] == "Yes" and row['MedicationDetails'] in ["Blood Thinners", "Antibiotics", "Insulin"]:
        return "No"
    if row['ChronicIllness'] == "Yes" and row['ChronicIllnessDetails'] in ["Cancer", "Heart Disease", "Kidney Disease", "Epilepsy"]:
        return "No"
    if row['PregnantBreastfeedingMenstruating'] == "Yes":
        return "No"
    if row['TestedPositiveInfectious'] == "Yes":
        return "No"
    if row['TattoosPiercings6Months'] == "Yes":
        return "No"
    if row['InternationalTravel3Months'] == "Yes":
        return "No"
    return "Yes"

# Generate synthetic dataset
data = []

for _ in range(NUM_RECORDS):
    age = np.random.randint(16, 66)
    weight = round(np.random.normal(62 if age > 18 else 50, 10), 1)
    gender = random.choice(genders)

    last_donation = TODAY - timedelta(days=np.random.randint(30, 1000))
    chronic_yes = np.random.choice(yes_no, p=[0.2, 0.8])
    chronic_detail = random.choice(chronic_conditions if chronic_yes == "Yes" else ["None"])
    
    meds_yes = np.random.choice(yes_no, p=[0.25, 0.75])
    meds_detail = random.choice(medications if meds_yes == "Yes" else ["None"])

    fever = np.random.choice(yes_no, p=[0.1, 0.9])
    surgery = np.random.choice(yes_no, p=[0.05, 0.95])

    allergies_yes = np.random.choice(yes_no, p=[0.3, 0.7])
    allergy_detail = random.choice(allergies if allergies_yes == "Yes" else ["None"])

    vaccine_yes = np.random.choice(yes_no, p=[0.4, 0.6])
    vaccine_detail = random.choice(vaccines if vaccine_yes == "Yes" else ["None"])

    smoking_status = random.choice(smoking)
    alcohol_status = random.choice(alcohol)
    travel = random.choice(yes_no)
    tattoo = random.choice(yes_no)
    tested_positive = random.choice(yes_no)

    preg_breast_mens = "No"
    if gender == "Female":
        preg_breast_mens = random.choices(["Yes", "No"], weights=[0.2, 0.8])[0]

    row = {
        "Age": age,
        "Weight": weight,
        "Gender": gender,
        "LastDonationDate": last_donation.strftime("%Y-%m-%d"),
        "ChronicIllness": chronic_yes,
        "ChronicIllnessDetails": chronic_detail,
        "Medications": meds_yes,
        "MedicationDetails": meds_detail,
        "ColdFever7Days": fever,
        "Surgery6Months": surgery,
        "Allergies": allergies_yes,
        "AllergyDetails": allergy_detail,
        "Vaccinated4Weeks": vaccine_yes,
        "VaccineDetails": vaccine_detail,
        "SmokingHabits": smoking_status,
        "AlcoholDrinking": alcohol_status,
        "InternationalTravel3Months": travel,
        "TattoosPiercings6Months": tattoo,
        "TestedPositiveInfectious": tested_positive,
        "PregnantBreastfeedingMenstruating": preg_breast_mens,
    }

    row["Eligible"] = determine_eligibility(row)
    data.append(row)

# Save to CSV
df = pd.DataFrame(data)
df.to_csv("synthetic_blood_donation_data.csv", index=False)
print(" Dataset generated and saved as 'synthetic_blood_donation_data.csv'")
