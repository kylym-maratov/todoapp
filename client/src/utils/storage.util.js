
export function setLocalItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function destroyLocalItem(key) {
    localStorage.removeItem(key);
}