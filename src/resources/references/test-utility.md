# Apexテストユーティリティクラス（TestUtilityBase）

テストクラスのベストプラクティスを簡単に実装するための共通ユーティリティクラス。テストデータ作成・ユーザーコンテキスト管理・HTTPモック化・アサーションを標準化する。

## 主な機能

### 1. ユーザーコンテキスト管理

```java
// 現在のユーザーを取得
User currentUser = TestUtilityBase.getCurrentUser();

// テストユーザーの作成（挿入なし）
User testUser = TestUtilityBase.createTestUser('標準ユーザー', 'testuser');

// テストユーザーの作成と即時挿入
User insertedUser = TestUtilityBase.createAndInsertTestUser('システム管理者', 'admin');

// 特定ユーザーコンテキストでコードを実行
System.runAs(testUser) {
    // このブロック内のコードはtestUserの権限で実行される
}
```

### 2. テストデータ作成

**静的リソースからのデータ読み込み**

```java
List<SObject> accounts = TestUtilityBase.loadTestData('Account', 'TestAccounts');
```

**単体レコードの作成**

```java
Map<String, Object> accountFields = new Map<String, Object>{
    'Name' => 'テスト取引先',
    'Industry' => 'テクノロジー',
    'Phone' => '03-1234-5678'
};

// 作成のみ（挿入なし）
SObject account = TestUtilityBase.createTestRecord('Account', accountFields);

// SObjectTypeを使った型安全な作成
SObject typedAccount = TestUtilityBase.createTestRecord(Account.SObjectType, accountFields);

// 作成と即時挿入
SObject insertedAccount = TestUtilityBase.createAndInsertTestRecord(Account.SObjectType, accountFields);
```

**複数レコードの一括作成・挿入**

```java
List<Map<String, Object>> accountsList = new List<Map<String, Object>>{
    new Map<String, Object>{ 'Name' => 'テスト取引先1', 'Industry' => 'テクノロジー' },
    new Map<String, Object>{ 'Name' => 'テスト取引先2', 'Industry' => 'ヘルスケア' }
};
List<SObject> insertedAccounts = TestUtilityBase.createAndInsertTestRecords(Account.SObjectType, accountsList);
```

**デフォルト値の活用**

Account・Contact・Opportunityなどの標準オブジェクトに対して、必須項目のデフォルト値を自動提供する。最小限の項目指定でテストデータを作成できる。

```java
// Nameだけ指定（他の必須項目はデフォルト値）
Map<String, Object> minimalFields = new Map<String, Object>{ 'Name' => 'シンプル取引先' };
SObject simpleAccount = TestUtilityBase.createTestRecord(Account.SObjectType, minimalFields);
```

### 3. アサーション機能

```java
Map<String, Object> expectedValues = new Map<String, Object>{
    'Name' => 'テスト取引先',
    'Industry' => 'テクノロジー'
};
TestUtilityBase.assertFieldValues(account, expectedValues);
```

複数項目を一度に検証できるため、テストコードが簡潔になる。

### 4. HTTPコールアウトのモック化

```java
// モックレスポンスを設定（ステータスコード + ボディ）
HttpCalloutMock mock = TestUtilityBase.setupMockResponse(200, '{"success": true}');
Test.setMock(HttpCalloutMock.class, mock);

// HTTPリクエストを実行
HttpRequest req = new HttpRequest();
req.setEndpoint('https://example.com/api');
req.setMethod('GET');
HttpResponse res = new Http().send(req);

// レスポンスを検証
System.assertEquals(200, res.getStatusCode());
System.assertEquals('{"success": true}', res.getBody());
```

実際の外部APIを呼び出さずに統合テストを実行できる。

---

## 実用例：包括的なテストクラス

```java
@isTest
private class AccountTriggerHandlerTest {
    @TestSetup
    static void setupTestData() {
        TestUtilityBase.createAndInsertTestRecord(Account.SObjectType,
            new Map<String, Object>{ 'Name' => 'テスト取引先', 'Industry' => 'テクノロジー' });
    }

    @isTest
    static void testBeforeInsertTrigger() {
        User standardUser = TestUtilityBase.createAndInsertTestUser('標準ユーザー', 'standard');

        System.runAs(standardUser) {
            Map<String, Object> accountFields = new Map<String, Object>{
                'Name' => '新規取引先',
                'Industry' => 'ヘルスケア'
            };

            Test.startTest();
            Account newAccount = (Account)TestUtilityBase.createAndInsertTestRecord(Account.SObjectType, accountFields);
            Test.stopTest();

            Account retrieved = [SELECT Id, Name, Description FROM Account WHERE Id = :newAccount.Id];
            System.assert(retrieved.Description != null, 'トリガーによってDescriptionが更新されるはずです');
        }
    }

    @isTest
    static void testBulkOperations() {
        List<Map<String, Object>> bulkAccounts = new List<Map<String, Object>>();
        for (Integer i = 0; i < 200; i++) {
            bulkAccounts.add(new Map<String, Object>{
                'Name' => 'バルク取引先 ' + i,
                'Industry' => 'テクノロジー'
            });
        }

        Test.startTest();
        List<SObject> insertedAccounts = TestUtilityBase.createAndInsertTestRecords(Account.SObjectType, bulkAccounts);
        Test.stopTest();

        List<Account> retrievedAccounts = [SELECT Id FROM Account WHERE Name LIKE 'バルク取引先%'];
        System.assertEquals(200, retrievedAccounts.size(), '200件の取引先が作成されるはずです');
    }

    @isTest
    static void testExternalApiIntegration() {
        HttpCalloutMock mock = TestUtilityBase.setupMockResponse(200,
            '{"accountId": "12345", "status": "verified"}');
        Test.setMock(HttpCalloutMock.class, mock);

        Account existingAccount = [SELECT Id FROM Account WHERE Name = 'テスト取引先' LIMIT 1];

        Test.startTest();
        Boolean result = AccountVerificationService.verifyAccount(existingAccount.Id);
        Test.stopTest();

        System.assertEquals(true, result, '取引先の検証は成功するはずです');
    }
}
```

---

## TestUtilityBase を使うメリット

| メリット | 内容 |
|---|---|
| 開発時間の短縮 | 共通操作を簡素化し、繰り返しコードを削減 |
| テスト品質の向上 | 標準化されたアプローチで一貫性のあるテストを実現 |
| メンテナンス性向上 | 変更が必要な場合の影響範囲を最小化 |
| カバレッジ向上 | 多様なシナリオのテストデータを簡単に作成できる |
| ベストプラクティス促進 | Salesforceのテスト標準に沿って設計されている |
