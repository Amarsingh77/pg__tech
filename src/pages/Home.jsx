import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import SEO from '../components/utils/SEO';
import CoursesSection from '../components/sections/CoursesSection';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import UpcomingBatches from '../components/sections/UpcomingBatches';
import CTASection from '../components/sections/CTASection';

const Home = ({ onEnrollClick, onOpenAdvisorModal }) => {
    return (
        <>
            <SEO
                title="Home"
                description="PG Tech provides top-notch technical education in Full Stack Development, Data Science, and Engineering. Join us to kickstart your tech career."
                keywords="web development course, full stack training, data science, engineering tuition, pg tech"
            />
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
