function analyzeTypingData (typingData) {
    let currentWord = '';
    let isTypo = false;
    let typoChar = '';
    let furthestCorrectlyTyped = '';
    let letterStats = {};
    let totalTypos = 0;
    let letterStatTemplate = {
        durations: [],
        typoCount: 0,
        hitCount: 0
    }

    typingData.slice(1).forEach((event, idx) => {
        if (currentWord !== event.currentWord) {
            currentWord = event.currentWord;
            isTypo = false;
            typoChar = '';
            furthestCorrectlyTyped = '';
        }
        if (!isTypo && isNewTypo(event.inputValue, currentWord)) {
            isTypo = true;
            typoChar = currentWord[event.inputValue.length - 1];
            letterStats[typoChar] = letterStats[typoChar] || structuredClone(letterStatTemplate);
            letterStats[typoChar].typoCount += 1;
            totalTypos += 1;
        }
        if (isTypo && isTypoFixed(event.inputValue, currentWord)) {
            isTypo = false;
            typoChar = '';
        }
        if (isFurthestCorrectlyTyped(event.inputValue, currentWord, furthestCorrectlyTyped.length)) {
            let typedChar = currentWord[event.inputValue.length - 1];
            letterStats[typedChar] = letterStats[typedChar] || structuredClone(letterStatTemplate);
            letterStats[typedChar].hitCount += 1;
            let previousEvent = typingData[idx - 1];
            if (previousEvent) {
                letterStats[typedChar].durations.push(event.date - previousEvent.date);
            }
        }
    })
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    
    Object.entries(letterStats).forEach(entry => {
        letterStats[entry[0]].durations = average(entry[1].durations);
    });

    let sessionStartedAt = typingData[0].date;
    let sessionEndedAt = typingData[typingData.length - 1].date;
    let sessionDuration = sessionEndedAt - sessionStartedAt;

    return {
        duration: sessionDuration,
        length: typingData.length,
        typos: totalTypos,
        letterStats: letterStats
    };
}

function sharedStart(array){
    let sortedArray = array.concat().sort();
    let shortestWord = sortedArray[0];
    let longestWord = sortedArray[sortedArray.length-1]
    let i = 0;
    while(i < shortestWord.length && shortestWord.charAt(i) === longestWord.charAt(i)) i++;
    return shortestWord.substring(0, i);
}

const isNewTypo = (inputValue, currentWord) => {
    return inputValue !== currentWord.slice(0, inputValue.length);
}

const isTypoFixed = (inputValue, currentWord) => {
    return inputValue === currentWord.slice(0, inputValue.length);
}

const isFurthestCorrectlyTyped = (inputValue, currentWord, furthestTypedLength) => {
    return inputValue && currentWord.startsWith(inputValue) && inputValue.length > furthestTypedLength;
}

export {
    analyzeTypingData,
    sharedStart
}