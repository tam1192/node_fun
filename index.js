"use strict";

const voicevoxAPI = require('./modules/voicevoxAPI');
const {voicevox} = require('./config.json');
const fs = require('fs');

async function main() {
	const engine = new voicevoxAPI.voicevox_engine(voicevox.https,voicevox.address,voicevox.port);
	const speakerlist = await engine.getspeaker();
	console.log(speakerlist[1]);
	const query = new voicevoxAPI.query(engine, "テストなのだ", 1);
	await query.getQuery();
	const voice = await query.getVoice();

	fs.writeFileSync("./test.wav",Buffer.from(voice));
}

main();