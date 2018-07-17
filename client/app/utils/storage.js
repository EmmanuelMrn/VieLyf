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

export function setInStorage(key,Email) {
    if (!key) {
        console.error('Error, llave perdida');
    }

    try {
        localStorage.setItem(key, JSON.stringify(Email));
        console.log(JSON.stringify(Email));

    } catch (err)
    {
        console.error('Error')
    }
}