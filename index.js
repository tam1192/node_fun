// fetchAPIを使う
// voicevox = http://localhost:50021/

const ServerHTTPS=false;
const ServerAddress='localhost';
const ServerPort=50021;
// const url="https://www.google.com/"

// fetch(url)
//     .then((res) => res.text() )
//     .then((data) => console.log(data));

//さらに細かく
// async function postdata(url='',data={})
// {
//     const res = await fetch(url, {
//         method: 'POST',
//         cache: 'no-cache',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })    
//     return res.json();
// }

// postdata(url)
//     .then((data) => {
//         console.log(data);
//     });

class vox{
    constructor(address=ServerAddress,port=ServerPort,https=ServerHTTPS)
    {
        proto = https ? 'https://' : 'http://';
        this.#url = proto + address + toString(port);
    }
    get_speakers = ()=>
    {

    }
    audio_query = ()=>
    {

    }
}
/**
 * クエリクラスを作成
 * @constructor クエリとurlを引き受けます。
 * @this {query}
 */
class query{
    /**
     * クエリを引き受ける
     * @param {string} url サーバーのアドレス
     * @param {object} query クエリ
     */
    constructor(url,query={}){
        self.query=query;
        self.url=url;
    };
    /** 
     * 音声合成する。 
     * @param {number} speaker 喋る人のID
     * @param {boolean} enable_interrogative_upspeak 疑問系のテキストが与えられたら語尾を自動調整する
     * @returns fetchオブジェクト(中身はwav)
     */
    synthesis = async function(speaker=0,enable_interrogative_upspeak=true){
        const url = self.url + '/synthesis?' + new URLSearchParams({
            speaker: speaker,
            enable_interrogative_upspeak: enable_interrogative_upspeak
        });
        const reqinit = {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'accept':'application/wav',
                'Content-Type':'application/json'
            },
            body: self.query.json()
        };
        console.debug("音声生成中");
        return await fetch(url,reqinit);
    };
    //以下クエリ関係の処理を書く
};
class speaker{
    constructor(url,query={}){
       self.query=query;// 
       self.url=url;
    }
    id_name = (id=0) => {

    }
}