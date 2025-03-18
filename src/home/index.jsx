import Header from '@/components/ui/custom/Header';
import { AtomIcon, Edit, Mail, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useRef } from 'react';

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function Home() {
  // Create a reference to the footer element
  const footerRef = useRef(null);

  // Function to scroll to the footer
  const scrollToFooter = () => {
    footerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header />
      <div className="relative overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-20 bg-[#273841] dark:bg-[#1A1F24]">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <motion.a
                href="https://rkcoding.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeInUp}
                className="inline-flex items-center justify-center px-6 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white hover:bg-white/20 transition-all"
              >
                <span className="bg-white text-[#273841] rounded-full px-3 py-1 mr-2">New</span>
                <span>RKCoding All new Projects</span>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </motion.a>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl font-bold text-white mb-6"
              >
                Build Your Resume <span className="text-[#4A90E2]">With AI</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-lg text-gray-200 mb-8"
              >
                Effortlessly Craft a Standout Resume with Our AI-Powered Builder
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
              >
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#4A90E2] text-white font-semibold rounded-lg hover:bg-[#357ABD] transition-all"
                >
                  Get Started
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <button
           onClick={scrollToFooter} // Scroll to footer on click
        className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all"
           >
          <Mail className="mr-2 w-5 h-5" /> 
                 Contact Us
              </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white dark:bg-[#1A1F24]">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-4xl font-bold text-[#273841] dark:text-white mb-4"
            >
              How It Works?
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-lg text-gray-600 dark:text-gray-400 mb-12"
            >
              Give mock interviews in just 3 simple steps
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  icon: <AtomIcon className="w-12 h-12 text-[#4A90E2]" />,
                  title: 'Write Prompts for Your Form',
                  description:
                    'Start by entering your skills, experiences, and career goals. Our AI will guide you with smart prompts to create a tailored resume that stands out.',
                },
                {
                  icon: <Edit className="w-12 h-12 text-[#4A90E2]" />,
                  title: 'Edit Your Form',
                  description:
                    'Refine your resume with easy-to-use editing tools. Add, remove, or rearrange sections to perfectly align with your target job or industry.',
                },
                {
                  icon: <Share2 className="w-12 h-12 text-[#4A90E2]" />,
                  title: 'Share & Start Accepting Responses',
                  description:
                    'Once your resume is ready, share it directly with employers or download it in multiple formats. Start receiving responses and land your dream job!',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white dark:bg-[#273841] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex justify-center mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[#273841] dark:text-white mb-4">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50 dark:bg-[#1A1F24]">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-4xl font-bold text-[#273841] dark:text-white mb-6"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8"
            >
              Join thousands of users who have transformed their resumes with AI.
            </motion.p>
            <motion.a
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              href="/auth/sign-in"
              className="inline-block px-8 py-3 bg-[#4A90E2] text-white font-semibold rounded-lg hover:bg-[#357ABD] transition-all"
            >
              Get Started Today
            </motion.a>
          </div>
        </section>

        {/* Minimalist Footer */}
        <footer ref={footerRef} className="bg-[#273841] dark:bg-[#1A1F24] text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* About Us */}
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold">About Us</h3>
                <p className="text-sm text-gray-400">
                  We help you build standout resumes with AI-powered tools.
                </p>
              </div>

              {/* Follow Us */}
              <div className="flex space-x-4 mr-40">
                <a href="https://github.com/Dopex7" className="text-gray-400 hover:text-[#4A90E2] transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/rinor-krasniqi-6a7a442b9/" className="text-gray-400 hover:text-[#4A90E2] transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>

              {/* Copyright */}
              <div className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} ResuSync. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;