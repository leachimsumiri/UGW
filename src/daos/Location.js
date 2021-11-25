export default class Location {
    constructor(id, description, address, lat, long) {
        this.id = id
        this.description = description
        this.address = address
        this.lat = lat
        this.long = long
    }

    get id(){
        return this.id
    }

    get description(){
        return this.description
    }

    get address(){
        return this.address
    }

    get lat(){
        return this.lat
    }

    get long(){
        return this.long
    }

    set id(id) {
        this.id = id
    }

    set description(description) {
        this.description = description
    }

    set address(address) {
        this.address = address
    }

    set lat(lat) {
        this.lat = lat
    }

    set long(long) {
        this.long = long
    }
}
