import React from 'react';
import StreamPage from '../components/templates/StreamPage';
import SEO from '../components/utils/SEO';
import { Cpu } from 'lucide-react';
import { STREAM_THEMES } from '../data/themes';

const ECE = () => {
    const theme = STREAM_THEMES.ECE;

    return (
        <>
            <SEO
                title="Electronics & Communication Engineering Courses"
                description="Master Electronics & Communication Engineering (ECE). Learn about embedded systems, VLSI design, and communication technologies."
                keywords="ECE courses, electronics engineering, communication engineering, embedded systems, VLSI design"
                url="/courses/ece"
            />
            <StreamPage
                streamName="Electronics & Communication Engineering"
                streamId="ECE"
                theme={theme}
                icon={Cpu}
                description="Explore the world of electronics and communication. From semi-conductors and embedded systems to advanced telecommunication networks."
            />
        </>
    );
};

export default ECE;
