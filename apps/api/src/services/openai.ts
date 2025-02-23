import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createChatCompletion = async (
  prompt: string,
  systemMessage: string
) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "chatgpt-4o-latest",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        { role: "user", content: prompt },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating completion:", error);
    throw error;
  }
};

export const generateLinkedInPost = async (topicStory: string) => {
  const prompt = `
    "Write a high-impact, viral LinkedIn post based on the topic story: '${topicStory}'  

    📌 **Formatting & Readability:**  
    - Short, crisp sentences (**under 60 characters**).  
    - Use **bullet points** for clarity and easy skimming.  
    - Maintain **world-class formatting** with **spaced-out paragraphs**.  

    🎯 **Engagement & Virality:**  
    - Start with a **bold, attention-grabbing hook**.  
    - Use **strong visuals in words** (e.g., 'Empty streets. Silent cafes.').  
    - Highlight **key pain points and insights** in a punchy style.  
    - Keep the **language conversational, yet professional**.  

    🚀 **Best Practices:**  
    - Avoid AI jargon or robotic phrases.  
    - Ensure every post is **unique, engaging, and discussion-worthy**.  
    - End with a **strong call to action (CTA)**, encouraging interaction.  
    - Add **3-5 relevant hashtags** to maximize visibility.  

    💡 **Generate a fresh, distinct post every time this prompt is run.**"  
  `;

  return createChatCompletion(
    prompt,
    "You are a LinkedIn content specialist, generating high-impact, viral posts that drive engagement."
  );
};
