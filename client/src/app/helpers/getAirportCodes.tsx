import airportData from '../icao-codes.json';

export interface IAirportData {
    icao: string;
    airport: string;
}

interface IData extends IAirportData {
    country_code: string;
    region_name: string;
    iata: string;
    latitude: number;
    longitude: number;
    source: string;
}

export const getAirportCodes = (): IAirportData[] => {
    let data: IData[] | IAirportData[] = airportData;

    // remove unused data
    data = data.map(({ icao, airport }) => ({ icao, airport }));

    // remove duplicates
    const icaos = data.map((o) => o.icao);
    const filteredData = data
        .filter(({ icao }, index) => !icaos.includes(icao, index + 1))
        .filter(({ icao }) => icao !== '');

    // sort alphabetically by airport name
    const sortedData = filteredData.sort((a, b) =>
        a.airport.localeCompare(b.airport)
    );

    return [{ icao: 'all', airport: 'All airports' }, ...sortedData];
};
