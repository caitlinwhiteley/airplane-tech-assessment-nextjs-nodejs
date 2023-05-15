'use client'; // this is a client component 👈🏽

import { useEffect, useState } from 'react';
import { Results } from './Results';
import PlanesForm, { IFormResults } from './Form/Form';
import axios, { AxiosResponse } from 'axios';

const API_BASE = 'http://localhost:3001/api';

export interface IPlanes {
    estArrivalAirport: string | null;
    estDepartureAirport: string | null;
    estArrivalAirportHorizDistance: number | null;
    firstSeen: number;
    icao24: string;
    lastSeen: number;
}

export default function FormAndResults() {
    const [planes, setPlanes] = useState<IPlanes[] | undefined>();
    const [showResults, setShowResults] = useState(false);
    const [formResults, setFormResults] = useState<IFormResults>();

    const getPlanes = (type: string, query: string) => {
        console.log('Fetching', API_BASE + `/${type}/${query}`);
        fetch(API_BASE + `/${type}/${query}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) setPlanes([]);
                else setPlanes(data);
            })
            .catch((err) => console.error('Error =', err));
    };

    useEffect(() => {
        if (formResults) {
            if (formResults.airport === 'all') {
                getPlanes(
                    'all',
                    `begin=${formResults.startTime}&end=${formResults.endTime}`
                );
            } else if (formResults.type) {
                getPlanes(
                    formResults.type,
                    `airport=${formResults.airport}&begin=${formResults.startTime}&end=${formResults.endTime}`
                );
            } else {
                // this scenario should never happen because the form ensures that if aiport !== all, then there will always be a type
                alert(
                    "Something has gone wrong that shouldn't have... Please try again later"
                );
                setShowResults(false);
            }
        }
    }, [formResults]);

    useEffect(() => {
        axios.get('').then((response: AxiosResponse<any>) => {
            console.log('response.data', response.data);
        });
    }, []);

    return (
        <div>
            <div>
                <PlanesForm
                    setShowResults={setShowResults}
                    setFormResults={setFormResults}
                    setPlanes={setPlanes}
                />
            </div>

            {showResults &&
                (planes !== undefined ? (
                    <Results planes={planes} />
                ) : (
                    <p>Loading...</p>
                ))}
        </div>
    );
}
