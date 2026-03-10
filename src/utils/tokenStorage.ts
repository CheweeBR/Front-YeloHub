const STORAGE_KEY = 'token';

export const tokenStorage = {
    get: () => sessionStorage.getItem(STORAGE_KEY),
    set: (token:string) => sessionStorage.setItem(STORAGE_KEY, token),
    remove: () => sessionStorage.removeItem(STORAGE_KEY),
};