import Product from '@/types/product';
import { loadStripe } from '@stripe/stripe-js';

export const checkout = async (product: Product) => {
    let stripePromise: any = null;

    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        }
        return stripePromise;
    };

    const stripe = await getStripe();

    await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems: [{ price: product._id, quantity: 1 }],
        successUrl: `http://localhost:8000/order/${product.price}`,
        cancelUrl: window.location.origin,
    });
};