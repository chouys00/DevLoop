'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { load, save } = require('./todo.js');

function tmpFile() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'todo-cli-'));
  return path.join(dir, 'todos.json');
}

test('load 回傳空陣列當檔案不存在', () => {
  const file = tmpFile();
  assert.deepEqual(load(file), []);
});

test('save 後 load 取回相同資料', () => {
  const file = tmpFile();
  const todos = [
    { id: 1, text: 'buy milk', done: false },
    { id: 2, text: 'write tests', done: true },
  ];
  save(file, todos);
  assert.deepEqual(load(file), todos);
});

test('save 寫出合法 JSON 檔', () => {
  const file = tmpFile();
  save(file, [{ id: 1, text: 'x', done: false }]);
  const raw = fs.readFileSync(file, 'utf8');
  assert.deepEqual(JSON.parse(raw), [{ id: 1, text: 'x', done: false }]);
});

test('save 空陣列後 load 回傳空陣列', () => {
  const file = tmpFile();
  save(file, []);
  assert.deepEqual(load(file), []);
});
