import React, { useState, useEffect, useRef } from 'react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbweGV9TvDeWSlpYVHpUgbpkCJVjszrlefUiDuDxmoduYLtqNW35FhKYthdWhpcsGpv3Tw/exec';

const WeddingWebsite = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '1',
    dietary: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const AnimatedSection = ({ children, delay = 0, className = '' }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsVisible(true), delay);
          }
        },
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [delay]);

    return (
      <div
        ref={ref}
        className={className}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
        }}
      >
        {children}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    setFormSubmitted(false);

    const submissionData = {
      ...formData,
      timestamp: new Date().toLocaleString()
    };

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(submissionData)
      });

      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        throw new Error('Unexpected response from server. Please ensure the Apps Script deployment allows access.');
      }

      if (result.status !== 'success') {
        throw new Error(result.message || 'Submission failed.');
      }

      setFormSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        attendance: '',
        guests: '1',
        dietary: '',
        message: ''
      });

      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (error) {
      console.error('Error:', error);
      setFormError(error.message || 'There was an error submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const MandalaDecor = ({ size = 60, color = '#D4A853', opacity = 0.3 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity }}>
      <g fill="none" stroke={color} strokeWidth="1">
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="25" />
        <circle cx="50" cy="50" r="15" />
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="50" y1="5" x2="50" y2="95" transform={`rotate(${i * 22.5} 50 50)`} />
        ))}
        {[...Array(8)].map((_, i) => (
          <path key={`petal-${i}`} d="M50,20 Q60,35 50,50 Q40,35 50,20" transform={`rotate(${i * 45} 50 50)`} fill={color} fillOpacity="0.2" />
        ))}
      </g>
    </svg>
  );

  const GoldenGateSilhouette = ({ width = 120, color = '#D4A853' }) => (
    <svg width={width} height={width * 0.3} viewBox="0 0 200 60" style={{ opacity: 0.4 }}>
      <path d="M0,55 L20,55 L25,20 L35,20 L35,55 L165,55 L165,20 L175,20 L180,55 L200,55" fill="none" stroke={color} strokeWidth="2" />
      <path d="M25,20 Q100,0 175,20" fill="none" stroke={color} strokeWidth="2" />
      <line x1="50" y1="55" x2="60" y2="25" stroke={color} strokeWidth="1" />
      <line x1="80" y1="55" x2="85" y2="15" stroke={color} strokeWidth="1" />
      <line x1="110" y1="55" x2="110" y2="10" stroke={color} strokeWidth="1" />
      <line x1="140" y1="55" x2="135" y2="15" stroke={color} strokeWidth="1" />
      <line x1="160" y1="55" x2="150" y2="25" stroke={color} strokeWidth="1" />
    </svg>
  );

  const FloatingParticles = () => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            background: 'rgba(212, 168, 83, 0.6)',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animation: `float ${Math.random() * 3 + 4}s ease-in-out infinite`,
            animationDelay: Math.random() * 2 + 's'
          }}
        />
      ))}
    </div>
  );

  const colors = {
    deepPurple: '#4A1259',
    softLavender: '#E8D5F2',
    bayBlue: '#1E3A5F',
    turquoise: '#2A9D8F',
    gold: '#D4A853',
    cream: '#FDF8F3',
    charcoal: '#2D2D2D'
  };

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'details', label: 'Details' },
    { id: 'rsvp', label: 'RSVP' }
  ];

  const scheduleItems = [
    { time: '4:00 PM', title: 'Arrival & Welcome', description: 'Join us for light refreshments as we gather together', icon: '🌸' },
    { time: '5:00 PM', title: 'Ceremony & Rituals', description: 'Traditional Bengali & Tamil wedding ceremonies', icon: '🪔' },
    { time: '7:00 PM', title: 'Cocktail Hour', description: 'Celebrate with drinks, appetizers & music', icon: '🥂' }
  ];

  return (
    <div style={{ fontFamily: "Georgia, serif", background: colors.cream, minHeight: '100vh', color: colors.charcoal }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .nav-link { position: relative; padding: 8px 16px; transition: all 0.3s ease; }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 50%; width: 0; height: 2px;
          background: linear-gradient(90deg, #D4A853, #2A9D8F); transition: all 0.3s ease; transform: translateX(-50%);
        }
        .nav-link:hover::after, .nav-link.active::after { width: 80%; }
        .btn-primary {
          background: linear-gradient(135deg, #2A9D8F 0%, #1E3A5F 100%);
          transition: all 0.3s ease;
        }
        .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(42, 157, 143, 0.3); }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .card { transition: all 0.4s ease; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(74, 18, 89, 0.15); }
        .timeline-item { position: relative; }
        .timeline-item::before {
          content: ''; position: absolute; left: 29px; top: 60px; width: 2px; height: calc(100% - 40px);
          background: linear-gradient(to bottom, #D4A853, #2A9D8F);
        }
        .timeline-item:last-child::before { display: none; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: #2A9D8F !important; box-shadow: 0 0 0 3px rgba(42, 157, 143, 0.1); }
        .gradient-text {
          background: linear-gradient(135deg, #4A1259 0%, #1E3A5F 50%, #2A9D8F 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000, padding: '12px 0',
        background: 'rgba(253, 248, 243, 0.95)', backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(74, 18, 89, 0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px',
                fontFamily: "system-ui, sans-serif", fontWeight: activeTab === tab.id ? '600' : '400',
                color: activeTab === tab.id ? colors.deepPurple : colors.bayBlue, letterSpacing: '0.5px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      {activeTab === 'home' && (
        <section style={{
          minHeight: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          position: 'relative', background: `linear-gradient(135deg, ${colors.deepPurple}15 0%, ${colors.softLavender} 50%, ${colors.bayBlue}10 100%)`,
          overflow: 'hidden', padding: '20px'
        }}>
          <FloatingParticles />
          <div style={{ position: 'absolute', top: '8%', left: '5%', transform: 'rotate(-15deg)' }}><MandalaDecor size={70} /></div>
          <div style={{ position: 'absolute', bottom: '8%', right: '5%', transform: 'rotate(15deg)' }}><MandalaDecor size={50} /></div>

          <AnimatedSection style={{ textAlign: 'center', zIndex: 1 }}>
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(36px, 10vw, 60px)', color: colors.deepPurple, marginBottom: '8px' }}>
              Sneha & Aaditya
            </p>
            <p style={{ fontSize: '14px', color: colors.gold, letterSpacing: '2px', marginBottom: '24px', fontWeight: '500' }}>
              ஸ்நேகா & ஆதித்யா • স্নেহা ও আদিত্য
            </p>
            <div style={{ width: '50px', height: '2px', background: `linear-gradient(90deg, ${colors.gold}, ${colors.turquoise})`, margin: '0 auto 24px' }} />
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: colors.bayBlue, marginBottom: '6px' }}>
              Request the pleasure of your company
            </p>
            <p style={{ fontFamily: "system-ui, sans-serif", fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: colors.bayBlue, marginBottom: '20px' }}>
              at their Engagement Celebration
            </p>
            <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', padding: '20px 32px', borderRadius: '16px', border: `1px solid ${colors.gold}40`, marginBottom: '24px' }}>
              <p style={{ fontSize: '22px', fontWeight: '600', color: colors.deepPurple, marginBottom: '4px' }}>March 21, 2026</p>
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: '14px', color: colors.bayBlue }}>Sugar Land, Texas</p>
            </div>
            <div style={{ marginTop: '16px' }}>
              <GoldenGateSilhouette width={100} />
              <p style={{ fontFamily: "system-ui, sans-serif", fontSize: '10px', color: colors.turquoise, marginTop: '6px', letterSpacing: '2px' }}>Where we met ♡</p>
            </div>
          </AnimatedSection>

          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', animation: 'pulse 2s infinite' }}>
            <svg width="20" height="32" viewBox="0 0 30 50">
              <rect x="1" y="1" width="28" height="48" rx="14" fill="none" stroke={colors.gold} strokeWidth="2" />
              <circle cx="15" cy="15" r="4" fill={colors.turquoise}>
                <animate attributeName="cy" values="15;35;15" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </section>
      )}

      {/* Schedule Section */}
      {activeTab === 'schedule' && (
        <section style={{ minHeight: '85vh', padding: '40px 16px', background: `linear-gradient(180deg, ${colors.cream} 0%, ${colors.softLavender}30 100%)` }}>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <AnimatedSection>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '20px', color: colors.gold, marginBottom: '4px' }}>Saturday</p>
                <h2 className="gradient-text" style={{ fontSize: '28px', fontWeight: '600', marginBottom: '12px' }}>March 21, 2026</h2>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <MandalaDecor size={20} opacity={0.5} />
                  <p style={{ fontFamily: "system-ui, sans-serif", color: colors.bayBlue, letterSpacing: '2px', fontSize: '10px' }}>SCHEDULE OF EVENTS</p>
                  <MandalaDecor size={20} opacity={0.5} />
                </div>
              </div>
            </AnimatedSection>

            <div style={{ position: 'relative' }}>
              {scheduleItems.map((item, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <div className="timeline-item" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '50%',
                      background: `linear-gradient(135deg, ${colors.turquoise}, ${colors.bayBlue})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0,
                      boxShadow: '0 4px 15px rgba(42, 157, 143, 0.3)'
                    }}>
                      {item.icon}
                    </div>
                    <div className="card" style={{
                      flex: 1, background: 'white', borderRadius: '14px', padding: '16px',
                      boxShadow: '0 4px 20px rgba(74, 18, 89, 0.08)', border: `1px solid ${colors.gold}20`
                    }}>
                      <p style={{ fontFamily: "system-ui, sans-serif", fontSize: '12px', color: colors.turquoise, fontWeight: '600', marginBottom: '2px', letterSpacing: '1px' }}>{item.time}</p>
                      <h3 style={{ fontSize: '18px', color: colors.deepPurple, marginBottom: '4px', fontWeight: '600' }}>{item.title}</h3>
                      <p style={{ fontFamily: "system-ui, sans-serif", color: colors.charcoal, opacity: 0.8, fontSize: '13px', lineHeight: '1.4' }}>{item.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events & Details Section */}
      {activeTab === 'details' && (
        <section style={{ minHeight: '85vh', padding: '40px 16px', background: colors.cream }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <AnimatedSection>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 className="gradient-text" style={{ fontSize: '28px', fontWeight: '600', marginBottom: '12px' }}>Event Details</h2>
                <div style={{ width: '60px', height: '2px', background: `linear-gradient(90deg, ${colors.gold}, ${colors.turquoise})`, margin: '0 auto' }} />
              </div>
            </AnimatedSection>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {[
                { icon: '📍', title: 'Venue', content: 'Sugar Land, TX', sub: 'Full address coming soon' },
                { icon: '👗', title: 'Dress Code', content: 'Festive Indian / Cocktail', sub: 'Traditional or elegant attire welcome' },
                { icon: '🏨', title: 'Accommodations', content: 'Coming Soon', sub: 'Hotel block info to follow' }
              ].map((card, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="card" style={{
                    background: 'white', borderRadius: '16px', padding: '24px',
                    boxShadow: '0 4px 20px rgba(74, 18, 89, 0.08)', border: `1px solid ${colors.gold}20`, height: '100%'
                  }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: `linear-gradient(135deg, ${colors.softLavender}, ${colors.cream})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '14px'
                    }}>{card.icon}</div>
                    <h3 style={{ fontSize: '16px', color: colors.deepPurple, marginBottom: '8px', fontWeight: '600' }}>{card.title}</h3>
                    <p style={{ fontFamily: "system-ui, sans-serif", color: colors.turquoise, fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{card.content}</p>
                    <p style={{ fontFamily: "system-ui, sans-serif", color: colors.charcoal, opacity: 0.7, fontSize: '12px', lineHeight: '1.4' }}>{card.sub}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RSVP Section */}
      {activeTab === 'rsvp' && (
        <section style={{ minHeight: '85vh', padding: '40px 16px', background: `linear-gradient(180deg, ${colors.softLavender}30 0%, ${colors.cream} 100%)` }}>
          <div style={{ maxWidth: '420px', margin: '0 auto' }}>
            <AnimatedSection>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 className="gradient-text" style={{ fontSize: '28px', fontWeight: '600', marginBottom: '8px' }}>RSVP</h2>
                <p style={{ fontFamily: "system-ui, sans-serif", color: colors.bayBlue, fontSize: '13px' }}>Please let us know if you can celebrate with us</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <form onSubmit={handleSubmit} style={{
                background: 'white', borderRadius: '20px', padding: '28px',
                boxShadow: '0 10px 40px rgba(74, 18, 89, 0.1)', border: `1px solid ${colors.gold}20`
              }}>
                {[
                  { label: 'Full Name(s) *', type: 'text', key: 'name', placeholder: 'Enter your name', required: true },
                  { label: 'Email Address *', type: 'email', key: 'email', placeholder: 'your@email.com', required: true },
                  { label: 'Phone Number', type: 'tel', key: 'phone', placeholder: '(123) 456-7890' }
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontFamily: "system-ui, sans-serif", fontSize: '12px', color: colors.bayBlue, marginBottom: '4px', fontWeight: '600' }}>{field.label}</label>
                    <input
                      type={field.type} required={field.required} value={formData[field.key]}
                      onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${colors.softLavender}`,
                        fontFamily: "system-ui, sans-serif", fontSize: '13px', transition: 'all 0.3s ease', boxSizing: 'border-box'
                      }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontFamily: "system-ui, sans-serif", fontSize: '12px', color: colors.bayBlue, marginBottom: '4px', fontWeight: '600' }}>Will you be attending? *</label>
                  <select
                    required value={formData.attendance} onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${colors.softLavender}`,
                      fontFamily: "system-ui, sans-serif", fontSize: '13px', background: 'white', cursor: 'pointer', boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Please select</option>
                    <option value="yes">Yes, I'll be there!</option>
                    <option value="no">Sorry, I can't make it</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontFamily: "system-ui, sans-serif", fontSize: '12px', color: colors.bayBlue, marginBottom: '4px', fontWeight: '600' }}>Number of Guests *</label>
                  <input
                    type="number" min="1" max="10" required value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${colors.softLavender}`,
                      fontFamily: "system-ui, sans-serif", fontSize: '13px', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontFamily: "system-ui, sans-serif", fontSize: '12px', color: colors.bayBlue, marginBottom: '4px', fontWeight: '600' }}>Dietary Restrictions</label>
                  <textarea
                    value={formData.dietary} onChange={(e) => setFormData({...formData, dietary: e.target.value})}
                    placeholder="Any dietary requirements" rows={2}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${colors.softLavender}`,
                      fontFamily: "system-ui, sans-serif", fontSize: '13px', resize: 'vertical', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontFamily: "system-ui, sans-serif", fontSize: '12px', color: colors.bayBlue, marginBottom: '4px', fontWeight: '600' }}>Message or Song Request</label>
                  <textarea
                    value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Share your wishes or request a song!" rows={2}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${colors.softLavender}`,
                      fontFamily: "system-ui, sans-serif", fontSize: '13px', resize: 'vertical', boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button type="submit" className="btn-primary" disabled={isSubmitting} style={{
                  width: '100%', padding: '12px 24px', borderRadius: '10px', border: 'none', color: 'white',
                  fontFamily: "system-ui, sans-serif", fontSize: '14px', fontWeight: '600', cursor: 'pointer', letterSpacing: '1px'
                }}>
                  {isSubmitting ? 'Submitting...' : formSubmitted ? '✓ RSVP Submitted!' : 'Submit RSVP'}
                </button>

                {formSubmitted && (
                  <p style={{ textAlign: 'center', marginTop: '12px', color: colors.turquoise, fontFamily: "system-ui, sans-serif", fontSize: '12px' }}>
                    Thank you! We can't wait to celebrate with you!
                  </p>
                )}

                {formError && (
                  <p style={{ textAlign: 'center', marginTop: '12px', color: '#d32f2f', fontFamily: "system-ui, sans-serif", fontSize: '12px' }}>
                    {formError}
                  </p>
                )}
              </form>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ padding: '32px 16px', textAlign: 'center', background: colors.deepPurple, color: 'white' }}>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '24px', marginBottom: '4px', color: colors.gold }}>S & A</p>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: '11px', opacity: 0.7, letterSpacing: '2px' }}>March 21, 2026 • Sugar Land, TX</p>
        <div style={{ marginTop: '12px' }}><GoldenGateSilhouette width={60} color="rgba(255,255,255,0.3)" /></div>
        <p style={{ fontFamily: "system-ui, sans-serif", fontSize: '10px', opacity: 0.5, marginTop: '16px' }}>© 2025 • We can't wait to celebrate with you!</p>
      </footer>
    </div>
  );
};

export default WeddingWebsite;
