import * as Collections from '../collections';
import { CollectionBase } from '../collections/collection-base';
import * as Conditions from '../conditions';
import { ConditionBase } from '../conditions/condition-base';
import * as Enums from '../enums';
import { ServiceFactory } from '../factories/service-factory';
import * as Models from '../models';
import { IEntityBase } from '../models/entity-base';

/**
 * サービスファサード
 */
export class ServiceFacade {
  /**
   * インスタンス
   */
  private serviceFactory: ServiceFactory;

  /**
   * コンストラクタ
   */
  constructor(serviceFactory: ServiceFactory) {
    this.serviceFactory = serviceFactory;
  }

  /**
   * 選択
   * @param condition 条件
   * @returns エンティティ もしくは undefined
   */
  public async getAsync(condition: ConditionBase): Promise<IEntityBase | undefined> {
    let entity: IEntityBase | undefined;

    switch (condition.tableName) {
      case Enums.TableNames.Customers:
        entity = await this.serviceFactory.CustomerService.getAsync(condition);
        break;

      case Enums.TableNames.Users:
        entity = await this.serviceFactory.UserService.getAsync(condition);
        break;
      default:
        throw new Error('対象テーブルに一致する処理が見つかりません');
    }

    return entity;
  }

  /**
   * 複数選択
   * @param condition 条件
   * @returns コレクション
   */
  public async queryAsync(condition: ConditionBase): Promise<CollectionBase<IEntityBase>> {
    let collection: CollectionBase<IEntityBase>;

    switch (condition.tableName) {
      case Enums.TableNames.Customers:
        collection = await this.serviceFactory.CustomerService.queryAsync(condition);
        break;

      case Enums.TableNames.Users:
        collection = await this.serviceFactory.UserService.queryAsync(condition);
        break;
      default:
        throw new Error('対象テーブルに一致する処理が見つかりません');
    }

    return collection;
  }

  /*

  こんな感じでオーバロードできることを期待していたが。。。TypeScript(JavaScript)では出来ないので

  public async getAsync(condition: Conditions.CustomerCondition): Promise<Models.ICustomer | undefined> {
    return this.serviceFactory.CustomerService.getAsync(condition);
  }

  public async getAsync(condition: Conditions.UserCondition): Promise<Models.IUser | undefined> {
    return this.serviceFactory.UserService.getAsync(condition);
  }

  以下は妄想、オブジェクトはどこまでいってもオブジェクト

  public async getAsync(condition: Conditions.CustomerCondition): Promise<Models.ICustomer | undefined>;
  public async getAsync(condition: Conditions.UserCondition): Promise<Models.IUser | undefined>;
  public async getAsync(condition: ConditionBase): Promise<IEntityBase | undefined> {
    if (typeof condition === 'CustomerCondition') {
      return this.serviceFactory.CustomerService.getAsync(condition);
    } else if (typeof condition === 'UserCondition') {
      return this.serviceFactory.UserService.getAsync(condition);
    } else {
      throw new Error('対象テーブルに一致する処理が見つかりません');
    }
  }
  */
}
