import React from 'react';
import { TypeEnum } from './Form';

export const ArrivalDepatureRadio = ({ setType }: { setType: Function }) => (
    <div>
        <div className="form-label" id="arrivals-departures-radio">
            Would you like to see a list of planes arriving or departing from
            your selected airport?
        </div>
        <div role="group" aria-labelledby="arrivals-departures-radio">
            <label className="radio">
                <input
                    onChange={(e) => setType(e.target.value)}
                    type="radio"
                    name="arrivalsDepartureType"
                    value={TypeEnum.arrival}
                    required
                />
                Arriving
            </label>
            <label>
                <input
                    onChange={(e) => setType(e.target.value)}
                    type="radio"
                    name="arrivalsDepartureType"
                    value={TypeEnum.departure}
                />
                Departing
            </label>
        </div>
    </div>
);
