import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, Umbrella, Waves, Sun, MapPin, ArrowRight, 
  Calendar, Users, Briefcase, Compass, Star, Heart,
  ChevronLeft, ChevronRight, Award, Globe, Coffee,
  Ship, Camera, Mountain, TreePine, Droplets
} from 'lucide-react';

const MaldivesHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // ✅ 8 Slides with Maldives Theme
  const slides = [
    {
      id: 1,
      title: 'Work in Paradise',
      subtitle: 'Maldives Island Life',
      description: 'Join our team in the stunning Maldives! Work on cutting-edge marine technology while enjoying crystal clear waters, white sandy beaches, and a vibrant island lifestyle.',
      image: '/images/maldives (1).jpeg',
      stats: { positions: '20+', rating: '5★', team: '50+' },
      cta: 'View Maldives Jobs',
      link: '/jobs'
    },
    {
      id: 2,
      title: 'Crystal Clear Waters',
      subtitle: 'Marine Research Hub',
      description: 'Experience the breathtaking beauty of the Indian Ocean. Our Maldives facility offers unparalleled access to pristine marine environments for research and development.',
      image: '/images/maldives (2).jpeg',
      stats: { positions: '15+', rating: '4.9★', team: '35+' },
      cta: 'Explore Opportunities',
      link: '/jobs'
    },
    {
      id: 3,
      title: 'Tropical Living',
      subtitle: 'Work-Life Balance',
      description: 'Balance your career with paradise living. Enjoy world-class diving, vibrant marine life, and a warm community while advancing your career in marine technology.',
      image: '/images/maldives (3).jpeg',
      stats: { positions: '12+', rating: '4.8★', team: '40+' },
      cta: 'Join Our Team',
      link: '/about'
    },
    {
      id: 4,
      title: 'Global Tech Hub',
      subtitle: 'Innovation Center',
      description: 'Be part of our state-of-the-art marine technology center in the Maldives. Work alongside international experts on groundbreaking underwater robotics projects.',
      image: '/images/maldives (4).jpeg',
      stats: { positions: '18+', rating: '5★', team: '60+' },
      cta: 'View Tech Roles',
      link: '/jobs'
    },
    {
      id: 5,
      title: 'Career Growth',
      subtitle: 'Professional Development',
      description: 'Accelerate your career with our comprehensive training programs. The Maldives offers unique professional growth opportunities in the marine industry.',
      image: '/images/maldives (5).jpeg',
      stats: { positions: '25+', rating: '4.9★', team: '70+' },
      cta: 'Start Your Journey',
      link: '/register'
    },
    {
      id: 6,
      title: 'Ocean Conservation',
      subtitle: 'Sustainability Focus',
      description: 'Make a difference while building your career. Work on projects that protect marine life and preserve the beautiful coral reefs of the Maldives.',
      image: '/images/maldives (6).jpeg',
      stats: { positions: '10+', rating: '4.7★', team: '30+' },
      cta: 'Join Conservation',
      link: '/about'
    },
    {
      id: 7,
      title: 'Island Adventures',
      subtitle: 'Explore Maldives',
      description: 'Experience the beauty of the Maldives beyond work. Snorkeling, diving, island hopping, and cultural experiences await you.',
      image: '/images/maldives (7).jpeg',
      stats: { positions: '8+', rating: '4.9★', team: '25+' },
      cta: 'Explore Jobs',
      link: '/jobs'
    },
    {
      id: 8,
      title: 'Welcome Aboard',
      subtitle: 'Your Dream Job',
      description: 'Start your journey with us today. The Maldives is calling! Join our diverse team and build a career in paradise.',
      image: '/images/maldives (8).jpeg',
      stats: { positions: '30+', rating: '5★', team: '80+' },
      cta: 'Apply Now',
      link: '/register'
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentSlide];

  return (
    <section 
      className="relative w-full h-screen min-h-[620px] overflow-hidden pt-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ✅ Background Image with Parallax */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            {/* ✅ Premium Overlay - Darker on left side for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-950/20 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
            
            {/* ✅ Decorative Gradient Orbs */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ✅ Content - Full Screen */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full items-center">
          
          {/* ✅ Left - Image Card */}
          <motion.div
            key={`image-${currentSlide}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block order-1"
          >
            <div className="relative">
              {/* ✅ Main Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                
                {/* ✅ Floating Features */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: <Globe />, label: 'Global Team' },
                      { icon: <Award />, label: 'Top Employer' },
                      { icon: <Coffee />, label: 'Great Benefits' },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="text-center p-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10"
                      >
                        <span className="text-teal-400 inline-block">{item.icon}</span>
                        <p className="text-xs text-slate-300 mt-1">{item.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ✅ Floating Badge - Top Right */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.9, type: 'spring' }}
                className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-white" />
                  <span className="text-sm font-bold">Hiring Now!</span>
                </div>
              </motion.div>

              {/* ✅ Floating Badge - Bottom Left */}
              <motion.div
                initial={{ scale: 0, rotate: 5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1, type: 'spring' }}
                className="absolute -bottom-2 -left-4 bg-emerald-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-2xl shadow-xl border border-emerald-400/30"
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 fill-white" />
                  <span className="text-sm font-bold">Great Place to Work</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ✅ Right - Text Content */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-white order-2 lg:order-2"
          >
            {/* ✅ Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-teal-500/20 border border-teal-400/30 rounded-full backdrop-blur-sm"
            >
              <Plane className="h-4 w-4 text-teal-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                {current.subtitle}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            </motion.div>

            {/* ✅ Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">
                {current.title}
              </span>
            </motion.h1>

            {/* ✅ Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg text-slate-300 max-w-lg leading-relaxed"
            >
              {current.description}
            </motion.p>

            {/* ✅ Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-3 max-w-md"
            >
              {[
                { value: current.stats.positions, label: 'Open Positions', icon: <Briefcase /> },
                { value: current.stats.rating, label: 'Employee Rating', icon: <Star /> },
                { value: current.stats.team, label: 'Team Members', icon: <Users /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center p-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm"
                >
                  <p className="text-xl font-bold text-teal-400">{stat.value}</p>
                  <p className="text-xs text-slate-300">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* ✅ Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to={current.link}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-teal-500/30 transition-all"
              >
                <Briefcase className="h-5 w-5" />
                <span>{current.cta}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold rounded-2xl transition"
              >
                <Compass className="h-5 w-5" />
                Learn More
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ✅ Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 hover:border-white/40 transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-white hover:bg-black/60 hover:border-white/40 transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* ✅ Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-6 bg-teal-400' 
                : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* ✅ Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase opacity-50">
          Scroll to Explore
        </span>
        <div className="h-8 w-4 border-2 border-teal-400/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [4, 16, 4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1.5 rounded-full bg-teal-400 mt-1.5"
          />
        </div>
      </motion.div>

      {/* ✅ Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
};

export default MaldivesHero;