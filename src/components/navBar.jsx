import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const navRefs = useRef({});

    const tabs = ['home', 'about', 'services', 'contact'];

    useEffect(() => {
        const currentRef = navRefs.current[activeTab];
        if (currentRef) {
            const { offsetLeft, offsetWidth } = currentRef;
            setIndicatorStyle({
                transform: `translateX(${offsetLeft}px)`,
                width: `${offsetWidth}px`,
            });
        }
    }, [activeTab]);

    return (
        <NavbarContainer>
            <Nav>
                <BubbleIndicator style={indicatorStyle} />
                {tabs.map((tab) => (
                    <NavItem
                        key={tab}
                        ref={(el) => (navRefs.current[tab] = el)}
                        onClick={() => setActiveTab(tab)}
                        isActive={activeTab === tab}
                    >
                        {tab}
                    </NavItem>
                ))}
            </Nav>
        </NavbarContainer>
    );
};

export default Navbar;

// Styled Components

const NavbarContainer = styled.div`
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    padding: 8px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
`;

const Nav = styled.nav`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: space-around;
`;

const NavItem = styled.div`
    position: relative;
    padding: 10px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    z-index: 1;
    transition: color 0.3s ease;
    color: ${(props) => (props.isActive ? '#000' : '#555')};

    @media (max-width: 480px) {
        font-size: 14px;
        padding: 8px 12px;
    }
`;

const BubbleIndicator = styled.div`
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 30px;
    background: rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease, width 0.4s ease;
    z-index: 0;
`;
