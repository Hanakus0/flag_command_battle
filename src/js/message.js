/**
 * メッセージを表示するクラス
 */
class Message {
    /**
     * @constructor
     * インスタンス化しないため不要
     */
    /**
     * メッセージを表示する
     * @param text 表示するメッセージ
     */
    static printMessage(text) {
        Message.messageView.innerHTML = text;
    }
    /**
     * 表示するメッセージを追加する
     * @param text 表示するメッセージ
     */
    static addMessage(text) {
        Message.messageView.innerHTML += text;
    }
}
Message.parameterView = document.getElementById('parameterView');
Message.messageView = document.getElementById('messageView');
Message.enemyImageView = document.getElementById('enemyImageView');
export default Message;
