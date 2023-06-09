
export type UserDetails = {
    mail: string,
    username: string,
    token: string,
    status: "Active" | "Pending",
    _id: string
}
export type UserPost = {
    name: string;
    url: string;
    size: number;
    dateAdded: Date;
}
export type AppDispatch = typeof import('../store/store').default.dispatch;
