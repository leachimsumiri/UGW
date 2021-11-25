export default class Event {
    constructor(id, description, location_id, time) {
        this._id = id
        this._description = description
        this._location_id = location_id
        this._time = time
    }

    get id() {
        return this._id
    }

    get description() {
        return this._description
    }

    get location_id() {
        return this._location_id
    }

    get time() {
        return this._time
    }

    set id(id) {
        this._id = id
    }

    set description(description) {
        this._description = description
    }

    set location_id(location_id) {
        this._location_id = location_id
    }

    set time(time) {
        this._time = time
    }
}
