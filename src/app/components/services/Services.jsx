'use client'

import PricingSection from "../Pricing/PricingSection"
import OurServices from "./OurServices"
import PricingPlans from "./PricingPlans"
import PricingPlans2 from "./PricingPlans2"
import ServicesHighlights from "./ServicesHighlights"

export default function Services(){
    return(
        <>
        <OurServices/>
        <ServicesHighlights/>
        <PricingSection/>
        {/* <PricingPlans2/> */}
        </>
    )
}