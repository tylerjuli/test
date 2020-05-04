import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const set = (object) => {
    localStorage["__SITE_USER__"] = (typeof object) === 'string' ? object : JSON.stringify(object);
    cookies.set('access_token', object.access_token)
    }
export const get = async () => {
    const value = await localStorage["__SITE_USER__"];
    if(!value) {
        return null;
    }
    try {
        const parsed = await JSON.parse(value);
        return parsed;
    } catch(e) {
        return value;
    }
    }
export const remove = () => {
    if(localStorage) {
        cookies.remove('access_token')
        return localStorage.removeItem("__SITE_USER__");
    }
    delete localStorage["__SITE_USER__"];
    }

