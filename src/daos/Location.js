export default class Location {
    constructor(id, description, address, lat, long) {
        this._id = id
        this._description = description
        this._address = address
        this._lat = lat
        this._long = long
    }

    get id() {
        return this._id
    }

    get description() {
        return this._description
    }

    get address() {
        return this._address
    }

    get lat() {
        return this._lat
    }

    get long() {
        return this._long
    }

    set id(id) {
        this._id = id
    }

    set description(description) {
        this._description = description
    }

    set address(address) {
        this._address = address
    }

    set lat(lat) {
        this._lat = lat
    }

    set long(long) {
        this._long = long
    }
}
