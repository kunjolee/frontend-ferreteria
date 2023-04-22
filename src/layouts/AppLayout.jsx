import { CustomNavbar } from '../components/ui';

export const AppLayout = ({ children }) => {
    return (
        <>
            <CustomNavbar />
            <main style={{ width: '70%', margin: '3rem auto' }}>{children}</main>
        </>
    );
};
