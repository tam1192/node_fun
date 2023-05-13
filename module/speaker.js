const datakit = require('./datakit.js');
module.exports = class extends datakit{
    SearchName = (name) => {
        const search = (element) => element['name'] == name;
        this.data.findIndex
    }
};