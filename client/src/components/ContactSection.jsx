import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Mail, User, MessageSquare, Tag, Sparkles } from 'lucide-react';
import { sendContactMessage } from '../utils/api';
import { sound } from '../utils/sound';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationData, setConfirmationData] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sound.playClick();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await sendContactMessage(formData);
      setConfirmationData(response);
      setStatus('success');
      sound.playSuccess();

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#fe0979', '#a855f7', '#10b981']
        });
      } catch {
        // Fallback if confetti blocked
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to dispatch message to server');
    }
  };

  const handleReset = () => {
    sound.playClick();
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
    setConfirmationData(null);
  };

  return (
    <section id="contact" className="relative z-20 py-24 px-4 md:px-12 bg-[#050713]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel text-cyan-400 text-xs font-mono mb-4">
            <Send className="w-3.5 h-3.5" />
            <span>COMMUNICATION ARRAY</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Transmit Inquiry
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Send a transmission directly to the Node.js backend. Form entries are validated,
            logged, and confirmed in real time.
          </p>
        </div>

        {/* Transmission Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-slate-700/60 shadow-2xl relative overflow-hidden">
          {/* Subtle Cyber Glow Backdrop */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

          {status === 'success' ? (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Transmission Acknowledged
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  {confirmationData?.message ||
                    'Your message was received by our Node.js Express server. We will contact you soon.'}
                </p>
                {confirmationData?.confirmationId && (
                  <div className="mt-4 inline-block font-mono text-xs px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300">
                    ID: {confirmationData.confirmationId}
                  </div>
                )}
              </div>
              <div>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-lg"
                >
                  Send Another Transmission
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Your Identifier / Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Commander Alex"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-slate-200 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Comm Frequency / Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@nexus-orbit.io"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-slate-200 transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Subject Directive</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="3D Web Development Project Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-slate-200 transition-colors"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Transmission Payload / Message</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Brief us on your desired 3D features, WebGL scene specifications, or backend requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-cyan-400 focus:outline-none text-sm text-slate-200 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {status === 'loading' ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-black" />
                    <span>Transmitting to Node.js...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-black" />
                    <span>Dispatch Transmission</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
