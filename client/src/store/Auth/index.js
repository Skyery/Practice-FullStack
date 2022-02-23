import axios from 'axios';

const setAxiosHeaderFromSession = () => {
    const token = JSON.parse(sessionStorage.getItem('userToken'))
    if (!token) return;
    axios.defaults.headers.common['token'] = token;
}
setAxiosHeaderFromSession();

export default {
    namespaced: true,
    state: {
        token: JSON.parse(sessionStorage.getItem('userToken')) || '',
        status: '',
        error: null
    },
    getters: {
        isLogIn: state => !!state.token,
        authStatus: state => state.status,
        error: state => state.error
    },
    actions: {
        // Login User
        async login({ commit, dispatch }, user) {
            try {
                commit('login_request');
                const res = await axios.post('/api/auth/login', user);
                if (res.data.success) {
                    const token = `Bearer ${res.data.token}`;

                    sessionStorage.setItem('userId', JSON.stringify(res.data._id));
                    sessionStorage.setItem('userToken', JSON.stringify(token));
                    axios.defaults.headers.common['token'] = token;
                    commit('login_success', token);
                    dispatch('Cart/initailCart', res.data._id, { root: true })
                }
                return res.data.success;
            } catch (err) {
                commit('login_error', err);
            }
        },

        // Register New User
        async register({ commit }, userData) {
            try {
                commit('register_request');
                const res = await axios.post('/api/auth/register', userData);
                if (res.data.success !== undefined) {
                    commit('register_success');
                }
                return res.data.success;
            } catch (err) {
                commit('register_error', err);
            }
        },

        // Logout User
        logout({ commit, dispatch }) {
            dispatch('Cart/removeCart', {}, { root: true });
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('userToken');
            sessionStorage.removeItem('isAdmin');
            commit('logout');
            delete axios.defaults.headers.common['token'];
            return;
        }
    },
    mutations: {
        login_request(state) {
            state.status = 'loading';
            state.error = null;
        },
        login_success(state, token) {
            state.token = token;
            state.status = 'success';
            state.error = null;
        },
        login_error(state, err) {
            state.error = err.response.data.msg;
        },
        register_request(state) {
            state.status = 'loading';
            state.error = null;
        },
        register_success(state,) {
            state.status = 'success';
            state.error = null;
        },
        register_error(state, err) {
            state.error = err.response.data.msg;
        },
        logout(state) {
            state.token = '';
            state.status = '';
            state.error = null;
        }
    },
}
