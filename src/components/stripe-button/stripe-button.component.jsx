import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_b6XWvxRf91AI5h2Rhnl9Fab200GTXKikv1';

    const onToken = token => {
        console.log(token);
        alert('Payment Successfull')
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN clothing Ltd'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />

    )
}

export default StripeCheckoutButton;