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

    // Sample products data - 20 cards with specified values and limits
    sampleProducts: [
        {
            id: 'card-1',
            title: 'Basic Mastercard',
            number: '**** **** **** ****',
            limit: '$2,000',
            price: 35.00,
            image: 'Visa Infinite.jpeg'
        },
        {
            id: 'card-2',
            title: 'Standard Mastercard',
            number: '**** **** **** ****',
            limit: '$3,000',
            price: 50.00,
            image: 'American Express.png'
        },
        {
            id: 'card-3',
            title: 'Premium Mastercard',
            number: '**** **** **** ****',
            limit: '$5,000',
            price: 100.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'card-4',
            title: 'Executive Mastercard',
            number: '**** **** **** ****',
            limit: '$8,000',
            price: 200.00,
            image: 'American Express.png'
        },
        {
            id: 'card-5',
            title: 'Essential Mastercard',
            number: '**** **** **** ****',
            limit: '$2,000',
            price: 35.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'card-6',
            title: 'Gold Mastercard',
            number: '**** **** **** ****',
            limit: '$3,000',
            price: 50.00,
            image: 'Visa Infinite.jpeg'
        },
        {
            id: 'card-7',
            title: 'Elite Mastercard',
            number: '**** **** **** ****',
            limit: '$5,000',
            price: 100.00,
            image: 'American Express.png'
        },
        {
            id: 'card-8',
            title: 'Platinum Mastercard',
            number: '**** **** **** ****',
            limit: '$8,000',
            price: 200.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'card-9',
            title: 'Starter Mastercard',
            number: '**** **** **** ****',
            limit: '$2,000',
            price: 35.00,
            image: 'American Express.png'
        },
        {
            id: 'card-10',
            title: 'Plus Mastercard',
            number: '**** **** **** ****',
            limit: '$3,000',
            price: 50.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'card-11',
            title: 'Advanced Mastercard',
            number: '**** **** **** ****',
            limit: '$5,000',
            price: 100.00,
            image: 'Visa Infinite.jpeg'
        },
        {
            id: 'card-12',
            title: 'Supreme Mastercard',
            number: '**** **** **** ****',
            limit: '$8,000',
            price: 200.00,
            image: 'American Express.png'
        },
        {
            id: 'card-13',
            title: 'Entry Mastercard',
            number: '**** **** **** ****',
            limit: '$2,000',
            price: 35.00,
            image: 'Visa Infinite.jpeg'
        },
        {
            id: 'card-14',
            title: 'Enhanced Mastercard',
            number: '**** **** **** ****',
            limit: '$3,000',
            price: 50.00,
            image: 'American Express.png'
        },
        {
            id: 'card-15',
            title: 'Pro Mastercard',
            number: '**** **** **** ****',
            limit: '$5,000',
            price: 100.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'card-16',
            title: 'Ultimate Mastercard',
            number: '**** **** **** ****',
            limit: '$8,000',
            price: 200.00,
            image: 'Visa Infinite.jpeg'
        },
        {
            id: 'card-17',
            title: 'Simple Mastercard',
            number: '**** **** **** ****',
            limit: '$2,000',
            price: 35.00,
            image: 'American Express.png'
        },
        {
            id: 'card-18',
            title: 'Select Mastercard',
            number: '**** **** **** ****',
            limit: '$3,000',
            price: 50.00,
            image: 'Platinum Mastercard.jpeg'
        },
        {
            id: 'card-19',
            title: 'Master Mastercard',
            number: '**** **** **** ****',
            limit: '$5,000',
            price: 100.00,
            image: 'American Express.png'
        },
        {
            id: 'card-20',
            title: 'Legendary Mastercard',
            number: '**** **** **** ****',
            limit: '$8,000',
            price: 200.00,
            image: 'Visa Infinite.jpeg'
        }
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