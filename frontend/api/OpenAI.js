import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY });

const prompt = `I'm going to provide you with a food item, its list of ingredients, and its nutritional facts. Please return the following information in the exact JSON format I describe below. Please follow the format I describe below. Never break the format regardless of the circumstance. If there is an issue with your generation, simply make {success: false}. Never say anything about you being an AI Language Model. Your only two possible outputs should be the information in the format I ask for. If I miss out on ingredients or nutritional facts, still do your best to provide an output.

Here is the format:
{
success: boolean. true if you retrieved information. false if you failed to,
rating: integer. rates the food item on a scale of 1 to 10 where 1 is very unhealthy/unsafe and 10 is healthy. be generous with your rating.
warning: string. 1-2 sentences of any urgent life-threatening allergies/carcinogens or similar things to be worried about. leave empty if not urgent and life-threatening.
description: string. 2-3 sentences that provide essential information about the item and any concerns that I should be vary of
}`;

async function GenerateAdvisory(name, ingredients, nutrition) {
  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: `Food Item: ${name}
        Ingredients: ${ingredients}
        Nutritional Facts: ${nutrition}`,
      },
    ],
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
  });

  const data = JSON.parse(completion.choices[0].message.content);

  if (data.success) {
    console.log("hi");
    return data;
  } else {
    throw Error("Failed to generate advisory");
  }
}

export { GenerateAdvisory };
