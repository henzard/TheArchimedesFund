// Performance/accessibility/best-practices/SEO gate via Lighthouse CI.
// lhci's own static server serves dist/ (see .lighthouserc.json
// collect.staticDistDir) and drives headless Chrome against it. Requires
// `npm run build` to have already run. Implemented in Node (not a shell
// script) for the same cross-platform reason as gate-a11y.mjs, and uses
// the locally installed `lhci` binary rather than `npx <pkg>@<range>` for
// the same reliability reason.
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const bin = path.join(root, 'node_modules', '.bin', process.platform === 'win32' ? 'lhci.cmd' : 'lhci');

const child = spawn(bin, ['autorun', '--config=./.lighthouserc.json'], {
  stdio: 'inherit',
  shell: true,
  cwd: root,
});

child.on('exit', (code) => process.exit(code ?? 1));
child.on('error', (err) => {
  console.error(err);
  process.exit(1);
});
