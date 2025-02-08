import Friend from "./friend.js";
import Troll from "./troll.js";
import Dragon from "./dragon.js";
import { searchCharacterByName } from "./lib.js";
import Message from "./message.js";
// import { characters } from "./game.js";

// // キャラクターをインスタンス化する
let friend1 = new Friend("あれす", 180, 66, 13, 2, 45);                   // 味方
let friend2: Friend = new Friend("なーしゃ", 110, 16, 12, 3, 45);                 // 味方
let friend3: Friend = new Friend("だすてん", 140, 43, 11, 1, 45);                 // 味方
let enemy1: Troll = new Troll("トロル", 270, 38, 20, "../image/troll.png");      // 敵
let enemy2: Dragon = new Dragon("ドラゴン", 380, 68, 6, "../image/dragon.png");   // 敵

let characters: (Friend | Troll | Dragon)[] = [];
characters.push(friend1);     // 味方
characters.push(friend2);     // 味方
characters.push(friend3);     // 味方
characters.push(enemy1);      // 敵
characters.push(enemy2);      // 敵

(characters[0] as Friend).command = "enemyCommand";
(characters[0] as any).target = characters[searchCharacterByName("トロル")[0]];
(characters[0] as Friend).action();

export { characters };

/**
 * トロールクラス
 */
class GameManage
{
  /**
   * @constructor
   * @param {
   */
  // コンストラクタ
  constructor()
  {
    // 行動の順番を決める
    this.actionOrder();

    // パラメータを表示する
    this.showParameter();

    // 敵の画像を表示する
    this.showEnemyImage();

    // はじめのメッセージを表示する
    this.showFirstMessage();
  }

  /**
   * 行動の順番を決めるメソッド
   * @method actionOrder  
   * @description 素早さでソートする
   * @return {void}
   */
  actionOrder()
  {
    // 素早さでソートする
    // b > a であれば b を先頭に移動
    characters.sort(
      function (a, b)
      {
        return b.speed - a.speed;
      }
    );
  }

  /**
   * パラメータを表示または更新するメソッド
   * @method showParameter  
   * @description パラメータを表示または更新する
   * @return {void}
   */
  showParameter()
  {
    // パラメータを消去する
    Message.parameterView.innerHTML = "";

    // 味方のパラメータを表示する
    for(let c of characters) {
      if(c.type === "friend") {
        Message.parameterView.innerHTML += '<div class="parameter">' + c.getMainParameter() + '</div>';
      }
    }

    // 敵のパラメータをコンソールに表示する（デバッグ用） 
    for(let c of characters) {
      if(c.type === "enemy" ) {
        console.log(c.name + " " + c.hp);
      }
    }
  }

  /**
   * 敵の画像を表示するメソッド
   * @method showEnemyImage  
   * @description 敵の画像を表示する
   * @return {void}
   */
  showEnemyImage()
  {
    let i = 0;
    for(let c of characters) {
      if(c.type === "enemy" && (c instanceof Dragon || c instanceof Troll)) {
        Message.enemyImageView.innerHTML += '<img id="enemyImage' + characters.indexOf(c) + '" src="' + c.path
        + '" style="position:absolute; left:' + (160 * i++) +'px; bottom: 0px">';
      }
    }
  }

  /**
   * 戦闘開始時のメッセージを表示するメソッド
   * @method showFirstMessage  
   * @description 戦闘開始時のメッセージを表示する
   * @return {void}
   */
  showFirstMessage()
  {
    Message.printMessage("モンスターが現れた<br>");
  }

    // 1ターン
    async battle()
    {
      // 勝敗
      let winLose = "none";
  
      for(let c of characters) {
        // 倒れたキャラクターはスキップする
        if(c.liveFlag === false) {
          continue;
        }
  
        await sleep(900);
  
        // 各キャラクターの行動
        c.action();
  
        await sleep(1100);
  
        // パラメータを更新する
        this.showParameter();
  
        await sleep(900);
  
        // 倒れたキャラクターを処理する
        this.removeDiedcharacter();
  
        await sleep(300);
  
        // 勝敗の判定をする
        winLose = this.jadgeWinLose();
  
        // 決着がついた場合
        if(winLose === "win" || winLose === "lose") {
          return false;
        }
      }
      return true;
    }
}

// export default GameManage;
