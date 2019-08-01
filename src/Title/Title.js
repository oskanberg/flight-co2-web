
import React from 'react';
import { useTrail, animated } from 'react-spring';
import styled from 'styled-components';

const items = ['Check', 'your', 'flight', 'CO₂', '👇'];

const TitleContainer = styled.div`
    margin-bottom: 2rem;
    z-index: -1;
`;

const StyledTitle = styled.div`
    color: #e9784e;
    font-size: 3em;
    font-weight: 800;
    text-transform: uppercase;
    will-change: transform, opacity;
`;

const Title = ({ show }) => {
    const trail = useTrail(items.length, {
        config: { mass: 5, tension: 2000, friction: 200 },
        opacity: show ? 1 : 0,
        x: show ? 0 : 20,
        height: show ? 50 : 0,
        from: { opacity: 0, x: 20, height: 0},
    })

    return (
        <TitleContainer>
            <div>
                {trail.map(({ x, height, ...rest }, index) => (
                    <animated.div
                        key={items[index]}
                        className="trails-text"
                        style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
                        <animated.div style={{ height }}>
                            <StyledTitle>{items[index]}</StyledTitle>
                        </animated.div>
                    </animated.div>
                ))}
            </div>
        </TitleContainer>
    );
};

export default Title;