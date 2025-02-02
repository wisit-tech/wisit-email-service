import { exec } from 'child_process';
import { logger } from './logger';

export const checkDiskSpace = () => {
  exec('df -h /app/public/uploads', (error, stdout) => {
    if (error) {
      logger.error(`Disk space check failed: ${error}`);
      return;
    }

    const lines = stdout.trim().split('\n');
    const [, stats] = lines;
    const [, total, used, available, percentage] = stats.split(/\s+/);

    logger.info(`💾 Disk Space Stats:
      Total: ${total}
      Used: ${used} (${percentage})
      Available: ${available}
    `);

    // Warning if storage is over 80%
    if (parseInt(percentage) > 80) {
      logger.warn(`⚠️ Storage usage high: ${percentage} used!`);
    }
  });
};

// Check every 24 hours
setInterval(checkDiskSpace, 24 * 60 * 60 * 1000);

// Initial check
checkDiskSpace(); 