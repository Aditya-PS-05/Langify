import * as sst from "sst";
import { StackContext, Function, Api, Table } from "sst/constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as elasticache from "aws-cdk-lib/aws-elasticache";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

export function AuthStack({ stack }: StackContext) {
  const usersTable = new Table(stack, "UsersTable", {
    fields: {
      id: "string",
      email: "string",
      full_name: "string",
      password_hash: "string",
      role: "string",
      language: "string",
      timezone: "string",
      subscription_status: "string",
      created_at: "string",
      updated_at: "string",
    },
    primaryIndex: { partitionKey: "id" },
    globalIndexes: {
      emailIndex: { partitionKey: "email" },
    },
  });

  const vpc = new ec2.Vpc(stack, "AuthVpc", {
    maxAzs: 2,
    natGateways: 1,
  });

  const redisSecurityGroup = new ec2.SecurityGroup(stack, "RedisSG", { vpc });

  const redisSubnetGroup = new elasticache.CfnSubnetGroup(stack, "RedisSubnetGroup", {
    description: "Subnet group for ElastiCache Redis",
    subnetIds: vpc.privateSubnets.map(subnet => subnet.subnetId),
  });

  const redisSecret = new secretsmanager.Secret(stack, "RedisAuthSecret", {
    generateSecretString: {
      excludePunctuation: true,
      includeSpace: false,
    },
  });

  const redisCluster = new elasticache.CfnCacheCluster(stack, "AuthRedis", {
    engine: "redis",
    cacheNodeType: "cache.t4g.micro",
    numCacheNodes: 1,
    clusterName: "auth-redis-cluster",
    vpcSecurityGroupIds: [redisSecurityGroup.securityGroupId],
    cacheSubnetGroupName: redisSubnetGroup.ref,
    authToken: redisSecret.secretValue.toString(),
  });

  const authFunction = new Function(stack, "AuthFunction", {
    handler: "services/auth-service/main.go",
    runtime: "go1.x",
    architecture: "arm_64" as const,
    memorySize: 1024,
    timeout: 600,
    permissions: [
      usersTable,
      "secretsmanager:GetSecretValue",
      "elasticache:DescribeCacheClusters",
    ],
    bundling: { format: "binary" },
    environment: {
      STAGE: stack.stage,
      USERS_TABLE: usersTable.tableName,
      REDIS_HOST: redisCluster.attrRedisEndpointAddress,
      REDIS_PORT: redisCluster.attrRedisEndpointPort,
      REDIS_SECRET_ARN: redisSecret.secretArn,
    },
    vpc,
    securityGroups: [redisSecurityGroup],
  });

  const api = new Api(stack, "AuthApi", {
    routes: {
      "POST /signup": authFunction,
      "POST /login": authFunction,
      "GET /verify": authFunction,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    RedisEndpoint: redisCluster.attrRedisEndpointAddress,
  });
}
