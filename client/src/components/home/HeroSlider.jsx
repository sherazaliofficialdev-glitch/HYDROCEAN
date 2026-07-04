import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Calendar, Users, Award, Headphones,
  ChevronLeft, ChevronRight, PlayCircle, Compass, Ship, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    
    const numericValue = parseInt(value.replace(/\D/g, ''));
    const isPlus = value.includes('+');
    const increment = numericValue / (duration * 60);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  const displayValue = value.includes('/') ? value : 
                       value.includes('+') ? `${count}+` : count;
  
  return <span ref={ref}>{displayValue}</span>;
};

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayInterval = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const heroSlides = [
    {
      id: 1,
      title: "Unmanned Surface Vehicle (USV)",
      subtitle: "Autonomous Surface Vessel",
      description: "State-of-the-art autonomous surface vessels engineered for marine operations, high-resolution ocean monitoring, tactical surveillance, and real-time remote data collection.",
      button1Text: "Explore USV",
      button2Text: "View Jobs",
      image: "/images/image (7).jpeg",
      ctaLink: "/about"
    },
    {
      id: 2,
      title: "Autonomous Underwater Vehicle (AUV)",
      subtitle: "Deep-Sea Robotic Exploration",
      description: "Advanced subsea robotic systems operating entirely underwater for scientific ocean research, industrial infrastructure inspection, bathymetric mapping, and deep-sea exploration.",
      button1Text: "Explore AUV",
      button2Text: "Our Technology",
      image: "/images/image (1).jpeg",
      ctaLink: "/about"
    },
    {
      id: 3,
      title: "Mission & Technology",
      subtitle: "Autonomous Navigation Control",
      description: "Empowering deep ocean research missions using AI-driven navigation filters, acoustic telemetry arrays, high-definition camera suites, and long-endurance power management.",
      button1Text: "Our Technology",
      button2Text: "View Jobs",
      image: "/images/image (8).jpeg",
      ctaLink: "/about"
    },
    {
      id: 4,
      title: "Multi-Mission Applications",
      subtitle: "Versatile Maritime Domains",
      description: "Supporting defense security, oceanographic research, offshore pipeline inspection, port security, and deep sea search & rescue operations.",
      button1Text: "View Applications",
      button2Text: "Contact Us",
      image: "/images/image (9).jpeg",
      ctaLink: "/jobs"
    },
    {
      id: 5,
      title: "Future Marine Technology",
      subtitle: "Next-Gen Ocean Digitalization",
      description: "Shaping the next century of autonomous maritime science through integrated Artificial Intelligence, robotic fleet synchronization, cognitive navigation, and smart marine solutions.",
      button1Text: "Join Us",
      button2Text: "Learn More",
      image: "/images/image (6).jpeg",
      ctaLink: "/jobs"
    }
  ];

  const stats = [
    {
      id: 1,
      value: "15+",
      label: "Years Experience",
      icon: <Calendar className="w-5 h-5" />,
      delay: 0.1
    },
    {
      id: 2,
      value: "60+",
      label: "Expert Team Members",
      icon: <Users className="w-5 h-5" />,
      delay: 0.2
    },
    {
      id: 3,
      value: "50+",
      label: "Global Projects",
      icon: <Globe className="w-5 h-5" />,
      delay: 0.3
    },
    {
      id: 4,
      value: "24/7",
      label: "Support",
      icon: <Headphones className="w-5 h-5" />,
      delay: 0.4
    }
  ];

  useEffect(() => {
    const startAutoPlay = () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = setInterval(() => {
        if (isAutoPlaying && !isHovered) {
          setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }
      }, 6000);
    };
    
    startAutoPlay();
    
    return () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    };
  }, [isAutoPlaying, isHovered]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    setIsAutoPlaying(true);
    setTimeout(() => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
      autoPlayInterval.current = setInterval(() => {
        if (isAutoPlaying && !isHovered) {
          setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }
      }, 6000);
    }, 100);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <section 
      className="relative h-screen min-h-[620px] w-full overflow-hidden pt-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
  src={heroSlides[activeSlide].image}
  alt="Background"
  className="absolute inset-0 w-full h-full object-cover"
/>
            {/* Gradient Overlay - Dark Premium */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-900/30 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-slate-950/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/20 backdrop-blur-sm border border-primary-500/40"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Compass className="w-4 h-4 text-primary-400" />
                  </motion.div>
                  <span className="text-sm font-medium text-primary-300">
                    {heroSlides[activeSlide].subtitle}
                  </span>
                </motion.div>

                {/* Title */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
                  {heroSlides[activeSlide].title}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-white leading-relaxed max-w-2xl font-light">
                  {heroSlides[activeSlide].description}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to={heroSlides[activeSlide].ctaLink}
                    className="group px-8 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg hover:shadow-primary-500/30 transition-all flex items-center gap-2 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {heroSlides[activeSlide].button1Text}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </Link>

                  <Link
                    to="/jobs"
                    className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl backdrop-blur-sm transition-all hover:border-primary-400/50"
                  >
                    {heroSlides[activeSlide].button2Text}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: stat.delay + 0.5, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0, 156, 166, 0.3)"
                  }}
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-primary-500/30 rounded-2xl p-4 text-center group cursor-pointer relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-teal-500/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-2">
                      <div className="p-2 rounded-xl bg-primary-500/20 text-primary-400">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-primary-400">
                      <AnimatedCounter value={stat.value} duration={2.5} />
                    </div>
                    <div className="text-xs text-slate-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Floating Cards */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="relative"
            >
              {/* Main Card */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotateZ: [0, 0.5, 0, -0.5, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-primary-500/40 rounded-3xl p-2 overflow-hidden shadow-2xl"
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  animate={{
                    background: [
                      "linear-gradient(0deg, rgba(0, 156, 166, 0.3), transparent)",
                      "linear-gradient(90deg, rgba(0, 156, 166, 0.3), transparent)",
                      "linear-gradient(180deg, rgba(0, 156, 166, 0.3), transparent)",
                      "linear-gradient(270deg, rgba(0, 156, 166, 0.3), transparent)",
                      "linear-gradient(360deg, rgba(0, 156, 166, 0.3), transparent)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <div className="relative h-80 rounded-2xl overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={heroSlides[activeSlide].image}
                    alt="Marine Technology Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <motion.button
                    onClick={toggleAutoPlay}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(0, 156, 166, 0.3)",
                        "0 0 40px rgba(0, 156, 166, 0.6)",
                        "0 0 20px rgba(0, 156, 166, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary-500/30 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-primary-500/50 cursor-pointer group"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {isAutoPlaying ? (
                        <PlayCircle className="w-10 h-10 text-white drop-shadow-lg group-hover:text-primary-300 transition" />
                      ) : (
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-6 bg-white rounded-full" />
                          <div className="w-1.5 h-6 bg-white rounded-full" />
                        </div>
                      )}
                    </motion.div>
                  </motion.button>
                </div>

                {/* Floating Badge - Top Left */}
                <motion.div
                  initial={{ x: -20, opacity: 0, rotate: -5 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 3,
                    boxShadow: "0 10px 30px rgba(0, 156, 166, 0.5)"
                  }}
                  className="absolute -left-6 top-12 bg-gradient-to-r from-primary-600 to-teal-500 p-4 rounded-2xl shadow-2xl cursor-pointer"
                >
                  <div className="text-white text-sm font-bold">AI Powered</div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>

                {/* Floating Badge - Bottom Right */}
                <motion.div
                  initial={{ x: 20, opacity: 0, rotate: 5 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1.3, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: -3,
                    boxShadow: "0 10px 30px rgba(0, 156, 166, 0.5)"
                  }}
                  className="absolute -right-6 bottom-12 bg-gradient-to-r from-teal-500 to-primary-600 p-4 rounded-2xl shadow-2xl cursor-pointer"
                >
                  <div className="text-white text-sm font-bold">Deep Sea Tech</div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  />
                </motion.div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-primary-400 rounded-full"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4">
        <motion.button 
          onClick={prevSlide}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 156, 166, 0.3)" }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-primary-500/20 backdrop-blur-md border-2 border-primary-500/40 flex items-center justify-center shadow-lg hover:bg-primary-500/40 transition"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </motion.button>
        
        {/* Dot Indicators */}
        <div className="flex space-x-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setActiveSlide(index);
                resetAutoPlay();
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: activeSlide === index ? 32 : 10,
                backgroundColor: activeSlide === index 
                  ? "rgba(0, 156, 166, 1)" 
                  : "rgba(255, 255, 255, 0.3)"
              }}
              className="h-2.5 rounded-full transition-all duration-300"
            />
          ))}
        </div>

        <motion.button 
          onClick={nextSlide}
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 156, 166, 0.3)" }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-primary-500/20 backdrop-blur-md border-2 border-primary-500/40 flex items-center justify-center shadow-lg hover:bg-primary-500/40 transition"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Auto-play Toggle */}
      <motion.button
        onClick={toggleAutoPlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-12 right-8 z-20 p-2.5 rounded-full bg-primary-500/20 backdrop-blur-sm border border-primary-500/40 hover:bg-primary-500/30 transition"
      >
        {isAutoPlaying ? (
          <PlayCircle className="w-5 h-5 text-primary-300" />
        ) : (
          <div className="flex items-center space-x-0.5">
            <div className="w-1 h-4 bg-primary-300 rounded-full" />
            <div className="w-1 h-4 bg-primary-300 rounded-full" />
          </div>
        )}
      </motion.button>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-[8px] font-mono tracking-widest text-slate-400 uppercase opacity-50">
          Scroll Down
        </span>
        <div className="h-8 w-4 border-2 border-primary-400/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [4, 16, 4] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1.5 rounded-full bg-primary-400 mt-1.5"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSlider;