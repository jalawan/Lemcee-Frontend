import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface ContactFormData {
    name: string
    email: string
    phone: string
    subject: string
    message: string
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            alert(`Thank you ${formData.name}! We'll get back to you within 24 hours.`)
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })
            setIsSubmitting(false)
        }, 2000)
    }

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
                    📞 Get in Touch
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.6',
                    opacity: '0.9'
                }}>
                    We'd love to hear from you! Whether you have questions, feedback, or want to make a reservation, we're here to help.
                </p>
            </div>

            {/* Contact Information Cards */}
            <div style={{
                padding: '3rem 2rem',
                backgroundColor: '#d30291ff'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {[
                        {
                            icon: '📍',
                            title: 'Visit Us',
                            info: 'G-Town',
                            detail: 'G-Town, Embu 60100',
                            action: 'Get Directions'
                        },
                        {
                            icon: '📞',
                            title: 'Call Us',
                            info: '+254 712 345 678',
                            detail: '+254 700 987 654',
                            action: 'Call Now'
                        },
                        // {
                        //     icon: '✉️',
                        //     title: 'Email Us',
                        //     info: 'hello@matheseatery.com',
                        //     detail: 'info@matheseatery.com',
                        //     action: 'Send Email'
                        // },
                        {
                            icon: '🕒',
                            title: 'Opening Hours',
                            info: 'Mon - Sun: 8:00 AM',
                            detail: 'to 10:00 PM',
                            action: 'View Schedule'
                        }
                    ].map((contact, index) => (
                        <div key={index} style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                            textAlign: 'center',
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
                                {contact.icon}
                            </div>
                            <h3 style={{
                                fontSize: '1.4rem',
                                color: '#2d5a4a',
                                marginBottom: '1rem',
                                fontWeight: 'bold'
                            }}>
                                {contact.title}
                            </h3>
                            <p style={{
                                fontSize: '1.1rem',
                                color: '#333',
                                marginBottom: '0.5rem',
                                fontWeight: '600'
                            }}>
                                {contact.info}
                            </p>
                            <p style={{
                                fontSize: '1rem',
                                color: '#666',
                                marginBottom: '1.5rem'
                            }}>
                                {contact.detail}
                            </p>
                            <button style={{
                                backgroundColor: '#2d5a4a',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '25px',
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#1e3a32'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#2d5a4a'
                                }}>
                                {contact.action}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Form Section */}
            <div style={{
                padding: '4rem 2rem',
                backgroundColor: '#fff'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    gap: '4rem',
                    alignItems: 'start'
                }}>
                    {/* Contact Form */}
                    <div>
                        <h2 style={{
                            fontSize: '2.5rem',
                            color: '#2d5a4a',
                            marginBottom: '1rem',
                            fontWeight: 'bold'
                        }}>
                            💬 Send Us a Message
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#666',
                            marginBottom: '2rem',
                            lineHeight: '1.6'
                        }}>
                            Have a question, suggestion, or want to make a reservation? Fill out the form below and we'll get back to you as soon as possible.
                        </p>

                        <form onSubmit={handleSubmit} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem'
                        }}>
                            {/* Name and Email Row */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#333',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your full name"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #e1e5e9',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#333',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your email"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #e1e5e9',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Phone and Subject Row */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#333',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Your phone number"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #e1e5e9',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease',
                                            outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#333',
                                        marginBottom: '0.5rem'
                                    }}>
                                        Subject *
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid #e1e5e9',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            transition: 'border-color 0.3s ease',
                                            outline: 'none',
                                            backgroundColor: 'white',
                                            boxSizing: 'border-box'
                                        }}
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="reservation">🍽️ Make a Reservation</option>
                                        <option value="feedback">💬 General Feedback</option>
                                        <option value="complaint">⚠️ Complaint</option>
                                        <option value="catering">🎉 Catering Services</option>
                                        <option value="careers">💼 Career Opportunities</option>
                                        <option value="other">❓ Other</option>
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    color: '#333',
                                    marginBottom: '0.5rem'
                                }}>
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={6}
                                    placeholder="Tell us how we can help you..."
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid #e1e5e9',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        transition: 'border-color 0.3s ease',
                                        outline: 'none',
                                        resize: 'vertical',
                                        minHeight: '120px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                style={{
                                    backgroundColor: isSubmitting ? '#6c757d' : '#2d5a4a',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {isSubmitting ? '⏳ Sending...' : '📤 Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div>
                        <h3 style={{
                            fontSize: '2rem',
                            color: '#2d5a4a',
                            marginBottom: '1.5rem',
                            fontWeight: 'bold'
                        }}>
                            🗺️ Find Us
                        </h3>

                        {/* Map Placeholder */}
                        <div style={{
                            width: '100%',
                            height: '250px',
                            backgroundColor: '#e9ecef',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2rem',
                            border: '2px solid #dee2e6'
                        }}>
                            <div style={{
                                textAlign: 'center',
                                color: '#6c757d'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🗺️</div>
                                <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>Interactive Map</p>
                                <p style={{ fontSize: '0.9rem' }}>123 Delicious Street, Nairobi</p>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '2rem',
                            borderRadius: '12px',
                            marginBottom: '2rem'
                        }}>
                            <h4 style={{
                                fontSize: '1.3rem',
                                color: '#2d5a4a',
                                marginBottom: '1rem',
                                fontWeight: 'bold'
                            }}>
                                🕒 Business Hours
                            </h4>
                            {[
                                { day: 'Monday - Thursday', hours: '8:00 AM - 9:00 PM' },
                                { day: 'Friday - Saturday', hours: '8:00 AM - 10:00 PM' },
                                { day: 'Sunday', hours: '9:00 AM - 9:00 PM' }
                            ].map((schedule, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '0.5rem 0',
                                    borderBottom: index < 2 ? '1px solid #dee2e6' : 'none'
                                }}>
                                    <span style={{ fontWeight: '600', color: '#333' }}>{schedule.day}</span>
                                    <span style={{ color: '#2d5a4a', fontWeight: '500' }}>{schedule.hours}</span>
                                </div>
                            ))}
                        </div>

                        {/* Social Media */}
                        <div style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: '12px',
                            border: '2px solid #e9ecef'
                        }}>
                            <h4 style={{
                                fontSize: '1.3rem',
                                color: '#2d5a4a',
                                marginBottom: '1rem',
                                fontWeight: 'bold'
                            }}>
                                📱 Follow Us
                            </h4>
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                flexWrap: 'wrap'
                            }}>
                                {['📘 Facebook', '📸 Instagram', '🐦 Twitter', '📺 YouTube'].map((social, index) => (
                                    <button key={index} style={{
                                        backgroundColor: '#f8f9fa',
                                        color: '#2d5a4a',
                                        padding: '0.75rem 1rem',
                                        border: '2px solid #e9ecef',
                                        borderRadius: '25px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#2d5a4a'
                                            e.currentTarget.style.color = 'white'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = '#f8f9fa'
                                            e.currentTarget.style.color = '#2d5a4a'
                                        }}>
                                        {social}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Contact