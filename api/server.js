const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 5001;

const corsOptions = {
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

// Initialize Gemini AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(bodyParser.json());

// POST route to generate chat response
app.post("/generate", async (req, res) => {
    const { context } = req.body;

    if (!context) {
        return res.status(400).json({ error: "Context is required" });
    }

    try {
        // Generate content using the Gemini model
        const result = await model.generateContent(`Give me a creative ${context} that will definitely get a smile`);
        const messageContent = result.response.text() || "No response generated.";

        res.json({ response: messageContent });
    } catch (error) {
        console.error("Error querying Google Gemini:", error);
        res.status(500).json({ error: "Failed to generate a response. Try again later." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
