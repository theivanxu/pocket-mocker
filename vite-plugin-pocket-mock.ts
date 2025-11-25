// vite-plugin-pocket-mock.ts
import fs from 'fs';
import path from 'path';
import type { Plugin } from 'vite';

// 我们把配置存在项目根目录下的这个文件里
const CONFIG_FILE_NAME = 'pocket-mock.json';

export default function pocketMockPlugin(): Plugin {
  return {
    name: 'vite-plugin-pocket-mock',

    // configureServer 钩子允许我们要给 Vite 的开发服务器添加自定义中间件
    configureServer(server) {
      console.log('[PocketMock] 插件已加载');

      server.middlewares.use((req, res, next) => {
        console.log(`[PocketMock] 请求: ${req.method} ${req.url}`);

        // 处理 /__pocket_mock/rules
        if (req.url?.startsWith('/__pocket_mock/rules') && req.method === 'GET') {
          console.log('[PocketMock] 处理 GET /__pocket_mock/rules');
          const configPath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

          try {
            if (fs.existsSync(configPath)) {
              // 如果文件存在，读取并返回
              const data = fs.readFileSync(configPath, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(data);
              console.log(`[PocketMock] 读取配置文件: ${CONFIG_FILE_NAME}`);
            } else {
              // 如果文件不存在，返回空数组
              res.setHeader('Content-Type', 'application/json');
              res.end('[]');
              console.log(`[PocketMock] 配置文件不存在，返回空数组`);
            }
            return; // 重要：不要调用 next()
          } catch (e) {
            console.error('[PocketMock] 读取配置失败', e);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Failed to read config' }));
            return;
          }
        }

        // 处理 /__pocket_mock/save
        if (req.url?.startsWith('/__pocket_mock/save') && req.method === 'POST') {
          console.log('[PocketMock] 处理 POST /__pocket_mock/save');
          // Node.js 处理 POST Body 需要通过流 (Stream) 的方式
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', () => {
            try {
              const configPath = path.resolve(process.cwd(), CONFIG_FILE_NAME);
              // 格式化写入文件 (缩进2空格)
              // 这里的 body 已经是前端发来的 JSON 字符串了
              fs.writeFileSync(configPath, body);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
              console.log(`[PocketMock] 规则已保存到 ${CONFIG_FILE_NAME}`);
            } catch (e) {
              console.error('[PocketMock] 保存失败', e);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Save failed' }));
            }
          });
          return; // 重要：不要调用 next()
        }

        // 如果不是我们的 API，继续处理其他请求
        next();
      });
    }
  }
}