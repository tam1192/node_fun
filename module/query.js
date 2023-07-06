const datakit = require('./datakit.js');
const fs = require('fs');

/**
 * クエリ処理
 * @this {query}
 * @extends {datakit}
 */

module.exports = class extends datakit{
    constructor(instance,text)
    {
        super(instance);
        this.text = text;
    }

    audio_query = async function (speaker){
        const url = this.instance.paramurl('audio_query',{
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

        if(typeof(req) != "object")
        {
            this.emit("err","audio_query","server error");
            return undefined
        }
        else if(req.ok)
        {
            const data = await req.json();
            this.emit("build_query", data, text);
            this.query = data;
        }
        else
        {
            this.emit("err","audio_query",req.statusText);
            return undefined;
        }
    }
    /** 
     * 音声合成する。 
     * @param {number} speaker 喋る人のID
     * @param {boolean} enable_interrogative_upspeak 疑問系のテキストが与えられたら語尾を自動調整する
     * @returns fetchオブジェクト(中身はwav)
     */
    synthesis = async function( speaker=0, enable_interrogative_upspeak=true, body=this.data, text=this.text)
    {
        const url = this.instance.paramurl('synthesis',
        {
            'speaker': speaker,
            'enable_interrogative_upspeak': enable_interrogative_upspeak
        });

        const reqinit = {
            method: 'POST',
            cache: 'no-cache',
            headers:  //ヘッダー
            {
                'accept':'audio/wav',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body) //クエリ
        }

        const data = await fetch(url,reqinit).then((data)=>data.arrayBuffer());
        const bin = Buffer.from(data);
        fs.writeFileSync(this.instance.exportdir + text + ".wav",bin);
        this.instance.emit('build_wav',text);
    }

    /**
     * kana分割して出力
     * @param {number} speaker 喋る人のID
     * @param {boolean} enable_interrogative_upspeak 疑問系のテキストが与えられたら語尾を自動調整する
     * @param {boolean} skip 重複している場合はスキップする。
     */
    kana = async function (speaker,enable_interrogative_upspeak,skip) 
    {
        const x = [];

        for (let i=0;i < this.data.accent_phrases.length;i++)
        {
            const y = await this.data.kana.split(/[、/]/)[i].toString();
            x.push({
                "accent_phrases": [ this.data.accent_phrases[i] ],
                "speedScale": 1,
                "pitchScale": 0,
                "intonationScale": 1,
                "volumeScale": 1,
                "prePhonemeLength": 0.1,
                "postPhonemeLength": 0.1,
                "outputSamplingRate": 24000,
                "outputStereo": false,
                "kana": y
            });
        }

        for(const data of x)
        {
            const filename = speaker + "_" + data.kana;
                if (fs.existsSync(this.instance.exportdir + filename + ".wav") && skip)
                {
                    fs.existsSync
                    this.instance.emit('build_wav',filename);
                }
                else
                {
                    await this.synthesis(speaker,enable_interrogative_upspeak,data,filename);
                }
        }
    }
};