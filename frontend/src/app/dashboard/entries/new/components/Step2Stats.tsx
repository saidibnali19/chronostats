import { Entry } from "../../../../../../../shared/types/types";

interface Props {
    next: () => void;
    prev: () => void;
    update: (patch: Partial<Entry>) => void;
    values: Entry;
}

export default function Step2Stats({ next, prev, update, values }: Props) {
    return (
        <div>
            <h2>Duration & Scores</h2>

            <input
                type="number"
                placeholder="Duration (hours)"
                value={values.duration}
                onChange={(e) =>
                    update({
                        duration:
                            e.target.value === "" ? "" : Number(e.target.value),
                    })
                }
            />

            <input
                type="number"
                placeholder="Productivity (1-10)"
                value={values.productivity}
                onChange={(e) =>
                    update({
                        productivity:
                            e.target.value === "" ? "" : Number(e.target.value),
                    })
                }
            />

            <input
                type="text"
                placeholder="Mood"
                value={values.mood}
                onChange={(e) => update({ mood: e.target.value })}
            />

            <button onClick={prev}>Back</button>
            <button onClick={next}>Next</button>
        </div>
    );
}
