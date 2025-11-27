import React from 'react'
import HomePage from '../components/home/HomePage'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Aboutt from '../components/home/Details'
import ComfortSection from '../components/home/Comfort'
import MyHireFaq from '../components/home/MyHireFAQS'


const Home :React.FC =()=>{
    return (
        <div className="page-container">
            <Navbar />
            <div>
            <HomePage />
            <Aboutt/>
            <ComfortSection/>
            <MyHireFaq/>
            </div>
            <Footer/>
        </div>
    )
}
export default Home