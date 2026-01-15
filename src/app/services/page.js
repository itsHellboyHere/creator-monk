import OurServices from "../components/services/OurServices";
import Services from "../components/services/Services";

export const metadata = {
  title: "Services for Creators",
  description: "Content, branding, and growth services for creators.",
};

export default function ServicePage(){
    return(
        <main>
            <Services/>
        </main>
    )
}