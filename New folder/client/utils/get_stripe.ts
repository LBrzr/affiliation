/* import { Stripe, loadStripe } from '@stripe/stripe-js';
import {loadStripe} from '@stripe/stripe-js/pure';

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default getStripe; */