export default class Event {
    constructor(id, description, location_id, time) {
        this.id = id
        this.description = description
        this.location_id = location_id
        this.time = time
    }

    get id(){
        return this.id
    }

    get description(){
        return this.description
    }

    get location_id(){
        return this.location_id
    }

    get time(){
        return this.time
    }

    set id(id) {
        this.id = id
    }

    set description(description) {
        this.description = description
    }

    set location_id(location_id) {
        this.location_id = location_id
    }

    set time(time) {
        this.time = time
    }
}
