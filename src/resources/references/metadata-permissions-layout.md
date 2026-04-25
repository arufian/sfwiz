# メタデータ・Permission Set・ページレイアウト・デプロイガイド

## Permission Set・ページレイアウト・カスタムアプリケーションの実装

カスタムオブジェクトを新規作成する場合、以下のメタデータも必ず実装すること。**これらがないとデプロイ後にカスタム項目がUIに表示されない。**

### Permission Set（権限セット）

```xml
<!-- force-app/main/default/permissionsets/Inventory_Management.permissionset-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<PermissionSet xmlns="http://soap.sforce.com/2006/04/metadata">
    <label>Inventory Management</label>
    <description>在庫管理アプリケーションへのアクセス権限</description>
    <fieldPermissions>
        <editable>true</editable>
        <field>CustomObject__c.CustomField__c</field>
        <readable>true</readable>
    </fieldPermissions>
    <!-- アプリケーション可視性（カスタムアプリがある場合） -->
    <applicationVisibilities>
        <application>Custom_App_Name</application>
        <visible>true</visible>
    </applicationVisibilities>
    <!-- タブ可視性 -->
    <tabSettings>
        <tab>CustomObject__c</tab>
        <visibility>Visible</visibility>
    </tabSettings>
</PermissionSet>
```

**注意：** Required（必須）項目はPermission Setでは設定できない。プロファイルレベルで自動付与される。

### ページレイアウト（必須 — カスタムオブジェクト・カスタム項目を作成する場合）

**⚠️ カスタムオブジェクトまたはカスタム項目を作成する場合、ページレイアウトに全項目を追加することは必須。** デフォルトのページレイアウトにはカスタム項目が含まれないため、これを怠るとデプロイ後にUIに項目が表示されない。

- **新規カスタムオブジェクトの場合** — カスタムレイアウトを新規作成し、すべてのカスタム項目を `<layoutItems>` として配置する
- **既存オブジェクトにカスタム項目を追加する場合** — 既存のページレイアウトをOrgから取得し、新しい項目を追加した上でデプロイする

```xml
<!-- force-app/main/default/layouts/CustomObject__c-Custom Object Layout.layout-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<Layout xmlns="http://soap.sforce.com/2006/04/metadata">
    <layoutSections>
        <customLabel>false</customLabel>
        <detailHeading>true</detailHeading>
        <editHeading>true</editHeading>
        <label>Information</label>
        <layoutColumns>
            <layoutItems>
                <behavior>Required</behavior>
                <field>Name</field>
            </layoutItems>
            <layoutItems>
                <behavior>Edit</behavior>
                <field>CustomField1__c</field>
            </layoutItems>
            <layoutItems>
                <behavior>Edit</behavior>
                <field>CustomField2__c</field>
            </layoutItems>
            <!-- ★ すべてのカスタム項目をここに含めること — 漏れがあるとUIに表示されない -->
        </layoutColumns>
        <layoutColumns/>
        <style>TwoColumnsTopToBottom</style>
    </layoutSections>
</Layout>
```

既存オブジェクトに項目を追加する場合の取得方法：

```bash
# 既存レイアウトをOrgから取得
sf project retrieve start \
  --metadata "Layout:<ObjectName>-<LayoutName>" \
  --target-org <org-alias>

# 例：Account の標準レイアウト
sf project retrieve start \
  --metadata "Layout:Account-Account Layout" \
  --target-org <org-alias>
```

取得後、レイアウトXMLに新しい `<layoutItems>` を追加してデプロイする。

### 親オブジェクトのページレイアウトに関連リストを追加（Lookup/Master-Detail がある場合は必須）

子オブジェクトが親オブジェクトへの Lookup または Master-Detail リレーションを持つ場合、**親オブジェクトのページレイアウトに子オブジェクトの関連リストを追加すること。** これがないと、親レコードページに子レコードの一覧（関連リスト）が表示されず、ユーザーは親ページから子レコードの新規作成・編集・確認ができない。

**手順：**

1. 親オブジェクトの既存ページレイアウトをOrgから取得する
2. `<relatedLists>` セクションに子オブジェクトの関連リストを追加する
3. 関連リストに表示する項目を `<relatedList>` 内の `<columns>` で指定する

```bash
# 親オブジェクトのレイアウトをOrgから取得
sf project retrieve start \
  --metadata "Layout:Contact-Contact Layout" \
  --target-org <org-alias>
```

取得したレイアウトXMLの `<relatedLists>` セクション末尾に追加する：

```xml
<!-- 例：Contact レイアウトに Onboarding_Task__c の関連リストを追加 -->
<relatedLists>
    <fields>NAME</fields>
    <fields>Status__c</fields>
    <fields>Category__c</fields>
    <fields>Due_Date__c</fields>
    <relatedList>Onboarding_Task__c.Contact__c</relatedList>
</relatedLists>
```

**`<relatedList>` の値は `子オブジェクトAPI名.リレーション項目API名` の形式。** 例：`Onboarding_Task__c` の `Contact__c` (Lookup to Contact) の場合は `Onboarding_Task__c.Contact__c`。

**関連リストに表示する項目（`<fields>`）の指針：**
- `NAME` — 子レコードの名前項目（必須）
- ユーザーが一覧で確認したい主要項目を3〜5個選ぶ
- 設計書のデータモデルを参照して決定する

**標準オブジェクトの親レイアウトを編集する場合の注意：**
- Orgから取得したレイアウトXMLには既存の `<relatedLists>` が多数含まれる — 既存のものを削除せず、末尾に新しい関連リストを追加すること
- レイアウト名はOrgの設定により異なる（例：`Contact-Contact Layout`、`Account-Account Layout`）— `sf project retrieve start` で取得して確認すること

### カスタムタブ

```xml
<!-- force-app/main/default/tabs/CustomObject__c.tab-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<CustomTab xmlns="http://soap.sforce.com/2006/04/metadata">
    <customObject>true</customObject>
    <motif>Custom57: Chest</motif>
</CustomTab>
```

### カスタムアプリケーション（任意）

タブだけではアプリケーションランチャーに表示されない。専用アプリケーションを作成すると管理しやすい。

```xml
<!-- force-app/main/default/applications/Custom_App.app-meta.xml -->
```

---

## デプロイ順序

メタデータには依存関係があるため、以下の順序でデプロイすること。`sf project deploy start --source-dir force-app` で一括デプロイする場合はSFDXが依存関係を自動解決するが、部分デプロイや問題発生時はこの順序を意識する：

1. **カスタムオブジェクト・項目** — 他のすべてのメタデータが依存する基盤
2. **カスタムタブ** — アプリケーションが参照する
3. **ページレイアウト** — オブジェクト・項目の存在が前提
4. **カスタムアプリケーション** — タブの存在が前提
5. **Apexクラス（Controller, Handler等）** — オブジェクト・項目の存在が前提
6. **Apexトリガー** — Handler クラスの存在が前提
7. **Permission Set** — オブジェクト・項目・アプリケーション・タブの存在が前提
8. **テストクラス** — 全Apexクラスの存在が前提
9. **LWCコンポーネント** — Apex Controller の存在が前提（カスタムApex使用時）

---

## テストクラスとセキュリティ（`with sharing` + `WITH SECURITY_ENFORCED`）の両立

`with sharing` + `WITH SECURITY_ENFORCED` を使用するApexクラスのテストでは、テストユーザーに適切な権限がないとデータにアクセスできず「List has no rows」エラーが発生する。以下の対策を講じること：

- **`System.runAs()` でテストユーザーを制御する** — Permission Set を動的に割り当ててからテストを実行する
- **テストメソッド内でデータを作成する** — `@TestSetup` で作成したデータが権限不足でアクセスできない場合は、テストメソッド内でデータ作成→操作→検証を完結させる
- **プロファイル名は組織の言語設定に依存する** — `'Standard User'`（英語Org）と `'標準ユーザー'`（日本語Org）、`'System Administrator'`（英語）と `'システム管理者'`（日本語）で異なる。テストコードでは言語に依存しない取得方法を使うこと

```apex
// ✅ テストでPermission Setを割り当ててからrunAsする例
@IsTest
static void testWithPermissions() {
    // テストユーザー作成（言語に依存しないプロファイル取得）
    Profile p = [SELECT Id FROM Profile WHERE UserType = 'Standard' AND PermissionsModifyAllData = false LIMIT 1];
    User testUser = new User(/* ... */ ProfileId = p.Id);
    insert testUser;

    // Permission Set 割り当て
    PermissionSet ps = [SELECT Id FROM PermissionSet WHERE Name = 'Custom_Permission_Set'];
    insert new PermissionSetAssignment(AssigneeId = testUser.Id, PermissionSetId = ps.Id);

    System.runAs(testUser) {
        // テストデータ作成と検証
        Test.startTest();
        // ...
        Test.stopTest();
    }
}
```

---

## プロファイル名の言語依存と対処法

**重要：プロファイル名は組織の言語設定に依存する。** スクラッチ組織はデフォルトで英語のため `System Administrator` だが、日本語Orgでは `システム管理者` になる。スクラッチ組織定義で言語を指定している場合は注意すること。

```json
// config/project-scratch-def.json で日本語を指定している場合
{
  "orgName": "Dev Scratch Org",
  "edition": "Developer",
  "language": "ja",
  "settings": { ... }
}
// → プロファイル名は「システム管理者」になる
```

Apexやテストコードでプロファイルを参照する場合は、言語に依存しない方法を使うこと：

```apex
// ✅ 言語に依存しない取得方法
Profile adminProfile = [
    SELECT Id, Name FROM Profile
    WHERE PermissionsModifyAllData = true
    LIMIT 1
];

// ❌ 言語依存（英語Orgでは動くが日本語Orgでは失敗する）
Profile adminProfile = [
    SELECT Id FROM Profile WHERE Name = 'System Administrator' LIMIT 1
];
```

---

## ソース追跡のトラブルシューティング

スクラッチ組織での開発中に、ソース追跡（source tracking）の不整合でデプロイが「Unchanged」と表示され変更が反映されないことがある。

```bash
# ソース追跡をリセット
sf project reset tracking --target-org <org-alias>

# リセット後に再デプロイ
sf project deploy start --source-dir force-app --target-org <org-alias>
```

メタデータの変更が反映されない場合は、ファイルに小さな変更（コメント追加等）を加えて差分を作り、強制的にデプロイ対象にする。

---

## SFDXソース形式の出力構造

```
force-app/main/default/
├── objects/
│   └── CustomObject__c/
│       ├── CustomObject__c.object-meta.xml
│       └── fields/
│           └── CustomField__c.field-meta.xml
├── classes/
│   ├── ClassName.cls
│   └── ClassName.cls-meta.xml
├── triggers/
│   ├── TriggerName.trigger
│   └── TriggerName.trigger-meta.xml
├── lwc/
│   └── componentName/           ← camelCase（例：accountOpenCaseBadge）
│       ├── componentName.html
│       ├── componentName.js
│       └── componentName.js-meta.xml
│   ※ HTMLテンプレートで参照するときは kebab-case + c- プレフィックス：<c-account-open-case-badge>
├── layouts/
│   └── CustomObject__c-Custom Layout.layout-meta.xml
├── tabs/
│   └── CustomObject__c.tab-meta.xml
├── applications/
│   └── Custom_App.app-meta.xml
├── permissionsets/
│   └── Custom_Permission_Set.permissionset-meta.xml
└── flows/
    └── FlowName.flow-meta.xml
```
