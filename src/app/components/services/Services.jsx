'use client'

import OurServices from "./OurServices"
import PricingPlans from "./PricingPlans"
import PricingPlans2 from "./PricingPlans2"
import ServicesHighlights from "./ServicesHighlights"

export default function Services(){
    return(
        <>
        <OurServices/>
        <ServicesHighlights/>
        <PricingPlans/>
        <PricingPlans2/>
        </>
    )
}