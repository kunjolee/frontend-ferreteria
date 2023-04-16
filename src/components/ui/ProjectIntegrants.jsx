import { integrantsInformation } from '../../api';
import { ProjectCard } from './ProjectCard';

export const ProjectIntegrants = () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    margin: '1rem 0',
                    flexWrap: 'wrap',
                }}
            >
                {integrantsInformation.map((el) => (
                    <ProjectCard key={el.carnet} {...el} />
                ))}
            </div>
        </>
    );
};
