import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES = {
  "01": "01-wamo.html",
  "02": "02-minimal.html",
  "03": "03-dark.html",
  "04": "04-grid.html",
  "05": "05-typo.html",
};

const TEMPLATES_DIR = path.resolve(__dirname, "../templates");

const server = new McpServer({
  name: "header-generator",
  version: "1.0.0",
});

server.tool(
  "generate_header",
  "noteのヘッダー画像（1280×670px）をPNGで生成して保存する。テンプレートID（01〜05）、タグ、タイトル、サブタイトル、日付を指定する。",
  {
    template: z
      .string()
      .default("01")
      .describe('テンプレートID。"01"〜"05"から選択'),
    tag: z.string().describe("カテゴリ/タグ（例: エッセイ）"),
    title: z.string().describe("タイトル"),
    sub: z.string().describe("サブタイトル"),
    date: z.string().describe("日付（例: 2026.04）"),
    output_dir: z
      .string()
      .default("")
      .describe("保存先ディレクトリ。省略時はDownloadsフォルダ"),
  },
  async ({ template, tag, title, sub, date, output_dir }) => {
    const templateFile = TEMPLATES[template];
    if (!templateFile) {
      const validIds = Object.keys(TEMPLATES).join(", ");
      return {
        content: [
          {
            type: "text",
            text: `エラー: テンプレートID "${template}" は存在しません。有効なID: ${validIds}`,
          },
        ],
      };
    }

    const templatePath = path.join(TEMPLATES_DIR, templateFile);
    let html = fs.readFileSync(templatePath, "utf-8");

    html = html
      .replace(/\{\{TAG\}\}/g, tag)
      .replace(/\{\{TITLE\}\}/g, title)
      .replace(/\{\{SUB\}\}/g, sub)
      .replace(/\{\{DATE\}\}/g, date)
      .replace(/\{\{FIRST_CHAR\}\}/g, title.charAt(0) || "");

    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;700&display=swap" rel="stylesheet">
  <style>body{margin:0;padding:0;}</style>
</head>
<body>${html}</body>
</html>`;

    const outputDir = output_dir || path.join(os.homedir(), "Downloads");
    fs.mkdirSync(outputDir, { recursive: true });

    const timestamp = Date.now();
    const filename = `note-header-${template}-${timestamp}.png`;
    const outputPath = path.join(outputDir, filename);

    const browser = await puppeteer.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 670, deviceScaleFactor: 2 });
      await page.setContent(fullHtml, { waitUntil: "networkidle0" });
      await page.screenshot({
        path: outputPath,
        clip: { x: 0, y: 0, width: 1280, height: 670 },
      });
    } finally {
      await browser.close();
    }

    return {
      content: [
        {
          type: "text",
          text: `ヘッダー画像を保存しました: ${outputPath}`,
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
