module.exports = {
    convertFileName(fileName) {
        let returnValue = fileName
            .replace('.jpg', '')
            .replaceAll('-', ' ')
            .split(' ') // split on white space, so you have an array of words
            .map(word => word[0].toUpperCase() + word.slice(1)) // map each word, capitalizing the first letter
            .join(' '); // join it all back together with a space
        return returnValue;
    }
}