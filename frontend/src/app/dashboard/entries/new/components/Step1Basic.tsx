"use client";

import { useState } from "react";
import { Entry } from "../../../../../../../shared/types/types";

type Props = {
    next: () => void;
    update: (patch: Partial<Entry>) => void;
    values: Entry;
};

export default function Step1Basic({ next, update, values }: Props) {
    const [dateError, setDateError] = useState("");
    const [activityError, setActivityError] = useState("");

    // Validate Date
    const handleDate = (value: string) => {
        update({ date: value });

        if (!value) {
            setDateError("Date is required.");
        } else {
            setDateError("");
        }
    };

    // Validate Activity
    const handleActivity = (value: string) => {
        update({ activity: value });

        if (!value.trim()) {
            setActivityError("Activity is required.");
        } else {
            setActivityError("");
        }
    };

    // Form validity
    const isFormValid =
        values.date && values.activity.trim() && !dateError && !activityError;

    return (
        <div className="card bg-base-400 space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <div className="space-y-4">
                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="entry-date">
                        Date
                        <span className="text-red-500"> *</span>
                    </label>
                    <input
                        id="entry-date"
                        type="date"
                        value={values.date}
                        onChange={(e) => handleDate(e.target.value)}
                        className={`form-input w-full ${
                            dateError ? "border-red-500" : ""
                        }`}
                        required
                    />
                    {dateError && (
                        <p className="text-xs text-red-600">{dateError}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium"
                        htmlFor="entry-activity"
                    >
                        Activity
                        <span className="text-red-500"> *</span>
                    </label>
                    <input
                        id="entry-activity"
                        type="text"
                        placeholder="What did you do?"
                        value={values.activity}
                        onChange={(e) => handleActivity(e.target.value)}
                        className={`form-input w-full ${
                            activityError ? "border-red-500" : ""
                        }`}
                        required
                    />
                    {activityError && (
                        <p className="text-xs text-red-600">{activityError}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium"
                        htmlFor="entry-category"
                    >
                        Category
                    </label>
                    <select
                        value={values.category}
                        onChange={(e) => update({ category: e.target.value })}
                        className="form-input w-full"
                        id="entry-category"
                    >
                        <option value="">Select category</option>
                        <option value="Study">Study</option>
                        <option value="Work">Work</option>
                        <option value="Exercise">Exercise</option>
                        <option value="Leisure">Leisure</option>
                    </select>
                </div>
            </div>

            <button
                onClick={next}
                disabled={!isFormValid}
                className={`btn btn-secondary ml-auto block ${
                    !isFormValid && "cursor-not-allowed opacity-50"
                }`}
            >
                Next
            </button>
        </div>
    );
}
