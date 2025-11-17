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
