import { useState } from "react";
import { Entry } from "../../../../../../../shared/types/types";

interface Props {
    next: () => void;
    update: (patch: Partial<Entry>) => void;
    values: Entry;
}

export default function Step1Description({ update, values }: Props) {
    const [error, setError] = useState("");

    const handleDescription = (raw: string) => {
        const text = raw.trim();

        // Basic validation (customize if needed)
        if (text.length < 10) {
            setError("Please provide at least 10 characters.");
        } else {
            setError("");
        }

        update({ description: raw });
    };

    function handleMagicFill() {
        console.log("Magic Fill");
        // Implement functionality here
    }

    return (
        <div className="card space-y-4 border-teal-200 bg-linear-to-br from-teal-50 to-blue-50">
            <h3 className="text-lg font-semibold">✨ AI-Powered Auto-Fill</h3>
            <p className="text-sm">
                Simply describe what you worked on in your own words. Our AI
                will automatically fill in the details, categorize your
                activity, and structure your entry.
            </p>

            <textarea
                id="entry-description"
                rows={4}
                placeholder="Example: Spent 2 hours debugging the login issue on the mobile app. Fixed the OAuth token refresh problem and deployed to staging..."
                className={`form-input w-full resize-y border-teal-300 bg-linear-to-br from-teal-50 to-blue-50 text-gray-900 placeholder-gray-500 focus-visible:outline-teal-500 ${error ? "focus-visible:outline-red-500!" : ""}`}
                value={values.description}
                onChange={(e) => handleDescription(e.target.value)}
            />
            {error && <p className="text-xs text-red-600">{error}</p>}

            <button
                id="magicFillBtn"
                className="btn btn-secondary flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-300"
                onClick={handleMagicFill}
                disabled={!!error}
            >
                <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                </svg>
                <span>Magic Fill with AI</span>
            </button>
        </div>
    );
}
