import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BottomNav from '../components/common/BottomNav';
import MaldivesHero from '../components/home/MaldivesHero';  // ✅ New Import
import HeroSlider from '../components/home/HeroSlider';
import CompanyIntro from '../components/home/CompanyIntro';
import USVSection from '../components/home/USVSection';
import AUVSection from '../components/home/AUVSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TrustSection from '../components/home/TrustSection';
import FeaturedJobs from '../components/home/FeaturedJobs';
import PowerBankOffer from '../components/common/PowerBankOffer';
import RecruitmentProcess from '../components/home/RecruitmentProcess';
import ContactForm from '../components/common/ContactForm';
import MetaTags from '../seo/MetaTags';

const Home = () => {
  return (
    <>
      <MetaTags 
        title="Wave pilotMarine Systems - USV & AUV Technology"
        description="Leading provider of autonomous marine vehicles for ocean exploration, research, and defense."
        keywords="USV, AUV, marine technology, autonomous vehicles, Wave pilot"
      />
      <Header />
      <main>
        {/* ✅ New Maldives Hero - Top */}
        <MaldivesHero />
        
        {/* ✅ Existing Hero Slider - Below */}
        <HeroSlider />
        
        <CompanyIntro />
        <USVSection />
        <AUVSection />
        <WhyChooseUs />
        <TrustSection />
        <FeaturedJobs />
        <PowerBankOffer />
        <RecruitmentProcess />
        <ContactForm />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
};

export default Home;