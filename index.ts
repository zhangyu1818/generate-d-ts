import * as ts from 'typescript'
import { dirname } from 'path'
import { existsSync, mkdirSync, writeFileSync } from 'fs'

type CreatedFiles = { [key: string]: string }
const createDeclarations = (filesPath: string[], outDir: string) => {
  const tsFilesPath = filesPath.filter((path) => path.endsWith('.ts') || path.endsWith('.tsx'))

  const createdFiles: CreatedFiles = {}
  const options = {
    declaration: true,
    emitDeclarationOnly: true,
    outDir,
  }
  const host = ts.createCompilerHost(options)
  host.writeFile = (fileName, data) => {
    createdFiles[fileName] = data
  }
  const program = ts.createProgram(
    tsFilesPath,
    {
      declaration: true,
      emitDeclarationOnly: true,
      outDir,
    },
    host
  )
  program.emit()
  return createdFiles
}

const writeDeclarations = (declarations: CreatedFiles): Promise<void> =>
  new Promise((resolve, reject) => {
    try {
      for (const [declarationFilePath, declarationFileContent] of Object.entries(declarations)) {
        const dir = dirname(declarationFilePath)
        if (!existsSync(dir)) {
          mkdirSync(dir)
        }
        writeFileSync(declarationFilePath, declarationFileContent, {
          encoding: 'utf-8',
        })
      }
    } catch (e) {
      reject(e)
    }
    resolve()
  })

export { createDeclarations, writeDeclarations }
