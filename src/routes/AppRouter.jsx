import { Navigate, Route, Routes } from 'react-router-dom';
import {
    HomePage,
    ArticlePage,
    UserPage,
    ClientsPage,
    ShoppingPage,
    PurchasePage,
    PayPage,
    EmployePage,
} from '../pages';
import { BillingHistory } from '../pages/BillingHistory';
import { BillingDetails } from '../components/Billing/BillingDetails';

export const AppRouter = () => {
    return (
        <Routes>
            {/* HomePage */}
            <Route path='/' element={<HomePage />} />

            {/* ArticlePage */}
            <Route path='/articles' element={<ArticlePage />} />

            {/* UserPage */}
            <Route path='/users' element={<UserPage />} />

            {/* ClientPage */}
            <Route path='/Client' element={<ClientsPage />} />

            <Route path='/shopping' element={<ShoppingPage />} />

            <Route path='/purchase' element={<PurchasePage />} />

            <Route path='/billing-history' element={<BillingHistory />} />

            <Route path='/billing-details' element={<BillingDetails />} />
            <Route path='/payment-method' element={<PayPage />} />
            <Route path='/employees' element={<EmployePage />} />

            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    );
};
