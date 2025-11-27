"use client";
import { useState } from "react";
import Step1Basic from "./Step1Basic";
import Step2Stats from "./Step2Stats";
import Step3Notes from "./Step3Notes";
import toast from "react-hot-toast";
import { Entry } from "../../../../../../../shared/types/types";

export default function Wizard() {
    const [step, setStep] = useState(1);

    const initialForm: Entry = {
        date: new Date().toISOString().slice(0, 10),
        activity: "",
        category: "",
        duration: "",
        productivity: "",
        mood: "",
        notes: "",
        tags: [],
    };

    const [form, setForm] = useState<Entry>(initialForm);

    const next = () => setStep(step + 1);
    const prev = () => setStep(step - 1);

    const update = (patch: Partial<Entry>) =>
        setForm((prev) => ({ ...prev, ...patch }));

    const submit = async () => {
        const payload = {
            ...form,
            duration: Number(form.duration),
            productivity: Number(form.productivity),
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/entries/new`,
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            },
        );

        if (!res.ok) {
            toast.error("Failed to create entry.");
            return;
        }

        toast.success("Entry created successfully!");
        setForm(initialForm);
        setStep(1);
    };

    return (
        <>
            {step === 1 && (
                <Step1Basic next={next} update={update} values={form} />
            )}
            {step === 2 && (
                <Step2Stats
                    next={next}
                    prev={prev}
                    update={update}
                    values={form}
                />
            )}
            {step === 3 && (
                <Step3Notes
                    prev={prev}
                    submit={submit}
                    update={update}
                    values={form}
                />
            )}
        </>
    );
}
