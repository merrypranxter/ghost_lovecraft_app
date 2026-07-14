import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const types = {'.html':'text/html','.js':'text/javascript','.css':'text/css'};
http.createServer(async (req,res)=>{ const url = req.url === '/' ? '/index.html' : req.url; const file = path.join(process.cwd(), url); try { res.setHeader('content-type', types[path.extname(file)] || 'text/plain'); res.end(await readFile(file)); } catch { res.statusCode=404; res.end('not found'); }}).listen(5173, '0.0.0.0', ()=>console.log('dev server on http://0.0.0.0:5173'));
