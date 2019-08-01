import React, { useState } from 'react';
import { usePlaneInfoAPI } from './hooks/flight';

import './App.css';
import styled from 'styled-components';

import Title from './Title';
import FlightNoInput from './FlightNoInput';
import Results from './Results';

const Container = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const App = () => {
  let [contented, setContented] = useState(false);
  let [{ data, isLoading, error }, setFlightNumber] = usePlaneInfoAPI();

  let showTitle = !isLoading && !contented;
  let showResults = !isLoading && !error && data;

  const onSearch = e => {
    setFlightNumber(e);
  };

  return (
    <Container>
      {error ? <p>{error.toString()}</p> : null}
      {showResults ? null : <Title show={showTitle}></Title>}
      {
        showResults ?
          <Results
            co2={data.CO2KG}
            fromCity={data.details.departureCity}
            toCity={data.details.arrivalCity}
          /> :
          <FlightNoInput
            loading={isLoading}
            onSearch={onSearch}
            hasContent={setContented} />
      }
    </Container>
  );
};

export default App;
