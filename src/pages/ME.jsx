import React from 'react';
import StreamPage from '../components/templates/StreamPage';
import SEO from '../components/utils/SEO';
import { Settings } from 'lucide-react';
import { STREAM_THEMES } from '../data/themes';

const ME = () => {
    const theme = STREAM_THEMES.ME;

    return (
        <>
            <SEO
                title="Mechanical Engineering Courses"
                description="Advance your career with our Mechanical Engineering (ME) courses. Learn design, analysis, and manufacturing from industry experts."
                keywords="mechanical engineering courses, ME training, CAD design, manufacturing technology, mechanical systems"
                url="/courses/me"
            />
            <StreamPage
                streamName="Mechanical Engineering"
                streamId="ME"
                theme={theme}
                icon={Settings}
                description="Design, analyze, and manufacture mechanical systems. Our ME courses bridge the gap between theory and practical application, mastering the mechanics of the world."
            />
        </>
    );
};

export default ME;
