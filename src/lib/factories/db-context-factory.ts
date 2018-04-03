import * as AWS from 'aws-sdk';

/**
 * DBコンテキストファクトリクラス
 */
export class DbContextFactory {

  /**
   * インスタンス
   */
  private static _instance: AWS.DynamoDB.DocumentClient;

  /**
   * コンストラクタ
   */
  private constructor() {
  }

  /**
   * インスタンス取得
   */
  public static get instance(): AWS.DynamoDB.DocumentClient {
    if (!this._instance) {
      // インスタンス作成
      this._instance = new AWS.DynamoDB.DocumentClient();
    }

    // 生成済みのインスタンスを返す
    return this._instance;
  }
}
