import { CollectionBase } from '../collections/collection-base';
import { ConditionBase } from '../conditions/condition-base';
import { IEntityBase } from '../models/entity-base';
import { RepositoryBase } from '../repositories/repository-base';

/**
 * サービス基底クラス
 */
export abstract class ServiceBase<
  TCondition extends ConditionBase,
  TEntity extends IEntityBase,
  TCollection extends CollectionBase<TEntity>,
  TRepository extends RepositoryBase<TCondition, TEntity, TCollection>
  > {

  /**
   * リポジトリ
   */
  protected repository: TRepository;

  /**
   * コンストラクタ
   * @param repository リポジトリ
   */
  constructor(repository: TRepository) {
    this.repository = repository;
  }

  /**
   * 選択
   * @param condition 条件
   * @returns エンティティ もしくは undefined
   */
  public async getAsync(condition: TCondition): Promise<TEntity | undefined> {
    // データ取得
    return this.repository.getAsync(condition);
  }

  /**
   * query
   * @param condition 条件
   * @returns コレクション
   */
  public async queryAsync(condition: TCondition): Promise<TCollection> {
    // データ取得
    return this.repository.queryAsync(condition);
  }

  /**
   * 複数選択
   * @param condition 条件
   * @returns コレクション
   */
  public async queryAllAsync(condition: TCondition): Promise<TCollection> {
    // データ取得
    return this.repository.queryAllAsync(condition);
  }

  /**
   * 登録
   * @param condition 条件
   * @returns 処理結果
   */
  public async putAsync(condition: TCondition): Promise<AWS.DynamoDB.DocumentClient.PutItemOutput> {
    // データ取得
    return this.repository.putAsync(condition);
  }

  /**
   * 更新
   * @param condition 条件
   * @returns 処理結果
   */
  public async updateAsync(condition: TCondition): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    // データ取得
    return this.repository.updateAsync(condition);
  }
}
