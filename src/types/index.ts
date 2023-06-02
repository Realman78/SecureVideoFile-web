
export type UserDetails = {
    mail: string,
    username: string,
    token: string,
    _id: string
}
export type AppDispatch = typeof import('../store/store').default.dispatch;
