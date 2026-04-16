# note ヘッダー画像ジェネレーター

noteのヘッダー画像（1280×670px）を無料で作れるブラウザツールです。
インストール不要、アカウント不要。URLを開くだけで使えます。

## 使い方

1. URLをブラウザで開く
2. 上部のボタンでテンプレートを切り替える
3. 4つのテキスト欄（TAG / TITLE / SUB / DATE）に好きな文字を入力
4. 「プレビュー更新」を押すと、下のプレビューに反映される
5. 「PNGダウンロード」を押すと、1280×670pxの画像がダウンロードされる

あとはnoteの記事編集画面でヘッダー画像としてアップロードするだけです。

---

## テンプレートを増やす方法（AI を使うやり方）

テンプレートの追加はAI（Claude Code / Gemini CLI など）に任せるのが一番簡単です。
プログラミングの知識は不要です。以下の手順に沿って進めてください。

### 1. リポジトリをダウンロードする

好きな場所にフォルダを作って、ターミナルで以下を実行します。

```bash
# 例: デスクトップにダウンロードする場合
cd ~/Desktop
git clone https://github.com/yuto-0910/Header_Generator.git
```

`Header_Generator` というフォルダがデスクトップに作られます。

### 2. ターミナルでフォルダに移動する

```bash
cd ~/Desktop/Header_Generator
```

### 3. AIを呼び出してテンプレートを追加してもらう

Claude Code の場合:

```bash
claude
```

Gemini CLI の場合:

```bash
gemini
```

AIが起動したら、以下の指示文をコピーして貼り付けてください。
`「」` 内のデザイン説明を自分の好みに書き換えるだけでOKです。

---

### AIへの指示文テンプレート

```
このプロジェクトはnoteヘッダー画像ジェネレーターです。
新しいテンプレートを1つ追加してください。

■ デザインの希望
「背景はネイビー、白い細いラインで幾何学模様、タイトルは白く大きく中央寄せ」

■ 作業内容（この2つだけ）
1. templates/ に新しいHTMLファイルを作成する（例: 06-geometry.html）
2. templates/index.json に新しいテンプレートの情報を1行追加する

■ HTMLファイルの仕様（必ず守ること）
- 1280×670px の div を1つだけ含むHTMLスニペットにする（<!DOCTYPE html> や <html> タグは不要）
- 以下4つのプレースホルダーを必ず含める: {{TAG}}  {{TITLE}}  {{SUB}}  {{DATE}}
- CSSは全てstyle属性のインラインで書く（<style> タグは使わない）
- フォントは Google Fonts の Noto Serif JP / Noto Sans JP のみ使用可
- 外部ライブラリや画像ファイルは使わない

■ index.json の追記ルール
- id は連番（既存の最後が "05" なら "06"）
- name はテンプレートの日本語名（例: "ジオメトリ"）
- file はHTMLファイル名（例: "06-geometry.html"）

■ 禁止事項（以下のファイル・操作には絶対に触れないこと）
- index.html は一切編集するな
- templates/ 内の既存ファイル（01-wamo.html 〜 05-typo.html）は変更するな
- templates/ 以外のディレクトリにファイルを作成するな
- npm install やライブラリの追加は行うな
- 既存テンプレートの id や file 名を書き換えるな
```

---

### 4. 確認する

AIが作業を終えたら、ローカルで確認できます。

```bash
npx serve .
```

http://localhost:3000 をブラウザで開いて、新しいテンプレートが追加されていればOKです。

### 5.（任意）GitHubに反映する

```bash
git add .
git commit -m "テンプレート追加"
git push
```

GitHub Pagesを有効にしていれば、pushするだけで公開サイトに反映されます。

---

## URLクリックでターミナルを使わずに使いたい場合

1. このリポジトリをfork
2. GitHubのリポジトリ設定からGitHub Pagesを有効化
3. 自分専用のURLが発行される
4. 以降はそのURLをブックマークして使う

## 技術スタック

- HTML / CSS / JavaScript（フレームワーク不使用）
- html2canvas 1.4.1
- Google Fonts（Noto Serif JP / Noto Sans JP）
- GitHub Pagesでホスティング
