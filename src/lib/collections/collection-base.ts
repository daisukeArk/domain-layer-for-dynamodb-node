import * as AWS from 'aws-sdk';
import { IEntityBase } from '../models/entity-base';

/**
 * コレクション - 基底クラス
 */
export abstract class CollectionBase<TEntity extends IEntityBase> extends Set<TEntity> {
  public Count?: AWS.DynamoDB.Integer;
  public ScannedCount?: AWS.DynamoDB.Integer;
  public LastEvaluatedKey?: AWS.DynamoDB.DocumentClient.Key;
  public ConsumedCapacity?: AWS.DynamoDB.DocumentClient.ConsumedCapacity;
}
