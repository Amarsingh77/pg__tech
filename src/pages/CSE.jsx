import React from 'react';
import StreamPage from '../components/templates/StreamPage';
import { Code2 } from 'lucide-react';

const CSE = () => {
    const theme = {
        text: 'text-blue-400',
        bg: 'bg-blue-600',
        border: 'border-blue-500/50',
        gradientText: 'from-blue-400 via-indigo-500 to-violet-500',
        buttonGradient: 'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500',
        lightBg: 'bg-blue-900/20',
        color: 'blue'
    };

    return (
        <StreamPage
            streamName="Computer Science"
            streamId="CSE"
            theme={theme}
            icon={Code2}
            description="Dive into the world of software, algorithms, and systems. Our CSE courses are designed to make you industry-ready for top tech companies, from web dev to AI."
        />
    );
};

export default CSE;
