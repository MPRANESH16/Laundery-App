import { LightningElement, api, track } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getOrderAmount from '@salesforce/apex/RazorpayPaymentController.getOrderAmount';
import updatePaymentStatus from '@salesforce/apex/RazorpayPaymentController.updatePaymentStatus';

// Visualforce Page URL
const VF_ORIGIN =
'https://resilient-narwhal-vyicz6-dev-ed--c.trailblaze.vf.force.com';

const VF_PAGE_URL =
`${VF_ORIGIN}/apex/RazorpayBridge`;
export default class Order extends LightningElement {

    @api recordId;

    @track orderId;

    @track showIframe = false;

    iframeUrl = VF_PAGE_URL;

    iframeReady = false;

    pendingAmount = null;

    // Disable Pay Button
    get isPayDisabled() {

        return !this.orderId && !this.recordId;
    }

    // Component Loaded
    connectedCallback() {

        this.messageHandler =
            this.handlePostMessage.bind(this);

        window.addEventListener(
            'message',
            this.messageHandler
        );

        // Load iframe immediately
        this.showIframe = true;
    }

    // Cleanup
    disconnectedCallback() {

        window.removeEventListener(
            'message',
            this.messageHandler
        );
    }

    // iframe loaded
    handleIframeLoad() {

        console.log('VF iframe loaded');

        this.iframeReady = true;

        // If payment waiting
        if (this.pendingAmount !== null) {

            this.sendPaymentToIframe(
                this.pendingAmount
            );

            this.pendingAmount = null;
        }
    }

    // Order Success
    handleSuccess(event) {

        this.orderId = event.detail.id;

        console.log(
            'Order Created:',
            this.orderId
        );

        this.showToast(
            'Success',
            'Order created successfully!',
            'success'
        );
    }

    // Order Error
    handleError(event) {

        console.error(event.detail);

        this.showToast(
            'Error',
            event.detail.message,
            'error'
        );
    }

    // Pay Now
    handlePayment() {

        const resolvedId =
            this.orderId || this.recordId;

        if (!resolvedId) {

            this.showToast(
                'Error',
                'Please create order first.',
                'error'
            );

            return;
        }

        getOrderAmount({
            orderId: resolvedId
        })

        .then(amount => {

            console.log(
                'Fetched Amount:',
                amount
            );

            if (!amount || amount <= 0) {

                this.showToast(
                    'Error',
                    'Invalid order amount.',
                    'error'
                );

                return;
            }

            // iframe ready
            if (this.iframeReady) {

                this.sendPaymentToIframe(amount);

            } else {

                // wait for iframe
                this.pendingAmount = amount;
            }
        })

        .catch(error => {

            console.error(error);

            this.showToast(
                'Error',
                error.body?.message ||
                'Unable to fetch order amount.',
                'error'
            );
        });
    }

    // Send Payment Data to VF
    sendPaymentToIframe(amount) {

        const iframe =
            this.template.querySelector('iframe');

        if (!iframe || !iframe.contentWindow) {

            this.showToast(
                'Error',
                'Payment bridge not ready.',
                'error'
            );

            return;
        }

      console.log('Sending payment request to VF:', amount);

        iframe.contentWindow.postMessage({

    action: 'openRazorpay',

    key: 'rzp_test_SrWRyuBw5J83t1',

    amount: amount * 100,

    currency: 'INR',

    name: 'Laundry Service',

    description: 'Laundry Order Payment'

}, VF_ORIGIN);
    }

    // Receive Messages From VF
    handlePostMessage(event) {

        console.log(
            'Message Received:',
            event.data
        );

        // Security check
        if (event.origin !== VF_ORIGIN) {
    return;
}
        const data = event.data;

        if (!data || !data.action) {
            return;
        }

        // Payment Success
        // Payment Success
if (data.action === 'paymentSuccess') {

    const resolvedId =
        this.orderId || this.recordId;

    updatePaymentStatus({

        orderId: resolvedId,

        paymentId: data.paymentId

    })

    .then(() => {

        console.log(
            'Payment details saved successfully'
        );

        this.showToast(
            'Success',
            'Payment Successful : ' +
            data.paymentId,
            'success'
        );

    })

    .catch(error => {

        console.error(error);

        this.showToast(
            'Error',
            'Payment completed but Salesforce update failed.',
            'error'
        );
    });
}

        // Payment Cancelled
        if (data.action === 'paymentCancelled') {

            this.showToast(
                'Info',
                'Payment Cancelled.',
                'info'
            );
        }
    }

    // Toast Helper
    showToast(title, message, variant) {

        this.dispatchEvent(

            new ShowToastEvent({

                title,

                message,

                variant
            })
        );
    }
}