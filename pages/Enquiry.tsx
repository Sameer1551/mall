import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const spaceTypes = ['Fashion Avenue', 'Grand Atrium', 'Dining Terrace', 'Pop-Up Quarter', 'Luxury Retail Spaces', 'Flagship Store Locations', 'Dining & Café Spaces', 'Pop-Up & Temporary'];

export default function Enquiry() {
  const [searchParams] = useSearchParams();
  const preselectedSpace = searchParams.get('space') || '';
  const [spaceType, setSpaceType] = useState(preselectedSpace);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: insertError } = await supabase
      .from('enquiries')
      .insert({ name, email, phone, company, space_type: spaceType, message });

    if (insertError) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/4/42/081106_Dubai_Mall_-_souk.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 to-[#050505]" />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="font-inter text-xs tracking-[0.5em] text-gold uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Retail Leasing
          </motion.p>
          <motion.h1
            className="font-bodoni text-4xl md:text-6xl text-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Enquire About a <span className="text-gold-gradient">Space</span>
          </motion.h1>
        </div>
      </div>

      {/* Back */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <Link to="/retail-leasing" className="inline-flex items-center gap-2 text-gold/60 hover:text-gold font-inter text-sm tracking-wider uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Retail Leasing
        </Link>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 pb-32">
        {submitted ? (
          <motion.div
            className="glass-card rounded-lg p-8 md:p-12 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
            <h2 className="font-bodoni text-3xl text-light mb-3">Enquiry Submitted</h2>
            <p className="font-inter text-sm text-light/60 mb-8">
              Thank you for your interest in The Dubai Mall. Our leasing team will contact you within 24 hours.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-dark text-sm font-inter tracking-wider uppercase hover:bg-gold-light transition-all duration-300"
            >
              Return Home
            </Link>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card rounded-lg p-6 md:p-10 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {error && (
              <div className="bg-red-900/20 border border-red-500/30 rounded p-3">
                <p className="font-inter text-sm text-red-400">{error}</p>
              </div>
            )}

            <div>
              <label className="block font-inter text-xs tracking-widest uppercase text-light/40 mb-2">Space Type</label>
              <select
                value={spaceType}
                onChange={e => setSpaceType(e.target.value)}
                className="w-full bg-dark-100 border border-gold/10 rounded px-4 py-3 text-light font-inter text-sm focus:border-gold/40 focus:outline-none transition-colors"
              >
                <option value="" className="bg-dark-100">Select a space type</option>
                {spaceTypes.map(s => (
                  <option key={s} value={s} className="bg-dark-100">{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-inter text-xs tracking-widest uppercase text-light/40 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-dark-100 border border-gold/10 rounded px-4 py-3 text-light font-inter text-sm focus:border-gold/40 focus:outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block font-inter text-xs tracking-widest uppercase text-light/40 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-dark-100 border border-gold/10 rounded px-4 py-3 text-light font-inter text-sm focus:border-gold/40 focus:outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-inter text-xs tracking-widest uppercase text-light/40 mb-2">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-dark-100 border border-gold/10 rounded px-4 py-3 text-light font-inter text-sm focus:border-gold/40 focus:outline-none transition-colors"
                  placeholder="+971 XX XXX XXXX"
                />
              </div>
              <div>
                <label className="block font-inter text-xs tracking-widest uppercase text-light/40 mb-2">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full bg-dark-100 border border-gold/10 rounded px-4 py-3 text-light font-inter text-sm focus:border-gold/40 focus:outline-none transition-colors"
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div>
              <label className="block font-inter text-xs tracking-widest uppercase text-light/40 mb-2">Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                className="w-full bg-dark-100 border border-gold/10 rounded px-4 py-3 text-light font-inter text-sm focus:border-gold/40 focus:outline-none transition-colors resize-none"
                placeholder="Tell us about your requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-3 bg-gold text-dark text-sm font-inter tracking-wider uppercase hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Enquiry'}
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
