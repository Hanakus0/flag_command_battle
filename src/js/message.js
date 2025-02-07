"use strict";
class Message {
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
Message.messageView = document.getElementById('messageView');
Message.printMessage("あれすの攻撃<br>");
Message.addMessage("トロルに20のダメージを与えた！<br>");
