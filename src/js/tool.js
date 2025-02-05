import { characters } from "./game.js";
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// characters配列関連
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 種別（type）で指定されたキャラクターが、全滅しているか調べる
function isAliveByType(type) {
    for (let c of characters) {
        // 1人でも生存していればtrueを返す
        if (c.type === type && c.liveFlag === true) {
            return true;
        }
    }
    // 全滅しているときはfalseを返す
    return false;
}
// 名前でキャラクターを探索し、配列の要素番号を返す
function searchCharacterByName(name) {
    // 探索した配列の要素番号
    let characterElementNum = [];
    // 指定されたキャラクターを探す
    let i = 0;
    for (let c of characters) {
        if (c.name === name) {
            characterElementNum.push(i);
        }
        ++i;
    }
    return characterElementNum;
}
// 種別（type）で指定された生存しているキャラクターを探し、配列の要素番号を返す
function searchLivedcharacterByType(type) {
    // 種別（type）で指定された生存しているキャラクター配列の要素番号
    let characterElementNum = [];
    // 種別（type）で指定された生存しているキャラクターを探す
    let i = 0;
    for (let c of characters) {
        if (c.type === type && c.liveFlag === true) {
            characterElementNum.push(i);
        }
        ++i;
    }
    return characterElementNum;
}
// 種別（type）で指定された生存しているキャラクターの要素番号をランダムで返す
function searchLivedcharacterRamdom(type) {
    // 生存しているキャラクターを探して、その要素番号を配列に詰める
    let livedcharacter = searchLivedcharacterByType(type);
    // 生存しているキャラクターのなかからランダムで1人選ぶ
    let randomValue = getRandomIntInclusive(0, livedcharacter.length - 1);
    return livedcharacter[randomValue];
}
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ツール
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// minからmaxまでのランダムな整数を返す
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// msミリ秒スリープする
function sleep(ms) {
    return new Promise(function (resolve) {
        // msミリ秒スリープする
        setTimeout(resolve, ms);
    });
}
export { getRandomIntInclusive, isAliveByType, searchCharacterByName, searchLivedcharacterByType, searchLivedcharacterRamdom, sleep };
