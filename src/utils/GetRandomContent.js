// getRandomContent.js

module.exports = function getRandomContent() {
    const randomNum = Math.random();
    if (randomNum < 0.2) return "treasure";
    else if (randomNum < 0.5) return "monster";
    return "empty";
};
