import { useEffect, useState } from 'react';
import { IPlanes } from './FormAndResults';
import { getAirportNameFromCode } from './helpers/getAirportNameFromCode';
import moment from 'moment';

export const Results = ({ planes }: { planes: IPlanes[] }) => {
    const numberOfResults = planes.length;
    if (!numberOfResults) return <div>There are no planes</div>;
    if (typeof planes[0] === 'string') return <p>{planes[0]}</p>;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    const planesWithAiportNames = getAirportNameFromCode(planes);

    const firstSeenTitle = 'First seen';
    const lastSeenTitle = 'Last seen';
    const departedFromTitle = 'Departed from';
    const arrivesAtTitle = 'Arrives at';
    const distanceTitle = 'Distance to arrival airport';

    const Data = ({ smallData }: { smallData?: boolean }) => (
        <>
            {planesWithAiportNames.map(
                ({
                    firstSeen,
                    lastSeen,
                    icao24,
                    estDepartureAirport,
                    estArrivalAirport,
                    estArrivalAirportHorizDistance,
                    departureAirportName,
                    arrivalAirportName,
                }) => {
                    const firstSeenData = moment(firstSeen * 1000).format(
                        'lll'
                    );
                    const lastSeenData = moment(lastSeen * 1000).format('lll');
                    const departedFromData =
                        departureAirportName ||
                        (estDepartureAirport &&
                            `Airport code ${estDepartureAirport}`) ||
                        'No depture data';
                    const arrivesAtData =
                        arrivalAirportName ||
                        (estArrivalAirport &&
                            `Airport code ${estArrivalAirport}`) ||
                        'No arrival data';
                    const distanceData =
                        !!estArrivalAirportHorizDistance &&
                        `${estArrivalAirportHorizDistance / 100}km`;

                    if (smallData)
                        return (
                            <div
                                key={`${icao24}-${firstSeen}`}
                                style={{ marginTop: 30 }}>
                                <p>
                                    {firstSeenTitle}: {firstSeenData}
                                </p>
                                <p>
                                    {lastSeenTitle}: {lastSeenData}
                                </p>
                                <p>
                                    {departedFromTitle}: {departedFromData}
                                </p>
                                <p>
                                    {arrivesAtTitle}: {arrivesAtData}
                                </p>
                                {distanceData && (
                                    <p>
                                        {distanceTitle}: {distanceData}
                                    </p>
                                )}
                            </div>
                        );
                    else
                        return (
                            <tr key={`${icao24}-${firstSeen}`}>
                                <td>{firstSeenData}</td>
                                <td>{lastSeenData}</td>
                                <td>{departedFromData}</td>
                                <td>{arrivesAtData}</td>
                                {distanceData && <td>{distanceData}</td>}
                            </tr>
                        );
                }
            )}
        </>
    );

    return (
        <div>
            <p>Number of results: {numberOfResults}</p>
            {numberOfResults < 10 || windowWidth < 650 ? (
                <Data smallData />
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>First Seen</th>
                                <th>Last seen</th>
                                <th>Departed from</th>
                                <th>Arrives at</th>
                                <th>Distance to arrival airport</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Data />
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
