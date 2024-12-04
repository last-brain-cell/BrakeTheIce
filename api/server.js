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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// Middleware
app.use(bodyParser.json());


const responseHistory = []; // Holds the last 10 responses

app.post("/generate", async (req, res) => {
    const { context } = req.body;

    if (!context) {
        return res.status(400).json({ error: "Context is required" });
    }

    // Build a history string for the prompt
    const historyString = responseHistory.length > 0
        ? `Here are previous responses: ${responseHistory.join(", ")}. Avoid generating anything too similar to these.`
        : "There is no prior history. Feel free to be as creative as possible!";

    // System prompt for diversity
    const systemPrompt = `
        You are a highly creative assistant whose job is to generate fresh, unique, 
        and interesting content. Always avoid repetition and strive for novelty.
        ${historyString}
    `;

    const prompts = [
        `${systemPrompt} Now, give me a cool, random ${context} that would impress anyone.`,
        `${systemPrompt} Please share an interesting ${context} that nobody expects.`,
        `${systemPrompt} Can you give me a unique and creative ${context} that is different from anything you've shared before?`,
        `${systemPrompt} Provide a fun ${context} that feels fresh and surprising.`,
    ];

    try {
        // Generate content using the Gemini model
        const result = await model.generateContent(prompts[Math.floor(Math.random() * prompts.length)]);
        const messageContent = result.response.text() || "No response generated.";

        // Update the history (limit to last 10 responses)
        if (responseHistory.length >= 12) {
            responseHistory.shift(); // Remove the oldest response
        }
        responseHistory.push(messageContent); // Add the new response

        res.json({ response: messageContent });
    } catch (error) {
        console.error("Error querying Google Gemini:", error);
        res.status(500).json({ error: "Failed to generate a response. Try again later." });
        res.json({ response: "Oopsie, Error while generating!" });
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
