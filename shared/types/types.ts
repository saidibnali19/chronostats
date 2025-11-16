export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bio?: string;
    avatar?: string;
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
