import React, { useState } from 'react';
import { DateTimeInput } from './DateTimeInput';
import { ArrivalDepatureRadio } from './ArrivalDepatureRadio';
import { AirportSelector } from './AirportSelector';
import { IPlanes } from '../FormAndResults';

interface IPlanesForm {
    setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
    setFormResults: React.Dispatch<
        React.SetStateAction<IFormResults | undefined>
    >;
    setPlanes: React.Dispatch<React.SetStateAction<IPlanes[] | undefined>>;
}

export const TypeEnum = {
    arrival: 'arrival',
    departure: 'departure',
};

type ArrivalsDepartureType = 'arrival' | 'departure' | undefined;

type AllAirportsResults = {
    airport: 'all';
    type: undefined;
    startTime: number;
    endTime: number;
};

type SpecifiedAirportResults = {
    airport: string;
    type: ArrivalsDepartureType;
    startTime: number;
    endTime: number;
};

export type IFormResults = AllAirportsResults | SpecifiedAirportResults;

const PlanesForm = ({
    setShowResults,
    setFormResults,
    setPlanes,
}: IPlanesForm) => {
    const [airport, setAirport] = useState('all');
    const [type, setType] = useState<ArrivalsDepartureType>();
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    const [errorMessage, setShowErrors] = useState(false);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const airportAndType: boolean = airport === 'all' || !!type;

        const start = startTime && Date.parse(startTime.toString());
        const end = endTime && Date.parse(endTime.toString());

        if (airportAndType && start && end) {
            setShowErrors(false);
            // reset data when resubmitting the form
            setPlanes(undefined);
            setShowResults(true);
            setFormResults({
                airport,
                type,
                startTime: start / 1000,
                endTime: end / 1000,
            });
        } else setShowErrors(true);
    };

    const allAirports = airport === 'all';

    return (
        <form onSubmit={handleSubmit}>
            <AirportSelector airport={airport} setAirport={setAirport} />

            {!allAirports && <ArrivalDepatureRadio setType={setType} />}

            <DateTimeInput
                setTime={setStartTime}
                time={startTime}
                label="Select start date and time."
            />

            <DateTimeInput
                setTime={setEndTime}
                time={endTime}
                label={`Select end date and time. Must be no more than ${
                    allAirports ? '2 hours' : '7 days'
                } after start time.`}
            />

            {errorMessage && (
                <p className="error-message">
                    Please fill in all the form fields
                </p>
            )}

            <input className="submit-button" type="submit" />
        </form>
    );
};

export default PlanesForm;
