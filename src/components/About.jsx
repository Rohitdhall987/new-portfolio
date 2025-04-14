
import { useEffect, useRef } from 'react';
import anime from 'animejs';

function About() {
    const containerRef = useRef(null);

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

        // Timeline animation
        anime({
            targets: '.timeline-item',
            opacity: [0, 1],
            translateX: [-30, 0],
            delay: anime.stagger(200, { start: 500 }),
            easing: 'easeOutExpo',
            duration: 800
        });

        // Binary rain effect
        // const canvas = document.getElementById('binary-canvas');
        // const ctx = canvas.getContext('2d');
        //
        // canvas.width = canvas.parentElement.offsetWidth;
        // canvas.height = canvas.parentElement.offsetHeight;
        //
        // // const characters = '01';
        // const fontSize = 14;
        // const columns = canvas.width / fontSize;

        // const drops = Array.from({ length: columns }, () => 1);

        // const draw = () => {
        //     ctx.fillStyle = 'rgba(255,255,255,0)';
        //     ctx.fillRect(0, 0, canvas.width, canvas.height);
        //
        //     ctx.fillStyle = 'rgba(64,255,0,0.3)';
        //     ctx.font = `${fontSize}px monospace`;
        //
        //     for (let i = 0; i < drops.length; i++) {
        //         const text = characters.charAt(Math.floor(Math.random() * characters.length));
        //         ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        //
        //         if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        //             drops[i] = 0;
        //         }
        //
        //         drops[i]++;
        //     }
        // };

        // const intervalId = setInterval(draw, 33);

        // ✅ Cleanup
        // return () => {
        //     clearInterval(intervalId);
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
        <div ref={containerRef} className="section-container about-container">
            <canvas id="contact-circuit" className="contact-circuit"></canvas>

            <h2 className="section-title glitch-text" data-text="ABOUT ME">ABOUT ME</h2>

            <div className="about-content">
                <div className="about-text">
                    <p>I am a Full Stack Developer with hands-on experience in building responsive web and mobile
                        applications. I specialize in technologies like React, Node.js, Flutter, and Firebase, creating
                        fast, modern, and scalable solutions.</p>

                    <p>Coming from a non-traditional background and driven by curiosity and self-learning, I’m
                        passionate about crafting clean code and intuitive UIs. I enjoy combining development with
                        creative design and performance optimization.</p>

                    <p>In my free time, I explore music, gaming, and the latest trends in tech. I'm also interested in
                        building impactful projects and always looking for new challenges to grow as a developer.</p>
                </div>

                <div className="about-stats">
                    <div className="stat-item">
                        <div className="stat-value">2+</div>
                        <div className="stat-label">Years of Experience</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">10+</div>
                        <div className="stat-label">Projects Completed</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">5+</div>
                        <div className="stat-label">Happy Clients</div>
                    </div>
                </div>
            </div>

            <div className="timeline-section">
                <h3 className="timeline-title">PROFESSIONAL JOURNEY</h3>

                <div className="timeline">
                    <div className="timeline-item">
                        <div className="timeline-date">2023 - Present</div>
                        <div className="timeline-content">
                            <h4>Flutter Developer</h4>
                            <p>Zurik Technologies</p>
                            <p>Built modern Android applications using Flutter based on UI designs provided via
                                Figma.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-date">2022 - 2023</div>
                        <div className="timeline-content">
                            <h4>Freelance Developer</h4>
                            <p>Remote</p>
                            <p>Worked with local clients to deliver full-stack solutions using the MERN stack and
                                Firebase.</p>
                        </div>
                    </div>

                    <div className="timeline-item">
                        <div className="timeline-date">2021 - 2022</div>
                        <div className="timeline-content">
                            <h4>Self-Taught Learner</h4>
                            <p>Online & Projects</p>
                            <p>Started building real-world projects to strengthen skills in HTML, CSS, JavaScript, and
                                Git.</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .about-container {
          position: relative;
          padding-top: 100px;
        }
        
        .contact-circuit {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }
        
        .binary-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }
        
        .about-content {
          display: flex;
          gap: 50px;
          margin-top: 50px;
          margin-bottom: 70px;
        }
        
        .about-text {
          flex: 2;
          line-height: 1.8;
        }
        
        .about-text p {
          margin-bottom: 20px;
        }
        
        .about-stats {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .stat-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .stat-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
        }
        
        .stat-value {
          font-family: 'Rajdhani', sans-serif;
          font-size: 3rem;
          color: var(--accent);
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .timeline-section {
          margin-top: 50px;
        }
        
        .timeline-title {
          font-family: 'Rajdhani', sans-serif;
          font-size: 2rem;
          margin-bottom: 30px;
          position: relative;
          display: inline-block;
        }
        
        .timeline-title::after {
          content: "";
          position: absolute;
          width: 50%;
          height: 2px;
          background-color: var(--accent);
          bottom: -5px;
          left: 0;
        }
        
        .timeline {
          position: relative;
          padding-left: 30px;
          border-left: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .timeline-item {
          margin-bottom: 50px;
          position: relative;
        }
        
        .timeline-item::before {
          content: "";
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--accent);
          left: -36px;
          top: 5px;
        }
        
        .timeline-date {
          font-family: 'Space Mono', monospace;
          font-size: 0.9rem;
          color: var(--accent);
          margin-bottom: 10px;
        }
        
        .timeline-content h4 {
          font-family: 'Rajdhani', sans-serif;
          font-size: 1.2rem;
          margin-bottom: 5px;
        }
        
        .timeline-content p {
          margin-bottom: 5px;
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .about-content {
            flex-direction: column;
          }
          
          .about-stats {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          .stat-item {
            flex: 1;
            min-width: 120px;
          }
        }
      `}</style>
        </div>
    );
}

export default About;