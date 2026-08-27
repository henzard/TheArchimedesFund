// Accessibility gate: serves the built dist/ and runs pa11y-ci (WCAG 2.1
// AA, see .pa11yci.json) against every built page. Requires `npm run
// build` to have already run. Implemented in Node (not a shell script) so
// it behaves identically on the ubuntu CI runner and on Windows dev
// machines, where a bare `bash` on PATH may resolve to WSL rather than
// Git Bash. Uses the locally installed binaries (node_modules/.bin)
// rather than `npx <pkg>@<range>`, which re-resolves against the npm
// registry on every call - slow, and a silent hang if the network is
// slow or unavailable. Uses 127.0.0.1 rather than localhost: on some
// Windows setups Node's fetch tries the IPv6 loopback first and stalls
// for many seconds per attempt before falling back to IPv4.
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const bin = (name) => path.join(root, 'node_modules', '.bin', process.platform === 'win32' ? `${name}.cmd` : name);

const PORT = 8080;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`+ ${command} ${args.join(' ')}`);
    const child = spawn(command, args, { stdio: 'inherit', shell: true, ...options });
    child.on('error', reject);
    child.on('exit', (code) => resolve(code ?? 1));
  });
}

async function waitForServer(url, attempts = 20, delayMs = 500) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok || res.status === 404) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return false;
}

console.log(`+ starting static server on :${PORT}`);
const server = spawn(bin('http-server'), ['dist', '-p', String(PORT), '-s', '-c-1', '-a', '127.0.0.1'], {
  stdio: ['ignore', 'ignore', 'pipe'],
  shell: true,
  cwd: root,
});
server.stderr.on('data', (d) => process.stderr.write(`[server] ${d}`));
server.on('error', (err) => console.error('gate:a11y: server spawn error', err));
server.on('exit', (code, signal) => {
  if (code !== null && code !== 0) console.error(`gate:a11y: server exited early (code ${code}, signal ${signal})`);
});

let exitCode = 1;
try {
  const up = await waitForServer(`http://127.0.0.1:${PORT}/`);
  if (!up) {
    console.error('gate:a11y: static server did not come up in time');
    exitCode = 1;
  } else {
    exitCode = await run(bin('pa11y-ci'), ['-c', '.pa11yci.json'], { cwd: root });
  }
} finally {
  server.kill();
}

process.exit(exitCode);
