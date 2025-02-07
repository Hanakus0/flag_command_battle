/**
 * 味方キャラクラス
 */
abstract class Enemy
{
    /**
   * @constructor
   * @param {string} name 味方キャラの名前
   * @param {string} type 敵味方種別
   * @param {number} hp 敵キャラのHP
   * @param {boolean} liveFlag 敵キャラの生存フラグ
   * @param {number} offense 敵キャラの攻撃力
   */
  public name: string;
  public type: string;
  // public maxHp: number;
  public hp: number;
  public liveFlag: boolean;
  public offense: number;
  public speed: number;
  public path: string;

  constructor(name: string, hp: number, offense: number, speed: number, path: string)
  {
    this.name = name;        // 名前
    this.type = "enemy";     // 敵味方種別
    this.hp = hp;            // 体力
    this.liveFlag = true;    // 生存フラグ
    this.offense = offense;  // 攻撃力
    this.speed = speed;      // 素早さ
    this.path = path         // 画像の場所
  }

  /**
   * 行動するメソッド
   * @method action
   * @description 敵キャラのHPが1以上の場合に、攻撃を行う。
   */
  action()
  {
    if(this.hp > 0) {
      this.attack();
    }
  }

  /**
   * 攻撃メソッド
   * @abstract
   */
  abstract attack(): void;
}

export default Enemy;
