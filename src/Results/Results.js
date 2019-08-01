import React from 'react';

import { animated, useSpring, config } from 'react-spring';
import styled from 'styled-components';

const Container = styled(animated.section)`
    border-radius: 5px;
    box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.25);
    will-change: width, height;
    padding: 2rem;
    max-width: 40rem;
`;

const Summary = styled.p`
    font-size: 1.2rem;
    color: white;
    width: 100%;
    text-align: center;
`;

const BarResults = styled.div`
    text-align: left;
    padding: 1rem;
`;

const BarTitle = styled.p`
    color: #222e35;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
`;

const Bar = styled.div`
    background: white;
    padding: 2px;
    font-size: 1rem;
    line-height: 1rem;
    border-radius: 3px;
`;

const BarText = styled.div`
    padding: 2px;
    font-size: 0.5rem;
    width: 100%;
    color: white;
`;

const ResultBar = ({ x, max, title }) => {
    return (
        <div>
            <BarTitle>{title}</BarTitle>
            <Bar style={{ width: `${(x / max) * 100.0}%` }}></Bar>
            <BarText>{x} tonnes</BarText>
        </div>
    )
};


const Details = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const City = styled.p`
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    margin: 0;
    color: white;
    background-color: rgba(255, 255, 255, 0.15);
    
    border-radius: 2rem;
`;

const PlaneIcon = styled.span`
    // font-size: 1.5rem;
`;

const Spacer = styled.div`
    background-color: rgba(255, 255, 255, 0.2);
    height: 3px;
    width: 5rem;
`;

const numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Result = ({ fromCity, toCity, co2 }) => {
    // multiply by avg # passengers
    const tonnes = co2 / 1000;
    // const ppc = Math.round(tonnes * 100 / 0.81);
    const kettles = Math.round(tonnes / 1.4e-5);

    const { size, opacity, ...rest } = useSpring({
        config: config.default,
        from: { size: '20%', background: 'lightblue' },
        to: { size: '75%', background: '#e9784e' }
    });

    return (
        <Container style={{ ...rest, width: size }}>
            <Details>
                <City>{fromCity}</City>
                {/* <PlaneIcon role="img" aria-label="departing plane"> 🛫 </PlaneIcon> */}
                <Spacer></Spacer>
                {/* <PlaneIcon role="img" aria-label="landing plane"> 🛬 </PlaneIcon> */}
                <City>{toCity}</City>
            </Details>
            <Summary>You emitted <strong>{co2}</strong> kilograms of CO₂.</Summary>
            {/* <Summary>That's <strong>{ppc}%</strong> the average Philipino uses in a whole year</Summary> */}
            <Summary>That's enough to boil <strong>{numberWithCommas(kettles)}</strong> full kettles.</Summary>
            <BarResults>
                <ResultBar title={"This flight"} x={tonnes} max={8.4}></ResultBar>
                <ResultBar title={"Yearly allowance to keep temperature rise @ 1c"} x={4} max={8.4}></ResultBar>
                <ResultBar title={"The yearly emissions of someone living in the EU"} x={8.4} max={8.4}></ResultBar>
            </BarResults>
        </Container>
    );
};

export default Result;