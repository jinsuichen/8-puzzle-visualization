let xDistance = [
    [0, 1, 2, 0, 1, 2, 0, 1, 2],
    [-1, 0, 1, -1, 0, 1, -1, 0, 1],
    [-2, -1, 0, -2, -1, 0, -2, -1, 0],
    [0, 1, 2, 0, 1, 2, 0, 1, 2],
    [-1, 0, 1, -1, 0, 1, -1, 0, 1],
    [-2, -1, 0, -2, -1, 0, -2, -1, 0],
    [0, 1, 2, 0, 1, 2, 0, 1, 2],
    [-1, 0, 1, -1, 0, 1, -1, 0, 1],
    [-2, -1, 0, -2, -1, 0, -2, -1, 0],
]

let yDistance = [
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [-1, -1, -1, 0, 0, 0, 1, 1, 1],
    [-1, -1, -1, 0, 0, 0, 1, 1, 1],
    [-1, -1, -1, 0, 0, 0, 1, 1, 1],
    [-2, -2, -2, -1, -1, -1, 0, 0, 0],
    [-2, -2, -2, -1, -1, -1, 0, 0, 0],
    [-2, -2, -2, -1, -1, -1, 0, 0, 0],
]

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
const op = 'urdl';

export function updateCurState(lastState, ch) {
    let curState = lastState;

    let xPos = curState.indexOf('x');
    let xx = Math.floor(xPos / 3);
    let yy = xPos % 3;

    let nx = xx + dx[op.indexOf(ch)];
    let ny = yy + dy[op.indexOf(ch)];
    let nxtPos = nx * 3 + ny;

    let nxtState = '';
    for(let i = 0; i < 9; i++) {
        if(i === xPos) nxtState += curState[nxtPos];
        else if(i === nxtPos) nxtState += curState[xPos];
        else nxtState += curState[i];
    }
    return nxtState;
}

export function arrange(curState) {
    // console.log(curState)
    for(let i = 1; i<=9; i++) {
        let ch = i.toString();
        if(i === 9) ch = 'x';
        let targetPos = curState.indexOf(ch);
        let translateX = xDistance[i-1][targetPos] * 280;
        let translateY = yDistance[i-1][targetPos] * 295;
        // console.log(ch, targetPos, translateX, translateY);
        document.getElementById(`item${ch}`).setAttribute('style',
            `transform: translate(${translateX}px, ${translateY}px);`);
    }
}
