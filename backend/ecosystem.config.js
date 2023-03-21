require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPO, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'backend',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': `eval "$(ssh-agent -s)" && ssh-add -K /c/Users/Lenovo/.ssh/id_rsa && scp ./.env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'pre-deploy-local': "echo 'Deploying code to servers'",
      'post-deploy': 'cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
