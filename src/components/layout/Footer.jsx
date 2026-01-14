import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* About */}
                    <div>
                        <h4 className="text-2xl font-bold text-white mb-4">
                            PG-Tech <span className="text-blue-400">Solutions</span>
                        </h4>
                        <p className="text-gray-400">
                            Committed to providing world-class tech education and creating the next generation of innovators.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
                        <ul className="space-y-2">
                            <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
                            <li><a href="/why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
                            <li><a href="/testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                            <li><a href="/batches" className="hover:text-white transition-colors">Batches</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-4">Contact Us</h5>
                        <ul className="space-y-3">
                            <li className="flex items-center">
                                <Mail size={18} className="mr-3 text-blue-400" />
                                <span>gatiprerna@gmail.com</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-3 text-blue-400" />
                                <span>+91 9815595408, +91 7717313727</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-3 text-blue-400 mt-1" />
                                <span>F-125, Ground Floor, Phase-8B, Industrial Area, Sector 74, SAS Nagar, Punjab 140308</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-4">Follow Us</h5>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/people/Pg-tech-solutions/61584754178079/?sk=followers" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="https://instagram.com/pgtechsolution" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.linkedin.com/company/prerna-gati-technology-pvt-ltd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-10 border-t border-white/10" />

                <div className="text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} PG-Tech Solutions. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
