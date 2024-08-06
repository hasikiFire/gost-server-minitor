import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class DockerService {
  private readonly logger = new Logger(DockerService.name);

  async startDockerGost(packageItemId: number, port: number): Promise<void> {
    const command = `docker run -d --name gost_${packageItemId} -p ${port}:8080 gost`;

    try {
      const { stdout, stderr } = await execPromise(command);
      console.log('stderr: ', stderr);
      this.logger.log(
        `Docker GOST for packageItem ${packageItemId} started: ${stdout}`,
      );

      // Add a delay to ensure the container has time to start
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Check if the container is running
      const { stdout: psOutput } = await execPromise(
        `docker ps --filter "name=gost_${packageItemId}" --format "{{.Names}}"`,
      );
      if (psOutput.trim() === `gost_${packageItemId}`) {
        this.logger.log(
          `Docker GOST for packageItem ${packageItemId} is running`,
        );
      } else {
        this.logger.error(
          `Docker GOST for packageItem ${packageItemId} failed to start`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error starting Docker GOST for packageItem ${packageItemId}: ${error.message}`,
      );
    }
  }
}
