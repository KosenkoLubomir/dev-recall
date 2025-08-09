
export const MAX_PAGES_BY_FOLDER = (role: string) => {
    switch (role) {
        case 'admin':
        return 100; // Admins can have up to 100 pages per folder
        case 'pro':
        return 50; // Editors can have up to 50 pages per folder
        default:
        return 10; // Default limit for other roles
    }
}

export const MAX_FOLDERS = (role: string) => {
    switch (role) {
        case 'admin':
        return 50; // Admins can create up to 50 folders
        case 'pro':
        return 50; // Editors can create up to 20 folders
        default:
        return 10;
    }
}

