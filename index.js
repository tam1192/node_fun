// fetchAPIを使う
// voicevox = http://localhost:50021/

const fs = require("node:fs");
const vox = require("./module/vox");
const config = require("./config.json");

const voicevox = new vox(config.ServerAddress,config.ServerPort,config.ServerHTTPS);

voicevox.on("build_query",(query,text)=>{
    console.group("query完成");
    console.info(text);
    console.debug(query);
    console.groupEnd();
});

voicevox.on("build_wav",(data,text)=>{
    fs.writeFileSync("./"+text+".wav",data);
    console.group("音声完成");
    console.info(text)
    console.groupEnd();
});

voicevox.on("err",(x,y)=>{
    console.error("発生個所:",x);
    console.debug("ステータスコード:",y);
})

async function say(str=""){
    // const que = await (await voicevox.audio_query(str,1)).synthesis(1,true);
    await voicevox.synthesis(str,1);
}

console.clear();
say("こんにちは、僕ずんだもん！");
// say("東北ばんざい！");
// say("ずんこのふとももはもっちもち");
// say("私はスパムが大っ嫌いなのよ");
// say("あかねちゃんかわいいやったー");