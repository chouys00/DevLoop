#!/usr/bin/env node
'use strict';

// todo-cli 骨架：子指令分派 (add/list/done/remove) + JSON 存取層 (load/save)
// 僅使用 Node 22 內建模組。

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');

const DEFAULT_FILE = path.join(__dirname, 'todos.json');

// ---- JSON 存取層 ----

/**
 * 讀取待辦清單。檔案不存在時回傳空陣列。
 * @param {string} [file]
 * @returns {Array<object>}
 */
function load(file = DEFAULT_FILE) {
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, 'utf8');
  if (raw.trim() === '') return [];
  return JSON.parse(raw);
}

/**
 * 寫入待辦清單（覆寫整個檔案）。
 * @param {string} file
 * @param {Array<object>} todos
 */
function save(file = DEFAULT_FILE, todos = []) {
  fs.writeFileSync(file, JSON.stringify(todos, null, 2) + '\n', 'utf8');
}

// ---- 子指令空殼 ----

function cmdAdd(positionals, values) {
  // TODO: 新增待辦事項
  throw new Error('not implemented: add');
}

function cmdList(positionals, values) {
  // TODO: 列出待辦事項
  throw new Error('not implemented: list');
}

function cmdDone(positionals, values) {
  // TODO: 標記完成
  throw new Error('not implemented: done');
}

function cmdRemove(positionals, values) {
  // TODO: 刪除待辦事項
  throw new Error('not implemented: remove');
}

const COMMANDS = {
  add: cmdAdd,
  list: cmdList,
  done: cmdDone,
  remove: cmdRemove,
};

function usage() {
  return [
    'Usage: node todo.js <command> [args]',
    '',
    'Commands:',
    '  add <text>     新增待辦事項',
    '  list           列出待辦事項',
    '  done <id>      標記完成',
    '  remove <id>    刪除待辦事項',
    '',
    'Options:',
    '  --file <path>  指定 JSON 資料檔（預設 todos.json）',
  ].join('\n');
}

// ---- 分派 ----

function main(argv = process.argv.slice(2)) {
  const { values, positionals } = parseArgs({
    args: argv,
    options: {
      file: { type: 'string' },
    },
    allowPositionals: true,
  });

  const [command, ...rest] = positionals;
  const handler = COMMANDS[command];
  if (!handler) {
    console.error(usage());
    process.exitCode = 1;
    return;
  }
  handler(rest, values);
}

if (require.main === module) {
  main();
}

module.exports = { load, save, main, DEFAULT_FILE };
