export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio?: string;
    avatar?: string;
    location?: string;
    phone?: string;
    dob?: Date;
    gender?: "Male" | "Female";
}

export interface Feature {
    title: string;
    description: string;
    icon: string;
}

export interface BlogPost {
    title: string;
    imageUrl: string;
}

export interface Entry {
    date: string;
    activity: string;
    category: string;

    duration: number | ""; // allow empty input during typing
    productivity: number | ""; // same reason
    mood: string;

    notes: string;
    tags: string[];

    description?: string; // detailed description of the activity for AI auto-fill
}
