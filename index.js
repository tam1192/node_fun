// fetchAPIを使う
// voicevox = http://localhost:50021/

//const url="http://localhost:50021";

//fetch(url)



//promiss

function exClass(x,y)
{
    this.x = x;
    this.y = y;

    this.sum = function(){
        return this.x + this.y;
    };

    this.upd = function(x=this.x, y=this.y){
        this.x = x;
        this.y = y;
    };
}

const test=new exClass(3,5);
console.log(test.sum());
console.log(test.upd(x=3).sum());
