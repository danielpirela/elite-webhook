import { exec } from 'child_process';

export function runDeployScript(scriptPath: string = '/home/prueba/dev/deploy.sh'): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error al ejecutar el script:', error);
        reject(error);
      } else {
        console.log('✅ Script ejecutado con éxito.');
        resolve(stdout);
      }
    });
  });
}
