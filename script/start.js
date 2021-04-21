async function spawn(...args) {
  const { spawn } = require("child_process");
  const proc = spawn(...args);
  proc.stdout.pipe(process.stdout);
  proc.stderr.pipe(process.stderr);
  return proc;
}

// 启动npm调试模式
const backend = spawn("yarn", ["start"], { cwd: `./backend` });
const frontend = spawn("yarn", ["run", "dev"], { cwd: `./frontend` });

process.on("exit", () => {
  backend.kill();
  frontend.kill();
});
