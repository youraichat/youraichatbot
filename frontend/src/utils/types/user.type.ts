export enum USER_ROLE {
    ADMIN = "adm",
    MANAGER = "mng",
    SUPPORT = "spt",
    USER = "usr",
}

export type UserType = {
    id: string;
    email: string;
    role: USER_ROLE
    photo: string;
    firstname: string;
    lastname: string;
    isArchived: boolean;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}