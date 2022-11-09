
const cron = require("node-cron");
const txHandler = require('./handler/tx.handler');
const blockHandler = require('./handler/block.handler');

const txTask = cron.schedule(
    "*/5 * * * * *", // 5초에 한번씩 실행
    txHandler,
    {
        scheduled: true,
    }
);

const blockTask = cron.schedule(
    "*/5 * * * * *", // 5초에 한번씩 실행
    blockHandler,
    {
        scheduled: true,
    }
);

txTask.start();
blockTask.start();
