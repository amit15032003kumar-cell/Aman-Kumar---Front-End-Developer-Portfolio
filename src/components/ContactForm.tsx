import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Github,
  Instagram,
  Linkedin,
  MapPin,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { studentProfile } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { playUiClick, playUiPing } from '../utils/audioFeedback';

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

  const handleCopyEmail = (e?: React.MouseEvent) => {
    try {
      navigator.clipboard.writeText(studentProfile.email);
    } catch {
      // Fallback
    }

    setCopiedEmail(true);
    playUiPing(2150, 0.06);

    // Subtle tactile confetti burst from button origin
    try {
      let originX = 0.5;
      let originY = 0.5;

      if (e && e.clientX && e.clientY) {
        originX = Math.max(0.05, Math.min(0.95, e.clientX / window.innerWidth));
        originY = Math.max(0.05, Math.min(0.95, e.clientY / window.innerHeight));
      }

      // First burst: Crisp micro-stars and silver circles
      confetti({
        particleCount: 38,
        spread: 55,
        startVelocity: 26,
        origin: { x: originX, y: originY },
        colors: ['#ffffff', '#f4f4f5', '#e4e4e7', '#a1a1aa', '#71717a', '#38bdf8'],
        ticks: 140,
        gravity: 1.2,
        scalar: 0.8,
        shapes: ['circle', 'square'],
        disableForReducedMotion: true,
      });

      // Second gentle flutter: Soft delayed particles
      setTimeout(() => {
        confetti({
          particleCount: 16,
          angle: 90,
          spread: 45,
          startVelocity: 18,
          origin: { x: originX, y: Math.max(0, originY - 0.02) },
          colors: ['#ffffff', '#e4e4e7', '#a1a1aa'],
          ticks: 120,
          gravity: 1.0,
          scalar: 0.7,
          disableForReducedMotion: true,
        });
      }, 70);
    } catch {
      // Graceful fallback
    }

    setTimeout(() => setCopiedEmail(false), 2600);
  };

  /**
   * Lightweight celebratory confetti animation triggered on successful form submission
   */
  const triggerSuccessConfetti = () => {
    try {
      // Left cannon burst
      confetti({
        particleCount: 36,
        angle: 60,
        spread: 55,
        startVelocity: 35,
        origin: { x: 0.2, y: 0.65 },
        colors: ['#ffffff', '#f4f4f5', '#e4e4e7', '#a1a1aa', '#38bdf8', '#60a5fa'],
        ticks: 200,
        gravity: 1.1,
        scalar: 0.85,
        shapes: ['circle', 'square'],
        disableForReducedMotion: true,
      });

      // Right cannon burst
      confetti({
        particleCount: 36,
        angle: 120,
        spread: 55,
        startVelocity: 35,
        origin: { x: 0.8, y: 0.65 },
        colors: ['#ffffff', '#f4f4f5', '#e4e4e7', '#a1a1aa', '#38bdf8', '#60a5fa'],
        ticks: 200,
        gravity: 1.1,
        scalar: 0.85,
        shapes: ['circle', 'square'],
        disableForReducedMotion: true,
      });

      // Gentle secondary center flutter
      setTimeout(() => {
        confetti({
          particleCount: 24,
          spread: 75,
          startVelocity: 24,
          origin: { x: 0.5, y: 0.55 },
          colors: ['#ffffff', '#e4e4e7', '#a1a1aa', '#38bdf8'],
          ticks: 180,
          gravity: 0.95,
          scalar: 0.75,
          shapes: ['circle', 'square'],
          disableForReducedMotion: true,
        });
      }, 150);
    } catch {
      // Graceful fallback if confetti fails
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setValidationError('Please enter your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setValidationError('Please enter a valid email.');
      return;
    }
    if (!formData.message.trim()) {
      setValidationError('Please write a short message.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      triggerSuccessConfetti();
      playUiPing(1760, 0.08);
      setTimeout(() => playUiPing(2200, 0.08), 120);
    }, 600);
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

  const mailtoUrl = `mailto:${studentProfile.email}?subject=${encodeURIComponent(
    `[${formData.inquiryType.toUpperCase()}] ${formData.subject || 'Portfolio Inquiry'} - ${formData.name}`
  )}&body=${encodeURIComponent(
    `Hi Aman,\n\nName: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.inquiryType}\n\nMessage:\n${formData.message}\n`
  )}`;

  return (
    <section id="contact" className="py-16 sm:py-20 bg-black border-b border-zinc-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl space-y-2 mb-10 pb-6 border-b border-zinc-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            <span>Contact</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Get in Touch
          </h2>
          <p className="text-sm text-zinc-400">
            Have an internship opening, a project idea, or a question about my work? Send a direct note or copy my email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Card */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div>
                <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                  Direct Channels
                </span>
                <h3 className="text-lg font-bold text-white">
                  Aman Kumar
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  BCA 2nd Year, G.J. College Rambagh Bihta
                </p>
              </div>

              {/* Email channel */}
              <div className="p-3.5 rounded-lg bg-black border border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                    Direct Email
                  </span>
                  {copiedEmail && (
                    <span className="text-[10px] font-mono text-zinc-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-white" />
                      Copied!
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-zinc-200 truncate select-all">
                      {studentProfile.email}
                    </span>
                  </div>
                  <button
                    type="button"
                    id="contact-copy-email-btn"
                    onClick={(e) => handleCopyEmail(e)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer flex-shrink-0 border ${
                      copiedEmail
                        ? 'bg-white text-black border-white shadow-sm'
                        : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border-zinc-750 hover:border-zinc-600 active:scale-95'
                    }`}
                    title="Copy Aman's email to clipboard"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                        <span>Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* GitHub channel */}
              <div className="p-3 rounded-lg bg-black border border-zinc-800 space-y-1.5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  GitHub Profile
                </span>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Github className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-zinc-200 truncate">
                      @{studentProfile.githubUsername}
                    </span>
                  </div>
                  <a
                    href={studentProfile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 text-xs flex-shrink-0"
                  >
                    <span className="text-[11px] font-mono">Profile</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Instagram channel */}
              <div className="p-3 rounded-lg bg-black border border-zinc-800 space-y-1.5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  Instagram
                </span>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Instagram className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-zinc-200 truncate">
                      @{studentProfile.instagramUsername}
                    </span>
                  </div>
                  <a
                    href={studentProfile.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 text-xs flex-shrink-0"
                  >
                    <span className="text-[11px] font-mono">Open</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* LinkedIn channel */}
              <div className="p-3 rounded-lg bg-black border border-zinc-800 space-y-1.5">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  LinkedIn
                </span>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Linkedin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-zinc-200 truncate">
                      {studentProfile.linkedinUsername}
                    </span>
                  </div>
                  <a
                    href={studentProfile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1 text-xs flex-shrink-0"
                  >
                    <span className="text-[11px] font-mono">Connect</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-3 rounded-lg bg-black border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase block">
                  Location
                </span>
                <div className="flex items-start gap-2 text-xs text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white block">Bihta, Patna, Bihar, India</span>
                    <span className="text-zinc-400 text-[11px]">G.J. College Rambagh Bihta</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 text-left">
              
              {status === 'success' ? (
                /* Success State */
                <div className="py-10 px-4 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Message Ready
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    You can click below to open your email client and send this directly to <span className="font-mono text-zinc-200">{studentProfile.email}</span>.
                  </p>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2">
                    <a
                      href={mailtoUrl}
                      className="w-full sm:w-auto px-5 py-2 rounded-lg bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open Mail Client</span>
                    </a>

                    <button
                      type="button"
                      id="success-copy-email-btn"
                      onClick={(e) => handleCopyEmail(e)}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-mono border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        copiedEmail
                          ? 'bg-zinc-100 text-black border-white'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700 hover:border-zinc-600'
                      }`}
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-800 transition-colors"
                    >
                      Write Another
                    </button>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-zinc-900 pb-3 mb-1 flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">
                      Leave a Message
                    </h3>
                    <button
                      type="button"
                      id="form-quick-copy-email-btn"
                      onClick={(e) => handleCopyEmail(e)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer border ${
                        copiedEmail
                          ? 'bg-white text-black border-white shadow-sm'
                          : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800 hover:border-zinc-700 active:scale-95'
                      }`}
                      title="Quickly copy Aman's email to clipboard"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-black stroke-[3]" />
                          <span className="font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-zinc-400" />
                          <span>Copy Email</span>
                        </>
                      )}
                    </button>
                  </div>

                  {validationError && (
                    <div className="p-2.5 rounded-lg bg-zinc-900 border border-red-900/60 text-red-300 text-xs">
                      {validationError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="contact-name" className="text-[11px] font-mono uppercase text-zinc-400 block">
                        Your Name <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 focus:border-zinc-600 focus:outline-none text-xs text-white placeholder-zinc-600 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-email" className="text-[11px] font-mono uppercase text-zinc-400 block">
                        Email Address <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 focus:border-zinc-600 focus:outline-none text-xs text-white placeholder-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="contact-inquiry-type" className="text-[11px] font-mono uppercase text-zinc-400 block">
                        Inquiry Type
                      </label>
                      <select
                        id="contact-inquiry-type"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 focus:border-zinc-600 focus:outline-none text-xs text-white transition-colors cursor-pointer"
                      >
                        <option value="internship">Front-End Internship</option>
                        <option value="job">Junior Developer Role</option>
                        <option value="freelance">Freelance Web Project</option>
                        <option value="collaboration">Open Source Collaboration</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="contact-subject" className="text-[11px] font-mono uppercase text-zinc-400 block">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Front-End Opportunity"
                        className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 focus:border-zinc-600 focus:outline-none text-xs text-white placeholder-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="contact-message" className="text-[11px] font-mono uppercase text-zinc-400 block">
                      Message <span className="text-zinc-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hi Aman, I checked out your portfolio and repositories..."
                      className="w-full px-3 py-2 rounded-lg bg-black border border-zinc-800 focus:border-zinc-600 focus:outline-none text-xs text-white placeholder-zinc-600 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <span className="text-[11px] font-mono text-zinc-400">
                      Delivered to {studentProfile.email}
                    </span>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      id="contact-submit-btn"
                      className="px-5 py-2 rounded-lg bg-white hover:bg-zinc-200 text-black font-semibold text-xs flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>
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
