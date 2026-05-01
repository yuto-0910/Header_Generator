# note ヘッダー画像ジェネレーター — MCPサーバー

Claude Desktop・Gemini CLI・Claude Codeのチャットから話しかけるだけで、
noteヘッダー画像（1280×670px）がDownloadsフォルダに保存されるMCPサーバーです。

## 必要環境

- Node.js 18以上
- Claude Desktop、Gemini CLI、Claude Codeのいずれか

## インストール手順

```bash
git clone https://github.com/yuto-0910/Header_Generator.git
cd Header_Generator/mcp
npm install
```

> **注意:** `npm install` 時にChromium（約200MB）が自動ダウンロードされます。
> 時間がかかりますが正常な動作です。完了まで中断しないでください。

## 環境別セットアップ

設定はAI（Claude Code / Gemini CLI）にやってもらうのが一番簡単です。
ターミナルでAIを起動して、以下のプロンプトをコピペしてください。

---

### A) Claude Desktop で使う場合

AIに以下をコピペ:

````
# MCPサーバーの接続設定タスク

## やること
1. header-generator MCPサーバーの依存パッケージをインストールする
2. Claude Desktopの設定ファイルにMCPサーバーを登録する

## 手順

### 1. 依存パッケージをインストールする
mcp/ ディレクトリに移動して npm install を実行しろ。
```
cd mcp
npm install
```
node_modules/ が存在しないとサーバーが起動できない。
npm install 時にChromium（約200MB）が自動ダウンロードされるが、正常な動作なので完了まで中断するな。

### 2. server.js の絶対パスを確認する
以下のコマンドをターミナルで実行して、server.jsの絶対パスを取得しろ。

macOS / Linux:
```
realpath mcp/server.js
```

Windows (PowerShell):
```
(Resolve-Path mcp/server.js).Path
```

取得したパスを次のステップで使う。
Windowsの場合、JSONに書き込む際はバックスラッシュ（\）をダブルバックスラッシュ（\\）にエスケープするか、フォワードスラッシュ（/）に置換すること。

### 3. 設定ファイルを編集する
以下のファイルを開け:
- Mac:     ~/Library/Application Support/Claude/claude_desktop_config.json
- Windows: %APPDATA%\Claude\claude_desktop_config.json

ファイルが存在しない場合は新規作成しろ。

このファイルのJSON内に "mcpServers" キーを追加し、以下の内容を書き込め:

```json
"mcpServers": {
  "header-generator": {
    "command": "node",
    "args": ["（↑で取得したserver.jsの絶対パス）"]
  }
}
```

### 4. 重要な注意
- 既存の設定（"preferences" など）は絶対に削除・変更するな
- 既存の "mcpServers" がある場合は、その中に "header-generator" を追加しろ（上書きするな）
- JSONの構文を壊すな（カンマの過不足に注意）
- このタスクで編集していいファイルは claude_desktop_config.json の1ファイルだけだ
- mcp/server.js、index.html、templates/ 内のファイルには一切触れるな
````

設定後、Claude Desktopを再起動してください。

**再起動後、ツールの権限設定が必要です:**

1. Claude Desktopのチャット画面を開く
2. 左下の「カスタマイズ」タブを開く
3. 「コネクタ」を開く
4. コネクタ一覧に **header-generator** が表示されているので、クリックする
5. ツールの権限設定画面が表示される。ステータスが3つある:
   - **承認が必要** — 実行のたびに確認ダイアログが出る（初めはこれが安心）
   - **常に許可** — 確認なしで自動実行される
   - **ブロック済み** — ツールが使えない
6. 「**常に許可**」または「**承認が必要**」を選択する

> ⚠️ 「ブロック済み」のままだとツールが呼び出せません。必ず上記どちらかに設定してください。

**使い方の例:**

> ダークテンプレートで、タグはエッセイ、タイトルは「思考の余白」、
> サブタイトルは「言語化できないものを書く」、日付は2026.04でヘッダー画像を作って

---

### B) Gemini CLI で使う場合

AIに以下をコピペ:

````
# MCPサーバーの接続設定タスク

## やること
1. header-generator MCPサーバーの依存パッケージをインストールする
2. Gemini CLIの設定ファイルにMCPサーバーを登録する

## 手順

### 1. 依存パッケージをインストールする
mcp/ ディレクトリに移動して npm install を実行しろ。
```
cd mcp
npm install
```
node_modules/ が存在しないとサーバーが起動できない。
npm install 時にChromium（約200MB）が自動ダウンロードされるが、正常な動作なので完了まで中断するな。

### 2. server.js の絶対パスを確認する
以下のコマンドをターミナルで実行して、server.jsの絶対パスを取得しろ。

macOS / Linux:
```
realpath mcp/server.js
```

Windows (PowerShell):
```
(Resolve-Path mcp/server.js).Path
```

取得したパスを次のステップで使う。
Windowsの場合、JSONに書き込む際はバックスラッシュ（\）をダブルバックスラッシュ（\\）にエスケープするか、フォワードスラッシュ（/）に置換すること。

### 3. 設定ファイルを編集する
以下のファイルを開け:
~/.gemini/settings.json

ファイルが存在しない場合は新規作成しろ。

このファイルのJSON内に "mcpServers" キーを追加し、以下の内容を書き込め:

```json
"mcpServers": {
  "header-generator": {
    "command": "node",
    "args": ["（↑で取得したserver.jsの絶対パス）"]
  }
}
```

### 4. 重要な注意
- 既存の設定内容は絶対に削除・変更するな
- 既存の "mcpServers" がある場合は、その中に "header-generator" を追加しろ（上書きするな）
- JSONの構文を壊すな（カンマの過不足に注意）
- このタスクで編集していいファイルは ~/.gemini/settings.json の1ファイルだけだ
- mcp/server.js、index.html、templates/ 内のファイルには一切触れるな
````

設定後、ターミナルで `gemini` を起動して話しかけるだけです。
Gemini CLIは設定ファイルの変更が即時反映されるため、再起動は不要です。

**使い方の例:**

> 和モダンテンプレートで、タグはコラム、タイトルは「朝のルーティン」、
> サブタイトルは「小さな習慣が人生を変える」、日付は2026.04でヘッダー画像を作って

---

### C) Claude Code で使う場合

AIに以下をコピペ:

````
# MCPサーバーの接続設定タスク

## やること
1. header-generator MCPサーバーの依存パッケージをインストールする
2. Claude Codeの設定ファイルにMCPサーバーを登録する

## 手順

### 1. 依存パッケージをインストールする
mcp/ ディレクトリに移動して npm install を実行しろ。
```
cd mcp
npm install
```
node_modules/ が存在しないとサーバーが起動できない。
npm install 時にChromium（約200MB）が自動ダウンロードされるが、正常な動作なので完了まで中断するな。

### 2. server.js の絶対パスを確認する
以下のコマンドをターミナルで実行して、server.jsの絶対パスを取得しろ。

macOS / Linux:
```
realpath mcp/server.js
```

Windows (PowerShell):
```
(Resolve-Path mcp/server.js).Path
```

取得したパスを次のステップで使う。
Windowsの場合、JSONに書き込む際はバックスラッシュ（\）をダブルバックスラッシュ（\\）にエスケープするか、フォワードスラッシュ（/）に置換すること。

### 3. 設定ファイルを編集する
プロジェクトルートに .claude/settings.json を作成（または開いて）、
以下の内容を書き込め:

```json
{
  "mcpServers": {
    "header-generator": {
      "command": "node",
      "args": ["（↑で取得したserver.jsの絶対パス）"]
    }
  }
}
```

### 4. 重要な注意
- 既存の設定内容は絶対に削除・変更するな
- 既存の "mcpServers" がある場合は、その中に "header-generator" を追加しろ（上書きするな）
- JSONの構文を壊すな（カンマの過不足に注意）
- このタスクで編集していいファイルは .claude/settings.json の1ファイルだけだ
- mcp/server.js、index.html、templates/ 内のファイルには一切触れるな
````

Claude Codeを再起動すれば使えるようになります。

## テンプレート一覧

| ID | 名前     |
|----|----------|
| 01 | 和モダン |
| 02 | ミニマル |
| 03 | ダーク   |
| 04 | グリッド |
| 05 | タイポ   |

## テンプレートを追加したい場合（AI向け手順）

テンプレートの追加はAI（Claude Code / Gemini CLI）に
以下のプロンプトをコピペして依頼することを推奨します。

---

**ここからコピペ ↓**

````
# テンプレート追加タスク

## 追加するテンプレートの情報
- ID: [XX]（既存の最大IDの次の番号。例: 既存が05なら06）
- ファイル名: [XX-name.html]（例: 06-geometry.html）
- テンプレート名: [名前]（例: 幾何学）
- デザインイメージ: [自由に記述]

## 作業指示

### やること
1. templates/[XX-name.html] を新規作成する
2. mcp/server.js の TEMPLATES定数 に以下の1行を追加する
   "[XX]": "[XX-name.html]"

### 絶対にやらないこと（厳守）
- mcp/server.js の TEMPLATES定数 以外の箇所を編集するな
- index.html を編集するな
- package.json を編集するな
- 既存のテンプレートファイル（01〜05）を編集するな
- mcp/README.md を編集するな
- ルートのREADME.md を編集するな

### テンプレートHTMLの仕様
- 1280×670pxのdivを1つだけ作成する
- 完全なHTMLドキュメント形式にしない（HTMLスニペットのみ）
- 以下4つのプレースホルダーを必ず含める：
  {{TAG}} {{TITLE}} {{SUB}} {{DATE}}
- 外部フォントはGoogle Fonts（Noto Serif JP / Noto Sans JP）のみ
- CSSはstyle属性インラインで完結させる
- 必ず既存の01-wamo.htmlを読み込んでからコーディングスタイルを踏襲して作成すること
````

**ここまでコピペ ↑**

---

## ライセンス

MIT
