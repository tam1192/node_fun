/**
 * @file forのinとofの違い
 * @author nikki9750 <tamkame123@outlook.com>
 */

const pattern = {a:1, b:2, c:3};
const pattern2 = [1, 2, 3];

console.debug("dict for in");
try{
  for(let ptn in pattern){console.log(ptn)}
}
catch{ console.error("error") }


console.debug("dict for of");
try{
  for(let ptn of pattern){console.log(ptn)}
}
catch{ console.error("error") }

console.debug("array for in");
try{
  for(let ptn in pattern2){console.log(ptn)}
}
catch{ console.error("error") }

console.debug("array for of");
try{
  for(let ptn of pattern2){console.log(ptn)}
}
catch{ console.error("error") }

// 解説
//for of はiterator（反復）を使う方法です。　javaのiteratorパターンが分かりやすいかと思います。
// iteratorには二つの戻り値があり、一つはnext():string(number...) 、もう一つはhasnext():boolean です。hasnext()は次の項目が存在するかを表します。