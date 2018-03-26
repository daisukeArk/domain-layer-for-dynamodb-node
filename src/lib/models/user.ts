import { IEntityBase } from './entity-base';

/**
 * ユーザ インタフェース
 */
export interface IUser extends IEntityBase {
  /**
   * ID(HASH)
   */
  id: number;

  /**
   * 顧客ID(RANGE)
   */
  customerId: number;

  /**
   * 氏名
   */
  name?: string;

  /**
   * 氏名カナ
   */
  nameFurigana?: string;

  /**
   * 住所
   */
  address?: string;

  /**
   * 論理削除
   */
  isDelete: number;
}
