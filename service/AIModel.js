export const AIChatSession = async (prompt, format = 'json') => {
  if (!prompt) {
    console.error("Error: Prompt is required!");
    return "Prompt is required.";
  }

  const apiKey = import.meta.env.VITE_HUGGING_FACE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing API key. Ensure it's defined in your .env file.");
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API Response:", data); // Log the raw response

    if (!data || !data[0]?.generated_text) return "No response available";

    // Handle response based on the specified format
    if (format === 'html') {
      // Return the raw generated text for HTML
      return data[0].generated_text;
    } else if (format === 'json') {
      // Extract and parse JSON for JSON format
      const jsonMatch = data[0].generated_text.match(/\[.*\]/s);
      if (!jsonMatch) {
        console.error("Generated Text:", data[0].generated_text); // Log the generated text
        throw new Error("Invalid JSON response format");
      }
      return JSON.parse(jsonMatch[0]); // Parse only the extracted JSON
    } else {
      throw new Error("Invalid format specified. Use 'html' or 'json'.");
    }
  } catch (error) {
    console.error("Error generating response:", error);
    return "Failed to generate response.";
  }
};