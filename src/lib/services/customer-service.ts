import { CustomerCollection as Collection } from '../collections';
import { CustomerCondition as Condition } from '../conditions';
import { ICustomer as Entity } from '../models';
import { CustomerRepository as Repository } from '../repositories';
import { ServiceBase } from './service-base';

/**
 * 顧客 サービスクラス
 */
export class CustomerService extends ServiceBase<Condition, Entity, Collection, Repository> {
}
