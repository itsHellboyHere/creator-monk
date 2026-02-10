import CreatorReferral from "./components/CreatorRefferal"
import FinalCTA from "./components/FinalCTA"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import MonkCanvas from "./components/MonkCanvas"
import OurTeam from "./components/OurTeam"
import ProjectShowcase from "./components/ProjectShowcase"
import RoadmapGrid from "./components/Roadmap"
// import Services from "./components/services/Services"
import ServicesStack from "./components/Services"// 1. Import the new component
import WhatIsCreatorMonk from "./components/WhatIsCreatorMonk"
import WhoWeAre from "./components/WhoWeAre"
import WhyCreatorMonk from "./components/WhyCreatorMonk"

export const metadata = {
  title: "Home",
  description:
    "CreatorMonk helps creators build brands, content, and scalable growth.",
};

export default function Home() {
  return (
    <>
      
      <Hero />
      <div id="intro" className="sec-wrapper"><WhoWeAre /></div>
      <div id="description" className="sec-wrapper"><ProjectShowcase /></div>
      <div id="services" className="sec-wrapper"><ServicesStack /></div>
      <div id="roadmap" className="sec-wrapper"><RoadmapGrid /></div>
      <div id="team" className="sec-wrapper"><OurTeam /></div>
      <div id="cta" className="sec-wrapper"><FinalCTA /></div>
      <MonkCanvas /> 
    </>

  );
}