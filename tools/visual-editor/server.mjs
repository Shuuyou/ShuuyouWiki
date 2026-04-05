import { createServer } from 'node:http';
import { readFile, writeFile, readdir, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const htmlPath = path.join(root, 'tools', 'visual-editor', 'index.html');
const docsRoot = path.join(root, 'content', 'docs');
const homeConfigPath = path.join(root, 'content', 'editor', 'homepage.json');

function send(res, code, body, type = 'application/json; charset=utf-8') {
  res.writeHead(code, { 'Content-Type': type });
  res.end(body);
}

function json(res, code, payload) {
  return send(res, code, JSON.stringify(payload), 'application/json; charset=utf-8');
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf-8');
  return raw ? JSON.parse(raw) : {};
}

function safeSlug(v) {
  return /^[a-z0-9-]+$/i.test(v);
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { title: '', description: '', content: raw };

  const [, front, content] = match;
  const lines = front.split('\n');
  const map = {};

  for (const line of lines) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim().replace(/^"|"$/g, '');
    map[key] = value;
  }

  return {
    title: map.title || '',
    description: map.description || '',
    content: content.trimStart(),
  };
}

function encodeQuoted(v) {
  return String(v || '').replace(/"/g, '\\"');
}

function buildMdx({ title, description, content }) {
  const blocks = ['---', `title: "${encodeQuoted(title)}"`];
  if (description) blocks.push(`description: "${encodeQuoted(description)}"`);
  blocks.push('---', '', content?.trim() || '');
  return `${blocks.join('\n').trim()}\n`;
}

async function getModules() {
  const entries = await readdir(docsRoot, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();

  const modules = [];
  for (const name of dirs) {
    const modPath = path.join(docsRoot, name);
    const children = await readdir(modPath, { withFileTypes: true });
    const topics = [];

    for (const c of children) {
      if (!c.isDirectory()) continue;
      const indexPath = path.join(modPath, c.name, 'index.mdx');
      try {
        await access(indexPath);
        topics.push(c.name);
      } catch {
        // ignore
      }
    }

    modules.push({ name, topics: topics.sort() });
  }

  return modules;
}

function pagePath(moduleName, topic) {
  return path.join(docsRoot, moduleName, topic, 'index.mdx');
}

async function readWikiPage(moduleName, topic) {
  const p = pagePath(moduleName, topic);
  const raw = await readFile(p, 'utf-8');
  return parseFrontmatter(raw);
}

async function saveWikiPage(moduleName, topic, data) {
  const dir = path.join(docsRoot, moduleName, topic);
  await mkdir(dir, { recursive: true });
  await writeFile(pagePath(moduleName, topic), buildMdx(data), 'utf-8');
}

async function handler(req, res) {
  const url = new URL(req.url, 'http://127.0.0.1');

  try {
    if (req.method === 'GET' && url.pathname === '/') {
      const html = await readFile(htmlPath, 'utf-8');
      return send(res, 200, html, 'text/html; charset=utf-8');
    }

    if (req.method === 'GET' && url.pathname === '/api/modules') {
      const modules = await getModules();
      return json(res, 200, { modules });
    }

    if (req.method === 'GET' && url.pathname === '/api/homepage') {
      const raw = await readFile(homeConfigPath, 'utf-8');
      return json(res, 200, JSON.parse(raw));
    }

    if (req.method === 'POST' && url.pathname === '/api/homepage/save') {
      const payload = await readBody(req);
      await writeFile(homeConfigPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8');
      return json(res, 200, { ok: true });
    }

    if (req.method === 'GET' && url.pathname === '/api/wiki') {
      const moduleName = url.searchParams.get('module') || '';
      const topic = url.searchParams.get('topic') || '';
      if (!safeSlug(moduleName) || !safeSlug(topic)) {
        return json(res, 400, { error: 'invalid module/topic slug' });
      }

      const page = await readWikiPage(moduleName, topic);
      return json(res, 200, page);
    }

    if (req.method === 'POST' && url.pathname === '/api/wiki/create-topic') {
      const { module: moduleName, topic } = await readBody(req);
      if (!safeSlug(moduleName) || !safeSlug(topic)) {
        return json(res, 400, { error: 'invalid module/topic slug' });
      }

      await saveWikiPage(moduleName, topic, {
        title: '快速开始',
        description: '',
        content: '在这里输入内容。',
      });

      return json(res, 200, { ok: true });
    }

    if (req.method === 'POST' && url.pathname === '/api/wiki/save') {
      const { module: moduleName, topic, title, description, content } = await readBody(req);
      if (!safeSlug(moduleName) || !safeSlug(topic)) {
        return json(res, 400, { error: 'invalid module/topic slug' });
      }

      if (!title || String(title).trim().length === 0) {
        return json(res, 400, { error: 'title is required' });
      }

      await saveWikiPage(moduleName, topic, {
        title: String(title).trim(),
        description: String(description || '').trim(),
        content: String(content || ''),
      });

      return json(res, 200, { ok: true });
    }

    return json(res, 404, { error: 'not found' });
  } catch (error) {
    return json(res, 500, { error: error instanceof Error ? error.message : String(error) });
  }
}

const port = Number(process.env.VISUAL_EDITOR_PORT || 3399);
createServer(handler).listen(port, () => {
  console.log(`Shuuyou Visual Editor running at http://localhost:${port}`);
});
