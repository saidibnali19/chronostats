import { Entry } from "../../../../../../../shared/types/types";

interface Props {
    prev: () => void;
    submit: () => void;
    update: (patch: Partial<Entry>) => void;
    values: Entry;
}

export default function Step3Notes({ prev, submit, update, values }: Props) {
    return (
        <div>
            <h2>Notes & Tags</h2>

            <textarea
                placeholder="Notes"
                value={values.notes}
                onChange={(e) => update({ notes: e.target.value })}
            />

            <input
                type="text"
                placeholder="Tags (comma-separated)"
                value={values.tags.join(",")}
                onChange={(e) => update({ tags: e.target.value.split(",") })}
            />

            <button onClick={prev}>Back</button>
            <button onClick={submit}>Finish</button>
        </div>
    );
}
