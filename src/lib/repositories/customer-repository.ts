import * as AWS from 'aws-sdk';
import { CustomerCollection as Collection } from '../collections';
import { CustomerCondition as Condition } from '../conditions';
import { ICustomer as Entity } from '../models';
import { RepositoryBase } from './repository-base';

/**
 * 顧客 リポジトリクラス
 */
export class CustomerRepository extends RepositoryBase<Condition, Entity, Collection> {

  /**
   * テーブル名
   */
  protected tableName: string = 'customers';

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
      isDelete: item.isDelete
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
