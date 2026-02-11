import { describe, it, expect, beforeEach } from 'vitest';
import { generateMockData, registerCustomRules, clearCustomRules } from '../../../src/core/engine/smart-mock';

describe('Custom Rules (Aliases/Macros)', () => {
  beforeEach(() => {
    clearCustomRules();
  });

  it('should expand a custom rule used as a value in an object', () => {
    registerCustomRules({
      '@myuser': {
        id: '@guid',
        name: '@name',
        email: '@email'
      }
    });

    const template = {
      code: 0,
      msg: 'Login Success.',
      userinfo: '@myuser'
    };

    const result = generateMockData(template);
    expect(result.code).toBe(0);
    expect(result.msg).toBe('Login Success.');
    expect(result.userinfo).toHaveProperty('id');
    expect(result.userinfo).toHaveProperty('name');
    expect(result.userinfo).toHaveProperty('email');
    expect(typeof result.userinfo.id).toBe('string');
    expect(typeof result.userinfo.name).toBe('string');
    expect(typeof result.userinfo.email).toBe('string');
  });

  it('should expand a custom rule used as a top-level string', () => {
    registerCustomRules({
      '@myuser': {
        id: '@guid',
        name: '@name'
      }
    });

    const result = generateMockData('@myuser');
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
  });

  it('should support registering rules without @ prefix', () => {
    registerCustomRules({
      myuser: {
        id: '@guid',
        name: '@name'
      }
    });

    const result = generateMockData('@myuser');
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
  });

  it('should support nested custom rules referencing other custom rules', () => {
    registerCustomRules({
      '@myaddress': {
        city: '@pick(NYC,LA,Chicago)',
        zip: '@integer(10000,99999)'
      },
      '@myuser': {
        name: '@name',
        address: '@myaddress'
      }
    });

    const template = { user: '@myuser' };
    const result = generateMockData(template);
    expect(result.user).toHaveProperty('name');
    expect(result.user).toHaveProperty('address');
    expect(result.user.address).toHaveProperty('city');
    expect(result.user.address).toHaveProperty('zip');
  });

  it('should expand custom rules inside arrays with |count syntax', () => {
    registerCustomRules({
      '@myitem': {
        id: '@guid',
        label: '@string(5)'
      }
    });

    const template = {
      'items|3': '@myitem'
    };

    const result = generateMockData(template);
    expect(result.items).toBeInstanceOf(Array);
    expect(result.items).toHaveLength(3);
    result.items.forEach((item: any) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('label');
    });
  });

  it('should not mutate the original custom rule template', () => {
    const userTemplate = {
      id: '@guid',
      name: '@name'
    };

    registerCustomRules({ '@myuser': userTemplate });

    generateMockData({ user: '@myuser' });
    generateMockData({ user: '@myuser' });

    // Original template should remain unchanged
    expect(userTemplate.id).toBe('@guid');
    expect(userTemplate.name).toBe('@name');
  });

  it('should support custom rules with primitive values', () => {
    registerCustomRules({
      '@myconst': 42
    });

    const template = { value: '@myconst' };
    const result = generateMockData(template);
    expect(result.value).toBe(42);
  });

  it('should clearCustomRules properly', () => {
    registerCustomRules({
      '@myuser': { id: '@guid' }
    });

    clearCustomRules();

    const template = { user: '@myuser' };
    const result = generateMockData(template);
    // Without custom rules, @myuser should remain as-is (unresolved string)
    expect(result.user).toBe('@myuser');
  });

  it('should not override built-in generators with custom rules', () => {
    registerCustomRules({
      '@guid': { custom: true }
    });

    const template = { id: '@guid' };
    const result = generateMockData(template);
    // Built-in guid generator should take precedence
    expect(typeof result.id).toBe('string');
    expect(result.id).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
  });

  it('should support the example from issue #15', () => {
    registerCustomRules({
      '@myuser': {
        id: '@guid',
        name: '@name',
        email: '@email',
        avatar: '@image(100x100)',
        age: '@integer(18,60)',
        role: '@pick(admin,user)'
      }
    });

    const template = {
      code: 0,
      msg: 'Login Success.',
      userinfo: '@myuser'
    };

    const result = generateMockData(template);
    expect(result.code).toBe(0);
    expect(result.msg).toBe('Login Success.');
    expect(result.userinfo).toHaveProperty('id');
    expect(result.userinfo).toHaveProperty('name');
    expect(result.userinfo).toHaveProperty('email');
    expect(result.userinfo).toHaveProperty('avatar');
    expect(result.userinfo).toHaveProperty('age');
    expect(result.userinfo).toHaveProperty('role');
    expect(result.userinfo.avatar).toBe('https://via.placeholder.com/100x100');
    expect(result.userinfo.age).toBeGreaterThanOrEqual(18);
    expect(result.userinfo.age).toBeLessThanOrEqual(60);
    expect(['admin', 'user']).toContain(result.userinfo.role);
  });

  it('should allow merging new custom rules into existing ones', () => {
    registerCustomRules({
      '@myuser': { name: '@name' }
    });
    registerCustomRules({
      '@myproduct': { title: '@string(10)' }
    });

    const template = {
      user: '@myuser',
      product: '@myproduct'
    };
    const result = generateMockData(template);
    expect(result.user).toHaveProperty('name');
    expect(result.product).toHaveProperty('title');
  });
});
