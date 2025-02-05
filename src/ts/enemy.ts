import Message from './message.js';
import { characters } from './game.js';

/**
 * 敵キャラクラス
 * @constructor
**/
abstract class Enemy {
  // プロパティ
  name: string;            // 名前
  type: string;            // 敵味方種別
  hp: number;             // 体力
  liveFlag: boolean;      // 生存フラグ
  offense: number;        // 攻撃力
  speed: number;          // 素早さ
  path: string;        // 画像の場所

  // コンストラクタ
  constructor(name: string, hp: number, offense: number, speed: number, path: string)
  {
    this.name = name;        // 名前
    this.type = "enemy";     // 敵味方種別
    this.hp = hp;            // 体力
    this.liveFlag = true;    // 生存フラグ
    this.offense = offense;  // 攻撃力
    this.speed = speed;      // 素早さ
    this.path = path;        // 画像の場所
  }

  /* 行動する */
  action(): void
  {
    if(this.hp > 0) {
      this.attack();
    }
  }

  abstract attack(): void;
}

export default Enemy;
