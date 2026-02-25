import About from "../components/About";
import AboutCTA from "../components/AboutCTA";
import OurTeam from "../components/OurTeam";
import Values from "../components/Values";

export default function AboutPage(){
    return(
        <main>
            <About/>
            <Values/>
            <AboutCTA/>
            {/* <OurTeam/> */}
        </main>
    )
}