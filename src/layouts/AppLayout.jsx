import { CustomNavbar } from '../components/ui';
import { ShoppingCart } from '../components/Billing/ShoppingCart';

export const AppLayout = ({ children }) => {
    return (
        <>
            <CustomNavbar />
            <ShoppingCart />
            <main style={{ width: '70%', margin: '3rem auto' }}>{children}</main>
        </>
    );
};
