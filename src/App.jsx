
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import anime from 'animejs';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Float, Stars } from '@react-three/drei';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

// function Model() {
//     return (
//         <Float
//             speed={1.75}
//             rotationIntensity={1}
//             floatIntensity={2}
//         >
//             <mesh>
//                 <torusKnotGeometry args={[1, 0.3, 128, 32]} />
//                 <meshStandardMaterial color="white" wireframe={true} />
//             </mesh>
//         </Float>
//     );
// }

function App() {
    const [loading, setLoading] = useState(true);
    const loadingRef = useRef(null);
    const navRef = useRef(null);

    useEffect(() => {
        // Loading animation
        const loadingAnimation = anime.timeline({
            easing: 'easeOutExpo',
            complete: () => setLoading(false)
        });

        loadingAnimation
            .add({
                targets: '.loading-text .letter',
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 1000,
                delay: (el, i) => 150 * (i + 1)
            })
            .add({
                targets: '.loading-bar',
                width: ['0%', '100%'],
                duration: 1200
            })
            .add({
                targets: '.loading-screen',
                opacity: [1, 0],
                duration: 800,
                easing: 'easeInOutExpo',
                delay: 200
            });

        // Nav animation
        const navTimeout = setTimeout(() => {
            anime({
                targets: '.nav-item',
                opacity: [0, 1],
                translateY: [-20, 0],
                delay: anime.stagger(100),
                easing: 'easeOutExpo'
            });
        }, 3000);

        // Cursor follower
        const cursor = document.querySelector('.cursor');
        const handleMouseMove = (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        };
        document.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
            clearTimeout(navTimeout);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);


    return (
        <Router>
            {loading && (
                <div ref={loadingRef} className="loading-screen">
                    <div className="loading-content">
                        <div className="loading-text">
                            {Array.from("LOADING").map((letter, index) => (
                                <span key={index} className="letter">{letter}</span>
                            ))}
                        </div>
                        <div className="loading-bar-container">
                            <div className="loading-bar"></div>
                        </div>
                    </div>
                </div>
            )}

            <div className="cursor"></div>
            <div className="grid-overlay"></div>

            {/*<div className="canvas-container">*/}
            {/*    <Canvas camera={{ position: [0, 0, 5] }}>*/}
            {/*        <ambientLight intensity={0.5} />*/}
            {/*        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />*/}
            {/*        <pointLight position={[-10, -10, -10]} />*/}
            {/*        <Stars radius={50} depth={50} count={1000} factor={4} fade />*/}
            {/*        /!*<Model />*!/*/}
            {/*        <OrbitControls enableZoom={false} autoRotate />*/}
            {/*    </Canvas>*/}
            {/*</div>*/}

            <header>
                <div className="logo">Portfolio</div>
                <nav ref={navRef}>
                    <NavLink to="/" className="nav-item" end>HOME</NavLink>
                    <NavLink to="/about" className="nav-item">ABOUT</NavLink>
                    <NavLink to="/projects" className="nav-item">PROJECTS</NavLink>
                    <NavLink to="/contact" className="nav-item">CONTACT</NavLink>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>

            <footer>
                <div className="footer-content">
                    <div className="footer-text">© 2025</div>
                    <div className="social-links">
                        <a href="https://github.com/Rohitdhall987" className="social-link">GH</a>
                        <a href="https://www.linkedin.com/in/rohitdhall987" className="social-link">LI</a>
                        <a href="https://x.com/RDhall" className="social-link">TW</a>
                    </div>
                </div>
            </footer>
        </Router>
    );
}

export default App;