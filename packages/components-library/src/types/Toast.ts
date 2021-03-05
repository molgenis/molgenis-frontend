
export type Toast = {
    message: string;
    timeout?: number;
    type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}
