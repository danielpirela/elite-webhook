import { exec } from 'node:child_process'
const path: string = '/home/prueba/scripts/deploy.sh'

export function runDeployScript(scriptPath: string = path): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(`bash ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error al ejecutar el script:', error)
        reject(error)
      } else {
        console.log('✅ Script ejecutado con éxito.')
        resolve(stdout)
      }
    })
  })
}
