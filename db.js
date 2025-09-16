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

    // Sample products data - 50 cards across 5 categories
    sampleProducts: [
        // American Express - 10 cards
        { id: 'card-1', title: 'American Express', number: '**** **** **** ****', price: 25.00, image: 'American Express1.png' },
        { id: 'card-2', title: 'American Express', number: '**** **** **** ****', price: 25.00, image: 'American Express1.png' },
        { id: 'card-3', title: 'American Express', number: '**** **** **** ****', price: 35.00, image: 'American Express1.png' },
        { id: 'card-4', title: 'American Express', number: '**** **** **** ****', price: 35.00, image: 'American Express1.png' },
        { id: 'card-5', title: 'American Express', number: '**** **** **** ****', price: 50.00, image: 'American Express1.png' },
        { id: 'card-6', title: 'American Express', number: '**** **** **** ****', price: 50.00, image: 'American Express1.png' },
        { id: 'card-7', title: 'American Express', number: '**** **** **** ****', price: 100.00, image: 'American Express1.png' },
        { id: 'card-8', title: 'American Express', number: '**** **** **** ****', price: 100.00, image: 'American Express1.png' },
        { id: 'card-9', title: 'American Express', number: '**** **** **** ****', price: 25.00, image: 'American Express1.png' },
        { id: 'card-10', title: 'American Express', number: '**** **** **** ****', price: 25.00, image: 'American Express1.png' },
        // Platinum Master Card - 10 cards
        { id: 'card-11', title: 'Platinum Master Card', number: '**** **** **** ****', price: 25.00, image: 'Platinum Mastercard1.jpeg' },
        { id: 'card-12', title: 'Platinum Master Card', number: '**** **** **** ****', price: 25.00, image: 'Platinum Mastercard1.jpeg' },
        { id: 'card-13', title: 'Platinum Master Card', number: '**** **** **** ****', price: 35.00, image: 'Platinum Mastercard1.jpeg' },
        { id: 'card-14', title: 'Platinum Master Card', number: '**** **** **** ****', price: 35.00, image: 'Platinum Mastercard1.jpeg' },
        { id: 'card-15', title: 'Platinum Master Card', number: '**** **** **** ****', price: 50.00, image: 'Platinum Mastercard1.jpeg' },
        { id: 'card-16', title: 'Platinum Master Card', number: '**** **** **** ****', price: 50.00, image: 'Platinum Mastercard1.jpeg' },
        { id: 'card-17', title: 'Platinum Master Card', number: '**** **** **** ****', price: 100.00, image: 'Platinum Mastercard1.jpeg' },
        { id: 'card-18', title: 'Platinum Master Card', number: '**** **** **** ****', price: 100.00, image: 'Platinum Mastercard1.jpeg' },
        { id: 'card-19', title: 'Platinum Master Card', number: '**** **** **** ****', price: 25.00, image: 'Platinum Mastercard1.jpeg' },
        { id: 'card-20', title: 'Platinum Master Card', number: '**** **** **** ****', price: 25.00, image: 'Platinum Mastercard1.jpeg' },
        // Visa Infinite - 10 cards
        { id: 'card-21', title: 'Visa Infinite', number: '**** **** **** ****', price: 25.00, image: 'Visa Infinite1.jpeg' },
        { id: 'card-22', title: 'Visa Infinite', number: '**** **** **** ****', price: 25.00, image: 'Visa Infinite1.jpeg' },
        { id: 'card-23', title: 'Visa Infinite', number: '**** **** **** ****', price: 35.00, image: 'Visa Infinite1.jpeg' },
        { id: 'card-24', title: 'Visa Infinite', number: '**** **** **** ****', price: 35.00, image: 'Visa Infinite1.jpeg' },
        { id: 'card-25', title: 'Visa Infinite', number: '**** **** **** ****', price: 50.00, image: 'Visa Infinite1.jpeg' },
        { id: 'card-26', title: 'Visa Infinite', number: '**** **** **** ****', price: 50.00, image: 'Visa Infinite1.jpeg' },
        { id: 'card-27', title: 'Visa Infinite', number: '**** **** **** ****', price: 100.00, image: 'Visa Infinite1.jpeg' },
        { id: 'card-28', title: 'Visa Infinite', number: '**** **** **** ****', price: 100.00, image: 'Visa Infinite1.jpeg' },
        { id: 'card-29', title: 'Visa Infinite', number: '**** **** **** ****', price: 25.00, image: 'Visa Infinite1.jpeg' },
        { id: 'card-30', title: 'Visa Infinite', number: '**** **** **** ****', price: 25.00, image: 'Visa Infinite1.jpeg' },
        // Visa Gold - 10 cards
        { id: 'card-31', title: 'Visa Gold', number: '**** **** **** ****', price: 25.00, image: 'Visa Gold1.jpeg' },
        { id: 'card-32', title: 'Visa Gold', number: '**** **** **** ****', price: 25.00, image: 'Visa Gold1.jpeg' },
        { id: 'card-33', title: 'Visa Gold', number: '**** **** **** ****', price: 35.00, image: 'Visa Gold1.jpeg' },
        { id: 'card-34', title: 'Visa Gold', number: '**** **** **** ****', price: 35.00, image: 'Visa Gold1.jpeg' },
        { id: 'card-35', title: 'Visa Gold', number: '**** **** **** ****', price: 50.00, image: 'Visa Gold1.jpeg' },
        { id: 'card-36', title: 'Visa Gold', number: '**** **** **** ****', price: 50.00, image: 'Visa Gold1.jpeg' },
        { id: 'card-37', title: 'Visa Gold', number: '**** **** **** ****', price: 100.00, image: 'Visa Gold1.jpeg' },
        { id: 'card-38', title: 'Visa Gold', number: '**** **** **** ****', price: 100.00, image: 'Visa Gold1.jpeg' },
        { id: 'card-39', title: 'Visa Gold', number: '**** **** **** ****', price: 25.00, image: 'Visa Gold1.jpeg' },
        { id: 'card-40', title: 'Visa Gold', number: '**** **** **** ****', price: 25.00, image: 'Visa Gold1.jpeg' },
        // Discover - 10 cards
        { id: 'card-41', title: 'Discover', number: '**** **** **** ****', price: 25.00, image: 'Titanium Discover1.jpeg' },
        { id: 'card-42', title: 'Discover', number: '**** **** **** ****', price: 25.00, image: 'Titanium Discover1.jpeg' },
        { id: 'card-43', title: 'Discover', number: '**** **** **** ****', price: 35.00, image: 'Titanium Discover1.jpeg' },
        { id: 'card-44', title: 'Discover', number: '**** **** **** ****', price: 35.00, image: 'Titanium Discover1.jpeg' },
        { id: 'card-45', title: 'Discover', number: '**** **** **** ****', price: 50.00, image: 'Titanium Discover1.jpeg' },
        { id: 'card-46', title: 'Discover', number: '**** **** **** ****', price: 50.00, image: 'WhatsApp Image 2025-09-16 at 3.16.36 PM.jpeg' },
        { id: 'card-47', title: 'Discover', number: '**** **** **** ****', price: 100.00, image: 'WhatsApp Image 2025-09-16 at 3.16.36 PM.jpeg' },
        { id: 'card-48', title: 'Discover', number: '**** **** **** ****', price: 100.00, image: 'WhatsApp Image 2025-09-16 at 3.16.36 PM.jpeg' },
        { id: 'card-49', title: 'Discover', number: '**** **** **** ****', price: 25.00, image: 'WhatsApp Image 2025-09-16 at 3.16.36 PM.jpeg' },
        { id: 'card-50', title: 'Discover', number: '**** **** **** ****', price: 25.00, image: 'WhatsApp Image 2025-09-16 at 3.16.36 PM.jpeg' }
    ],

    // Get products function
    getProducts: function() {
        // Shuffle the products array to randomize order
        const shuffledProducts = [...this.sampleProducts].sort(() => Math.random() - 0.5);
        // Return shuffled products for now
        // In production, this would fetch from PocketBase
        return Promise.resolve(shuffledProducts);
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