import Friend from "./friend.js";
import Troll from "./troll.js";
import Dragon from "./dragon.js";
import Message from "./message.js";
import { characters } from "./game.js";
/**
 * ゲームの進行管理クラス
 */
class GameManage
{
  /**
   * @constructor
   * @param {void}
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
    for(let character of characters) {
      if(character instanceof Friend) {
        Message.parameterView.innerHTML += '<div class="parameter">' + character.getMainParameter() + '</div>';
      }
    }

    // 敵のパラメータをコンソールに表示する（デバッグ用）
    for(let character of characters) {
      if(character instanceof Troll || character instanceof Dragon) {
        console.log(character.name + " " + character.hp);
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
    for(let character of characters) {
      if(character.type === "enemy" && (character instanceof Dragon || character instanceof Troll)) {
        Message.enemyImageView.innerHTML += '<img id="enemyImage' + characters.indexOf(character) + '" src="' + character.path
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

  /**
   * 処理待機するメソッド
   * @method sleep
   * @description 指定時間分待機
   * @return {boolean}
   */
  sleep(ms: number): Promise<void>
  {
    return new Promise(
      function(resolve)
      {
        // msミリ秒スリープする
        setTimeout(resolve, ms);
      }
    );
  }

  /**
   * 各ターンに走らせるメソッド
   * @method battle
   * @description ・毎ターンのゲーム続行可否の判定をする
   *               ・`async`のためbooleanで返される
   * @return {boolean}
   */
  async battle()
  {
    // 勝敗の判定
    let winLose = "none";

    // 倒れたキャラクターは行動不可
    for(let character of characters) {
      if(character.liveFlag === false) {
        continue;
      }

      await this.sleep(900);

      // 各キャラクターの行動
      character.action();

      await this.sleep(1100);

      // パラメータを更新する
      this.showParameter();

      await this.sleep(900);

      // 倒れたキャラクターを処理する
      this.removeDiedcharacter();

      await this.sleep(300);

      // 勝敗の判定をする
      winLose = this.jadgeWinLose();

      // 決着がついた場合
      if(winLose === "win" || winLose === "lose") {
        return false;
      }
    }
    return true;
  }

  /**
   * 倒れたキャラクターを処理するメソッド
   * @method removeDiedcharacter
   * @description 倒れた敵の画像を除く
   * @return {void}
   */
  removeDiedcharacter()
  {
    for(let character of characters) {
      if(character.hp <= 0 && character.liveFlag === true) {

        Message.addMessage(character.name + "は倒れた<br>");
        // 生存フラグを落とす
        character.liveFlag = false;

        // 敵の場合は画像を削除
        if(character.type === "enemy") {
          let enemyImage = document.getElementById("enemyImage" + characters.indexOf(character)) as HTMLImageElement;
          enemyImage.remove();
        }
      }
    }
  }

    /**
   * 勝敗を決定するメソッド
   * @method jadgeWinLose
   * @description ゲームの勝ち負けを判定する処理
   * @return {void}
   */
  // 種別（type）で指定されたキャラクターが、全滅しているか調べる
  isAliveByType(type: string): boolean
  {
    for(let character of characters) {
      // 1人でも生存していればtrueを返す
      if(character.type === type && character.liveFlag === true) {
        return true;
      }
    }
    // 全滅しているときはfalseを返す
    return false;
  }

  /**
   * 勝敗を決定するメソッド
   * @method jadgeWinLose
   * @description ゲームの勝ち負けを判定する処理
   * @return {void}
   */
  jadgeWinLose()
  {
    // 味方が残っていない場合
    if(!this.isAliveByType("friend")) {
      Message.addMessage("全滅しました・・・<br>");
      return "lose";
    }

    // 敵が残っていない場合
    if(!this.isAliveByType("enemy")) {
      Message.addMessage("モンスターをやっつけた<br>");
      return "win";
    }

    return "none";
  }
}

export default GameManage;
