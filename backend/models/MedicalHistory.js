const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    illness: { type: String, required: true, enum: ['None', 'Diabetes', 'Hypertension', 'Asthma', 'Other'] },
    illnessStatus: { type: String, required: true, enum: ['Ongoing', 'Recovered', 'Managed'] },
    smoking: { type: String, required: true, enum: ['never', 'occasional', 'regular'] },
    alcohol: { type: String, required: true, enum: ['never', 'occasional', 'regular'] },
    vaccinationStatus: { type: String, required: true, enum: ['not_vaccinated', 'partial', 'fully'] },
    vaccineType: { type: String, default: '' },
    doseCount: { type: Number, default: 0 },
    lastVaccinationDate: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Add a pre-save hook to update updatedAt timestamp
medicalHistorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);
