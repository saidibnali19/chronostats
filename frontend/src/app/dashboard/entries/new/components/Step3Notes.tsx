import { Entry } from "../../../../../../../shared/types/types";

interface Props {
    prev: () => void;
    submit: () => void;
    update: (patch: Partial<Entry>) => void;
    values: Entry;
}

export default function Step3Notes({ prev, submit, update, values }: Props) {
    return (
        <div className="card bg-base-400 space-y-4">
            <h2 className="text-xl font-semibold">Notes & Tags</h2>

            <div className="space-y-4">
                <div className="grid gap-2">
                    <label
                        className="text-sm font-medium"
                        htmlFor="entry-notes"
                    >
                        Notes
                    </label>
                    <textarea
                        id="entry-notes"
                        placeholder="Write optional notes about this activity"
                        value={values.notes}
                        onChange={(e) => update({ notes: e.target.value })}
                        className="form-input h-32 w-full"
                    />
                </div>
                <div className="grid gap-2">
                    <label className="text-sm font-medium" htmlFor="entry-tags">
                        Tags (comma-separated)
                    </label>
                    <input
                        id="entry-tags"
                        type="text"
                        placeholder="focus,deep-work,reading"
                        value={values.tags.join(",")}
                        onChange={(e) =>
                            update({ tags: e.target.value.split(",") })
                        }
                        className="form-input w-full"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-4">
                <button onClick={prev} className="btn btn-outline">
                    Back
                </button>

                <button
                    onClick={submit}
                    className="btn btn-secondary bg-green-600 text-white hover:bg-green-700"
                >
                    Finish
                </button>
            </div>
        </div>
    );
}
