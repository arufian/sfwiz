# Apexテストクラスのベストプラクティス

## 基本原則

### テストの独立性

各テストメソッドは他のテストに依存せず、独立して実行できるようにする。

```java
@isTest
private class AccountServiceTest {
    @isTest
    static void testCreateAccount() {
        // このテストは独自のデータを作成し、他のテストに依存しない
        Account acc = new Account(Name = 'テスト取引先');

        Test.startTest();
        insert acc;
        Test.stopTest();

        Account insertedAcc = [SELECT Id, Name FROM Account WHERE Id = :acc.Id];
        System.assertEquals('テスト取引先', insertedAcc.Name, '取引先名が一致する必要があります');
    }
}
```

### Test.startTest() と Test.stopTest() を必ず使用する

テスト実行内でガバナ制限をリセットし、テスト対象コードのみの制限消費量を正確に測定できる。

---

## テストデータ作成の戦略

### TestDataFactory（テストファクトリー）の使用

**なぜテストファクトリーを使うのか：**
1. **再利用性** — 同じデータ生成ロジックを複数のテストクラスで再利用できる
2. **可読性** — テストメソッドがビジネスロジックのテストに集中できる
3. **一貫性** — 同じタイプのデータが常に同じ方法で作成される
4. **バルクテスト対応** — 200件のバルクデータ作成を効率化できる

```java
public class TestDataFactory {
    // 基本的な取引先作成（挿入なし）
    public static Account createAccount(String name) {
        return new Account(
            Name = name,
            Industry = 'テクノロジー',
            BillingCountry = '日本',
            BillingCity = '東京'
        );
    }

    // 商談の作成
    public static Opportunity createOpportunity(Id accountId, String name, Date closeDate, String stageName) {
        return new Opportunity(
            AccountId = accountId,
            Name = name,
            CloseDate = closeDate,
            StageName = stageName
        );
    }

    // ユーザー作成ヘルパー
    public static User createUser(String profileName, String alias) {
        Profile p = [SELECT Id FROM Profile WHERE Name = :profileName LIMIT 1];
        String uniqueName = alias + DateTime.now().getTime();
        return new User(
            FirstName = 'Test',
            LastName = 'User',
            Alias = alias.substring(0, Math.min(8, alias.length())),
            Email = uniqueName + '@testorg.com',
            Username = uniqueName + '@testorg.com',
            ProfileId = p.Id,
            TimeZoneSidKey = 'Asia/Tokyo',
            LocaleSidKey = 'ja_JP',
            EmailEncodingKey = 'UTF-8',
            LanguageLocaleKey = 'ja'
        );
    }
}
```

### @TestSetup でテストデータを一元管理する

```java
@isTest
private class AccountTriggerHandlerTest {
    @TestSetup
    static void setupTestData() {
        // 全テストメソッドで共有するデータをここで作成
        Account acc = TestDataFactory.createAccount('テスト取引先');
        insert acc;
    }

    @isTest
    static void testBeforeInsert() {
        Account acc = [SELECT Id, Name FROM Account WHERE Name = 'テスト取引先' LIMIT 1];
        // ...
    }
}
```

---

## System.runAs の戦略的使用

異なるユーザーのアカウント権限での機能をテストするために使用する。セキュリティ・共有ルール・権限依存のロジックのテストに不可欠。

```java
@isTest
private class SecurityTest {
    @isTest
    static void testRecordAccessWithDifferentProfiles() {
        User adminUser = TestDataFactory.createUser('システム管理者', 'admin');
        User standardUser = TestDataFactory.createUser('標準ユーザー', 'standard');
        insert new List<User>{ adminUser, standardUser };

        Account testAccount = [SELECT Id FROM Account LIMIT 1];

        // 管理者ユーザーとしてテスト（更新できるはず）
        System.runAs(adminUser) {
            testAccount.Industry = 'テクノロジー';
            update testAccount;
            Account updated = [SELECT Industry FROM Account WHERE Id = :testAccount.Id];
            System.assertEquals('テクノロジー', updated.Industry, '管理者は取引先を更新できるはずです');
        }

        // 標準ユーザーとしてテスト（制限がある場合は権限エラー）
        System.runAs(standardUser) {
            try {
                testAccount.Industry = 'ヘルスケア';
                update testAccount;
                // 共有設定によって成功する場合もある
            } catch(DmlException e) {
                System.assert(e.getMessage().contains('INSUFFICIENT_ACCESS_OR_READONLY'),
                    '権限不足エラーが予想されます');
            }
        }
    }
}
```

**System.runAsを使う場面：**
- 項目レベルセキュリティ（FLS）のテスト
- オブジェクト権限・レコードアクセスのテスト
- CRUD権限依存のロジックのテスト

---

## テストカバレッジの測定とパフォーマンス検証

```java
@isTest
private class OptimizedAccountFinder_Test {
    @isTest
    static void testQueryOptimization() {
        List<Account> testAccounts = new List<Account>();
        for (Integer i = 0; i < 100; i++) {
            testAccounts.add(new Account(Name = 'テスト取引先 ' + i));
        }
        insert testAccounts;

        Test.startTest();
        Integer queryCountBefore = Limits.getQueries();
        List<Account> result = OptimizedAccountFinder.findAccounts('テスト');
        Integer queryCountAfter = Limits.getQueries();
        Test.stopTest();

        // 機能検証
        System.assertEquals(100, result.size(), 'すべてのテスト取引先が見つかるはずです');

        // パフォーマンス検証（1回のSOQLクエリのみ使用されているか）
        System.assertEquals(1, queryCountAfter - queryCountBefore,
            '検索処理は1つのSOQLクエリのみを使用するべきです');
    }
}
```

`Limits.getQueries()` でメソッド実行前後のクエリ数を比較し、SOQLの効率性を数値で検証できる。

---

## バルクテストは必須

Apexコードはバルク操作（200件以上）をサポートしなければならない。バルクテストを省略するとTriggerのバルク処理バグを見逃す。

```java
@isTest
static void testBulkAccountProcessing() {
    List<Account> bulkAccounts = new List<Account>();
    for (Integer i = 0; i < 200; i++) {
        bulkAccounts.add(new Account(Name = 'バルク取引先 ' + i));
    }

    Test.startTest();
    insert bulkAccounts;
    Test.stopTest();

    List<Account> processedAccounts = [SELECT Id FROM Account WHERE Name LIKE 'バルク取引先%'];
    System.assertEquals(200, processedAccounts.size(), '200件の取引先が作成されるはずです');
}
```

---

## 特定ユーザーとして実行するテスト

```java
@isTest
public class UserLanguageControllerTest {
    @isTest
    static void testGetUserLanguage() {
        User testUser = new User(
            Username = 'testuser1@example.com',
            Email = 'testuser1@example.com',
            Alias = 'tuser1',
            TimeZoneSidKey = 'America/Los_Angeles',
            LocaleSidKey = 'en_US',
            FirstName = 'User',
            LastName = 'Test',
            EmailEncodingKey = 'UTF-8',
            ProfileId = [SELECT Id FROM Profile WHERE Name = 'Standard User'].Id,
            LanguageLocaleKey = 'es' // スペイン語
        );
        insert testUser;

        Test.startTest();
        System.runAs(testUser) {
            UserLanguageController controller = new UserLanguageController();
            String userLanguage = controller.getUserLanguage();
            System.assertEquals('es', userLanguage, '期待される言語はスペイン語');
        }
        Test.stopTest();
    }
}
```

---

## まとめチェックリスト

- [ ] カバレッジ85%以上（最低要件75%を超えること）
- [ ] `@TestSetup` でテストデータを一元管理
- [ ] `Test.startTest()` / `Test.stopTest()` を使用
- [ ] 正常系・異常系・バルク処理（200件）を網羅
- [ ] `System.runAs` でプロファイル権限をテスト
- [ ] `System.assertEquals` / `System.assert` でアサーション
- [ ] `Limits.getQueries()` でSOQL効率を検証（必要に応じて）
- [ ] テスト間の独立性を保つ（テストデータの依存なし）
