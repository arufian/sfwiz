# スクラッチ組織構築ガイド

## サンプルデータスクリプトの自動生成とロード

**設計書のデータモデルを参照し、`scripts/apex/loadTestData.apex` を自動生成する。** このステップはユーザーの指示を待たずに自動で実行すること。

このデータの目的は**ユーザーがブラウザでスクラッチ組織にログインして手動で機能を確認するため**のサンプルデータ。エージェント（AI）がテストするためのデータではない。そのため、データはユーザーの手動テストに最適化する：

### サンプルデータの設計指針

- **フィーチャーの動作を目視確認できるデータ** を作成する（例：LWCに表示される項目に値が入っている、Triggerが発火する条件が揃っている、集計結果が0でない）
- 正常ケースと境界ケースの両方を含める（例：データあり/なし、条件を満たす/満たさない）
- **データ名は日本語でわかりやすく** — 「テスト取引先A（注文あり）」「テスト取引先C（注文なし）」のように、何を確認すべきかがレコード名から読み取れる
- 件数は多すぎず少なすぎず。リスト表示なら5〜10件、単一レコード確認なら2〜3件
- ログイン後すぐに機能が確認できるデータ構造にする

### スクリプト生成例

取引先の最終注文日をトラッキングする機能の場合：

```java
// ===== テストデータロードスクリプト =====
// フィーチャー：取引先最終注文日トラッキング
// 生成日：[日付]

// 1. テスト用取引先の作成
List<Account> accounts = new List<Account>{
    new Account(Name = 'テスト取引先A（注文あり）', Industry = 'テクノロジー', BillingCity = '東京'),
    new Account(Name = 'テスト取引先B（注文あり）', Industry = '製造', BillingCity = '大阪'),
    new Account(Name = 'テスト取引先C（注文なし）', Industry = '金融', BillingCity = '名古屋')
};
insert accounts;

// 2. 商談の作成（Triggerが Last_Order_Date__c を更新する）
List<Opportunity> opps = new List<Opportunity>{
    new Opportunity(
        AccountId = accounts[0].Id,
        Name = '商談A-1（成立済み）',
        StageName = '成立',
        CloseDate = Date.today().addDays(-10),
        Amount = 500000
    ),
    new Opportunity(
        AccountId = accounts[0].Id,
        Name = '商談A-2（最新）',
        StageName = '成立',
        CloseDate = Date.today().addDays(-3),
        Amount = 800000
    ),
    new Opportunity(
        AccountId = accounts[1].Id,
        Name = '商談B-1',
        StageName = '成立',
        CloseDate = Date.today().addDays(-30),
        Amount = 1200000
    )
    // accounts[2] は意図的に商談なし → LWCで空表示を確認するため
};
insert opps;

System.debug('===== テストデータロード完了 =====');
System.debug('取引先数：' + accounts.size());
System.debug('商談数：' + opps.size());
System.debug('取引先A ID（LWC確認用）：' + accounts[0].Id);
System.debug('取引先C ID（空表示確認用）：' + accounts[2].Id);
```

---

## デプロイ後のPermission Set割り当て（必須）

カスタムオブジェクト・項目・アプリケーション・LWC等をデプロイしても、Permission Setを割り当てないとUIに表示されない。**デプロイ直後に必ず実行すること。**

```bash
# Permission Setをデフォルトユーザー（System Administrator）に割り当て
sf org assign permset \
  --name <PermissionSetName> \
  --target-org my-scratch-org
```

### ページレイアウトのプロファイル割り当て（必須）

カスタムページレイアウトを作成した場合、System Administrator プロファイルに割り当てないとデフォルトレイアウトが使われ、カスタム項目が表示されない。プロファイル割り当ては `profileLayoutAssignments` メタデータで管理するか、デプロイ後にApexスクリプトで設定する。

プロファイル名の言語依存については `references/metadata-permissions-layout.md` の「プロファイル名の言語依存と対処法」を参照。

### デプロイ後の項目表示確認

デプロイ完了後、すべてのカスタム項目がUI上で表示されることを確認する。表示されない場合は以下を順番にチェック：
1. Permission Setがデフォルトユーザーに割り当てられているか
2. ページレイアウトに項目が配置されているか
3. ページレイアウトがSystem Administrator（またはシステム管理者）プロファイルに割り当てられているか

---

## ユーザーへの引き渡しレポートフォーマット

以下のフォーマットでユーザーに報告する。ユーザーがどこを開けば機能を確認できるかを具体的に案内することが重要。

```
## スクラッチ組織 手動テスト準備完了

### 組織情報
- URL：https://xxx.scratch.lightning.force.com
- エイリアス：my-scratch-org
- 有効期限：30日間

### ロードされたテストデータ
| データ種別 | 件数 | 内容 |
|---|---|---|
| 取引先 | 3件 | テスト取引先A・B（商談あり）、テスト取引先C（商談なし） |
| 商談 | 3件 | 成立済み商談（最終注文日の更新確認用） |

### 手動テスト手順
1. 上記URLからスクラッチ組織にログイン
2. **「テスト取引先A」** の取引先レコードページを開く
   → LWCコンポーネントに最終注文日が表示されることを確認
3. **「テスト取引先C」** の取引先レコードページを開く
   → 注文なしの場合の表示（空欄 or 「注文なし」など）を確認
4. 新しい商談を「成立」で保存する
   → 取引先の最終注文日が更新されることを確認

### デプロイ済み成果物
- Apexクラス：OpportunityTrigger, OpportunityTriggerHandler
- テストクラス：OpportunityTriggerHandlerTest（カバレッジ：XX%）
- カスタム項目：Account.Last_Order_Date__c
- LWC：accountLastOrderDate
```
