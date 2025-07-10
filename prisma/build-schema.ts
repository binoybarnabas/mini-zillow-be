// prisma/build-schema.ts
import fs from 'fs';
import path from 'path';

const modelsDir = path.join(__dirname, 'models');
const baseSchemaPath = path.join(__dirname, 'base.prisma');
const outputSchemaPath = path.join(__dirname, 'schema.prisma');

// Read base schema
let finalSchema = fs.readFileSync(baseSchemaPath, 'utf-8');

// Read and append all model files
const modelFiles = fs.readdirSync(modelsDir).filter(f => f.endsWith('.prisma'));

modelFiles.forEach(file => {
  const content = fs.readFileSync(path.join(modelsDir, file), 'utf-8');
  finalSchema += `\n\n// ---- ${file} ----\n` + content;
});

// Write to schema.prisma
fs.writeFileSync(outputSchemaPath, finalSchema);
console.log('✅ schema.prisma generated!');
