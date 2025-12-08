import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* About */}
                    <div>
                        <h5 className="text-xl font-bold text-white mb-4">
                            Tech<span className="text-blue-400">Institute</span>
                        </h5>
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
                                <span>info@techinstitute.com</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={18} className="mr-3 text-blue-400" />
                                <span>+1 (234) 567-890</span>
                            </li>
                            <li className="flex items-start">
                                <MapPin size={18} className="mr-3 text-blue-400 mt-1" />
                                <span>123 Tech Way, Silicon Valley, CA</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h5 className="text-lg font-semibold text-white mb-4">Follow Us</h5>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="my-10 border-t border-white/10" />

                <div className="text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} TechInstitute. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
