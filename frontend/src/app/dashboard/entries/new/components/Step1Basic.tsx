"use client";

import { useState } from "react";
import { Entry } from "../../../../../../../shared/types/types";
import Step1Description from "./Step1Description";

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
            <Step1Description next={next} update={update} values={values} />

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-base-500 text-base-400 rounded-md p-[.5lh_2ch] font-medium">
                        OR FILL MANUALLY
                    </span>
                </div>
            </div>

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
