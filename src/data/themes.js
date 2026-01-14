export const STREAM_THEMES = {
    'CSE': {
        text: 'text-blue-400',
        bg: 'bg-blue-600',
        bgHover: 'hover:bg-blue-700',
        border: 'border-blue-500/30',
        ring: 'ring-blue-500',
        gradientText: 'from-blue-400 via-indigo-400 to-purple-500',
        buttonGradient: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
        lightBg: 'bg-blue-500/10',
        lightBorder: 'border-blue-500/30',
        color: 'blue',
        iconColor: 'text-blue-400'
    },
    'CE': {
        text: 'text-emerald-400',
        bg: 'bg-emerald-600',
        bgHover: 'hover:bg-emerald-700',
        border: 'border-emerald-500/30',
        ring: 'ring-emerald-500',
        gradientText: 'from-emerald-400 via-green-400 to-teal-500',
        buttonGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
        lightBg: 'bg-emerald-500/10',
        lightBorder: 'border-emerald-500/30',
        color: 'emerald',
        iconColor: 'text-emerald-400'
    },
    'ME': {
        text: 'text-orange-400',
        bg: 'bg-orange-600',
        bgHover: 'hover:bg-orange-700',
        border: 'border-orange-500/30',
        ring: 'ring-orange-500',
        gradientText: 'from-orange-400 via-red-500 to-yellow-500',
        buttonGradient: 'from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
        lightBg: 'bg-orange-500/10',
        lightBorder: 'border-orange-500/30',
        color: 'orange',
        iconColor: 'text-orange-400'
    }
};

export const getThemeByStream = (stream) => {
    return STREAM_THEMES[stream] || STREAM_THEMES['CSE']; // Default to CSE
};
