
import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Link } from 'react-router-dom';

function Home() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        // Animate section container
        anime({
            targets: containerRef.current,
            opacity: [0, 1],
            translateY: [30, 0],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: 300
        });

        // Title glitch effect
        const glitchTexts = document.querySelectorAll('.glitch-text');
        glitchTexts.forEach(text => {
            text.setAttribute('data-text', text.textContent);
        });

        // Split text animation
        const text = titleRef.current;
        text.innerHTML = text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline()
            .add({
                targets: '.hero-title .letter',
                translateY: [100, 0],
                translateZ: 0,
                opacity: [0, 1],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 300 + 30 * i
            });

        // Digital noise effect
        // const canvas = document.getElementById('noise');
        // const ctx = canvas.getContext('2d');
        //
        // const resize = () => {
        //     canvas.width = window.innerWidth;
        //     canvas.height = window.innerHeight;
        // };
        //
        // resize();
        // window.addEventListener('resize', resize);
        //
        // const noise = () => {
        //     const imgData = ctx.createImageData(canvas.width, canvas.height);
        //     const data = imgData.data;
        //
        //     for (let i = 0; i < data.length; i += 4) {
        //         const value = Math.random() * 255;
        //         data[i] = value;
        //         data[i + 1] = value;
        //         data[i + 2] = value;
        //         data[i + 3] = Math.random() * 10;
        //     }
        //
        //     ctx.putImageData(imgData, 0, 0);
        // };
        //
        // const intervalId = setInterval(noise, 100);
        //
        // // ✅ Cleanup
        // return () => {
        //     clearInterval(intervalId);
        //     window.removeEventListener('resize', resize);
        // };

        // Circuit animation
        const canvas = document.getElementById('contact-circuit');
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;

        const particles = [];

        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw particles
            particles.forEach(particle => {
                ctx.fillStyle = 'rgba(64, 177, 0, 0.5)';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Boundary check
                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            });

            // Connect particles with lines
            particles.forEach((particleA, indexA) => {
                particles.slice(indexA + 1).forEach(particleB => {
                    const dx = particleA.x - particleB.x;
                    const dy = particleA.y - particleB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(64, 177, 0, ${0.1 - distance / 1000})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particleA.x, particleA.y);
                        ctx.lineTo(particleB.x, particleB.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }, []);




    return (
        <div ref={containerRef} className="section-container home-container">
            <canvas id="contact-circuit" className="contact-circuit"></canvas>

            <div className="hero-content">
                <h1 ref={titleRef} className="hero-title glitch-text" data-text="I BUILD FUTURE">
                    I BUILD FUTURE
                </h1>
                <div className="hero-subtitle">
                    <span className="line"></span>
                    <p className="typing-text">Full stack developer // React + Node.js + Flutter</p>
                </div>

                <div className="hero-description">
                    <p>Hi! I'm a passionate developer turning ideas into scalable digital experiences.</p>
                    <p>Specializing in modern UI/UX, futuristic tech, and fast, responsive apps.</p>
                </div>

                <div className="cta-container">
                    <Link to="/projects" className="cyber-button">View Projects</Link>
                    <Link to="/contact" className="cyber-button">Hire Me</Link>
                </div>
            </div>
            <h2>SKILLS</h2>
            <div className="tech-badges">
                {[
                    "HTML", "CSS", "JavaScript","C++", "Python", "React", "Node.js","Tailwind CSS",  "Flutter", "Firebase",
                     "Express",
                      "MongoDB", "Sql",
                    "Postman", "Git", "GitHub", "AWS",
                ].map((skill, i) => (
                    <div className="badge" key={i}>{skill}</div>
                ))}
            </div>

            <style >{`
        .home-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 80vh;
          position: relative;
        }
        
        .contact-circuit {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }
        
        .noise-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.05;
          pointer-events: none;
          z-index: -1;
        }
        
        .hero-content {
          margin-bottom: 20px;
        }
        
        .hero-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 5rem;
          font-weight: 700;
          letter-spacing: 5px;
          margin-bottom: 20px;
          line-height: 1;
        }
        
        .hero-subtitle {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
          overflow: hidden;
        }
        
        .line {
          width: 50px;
          height: 1px;
          background-color: var(--accent);
          margin-right: 15px;
        }
        
        .typing-text {
          font-size: 1.2rem;
          letter-spacing: 2px;
          color: var(--accent);
          border-right: 2px solid var(--accent);
          padding-right: 5px;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
          white-space: nowrap;
          overflow: hidden;
        }
        
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: var(--accent) }
        }
        
        .hero-description {
          max-width: 600px;
          margin-bottom: 40px;
          line-height: 1.6;
        }
        
        .cta-container {
          display: flex;
          gap: 20px;
          margin-bottom: 50px;
        }
        
        .tech-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .badge {
          padding: 5px 15px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          font-size: 0.8rem;
          letter-spacing: 1px;
          position: relative;
          overflow: hidden;
        }
        
        .badge::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background-color: var(--accent);
          opacity: 0.2;
          transition: left 0.3s ease;
        }
        
        .badge:hover::before {
          left: 0;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 3rem;
          }
          
          .typing-text {
            font-size: 1rem;
          }
          
          .cta-container {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
        </div>
    );
}

export default Home;