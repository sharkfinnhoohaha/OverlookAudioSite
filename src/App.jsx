import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X, Activity, PlayCircle, Layers } from 'lucide-react';
import { useTina } from "tinacms/dist/react";

const InteractiveSoundwave = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    setSize();
    window.addEventListener('resize', setSize);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;
      const lines = 7;
      const centerLine = Math.floor(lines / 2);

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const distanceX = Math.abs(x - mX);
          const influence = Math.max(0, 1 - distanceX / (width * 0.4));
          const easeInfluence = Math.pow(influence, 2);
          const baseAmp = 10 + Math.abs(i - centerLine) * 5;
          const dynamicAmp = baseAmp + (easeInfluence * ((height - mY) * 0.3));
          const phase = i * 0.2;
          const freq = 0.003 + (easeInfluence * 0.002);
          const y = (height / 2) + Math.sin(x * freq + time + phase) * dynamicAmp;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const baseOpacity = i === centerLine ? 0.8 : 0.2 - Math.abs(i - centerLine) * 0.04;
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        
        for (let step = 0; step <= 1; step += 0.1) {
          const glimmer = Math.pow(Math.sin(step * 10 - time * 1.5 + i * 0.3), 8);
          const r = Math.floor(14 + (251 - 14) * glimmer);
          const g = Math.floor(165 + (146 - 165) * glimmer);
          const b = Math.floor(233 + (60 - 233) * glimmer);
          const stopOpacity = Math.min(1, baseOpacity + (glimmer * 0.3));
          gradient.addColorStop(step, `rgba(${r}, ${g}, ${b}, ${stopOpacity})`);
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = i === centerLine ? 2 : 1;
        ctx.stroke();
      }

      time += 0.03;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-60 mix-blend-screen" />;
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    if (domRef.current) observer.observe(domRef.current);
    return () => { if (domRef.current) observer.unobserve(domRef.current); };
  }, []);

  return (
    <div ref={domRef} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default function App(props) {
  const [navOpen, setNavOpen] = useState(false);

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data?.page || {};

  // Helper to map icons to capability items
  const getIcon = (index) => {
    const icons = [<Activity size={32} strokeWidth={1} />, <Layers size={32} strokeWidth={1} />, <PlayCircle size={32} strokeWidth={1} />];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-neutral-800 selection:text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 text-white font-medium tracking-tight text-lg">
          <Activity size={20} className="text-white" />
          <span>OVERLOOK AUDIO</span>
        </div>
        <button onClick={() => setNavOpen(!navOpen)} className="text-white hover:opacity-70 transition-opacity">
          {navOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <div className={`fixed inset-0 bg-neutral-900/95 backdrop-blur-xl z-40 transition-transform duration-700 ease-[0.16,1,0.3,1] ${navOpen ? 'translate-y-0' : '-translate-y-full'} flex items-center justify-center`}>
        <div className="flex flex-col text-center space-y-8 text-4xl md:text-6xl font-light tracking-tighter">
          <a href="#philosophy" onClick={() => setNavOpen(false)} className="hover:text-white text-neutral-400 transition-colors">Philosophy</a>
          <a href="#capabilities" onClick={() => setNavOpen(false)} className="hover:text-white text-neutral-400 transition-colors">Capabilities</a>
          <a href="#work" onClick={() => setNavOpen(false)} className="hover:text-white text-neutral-400 transition-colors">Selected Work</a>
          <a href="#contact" onClick={() => setNavOpen(false)} className="hover:text-white text-neutral-400 transition-colors">Contact</a>
        </div>
      </div>

      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <InteractiveSoundwave />
        <div className="relative z-10 text-center px-4 mt-20 md:mt-0 pointer-events-none">
          <FadeIn>
            <h1 
               className="text-5xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-white mb-6"
               dangerouslySetInnerHTML={{ __html: page.heroHeadline || "Architecting <br /> Sound." }}
            />
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-lg md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto tracking-tight">
              {page.heroSubheadline}
            </p>
          </FadeIn>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-neutral-500 animate-pulse text-xs tracking-widest uppercase pointer-events-none">Scroll to explore</div>
      </section>

      <section id="philosophy" className="py-32 px-6 md:px-12 lg:px-24 bg-black border-t border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tighter leading-[1.1] text-white">
              {page.philosophyMain} 
              <span className="text-neutral-600"> {page.philosophyAccent}</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-32">
            <FadeIn delay={100}>
              <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800 pb-4">The Approach</h3>
              <p className="text-lg text-neutral-400 font-light leading-relaxed">{page.approachText}</p>
            </FadeIn>
            <FadeIn delay={300}>
              <h3 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 border-b border-neutral-800 pb-4">The Execution</h3>
              <p className="text-lg text-neutral-400 font-light leading-relaxed">{page.executionText}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-32 bg-black border-t border-neutral-900">
        <div className="px-6 md:px-12 lg:px-24 mb-16"><FadeIn><h2 className="text-4xl md:text-6xl tracking-tighter text-white font-medium">Capabilities</h2></FadeIn></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-neutral-900 border-y border-neutral-900">
          {page.capabilities?.map((item, i) => (
            <div key={i} className="bg-black p-12 md:p-16 lg:p-20 group hover:bg-neutral-950 transition-colors">
              <FadeIn delay={i * 150}>
                <div className="text-neutral-500 mb-8 group-hover:text-white transition-colors">{getIcon(i)}</div>
                <h3 className="text-2xl font-medium tracking-tight text-white mb-4">{item.title}</h3>
                <p className="text-neutral-500 font-light leading-relaxed">{item.description}</p>
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      <footer id="contact" className="bg-black pt-32 pb-12 px-6 md:px-12 lg:px-24 border-t border-neutral-900 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-8">Let's <br/> resonate.</h2>
            <a href={`mailto:${page.contactEmail}`} className="inline-flex items-center gap-2 text-xl text-neutral-400 hover:text-white border-b border-neutral-800 hover:border-white pb-2 transition-all">
              {page.contactEmail} <ArrowUpRight size={20} />
            </a>
          </FadeIn>
          <FadeIn delay={200} className="flex flex-col md:items-end justify-end space-y-4 text-neutral-500 font-light tracking-tight">
            <a href={page.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href={page.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </FadeIn>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase text-neutral-700 font-light pt-8 border-t border-neutral-900">
          <span>&copy; {new Date().getFullYear()} Overlook Audio</span>
          <span className="mt-4 md:mt-0 flex items-center gap-2"><Activity size={14} /> Los Angeles, CA</span>
        </div>
      </footer>
    </div>
  );
}