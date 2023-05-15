import React from 'react';
import { IAirportData, getAirportCodes } from '../helpers/getAirportCodes';

export const AirportSelector = ({
    airport,
    setAirport,
}: {
    airport: string;
    setAirport: Function;
}) => {
    const airportData: IAirportData[] = getAirportCodes();

    return (
        <div>
            <label className="form-label" htmlFor="airport">
                Please select an airport
                <select
                    name="airport"
                    value={airport}
                    onChange={(e) => setAirport(e.target.value)}>
                    {airportData.map(({ icao, airport }) => (
                        <option key={icao} value={icao}>
                            {airport}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
};
