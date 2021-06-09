import axios from 'axios'
import NProgress from 'nprogress';
import store from '../helpers/api';
import router from "../router";

const token = localStorage.getItem('token')
const instance = axios.create({
    baseURL: '/api'
})

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
    NProgress.start()
    return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
    NProgress.done()
    return response
})
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        window.location.href = '/sign'
    } else {
        return Promise.reject(error);
    }
});


function get(url) {
    return instance({
        method: 'GET',
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

function post(url, payload) {
    return instance({
        method: 'POST',
        url: url,
        data: payload,
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}

function put(url, payload) {
    return instance({
        method: 'PUT',
        url: url,
        data: payload,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
// delete is reserved keyword
function del(url) {
    return instance({
        method: 'DELETE',
        url: url,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export {
    get, post, del, put
}

