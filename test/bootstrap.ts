import * as AWS from 'aws-sdk';

/**
 * ブートストラップ
 */
export class Bootstrap {

  /**
   * アクション
   */
  public static run() {
    // AWSコンフィグ設定
    AWS.config.update({
      dynamodb: {
        endpoint: 'http://localhost:4569',
        region: 'us-east-1'
      }
    });

    AWS.config.accessKeyId = 'dummy';
    AWS.config.secretAccessKey = 'dummy';
  }
}
