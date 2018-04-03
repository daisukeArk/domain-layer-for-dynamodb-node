import * as Repositories from '../repositories';
import * as Services from '../services';
import { DbContextFactory } from './db-context-factory';

/**
 * サービスファクトリ
 */
export class ServiceFactory {
  /**
   * 顧客サービス
   */
  private _customerService?: Services.CustomerService;

  /**
   * ユーザサービス
   */
  private _userService?: Services.UserService;

  /**
   * コンストラクタ
   */
  constructor() {
  }

  /**
   * 顧客サービスインスタンス
   */
  public get CustomerService(): Services.CustomerService {
    if (!this._customerService) {
      // インスタンス作成
      this._customerService = new Services.CustomerService(
        new Repositories.CustomerRepository(DbContextFactory.instance)
      );
    }

    // 生成済みのインスタンスを返す
    return this._customerService;
  }

  /**
   * ユーザサービスインスタンス
   */
  public get UserService(): Services.UserService {
    if (!this._userService) {
      // インスタンス作成
      this._userService = new Services.UserService(
        new Repositories.UserRepository(DbContextFactory.instance)
      );
    }

    // 生成済みのインスタンスを返す
    return this._userService;
  }
}
