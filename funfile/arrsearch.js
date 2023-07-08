/**
 * @file 配列の一致を確認する
 * @author nikki9750 <tamkame123@outlook.com>
 */

// 同じ配列を二つ用意したとして
const testary1 = [[1,"aaa"], [2,"bbb"], [3,"ccc"]];
const testary2 = [[1,"ccc"], [2,"bbb"], [3,"aaa"]];

// console.log(testary1[1]==testary3[1]);

// includesではarrayを認識できない
for(let ary1 of testary1){
	console.log(testary2.includes(ary1));
}

//配列構造を残しながら要素の配列だけをjsonにする
const testjson1 = []
const testjson2 = []
for (let ary1 of testary1){
	testjson1.push(JSON.stringify(ary1));
}
for (let ary2 of testary2){
	testjson2.push(JSON.stringify(ary2));
}
//識別された
for(let ary1 of testjson1){
	console.log(testjson2.includes(ary1));
}

//どこにあるんだろう
for(let ary1 of testjson1){
	let i = testjson2.indexOf(ary1);
	console.group(`ans:${ary1}`);
	if(i != -1){
		console.log(`場所は${i}`);
		console.log(`検索文字列:${ary1}`);
		console.log(`検索結果:${testjson2[i]}`);
	} else {
		console.log(`場所はN/A`);
		console.log(`検索文字列:${ary1}`);
		console.log(`検索結果:見つかりません`);
	}
	console.groupEnd(`ans:${ary1}`);

//まとめ
//jsonってすごいね。（小並感）
}