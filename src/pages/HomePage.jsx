import { ProjectIntegrants } from '../components/ui/';
import { AppLayout } from '../layouts/AppLayout';

export const HomePage = () => {
    return (
        <AppLayout>
            <h1>Ferreteria</h1>
            <ProjectIntegrants />
        </AppLayout>
    );
};
