// import Enemy from './enemy';
import Message from './message.js';

/**
 * メッセージクラス
 * コマンドバトルのメッセージ表示に関するクラス
 * @constructor
**/
class Friend {
  // プロパティ
  name: string;            // 名前
  type: string;            // 敵味方種別
  maxHp: number;          // 最大体力
  hp: number;             // 体力
  liveFlag: boolean;      // 生存フラグ
  offense: number;        // 攻撃力
  speed: number;          // 素早さ
  herb: number;            // 薬草
  herbPower: number;      // 薬草の回復力
  command: string;        // 選択されたコマンド
  // target: Friend | Enemy;  // stringからFriend | Enemyに変更
  target: any;

  // コンストラクタ
  constructor(name: string, maxHp: number, offense: number, speed: number, herb: number, herbPower: number) {
    this.name = name;            // 名前
    this.type = "friend";        // 敵味方種別
    this.maxHp = maxHp;          // 最大体力
    this.hp = maxHp;             // 体力
    this.liveFlag = true;        // 生存フラグ
    this.offense = offense;      // 攻撃力
    this.speed = speed;          // 素早さ
    this.herb = herb;            // 薬草
    this.herbPower = herbPower;  // 薬草の回復力

    this.command = "";           // 選択されたコマンド
    this.target = null;    // 初期値をnullに
  }

  // 行動する
  action()
  {
    if(this.hp > 0) {
      // コマンドに応じた処理を行う
      switch(this.command) {
        // 攻撃
        case "enemyCommand":
          this.attack();
          break;
        // 回復
        case "recoveryCommand":
          this.recovery();
          break;
        default:
          Message.printMessage(this.name + "はボーッとした<br>");
      }
    }
  }

  // 攻撃する
  attack()
  {
    // 攻撃相手が生存していれば攻撃する
    if(this.target.liveFlag) {
      // 敵の体力から、自分の攻撃力を引く
      this.target.hp -= this.offense;

      // 攻撃相手の体力がマイナスになる場合は、0にする
      if(this.target.hp < 0) {
        this.target.hp = 0;
      }
      Message.printMessage(this.name + "の攻撃<br>" + this.target.name + "に" + this.offense + "のダメージを与えた！<br>");
    }
    else {
      Message.printMessage(this.name + "の攻撃・・・<br>" + this.target.name + "は倒れている<br>");
    }
  }

  // 回復する
  recovery()
  {
    // 薬草がない場合
    if(this.herb <= 0) {
      Message.printMessage(this.name + "は薬草を・・・<br>薬草がない！<br>");
      return;
    }

    // 体力が最大体力の場合
    if(this.maxHp == this.hp) {
      Message.printMessage(this.name + "は薬草を・・・<br>これ以上回復できない！<br>");
      return;
    }
		
    // 回復する値
    let heal = this.herbPower;

    // 最大体力を超えて回復してしまいそうな場合
    if(this.maxHp - this.hp < this.herbPower) {
      heal = this.maxHp - this.hp;
    }

    // 体力を回復する
    this.hp += heal;

    // 薬草をひとつ減らす
    --this.herb;

    Message.printMessage(this.name + "は薬草を飲んだ<br>体力が" + heal + "回復した！<br>");
  }
}

export default Friend;
