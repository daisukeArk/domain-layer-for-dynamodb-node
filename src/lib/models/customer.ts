import { IEntityBase } from './entity-base';

/**
 * 顧客 インタフェース
 */
export interface ICustomer extends IEntityBase {
  /**
   * ID(HASH)
   */
  id: number;

  /**
   * 顧客名
   */
  name?: string;

  /**
   * 住所
   */
  address?: string;

  /**
   * 論理削除
   */
  isDelete: number;
}
