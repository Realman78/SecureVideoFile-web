import { RootState } from '../store/store';

export type AppDispatch = typeof import('../store/store').default.dispatch;
export type RootState = ReturnType<RootState>;
