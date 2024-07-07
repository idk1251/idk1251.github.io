document.getElementById('placeBet').addEventListener('click', function() {
    let chip = new Chip('plinko-board', 500);
    chip.start();
});

var buckets = {
    drops: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
};

function updateStat(selector, count, percent) {
    document.querySelector(selector).textContent = count;
    document.querySelector(selector + '_percent').textContent = percent;
}

function updateBuckets() {
    var selectors = ['#one', '#two', '#three', '#four', '#five'];
    selectors.forEach((selector, i) => {
        var count = buckets[i + 1];
        var percent = ((buckets[i + 1] / buckets.drops) * 100).toFixed(2) + '%';
        updateStat(selector, count, percent);
    });
}

function getRandom() {
    return Math.random() < 0.5 ? -1 : 1;
}

function getBucket(chip) {
    var total = chip.path.reduce((acc, val) => acc + val, 0);
    switch (total) {
        case -4: buckets[1]++; break;
        case -2: buckets[2]++; break;
        case 0: buckets[3]++; break;
        case 2: buckets[4]++; break;
        case 4: buckets[5]++; break;
    }
    buckets.drops++;
    updateBuckets();
    chip.el.remove();
}

class Chip {
    constructor(boardId, speed) {
        this.board = document.getElementById(boardId);
        this.speed = speed;
        this.location = { x: this.board.offsetWidth / 2, y: 0 };
        this.lastStep = 0;
        this.el = document.createElement('div');
        this.el.className = 'chip';
        this.board.appendChild(this.el);
        this.el.style.left = `${this.location.x}px`;
        this.el.style.top = `${this.location.y}px`;
        this.path = Array(13).fill().map(() => getRandom());
    }

    start() {
        this.nextStep();
    }

    nextStep() {
        if (this.lastStep < 13) {
            var offset = this.path[this.lastStep] < 0 ? -2 : 2;
            this.animateTo({ x: offset, y: 2 });
        } else {
            getBucket(this);
        }
    }

    animateTo(offset) {
        var stepX = this.board.offsetHeight / 13;
        var stepY = this.board.offsetWidth / 13;
        this.el.style.transition = `left ${this.speed}ms, top ${this.speed}ms`;
        this.el.style.left = `${parseInt(this.el.style.left) + stepX * offset.x}px`;
        this.el.style.top = `${parseInt(this.el.style.top) + stepY * offset.y}px`;
        setTimeout(() => {
            this.location.x = this.el.style.left;
            this.location.y = this.el.style.top;
            this.lastStep++;
            this.nextStep();
        }, this.speed);
    }
}

