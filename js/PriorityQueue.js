export class PriorityQueue {
    constructor(compare) {

        if(typeof compare !== 'function'){
            throw new Error('compare function required!')
        }

        this.h = [null];
        this.compare = compare;
    }

    up(p) {
        while(Boolean(p>>1) && this.compare(this.h[p], this.h[p>>1]) < 0) {
            [this.h[p], this.h[p>>1]] = [this.h[p>>1], this.h[p]];
            p >>= 1;
        }
    }

    down(p) {
        let t = p;
        if(p<<1 <= this.h.length-1 && this.compare(this.h[p<<1], this.h[t]) < 0) t = p<<1;
        if((p<<1|1) <= this.h.length-1 && this.compare(this.h[p<<1|1], this.h[t]) < 0) t = p<<1|1;
        if(t !== p) {
            [this.h[t], this.h[p]] = [this.h[p], this.h[t]];
            this.down(t);
        }
    }

    insert(x) {
        this.h.push(x);
        this.up(this.h.length-1);
    }

    top() {
        return this.h[1];
    }

    pop() {
        this.h[1] = this.h[this.h.length-1];
        this.h.pop();
        this.down(1);
    }

    empty() {
        return this.h.length === 1;
    }
}