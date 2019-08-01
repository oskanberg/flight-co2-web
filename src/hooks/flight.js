import { useState, useEffect, useRef } from 'react';


const timeout = async t => new Promise(
    (resolve => {
        setTimeout(() => resolve({ CO2KG: 123 }), t);
    }));

export const usePlaneInfoAPI = () => {
    const firstRun = useRef(true);
    const [data, setData] = useState(null);
    const [flightNumber, setFlightNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);

            try {
                const response = await fetch(`https://flight-co2-api.herokuapp.com/flight?number=${flightNumber}`);
                if (response.status !== 200) {
                    throw new Error(await response.text());
                }
                let data = await response.json();
                // let data = await timeout(50000000);
                setData(data);
            } catch (error) {
                setError(error);
            }

            setIsLoading(false);
        };

        if (firstRun.current) {
            firstRun.current = false;
            return;
        }

        fetchData();
    }, [flightNumber]);

    return [{ data, isLoading, error }, setFlightNumber];
};