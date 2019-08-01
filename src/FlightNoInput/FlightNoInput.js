import React from 'react';

import styled from 'styled-components';
import { GoSearch } from 'react-icons/go';
import { useSpring, animated } from 'react-spring';

const InputContainer = styled(animated.form)`
    background: white;
    border-radius: 3rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    color: rgba(255, 255, 255, );
    ${props => `color: rgba(255, 255, 255, ${props.setOpacity});`}
`;

const StyledFlightNoInput = styled(animated.input)`
    color: #58b7dd;
    text-align: center;
    border-radius: 1em;
    border: none;
    font-size: 1em;
    font-weight: 500;
    line-height: 2rem;
`;

const SearchButton = styled.button`
    background: #58b7dd;
    border-radius: 50%;
    height: 3rem;
    width: 3rem;

    border: 3px solid white;
    outline: none;
    cursor: pointer;
    color: white;

    font-size: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Loading = styled.div`
    margin: 0 auto;
    height: 1rem;
    width: 1rem;
    animation: rotate 0.8s infinite linear;
    border: 2px solid #fff;
    border-right-color: transparent;
    border-radius: 50%;
    @keyframes rotate {
        0%    { transform: rotate(0deg); }
        100%  { transform: rotate(360deg); }
    }
`;

const FlightNoInput = ({ loading, onSearch, hasContent }) => {
    const { width } = useSpring({
        width: loading ? "0" : "80%",
        from: { width: "80%" }
    });

    const { opacity } = useSpring({
        opacity: loading ? 0 : 1,
        from: { opacity: 1 }
    })

    return (
        <InputContainer
            style={{
                // width,
                background: opacity.interpolate(o => `rgba(255,255,255,${o})`),
            }}
            onSubmit={e => {
                e.preventDefault();
                let [input] = e.target.children;
                onSearch(input.value);
            }}>
            <StyledFlightNoInput
                onChange={e => hasContent(e.target.value.length > 0)}
                style={{
                    width,
                    background: opacity.interpolate(o => `rgba(255,255,255,${o})`),
                }}
                placeholder="flight number e.g. FR-104"
            />
            <SearchButton>
                {
                    loading ? <Loading /> : <GoSearch />
                }
            </SearchButton>
        </InputContainer>
    );
};

export default FlightNoInput;