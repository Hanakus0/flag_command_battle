import Friend from "./friend.js";
import Troll from "./troll.js";
import Dragon from "./dragon.js";
import { searchCharacterByName } from "./lib.js";
import Command from "./command.js";
import GameManage from "./game_manage.js";


const ENEMY_IMAGES: string[] = [
  "./../src/images/troll.png",
  "./../src/images/dragon.png"
];

// // キャラクターをインスタンス化する
let friend1 = new Friend("あれす", 180, 66, 13, 2, 45);                   // 味方
let friend2: Friend = new Friend("なーしゃ", 110, 16, 12, 3, 45);                 // 味方
let friend3: Friend = new Friend("だすてん", 140, 43, 11, 1, 45);                 // 味方
let enemy1: Troll = new Troll("トロル", 270, 38, 20, ENEMY_IMAGES[0]);      // 敵
let enemy2: Dragon = new Dragon("ドラゴン", 380, 68, 6, ENEMY_IMAGES[1]);   // 敵

let characters: (Friend | Troll | Dragon)[] = [];
characters.push(friend1);     // 味方
characters.push(friend2);     // 味方
characters.push(friend3);     // 味方
characters.push(enemy1);      // 敵
characters.push(enemy2);      // 敵

// ゲーム管理クラスをインスタンス化する
let gameManage = new GameManage();

// コマンドクラスをインスタンス化する
let command = new Command();

// コマンド選択の準備を整える
command.preparation();

// export default GameManage;
export { characters, command, gameManage };
