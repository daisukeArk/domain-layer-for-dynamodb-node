import { UserCollection as Collection } from '../collections';
import { UserCondition as Condition } from '../conditions';
import { IUser as Entity } from '../models';
import { UserRepository as Repository } from '../repositories';
import { ServiceBase } from './service-base';

/**
 * ユーザ サービスクラス
 */
export class UserService extends ServiceBase<Condition, Entity, Collection, Repository> {
}
