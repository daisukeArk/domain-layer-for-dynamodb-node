import * as Enums from '../enums';
import { ConditionBase } from './condition-base';

/**
 * 顧客 リポジトリ条件クラス
 */
export class CustomerCondition extends ConditionBase {
  /**
   * 対象テーブル名
   */
  public get tableName() { return Enums.TableNames.Customers; }
}
