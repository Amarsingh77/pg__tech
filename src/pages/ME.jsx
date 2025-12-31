import React from 'react';
import StreamPage from '../components/templates/StreamPage';
import { Settings } from 'lucide-react';

const ME = () => {
    const theme = {
        text: 'text-orange-400',
        bg: 'bg-orange-600',
        border: 'border-orange-500/50',
        gradientText: 'from-orange-400 via-red-500 to-yellow-500',
        buttonGradient: 'from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500',
        lightBg: 'bg-orange-900/20',
        color: 'orange'
    };

    return (
        <StreamPage
            streamName="Mechanical Engineering"
            streamId="ME"
            theme={theme}
            icon={Settings}
            description="Design, analyze, and manufacture mechanical systems. Our ME courses bridge the gap between theory and practical application, mastering the mechanics of the world."
        />
    );
};

export default ME;
