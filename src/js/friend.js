import Message from "./message.js";
/**
 * 味方キャラクラス
 */
class Friend {
    constructor(name, maxHp, offense, speed, herb, herbPower) {
        this.name = name;
        this.type = "friend";
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.liveFlag = true;
        this.offense = offense;
        this.speed = speed;
        this.herb = herb;
        this.herbPower = herbPower;
        this.command = "";
        this.target = null;
    }
    /**
     * 表示用のパラメータを返すメソッド
     * @method getMainParameter
     * @description パラメータを表示
     * @return {string}
     */
    getMainParameter() {
        return "<b>" + this.name + "</b><br>"
            + "体力 " + this.hp + "<br>"
            + "薬草 " + this.herb + "<br>";
    }
    /**
     * 行動するメソッド
     * @method action
     * @description 味方キャラのHPが1以上の場合に、選択されたコマンドに応じて行動を実行する。
     * - HPが0以下の場合は行動しない。
     * - コマンドに応じて攻撃または回復を行う。
     * - それ以外のコマンドの場合は、キャラがボーッとしているメッセージを表示する。
     */
    action() {
        // 味方キャラのHPが0より大きい場合に行動する
        if (this.hp > 0) {
            // 選択されたコマンドに応じた内容で処理
            switch (this.command) {
                // 攻撃
                case "enemyCommand":
                    this.attack();
                    break;
                // 回復
                case "recoveryCommand":
                    this.recovery();
                    break;
                default:
                    Message.printMessage(this.name + "はボーッとした…<br>");
            }
        }
    }
    /**
     * 攻撃するメソッド
     * @method attack
     * @description 敵キャラの生存フラグに応じて攻撃をする。
     * - 敵キャラが生存している場合は敵の体力から攻撃力分(=ダメージ分)を引く。
     * - 敵キャラが死亡している場合はメッセージを表示する。
     */
    attack() {
        // targetがnullでないことを確認
        if (!this.target) {
            Message.printMessage(this.name + "の攻撃・・・<br>対象が選択されていません<br>");
            return;
        }
        // 敵キャラが生存している場合に攻撃する
        if (this.target.liveFlag) {
            // 敵の体力から攻撃力分(=ダメージ分)を引く
            this.target.hp -= this.offense;
            // 攻撃相手の体力がマイナスになる場合は 0 にする
            if (this.target.hp < 0) {
                this.target.hp = 0;
            }
            // ダメージを与えたことをメッセージに表示する
            Message.printMessage(this.name + "の攻撃<br>" + this.target.name + "に" + this.offense + "のダメージを与えた！<br>");
        }
        else {
            // 敵キャラが死亡している場合はメッセージを表示する
            Message.printMessage(this.name + "の攻撃・・・<br>" + this.target.name + "は倒れている<br>");
        }
    }
    /**
     * 回復するメソッド
     * @method recovery
     * @description 味方キャラのHPが1以上の場合に、回復を行う。
     * - 回復量は味方キャラの回復力である。
     * - 回復後のHPは味方キャラの最大HPを超えない。
     */
    recovery() {
        // 薬草がない場合
        // メッセージを表示して処理を終了
        if (this.herb <= 0) {
            Message.printMessage(this.name + "は薬草を・・・<br>薬草がない！<br>");
            return;
        }
        // 体力が最大でこれ以上回復できない場合
        if (this.maxHp == this.hp) {
            Message.printMessage(this.name + "は薬草を・・・<br>これ以上回復できない！<br>");
            return;
        }
        // この行動における回復量
        let healAmount = this.herbPower;
        // 回復する場合、
        // 回復量が最大HPを超える場合は最大HPまでに合わせる
        if (this.maxHp - this.hp < this.herbPower) {
            healAmount = this.maxHp - this.hp;
        }
        // 体力を回復する
        this.hp += healAmount;
        // 薬草を1減らす
        --this.herb;
        // 回復したことをメッセージに表示する
        Message.printMessage(this.name + "は薬草を飲んだ<br>体力が" + healAmount + "回復した！<br>");
    }
}
export default Friend;
