// data/users.ts
export type User = {
    name: string;
    email: string;
    password: string;
};

export const users: User[] = [
    {
        email: 'user1@gmail.com',
        password: 'password123', // Simpan plaintext hanya untuk simulasi
        name: 'User One',
    },
    {
        email: 'user2@gmail.com',
        password: 'password456',
        name: 'User Two',
    },
];
