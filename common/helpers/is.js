(function (is) {

    is.integer = function (str) {

        return /^\d+$/.test(str);
    }

    is.date = function (str) {

        var date = new Date(str);

        return date.toString() != "Invalid Date";
    }

})(module.exports);