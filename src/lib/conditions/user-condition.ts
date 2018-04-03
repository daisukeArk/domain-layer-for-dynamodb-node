import * as Enums from '../enums';
import { ConditionBase } from './condition-base';

/**
 * ユーザ リポジトリ条件クラス
 */
export class UserCondition extends ConditionBase {
  /**
   * 対象テーブル名
   */
  public get tableName() { return Enums.TableNames.Users; }
}
