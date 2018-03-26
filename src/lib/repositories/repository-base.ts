import * as AWS from 'aws-sdk';
import { CollectionBase } from '../collections/collection-base';
import { ConditionBase } from '../conditions/condition-base';
import * as Exceptions from '../exceptions';
import { IEntityBase } from '../models/entity-base';

/**
 * リポジトリ基底インタフェース
 */
export interface IRepositoryBase<
  TCondition extends ConditionBase,
  TEntity extends IEntityBase,
  TCollection extends CollectionBase<TEntity>
  > {
  getAsync(condition: TCondition): Promise<TEntity | undefined>;
  queryAsync(condition: TCondition): Promise<TCollection>;
  queryAllAsync(condition: TCondition): Promise<TCollection>;
  putAsync(condition: TCondition): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput>;
  updateAsync(condition: TCondition): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput>;
}

/**
 * リポジトリ基底クラス
 */
export abstract class RepositoryBase<
  TCondition extends ConditionBase,
  TEntity extends IEntityBase,
  TCollection extends CollectionBase<TEntity>
  > implements IRepositoryBase<ConditionBase, TEntity, TCollection> {
  /**
   * テーブル名
   */
  protected abstract tableName: string;

  /**
   * DBコンテキスト
   */
  protected dbContext: AWS.DynamoDB.DocumentClient;

  /**
   * コンストラクタ
   * @param dbContext DBコンテキスト
   */
  constructor(dbContext: AWS.DynamoDB.DocumentClient) {
    this.dbContext = dbContext;
  }

  /**
   * 選択 get
   * @param condition パラメータ
   * @returns TEntity
   */
  public async getAsync(condition: TCondition): Promise<TEntity | undefined> {
    if (condition.getItemInput === undefined) {
      throw new Exceptions.ArgumentNullException('condition');
    }

    // パラメータ設定
    const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: condition.getItemInput.Key
    };

    // パラメータコピー
    Object.assign(params, condition.getItemInput);

    // データ取得
    const output = await this.dbContext.get(params).promise();

    // エンティティ取得
    return this.getEntity(output.Item);
  }

  /**
   * query
   * @param condition パラメータ
   * @returns コレクション
   */
  public async queryAsync(condition: TCondition): Promise<TCollection> {
    // DynamoDB queryパラメータ設定
    const params: AWS.DynamoDB.DocumentClient.QueryInput = this.createQueryParameters(condition);

    // データ取得
    const output = await this.dbContext.query(params).promise();

    // コレクション
    const collection = this.createCollection();

    collection.Count = output.Count;
    collection.ScannedCount = output.ScannedCount;
    collection.LastEvaluatedKey = output.LastEvaluatedKey;
    collection.ConsumedCapacity = output.ConsumedCapacity;

    // 結果がある場合、コレクションに詰める
    if (output.Items !== undefined) {

      for (const item of output.Items) {
        // エンティティ取得
        const entity = this.getEntity(item);

        if (entity !== undefined) {
          // コレクション追加
          collection.add(entity);
        }
      }
    }

    return collection;
  }

  /**
   * 選択 queryAll
   * @param parameter パラメータ
   * @returns コレクション
   */
  public async queryAllAsync(condition: TCondition): Promise<TCollection> {
    // DynamoDB getItemパラメータ設定
    const params: AWS.DynamoDB.DocumentClient.QueryInput = this.createQueryParameters(condition);

    // コレクション
    const collection = this.createCollection();

    // query
    const doQuery = async (
      parameters: AWS.DynamoDB.DocumentClient.QueryInput
    ) => {

      // データ取得
      const output: AWS.DynamoDB.DocumentClient.QueryOutput = await this.dbContext.query(parameters).promise();

      // 結果がある場合、コレクションに詰める
      if (output.Items !== undefined) {

        for (const item of output.Items) {
          // エンティティ取得
          const entity = this.getEntity(item);

          if (entity !== undefined) {
            // コレクション追加
            collection.add(entity);
          }
        }
      }

      if (output.LastEvaluatedKey) {
        parameters.ExclusiveStartKey = output.LastEvaluatedKey;

        // 再帰的呼出
        await doQuery(parameters);
      }
    };

    // 実行
    await doQuery(params);

    collection.Count = collection.size;

    return collection;
  }

  /**
   * 登録
   * @param condition パラメータ
   * @returns 実行結果
   */
  public async putAsync(condition: TCondition): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    if (condition.putItemInput === undefined) {
      throw new Exceptions.ArgumentNullException('condition');
    }

    // DynamoDB putItemパラメータ設定
    const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: condition.putItemInput.Item
    };

    // パラメータコピー
    Object.assign(params, condition.putItemInput);

    // データ追加
    return this.dbContext.put(params).promise();
  }

  /**
   * 更新
   * @param condition パラメータ
   * @returns 実行結果
   */
  public async updateAsync(condition: TCondition): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    if (condition.updateItemInput === undefined) {
      throw new Exceptions.ArgumentNullException('condition');
    }

    // DynamoDB putItemパラメータ設定
    const params: AWS.DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: condition.updateItemInput.Key
    };

    // パラメータコピー
    Object.assign(params, condition.updateItemInput);

    // 更新
    return this.dbContext.update(params).promise();
  }

  /**
   * エンティティ取得
   * @param item エンティティ
   * @returns エンティティ | undefined
   */
  protected abstract getEntity(item?: AWS.DynamoDB.DocumentClient.AttributeMap): TEntity | undefined;

  /**
   * コレクション作成（インスタンス生成のみ）
   */
  protected abstract createCollection(): TCollection;

  /**
   * queryパラメータ作成
   * @param condition 条件
   * @returns queryパラメータ
   */
  private createQueryParameters(
    condition: TCondition
  ): AWS.DynamoDB.DocumentClient.QueryInput {
    if (condition.queryInput === undefined) {
      throw new Exceptions.ArgumentNullException('condition');
    }

    // DynamoDB queryパラメータ設定
    const params: AWS.DynamoDB.DocumentClient.QueryInput = {
      TableName: this.tableName
    };

    // パラメータコピー
    Object.assign(params, condition.queryInput);

    return params;
  }
}
