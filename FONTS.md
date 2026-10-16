# 自托管字体（vendor drop）

本目录是从 npm 上抓下来、直接放进 `public/` 的静态字体文件，构建时不经过打包器，
按 `/fonts/...` 绝对路径原样对外提供。**请勿手工改动文件内容。**

| 目录 | 字体 | 用途 | 来源 | 版本 |
| --- | --- | --- | --- | --- |
| `noto-serif-sc/` | 思源宋体 Noto Serif SC（可变字重 200–900） | 正文 / 全站默认 | `@fontsource-variable/noto-serif-sc` | 5.3.1 |
| `maple-mono/` | Maple Mono（拉丁子集，400/500/600/700 + 400 斜体） | 代码、等宽场景 | `@fontsource/maple-mono` | 5.3.0 |

上游：<https://github.com/notofonts/noto-cjk>、<https://github.com/subframe7536/maple-font>，
两者均为 **SIL Open Font License 1.1**。

## 为什么不是 `pnpm add`

- CJK 字体的 `@font-face` 分片太多（思源宋体 101 片），
  走 `fontConfig.ts` 的「单个 src」模型表达不了；直接 import npm 包的 CSS 又会让
  Vite 在构建时额外处理上百个资源。
- 放进 `public/` 后由 Cloudflare Workers 静态资源直接托管，
  路径稳定、不需要跑包管理器，也不受 `pnpm-lock.yaml` 影响。

## 更新步骤

```bash
BASE=https://cdn.jsdelivr.net/npm/@fontsource-variable/noto-serif-sc@<版本>
# 1. 抓 CSS 并把 url(./files/...) 改写成 url(/fonts/noto-serif-sc/files/...)
curl -s "$BASE/index.css" | sed 's|url(\./files/|url(/fonts/noto-serif-sc/files/|g' \
  > src/styles/noto-serif-sc.css
# 2. 抓全部分片（文件名列表见 jsDelivr data API）
#    https://data.jsdelivr.com/v1/packages/npm/@fontsource-variable/noto-serif-sc@<版本>
```

Maple Mono 只需 `latin-*` 子集，改完版本号后同步 `src/styles/maple-mono.css` 里的文件名。

## 相关配置位置

- `src/styles/main.css` — `@theme` 里的 `--font-sans` / `--font-mono`
- `src/styles/markdown.css` — 行内 `code`
- `src/styles/expressive-code.css` + `astro.config.mjs` 的 `codeFontFamily` — 代码块
