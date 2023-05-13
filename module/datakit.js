/**
 * fetchの返り値の処理を共通化
 * @constructor クエリとurlを引き受けます。
 */
class datakit{
    /**
     * @param {object} data  fetchの結果(.then)を渡す。
     * @param {string} instance　元インスタンス
     */
    constructor(instance,data){
        this.data=data;
        this.instance=instance;
    };
    /**
     * クエリをjsonで返す.
     * @returns jsonファイル
     */
    show = () => this.data;
}
module.exports = datakit;