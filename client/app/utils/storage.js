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
<<<<<<< HEAD
    return null;
    } catch (err) {
        null
=======
    }catch(err){
        null;
>>>>>>> Sergio
    }
}

export function setInStorage(key,Email) {
    if (!key) {
        console.error('Error, llave perdida');
    }

    try {
<<<<<<< HEAD
        localStorage.setItem(key, JSON.stringify(Email));
        console.log(JSON.stringify(Email));

    } catch (err)
    {
        console.error('Error')
=======
        localStorage.setItem(key,JSON.stringify(obj))
    }catch(err){
        console.log('Error');
>>>>>>> Sergio
    }
}

// export function getEmailFromStorage(keyEmail) {
//     if (!keyEmail) {
//         return null;
//     }

//     try {
//         const valueStr = localStorage.getItem(keyEmail);
//         if (valueStr) {
//             return JSON.parse(valueStr);
//         }
//         return null;
//     return null;
//     } catch (err) {
//         null
//     }
// }

// export function setEmailInStorage(keyEmail,Email) {
//     if (!keyEmail) {
//         console.error('Error, Email perdido');
//     }

//     try {
//         localStorage.setItem(keyEmail, JSON.stringify(Email));
//         console.log(JSON.stringify(Email));

//     } catch (err)
//     {
//         console.error('Error')
//     }
// }