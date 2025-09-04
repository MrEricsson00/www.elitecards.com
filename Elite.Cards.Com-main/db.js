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

    // Sample products data - Mixed price ranges
    sampleProducts: [
        {
            id: 'premium-card-1',
            title: 'Premium Mastercard',
            number: '**** **** **** ****',
            limit: '$8,000',
            price: 70.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'gold-card-1',
            title: 'Gold Mastercard',
            number: '**** **** **** ****',
            limit: '$5,000',
            price: 50.00,
            image: 'American Express.png'
        },
        {
            id: 'standard-card-1',
            title: 'Standard Mastercard',
            number: '**** **** **** ****',
            limit: '$3,000',
            price: 35.00,
            image: 'Visa Infinite.jpeg'
        },
        {
            id: 'elite-card-1',
            title: 'Elite Mastercard',
            number: '**** **** **** ****',
            limit: '$12,000',
            price: 100.00,
            image: 'American Express.png'
        },
        {
            id: 'gold-card-2',
            title: 'Gold Plus Mastercard',
            number: '**** **** **** ****',
            limit: '$6,000',
            price: 50.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'premium-card-2',
            title: 'Premium Plus Mastercard',
            number: '**** **** **** ****',
            limit: '$9,000',
            price: 70.00,
            image: 'American Express.png'
        },
        {
            id: 'luxury-card-1',
            title: 'Luxury Mastercard',
            number: '**** **** **** ****',
            limit: '$30,000',
            price: 250.00,
            image: 'Visa Infinite.jpeg'
        },
        {
            id: 'premium-card-3',
            title: 'Premium Elite Mastercard',
            number: '**** **** **** ****',
            limit: '$11,000',
            price: 70.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'gold-card-3',
            title: 'Gold Elite Mastercard',
            number: '**** **** **** ****',
            limit: '$7,000',
            price: 50.00,
            image: 'American Express.png'
        },
        {
            id: 'premium-card-4',
            title: 'Premium Supreme Mastercard',
            number: '**** **** **** ****',
            limit: '$10,000',
            price: 70.00,
            image: 'Visa Infinite.jpeg'
        },
        {
            id: 'executive-card-1',
            title: 'Executive Mastercard',
            number: '**** **** **** ****',
            limit: '$20,000',
            price: 200.00,
            image: 'American Express.png'
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