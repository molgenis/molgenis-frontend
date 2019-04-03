import State, { Variant } from './types';

const state: State = {
    alert: null,
    showCloseButton: true,
    oidcClients: [{ name: 'client 1', url: 'https://nu.nl/' }],
    showRegister: true
}

export default state