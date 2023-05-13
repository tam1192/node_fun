const EventEmitter = require('events');
const query = require("./query");
const speaker = require("./speaker");

module.exports = class extends EventEmitter{

    /**
     * voxインスタンスを生成
     * @param {string} address ipアドレス・ドメインetc...
     * @param {number} port ポート番号
     * @param {boolean} https trueでhttps
     * @returns 
     */
    constructor(address='',port=50021,https=false)
    {
        super();
        const proto = https ? 'https://' : 'http://';
        this.url = proto + address + ":" + port;
        return this;
    }

    /**
     * urlにオプション付けて返す。
     * @param {string} アドレス（コマンド）
     * @param {dict} パラメーターを書いた辞書
     * @returns 
     */
    paramurl = (address='/',parameter={}) => {
        return this.url + '/' + address + '?' + new URLSearchParams(parameter)
    }

    /**
     * クエリ作成
     * @param {string} text 本文
     * @param {number} speaker 話す人
     * @returns queryインスタンス
     */
    audio_query = async function(text='',speaker=0){
        const url = this.paramurl('audio_query',{
            'text':text,
            'speaker':speaker
        });
        const reqinit = {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept':'application/json'
            }
        }
        const req = await fetch(url,reqinit).catch(()=>{
            return undefined;
        });
        if(typeof(req) != "object"){
            this.emit("err","audio_query","server error");
            return undefined
        }else if(req.ok){
            const data = await req.json();
            this.emit("build_query", data, text);
            return new query(this, data, text);
        }else{
            this.emit("err","audio_query",req.statusText);
            return undefined;
        }
    }
    
    synthesis = async function(text='',speaker=0){
        const q = await this.audio_query(text,speaker);
        if(typeof(q) == "object"){
            return await q.synthesis(speaker);
        }
    }
}