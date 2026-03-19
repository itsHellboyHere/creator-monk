import About from "../components/About";
import AboutCTA from "../components/AboutCTA";
import Values from "../components/Values";

export const metadata = {
  title: "About CreatorMonk",
  description: "We are a full-stack digital agency built for the creator economy.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Cinematic hero — sticky, sections scroll over it */}
      <div className="about-sticky-hero">
        <About />
      </div>

      {/* Content sections stack on top as you scroll */}
      <div className="about-content-stack">
        <Values />
        <AboutCTA />
      </div>
    </main>
  );
}