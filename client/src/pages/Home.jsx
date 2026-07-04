import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BottomNav from '../components/common/BottomNav';
import HeroSlider from '../components/home/HeroSlider';
import CompanyIntro from '../components/home/CompanyIntro';
import USVSection from '../components/home/USVSection';
import AUVSection from '../components/home/AUVSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import TrustSection from '../components/home/TrustSection';
import FeaturedJobs from '../components/home/FeaturedJobs';
import RecruitmentProcess from '../components/home/RecruitmentProcess';
import ContactForm from '../components/common/ContactForm';  // ✅ Common component import
import MetaTags from '../seo/MetaTags';

const Home = () => {
  return (
    <>
      <MetaTags 
        title="Wave pilot Systems - USV & AUV Technology"
        description="Leading provider of autonomous marine vehicles for ocean exploration, research, and defense."
        keywords="USV, AUV, marine technology, autonomous vehicles, Hydrocean"
      />
      <Header />
      <main>
        <HeroSlider />
        <CompanyIntro />
        <AUVSection />
        <USVSection />
        <WhyChooseUs />
        <TrustSection />
        <FeaturedJobs />
        <RecruitmentProcess />
        <ContactForm />  {/* ✅ Same component used */}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
};

export default Home;