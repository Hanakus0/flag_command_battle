import { characters } from "./game.js";
import { isAliveByType } from "./tool.js";
import Message from "./message.js";
import { sleep } from "./tool.js";

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ゲーム管理クラス
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
class GameManage
{
  parameterView: HTMLElement; 
  enemyImageView: HTMLElement;

  // コンストラクタ
  constructor()
  {
    this.parameterView = document.getElementById("parameterView") as HTMLElement;
    this.enemyImageView = document.getElementById("enemyImageView") as HTMLElement;
  }

  // 行動の順番を決める
  actionOrder()
  {
    // 素早さでソートする
    characters.sort(
      function (a, b)
      {
        return b.speed - a.speed;
      }
    );
  }

  // パラメータを表示または更新する
  showParameter()
  {
    // パラメータを消去する
    this.parameterView.innerHTML = "";

    // 味方のパラメータを表示する
    for(let c of characters) {
      if(c.type === "friend") {
        this.parameterView.innerHTML += '<div class="parameter">' + c.getMainParameter() + '</div>';
      }
    }

    // 敵のパラメータをコンソールに表示する（デバッグ用） 
    for(let c of characters) {
      if(c.type === "enemy" ) {
        console.log(c.name + " " + c.hp);
      }
    }
  }

  // 敵の画像を表示する
  showEnemyImage()
  {
    let i = 0;
    for(let c of characters) {
      if(c.type === "enemy") {
        this.enemyImageView.innerHTML += '<img id="enemyImage' + characters.indexOf(c) + '" src="' + c.path
        + '" style="position:absolute; left:' + (160 * i++) +'px; bottom: 0px">';
      }
    }
  }

  // 戦闘開始時のメッセージを表示する
  showFirstMessage()
  {
    Message.printMessage("モンスターが現れた<br>");
  }

  // 倒れたキャラクターを処理する
  // 倒れたキャラクターを処理する
  removeDiedcharacter()
  {
    for(let c of characters) {
      if(c.hp <= 0 && c.liveFlag === true) {

        Message.addMessage(c.name + "は倒れた<br>");
        // 生存フラグを落とす
        c.liveFlag = false;

        // 敵の場合は画像を削除
        if(c.type === "enemy") {
          document.getElementById("enemyImage" + characters.indexOf(c))?.remove();
        }
      }
    }
  }

  // 勝敗の判定をする
  jadgeWinLose()
  {
    // 味方が残っていなければゲームオーバー
    if(! isAliveByType("friend")) {
      Message.addMessage("全滅しました・・・<br>");
      return "lose";
    }

    // 敵が残っていなければ勝利
    if(! isAliveByType("enemy")) {
      Message.addMessage("モンスターをやっつけた<br>");
      return "win";
    }

    return "none";
  }

  // 1ターンの処理
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

export default GameManage;
