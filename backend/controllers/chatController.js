const axios = require("axios");
const User = require("../models/User");
const Eligibility = require("../models/Eligibility");
const BloodRequest = require("../models/BloodRequest"); 

// exports.chatWithGPT = async (req, res) => {
//   const { message } = req.body;
//   if (!message || typeof message !== "string") {
//     return res.status(400).json({ reply: "Invalid input message." });
//   }

//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "deepseek/deepseek-r1:free",
//         messages: [
//           { role: "system", content: "You are a helpful assistant." },
//           { role: "user", content: message },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const reply = response.data.choices[0].message.content;
//     console.log("Reply from Deepseek:", reply);
//     res.json({ reply });
//   } catch (error) {
//     console.error("Deepseek API error:", error.response?.data || error.message);
//     res.status(500).json({ reply: "Sorry, something went wrong." });
//   }
// };

// exports.chatWithGPT = async (req, res) => {
//   const { message } = req.body;

//   if (!message || typeof message !== "string") {
//     return res.status(400).json({ reply: "Invalid input message." });
//   }

//   try {
//     const userId = req.user._id;

//     const user = await User.findById(userId).lean();
//     const eligibility = await Eligibility.findOne({ userId }).lean();

//     if (!user) {
//       return res.status(404).json({ reply: "User not found." });
//     }

//     // Create a concise summary to give context to the bot
//     const userContext = `
// This is a logged-in user on the RedAlert blood donation platform.

// Profile Summary:
// - Name: ${user.name}
// - Role: ${user.role}
// - Blood Type: ${user.bloodType}
// - Location: ${user.location || "N/A"}
// - Last Donation Date: ${user.lastDonationDate || "Not provided"}
// - Available: ${user.isAvailable ? "Yes" : "No"}

// Medical Info:
// - Illness: ${user.medicalHistory?.illness || "N/A"} (${user.medicalHistory?.illnessStatus || "N/A"})
// - Smoking: ${user.medicalHistory?.smoking || "N/A"}
// - Alcohol: ${user.medicalHistory?.alcohol || "N/A"}
// - Vaccination: ${user.medicalHistory?.vaccinationStatus || "N/A"}

// Eligibility Details:
// ${eligibility ? `
// - Age: ${eligibility.age}
// - Weight: ${eligibility.weight}
// - Chronic Illness: ${eligibility.chronicIllness}
// - Medications: ${eligibility.medications}
// - Allergies: ${eligibility.allergies}
// - Eligible to donate: ${eligibility.isEligible ? "Yes" : "No"}
// ` : "No eligibility record found."}
//     `;

//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "deepseek/deepseek-r1:free",
//         messages: [
//           {
//             role: "system",
//             content: `You are RedAlert's chatbot assistant. Help the user with blood donation advice, app guidance, and respond based on their profile and health info.\n\n${userContext}`,
//           },
//           { role: "user", content: message },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const reply = response.data.choices[0].message.content;
//     console.log("Reply from Deepseek:", reply);
//     res.json({ reply });

//   } catch (error) {
//     console.error("Deepseek API error:", error.response?.data || error.message);
//     res.status(500).json({ reply: "Sorry, something went wrong." });
//   }
// };

exports.chatWithGPT = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Invalid input message." });
  }

  try {
    const userId = req.user._id;

    const user = await User.findById(userId).lean();
    const eligibility = await Eligibility.findOne({ userId }).lean();

    if (!user) {
      return res.status(404).json({ reply: "User not found." });
    }

    // 1️⃣ User context
    const userContext = `
This is a logged-in user on the RedAlert blood donation platform.

Profile Summary:
- Name: ${user.name}
- Role: ${user.role}
- Blood Type: ${user.bloodType}
- Location: ${user.location || "N/A"}
- Last Donation Date: ${user.lastDonationDate || "Not provided"}
- Available: ${user.isAvailable ? "Yes" : "No"}

Medical Info:
- Illness: ${user.medicalHistory?.illness || "N/A"} (${user.medicalHistory?.illnessStatus || "N/A"})
- Smoking: ${user.medicalHistory?.smoking || "N/A"}
- Alcohol: ${user.medicalHistory?.alcohol || "N/A"}
- Vaccination: ${user.medicalHistory?.vaccinationStatus || "N/A"}

Eligibility Details:
${eligibility ? `
- Age: ${eligibility.age}
- Weight: ${eligibility.weight}
- Chronic Illness: ${eligibility.chronicIllness}
- Medications: ${eligibility.medications}
- Allergies: ${eligibility.allergies}
- Eligible to donate: ${eligibility.isEligible ? "Yes" : "No"}
` : "No eligibility record found."}
`;

    // 2️⃣ Blood Requests Matching This User’s Blood Type and Pending
    const bloodRequests = await BloodRequest.find({
      bloodType: user.bloodType,
      status: "pending",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const bloodRequestContext = bloodRequests.length
      ? bloodRequests
          .map((req, index) => {
            return `Request #${index + 1}:
- Hospital: ${req.hospitalName}
- District: ${req.district}
- Contact: ${req.contactPerson} (${req.emergencyPhone})
- Blood Type: ${req.bloodType}
- Quantity: ${req.quantity}
- Urgency: ${req.urgencyLevel}
- Patient: ${req.patientName}, Ward: ${req.ward}, Condition: ${req.condition}
- Donation Location: ${req.donationLocation}
- Donation Time: ${req.donationTime}
- Additional Info: ${req.additionalInfo || "N/A"}
`;
          })
          .join("\n")
      : "There are no matching blood requests at the moment.";

    // 3️⃣ Final System Prompt
    const systemPrompt = `
You are RedAlert's AI assistant. Help the user with blood donation queries, advice, and guidance.

Here is the user's information:
${userContext}

Here are recent pending blood requests matching the user's blood type:
${bloodRequestContext}
`;

    // 4️⃣ Send to DeepSeek
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          { role: "user", content: message },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    console.log("Reply from Deepseek:", reply);
    res.json({ reply });

  } catch (error) {
    console.error("Deepseek API error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Sorry, something went wrong." });
  }
};