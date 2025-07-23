# from flask import Flask, request, jsonify
# import joblib
# import numpy as np
# from datetime import datetime

# app = Flask(__name__)

# #Load model and encoders

# model = joblib.load("BloodDonationEligibilityModel3.joblib")
# label_encoders = joblib.load("LabelEncoders3.joblib")
# mlb_dict = joblib.load("MultiLabelBinarizers3.joblib")  # new


# @app.route('/eligibilityPredict', methods=['POST'])
# def eligibility_predict():
#  try: 
#     data = request.json
#     input_data = []
#     print("Expected features:", model.feature_names_in_)

#     print("Incoming data:", data)


#     for feature in model.feature_names_in_:
#         print("Checking feature:", feature, "Value:", data.get(feature))
        
#         if feature == "DaysSinceLastDonation":
#            donation_date_str = data.get("LastDonationDate")
#            if not donation_date_str:
#               return jsonify({"error":"Missing LastDonationDate"}), 400
#            try:
#               donation_date = datetime.fromisoformat(donation_date_str)
#            except Exception:
#               return jsonify({"error":"Invalid date format for LastDonationDate"}), 400
#            days_since = (datetime.today().date() - donation_date.date()).days
#            input_data.append(days_since)
#            continue
#        # Multiselect field prefix check
#         matched = False
#         for multiselect_field, mlb in mlb_dict.items():
#          if feature.startswith(multiselect_field + "_"):
#             raw_values = data.get(multiselect_field, [])
#             if not isinstance(raw_values, list):
#                 return jsonify({"error": f"{multiselect_field} must be a list"}), 400

#             binarized = mlb.transform([raw_values])[0]
#             col_index = mlb.classes_.tolist().index(feature[len(multiselect_field) + 1:])
#             input_data.append(binarized[col_index])
#             matched = True
#             break
#         if matched:
#          continue

#     # Normal categorical field (e.g., Gender)
        
        
#         value = data.get(feature,"No") if feature == "PregnantBreastfeedingMenstruating" else data.get(feature)
        
#         if value is None:
#             if feature in ["ChronicIllnessDetails", "MedicationDetails", "AllergyDetails", "VaccineDetails"]:
#               value = "None"
#             else:
#                print(f"Missing feature in request data: {feature}")
#                return jsonify({"error": f"Missing feature: {feature}"}), 400
        
        
#         # Handle if value is a list (especially for VaccineDetails)
#         if isinstance(value, list):
#          if feature in ["VaccineDetails", "AllergyDetails", "ChronicIllnessDetails", "MedicationDetails"]:
#            value = ", ".join(value).strip()
#          else:
#            return jsonify({"error": f"Unexpected list for feature '{feature}'"}), 400

#         if isinstance(value, str):
#            value = value.strip()
#         #Encode if it's a categorical feature
#         if feature in label_encoders:
#             encoder = label_encoders[feature]

#             if value not in encoder.classes_:
#                 return jsonify({"error":f"Invalid value '{value}' for feature '{feature}'"}), 400
#             value = encoder.transform([value])[0]
#         input_data.append(value)

#     prediction = model.predict([input_data])[0]
#     print("Prediction:", prediction)
#     result = True if prediction == 1 else False 

#     return jsonify({"result": result})
#  except Exception as e:
#      print("Error in  Prediction:", str(e))
#      return jsonify({"error": str(e)}),500

# if __name__ == '__main__':
#     app.run( host = "0.0.0.0",port=5000)

# from flask import Flask, request, jsonify
# import joblib
# import numpy as np
# from datetime import datetime

# app = Flask(__name__)

# # Load model and encoders
# model = joblib.load("BloodDonationEligibilityModel3.joblib")
# label_encoders = joblib.load("LabelEncoders3.joblib")
# mlb_dict = joblib.load("MultiLabelBinarizers3.joblib")

# @app.route('/eligibilityPredict', methods=['POST'])
# def eligibility_predict():
#     try:
#         data = request.json
#         input_data = []

#         print("Expected features:", model.feature_names_in_)
#         print("Incoming data:", data)

#         for feature in model.feature_names_in_:
#             # Handle LastDonationDate
#             if feature == "DaysSinceLastDonation":
#                 donation_date_str = data.get("LastDonationDate")
#                 if not donation_date_str:
#                     return jsonify({"error": "Missing LastDonationDate"}), 400
#                 try:
#                     donation_date = datetime.fromisoformat(donation_date_str)
#                 except Exception:
#                     return jsonify({"error": "Invalid date format for LastDonationDate"}), 400
#                 days_since = (datetime.today().date() - donation_date.date()).days
#                 input_data.append(days_since)
#                 continue

#             # Handle multiselect binarized features
#             matched = False
#             for multiselect_field, mlb in mlb_dict.items():
#                 if feature.startswith(multiselect_field + "_"):
#                     raw_values = data.get(multiselect_field, [])
#                     if not isinstance(raw_values, list):
#                         return jsonify({"error": f"{multiselect_field} must be a list"}), 400
#                     binarized = mlb.transform([raw_values])[0]
#                     class_label = feature[len(multiselect_field) + 1:]
#                     if class_label in mlb.classes_:
#                         col_index = mlb.classes_.tolist().index(class_label)
#                         input_data.append(binarized[col_index])
#                     else:
#                         input_data.append(0)  # If feature is missing in input, assume 0
#                     matched = True
#                     break
#             if matched:
#                 continue

#             # Normal categorical/numerical feature
#             value = data.get(feature)

#             if value is None:
#                 return jsonify({"error": f"Missing feature: {feature}"}), 400

#             if isinstance(value, str):
#                 value = value.strip()

#             # Label encode categorical fields
#             if feature in label_encoders:
#                 encoder = label_encoders[feature]
#                 if value not in encoder.classes_:
#                     return jsonify({"error": f"Invalid value '{value}' for feature '{feature}'"}), 400
#                 value = encoder.transform([value])[0]

#             input_data.append(value)

#         # Predict
#         prediction = model.predict([input_data])[0]
#         result = bool(prediction)

#         return jsonify({"result": result})

#     except Exception as e:
#         print("Error in Prediction:", str(e))
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(host="0.0.0.0", port=5000)

from flask import Flask, request, jsonify
import joblib
import pandas as pd
from datetime import datetime

app = Flask(__name__)

# Load model and encoders
model = joblib.load("BloodDonationEligibilityModel3.joblib")
label_encoders = joblib.load("LabelEncoders3.joblib")

# Helper function
def calculate_days_since_last_donation(donation_date_str):
    try:
        donation_date = datetime.fromisoformat(donation_date_str)
    except Exception:
        raise ValueError("Invalid date format for LastDonationDate")
    return (datetime.today().date() - donation_date.date()).days

@app.route('/eligibilityPredict', methods=['POST'])
def eligibility_predict():
    try:
        data = request.json
        print("Incoming data:", data)

        # Expected multi-select categories
        chronic_illness_options = [
            'Asthma', 'Diabetes', 'Epilepsy', 'Heart Disease', 'Hypertension', 'Kidney Disease', 'Thyroid'
        ]
        medication_options = [
            'Antidepressants', 'Asthma Inhalers', 'Beta Blockers', 'Blood Thinners', 'Insulin', 'Thyroid Medication'
        ]
        vaccine_options = [
            'COVID-19', 'HPV', 'Hepatitis B', 'Influenza', 'Tetanus'
        ]
        allergy_options = [
            'Bee Stings', 'Dust', 'Latex', 'Peanuts', 'Penicillin', 'Pollen'
        ]

        # One-hot encoder helper
        def one_hot_encode_multi(value_str, options, prefix):
            result = {}
            selected = [v.strip() for v in value_str.split(',')] if value_str else []
            for opt in options:
                key = f"{prefix}_{opt}"
                result[key] = 1 if opt in selected else 0
            return result

        # Build input dict
        input_data = {
            'Age': int(data['Age']),
            'Weight': int(data['Weight']),
            'Gender': data['Gender'],
            'ChronicIllness': data['ChronicIllness'],
            'Medications': data['Medications'],
            'ColdFever7Days': data['ColdFever7Days'],
            'Surgery6Months': data['Surgery6Months'],
            'Allergies': data['Allergies'],
            'Vaccinated4Weeks': data['Vaccinated4Weeks'],
            'SmokingHabits': data['SmokingHabits'],
            'AlcoholDrinking': data['AlcoholDrinking'],
            'InternationalTravel3Months': data['InternationalTravel3Months'],
            'TattoosPiercings6Months': data['TattoosPiercings6Months'],
            'TestedPositiveInfectious': data['TestedPositiveInfectious'],
            'PregnantBreastfeedingMenstruating': data['PregnantBreastfeedingMenstruating'],
            'DaysSinceLastDonation': calculate_days_since_last_donation(data['LastDonationDate']),
        }

        # Merge one-hot encoded multiselects
        input_data.update(one_hot_encode_multi(data.get('ChronicIllnessDetails', ''), chronic_illness_options, 'ChronicIllnessDetails'))
        input_data.update(one_hot_encode_multi(data.get('MedicationDetails', ''), medication_options, 'MedicationDetails'))
        input_data.update(one_hot_encode_multi(data.get('VaccineDetails', '').replace(' Vaccine', ''), vaccine_options, 'VaccineDetails'))
        input_data.update(one_hot_encode_multi(data.get('AllergyDetails', ''), allergy_options, 'AllergyDetails'))

        # Convert to DataFrame
        input_df = pd.DataFrame([input_data])

        # Apply label encoders if needed
        for col, encoder in label_encoders.items():
            if col in input_df.columns:
                input_df[col] = encoder.transform(input_df[col])

        # Ensure all model features exist in input_df (set missing ones to 0)
        for col in model.feature_names_in_:
            if col not in input_df.columns:
                input_df[col] = 0

        input_df = input_df[model.feature_names_in_]  # Reorder columns to match model

        prediction = model.predict(input_df)[0]
        print("Model Prediction:", prediction,"| Type:", type(prediction))
        return jsonify({'result': prediction == "Yes"})
        

    except ValueError as ve:
        print("Validation Error:", str(ve))
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        print("Error in Prediction:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001)

