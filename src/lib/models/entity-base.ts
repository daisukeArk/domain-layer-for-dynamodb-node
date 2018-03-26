/**
 * エンティティ基底インタフェース
 */
export interface IEntityBase {
  /**
   * 登録者ID
   */
  createdId?: string;

  /**
   * 登録日時
   */
  createdAt?: string;

  /**
   * 最終変更者ID
   */
  modifiedId?: string;

  /**
   * 最終変更日時
   */
  modifiedAt?: string;
}
