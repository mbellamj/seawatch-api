const version = '${version}';
const name = require('./package.json').name;

module.exports = {
  git: {
    requireBranch: 'main',
    tagName: `v${version}`,
    commitMessage: `chore(release): Bumping ${name} to version v${version}`,
  },
  hooks: {
    'before:init': [
      'git pull',
      'npm run lint',
      'npm run format',
      'npm run test',
    ],
    'after:bump': 'npx auto-changelog -p',
  },
  npm: {
    publish: false,
  },
  github: {
    release: true,
    releaseName: `${name}-v${version}`,
    autoGenerate: true,
  },
};
