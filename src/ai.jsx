import { useEffect } from "react";

function AIResponse({ ingredients, onRecipeGenerated }) {
    async function query(data, signal) {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                signal,
                body: JSON.stringify(data),
            }
        );
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
    }


    useEffect(() => {
        if (!ingredients || ingredients.length === 0) return;

        const controller = new AbortController();

        query(
            {
                messages: [
                    {
                        role: "user",
                        content: `Generate a detailed recipe using these ingredients: ${ingredients.join(", ")}. Include title, ingredients list, and step by step instructions`,
                    },
                ],
                model: "zai-org/GLM-4.7-Flash:novita",
            },
            controller.signal
        )
            .then((response) => {
                const content = response?.choices?.[0]?.message?.content;
                if (content) {
                    onRecipeGenerated(content);
                } else {
                    onRecipeGenerated("No recipe generated. Please try again.");
                }
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    console.error("Recipe generation failed", error);
                    onRecipeGenerated("Failed to generate recipe. Please try again.");
                }
            });

        return () => controller.abort();
    }, [ingredients, onRecipeGenerated]);

    return null;
} 

export default AIResponse;