import * as AWS from 'aws-sdk';
import { UserCollection as Collection } from '../collections';
import { UserCondition as Condition } from '../conditions';
import { IUser as Entity } from '../models';
import { RepositoryBase } from './repository-base';

/**
 * ユーザ リポジトリクラス
 */
export class UserRepository extends RepositoryBase<Condition, Entity, Collection> {

  /**
   * テーブル名
   */
  protected tableName: string = 'users';

  /**
   * エンティティ取得
   */
  protected getEntity(item?: AWS.DynamoDB.DocumentClient.AttributeMap): Entity | undefined {
    // 未定義か判定
    if (item === undefined) {
      return undefined;
    }

    // エンティティ作成
    const entity: Entity = {
      id: item.id,
      isDelete: item.isDelete,
      customerId: item.customerId
    };

    // マッピング
    Object.assign(entity, item);

    return entity;
  }

  /**
   * コレクションインスタンス取得
   */
  protected createCollection(): Collection {
    return new Collection();
  }
}
