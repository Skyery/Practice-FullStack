import axios from 'axios';

const updateSessionStogage = (cart) => {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

export default {
    namespaced: true,
    state: {
        cart: {
            products: JSON.parse(sessionStorage.getItem('cart'))?.products || [],
            favorite: JSON.parse(sessionStorage.getItem('cart'))?.favorite || [],
            quantity: JSON.parse(sessionStorage.getItem('cart'))?.quantity || 0,
            total: JSON.parse(sessionStorage.getItem('cart'))?.total || 0
        }
    },
    getters: {
        product: state => state.cart.products,
        favorite: state => state.cart.favorite,
        favoriteCount: state => state.cart.favorite.length,
        cartCount: state => state.cart.quantity,
        total: state => state.cart.total
    },
    actions: {
        async initailCart({ commit, getters }, userId) {
            try {
                const res = await axios.get(`/api/cart/find/${userId}`);
                if (res.data.length !== 0) {
                    commit('initailCart', res.data);
                } else {
                    const cart = {
                        userId: userId,
                        cart: {
                            products: getters['product'],
                            favorite: getters['favorite'],
                            quantity: getters['quantity'],
                            total: getters['total']
                        }
                    }
                    axios.post('/api/cart', cart)
                    commit('initailCart');
                }
            } catch (err) {
                console.log(err);
            }
        },
        addToFavorite({ commit, dispatch }, product) {
            commit('addToFavorite', product);
            dispatch('updateCartToDB');
        },
        addToCart({ commit, dispatch }, product) {
            commit('addToCart', product);
            dispatch('updateCartToDB');
        },
        updateCart({ commit, dispatch }, product) {
            commit('updateCart', product);
            dispatch('updateCartToDB');
        },
        deleteFromCart({ commit, dispatch }, product) {
            commit('deleteFromCart', product);
            dispatch('updateCartToDB');
        },
        removeCart({ commit }) {
            commit('removeCart');
        },
        updateCartToDB() {
            try {
                const userId = JSON.parse(sessionStorage.getItem('userId'));
                const cartFromStorage = JSON.parse(sessionStorage.getItem('cart'));
                const cart = {
                    userId: userId,
                    cart: cartFromStorage
                }
                axios.put(`/api/cart/${userId}`, cart);
            } catch (err) {
                console.log(err)
            }
        }
    },
    mutations: {
        initailCart(state, cart) {
            if (cart) {
                state.cart.products = cart[0].cart.products;
                state.cart.favorite = cart[0].cart.favorite;
                state.cart.quantity = cart[0].cart.quantity;
                state.cart.total = cart[0].cart.total;
                updateSessionStogage(state.cart);
            } else {
                updateSessionStogage(state.cart);
            }
        },
        addToFavorite(state, product) {
            const cartFavorite = state.cart.favorite.find(i => i._id === product._id);
            cartFavorite
                ? state.cart.favorite = state.cart.favorite.filter(i => i._id !== product._id)
                : state.cart.favorite.push(product);

            updateSessionStogage(state.cart);
        },
        addToCart(state, product) {
            state.cart.quantity += 1;
            state.cart.products.push(product);
            state.cart.total += product.price * product.quantity;
            updateSessionStogage(state.cart);
        },
        updateCart(state, product) {
            const cartProduct = state.cart.products.find(i => i.createdAt === product.createdAt)
            let originTotal = state.cart.total - (cartProduct.quantity * cartProduct.price);

            cartProduct.quantity = product.quantity;
            state.cart.total = originTotal + product.quantity * product.price;
            updateSessionStogage(state.cart);
        },
        deleteFromCart(state, product) {
            const cartProduct = state.cart.products.find(i => i.createdAt === product.createdAt)

            state.cart.quantity -= 1;
            state.cart.products = JSON.parse(JSON.stringify(state.cart.products.filter(i => i.createdAt !== product.createdAt)));
            state.cart.total -= cartProduct.quantity * cartProduct.price;
            updateSessionStogage(state.cart);
        },
        removeCart(state) {
            sessionStorage.removeItem('cart');
            state.cart.products = [];
            state.cart.favorite = [];
            state.cart.quantity = 0;
            state.cart.total = 0;
        }
    },
}
