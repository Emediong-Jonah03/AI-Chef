import { useEffect } from "react";

function AIResponse({ ingredients, onRecipeGenerated }) {
    async function query(data) {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    useEffect(() => {
        if (ingredients && ingredients.length > 0) {
            query({ 
                messages: [
                    {
                        role: "user",
                        content: `Generate a detailed recipe using these ingredients: ${ingredients.join(", ")}. Include title, ingredients list, and step by step instructions.`,
                    },
                ],
                model: "zai-org/GLM-4.6:novita",
            }).then((response) => {
                if (response.choices && response.choices[0]) {
                    onRecipeGenerated(response.choices[0].message.content);
                }
            });
        }
    }, [ingredients, onRecipeGenerated]);

    return null;
} 

export default AIResponse;