import { useCart as useCartContext } from '../context/CartContext';

/**
 * useCart Hook
 * ------------
 * A convenience hook that re-exports the useCart hook from the CartContext.
 * This allows components to import from 'hooks/useCart' instead of 'context/CartContext'.
 */
export const useCart = () => {
    return useCartContext();
}

export default useCart;
