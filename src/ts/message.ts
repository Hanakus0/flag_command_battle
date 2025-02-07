/**
 * メッセージを表示するクラス
 */
class Message {
  private static messageView: HTMLElement = document.getElementById('messageView') as HTMLElement;

  /**
   * @constructor
   * インスタンス化しないため不要
   */

  /**
   * メッセージを表示する
   * @param text 表示するメッセージ
   */
  static printMessage(text: string) {
    Message.messageView.innerHTML = text;
  }

  /**
   * 表示するメッセージを追加する
   * @param text 表示するメッセージ
   */
  static addMessage(text: string) {
    Message.messageView.innerHTML += text;
  }
}

export default Message;
