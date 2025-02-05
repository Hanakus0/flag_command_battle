//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// トロルクラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import Enemy from "./enemy.js";
import { searchLivedcharacterRamdom } from "./tool.js";
import Message from "./message.js";
import { characters } from "./game.js";
class Troll extends Enemy
{
  // コンストラクタ
  constructor(name: string, hp: number, offense: number, speed: number, path: string)
  {
    super(name, hp, offense, speed, path);
  }

  // 攻撃メソッド
  attack()
  {
    // 生存している味方をランダムに選択する
    let f = characters[searchLivedcharacterRamdom("friend")];

    // 攻撃対象の体力から、自分の攻撃力を引く
    f.hp -= this.offense;

    // 攻撃相手の体力がマイナスになる場合は0にする
    if(f.hp < 0) {
      f.hp = 0;
    }

    // 攻撃相手が生存していれば攻撃
    if(f.liveFlag) {
      Message.printMessage(this.name + "が襲いかかってきた<br>" + f.name + "は" + this.offense + "のダメージを受けた！<br>");
    }
    else {
      Message.printMessage(this.name + "の攻撃・・・<br>" + f.name + "は倒れている<br>");
    }
  }
}

export default Troll;
