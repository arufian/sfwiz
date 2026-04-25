# カスタムメタデータのベストプラクティス

## カスタムメタデータの特性と制限

カスタムメタデータは設定情報として扱われるため、Apexで通常のDML操作（INSERT/UPDATE/DELETE）を直接使用できない。

**主な制限：**
- **DML操作が不可** — ApexでのUPDATEなどの直接更新はできない
- **トランザクション管理外** — 通常のコミット・ロールバックが効かない
- **テストクラスでも同様** — テストクラス内でもDMLは使用不可（ただし読み取りは可能）

---

## カスタムメタデータを更新するための方法

### 1. Metadata APIを使用した更新（Apex内から）

最も一般的なプログラム的操作方法。非同期で実行される。

```java
Metadata.CustomMetadata customMetadata = new Metadata.CustomMetadata();
customMetadata.fullName = 'Namespace__CustomMetadataName.RecordName';
customMetadata.label = 'Custom Metadata Record Label';

Metadata.CustomMetadataValue customFieldValue = new Metadata.CustomMetadataValue();
customFieldValue.field = 'Namespace__CustomField__c';
customFieldValue.value = 'New Value';
customMetadata.values.add(customFieldValue);

// メタデータのデプロイを実行（非同期）
Metadata.Operations.enqueueDeployment(
    new List<Metadata.Metadata>{ customMetadata },
    null
);
```

**注意点：**
- 非同期で実行されるため即時反映されない
- デプロイ完了までに時間がかかる場合がある
- コールバックが必要な場合は `Metadata.DeployCallback` インターフェースを実装する

### 2. Salesforce CLI (sf) を使った更新

CI/CDパイプラインやデプロイメント自動化に最適。

```bash
# カスタムメタデータをデプロイ
sf project deploy start -m "CustomMetadata:My_Custom_Metadata_Name__mdt"

# または特定ファイルを指定
sf project deploy start --source-dir force-app/main/default/customMetadata
```

開発・テスト環境での設定変更を自動化する際に有効。

### 3. Apex Metadata APIラッパーを使用

Apexコード内から簡易にカスタムメタデータを操作したい場合のアプローチ。Andrew Fawcett氏のApex Metadata API Wrapperが代表例。

```java
MetadataService.CustomMetadata customMetadata = new MetadataService.CustomMetadata();
customMetadata.fullName = 'Namespace__CustomMetadataName.RecordName';
customMetadata.label = 'Custom Metadata Record Label';

MetadataService.CustomMetadataValue customFieldValue = new MetadataService.CustomMetadataValue();
customFieldValue.field = 'Namespace__CustomField__c';
customFieldValue.value = 'New Value';
customMetadata.values.add(customFieldValue);

MetadataService.deployMetadata(customMetadata);
```

### 4. UIからの手動更新

設定 > カスタムメタデータ型 から対象レコードを直接編集できる。小規模な変更やテスト段階で最も簡単なアプローチ。

---

## テストクラスでのカスタムメタデータ

カスタムメタデータはテストクラスでも **読み取り可能**（`@isTest` アノテーションは不要）。テストデータとして組織に存在するカスタムメタデータレコードをそのままテストで使用できる。

```java
@isTest
static void testWithCustomMetadata() {
    // カスタムメタデータは組織の実データを直接参照できる（DML不要）
    My_Config__mdt config = [SELECT Value__c FROM My_Config__mdt WHERE DeveloperName = 'Test_Config' LIMIT 1];
    System.assertNotEquals(null, config, 'カスタムメタデータが存在するはずです');
}
```

テスト用のカスタムメタデータレコードを事前に組織に作成しておくことが推奨される。

---

## どの方法を使うか

| 状況 | 推奨方法 |
|---|---|
| ユーザーアクションに応じた動的更新 | Metadata API（Apex内） |
| デプロイメント・CI/CD | Salesforce CLI |
| 小規模な設定変更 | UIから手動更新 |
| Apexコードで柔軟に操作したい | Apex Metadata API Wrapperを検討 |
