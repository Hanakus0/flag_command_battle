/**
 * メッセージクラス
 * コマンドバトルのメッセージ表示に関するクラス
 * @constructor
**/
class Message {
    // メッセージを表示
    static printMessage(text) {
        Message.messageView.innerHTML = text;
    }
    // メッセージを追加
    static addMessage(text) {
        Message.messageView.innerHTML += text;
    }
}
Message.messageView = document.getElementById('messageView');
export default Message;
