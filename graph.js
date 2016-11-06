class Node {
    constructor(val, id) {
        this.val = val;
        this.id = id;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
    }

    enqueue(val) {
        var node = new Node(val);

        if( !this.head ) {
            this.head = node;
        } else {
            var r = this.head;
            while( r.next ) {
                r = r.next;
            }
            r.next = node;
        }
    }

    dequeue() {
        var ret = null;

        if( this.head ) {
            ret = this.head.val;
            this.head = this.head.next;
        }

        return ret;
    }
}

class Heap {
    constructor(parity) {
        this.data = []
        this.parity = parity || 'min'
        this.enqueue = this.insert
        this.dequeue = this.pop
    }

    _swap(i,j) {
        [this.data[i],this.data[j]] = [this.data[j],this.data[i]]
    }

    insert(val, id) {
        var _compare = function(m,n) {
            //reads like, "if max-heap, return m is greater than n, else return m is less than n"
            if (this.parity == 'max') {
                return m > n
            } else {
                return m < n
            }
        }.bind(this);

        val = Number(val)
        if (isNaN(val)) { return false; }

        this.data.push(new Node(val, id))

        if (this.data.length == 1) { return true; }

        var i = this.data.length-1
        var p = Math.floor((i-1)/2)

        while (this.data[i] && this.data[p] && _compare(this.data[i].val,this.data[p].val)) {
            this._swap(i,p)
            i = p
            p = Math.floor((i-1)/2)
        }
    }

    peek() {
        return this.data[this.data.length-1]
    }

    pop() {
        var _compareChildren = function(i) {
            if (i === false) {
                return false
            }
            //reads like, "if max-heap, return value at i is greater than its max-child, else return value at i is less than its min-child"
            if (this.parity == 'max') {
                var maxChild = !this.data[i*2+2] ? this.data[i*2+1].val : Math.max(this.data[i*2+1].val,this.data[i*2+2].val)
                return this.data[i].val < maxChild
            } else {
                var minChild = !this.data[i*2+2] ? this.data[i*2+1].val : Math.min(this.data[i*2+1].val,this.data[i*2+2].val)
                return this.data[i].val > minChild
            }
        }.bind(this);
        var _getChildIndex = function(i) {
            if (!this.data[i*2+1] && !this.data[i*2+2]) {
                return false
            }
            if (this.parity == 'max') {
                if (this.data[i*2+1] && !this.data[i*2+2]) {
                    return i*2+1
                } else {
                    return this.data[i*2+1].val > this.data[i*2+2].val ? i*2+1 : i*2+2
                }

            } else {
                if (this.data[i*2+1] && !this.data[i*2+2]) {
                    return i*2+1
                } else {
                    return this.data[i*2+1].val < this.data[i*2+2].val ? i*2+1 : i*2+2
                }
            }
        }.bind(this);

        this._swap(0,this.data.length-1)
        var tmp = this.data[this.data.length-1]
        this.data.length -= 1

        var i = 0
        var c = _getChildIndex(i)
        while (c && _compareChildren(i)) {
            this._swap(i,c)
            i = c
            c = _getChildIndex(i)
        }

        return tmp
    }
}

class Graph {
    constructor() {
        this.idTrack = 0;
        this.vertices = {

        };
        this.edges = {

        };
    }

    consumeGrid(grid, borders) { //borders specifies the border tiles; when generating connections, a node does not have a connection to a border. however, border nodes still exist to maintain consistent grid-like structure
        var addUp = function(i) {
            var conn = i-length
            if (conn >= 0 && !isBorder(arr[i]) && !isBorder(arr[conn])) {
                this.connect(i, conn, 1)
            }
        }.bind(this)

        var addRight = function(i) {
            var conn = i+1
            if ((i+1)%length !== 0 && !isBorder(arr[i]) && !isBorder(arr[conn])) {
                this.connect(i, conn, 1)
            }
        }.bind(this)

        var addDown = function(i) {
            var conn = i+length
            if (conn < total && !isBorder(arr[i]) && !isBorder(arr[conn])) {
                this.connect(i, conn, 1)
            }
        }.bind(this)

        var addLeft = function(i) {
            var conn = i-1
            if (i%length !== 0 && !isBorder(arr[i]) && !isBorder(arr[conn])) {
                this.connect(i, conn, 1)
            }
        }.bind(this)

        function isBorder(current) {
            for (var i = 0; i < borders.length; i++) {
                if (current == borders[i]) {
                    return true
                }
            }
            return false
        }

        var length = grid[0].length
        var width = grid.length
        var total = length*width
        var arr = []

        for (var i = 0; i < grid.length; i++) {
            for (var j = 0; j < grid[0].length; j++) {
                arr.push(grid[i][j])
                this.add()
            }
        }

        for (var i = 0; i < total; i++) {
            addUp(i)
            addRight(i)
            addDown(i)
            addLeft(i)
        }

        return this
    }

    getVertices() {
        console.log(this.vertices);
    }

    getEdges() {
        console.log(this.edges);
    }

    add() {
        this.vertices[this.idTrack] = {
            id: this.idTrack++,
            cost: Infinity,
            exists: true
        };
        return this;
    }

    connect(A, B, weight) {
        if( this.vertices[A] && this.vertices[B] ) {
            if( !this.edges[A] ) this.edges[A] = {};
            if( !this.edges[B] ) this.edges[B] = {};
            this.edges[A][B] = weight;
            this.edges[B][A] = weight;
            return this;
        } else {
            return false;
        }
    }

    Dijkstra(start, target, Q) {
        //RESET
        for( var v in this.vertices ) {
            this.vertices[v].cost = Infinity;
            this.vertices[v].visited = false; //not used for djikstra
            this.vertices[v].previous = null;
        }

        start = this.vertices[start];
        target = this.vertices[target];
        start.cost = 0;

        var curr = start;
        var moves = [];
        var Q = new Heap('min')

        while(curr !== target) {
            for( var child in this.edges[curr.id] ) {
                var v = this.vertices[child];
                if( v.cost > curr.cost+this.edges[curr.id][v.id] ) {
                    v.cost = curr.cost+this.edges[curr.id][v.id];
                    v.previous = curr;
                    Q.enqueue(v.cost, v.id);
                }
            }
            curr = this.vertices[Q.dequeue()['id']];
        }
        
        while (curr) {
            moves.unshift(curr)
            curr = curr.previous
        }
        return moves
    }

    Astar(start, target, isGridGraph, length, width) {
        if (!isGridGraph) { //this implementation makes the assumption that the user generated a grid-based graph; this flag exists with the express purpose of ensuring a user acknowledges the intent and pre-reqs of this algorithm
            return false
        }

        var curr = this.vertices[start];
        var moves = [];
        var Q = new Heap('min')
        var movement = 10

        var t = {
            w: Math.floor(target/length),
            l: target%length
        }
        for (var v in this.vertices) {
            this.vertices[v].heuristic = Math.abs(t.w-Math.floor(this.vertices[v].id/length))+Math.abs(t.l-this.vertices[v].id%length)
            this.vertices[v].visited = false //substitute for closed list
            this.vertices[v].cost = Infinity
        }

        curr.cost = 0
        while (curr.heuristic !== 0) {
            if (curr.visited) { continue; }
            for (var child in this.edges[curr.id]) {
                var v = this.vertices[child];
                
                if (v.visited) { continue; }
                
                if (curr.cost + movement < v.cost) {
                    v.cost = curr.cost + movement
                    v.previous = curr
                    var f = v.cost + v.heuristic

                    Q.enqueue(f, v.id);//heap sorted by lowest fcost
                }
            }
            curr.visited = true
            curr = this.vertices[Q.dequeue()['id']];
        }
        while (curr) {
            moves.push(curr)
            curr = curr.previous
        }
        return moves
    }

    BFS(start, target) {
        var arr = [];
        var Q = new Queue

        //RESET
        for( var v in this.vertices ) {
            this.vertices[v].cost = Infinity;
            this.vertices[v].visited = false;
        }

        start = this.vertices[start];
        target = this.vertices[target];
        start.cost = 0;

        var curr = start;

        while(curr !== target) {
            for( var child in this.edges[curr.id] ) {
                var v = this.vertices[child];
                if( v.cost === Infinity ) {
                    Q.enqueue(v.id);
                    v.cost = curr.cost + 1;
                }
            }
            curr = this.vertices[Q.dequeue()];
        }

        while( curr !== start ) {
            arr.push(curr);
            for( var child in this.edges[curr.id] ) {
                var v = this.vertices[child];
                if( v.cost === curr.cost - 1 ) {
                    curr = v;
                    break;
                }
            }
        }

        arr.push(curr);
        return arr.reverse();
    }

    DFS(start, target) {
        start = this.vertices[start];
        target = this.vertices[target];

        //RESET
        for( var v in this.vertices ) {
            this.vertices[v].cost = Infinity;
            this.vertices[v].visited = false;
        }

        var stack = [];
        var curr = start;
        curr.cost = 0;

        var _cheapestPath = function(c) {
            var cheapest;
            var es = this.edges[c.id];
            for( var e in es ) {
                if( (!cheapest || es[e] < this.edges[c.id][cheapest.id]) && !this.vertices[e].visited) {
                    cheapest = this.vertices[e];
                }
            }
            return cheapest;
        }.bind(this);

        while( curr !== target ) {
            curr.visited = true;
            var next = _cheapestPath(curr);
            if( next ) {
                next.cost = curr.cost + this.edges[curr.id][next.id];
                stack.push(curr);
                curr = next;
            } else {
                curr = stack.pop();
            }
        }
        stack.push(target);

        return stack;
    }

    Prim(start) {
        start = start || 0;
        var curr
        var visited = 0;
        var Q = new Heap('min')
        Q.enqueue(0, this.vertices[start].id)
        var stack = []

        //RESET
        for (var v in this.vertices) {
            this.vertices[v].previous = null
            this.vertices[v].visited = false
        }

        while (visited < Object.keys(this.vertices).length) {
            curr = Q.dequeue()
            if (Q.data.length > 0 && this.vertices[curr.id].visited) {
                continue
            }
            this.vertices[curr.id].visited = true
            visited++;
            console.log('Current:',curr)

            for (var e in this.edges[curr.id]) {
//                    console.log(curr,e,Q.data)
                if ((!this.vertices[curr.id].previous || e != this.vertices[curr.id].previous.id) && !this.vertices[e].previous) {
                    this.vertices[e].previous = curr
                    Q.enqueue(this.edges[curr.id][e], this.vertices[e].id)
                //console.log('A', Q.data)
                } else if (!this.vertices[curr.id].previous || e != this.vertices[curr.id].previous.id && this.edges[curr.id][e] < this.edges[this.vertices[e].previous.id][e]) {//if vertex A has previous, compare B->A and C->A
                    this.vertices[e].previous = curr
                    Q.enqueue(this.edges[curr.id][e], this.vertices[e].id)
                //console.log('B')
                }
            }
        }

        while (curr) {
            stack.push(this.vertices[curr.id])
            curr = this.vertices[curr.id].previous
        }

        return stack
    }
}
