module.exports = {
  apps: [
    {
      name: 'angu-frontend',
      cwd: '/Users/anxiang/.qclaw/workspace-agent-4fb505c4/paiqi-wiremesh',
      script: 'node_modules/.bin/next',
      args: 'dev -p 3000',
      env: { NODE_ENV: 'development' },
      max_restarts: 10,
      restart_delay: 3000,
    },
    {
      name: 'angu-backend',
      cwd: '/Users/anxiang/.qclaw/workspace-agent-4fb505c4/paiqi-wiremesh/backend',
      script: 'server.js',
      env: { NODE_ENV: 'development', PORT: '3001' },
      max_restarts: 10,
      restart_delay: 2000,
    },
  ],
};
