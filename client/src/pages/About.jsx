import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BottomNav from '../components/common/BottomNav';
import CompanyStory from '../components/about/CompanyStory';
import MissionVision from '../components/about/MissionVision';
import USVDetails from '../components/about/USVDetails';
import AUVDetails from '../components/about/AUVDetails';
import WorkingProcess from '../components/about/WorkingProcess';
import Advantages from '../components/about/Advantages';
import Timeline from '../components/about/Timeline';
import ContactForm from '../components/common/ContactForm';  // ✅ Common component import
import MetaTags from '../seo/MetaTags';

const About = () => {
  return (
    <>
      <MetaTags 
        title="About Wave pilot - Marine Robotics & Autonomous Systems"
        description="Learn about Wave pilot's mission, vision, and cutting-edge marine technology for USV and AUV systems."
        keywords="about Wave pilot, marine technology, autonomous vehicles, USV, AUV, subsea robotics"
      />
      <Header />
      <main className="pt-20 pb-24 lg:pb-0 overflow-x-hidden">
        <CompanyStory />
        <MissionVision />
        <USVDetails />
        <AUVDetails />
        <WorkingProcess />
        <Advantages />
        <Timeline />
        <ContactForm />  {/* ✅ Same component used */}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
};

export default About;