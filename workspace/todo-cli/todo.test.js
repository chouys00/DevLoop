'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { load, save, main } = require('./todo.js');

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

// ---- add 子指令 ----

test('add 新增第一筆：id 為 1、done 為 false', () => {
  const file = tmpFile();
  main(['add', 'buy milk', '--file', file]);
  assert.deepEqual(load(file), [{ id: 1, text: 'buy milk', done: false }]);
});

test('add 第二筆：id 遞增', () => {
  const file = tmpFile();
  main(['add', 'first', '--file', file]);
  main(['add', 'second', '--file', file]);
  const todos = load(file);
  assert.equal(todos.length, 2);
  assert.deepEqual(todos[1], { id: 2, text: 'second', done: false });
});

test('add 多個 positional 以空白串接為單一文字', () => {
  const file = tmpFile();
  main(['add', 'buy', 'more', 'milk', '--file', file]);
  assert.deepEqual(load(file), [{ id: 1, text: 'buy more milk', done: false }]);
});

test('add 缺少文字時丟出錯誤且不建立檔案', () => {
  const file = tmpFile();
  assert.throws(() => main(['add', '--file', file]), /add/);
  assert.equal(fs.existsSync(file), false);
});

// ---- list 子指令 ----

test('list 空清單輸出 (empty)', (t) => {
  const file = tmpFile();
  const logMock = t.mock.method(console, 'log');
  main(['list', '--file', file]);
  const lines = logMock.mock.calls.map((c) => c.arguments.join(' '));
  assert.deepEqual(lines, ['(empty)']);
});

test('list 逐行輸出 id、勾選狀態與文字', (t) => {
  const file = tmpFile();
  save(file, [
    { id: 1, text: 'buy milk', done: false },
    { id: 2, text: 'write tests', done: true },
  ]);
  const logMock = t.mock.method(console, 'log');
  main(['list', '--file', file]);
  const lines = logMock.mock.calls.map((c) => c.arguments.join(' '));
  assert.equal(lines.length, 2);
  assert.match(lines[0], /\[ \]/);
  assert.match(lines[0], /\b1\b/);
  assert.match(lines[0], /buy milk/);
  assert.match(lines[1], /\[x\]/);
  assert.match(lines[1], /\b2\b/);
  assert.match(lines[1], /write tests/);
});

// ---- done 子指令 ----

test('done 標記指定 id 為完成，其餘不變', () => {
  const file = tmpFile();
  save(file, [
    { id: 1, text: 'buy milk', done: false },
    { id: 2, text: 'write tests', done: false },
  ]);
  main(['done', '2', '--file', file]);
  assert.deepEqual(load(file), [
    { id: 1, text: 'buy milk', done: false },
    { id: 2, text: 'write tests', done: true },
  ]);
});

test('done 不存在的 id 丟出錯誤且檔案不變', () => {
  const file = tmpFile();
  const todos = [{ id: 1, text: 'buy milk', done: false }];
  save(file, todos);
  assert.throws(() => main(['done', '99', '--file', file]), /done.*99/);
  assert.deepEqual(load(file), todos);
});

test('done 缺少或非數字 id 丟出錯誤', () => {
  const file = tmpFile();
  save(file, [{ id: 1, text: 'buy milk', done: false }]);
  assert.throws(() => main(['done', '--file', file]), /done/);
  assert.throws(() => main(['done', 'abc', '--file', file]), /done/);
});

// ---- remove 子指令 ----

test('remove 刪除指定 id，其餘保留', () => {
  const file = tmpFile();
  save(file, [
    { id: 1, text: 'buy milk', done: false },
    { id: 2, text: 'write tests', done: true },
  ]);
  main(['remove', '1', '--file', file]);
  assert.deepEqual(load(file), [{ id: 2, text: 'write tests', done: true }]);
});

test('remove 不存在的 id 丟出錯誤且檔案不變', () => {
  const file = tmpFile();
  const todos = [{ id: 1, text: 'buy milk', done: false }];
  save(file, todos);
  assert.throws(() => main(['remove', '99', '--file', file]), /remove.*99/);
  assert.deepEqual(load(file), todos);
});

test('remove 缺少或非數字 id 丟出錯誤', () => {
  const file = tmpFile();
  save(file, [{ id: 1, text: 'buy milk', done: false }]);
  assert.throws(() => main(['remove', '--file', file]), /remove/);
  assert.throws(() => main(['remove', '1.5', '--file', file]), /remove/);
});
