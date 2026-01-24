# Frontend codex.md (Next.js 16 / MVP)

## 1. 目的

本 codex は、民泊住宅管理システムの **フロントエンド実装指針** を定義する。

- MVP 思想を最優先し「要件の機能が動く」ことをゴールとする
- フロントエンドは **OpenAPI のみ** を通じてバックエンドと通信する
- 認証は Firebase Authentication に完全委譲する

---

## 2. 技術スタック

- Framework: **Next.js 16 (App Router)**
- Language: TypeScript
- UI Library: **Mantine**
- Auth: **Firebase Authentication**
- API Client: OpenAPI generated client
- State Management: React Query（server state 中心）
- Architecture: **Bulletproof React**

---

## 3. 設計原則（重要）

### 3.1 フロントの責務

| 項目 | 方針 |
|---|---|
| 認証 | Firebase でログイン・トークン取得 |
| 認可 | API の 401 / 403 に基づきルーティング制御 |
| 業務ロジック | **一切持たない** |
| 状態管理 | server state を中心に最小限 |

### 3.2 MVP 原則

- デザインは後回し
- エッジケースより通常ケース優先
- 画面遷移が確認できれば OK

---

## 4. ディレクトリ構成（Bulletproof React 準拠）

```txt
src/
├─ app/
│  ├─ (public)/
│  │  └─ page.tsx              # 公開トップ（民泊情報）
│  ├─ (auth)/
│  │  └─ login/page.tsx        # Firebaseログイン
│  ├─ (friend)/
│  │  ├─ availability/page.tsx
│  │  └─ reservations/page.tsx
│  ├─ (host)/
│  │  └─ pre-reservations/page.tsx
│  ├─ layout.tsx
│  └─ providers.tsx            # Mantine / Firebase / Query
│
├─ features/
│  ├─ auth/
│  ├─ public-info/
│  ├─ reservation/
│
├─ components/
│  ├─ ui/                      # Mantine wrapper
│  └─ layout/
│
├─ lib/
│  ├─ firebase/
│  ├─ api/                     # OpenAPI client
│  └─ auth/
│
├─ hooks/
└─ types/
```

---

## 5. 認証フロー（確定）

### 5.1 ログイン

1. Firebase Authentication（Email/Password）でログイン
2. Firebase ID Token を取得
3. API リクエスト時に Authorization Header に付与

```
Authorization: Bearer <Firebase ID Token>
```

---

### 5.2 Bootstrap フロー（必須）

- ログイン直後に必ず実行

1. POST /auth/bootstrap
2. GET /me
3. role に応じてリダイレクト

| role | 遷移先 |
|---|---|
| friend | /availability |
| host | /pre-reservations |

---

## 6. API 通信ルール

- API 呼び出しは lib/api 配下に集約
- Firebase ID Token は fetch interceptor で自動付与
- エラーは共通ハンドリング

---

## 7. MVP 機能一覧

### Public
- 民泊情報表示

### Friend
- 空き確認
- 準予約作成（pending）
- 自分の予約一覧確認

### Host
- 準予約一覧
- 承認 / 却下

---

## 8. Done の定義（MVP）

- ログインできる
- Public 情報が見られる
- Friend が準予約できる
- Host が承認できる

---

この codex.md はフロントエンド実装の唯一の正とする。
