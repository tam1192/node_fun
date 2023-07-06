// fetchAPIを使う
// voicevox = http://localhost:50021/

const vox = require("./module/vox");
const config = require("./config.json");

const voicevox = new vox(config.ServerAddress,config.ServerPort,config.ServerHTTPS,config.exportdir);

// voicevox.on("build_query",(text)=>
// {
//     console.group("query完成");
//     console.info(text);
//     console.groupEnd();
// });

voicevox.on("build_wav",(text)=>
{
    console.group("音声完成");
    console.info(text)
    console.groupEnd();
});

voicevox.on("err",(x,y)=>
{
    console.error("発生個所:",x);
    console.debug("ステータスコード:",y);
})

voicevox.synthesis("草風呂入ってから向かうわ", 1, true) ;