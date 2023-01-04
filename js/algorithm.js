import {PriorityQueue} from './PriorityQueue.js'

function calcDis (state, targetState) {
    let ret = 0;
    for(let i = 1; i<=8; i++) {
        let pos1 = state.indexOf(i.toString());
        let pos2 = targetState.indexOf(i.toString());
        ret += Math.abs(pos1%3 - pos2%3) + Math.abs(Math.floor(pos1/3) - Math.floor(pos2/3));
    }
    return ret;
}

function valid(x, y) {
    return x>=0 && x<3 && y>=0 && y<3;
}

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
const op = ['u', 'r', 'd', 'l'];

class Node {
    constructor(st, op, d, f) {
        this.st = st;
        this.op = op;
        this.d = d;
        this.f = f;
    }
}
function compare(a, b) {
    return (a.d + a.f) - (b.d + b.f);
}

const dist = new Map();


function aStarBfsSearch(startState, endState) {
    dist.clear();
    let q = new PriorityQueue(compare);
    q.insert(new Node(startState, "", 0, 0)); dist.set(startState, 0);

    while(!q.empty()) {
        let f = q.top(); q.pop();

        if(f.st === endState) {
            return f.op;
        }

        let xx = Math.floor(f.st.indexOf('x') / 3);
        let yy = f.st.indexOf('x') % 3;

        for(let i = 0; i<4; i++) {
            let nx = xx + dx[i];
            let ny = yy + dy[i];
            if(!valid(nx, ny)) continue;

            let pos1 = xx*3 + yy;
            let pos2 = nx*3 + ny;

            if(pos1 < pos2) {
                [pos1, pos2] = [pos2, pos1];
            }
            let nst = ''
            for(let j = 0; j<9; j++) {
                if(j === pos1) nst += f.st[pos2];
                else if(j === pos2) nst += f.st[pos1];
                else nst += f.st[j];
            }

            if(!dist.has(nst) || dist.get(nst) > dist.get(f.st) + 1) {
                dist.set(nst, dist.get(f.st) + 1);
                q.insert(new Node(nst, f.op + op[i], dist.get(nst), calcDis(nst, endState)));
            }
        }
    }
}

export function reversePairCount(state) {
    let cnt = 0;
    for(let i = 0; i<9; i++) {
        for(let j = i+1; j<9; j++) {
            if(state[i] === 'x' || state[j] === 'x') continue;
            if(parseInt(state[i]) > parseInt(state[j])) {
                cnt++;
            }
        }
    }
    return cnt;
}

export function aStarSolve(startState, endState) {
    let cnt1 = reversePairCount(startState);
    let cnt2 = reversePairCount(endState);

    if(cnt1 % 2 !== cnt2 % 2) {
        return 'unsolvable';
    } else {
        return aStarBfsSearch(startState, endState);
    }
}

export function stateValid(state) {
    let arr = [];
    for(let i = 0; i<state.length; i++) {
        if(state[i] === 'x') arr.push(9);
        else arr.push(parseInt(state[i]));
    }
    arr.sort((a, b) => a-b);
    return arr.toString() === '1,2,3,4,5,6,7,8,9';
}