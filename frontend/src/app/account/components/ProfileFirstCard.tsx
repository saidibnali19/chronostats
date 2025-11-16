import Image from "next/image";
import { Mail, MapPinnedIcon, PhoneCall, User as UserIcon } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProfileFirstCard({ user }: any) {
    return (
        <>
            <article className="card bg-base-400 grid divide-y divide-solid divide-black p-0 shadow-sm md:row-start-1 md:-row-end-1">
                <div className="mt-auto grid grid-rows-[auto_auto] place-content-baseline gap-4 px-8 py-4">
                    {user.avatar ? (
                        <Image
                            src={user.avatar}
                            width={80}
                            height={120}
                            alt=""
                        />
                    ) : (
                        <div className="btn btn-secondary inline-flex h-30 w-20 items-center justify-around rounded-full p-0 text-white">
                            <UserIcon className="h-30 w-20" />
                        </div>
                    )}
                    <p>
                        {user.firstName} {user.lastName}
                    </p>
                </div>
                <div className="bg-base-500 space-y-4 px-8 py-4">
                    <p className="flex gap-2">
                        <MapPinnedIcon /> <span>{user.location || "N/A"}</span>
                    </p>
                    <p className="flex gap-2">
                        <Mail />
                        <span>{user.email}</span>
                    </p>
                    <p className="flex gap-2">
                        <PhoneCall />
                        <span>{user.phone || "N/A"}</span>
                    </p>
                </div>
            </article>
        </>
    );
}
