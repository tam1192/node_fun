"use strict";

const nodevox = require('./modules/node-voicevox');
const {voicevox} = require('./config.json');
const fs = require('fs');
const model = require('./modules/rakutenma/model_ja.json');
const RakutenMA = require('./modules/rakutenma/rakutenma');
const { test } = require('node:test');

async function main() {
	console.time("all");
	// demo.jsから抜粋
	const rma = new RakutenMA(model, 1024, 0.007812);
	rma.featset = RakutenMA.default_featset_ja;
	rma.hash_func = RakutenMA.create_hash_func(15);

	//テスト用文字列
	// const Teststr = "通信隊に連絡して、警察と沿岸警備隊の無線を残らず傍受させろ、通信隊。ほうれんそう、くさ、ざっそう。";
	const tokenTeststr = rma.tokenize(Teststr);
	//テスト用キャッシュパターン
	const Pattern = ["通信隊", "警察", "沿岸警備隊", "草"];
	const tokenPattern = ((data)=>{
		const returnAlley = [];
		for(let d of data){
			returnAlley.push(rma.tokenize(d));
		}
		return returnAlley;
	})(Pattern);

	console.log(tokenTeststr);
	console.log(tokenPattern[0]);

	console.time("string index");
	let index = Teststr.indexOf(Pattern[1]);
	for(let l in Pattern[1]){
		console.log(Teststr[index+parseInt(l)]);
	}

	console.timeEnd("string index");

	console.log(JSON.stringify(tokenTeststr));

	// console.time("for..in");
	// for(let tTs in tokenTeststr){
	// 	for(let tP in tokenPattern[0]){
	// 		console.time("include");
	// 		if(tokenTeststr[tTs].includes(tokenPattern[0][tP][0])&&tokenTeststr[tTs].includes(tokenPattern[0][tP][1])){
	// 			console.log(tokenTeststr[tTs]);
	// 			console.log(tokenPattern[0][tP]);
	// 		}
	// 		console.timeEnd("include");
	// 	}
	// }
	// console.timeEnd("for..in");

	console.timeEnd("all");







	// const engine = new nodevox.voicevox_engine(voicevox.https,voicevox.address,voicevox.port);
	// const speakerlist = await engine.getspeaker();
	// // speaker id 1 はなんだろうkkkah
	// // ※環境依存？
	// consolejkkkkkkkkkk.log(speakerlist[1]);
	// // クエリ作成
	// const query = new nodevox.query(engine, "テストなのだ", 1);
	// // voice作成
	// await query.getQuery();
	// const voice = await query.getVoice();
	// // 書き出し
	// fs.writeFileSync("./test.wav",Buffer.from(voice));
}

main();