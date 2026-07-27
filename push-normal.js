import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';
import { execSync } from 'child_process';

const projectDir = process.cwd();
const remoteUrl = 'https://github.com/barath2005-dotcom/Personal-Portfolio.git';

async function pushChanges() {
  const token = execSync('/Users/barathr/.local/bin/gh auth token', { encoding: 'utf8' }).trim();
  
  console.log('Pushing to GitHub to trigger Vercel deployment...');
  
  await git.push({
    fs,
    http,
    dir: projectDir,
    remote: 'origin',
    ref: 'main',
    remoteRef: 'refs/heads/main',
    url: remoteUrl,
    onAuth: () => ({ username: token }),
    force: false,
  });
  
  console.log('✅ Successfully pushed! Vercel should now start building the update.');
}

pushChanges().catch(err => console.error(err));
