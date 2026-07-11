import AboutCTA from "@/components/aboutPage/AboutCTA";
import AboutHero from "@/components/aboutPage/AboutHero";
import AboutJourney from "@/components/aboutPage/AboutJourney";
import AboutStats from "@/components/aboutPage/AboutStats";
import AboutTeam from "@/components/aboutPage/AboutTeam";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutJourney />
      <AboutTeam />
      <AboutCTA />
    </>
  );
};

export default AboutPage;
