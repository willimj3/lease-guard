const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic.default({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT =
  "You are an experienced tenant-side housing attorney reviewing a residential lease agreement. " +
  "Analyze the lease and identify provisions that are unfavorable, unusual, or potentially unenforceable for the tenant. " +
  "For each issue: quote the specific language, explain the legal concern in plain English a non-lawyer would understand, " +
  "rate severity as High/Medium/Low, and suggest what the tenant should negotiate for instead. " +
  "At the end, give an overall assessment of whether this lease is tenant-friendly, standard, or landlord-favorable.";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { text } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "Lease text is required." });
  }

  if (text.length > 100000) {
    return res
      .status(400)
      .json({ error: "Lease text is too long. Please limit to 100,000 characters." });
  }

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content:
            "Please review the following residential lease agreement and provide your analysis:\n\n" +
            text,
        },
      ],
    });

    const analysis = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n\n");

    res.json({ analysis });
  } catch (err) {
    console.error("Anthropic API error:", err.message);

    if (err.status === 401) {
      return res
        .status(500)
        .json({ error: "Invalid API key. Check your ANTHROPIC_API_KEY in .env." });
    }
    if (err.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limited. Please wait a moment and try again." });
    }

    res.status(500).json({ error: "AI analysis failed. Please try again later." });
  }
};
