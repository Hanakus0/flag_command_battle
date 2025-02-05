import Friend from "./friend.js";
import Troll from "./troll.js";
import Dragon from "./dragon.js";
import Message from "./message.js";
import GameManage from "./game_manage.js";
import { searchCharacterByName, searchLivedcharacterByType, searchLivedcharacterRamdom } from "./tool.js";

/* キャラクターをインスタンス化する */
// 味方
let friend1:Friend = new Friend("あれす", 180, 66, 13, 2, 45);
let friend2:Friend = new Friend("なーしゃ", 110, 16, 12, 3, 45);
let friend3:Friend = new Friend("だすてん", 140, 43, 11, 1, 45);
// 敵
let enemy1:Troll = new Troll("トロル", 270, 38, 20, "../image/troll.png");
let enemy2:Dragon = new Dragon("ドラゴン", 380, 68, 6, "../image/dragon.png");

// キャラクター配列をつくる
let characters:any[] = [];
characters.push(friend1);     // 味方
characters.push(friend2);     // 味方
characters.push(friend3);     // 味方
characters.push(enemy1);      // 敵
characters.push(enemy2);      // 敵

// キャラクターの行動を表示する
// for(let c of characters) {
  //   c.action();
  // }
  
  characters[0] = characters[0] as Friend;
  characters[0].command = "enemyCommand";
  characters[0].target = characters[searchCharacterByName("トロル")[0]];
  characters[0].action();
  
  //省略
  characters.push(enemy1);      // 敵
  characters.push(enemy2);      // 敵
  
  // ゲーム管理クラスをインスタンス化する
  let gameManage = new GameManage();
  
  characters[1].command = "enemyCommand";
  characters[1].target = characters[searchCharacterByName("トロル")[0]];
  characters[2].command = "enemyCommand";
  characters[2].target = characters[searchCharacterByName("ドラゴン")[0]];
  characters[3].command = "recoveryCommand";
  

  characters[1].command = "enemyCommand";
  characters[1].target = characters[searchCharacterByName("トロル")[0]];
  characters[2].command = "enemyCommand";
  characters[2].target = characters[searchCharacterByName("ドラゴン")[0]];
  characters[3].command = "recoveryCommand";

  gameManage.battle();
  
  export { characters, gameManage };
