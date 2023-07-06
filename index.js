"use strict";

const nodevox = require('./modules/node-voicevox');
const {voicevox} = require('./config.json');
const fs = require('fs');

async function main() {
	const engine = new nodevox.voicevox_engine(voicevox.https,voicevox.address,voicevox.port);
	const speakerlist = await engine.getspeaker();
	// speaker id 1 はなんだろう
	// ※環境依存？
	console.log(speakerlist[1]);
	// クエリ作成
	const query = new nodevox.query(engine, "テストなのだ", 1);
	// voice作成
	await query.getQuery();
	const voice = await query.getVoice();
	// 書き出し
	fs.writeFileSync("./test.wav",Buffer.from(voice));
}

main();