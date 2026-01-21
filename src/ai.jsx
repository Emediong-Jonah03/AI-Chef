import { useEffect } from "react";

const PAYLOAD = (ingredients) => ({
    messages: [{ role: "user", content: `Generate a detailed recipe using these ingredients: ${ingredients.join(", ")}. Include title, ingredients list, and step by step instructions` }],
    model: "zai-org/GLM-4.7-Flash:novita",
});

function isNetworkError(err) {
    return err?.message === "Failed to fetch" || (err?.name === "TypeError" && String(err?.message || "").toLowerCase().includes("fetch"));
}

function AIResponse({ ingredients, onRecipeGenerated, onError }) {
    async function query(data, signal) {
        if (!import.meta.env.VITE_HF_TOKEN) throw new Error("Missing VITE_HF_TOKEN in env");
        const res = await fetch("https://router.huggingface.co/v1/chat/completions", {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_HF_TOKEN}`, "Content-Type": "application/json" },
            method: "POST",
            signal,
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
    }

    useEffect(() => {
        if (!ingredients?.length) return;
        const controller = new AbortController();
        const { signal } = controller;

        (async () => {
            const data = PAYLOAD(ingredients);
            const maxAttempts = 2;

            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    const response = await query(data, signal);
                    const content = response?.choices?.[0]?.message?.content;
                    if (content) {
                        onRecipeGenerated(content);
                        return;
                    }
                    onError?.("No recipe generated. Please try again.");
                    return;
                } catch (err) {
                    if (err?.name === "AbortError") return;
                    console.error("Recipe generation failed", err);

                    const network = isNetworkError(err);
                    const canRetry = network && attempt < maxAttempts;

                    if (canRetry) {
                        await new Promise((r) => setTimeout(r, 1000 * attempt));
                        continue;
                    }

                    onError?.(network
                        ? "Network error. Check your connection and try again."
                        : "Failed to generate recipe. Please try again.");
                    return;
                }
            }
        })();

        return () => controller.abort();
    }, [ingredients, onRecipeGenerated, onError]);

    return null;
} 

export default AIResponse;