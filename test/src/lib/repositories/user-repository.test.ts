import * as AWS from 'aws-sdk';
import * as Mocha from 'mocha';
import { It, Mock } from 'moq.ts';
import * as Assert from 'power-assert';
import * as Sinon from 'sinon';
import { Bootstrap } from '../../../bootstrap';

import { UserCollection as Collection } from '../../../../src/lib/collections';
import { UserCondition as Condition } from '../../../../src/lib/conditions';
import { IUser as Entity } from '../../../../src/lib/models';
import { UserRepository as Repository } from '../../../../src/lib/repositories';

import { usersTestData as TestData } from '../../../data/users-test-data';

// ブートストラップ
Bootstrap.run();

// DBコンテキスト作成
let dbContext: AWS.DynamoDB.DocumentClient;

// リポジトリインスタンス作成
let target: Repository;

/**
 * テスト
 */
describe('user-repositoryのテスト', () => {

  /**
   * 前処理
   */
  before(async () => {
    dbContext = new AWS.DynamoDB.DocumentClient();

    target = new Repository(dbContext);

    try {
      // テストデータ登録
      await dbContext.batchWrite({
        RequestItems: TestData
      }).promise();
    } catch (error) {
      console.log('ERROR');
      console.log(error);
    }
  });

  /**
   * 前処理（各テスト毎）
   */
  beforeEach(() => {
  });

  /**
   * 後処理（各テスト毎）
   */
  afterEach(() => {
  });

  /**
   * 後処理
   */
  after(() => {
  });

  /**
   * テストケース
   */
  describe('getAsyncのテスト', () => {

    // 検証
    it('データが１件取得できること', async () => {

      // データ取得条件設定
      const condition: Condition = {
        getItemInput: {
          Key: {
            id: 1001,
            customerId: 1
          }
        }
      };

      // 実行
      const result = await target.getAsync(condition);

      if (result === undefined) {
        Assert.fail('データが取得できませんでした。');

        return;
      }

      // アサーション
      Assert.equal(result.id, 1001);
      Assert.equal(result.customerId, 1);
      Assert.equal(result.name, '山田一郎');
      Assert.equal(result.nameFurigana, 'ヤマダイチロウ');
      Assert.equal(result.address, '東京都新宿区1-1');
      Assert.equal(result.createdId, 1);
      Assert.equal(result.createdAt, '20171231235959');
      Assert.equal(result.modifiedId, 2);
      Assert.equal(result.modifiedAt, '20181231235959');
    });
  });

  describe('queryAsyncのテスト', () => {
    it('データが全て取得できること', async () => {
      // データ取得条件設定
      const condition: Condition = {
        queryInput: {
          IndexName: 'gsi-isDelete',
          KeyConditions: {
            isDelete: {
              ComparisonOperator: 'EQ',
              AttributeValueList: [
                0
              ]
            }
          },
          FilterExpression: 'id BETWEEN :IdFrom AND :IdTo',
          ExpressionAttributeValues: {
            ':IdFrom': 1000,
            ':IdTo': 1004
          }
        }
      };

      // 実行
      const result = await target.queryAsync(condition);

      if (result.Count === undefined || result.Count <= 0) {
        Assert.fail('データが取得できませんでした。');

        return;
      }

      // アサーション
      Assert.equal(result.Count, 3);
    });
  });

});
