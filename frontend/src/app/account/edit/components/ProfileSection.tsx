"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfileSection() {
    const { user, refreshUser } = useAuth();

    // const [lastName, setLastName] = useState(user?.lastName);
    // const [firstName, setFirstName] = useState(user?.firstName);

    // const [dob, setDob] = useState(user?.dob || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [location, setLocation] = useState(user?.location || "");
    const [phone, setPhone] = useState(user?.phone || "");

    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const router = useRouter();

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    }

    async function handleSave() {
        const formData = new FormData();
        // formData.append("firstName", firstName);
        // formData.append("lastName", lastName);
        // formData.append("dob", dob);
        formData.append("gender", gender);
        formData.append("location", location);
        formData.append("phone", phone);

        if (avatarFile) {
            formData.append("avatar", avatarFile);
        }

        console.log(formData);

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/edit`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        await refreshUser();

        router.push("/account");
    }

    return (
        <div className="space-y-6">
            {/* Avatar */}
            <div className="card bg-base-400 grid divide-y divide-solid divide-black p-0 shadow-sm md:row-start-1 md:-row-end-1 md:p-8">
                <div className="bg-base-500 mt-auto grid grid-rows-[auto_auto] place-content-baseline gap-4 px-4 py-4 md:px-8">
                    {avatarPreview ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/avatarPreview`}
                            alt=""
                            width={150}
                            height={180}
                            className="rounded-sm object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center gap-4 rounded-sm bg-gray-100 p-4 text-sm">
                            <div className="btn btn-secondary inline-flex h-30 w-20 items-center justify-around rounded-full p-0 text-white">
                                <UserIcon className="h-30 w-20" />
                            </div>
                            <span>No Image</span>
                        </div>
                    )}
                </div>

                <label className="btn btn-secondary">
                    Update profile photo
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </label>
            </div>

            {/* Name Fields */}
            <div className="bg-base-500 space-y-4 px-8 py-4">
                {/* <label className="grid gap-2">
                    <span>First Name</span>
                    <input
                        className="form-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder={firstName}
                    />
                </label>
                <label className="grid gap-2">
                    <span>Last Name</span>
                    <input
                        className="form-input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder={lastName}
                    />
                </label> */}

                {/* <label className="grid gap-2">
                    <span>Date of Birth</span>
                    <input
                        type="date"
                        className="form-input"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        placeholder={dob}
                    />
                </label> */}
                <div className="grid gap-1">
                    <span>Gender</span>

                    <div className="form-input flex w-full flex-wrap items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={gender === "Male"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <span>Male</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={gender === "Female"}
                                onChange={(e) => setGender(e.target.value)}
                            />
                            <span>Female</span>
                        </label>
                    </div>
                </div>

                <label className="grid gap-2">
                    <span>Location</span>
                    <input
                        className="form-input w-full"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={location}
                    />
                </label>
                <label className="grid gap-2">
                    <span>Phone</span>
                    <input
                        className="form-input w-full"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={phone}
                    />
                </label>
            </div>

            <button onClick={handleSave} className="btn btn-primary">
                Save Changes
            </button>
        </div>
    );
}
