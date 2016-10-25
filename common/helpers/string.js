(function (string) {

    string.isNullOrWhitespace = function (str) {
        return !str || !str.trim();
    }

})(module.exports)