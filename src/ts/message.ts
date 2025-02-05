/**
 * メッセージクラス
 * コマンドバトルのメッセージ表示に関するクラス
 * @constructor
**/

class Message {
  private static messageView: HTMLElement = document.getElementById('messageView') as HTMLElement;

  // メッセージを表示
  static printMessage(text: string) {
    Message.messageView.innerHTML = text;
  }
  
  // メッセージを追加
  static addMessage(text: string) {
    Message.messageView.innerHTML += text;
  }
}

export default Message;
