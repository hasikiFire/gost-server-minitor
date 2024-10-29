import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execPromise = promisify(exec);

/**
 * @deprecated
 *
 * 用 docker-compose启动，不再用命令行
 */
export class DockerCommand {
  private readonly composeFilePath = path.join(
    __dirname,
    '..',
    'config',
    'gost-compose.yml',
  );

  async restartDocker(): Promise<void> {
    try {
      console.log('composeFilePath: ', this.composeFilePath);

      // Check if any containers are currently running
      const { stdout: psStdout, stderr: psStderr } = await execPromise(
        `docker-compose -f ${this.composeFilePath} ps -q`,
      );
      if (psStderr) {
        console.error('Error checking running containers:', psStderr);
        return;
      }

      const containerIds = psStdout
        .trim()
        .split('\n')
        .filter((id) => id);
      if (containerIds.length > 0) {
        // Stop and remove all running containers
        console.log('Stopping running Docker containers...');
        const { stdout: downStdout, stderr: downStderr } = await execPromise(
          `docker-compose -f ${this.composeFilePath} down`,
        );
        if (downStderr) {
          console.error('Error stopping containers:', downStderr);
          return;
        }
        console.log('Containers stopped:', downStdout);
      }

      // Start Docker Compose
      console.log('Starting Docker Compose...');
      const { stdout: upStdout, stderr: upStderr } = await execPromise(
        `docker-compose -f ${this.composeFilePath} up -d`,
      );
      console.log('Docker Compose started:', upStdout);

      if (upStderr) {
        console.error('Docker Compose error:', upStderr);
      }
    } catch (error) {
      console.error('Error starting Docker Compose:', error.message);
    }
  }
}
