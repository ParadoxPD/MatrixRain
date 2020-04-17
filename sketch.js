let stream;
let symbolSize = 15;
let streams = [];
let streamCount = 30;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    streamCount = width / symbolSize;
    console.log(streamCount)
    for (let i = 0; i < streamCount; i++) {
        stream = new Stream(i * symbolSize, random(-1000, 0));
        stream.generateSymbols();
        streams.push(stream);
    }

}



function draw() {
    background(0, 180);
    streams.forEach(stream =>
        stream.render()
    );

}


function Symbol(x, y, speed, first) {
    this.x = x;
    this.y = y;
    this.first = first;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(2, 30));
    this.setToRandomCharacter = function () {
        this.value = String.fromCharCode(
            0x30A0 + round(random(0, 96))
        );

    }

    this.render = function (alpha) {
        first ? fill(150, 255, 180, alpha) : fill(0, 255, 70, alpha);
        textSize(symbolSize);

        text(this.value, this.x, this.y);
        this.rain();
        if (frameCount % this.switchInterval == 0) {
            this.setToRandomCharacter();
        }

    }

    this.rain = function () {
        this.y += this.speed;
        if (this.y >= height) {
            this.y = 0;
        }
    }
}


function Stream(x, y) {
    this.symbols = [];
    this.x = x;
    this.y = y;
    this.totalSymbols = round(random(5, 30));
    this.speed = random(5, 20);

    this.generateSymbols = function () {
        let y = this.y;
        for (let i = 0; i < this.totalSymbols; i++) {
            symbol = new Symbol(this.x, y, this.speed, i == 0 & Math.random() < 0.3);
            symbol.setToRandomCharacter();
            this.symbols.push(symbol);
            y -= symbolSize;

        }
    }

    this.render = function () {
        this.symbols.forEach((symbol, index) => {
            let alpha = map(index, 0, this.totalSymbols, 255, 50);
            symbol.render(alpha);
        });
    }
}