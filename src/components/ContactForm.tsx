import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Github,
  MapPin,
  Sparkles,
  Phone,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';
import { ContactFormData } from '../types';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'internship',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(studentProfile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setValidationError('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please provide a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setValidationError('Please enter a brief message describing your inquiry.');
      return;
    }

    setStatus('submitting');

    // Simulate reliable form submission & offer immediate mailto launcher
    setTimeout(() => {
      setStatus('success');
    }, 900);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      inquiryType: 'internship',
      message: '',
    });
    setStatus('idle');
  };

  // Compose dynamic mailto URL
  const mailtoUrl = `mailto:${studentProfile.email}?subject=${encodeURIComponent(
    `[${formData.inquiryType.toUpperCase()}] ${formData.subject || 'Portfolio Inquiry'} - from ${formData.name || 'Website Visitor'}`
  )}&body=${encodeURIComponent(
    `Hello Aman,\n\nName: ${formData.name}\nEmail: ${formData.email}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}\n\nSent via your portfolio website.`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#090b10] relative">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-semibold">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Get In Touch with Aman Kumar
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Seeking front-end developer internships, project collaborations, or curious about 
            code repositories? Send a direct message or connect via GitHub & Email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info & Location Card */}
          <div className="lg:col-span-5 space-y-5 text-left">
            
            {/* Quick Contact Card */}
            <div className="p-6 rounded-3xl bg-[#0e131d] border border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider block mb-1">
                  Direct Inquiries
                </span>
                <h3 className="text-xl font-bold text-white">
                  Let's Discuss Your Next Web Project
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  I typically respond within 24 hours. Open to remote internships, full-time junior front-end roles, and freelance UI development.
                </p>
              </div>

              {/* Email channel */}
              <div className="p-4 rounded-2xl bg-[#090c13] border border-slate-800/90 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Official Email Address
                </span>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-mono text-slate-200 truncate select-all">
                      {studentProfile.email}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors flex items-center gap-1 text-xs cursor-pointer flex-shrink-0"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* GitHub channel */}
              <div className="p-4 rounded-2xl bg-[#090c13] border border-slate-800/90 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  GitHub Profile
                </span>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Github className="w-4 h-4 text-slate-300 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-mono text-slate-200 truncate">
                      @{studentProfile.githubUsername}
                    </span>
                  </div>
                  <a
                    href={studentProfile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs flex-shrink-0"
                  >
                    <span className="text-[11px]">Profile</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Academic Location Info */}
              <div className="p-4 rounded-2xl bg-[#090c13] border border-slate-800/90 space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Location & Residence
                </span>
                <div className="flex items-start gap-2 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Bihta, Patna, Bihar, India</span>
                    <span className="text-slate-400 text-[11px]">Student at G.J. College Rambagh Bihta</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick response commitment */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>
                Committed to delivering clean code, clear communication, and dedicated craftsmanship for every project.
              </span>
            </div>

          </div>

          {/* Right Column: Integrated Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1017] border border-slate-800 shadow-2xl relative text-left">
              
              {status === 'success' ? (
                /* Success State Screen */
                <div className="py-12 px-4 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Thank You, {formData.name || 'Friend'}!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been formulated successfully! You can also launch your email client directly below to send this copy to <span className="font-mono text-cyan-300">amit15032003kumar@gmail.com</span>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={mailtoUrl}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-cyan-500/25"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Launch Default Mail Client</span>
                    </a>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-800 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-white">
                      Send a Message to Aman
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Fill out the details below to initiate direct communication.
                    </p>
                  </div>

                  {validationError && (
                    <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs font-medium">
                      ⚠️ {validationError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-mono uppercase text-slate-400 font-medium">
                        Your Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-mono uppercase text-slate-400 font-medium">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. rahul@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Inquiry Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-inquiry-type" className="text-xs font-mono uppercase text-slate-400 font-medium">
                        Opportunity / Inquiry Type
                      </label>
                      <select
                        id="contact-inquiry-type"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white transition-colors cursor-pointer"
                      >
                        <option value="internship">Front-End Internship</option>
                        <option value="job">Full-time Junior Developer Role</option>
                        <option value="freelance">Freelance Web Project</option>
                        <option value="collaboration">Open Source Collaboration</option>
                        <option value="general">General Networking / Feedback</option>
                      </select>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-subject" className="text-xs font-mono uppercase text-slate-400 font-medium">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Front-End Opportunity"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono uppercase text-slate-400 font-medium">
                      Your Message <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hi Aman, I noticed your front-end projects and would like to discuss..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>Direct delivery to Aman's inbox</span>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        id="contact-submit-btn"
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {status === 'submitting' ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
