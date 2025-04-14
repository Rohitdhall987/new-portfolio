
import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

function Contact() {
    const containerRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        // Form fields animation
        anime({
            targets: '.form-group',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100, {start: 500}),
            easing: 'easeOutExpo',
            duration: 800
        });

        // Terminal effect for contact form
        const createTerminalEffect = () => {
            const terminal = document.querySelector('.terminal-header');

            let text = '> Initializing contact protocol...';
            let index = 0;

            const typing = setInterval(() => {
                terminal.textContent = text.substring(0, index);

                if (index > text.length) {
                    clearInterval(typing);
                    terminal.textContent = text;
                }

                index++;
            }, 50);
        };

        createTerminalEffect();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setFormData({ name: '', email: '', message: '' });

            // Success message animation
            anime({
                targets: '.success-message',
                opacity: [0, 1],
                translateY: [20, 0],
                easing: 'easeOutExpo',
                duration: 800
            });

            // Hide success message after 3 seconds
            setTimeout(() => {
                anime({
                    targets: '.success-message',
                    opacity: [1, 0],
                    easing: 'easeOutExpo',
                    duration: 800
                });
            }, 3000);
        }, 1500);
    };

    return (
        <div ref={containerRef} className="section-container contact-container">
            <canvas id="contact-circuit" className="contact-circuit"></canvas>

            <h2 className="section-title glitch-text" data-text="CONTACT">CONTACT</h2>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-item">
                        <div className="info-label">// Location</div>
                        <div className="info-value">Karnal, Haryana</div>
                    </div>

                    <div className="info-item">
                        <div className="info-label">// Email</div>
                        <div className="info-value">rohitdhall987@gmail.com</div>
                    </div>

                    <div className="info-item">
                        <div className="info-label">// Connect</div>
                        <div className="social-links">
                            <a href="https://github.com/Rohitdhall987" className="social-link">GitHub</a>
                            <a href="https://www.linkedin.com/in/rohitdhall987" className="social-link">LinkedIn</a>
                            <a href="https://x.com/RDhall" className="social-link">Twitter</a>
                        </div>
                    </div>

                    <div className="info-item terminal">
                        <div className="terminal-header"></div>
                        <div className="terminal-body">
                            <div className="terminal-line">$ cd contact_form</div>
                            <div className="terminal-line">$ npm start</div>
                            <div className="terminal-line">Server running on port 3000...</div>
                            <div className="terminal-line">Ready to receive messages</div>
                            <div className="terminal-line blink">_</div>
                        </div>
                    </div>
                </div>

                <div className="contact-form-container">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">_name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">_email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">_message:</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="cyber-button send-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                        </button>

                        <div className="success-message">Message sent successfully!</div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .contact-container {
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

                .contact-content {
                    display: flex;
                    gap: 50px;
                    margin-top: 50px;
                }

                .contact-info {
                    flex: 1;
                }

                .info-item {
                    margin-bottom: 30px;
                }

                .info-label {
                    font-family: 'Space Mono', monospace;
                    font-size: 0.9rem;
                    color: var(--accent);
                    margin-bottom: 5px;
                }

                .info-value {
                    font-size: 1.1rem;
                }

                .social-links {
                    display: flex;
                    gap: 15px;
                }

                .social-link {
                    color: var(--primary);
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .social-link:hover {
                    color: var(--accent);
                }

                .terminal {
                    background-color: rgba(255, 255, 255, 0.5);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    margin-top: 50px;
                }

                .terminal-header {
                    padding: 10px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    font-family: 'Space Mono', monospace;
                    font-size: 0.8rem;
                    color: var(--accent);
                }

                .terminal-body {
                    padding: 15px;
                    font-family: 'Space Mono', monospace;
                    font-size: 0.8rem;
                }

                .terminal-line {
                    margin-bottom: 8px;
                }

                .blink {
                    animation: blink 1s step-end infinite;
                }

                @keyframes blink {
                    50% {
                        opacity: 0;
                    }
                }

                .contact-form-container {
                    flex: 1;
                }

                .contact-form {
                    background: rgba(255, 255, 255, 0.3);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    position: relative;
                }

                .contact-form::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: repeating-linear-gradient(
                            0deg,
                            transparent,
                            transparent 2px,
                            rgba(0, 240, 255, 0.03) 2px,
                            rgba(0, 240, 255, 0.03) 4px
                    );
                    pointer-events: none;
                }

                .form-group {
                    margin-bottom: 25px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-family: 'Space Mono', monospace;
                    font-size: 0.9rem;
                    color: var(--accent);
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    background-color: rgba(255, 255, 255, 0.5);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    color: var(--primary);
                    padding: 10px;
                    font-family: 'Space Mono', monospace;
                    font-size: 0.9rem;
                    transition: border-color 0.3s ease;
                }

                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: var(--accent);
                }

                .send-btn {
                    width: 100%;
                    margin-top: 10px;
                }

                .success-message {
                    margin-top: 15px;
                    padding: 10px;
                    background-color: rgba(0, 240, 255, 0.1);
                    border-left: 3px solid var(--accent);
                    color: var(--accent);
                    opacity: 0;
                }

                @media (max-width: 768px) {
                    .contact-content {
                        flex-direction: column;
                    }

                    .contact-info {
                        order: 2;
                    }

                    .contact-form-container {
                        order: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default Contact;