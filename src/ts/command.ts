import { characters, command, gameManage } from "./game.js";
import Message from "./message.js";
import Friend from "./friend.js";

/**
 * コマンド管理クラス
 */
class Command
{
  private friendElementNum: number[];  // 配列の型を定義
  private current: number;             // 現在の選択中の味方の番号

  /**
   * @constructor
   * @param {void}
   */
  // コンストラクタ
  constructor()
  {
    // コマンドを実行する味方
    this.friendElementNum = [];
    // 何人目の味方がコマンド選択中か（0が1人目）
    this.current = 0;
  }

    /**
   * コマンド入力の準備メソッド
   * @method actionOrder
   * @description コマンド入力の準備をする
   * @return {void}
   */
  preparation()
  {
    // コマンドを実行する味方の配列を空にする
    this.friendElementNum.splice(0);

    // コマンドを選択する味方を配列に詰める
    for(let c of characters) {
      if(c.type === "friend" && c.liveFlag === true) {
        this.friendElementNum.push(characters.indexOf(c));
      }
    }

    // 味方のコマンドを取得する
    let text = (characters[this.friendElementNum[this.current]] as Friend).getCommand("start");

    // コマンドを表示する
    this.showCommand(text);

    // イベントハンドラを登録する
    (characters[this.friendElementNum[this.current]] as Friend).setEventHandler("start");
  }

  // コマンドを表示する
  showCommand(commands: string[])
  {
    Message.commandView.innerHTML = commands.join("");
  }

  // 
  callback(event: Event)
  {
    // 味方のコマンド選択
    let result = command.commandTurn(event)

    // 味方全員のコマンド選択が終わった場合
    if(result) {
      // 戦闘開始
      let promise = gameManage.battle();

      // gameManage.battle()が終了したときに実行される
      promise.then(
        // boolは、gameManage.battle()の戻り値
        function(bool)
        {
          // 戦闘が終了していない場合、コマンドを表示する
          if(bool) {
            command.preparation();
          }
        }
      );
    }
  }

  // 味方全員のコマンド選択が終わったらtrueを返す
  commandTurn(event: Event)
  {
    // 味方1人のコマンドを取得する
    let result = (characters[this.friendElementNum[this.current]] as Friend).getCommand(event);

    // 味方1人のコマンド入力が終わりの場合
    if (result === "end") {
      // コマンドを選択していない味方が残っている場合
      if(! (this.current === this.friendElementNum.length - 1)) {
        // 次の味方
        ++this.current;
        // 味方のコマンドを取得する
        let text = (characters[this.friendElementNum[this.current]] as Friend).getCommand("start");
        // コマンドを表示する
        this.showCommand(text);
        // 表示されたコマンドにイベントハンドラを割り当てる
        (characters[this.friendElementNum[this.current]] as Friend).setEventHandler("start");
      } else { // 味方全員のコマンド選択が終わった場合
        // コマンドビューを空白にする
        Message.commandView.innerHTML = "";

        this.current = 0;
        return true;
      } 
    } else { // 味方1人のコマンド入力が終わっていない場合
      // 次のコマンドを表示して、イベントハンドラを登録する
      this.showCommand(result);
      // 表示されたコマンドにイベントハンドラを割り当てる
      (characters[this.friendElementNum[this.current]] as Friend).setEventHandler();
    }

    return false;
  }
}

export default Command;
