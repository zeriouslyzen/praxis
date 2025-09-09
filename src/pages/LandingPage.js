import React from 'react';
import AnimatedAbout from '../components/AnimatedAbout';
import FeaturesPage from '../components/FeaturesPage';
import { Header, Hero, Footer } from '../components/Layout';

// Import remaining components from App.js
import Services from '../components/Services';
import Technology from '../components/Technology';
import CaseStudies from '../components/CaseStudies';

const LandingPage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AnimatedAbout />
        <FeaturesPage />
        <Services />
        <Technology />
        <CaseStudies />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
