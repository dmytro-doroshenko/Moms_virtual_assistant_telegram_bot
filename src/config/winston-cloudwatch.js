const AWS = require('aws-sdk');
const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

const {
  NODE_ENV,
  CLOUDWATCH_GROUP_NAME,
  CLOUDWATCH_ACCESS_KEY,
  CLOUDWATCH_SECRET_ACCESS_KEY,
  CLOUDWATCH_REGION,
} = require('./config');

AWS.config.update({ region: CLOUDWATCH_REGION });

const logger = new winston.createLogger({
  format: winston.format.json(),
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
    }),
  ],
});

  const cloudwatchConfig = {
    logGroupName: CLOUDWATCH_GROUP_NAME,
    logStreamName: `${CLOUDWATCH_GROUP_NAME}-${NODE_ENV}`,
    awsAccessKeyId: CLOUDWATCH_ACCESS_KEY,
    awsSecretKey: CLOUDWATCH_SECRET_ACCESS_KEY,
    awsRegion: CLOUDWATCH_REGION,
    messageFormatter: ({ level, message }) => `[${level}] : ${message}`,
  };

  logger.add(new WinstonCloudWatch(cloudwatchConfig));

module.exports = logger;
