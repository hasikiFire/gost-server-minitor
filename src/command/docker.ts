import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';

const execPromise = promisify(exec);

export class DockerCommand {
  private readonly composeFilePath = path.join(
    __dirname,
    '..',
    'config',
    'gost-compose.yml',
  );

  async startDockerCompose(): Promise<void> {
    try {
      console.log('composeFilePath: ', this.composeFilePath);
      // Start Docker Compose
      const { stdout, stderr } = await execPromise(
        `docker-compose -f ${this.composeFilePath} up -d`,
      );
      console.log('Docker Compose started:', stdout);

      if (stderr) {
        console.error('Docker Compose error:', stderr);
      }
    } catch (error) {
      console.error('Error starting Docker Compose:', error.message);
    }
  }
}
