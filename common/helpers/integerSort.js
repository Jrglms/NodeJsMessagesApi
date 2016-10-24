(function (integerSort) {

    integerSort.asc = function (a, b) {
        return a - b;
    }

    integerSort.desc = function (a, b) {
        return b - a;
    }

})(module.exports)