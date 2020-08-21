import request from 'superagent';

const URL = process.env.REACT_APP_API_URL;

export function signUp(userData) {
    try {
        return request.post(`${URL}/auth/signup`, userData) }
    catch (e) {
        console.log(e.message);
        }
}

export function signIn(userData) {
    try {
        return request.post(`${URL}/auth/signin`, userData) }
    catch (e) {
        console.log(e.message);
        }
}

export function fetchMovies() {
    const token = localStorage.getItem('token');
    try {
        return request
            .get(`${URL}/search?searchQuery=''`)
            .set('Authorization', token);
    } catch(e) {
        return { error: e.message };
    }
}

export function searchMovies(searchedItem) {
    const token = localStorage.getItem('token');
    try {
        return request
            .get(`${URL}/search?searchQuery=${searchedItem}`)
            .set('Authorization', token);
    } catch(e) {
        return { error: e.message };
    }
}

export function createFavorite(userData) {
    const token = localStorage.getItem('token');

    try {
        return request
            .post(`${URL}/api/favorites`, userData)
            .set('Authorization', token);
    }
    catch (e) {
        return { error: e.message };
    }
}