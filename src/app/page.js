import CreatorReferral from "./components/CreatorRefferal"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import WhatIsCreatorMonk from "./components/WhatIsCreatorMonk"
import WhyCreatorMonk from "./components/WhyCreatorMonk"
// import Navbar from "./components/Navbar"
import WhySolar from "./components/WhyCreatorMonk"

export default function Home (){

  return(
    <>
      {/* <Navbar/> */}
      <Hero/>
      
      <WhatIsCreatorMonk/>
      <WhyCreatorMonk/>
      <CreatorReferral/>
      
    </>
  )
}