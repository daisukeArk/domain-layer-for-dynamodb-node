#!/bin/bash

# テーブル存在チェック
aws dynamodb list-tables \
--profile localstack \
--endpoint-url http://localhost:4569 \
| grep customers

if [ "$?" -eq 0 ]
then
  # テーブル削除
  aws dynamodb delete-table \
  --profile localstack \
  --endpoint-url=http://localhost:4569 \
  --table-name customers
fi

# テーブル作成
aws dynamodb create-table \
--profile localstack \
--endpoint-url=http://localhost:4569 \
--table-name customers \
--attribute-definitions AttributeName=id,AttributeType=N AttributeName=isDelete,AttributeType=N \
--key-schema AttributeName=id,KeyType=HASH \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
--global-secondary-indexes \
'[
  {
    "IndexName": "gsi-isDelete",
    "KeySchema": [
      { "AttributeName": "isDelete", "KeyType": "HASH" }
    ],
    "Projection": { "ProjectionType": "ALL" },
    "ProvisionedThroughput": { "ReadCapacityUnits": 5, "WriteCapacityUnits": 5 }
  }
]'

# テーブル存在チェック
aws dynamodb list-tables \
--profile localstack \
--endpoint-url http://localhost:4569 \
| grep users

if [ "$?" -eq 0 ]
then
  # テーブル削除
  aws dynamodb delete-table \
  --profile localstack \
  --endpoint-url=http://localhost:4569 \
  --table-name users
fi

# テーブル作成
aws dynamodb create-table \
--profile localstack \
--endpoint-url=http://localhost:4569 \
--table-name users \
--attribute-definitions AttributeName=id,AttributeType=N AttributeName=customerId,AttributeType=N AttributeName=isDelete,AttributeType=N \
--key-schema AttributeName=id,KeyType=HASH AttributeName=customerId,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
--global-secondary-indexes \
'[
  {
    "IndexName": "gsi-isDelete",
    "KeySchema": [
      { "AttributeName": "isDelete", "KeyType": "HASH" }
    ],
    "Projection": { "ProjectionType": "ALL" },
    "ProvisionedThroughput": { "ReadCapacityUnits": 5, "WriteCapacityUnits": 5 }
  }
]'

# テーブルデータ追加
aws dynamodb batch-write-item \
  --profile localstack \
  --endpoint-url=http://localhost:4569 \
  --request-items file://data/customers.json

aws dynamodb batch-write-item \
  --profile localstack \
  --endpoint-url=http://localhost:4569 \
  --request-items file://data/users.json
