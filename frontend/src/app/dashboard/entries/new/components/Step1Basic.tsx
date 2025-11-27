import { Entry } from "../../../../../../../shared/types/types";

type Props = {
    next: () => void;
    update: (patch: Partial<Entry>) => void;
    values: Entry;
};

export default function Step1Basic({ next, update, values }: Props) {
    return (
        <div>
            <h2>Basic Information</h2>

            <input
                type="date"
                value={values.date}
                onChange={(e) => update({ date: e.target.value })}
            />

            <input
                type="text"
                placeholder="Activity"
                value={values.activity}
                onChange={(e) => update({ activity: e.target.value })}
            />

            <select
                value={values.category}
                onChange={(e) => update({ category: e.target.value })}
            >
                <option value="">Select category</option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Exercise">Exercise</option>
                <option value="Leisure">Leisure</option>
            </select>

            <button onClick={next}>Next</button>
        </div>
    );
}
