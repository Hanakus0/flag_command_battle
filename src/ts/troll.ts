import Enemy from "./enemy.js";
import { searchLivedcharacterRamdom } from "./lib.js";
import { characters } from "./game.js";
import Message from "./message.js";

/**
 * トロールクラス
 */
class Troll extends Enemy
{
  /**
   * @constructor
   * @param {string} name 味方キャラの名前
   * @param {number} hp 敵キャラのHP
   * @param {number} offense 敵キャラの攻撃力
   * @param {number} speed 敵キャラの速度
   * @param {string} path 敵キャラの画像の場所
   */

  constructor(name: string, hp: number, offense: number, speed: number, path: string)
  {
    super(name, hp, offense, speed, path);
  }

  /**
   * 行動するメソッド
   * @method attack
   * @description 敵キャラのHPが1以上の場合に、攻撃を行う。
   */
  attack()
  {
    // 生存している味方キャラをランダムに選択
    let attackTarget = characters[searchLivedcharacterRamdom("friend")];

    // 攻撃対象の体力から自分の攻撃力(与ダメージ分)を引く
    attackTarget.hp -= this.offense;

    // 攻撃対象の体力が0以下の場合、生存フラグを無効にする
    if(attackTarget.hp <= 0) {
      attackTarget.hp = 0;
    }

    // 攻撃対象が生存していれば攻撃
    if(attackTarget.liveFlag) {
      Message.printMessage(this.name + "が襲いかかってきた<br>" + attackTarget.name + "は" + this.offense + "のダメージを受けた！<br>");
    }
    else {
    Message.printMessage(this.name + "の攻撃・・・<br>" + attackTarget.name + "は倒れている<br>");
    }
  }

}

export default Troll;
