// src/core/store.ts
import { writable } from 'svelte/store';
import { type MockRule, updateRules } from './interceptor';

// Svelte Store
export const rules = writable<MockRule[]>([]);

let isInitialized = false;


// === 1. 从 Dev Server 加载规则 ===
export const loadRulesFromServer = async () => {
  try {
    const res = await fetch('/__pocket_mock/rules');
    if (res.ok) {
      // 检查响应内容类型是否为 JSON
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        // 如果本地文件是空的，或者没文件，data 可能是 []
        // 如果有数据，更新 store
        if (Array.isArray(data) && data.length > 0) {
          rules.set(data);
          isInitialized = true;
          return; // 成功加载，直接返回
        }
      }
    }
  } catch (e) {
    console.warn('Dev Server 不可用，使用本地默认配置:', e);
  }

  // 如果服务器没数据或连接失败，给个默认 Demo，方便用户上手
  console.log('🚀 PocketMock 使用默认配置');
  rules.set([{
    id: 'demo-1',
    url: '/api/demo',
    method: 'GET',
    response: { msg: '来自 PocketMock 的默认配置' },
    enabled: true,
    delay: 500,
    status: 200,
    headers: {}
  }]);

  isInitialized = true;
};

// === 2. 订阅变化并保存到 Dev Server ===
rules.subscribe((value) => {
  // 同步给拦截器内存
  updateRules(value);

  // 关键：只有初始化完成后，数据的变化才应该触发保存。
  // 否则刚启动时 store 是空的，会把服务器的文件也覆盖成空的。
  if (isInitialized) {
    saveRulesToServer(value);
  }
});

let saveTimer: any;
const saveRulesToServer = (newRules: MockRule[]) => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    fetch('/__pocket_mock/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRules, null, 2) // 格式化 JSON
    }).catch(e => console.error('保存失败', e));
  }, 500); // 500ms 防抖
};


export const toggleRule = (id: string) => {
  rules.update(items => items.map(r =>
    r.id === id ? { ...r, enabled: !r.enabled } : r
  ));
};

export const updateRuleResponse = (id: string, newResponseJson: string) => {
  try {
    const parsed = JSON.parse(newResponseJson);
    rules.update(items => items.map(r =>
      r.id === id ? { ...r, response: parsed } : r
    ));
    return true; // 更新成功
  } catch (e) {
    console.error("JSON 格式错误", e);
    return false; // 更新失败
  }
};

export const updateRuleDelay = (id: string, delay: number) => {
  rules.update(items => items.map(r => r.id === id ? { ...r, delay } : r));
};

// 新增：添加新规则
export const addRule = (url: string, method: string) => {
  const newRule: MockRule = {
    id: Date.now().toString(),
    url,
    method,
    response: { message: "Hello PocketMock" },
    enabled: true,
    delay: 0,
    status: 200,
    headers: {}
  };
  rules.update(items => [newRule, ...items]);
};


export const deleteRule = (id: string) => {
  rules.update(items => items.filter(r => r.id !== id));
}

export const updateRuleHeaders = (id: string, newHeadersJson: string) => {
  try {
    const parsed = JSON.parse(newHeadersJson);
    rules.update(items => items.map(r =>
      r.id === id ? { ...r, headers: parsed } : r
    ));
    return true;
  } catch (e) {
    console.error("Headers JSON 格式错误", e);
    return false;
  }
};

// 新增 action：更新状态码
export const updateRuleStatus = (id: string, status: number) => {
  rules.update(items => items.map(r => r.id === id ? { ...r, status } : r));
};