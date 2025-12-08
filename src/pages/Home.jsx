import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import CoursesSection from '../components/sections/CoursesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import UpcomingBatches from '../components/sections/UpcomingBatches';
import CTASection from '../components/sections/CTASection';

const Home = ({ onEnrollClick, onOpenAdvisorModal }) => {
    return (
        <>
            <HeroSection onOpenAdvisorModal={onOpenAdvisorModal} />
            <CoursesSection onEnrollClick={onEnrollClick} />
            <WhyChooseUs />
            <Testimonials />
            <UpcomingBatches onEnrollClick={onEnrollClick} />
            <CTASection />
        </>
    );
};

export default Home;
