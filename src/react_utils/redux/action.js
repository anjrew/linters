export default class Action {

    /**
    * @constructor
    * @param {number} data
    * @param {string}  p1 - A string param.
    * @param {string=} p2 - An optional param (Closure syntax)
    * @param {string} [p3] - Another optional param (JSDoc syntax).
    * @param {string} [p4="test"] - An optional param with a default value
    */
    constructor (type, data) {
        Object.assign(this, data);
        this.type = type;
        if (!type) {
            throw Error('Type is missig');
        }
    }
}