(function (is) {

    is.integer = function (str) {

        return /^\d+$/.test(str);
    }

})(module.exports);