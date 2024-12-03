const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { CohereClientV2 } = require("cohere-ai");
require("dotenv").config();



const app = express();
const PORT = 5001;

const corsOptions = {
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

const cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY,
});

// Middleware
app.use(bodyParser.json());

// POST route to generate chat response
app.post("/generate", async (req, res) => {
    const { context } = req.body;

    if (!context) {
        return res.status(400).json({ error: "Context is required" });
    }

    try {
        const response = await cohere.chat({
            model: "command-r-plus",
            messages: [
                {
                    role: "user",
                    content: `Give me cool ${context} that would impress anyone.`,
                },
            ],
        });

        // Parse and return the content
        const messageContent = response.message?.content
            ?.map((item) => item.text)
            .join(" ") || "No response generated.";

        res.json({ response: messageContent });
    } catch (error) {
        console.error("Error querying Cohere:", error);
        res.status(500).json({ error: "Failed to generate a response. Try again later." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
