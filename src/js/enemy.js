/**
 * 味方キャラクラス
 */
class Enemy {
    constructor(name, hp, offense, speed, path) {
        this.name = name; // 名前
        this.type = "enemy"; // 敵味方種別
        this.hp = hp; // 体力
        this.liveFlag = true; // 生存フラグ
        this.offense = offense; // 攻撃力
        this.speed = speed; // 素早さ
        this.path = path; // 画像の場所
    }
    /**
     * 行動するメソッド
     * @method action
     * @description 敵キャラのHPが1以上の場合に、攻撃を行う。
     */
    action() {
        if (this.hp > 0) {
            this.attack();
        }
    }
}
export default Enemy;
