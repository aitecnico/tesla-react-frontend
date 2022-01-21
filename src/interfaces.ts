export interface Site {
    _id: number,
    id: number,
    locationId: string,
    name: string,
    status: string,
    address: Address,
    gps: Geolocation,
    dateOpened: number,
    stallCount: number,
    counted: number,
    elevationMeters: number,
    powerKilowatt: number,
    solarCanopy: false,
    battery: false,
    statusDays: number,
    urlDiscuss: false
}

export interface Address {
    street: string,
    city: string,
    state: number,
    zip: number,
    countryId: number,
    country: string,
    regionId: number,
    region: string


}

export interface Geolocation {
    latitude: number,
    longitude: number,

}





