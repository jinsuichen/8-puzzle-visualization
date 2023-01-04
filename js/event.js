import {aStarSolve, stateValid, reversePairCount} from "./algorithm.js";
import {updateCurState, arrange} from "./animation.js";


function checkHasSolution() {
    let startState = document.getElementById('startState').innerText;
    let endState = document.getElementById('endState').innerText;
    let startStateReversePairCount = reversePairCount(startState);
    let endStateReversePairCount = reversePairCount(endState);
    let info;
    if(startStateReversePairCount % 2 !== endStateReversePairCount % 2) {
        info = 'No solution!';
    } else {
        info = 'Has solution!';
    }
    document.getElementById('infoText').innerText = info;
}


function start() {
    let startState = document.getElementById('startState').innerText;
    let endState = document.getElementById('endState').innerText;

    if(!stateValid(startState) || !stateValid(endState)) {
        alert('Invalid state!');
        return;
    }
    let ret = aStarSolve(startState, endState);

    if(ret === 'unsolvable') {
        alert('Unsolvable!');
        return 0;
    }

    document.getElementById('infoText').innerText = `${ret.length} steps as following:\n\n` + ret;

    let state = startState;
    for(let i = 0; i<ret.length; i++) {
        state = updateCurState(state, ret[i]);
        // arrange(state);
        let stateCopy = state;
        setTimeout(() => arrange(stateCopy), 200*i);
        // setTimeout("arrange(state)",`${i*300}`)
    }
}


function setStartStatus () {
    let startState = document.getElementById('startStateText').value;
    if(!stateValid(startState)) {
        alert('Invalid state!');
        return;
    }

    arrange(startState);
    // document.getElementById('curState').innerText = startState;
    document.getElementById('startState').innerText = startState;
    // alert('Set start state successfully!');
    checkHasSolution();
}


function setEndStatus () {
    let endState = document.getElementById('endStateText').value;
    if(!stateValid(endState)) {
        alert('Invalid state!');
        return;
    }

    document.getElementById('endState').innerText = endState;
    // alert('Set end state successfully!');
    checkHasSolution();
}


function randomSetStatus () {
    let startStateArr = Array.from('12345678x');
    let endStateArr = Array.from('12345678x');
    startStateArr.sort(() => Math.random() - 0.5);
    endStateArr.sort(() => Math.random() - 0.5);
    let startState = startStateArr.join('');
    let endState = endStateArr.join('');
    document.getElementById('startState').innerText = startState;
    document.getElementById('endState').innerText = endState;
    arrange(startState);
    checkHasSolution();
}

function reset() {
    document.getElementById('startState').innerText = '12345678x';
    document.getElementById('endState').innerText = '12345678x';
    arrange('12345678x');
    document.getElementById('infoText').innerHTML = 'Author: <a href="https://github.com/jinsuichen" target="_blank">Jinsui Chen</a>';
}

document.getElementById('startButton').addEventListener('click', start);
document.getElementById('setStartStateButton').addEventListener('click', setStartStatus);
document.getElementById('setEndStateButton').addEventListener('click', setEndStatus);
document.getElementById('randButton').addEventListener('click', randomSetStatus);
document.getElementById('resetButton').addEventListener('click', reset);

