import Enemy from "./enemy.js";
import Message from "./message.js";
import { characters, command } from "./game.js";
import { searchLivedcharacterByType, searchCharacterByName } from "./lib.js";

/**
 * 味方キャラクラス
 */
class Friend {
  /**
   * @constructor
   * @param {string} name 味方キャラの名前
   * @param {string} type 敵味方種別
   * @param {number} maxHp 味方キャラの最大HP
   * @param {number} hp 味方キャラのHP
   * @param {boolean} liveFlag 味方キャラの生存フラグ
   * @param {number} offense 味方キャラの攻撃力
   * @param {number} speed 味方キャラの速度
   * @param {number} herb 味方キャラの薬草(回復アイテム)の数
   * @param {number} herbPower 味方キャラの回復量
   * @param {string} command 味方キャラの選択されたコマンド
   * @param {string} target 味方キャラのターゲット
   */

  public name: string;
  public type: string;
  public maxHp: number;
  public hp: number;
  public liveFlag: boolean;
  public offense: number;
  public speed: number;
  public herb: number;
  public herbPower: number;
  public command: string;
  public target: Enemy | null;

  constructor(name: string, maxHp: number, offense: number, speed: number, herb: number, herbPower: number) {
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
  getMainParameter()
  {
    return "<b>" + this.name + "</b><br>"
            + "体力 " + this.hp + "<br>"
            + "薬草 " + this.herb + "<br>";
  }

  /**
   * 表示用のパラメータを返すメソッド
   * @method getMainParameter
   * @description コマンドビューに表示するコマンド（HTML）を返す
   *              eventが"start"の場合
   *              はじめに表示するコマンド（HTML）を返す
   *              eventに応じて、表示するコマンド（HTML）を返す、
   *              または、味方1人のコマンド選択を終了させる"end"を返す
   * @param {string} event
   * @return {string}
   */
  getCommand(event: string)
  {
    // はじめに表示するコマンド
    if(event === "start") {
      let text = ['<div><b id="friendName">' + this.name + '</b></div>',
                  '<div id="attackCommand">攻撃</div>',
                  '<div id="recoveryCommand">薬草</div>'];
      return text;
    }

    // 選択されたコマンドのidまたはclassを取得する
    if(event.target.id !== "") {
      this.command = event.target.id;
    }
    else {
      this.command = event.target.className;
    }

    // 攻撃コマンドが選択されたとき
    if(this.command === "attackCommand") {
      // 生存している敵の配列（characters配列の要素番号）を取得する
      let livedEnemy = searchLivedcharacterByType("enemy");
      // 生存している敵をコマンドビューに表示するためのHTML
      let livedEnemyHTML = [];

      // 生存している敵をコマンドビューに表示する
      for(let c of livedEnemy) {
        livedEnemyHTML.push('<div class="enemyCommand">' + characters[c].name + '</div>');
      }
      livedEnemyHTML.unshift('<div><b id="friendName">' + this.name + '</b></div>');

      return livedEnemyHTML;
    }
    // 敵が選択されたとき
    else if(this.command === "enemyCommand") {
      // 選択された敵をターゲットとして保存する
      this.target = characters[searchCharacterByName(event.target.innerText)[0]];
      return "end";
    }
    // 薬草コマンドが選択されたとき
    else if(this.command === "recoveryCommand") {
      return "end";
    }
  }

  /**
   * コマンド表示用メソッド
   * @method getMainParameter
   * @description 表示されたコマンドにイベントハンドラを登録する
   * @param {string} event
   * @return {string}
   */
  setEventHandler(event: string)
  {
    // コマンドの初期状態の場合
    if(event === "start") {
      // 攻撃コマンドのイベントハンドラを設定する
      attackCommand.addEventListener("click", command.callback);
      // 回復コマンドのイベントハンドラを設定する
      recoveryCommand.addEventListener("click", command.callback);
    }

    // 攻撃コマンドが選択された場合
    if(this.command === "attackCommand") {
      let element = document.getElementsByClassName("enemyCommand");
      for(let i = 0; i < element.length; ++i) {
        element[i].addEventListener("click", command.callback);
      }
    }
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
    if(this.hp > 0) {
      // 選択されたコマンドに応じた内容で処理
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
    if(this.target.liveFlag) {
      // 敵の体力から攻撃力分(=ダメージ分)を引く
      this.target.hp -= this.offense;

      // 攻撃相手の体力がマイナスになる場合は 0 にする
      if(this.target.hp < 0) {
        this.target.hp = 0;
      }

      // ダメージを与えたことをメッセージに表示する
      Message.printMessage(this.name + "の攻撃<br>" + this.target.name + "に" + this.offense + "のダメージを与えた！<br>");
    } else {
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
    if(this.herb <= 0){
      Message.printMessage(this.name + "は薬草を・・・<br>薬草がない！<br>");
      return;
    }

    // 体力が最大でこれ以上回復できない場合
    if(this.maxHp == this.hp) {
      Message.printMessage(this.name + "は薬草を・・・<br>これ以上回復できない！<br>");
      return;
    }

    // この行動における回復量
    let healAmount: number = this.herbPower;

    // 回復する場合、
    // 回復量が最大HPを超える場合は最大HPまでに合わせる
    if(this.maxHp - this.hp < this.herbPower) {
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
