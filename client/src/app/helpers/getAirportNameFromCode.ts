import { IPlanes } from '../FormAndResults';
import airportData from '../icao-codes.json';

interface IPlanesWithAirportNames extends IPlanes {
    departureAirportName: string | null;
    arrivalAirportName: string | null;
}

export const getAirportNameFromCode = (
    planes: IPlanes[]
): IPlanesWithAirportNames[] => {
    const planesWithAiportNames = planes.map(
        ({
            estArrivalAirport,
            estDepartureAirport,
            estArrivalAirportHorizDistance,
            firstSeen,
            icao24,
            lastSeen,
        }) => {
            let departure = null;
            let arrival = null;

            if (estDepartureAirport) {
                departure = airportData.filter(
                    ({ icao }) => icao === estDepartureAirport
                )[0]?.airport;
            }

            if (estArrivalAirport) {
                arrival = airportData.filter(
                    ({ icao }) => icao === estArrivalAirport
                )[0]?.airport;
            }

            return {
                estArrivalAirportHorizDistance,
                firstSeen,
                icao24,
                lastSeen,
                estDepartureAirport,
                estArrivalAirport,
                departureAirportName: departure,
                arrivalAirportName: arrival,
            };
        }
    );

    return planesWithAiportNames;
};
