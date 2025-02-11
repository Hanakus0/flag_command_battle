import Enemy from "./enemy.js";
import { getRandomIntInclusive, searchLivedcharacterRamdom } from "./lib.js";
import { characters } from "./game.js";
import Message from "./message.js";
/**
 * ドラゴンクラス
 */
class Dragon extends Enemy
{
    /**
   * @constructor
   * @param {string} name 味方キャラの名前
   * @param {number} hp 敵キャラのHP
   * @param {number} offense 敵キャラの攻撃力
   * @param {number} speed 敵キャラの速度
   * @param {string} path 敵キャラの画像の場所
   */
  // コンストラクター
  constructor(name: string, hp: number, offense: number, speed: number, path: string)
  {
    super(name, hp, offense, speed, path);
  }

  // 攻撃メソッド
  attack()
  {
    // 一定の確率で攻撃をミスする
    if(getRandomIntInclusive(0, 4) === 4) {
      Message.printMessage("ドラゴンは<br>グフッグフッと咳き込んでいる・・・<br>");
      return;
    }

    // 生存している味方をランダムに選択する
    let attackTarget = characters[searchLivedcharacterRamdom("friend")];

    // 攻撃対象の体力から、自分の攻撃力を引く
    attackTarget.hp -= this.offense;

    // 攻撃相手の体力がマイナスになる場合は0にする
    if(attackTarget.hp < 0) {
      attackTarget.hp = 0;
    }

    // 攻撃相手が生存していれば攻撃
    if(attackTarget.liveFlag) {	
      Message.printMessage(this.name + "は炎を吹いた<br>" + attackTarget.name + "は" + this.offense + "のダメージを受けた！<br>");
    }
    else {
      Message.printMessage(this.name + "の攻撃・・・<br>" + attackTarget.name + "は倒れている<br>");
    }
  }
}

export default Dragon;
