import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { personal } from '../data/personal';

const Contact = () => {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="font-heading text-3xl font-bold gradient-gold-text">
          LET'S WORK TOGETHER
        </h2>
        <p className="text-white/40 max-w-lg mt-3">
          I'm always open to discussing new opportunities, collaborations, or interesting projects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="glass-card p-8 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#E8C48E]/10 border border-[#E8C48E]/20 flex items-center justify-center text-[#E8C48E] text-xl mx-auto">
              <FiMail />
            </div>
            <h3 className="font-heading text-white font-semibold mt-5">Email</h3>
            <p className="text-sm text-white/40 mt-1">{personal.email}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -6 }}
            className="glass-card p-8 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#E8C48E]/10 border border-[#E8C48E]/20 flex items-center justify-center text-[#E8C48E] text-xl mx-auto">
              <FiMapPin />
            </div>
            <h3 className="font-heading text-white font-semibold mt-5">Location</h3>
            <p className="text-sm text-white/40 mt-1">{personal.location}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -6 }}
            className="glass-card p-8 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#E8C48E]/10 border border-[#E8C48E]/20 flex items-center justify-center text-[#E8C48E] text-xl mx-auto">
              <FiPhone />
            </div>
            <h3 className="font-heading text-white font-semibold mt-5">Phone</h3>
            <p className="text-sm text-white/40 mt-1">{personal.phone}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
