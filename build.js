try {
  const outdir = './out';
  await Bun.build({
    entrypoints: ['./background-script.ts'],
    outdir,
    format: 'esm'
  })
  await Bun.build({
    entrypoints: ['./popup/index.html'],
    outdir
  })
  await Bun.build({
    entrypoints: ['./update-theme.ts', './count-typing.ts'],
    outdir,
    format: 'iife',
  })
} catch (error) {
  console.error(error);
}
