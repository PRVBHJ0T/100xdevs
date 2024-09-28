/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
    str = str.toLowerCase();
    str = str.replace(/\s+/g, '').replace(/[^\w\s]|_/g, "");

    const arr = str.split('');
    const rev = arr.reverse();

    const strin = rev.join('');

    if (str == strin) return true;
    return false;
}

module.exports = isPalindrome;