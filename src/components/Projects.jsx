
import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const projectsData = [
    {
        id: 1,
        title: "Neon City",
        description: "A futuristic e-commerce platform with AR product visualization",
        image: "/api/placeholder/500/300",
        tech: ["React", "Three.js", "Node.js", "MongoDB"],
        link: "#"
    },
    {
        id: 2,
        title: "Cyber Dashboard",
        description: "Real-time data visualization with interactive 3D charts",
        image: "/api/placeholder/500/300",
        tech: ["React", "D3.js", "WebSockets", "Firebase"],
        link: "#"
    },
    {
        id: 3,
        title: "Tokyo Pulse",
        description: "Mobile app for exploring Tokyo through an augmented reality lens",
        image: "/api/placeholder/500/300",
        tech: ["Flutter", "ARCore", "Firebase", "Google Maps API"],
        link: "#"
    },
    {
        id: 4,
        title: "Neural Canvas",
        description: "AI-powered digital art generator with style transfer capabilities",
        image: "/api/placeholder/500/300",
        tech: ["React", "TensorFlow.js", "Node.js", "WebGL"],
        link: "#"
    }
];

function Projects() {
    const containerRef = useRef(null);
    const [activeProject, setActiveProject] = useState(null);

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

        // Project cards staggered animation
        anime({
            targets: '.project-card',
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.9, 1],
            delay: anime.stagger(150, {start: 500}),
            easing: 'easeOutExpo',
            duration: 800
        });

        // 3D tilt effect for project cards
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const angleX = (y - centerY) / 10;
                const angleY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;

                // Glow effect
                const glowX = (x / rect.width) * 100;
                const glowY = (y / rect.height) * 100;
                card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(64, 177, 0, 0.3), transparent 40%)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.background = 'rgba(0,0,0,0.05)';
            });
        });

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

    const handleCardClick = (id) => {
        setActiveProject(activeProject === id ? null : id);
    };

    return (
        <div ref={containerRef} className="section-container projects-container">
            <canvas id="contact-circuit" className="contact-circuit"></canvas>
            <h2 className="section-title glitch-text" data-text="PROJECTS">PROJECTS</h2>

            <div className="projects-grid">
                {projectsData.map(project => (
                    <div
                        key={project.id}
                        className={`project-card ${activeProject === project.id ? 'active' : ''}`}
                        onClick={() => handleCardClick(project.id)}
                    >
                        <div className="project-image" style={{backgroundImage: `url(${project.image})`}}>
                            <div className="project-overlay"></div>
                        </div>

                        <div className="project-content">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>

                            <div className="project-tech">
                                {project.tech.map((tech, index) => (
                                    <span key={index} className="tech-tag">{tech}</span>
                                ))}
                            </div>

                            <a href={project.link} className="project-link cyber-button">View Project</a>
                        </div>

                        <div className="project-glitch-lines"></div>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .project-content {
                    padding: 20px;
                    transition: transform 0.3s ease;
                    flex: 1;
                }

                .contact-circuit {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                }

                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 30px;
                    margin-top: 50px;
                }

                .project-card {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    position: relative;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    transform-style: preserve-3d;
                    display: flex;
                    flex-direction: column;
                    height: auto;
                }



                .project-image {
                    height: 200px;
                    background-size: cover;
                    background-position: center;
                    position: relative;
                    flex-shrink: 0;
                }


                .project-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%);
                }

                .project-content {
                    padding: 20px;
                    transition: transform 0.3s ease;
                }

                .project-title {
                    font-family: 'Rajdhani', sans-serif;
                    font-size: 1.5rem;
                    margin-bottom: 10px;
                    position: relative;
                }

                .project-title::after {
                    content: "";
                    position: absolute;
                    width: 30px;
                    height: 2px;
                    background-color: var(--accent);
                    bottom: -5px;
                    left: 0;
                    transition: width 0.3s ease;
                }

                .project-card:hover .project-title::after {
                    width: 50px;
                }

                .project-description {
                    font-size: 0.9rem;
                    margin-bottom: 15px;
                    line-height: 1.6;
                    opacity: 0.8; 
                }
                


                .project-tech {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 20px;
                }

                .tech-tag {
                    font-size: 0.7rem;
                    padding: 3px 8px;
                    background: rgba(64, 177, 0, 0.2);
                    border-radius: 2px;
                }

                .project-link {
                    font-size: 0.8rem;
                    padding: 8px 15px;
                    display: inline-block;
                }

                .project-glitch-lines {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: repeating-linear-gradient(
                            to bottom,
                            transparent,
                            transparent 2px,
                            rgba(64, 177, 0, 0.05) 2px,
                            rgba(64, 177, 0, 0.05) 4px
                    );
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .project-card:hover .project-glitch-lines {
                    opacity: 1;
                    animation: glitch-lines 1s infinite linear;
                }

                @keyframes glitch-lines {
                    0% {
                        background-position: 0 0;
                    }
                    100% {
                        background-position: 0 30px;
                    }
                }

                .project-card.active {
                    transform: scale(1.05);
                    z-index: 10;
                    box-shadow: 0 0 30px rgba(64, 177, 0, 0.3);
                }

                .project-card.active .project-content {
                    transform: translateY(-20px);
                }

                @media (max-width: 768px) {
                    .projects-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}

export default Projects;