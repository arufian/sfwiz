# SOQLベストプラクティス

## 基本原則

### 1. 選択的なフィルタリングを行う

大規模データを持つオブジェクトをフィルターする際は、慎重かつ選択的にフィルタリングを行う。フルスキャンを防ぐことがパフォーマンスの鍵。

**文字列の先頭にワイルドカードを使用しない**

```sql
-- ✅ Good（末尾に%を使用）
SELECT Name FROM Account WHERE Name LIKE 'A%'

-- ❌ Bad（先頭にワイルドカード → フルスキャン）
SELECT Name FROM Account WHERE Name LIKE '%Corp'
```

**インデックス付き項目をWHERE句に使用する**

各Salesforceオブジェクトにはインデックス付き項目が存在する（Id、Name、CreatedDate、SystemModstamp、RecordType、オーナーなど）。オブジェクト設定の「項目とリレーション」でインデックスを確認できる。

```sql
-- ✅ Good（インデックス付き項目を使用）
SELECT Id FROM Account WHERE Name LIKE 'A%'

-- ❌ Bad（インデックスなし項目）
SELECT Id FROM Account WHERE ShippingAddress LIKE 'A%'
```

### 2. SELECT句は必要なフィールドのみ取得する

`SELECT *` は存在しないが、不要なフィールドを大量に取得するのも同様にリソースを消費する。必要なデータだけを指定すること。

### 3. 単一レコード取得には `=` を使用する（INより速い）

```java
// ❌ Bad（単一IDに対してINを使用）
List<Account> accs = [SELECT Id FROM Account WHERE Id IN :recordId];
HttpRequest req = new HttpRequest();
req.setEndpoint(accs[0].BillingUrl__c); // 最初の1件しか使わない

// ✅ Good（=で単一レコードを直接取得）
Account acc = [SELECT Id, BillingUrl__c FROM Account WHERE Id = :recordId];
```

理由：
1. `=` はリスト全体でなく単一値でフィルタリングするため速い
2. SalesforceはレコードIDに自動インデックスを付与しており、`=` がこれを最大限に活用する
3. クエリプランナーが `=` クエリをより効果的に最適化する

### 4. LIMIT と OFFSET を適切に使用する

```sql
-- レコード数を制限
SELECT Name FROM Account LIMIT 10

-- ページネーション（OFFSETは大規模データでパフォーマンス低下に注意）
SELECT Name FROM Account LIMIT 10 OFFSET 20
```

### 5. 集計関数でデータ集計する

```sql
-- 全レコードを取得せずに集計
SELECT Industry, COUNT(Id) FROM Account GROUP BY Industry
```

### 6. サブクエリで関連データを効率的に取得する

```sql
-- 取引先と関連する取引先責任者を1クエリで取得
SELECT Name, (SELECT LastName FROM Contacts) FROM Account
```

### 7. IDをハードコードしない

```java
// ❌ Bad（環境ごとにIDが変わる）
SELECT Name FROM Account WHERE Id = '001XXXXXXXXXXXXXXX'

// ✅ Good（バインド変数を使用）
SELECT Name FROM Account WHERE Id = :recordId
```

---

## SOQLの記述フォーマット規則

読みやすさと保守性のために以下の規則に従う：

1. **SOQLキーワードは大文字**（`SELECT`、`FROM`、`WHERE`、`ORDER BY` など）
2. **項目名はパスカルケース**（`Id`、`Name`、`StatusCode__c` など）
3. **変数はキャメルケース**（`recordId`、`listId` など）

```sql
-- ✅ 正しいフォーマット
SELECT Id, Name, BillingUrl__c, StatusCode__c FROM Account WHERE Id = :recordId
```

---

## クエリプランでパフォーマンスを検証する

### クエリプランの有効化
1. 開発者コンソール > Help > Preferences
2. 「Enable Query Plan」にチェックを付けて保存

### 確認すべき指標

| 指標 | 意味 |
|---|---|
| Cardinality | 返ってくるレコード数（予想） |
| Fields | クエリオプティマイザが利用するインデックス項目（nullならインデックス未使用） |
| Leading Operation Type | `Index`（インデックス使用）/ `Table Scan`（全件スキャン） |
| Cost | 値が1を超えるクエリは「選択的」とならない。小さいほど良い |

**Cost が1を超えるクエリはパフォーマンス問題のリスクあり。必ず見直すこと。**

---

## 参考リンク
- [SOQLクエリを選択的にする](https://help.salesforce.com/s/articleView?id=000385218&type=1)
- [SOQLクエリのパフォーマンス改善 - 選択性とカスタムインデックス](https://help.salesforce.com/s/articleView?id=000387172&type=1)
- [クエリプランツールのFAQ](https://help.salesforce.com/s/articleView?id=000386864&type=1)
