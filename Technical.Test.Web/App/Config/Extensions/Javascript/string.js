if (typeof String.prototype.isPalindrome != 'function') {
    String.prototype.isPalindrome = function () {
        var str = this.replace(/ /g, '').toLowerCase();
        return str == str.split('').reverse().join('');
    };
}

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (input) {
        return this.slice(0, input.length) == input;
    };
}
