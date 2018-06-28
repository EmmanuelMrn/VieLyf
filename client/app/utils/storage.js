export function getFromStorage(key) {
    if (!key) {
        return null;
    }

    try {
        const valueStr = localStorage.getItem(key);
        if (valueStr) {
            return JSON.parse(valueStr);
        }
        return null;
    return null;
    } catch (err) {
        null
    }
}

export function setInStorage(key,obj) {
    if (!key) {
        console.error('Error, llave perdida');
    }

    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (err)
    {
        console.error('Error')
    }
}