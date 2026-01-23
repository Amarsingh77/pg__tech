import React from 'react';
import StreamPage from '../components/templates/StreamPage';
import SEO from '../components/utils/SEO';
import { Cpu } from 'lucide-react';
import { STREAM_THEMES } from '../data/themes';

const EE = () => {
    const theme = STREAM_THEMES.EE;

    return (
        <>
            <SEO
                title="Electrical Engineering Courses"
                description="Master Electrical Engineering (EE). Learn circuit design, power systems, and embedded electronics with industry experts."
                keywords="EE courses, electrical engineering, circuit design, power systems, embedded systems"
                url="/courses/ee"
            />
            <StreamPage
                streamName="Electrical Engineering"
                streamId="EE"
                theme={theme}
                icon={Cpu}
                description="Power the future with our Electrical Engineering courses. From circuit analysis to power grids and renewable energy systems."
            />
        </>
    );
};

export default EE;
