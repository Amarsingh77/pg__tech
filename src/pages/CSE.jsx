import React from 'react';
import StreamPage from '../components/templates/StreamPage';
import SEO from '../components/utils/SEO';
import { Code2 } from 'lucide-react';
import { STREAM_THEMES } from '../data/themes';

const CSE = () => {
    const theme = STREAM_THEMES.CSE;

    return (
        <>
            <SEO
                title="Computer Science Engineering Courses"
                description="Explore our top-tier Computer Science Engineering (CSE) courses. Master full stack development, AI, and more with expert guidance."
                keywords="CSE courses, computer science training, full stack development, AI course, software engineering"
                url="/courses/cse"
            />
            <StreamPage
                streamName="Computer Science"
                streamId="CSE"
                theme={theme}
                icon={Code2}
                description="Dive into the world of software, algorithms, and systems. Our CSE courses are designed to make you industry-ready for top tech companies, from web dev to AI."
            />
        </>
    );
};

export default CSE;
