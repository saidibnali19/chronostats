import { useState } from "react";
import { Entry } from "../../../../../../../shared/types/types";

interface Props {
    next: () => void;
    prev: () => void;
    update: (patch: Partial<Entry>) => void;
    values: Entry;
}

export default function Step2Stats({ next, prev, update, values }: Props) {
    const [durationError, setDurationError] = useState("");
    const [productivityError, setProductivityError] = useState("");
    const [moodError, setMoodError] = useState("");

    const moodOptions = [
        "",
        "Happy",
        "Neutral",
        "Relaxed",
        "Energetic",
        "Motivated",
        "Tired",
        "Stressed",
        "Sad",
        "Anxious",
        "Calm",
    ];

    const handleDuration = (raw: string) => {
        if (raw === "") {
            setDurationError("Duration is required.");
            update({ duration: "" });
            return;
        }

        const value = Number(raw);

        if (value < 0) {
            setDurationError("Duration cannot be negative.");
        } else if (value === 0) {
            setDurationError("Duration must be greater than zero.");
        } else {
            setDurationError("");
        }

        update({ duration: value });
    };

    const handleProductivity = (raw: string) => {
        if (raw.trim() === "") {
            update({ productivity: "" });
            setProductivityError("");
            return;
        }

        const value = Number(raw);

        if (!Number.isInteger(value)) {
            setProductivityError("Productivity must be an integer.");
        } else if (value < 1) {
            setProductivityError("Minimum productivity is 1.");
        } else if (value > 10) {
            setProductivityError("Maximum productivity is 10.");
        } else {
            setProductivityError("");
        }

        update({ productivity: value });
    };

    const handleMood = (value: string) => {
        update({ mood: value });
        setMoodError("");
    };
    const isStepValid =
        values.duration !== "" && !durationError && !productivityError;

    return (
        <div className="card bg-base-400 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
                Duration & Scores
            </h2>

            <div className="space-y-4">
                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium"
                        htmlFor="entry-duration"
                    >
                        Duration (hours)
                    </label>
                    <input
                        id="entry-duration"
                        type="number"
                        step={0.25}
                        min={0}
                        placeholder="e.g. 2"
                        value={values.duration}
                        onChange={(e) => handleDuration(e.target.value)}
                        className={`form-input w-full ${
                            durationError ? "focus-visible:outline-red-500" : ""
                        }`}
                        required
                    />
                    {durationError && (
                        <p className="text-xs text-red-600">{durationError}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium"
                        htmlFor="entry-productivity"
                    >
                        Productivity (1–10)
                    </label>
                    <input
                        id="entry-productivity"
                        placeholder="e.g. 8"
                        type="number"
                        min={0}
                        max={10}
                        value={values.productivity}
                        onChange={(e) => handleProductivity(e.target.value)}
                        className={`form-input w-full ${
                            productivityError
                                ? "focus-visible:outline-red-500"
                                : ""
                        }`}
                    />
                    {productivityError && (
                        <p className="text-xs text-red-600">
                            {productivityError}
                        </p>
                    )}
                </div>

                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="entry-mood">
                        Mood
                    </label>
                    <select
                        id="entry-mood"
                        value={values.mood}
                        onChange={(e) => handleMood(e.target.value)}
                        className="form-input w-full"
                    >
                        {moodOptions.map((mood) => (
                            <option key={mood} value={mood}>
                                {mood || "Select mood"}
                            </option>
                        ))}
                    </select>
                    {moodError && (
                        <p className="text-xs text-red-600">{moodError}</p>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
                <button onClick={prev} className="btn btn-outline">
                    Back
                </button>
                <button
                    onClick={next}
                    className={`btn btn-secondary ${
                        !isStepValid ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={!isStepValid}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
