//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ドラゴンクラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
import Enemy from "./enemy.js";
import Message from "./message.js";
import { getRandomIntInclusive, searchLivedcharacterRamdom } from "./tool.js";
import { characters } from "./game.js";
class Dragon extends Enemy {
    // コンストラクター
    constructor(name, hp, offense, speed, path) {
        super(name, hp, offense, speed, path);
    }
    // 攻撃メソッド
    attack() {
        // 一定の確率で攻撃をミスする
        if (getRandomIntInclusive(0, 4) === 4) {
            Message.printMessage("ドラゴンは<br>グフッグフッと咳き込んでいる・・・<br>");
            return;
        }
        // 生存している味方をランダムに選択する
        let f = characters[searchLivedcharacterRamdom("friend")];
        // 攻撃対象の体力から、自分の攻撃力を引く
        f.hp -= this.offense;
        // 攻撃相手の体力がマイナスになる場合は0にする
        if (f.hp < 0) {
            f.hp = 0;
        }
        // 攻撃相手が生存していれば攻撃
        if (f.liveFlag) {
            Message.printMessage(this.name + "は炎を吹いた<br>" +
                f.name + "は" + this.offense + "のダメージを受けた！<br>");
        }
        else {
            Message.printMessage(this.name + "の攻撃・・・<br>" + f.name + "は倒れている<br>");
        }
    }
}
export default Dragon;
