import React from 'react';
import StreamPage from '../components/templates/StreamPage';
import SEO from '../components/utils/SEO';
import { HardHat } from 'lucide-react';
import { STREAM_THEMES } from '../data/themes';

const CE = () => {
    const theme = STREAM_THEMES.CE;

    return (
        <>
            <SEO
                title="Civil Engineering Courses"
                description="Build a solid foundation with our Civil Engineering (CE) courses. Master structural design, construction management, and more."
                keywords="civil engineering courses, CE training, structural engineering, construction management, civil design"
                url="/courses/ce"
            />
            <StreamPage
                streamName="Civil Engineering"
                streamId="CE"
                theme={theme}
                icon={HardHat}
                description="Build the infrastructure of tomorrow. Our CE courses cover everything from structural design to construction management, preparing you to shape the physical world."
            />
        </>
    );
};

export default CE;
