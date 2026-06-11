import sharp from 'sharp';
import { readdirSync, renameSync } from 'fs';

const files = readdirSync('public').filter(f => /^IMG_.*\.JPG$/i.test(f));
console.log(`Compressing ${files.length} images...`);

for (const f of files) {
  const input = `public/${f}`;
  const tmp = `public/tmp_${f}`;
  const { size: before } = (await import('fs')).statSync(input);

  await sharp(input)
    .rotate()
    .resize(1600, null, { withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(tmp);

  renameSync(tmp, input);
  const { size: after } = (await import('fs')).statSync(input);
  console.log(`  ${f}: ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB`);
}
console.log('Done.');
