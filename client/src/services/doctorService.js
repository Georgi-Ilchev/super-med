
export const getAll = (category = '') => {
    let url = 'http://localhost:5000/doctors';
    url += category ? `?category=${category}` : '';

    return fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err));
}