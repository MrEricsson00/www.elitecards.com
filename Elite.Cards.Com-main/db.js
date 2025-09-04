/**
 * Database Module
 *
 * This module handles data operations for the ElitCards application.
 * It provides functions for managing products, cart, users, and currency conversion.
 */

// Exchange rate: $1 = GHS 12.03
const EXCHANGE_RATE = 12.03;

// Database object
window.db = {
    // Exchange rate functions
    usdToGhs: function(usdAmount) {
        return (usdAmount * EXCHANGE_RATE).toFixed(2);
    },

    getCurrentExchangeRate: function() {
        return EXCHANGE_RATE;
    },

    updateExchangeRate: function(newRate) {
        // This would normally update a persistent storage
        console.log(`Exchange rate updated to: ${newRate}`);
        return newRate;
    },

    fixExchangeRate: function() {
        // Return the fixed rate
        return EXCHANGE_RATE;
    },

    // Price formatting
    formatPrice: function(amount) {
        return `$${parseFloat(amount).toFixed(2)}`;
    },

    // Sample products data
    sampleProducts: [
        {
            id: 'gold-card-1',
            title: 'Gold Mastercard',
            number: '**** **** **** 1234',
            limit: '$5,000',
            price: 50.00,
            image: 'American Express.png'
        },
        {
            id: 'platinum-card-1',
            title: 'Platinum Mastercard',
            number: '**** **** **** 5678',
            limit: '$10,000',
            price: 100.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'black-card-1',
            title: 'Black Mastercard',
            number: '**** **** **** 9012',
            limit: '$25,000',
            price: 250.00,
            image: 'American Express.png'
        },
        {
            id: 'infinite-card-1',
            title: 'Infinite Mastercard',
            number: '**** **** **** 3456',
            limit: '$50,000',
            price: 500.00,
            image: 'Visa Infinite.jpeg'
        },
        {
            id: 'diamond-card-1',
            title: 'Diamond Mastercard',
            number: '**** **** **** 7890',
            limit: '$100,000',
            price: 1000.00,
            image: 'American Express.png'
        },
        {
            id: 'world-card-1',
            title: 'World Mastercard',
            number: '**** **** **** 1357',
            limit: '$15,000',
            price: 150.00,
            image: 'Visa Infinite.jpeg'
        }
    ],

    // Get products function
    getProducts: function() {
        // Return sample products for now
        // In production, this would fetch from PocketBase
        return Promise.resolve(this.sampleProducts);
    },

    getCart: function() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    },

    getCartCount: function() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    },

    getCartSubtotal: async function() {
        const cart = this.getCart();
        const products = await this.getProducts();
        let subtotal = 0;

        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product) {
                subtotal += product.price * item.quantity;
            }
        });

        return subtotal;
    },

    addToCart: function(productId) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: productId, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    },

    removeFromCart: function(productId) {
        const cart = this.getCart();
        const updatedCart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    },

    clearCart: function() {
        localStorage.setItem('cart', JSON.stringify([]));
    },

    getCurrentUser: function() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    setCurrentUser: function(user) {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    },

    authenticateUser: async function(email, password) {
        // Placeholder - would authenticate with backend
        console.warn('authenticateUser not fully implemented');
        return null;
    },

    addUser: async function(userData) {
        // Placeholder - would add user to backend
        console.warn('addUser not fully implemented');
        return userData;
    },

    userExists: function(email) {
        // Placeholder - would check backend
        return false;
    },

    initializeData: function() {
        // Initialize local storage if needed
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        }
    },

    recordPayment: async function(paymentData) {
        // Placeholder - would record payment in backend
        console.warn('recordPayment not fully implemented');
        return { success: false, localId: Date.now().toString() };
    },

    getRecentOrders: async function(userEmail) {
        // Placeholder - would fetch from backend
        console.warn('getRecentOrders not fully implemented');
        return [];
    },

    testPocketBaseConnection: async function() {
        // Placeholder - would test PocketBase connection
        console.warn('testPocketBaseConnection not implemented');
        return { success: false, error: 'Not implemented' };
    },

    testPaymentSubmission: async function() {
        // Placeholder - would test payment submission
        console.warn('testPaymentSubmission not implemented');
        return { success: false, error: 'Not implemented' };
    }
};

// Initialize data on load
db.initializeData();

console.log('Database module loaded with exchange rate:', EXCHANGE_RATE);