class exClass{
    constructor(i){
        this.i = i;
    }
    sum = (x)=>{
        const y = x + this.i;
        return new exClass2(y)
    }
}
const exClass2 = function(i){
    this.i = i;
    this.multi = (x)=>{
        return x*this.i
    }
}
function testfunc(x){
    return x+y;
}
const testfunc_ = (x,y)=>x+y;
const a = 20;
const b = 40;

const c = 43 > 40 ? true : false ;

const testin = new exClass(10);
var test2 = testin.sum(2).multi(3);
console.info(test2);
console.info(c);

class player{
    constructor(name){
        this.name = name;
        this.Larm = true;
        this.Rarm = true;
        this.Lfoot = true;
        this.Rfoot = true;
    }
    rename = (name)=> {
        this.name = name;
    }
    delete = ()=> {

    }

}

const fk = new player("fk")
fk.rename("FK.NET")