import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import './cursorEffect.css';

const CursorEffect = () => {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;

        const moveCursor = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2,
                ease: 'power3.out',
            });
        };

        window.addEventListener('mousemove', moveCursor);
    }, []);


    return <div className="custom-cursor" ref={cursorRef}></div>;
};

export default CursorEffect;
