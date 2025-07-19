const axios = require("axios");

exports.chatWithGPT = async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Invalid input message." });
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
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
