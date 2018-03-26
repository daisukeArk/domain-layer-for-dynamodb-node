/**
 * 引数NULL例外
 */
export class ArgumentNullException extends Error {
  /**
   * コンストラクタ
   * @param parameterName パラメータ名
   * @param message メッセージ
   */
  constructor(parameterName: string, message?: string) {
    super(message);

    this.name = 'ArgumentNullException';
    this.stack = (<any> new Error()).stack;
  }
}
