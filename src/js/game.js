var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Friend from "./friend.js";
import Troll from "./troll.js";
import Dragon from "./dragon.js";
import { searchCharacterByName } from "./lib.js";
import Message from "./message.js";
/**
 * トロールクラス
 */
class GameManage {
    /**
     * @constructor
     * @param {
     */
    // コンストラクタ
    constructor() {
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
    actionOrder() {
        // 素早さでソートする
        // b > a であれば b を先頭に移動
        characters.sort(function (a, b) {
            return b.speed - a.speed;
        });
    }
    /**
     * パラメータを表示または更新するメソッド
     * @method showParameter
     * @description パラメータを表示または更新する
     * @return {void}
     */
    showParameter() {
        // パラメータを消去する
        Message.parameterView.innerHTML = "";
        // 味方のパラメータを表示する
        for (let character of characters) {
            if (character instanceof Friend) {
                Message.parameterView.innerHTML += '<div class="parameter">' + character.getMainParameter() + '</div>';
            }
        }
        // 敵のパラメータをコンソールに表示する（デバッグ用） 
        for (let character of characters) {
            if (character instanceof Troll || character instanceof Dragon) {
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
    showEnemyImage() {
        let i = 0;
        for (let character of characters) {
            if (character.type === "enemy" && (character instanceof Dragon || character instanceof Troll)) {
                Message.enemyImageView.innerHTML += '<img id="enemyImage' + characters.indexOf(character) + '" src="' + character.path
                    + '" style="position:absolute; left:' + (160 * i++) + 'px; bottom: 0px">';
            }
        }
    }
    /**
     * 戦闘開始時のメッセージを表示するメソッド
     * @method showFirstMessage
     * @description 戦闘開始時のメッセージを表示する
     * @return {void}
     */
    showFirstMessage() {
        Message.printMessage("モンスターが現れた<br>");
    }
    /**
     * 処理待機するメソッド
     * @method sleep
     * @description 指定時間分待機
     * @return {boolean}
     */
    sleep(ms) {
        return new Promise(function (resolve) {
            // msミリ秒スリープする
            setTimeout(resolve, ms);
        });
    }
    /**
     * 各ターンに走らせるメソッド
     * @method battle
     * @description ・毎ターンのゲーム続行可否の判定をする
     *               ・`async`のためbooleanで返される
     * @return {boolean}
     */
    battle() {
        return __awaiter(this, void 0, void 0, function* () {
            // 勝敗の判定
            let winLose = "none";
            // 倒れたキャラクターは行動不可
            for (let character of characters) {
                if (character.liveFlag === false) {
                    continue;
                }
                yield this.sleep(900);
                // 各キャラクターの行動
                character.action();
                yield this.sleep(1100);
                // パラメータを更新する
                this.showParameter();
                yield this.sleep(900);
                // 倒れたキャラクターを処理する
                this.removeDiedcharacter();
                yield this.sleep(300);
                // 勝敗の判定をする
                winLose = this.jadgeWinLose();
                // 決着がついた場合
                if (winLose === "win" || winLose === "lose") {
                    return false;
                }
            }
            return true;
        });
    }
    /**
     * 倒れたキャラクターを処理するメソッド
     * @method removeDiedcharacter
     * @description 倒れた敵の画像を除く
     * @return {void}
     */
    removeDiedcharacter() {
        for (let character of characters) {
            if (character.hp <= 0 && character.liveFlag === true) {
                Message.addMessage(character.name + "は倒れた<br>");
                // 生存フラグを落とす
                character.liveFlag = false;
                // 敵の場合は画像を削除
                if (character.type === "enemy") {
                    let enemyImage = document.getElementById("enemyImage" + characters.indexOf(character));
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
    isAliveByType(type) {
        for (let character of characters) {
            // 1人でも生存していればtrueを返す
            if (character.type === type && character.liveFlag === true) {
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
    jadgeWinLose() {
        // 味方が残っていない場合
        if (!this.isAliveByType("friend")) {
            Message.addMessage("全滅しました・・・<br>");
            return "lose";
        }
        // 敵が残っていない場合
        if (!this.isAliveByType("enemy")) {
            Message.addMessage("モンスターをやっつけた<br>");
            return "win";
        }
        return "none";
    }
}
const ENEMY_IMAGES = [
    "./../src/images/troll.png",
    "./../src/images/dragon.png"
];
// import { characters } from "./game.js";
// // キャラクターをインスタンス化する
let friend1 = new Friend("あれす", 180, 66, 13, 2, 45); // 味方
let friend2 = new Friend("なーしゃ", 110, 16, 12, 3, 45); // 味方
let friend3 = new Friend("だすてん", 140, 43, 11, 1, 45); // 味方
let enemy1 = new Troll("トロル", 270, 38, 20, ENEMY_IMAGES[0]); // 敵
let enemy2 = new Dragon("ドラゴン", 380, 68, 6, ENEMY_IMAGES[1]); // 敵
let characters = [];
characters.push(friend1); // 味方
characters.push(friend2); // 味方
characters.push(friend3); // 味方
characters.push(enemy1); // 敵
characters.push(enemy2); // 敵
characters[0].command = "enemyCommand";
characters[0].target = characters[searchCharacterByName("トロル")[0]];
characters[0].action();
// ゲーム管理クラスをインスタンス化する
let gameManage = new GameManage();
// キャラクターへのコマンド設定
characters[1].command = "enemyCommand";
characters[1].target = characters[searchCharacterByName("トロル")[0]];
characters[2].command = "enemyCommand";
characters[2].target = characters[searchCharacterByName("ドラゴン")[0]];
characters[3].command = "recoveryCommand";
gameManage.battle();
// export default GameManage;
export { characters };
