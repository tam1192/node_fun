const datakit = require('./datakit.js');

/**
 * クエリ処理
 * @this {query}
 * @extends {datakit}
 */

module.exports = class extends datakit{
    constructor(instance,data,text){
        super(instance,data);
        this.text = text;
    }

    /** 
     * 音声合成する。 
     * @param {number} speaker 喋る人のID
     * @param {boolean} enable_interrogative_upspeak 疑問系のテキストが与えられたら語尾を自動調整する
     * @returns fetchオブジェクト(中身はwav)
     */

    synthesis = async function(speaker=0,enable_interrogative_upspeak=true){
        const url = this.instance.paramurl('synthesis',{
            'speaker': speaker,
            'enable_interrogative_upspeak': enable_interrogative_upspeak
        });
        const reqinit = {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'accept':'audio/wav',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.data)
        };
        const data = await fetch(url,reqinit).then((data)=>data.arrayBuffer());
        const bin = Buffer.from(data);
        this.instance.emit('build_wav',bin,this.text);
        return bin;
    };
};