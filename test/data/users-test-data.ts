import * as AWS from 'aws-sdk';

/**
 * ユーザテーブルテストデータ
 */
export const usersTestData: AWS.DynamoDB.DocumentClient.BatchWriteItemRequestMap = {
  users: [
    {
      PutRequest: {
        Item: {
          id: 1001,
          customerId: 1,
          name: '山田一郎',
          nameFurigana: 'ヤマダイチロウ',
          address: '東京都新宿区1-1',
          isDelete: 0,
          createdId: 1,
          createdAt: '20171231235959',
          modifiedId: 2,
          modifiedAt: '20181231235959'
        }
      }
    },
    {
      PutRequest: {
        Item: {
          id: 1002,
          customerId: 1,
          name: '山田次郎',
          nameFurigana: 'ヤマダジロウ',
          address: '東京都新宿区1-2',
          isDelete: 0
        }
      }
    },
    {
      PutRequest: {
        Item: {
          id: 1003,
          customerId: 2,
          name: '山田三郎',
          nameFurigana: 'ヤマダサブロウ',
          address: '東京都新宿区2-1',
          isDelete: 0
        }
      }
    },
    {
      PutRequest: {
        Item: {
          id: 1004,
          customerId: 2,
          name: '山田四郎',
          nameFurigana: 'ヤマダシロウ',
          address: '東京都新宿区2-2',
          isDelete: 1
        }
      }
    }
  ]
};
