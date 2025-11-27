import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import yardImg from '../assets/Yard.jpg'
import { CarFront, HotelIcon, type Hotel } from 'lucide-react'

const About: React.FC = () => {
    return (
             <div className="page-container">
            <Navbar />

            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, #2d5a4a 0%, #1e3a32 100%)',
                color: 'white',
                padding: '4rem 2rem',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    margin: '0 0 1rem 0',
                    fontWeight: 'bold'
                }}>
                    About Us
                </h1>
                
            </div>

            {/* Our Story Section */}
            <div style={{
                padding: '4rem 2rem',
                backgroundColor: '#fff'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    gap: '3rem',
                    alignItems: 'center'
                }}>
                    <div>
                        <h2 style={{
                            fontSize: '2.5rem',
                            color: '#2d5a4a',
                            marginBottom: '1.5rem',
                            fontWeight: 'bold'
                        }}>
                            📖 Our Story
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#555',
                            lineHeight: '1.8',
                            marginBottom: '1.5rem'
                        }}>
                            Lemcee Executive Concierge  is a premium lifestyle managemgement and concierge services dedicated to offering curated luxury experiences across Kenya and Beyond
                            We specialize in executive mobility ,event lifestyle management, hospitality and corporate services.

                        </p>
                       
                    </div>
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <img
                            src={yardImg}
                            alt="Vehicles in a yard"
                            style={{
                                width: '100%',
                                maxWidth: '450px',
                                borderRadius: '16px',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                height: '300px',
                                objectFit: 'cover'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div style={{
                padding: '4rem 2rem',
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        color: '#2d5a4a',
                        marginBottom: '1rem',
                        fontWeight: 'bold'
                    }}>
                        ✨ Our Services
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#666',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        lineHeight: '1.6'
                    }}>
                        What drives us every day to create exceptional  experience
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            {
                                // icon: <Fly,
                                title: 'Airport Transfers',
                                // description: `Whether you need a reliable airport transfer or an SGR station pickup, our system instantly calculates your fare, allowing you to book and confirm your ride in just a few clicks.

                                //                 With operations in Nairobi, Mombasa, Kisumu, Nanyuki, and Eldoret, we offer a safe, affordable, and efficient transfer service. 
                                //                 Enjoy transparent pricing, professional drivers, and comfortable vehicles tailored to your needs.

                                //                 Book your airport or SGR transfer today and experience hassle-free travel with Kenya’s leading online taxi booking platform!. `
                            },
                            {
                                icon: <HotelIcon/>,
                                title: 'Hotel Transfers',
                            },
                            {
                                //icon: '🌍',
                                title: 'Corporate Transportation',
                            },
                            {
                                //icon: '🤝',
                                title: 'Car Hire',
                            },
                            {
                                //icon: '🤝',
                                title: 'Diplomat tranportation',
                            },
                            {
                                //icon: '🤝',
                                title: 'Wedding Vehicles',
                            },
                             {
                                //icon: '🤝',
                                title: 'Ruracio Vehicles',
                            },
                        
                             {
                                //icon: '🤝',
                                title: 'Car Hire',
                            }
                        ].map((value, index) => (
                            <div key={index} style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                borderRadius: '16px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                }}>
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem'
                                }}>
                                    {value.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    color: '#2d5a4a',
                                    marginBottom: '1rem',
                                    fontWeight: 'bold'
                                }}>
                                    {value.title}
                                </h3>
                                <p style={{
                                    fontSize: '1rem',
                                    color: '#666',
                                    lineHeight: '1.6'
                                }}>
                                
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why choose us */}
            <div style={{
                    padding: '4rem 2rem',
                    backgroundColor: '#fff'
                }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        textAlign: 'center'
                    }}>

                        {/* Title */}
                        <h2 style={{
                            fontSize: '2.5rem',
                            color: '#2d5a4a',
                            marginBottom: '1rem',
                            fontWeight: 'bold'
                        }}>
                            ⭐ Why Choose Us
                        </h2>

                        <p style={{
                            fontSize: '1.2rem',
                            color: '#666',
                            maxWidth: '650px',
                            margin: '0 auto 3rem',
                            lineHeight: '1.6'
                        }}>
                            We provide unmatched convenience, flexibility, and premium customer service in every ride you book.
                        </p>

                        {/* Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '2rem'
                        }}>

                            {[
                                {
                                    title: "Transparent Pricing",
                                    description: "No hidden charges — everything is clear and upfront so you can book confidently."
                                },
                                {
                                    title: "Flexible Pick-up & Drop-off",
                                    description: "Choose where and when to get your car. Your schedule, your rules."
                                },
                                {
                                    title: "24/7 Customer Support",
                                    description: "We’re always available for questions, emergencies, or last-minute changes."
                                },
                                {
                                    title: "Wide Fleet Selection",
                                    description: "Sedans, SUVs, luxury — pick the perfect vehicle for your journey."
                                },
                                {
                                    title: "Fast & Easy Booking",
                                    description: "Book your ride in under 2 minutes with our smooth and simple process."
                                },
                                {
                                    title: "Professional & Trusted Service",
                                    description: "All vehicles are regularly serviced, insured, and safety-checked."
                                }
                            ].map((item, index) => (
                                <div key={index} style={{
                                    backgroundColor: 'white',
                                    borderRadius: '16px',
                                    padding: '2rem',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.3s ease',
                                    cursor: 'pointer',
                                    textAlign: 'left'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)'
                                    }}
                                >
                                    {/* Icon Placeholder */}
                                    <div style={{
                                        fontSize: '2rem',
                                        color: '#d97706',
                                        marginBottom: '1rem'
                                    }}>
                                        ★
                                    </div>

                                    <h3 style={{
                                        fontSize: '1.3rem',
                                        fontWeight: 'bold',
                                        color: '#2d5a4a',
                                        marginBottom: '0.5rem'
                                    }}>
                                        {item.title}
                                    </h3>

                                    <p style={{
                                        fontSize: '0.95rem',
                                        color: '#666',
                                        lineHeight: '1.6'
                                    }}>
                                        {item.description}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>


            {/* Fun Facts Section */}
            <div style={{
                padding: '4rem 2rem',
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    display:'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    //marginTop: '2rem',
                    textAlign: 'center'
                }}>
                    <div className='bg-black-400 rounded-3xl min-h-[70vh] lg:min-h-[60vh] shadow-xl'>
                        <h2 style={{
                            fontSize: '2.5rem',
                            color: '#2d5a4a',
                            marginBottom: '1rem',
                            fontWeight: 'bold'
                        }}>
                        Our Mission
                        </h2>
                        <p className="py-6 text-white-700 text-lg leading-relaxed">
                            Our mission is simply to deliver excellence ,trust and prestige for every client whether individual,corporate  or diplomatic.
                        </p>
                    </div>
                    <div className='bg-black-400 rounded-3xl min-h-[70vh] lg:min-h-[60vh] shadow-xl'>
                        <h2 style={{
                            fontSize: '2.5rem',
                            color: '#2d5a4a',
                            marginBottom: '1rem',
                            fontWeight: 'bold'
                        }}>
                        Our Vision
                        </h2>
                        <p className="py-6 text-white-700 text-lg leading-relaxed">
                            Our vision is to become the leading vehicle rental provider in the region, known for innovation, quality, and customer satisfaction. 
                            We strive to build a future where mobility is accessible, efficient, and enjoyable for everyone
                        </p>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div style={{
                padding: '4rem 2rem',
                background: 'linear-gradient(135deg, #2d5a4a 0%, #1e3a32 100%)',
                color: 'white',
                textAlign: 'center'
            }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        fontWeight: 'bold'
                    }}>
                        🌟 Ready to Experience the Lemcee Executive Concierge?
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        marginBottom: '2rem',
                        lineHeight: '1.6',
                        opacity: '0.9'
                    }}>
                        Where luxury meets lifestyle.Book with us todayband enjoy curated premiun experience
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <button style={{
                            backgroundColor: 'white',
                            color: '#2d5a4a',
                            padding: '1rem 2rem',
                            border: 'none',
                            borderRadius: '25px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)'
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                            }}>
                            <CarFront/> View Our Vehicles
                        </button>

                        <button style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            padding: '1rem 2rem',
                            border: '2px solid white',
                            borderRadius: '25px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'white'
                                e.currentTarget.style.color = '#2d5a4a'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent'
                                e.currentTarget.style.color = 'white'
                            }}>
                            📞 Contact Us
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default About