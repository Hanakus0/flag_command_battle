import { characters } from "./game.js";

/**
 * @description minからmaxまでのランダムな整数を返す
 * @param {number} min - 最小値
 * @param {number} max - 最大値
 * @return {number} ランダムな整数を返す
 */
function getRandomIntInclusive(min: number, max: number)
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @description 味方または敵が全滅しているか調べる
 * @param {string} type - 種別
 * @return {boolean} 真偽値を返す
 */
function isAliveByType(type: string)
{
  for(let c of characters) {
    // 一人でも生存していればtrueを返す
    if(c.type === type && c.liveFlag) {
      return true;
    }
  }
  // 全滅していればfalse
  return false;
}

/**
 * @description 名前でキャラクターを探索し、配列の要素番号を返す
 * @param {string} name - 名前
 * @return {number[]} 配列の要素番号を返す
 */
function searchCharacterByName(name: string)
{
  // 探索した配列の要素番号
  let characterElementNum = [];

  // 指定されたキャラクターを探す
  let i = 0;
  for(let c of characters) {
    if(c.name === name) {
      characterElementNum.push(i);
    }
    ++i;
  }

  return characterElementNum;
}

/* 
 * @description 種別（type）で指定された生存しているキャラクターを探し、配列の要素番号を返す
 * @param {string} type - 種別
 * @return {number[]} 配列の要素番号を返す
*/
function searchLivedcharacterByType(type: string)
{
  // 種別（type）で指定された生存しているキャラクター配列の要素番号
  let characterElementNum = [];

  // 種別（type）で指定された生存しているキャラクターを探す
  let i = 0;
  for(let c of characters) {
    if(c.type === type && c.liveFlag) {
      characterElementNum.push(i);
    }
    ++i;
  }

  return characterElementNum;
}

/* 
 * @description 種別（type）で指定された生存しているキャラクターの要素番号をランダムで返す
 * @param {string} type - 種別
 * @return {number} 生存しているキャラクターの要素番号を返す
*/
function searchLivedcharacterRamdom(type: string)
{
  // 生存しているキャラクターを探して、その要素番号を配列に詰める
  let livedcharacter = searchLivedcharacterByType(type)
	
  // 生存しているキャラクターのなかからランダムで1人選ぶ
  let randomValue = getRandomIntInclusive(0, livedcharacter.length - 1);

  return livedcharacter[randomValue];
}

export { getRandomIntInclusive, isAliveByType, searchCharacterByName, searchLivedcharacterByType, searchLivedcharacterRamdom };
