import React from 'react';
import StreamPage from '../components/templates/StreamPage';
import { HardHat } from 'lucide-react';

const CE = () => {
    const theme = {
        text: 'text-emerald-400',
        bg: 'bg-emerald-600',
        border: 'border-emerald-500/50',
        gradientText: 'from-emerald-400 via-green-500 to-teal-400',
        buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
        lightBg: 'bg-emerald-900/20',
        color: 'emerald'
    };

    return (
        <StreamPage
            streamName="Civil Engineering"
            streamId="CE"
            theme={theme}
            icon={HardHat}
            description="Build the infrastructure of tomorrow. Our CE courses cover everything from structural design to construction management, preparing you to shape the physical world."
        />
    );
};

export default CE;
