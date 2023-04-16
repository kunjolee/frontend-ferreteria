import { CustomNavbar, ProjectIntegrants } from '../components/ui/';

export const HomePage = () => {
    return (
        <>
            <CustomNavbar />
            <div style={{ padding: '0 1rem 1rem' }}>
                <h1 style={{ marginTop: '1rem' }}>Ferreteria</h1>
                <ProjectIntegrants />
            </div>
        </>
    );
};
