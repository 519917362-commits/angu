module.exports = {
  apps: [
    {
      name: 'angu-frontend',
      // 相对路径基于本文件所在目录，工作区迁移后无需修改
      cwd: '.',
      script: 'node_modules/.bin/next',
      args: 'dev -p 3000',
      env: { NODE_ENV: 'development' },
      max_restarts: 10,
      restart_delay: 3000,
    },
    {
      name: 'angu-backend',
      cwd: './backend',
      script: 'server.js',
      env: { NODE_ENV: 'development', PORT: '3001' },
      max_restarts: 10,
      restart_delay: 2000,
    },
  ],
};
