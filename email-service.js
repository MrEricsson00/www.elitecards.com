/**
 * Email Service
 *
 * This script handles sending emails using EmailJS for transaction notifications.
 */

const EmailService = {
    /**
     * Send transaction notification to admin
     * @param {Object} transactionData - Transaction details
     * @param {string} transactionData.customerEmail - Customer's email
     * @param {number} transactionData.amount - Transaction amount
     * @param {Array} transactionData.cartItems - Array of cart items
     * @param {string} transactionData.paymentId - Payment ID
     * @param {string} transactionData.timestamp - Transaction timestamp
     * @returns {Promise<Object>} - Result of email sending
     */
    async sendTransactionNotification(transactionData) {
        try {
            // Check if EmailJS is loaded
            if (!window.emailjs) {
                throw new Error('EmailJS is not loaded');
            }

            // Check if EmailConfig is available
            if (!window.EmailConfig) {
                throw new Error('EmailConfig is not available');
            }

            // Prepare email template parameters
            const templateParams = {
                to_email: EmailConfig.ADMIN_EMAIL,
                from_name: EmailConfig.TEMPLATE_PARAMS.from_name,
                subject: EmailConfig.TEMPLATE_PARAMS.subject,
                customer_email: transactionData.customerEmail,
                amount: `$${transactionData.amount.toFixed(2)}`,
                payment_id: transactionData.paymentId || 'N/A',
                timestamp: transactionData.timestamp,
                cart_items: transactionData.cartItems.map(item =>
                    `${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
                ).join('\n'),
                total_items: transactionData.cartItems.length
            };

            // Send email using EmailJS
            const result = await emailjs.send(
                EmailConfig.SERVICE_ID,
                EmailConfig.TEMPLATE_ID,
                templateParams,
                EmailConfig.PUBLIC_KEY
            );

            console.log('Email sent successfully:', result);
            return {
                success: true,
                result: result
            };

        } catch (error) {
            console.error('Failed to send email:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
};

// Make EmailService available globally
window.EmailService = EmailService;