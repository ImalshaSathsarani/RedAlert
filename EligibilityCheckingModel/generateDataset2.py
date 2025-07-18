import pandas as pd
import numpy as np

# Load your original dataset
df = pd.read_csv("synthetic_blood_donation_data.csv")

# Define possible multi-label values
chronic_conditions = ["Diabetes", "Hypertension", "Heart Disease", "Kidney Disease", "Asthma", "Epilepsy", "Cancer"]
medications = ["Blood Thinners", "Insulin", "Steroids", "Antibiotics", "Antihypertensives", "Painkillers"]
allergies = ["Pollen", "Dust", "Food", "Medication", "Latex", "Bee/Wasps"]
vaccines = ["COVID-19 Vaccine", "Hepatitis B", "Influenza", "Yellow Fever", "Typhoid", "Tetanus", "MMR"]

# Multi-hot encode columns
def multi_hot_encode_column(df, column_name, choices):
    for choice in choices:
        df[f"{column_name}_{choice}"] = df[column_name].apply(lambda x: 1 if choice in str(x).split(', ') else 0)
    return df.drop(columns=[column_name])

df = multi_hot_encode_column(df, "ChronicIllnessDetails", chronic_conditions)
df = multi_hot_encode_column(df, "MedicationDetails", medications)
df = multi_hot_encode_column(df, "AllergyDetails", allergies)
df = multi_hot_encode_column(df, "VaccineDetails", vaccines)

# Save to new file
df.to_csv("multilabel_synthetic_blood_donation_data.csv", index=False)
