import axios from 'axios'

const baseURL = 'http://gateway.marvel.com'

const instance = axios.create({
    baseURL
})

export const get = () => {
    instance.get('/v1/public/characters', {
        params: {
            apikey: '9ca9ecae549bcce48dad7c9782e2c2ee',

        }
    })
        .then(response => console.log(response))
        .catch(error => console.log(error))
}
