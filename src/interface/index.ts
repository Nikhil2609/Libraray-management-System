export interface UserState {
    isLoggedIn: boolean;
    user: UserType | null;
    registeredUsers: UserType[];
}

export interface UserType {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
}

export interface Book {
    id: string;
    title: string,
    description: string,
    quantity: string;
    author: string;
}

export interface AssignedBook {
    id: string;
    student: string,
    book: string,
    issueDate: Date | string,
    returnDate: Date | string,
}

export interface GlobalState {
    user: UserState;
    book: { books: Book[] };
    assignBook: { assignedBooks: AssignedBook[] };
}