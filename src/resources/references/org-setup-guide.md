# Salesforce組織管理者 — 設定ガイド

Salesforce組織管理者ペルソナが各カテゴリの設定を行う際の、メタデータテンプレート・デプロイ順序・注意事項の完全リファレンス。

---

## デプロイ順序（重要）

依存関係があるため、以下の順番でデプロイすること：

1. 組織設定（`settings/`）
2. セキュリティ設定（`SecuritySettings` など）
3. プロファイル（`profiles/`）
4. 権限セット（`permissionsets/`）
5. 共有ルール（`sharingRules/`） ← OWD変更後は共有の再計算が走る（大規模Orgは注意）
6. 接続アプリ（`connectedApps/`）
7. Experience Cloudサイト（`experiences/`） ← My Domain有効化 & Communities機能が前提
8. 静的リソース（`staticresources/`）

---

## カテゴリ別 メタデータリファレンス

---

### カテゴリ1：組織基本設定

**メタデータ型：** `OrgPreferenceSettings`, `BusinessHoursSettings`

#### OrgPreferenceSettings テンプレート

```xml
<!-- force-app/main/default/settings/OrgPreference.settings-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<OrgPreferenceSettings xmlns="http://soap.sforce.com/2006/04/metadata">
    <preferences>
        <settingName>S1DesktopEnabled</settingName>
        <settingValue>true</settingValue>
    </preferences>
    <preferences>
        <settingName>AsyncSaveEnabled</settingName>
        <settingValue>true</settingValue>
    </preferences>
</OrgPreferenceSettings>
```

#### BusinessHoursSettings テンプレート

```xml
<!-- force-app/main/default/settings/BusinessHours.settings-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<BusinessHoursSettings xmlns="http://soap.sforce.com/2006/04/metadata">
    <businessHours>
        <name>Default</name>
        <active>true</active>
        <default>true</default>
        <mondayStartTime>09:00:00.000Z</mondayStartTime>
        <mondayEndTime>18:00:00.000Z</mondayEndTime>
        <tuesdayStartTime>09:00:00.000Z</tuesdayStartTime>
        <tuesdayEndTime>18:00:00.000Z</tuesdayEndTime>
        <wednesdayStartTime>09:00:00.000Z</wednesdayStartTime>
        <wednesdayEndTime>18:00:00.000Z</wednesdayEndTime>
        <thursdayStartTime>09:00:00.000Z</thursdayStartTime>
        <thursdayEndTime>18:00:00.000Z</thursdayEndTime>
        <fridayStartTime>09:00:00.000Z</fridayStartTime>
        <fridayEndTime>18:00:00.000Z</fridayEndTime>
        <saturdayStartTime>00:00:00.000Z</saturdayStartTime>
        <saturdayEndTime>00:00:00.000Z</saturdayEndTime>
        <sundayStartTime>00:00:00.000Z</sundayStartTime>
        <sundayEndTime>00:00:00.000Z</sundayEndTime>
        <timeZoneId>Asia/Tokyo</timeZoneId>
    </businessHours>
</BusinessHoursSettings>
```

---

### カテゴリ2：セキュリティ・認証

**メタデータ型：** `SecuritySettings`, `SamlSsoConfig`, `AuthProvider`

#### SecuritySettings テンプレート（パスワードポリシー・セッション）

```xml
<!-- force-app/main/default/settings/Security.settings-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<SecuritySettings xmlns="http://soap.sforce.com/2006/04/metadata">
    <passwordPolicies>
        <minimumPasswordLength>10</minimumPasswordLength>
        <minimumPasswordLifetime>true</minimumPasswordLifetime>
        <maximumPasswordLength>16</maximumPasswordLength>
        <lockoutInterval>PT15M</lockoutInterval>
        <maxLoginAttempts>5</maxLoginAttempts>
        <obscureSecretAnswer>true</obscureSecretAnswer>
        <passwordComplexity>3</passwordComplexity>
        <passwordExpiration>90</passwordExpiration>
        <passwordHistory>3</passwordHistory>
        <questionRestriction>DoesNotContainPassword</questionRestriction>
    </passwordPolicies>
    <sessionSettings>
        <sessionTimeout>PT2H</sessionTimeout>
        <forceLogoutOnSessionExpiration>false</forceLogoutOnSessionExpiration>
        <requireHttps>true</requireHttps>
        <lockSessionsToIp>false</lockSessionsToIp>
    </sessionSettings>
    <networkAccess>
        <ipRanges>
            <description>社内ネットワーク</description>
            <start>192.168.0.0</start>
            <end>192.168.255.255</end>
        </ipRanges>
    </networkAccess>
</SecuritySettings>
```

#### SamlSsoConfig テンプレート

```xml
<!-- force-app/main/default/samlssoconfigs/MySSO.samlssoconfig-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<SamlSsoConfig xmlns="http://soap.sforce.com/2006/04/metadata">
    <name>MySSO</name>
    <issuer>https://idp.example.com</issuer>
    <identityLocation>SubjectNameId</identityLocation>
    <identityMapping>Username</identityMapping>
    <validationCert>MyCertificate</validationCert>
    <attributeFormat>Unspecified</attributeFormat>
    <loginUrl>https://idp.example.com/sso/saml</loginUrl>
    <logoutUrl>https://idp.example.com/sso/logout</logoutUrl>
    <userProvisioning>false</userProvisioning>
    <requestSignatureMethod>RSA-SHA256</requestSignatureMethod>
    <oauthTokenEndpoint/>
</SamlSsoConfig>
```

**注意：** My DomainはUIから手動で有効化が必要。メタデータのみでは完結しない。SSOはMy Domain有効化後に設定すること。

---

### カテゴリ3：ユーザー管理

**メタデータ型：** `Profile`, `PermissionSet`, `PermissionSetGroup`, `Role`, `Group`

#### PermissionSet テンプレート（最小構成）

```xml
<!-- force-app/main/default/permissionsets/MyFeatureUser.permissionset-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<PermissionSet xmlns="http://soap.sforce.com/2006/04/metadata">
    <label>My Feature User</label>
    <description>My Featureを使用するユーザー向け権限セット</description>
    <hasActivationRequired>false</hasActivationRequired>
    <userLicense>Salesforce</userLicense>
    <objectPermissions>
        <object>MyObject__c</object>
        <allowCreate>true</allowCreate>
        <allowDelete>false</allowDelete>
        <allowEdit>true</allowEdit>
        <allowRead>true</allowRead>
        <modifyAllRecords>false</modifyAllRecords>
        <viewAllRecords>false</viewAllRecords>
    </objectPermissions>
</PermissionSet>
```

#### Queue テンプレート（キュー）

キューはメタデータAPIで直接作成できないため、以下の手順を案内する：
1. Salesforce Setup → Queues → New
2. または Anonymous Apex でキューを作成：

```apex
// キュー作成（Anonymous ApexまたはloadTestData.apexに追記）
Group q = new Group(Name = 'Support Queue', Type = 'Queue', DoesSendEmailToMembers = false);
insert q;
QueueSObject qso = new QueueSObject(QueueId = q.Id, SObjectType = 'Case');
insert qso;
```

---

### カテゴリ4：共有設定

**メタデータ型：** `SharingRules`

#### 組織全体のデフォルト（OWD）

OWDはメタデータAPIで変更できないため、以下を案内する：
- Setup → Sharing Settings → Edit で変更
- **注意：** OWDをPrivate/Public Read Onlyに変更すると全レコードの共有再計算が走る。大規模Orgでは夜間等に実施すること

#### SharingRules テンプレート（所有者基準）

```xml
<!-- force-app/main/default/sharingRules/Account.sharingRules-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<SharingRules xmlns="http://soap.sforce.com/2006/04/metadata">
    <sharingOwnerRules>
        <fullName>AccountSharingRule</fullName>
        <label>Account Sharing Rule</label>
        <accessLevel>Read</accessLevel>
        <sharedTo>
            <role>SalesRep</role>
        </sharedTo>
        <sharedFrom>
            <role>SalesManager</role>
        </sharedFrom>
    </sharingOwnerRules>
</SharingRules>
```

#### SharingRules テンプレート（条件基準）

```xml
<sharingCriteriaRules>
    <fullName>AccountCriteriaRule</fullName>
    <label>Account Criteria Sharing Rule</label>
    <accessLevel>ReadWrite</accessLevel>
    <booleanFilter>1</booleanFilter>
    <criteriaItems>
        <field>Account.Type</field>
        <operation>equals</operation>
        <value>Customer</value>
    </criteriaItems>
    <sharedTo>
        <group>SalesTeam</group>
    </sharedTo>
</sharingCriteriaRules>
```

---

### カテゴリ5：オブジェクト・項目設定

**メタデータ型：** `RecordType`, `ValidationRule`, `DuplicateRule`, `MatchingRule`

#### ValidationRule テンプレート

```xml
<!-- force-app/main/default/objects/Opportunity/validationRules/RequireCloseDate.validationRule-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<ValidationRule xmlns="http://soap.sforce.com/2006/04/metadata">
    <fullName>RequireCloseDate</fullName>
    <active>true</active>
    <description>完了日は今日以降の日付である必要があります</description>
    <errorConditionFormula>CloseDate &lt; TODAY()</errorConditionFormula>
    <errorMessage>完了日は今日以降の日付を入力してください。</errorMessage>
</ValidationRule>
```

#### DuplicateRule テンプレート

```xml
<!-- force-app/main/default/duplicateRules/Account.duplicateRule-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<DuplicateRule xmlns="http://soap.sforce.com/2006/04/metadata">
    <fullName>AccountDuplicateRule</fullName>
    <label>Account Duplicate Rule</label>
    <isActive>true</isActive>
    <actionOnInsert>Block</actionOnInsert>
    <actionOnUpdate>Allow</actionOnUpdate>
    <alertText>重複する取引先が見つかりました。</alertText>
    <duplicateRuleMatchRules>
        <matchRule>Account.Standard_Account_Match_Rule_v1_0</matchRule>
        <objectMapping>
            <inputObject>Account</inputObject>
            <outputObject>Account</outputObject>
        </objectMapping>
        <matchRuleStatus>Active</matchRuleStatus>
    </duplicateRuleMatchRules>
    <operationsOnInsert>Block</operationsOnInsert>
    <operationsOnUpdate>Allow</operationsOnUpdate>
</DuplicateRule>
```

---

### カテゴリ6：UI・エクスペリエンス設定

**メタデータ型：** `CustomTheme`, `CustomApplication`, `NavigationMenu`

#### CustomTheme テンプレート

```xml
<!-- force-app/main/default/themes/MyTheme.theme-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<CustomTheme xmlns="http://soap.sforce.com/2006/04/metadata">
    <name>MyTheme</name>
    <description>カスタムテーマ</description>
    <shouldOverrideLoadingImage>false</shouldOverrideLoadingImage>
    <customPalettes>
        <palette>
            <token>brand-primary</token>
            <value>#0070d2</value>
        </palette>
        <palette>
            <token>color-background</token>
            <value>#f4f6f9</value>
        </palette>
    </customPalettes>
</CustomTheme>
```

#### CustomApplication テンプレート

```xml
<!-- force-app/main/default/applications/MyApp.app-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<CustomApplication xmlns="http://soap.sforce.com/2006/04/metadata">
    <label>My Application</label>
    <description>カスタムアプリケーション</description>
    <formFactors>Large</formFactors>
    <isNavAutoTempTabsDisabled>false</isNavAutoTempTabsDisabled>
    <isNavPersonalizationDisabled>false</isNavPersonalizationDisabled>
    <navType>Standard</navType>
    <tabs>standard-Account</tabs>
    <tabs>standard-Contact</tabs>
    <tabs>standard-Opportunity</tabs>
    <uiType>Lightning</uiType>
    <workspaceAPI>false</workspaceAPI>
</CustomApplication>
```

---

### カテゴリ7：自動化設定

フロー・承認プロセスはSKILL.mdの開発者ペルソナのルールに従って実装すること。詳細は `references/flow-best-practices.md` を参照。

#### AssignmentRule テンプレート（ケース割り当て）

```xml
<!-- force-app/main/default/assignmentRules/Case.assignmentRules-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<AssignmentRules xmlns="http://soap.sforce.com/2006/04/metadata">
    <assignmentRule>
        <fullName>DefaultCaseAssignment</fullName>
        <active>true</active>
        <ruleEntry>
            <assignedTo>support@example.com</assignedTo>
            <assignedToType>User</assignedToType>
            <criteriaItems>
                <field>Case.Status</field>
                <operation>equals</operation>
                <value>New</value>
            </criteriaItems>
        </ruleEntry>
    </assignmentRule>
</AssignmentRules>
```

---

### カテゴリ8：メール設定

**メタデータ型：** `EmailAdministrationSettings`

```xml
<!-- force-app/main/default/settings/EmailAdministration.settings-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<EmailAdministrationSettings xmlns="http://soap.sforce.com/2006/04/metadata">
    <enableEmailTrackingDefaultOn>true</enableEmailTrackingDefaultOn>
    <enableHtmlEmail>true</enableHtmlEmail>
    <enableListEmailLogActivities>true</enableListEmailLogActivities>
    <enableSendThroughGmailPref>false</enableSendThroughGmailPref>
    <enableEmailWorkflowApproval>true</enableEmailWorkflowApproval>
    <sendEmailsEvenWhenAutomationUpdatesSameRecord>false</sendEmailsEvenWhenAutomationUpdatesSameRecord>
</EmailAdministrationSettings>
```

**メールリレー設定：** Setup → Email → Email Relay Activation で手動設定が必要（メタデータAPIで完結しない）。

---

### カテゴリ9：機能の有効化

Settingsメタデータの例：

```xml
<!-- Knowledge -->
<!-- force-app/main/default/settings/Knowledge.settings-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<KnowledgeSettings xmlns="http://soap.sforce.com/2006/04/metadata">
    <enableKnowledge>true</enableKnowledge>
    <showArticleSummariesCustomerPortal>true</showArticleSummariesCustomerPortal>
    <showArticleSummariesPartnerPortal>true</showArticleSummariesPartnerPortal>
</KnowledgeSettings>
```

```xml
<!-- Chatter -->
<!-- force-app/main/default/settings/Chatter.settings-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<ChatterSettings xmlns="http://soap.sforce.com/2006/04/metadata">
    <enableChatter>true</enableChatter>
    <allowChatterGroupArchiving>true</allowChatterGroupArchiving>
    <allowSharingInChatter>true</allowSharingInChatter>
</ChatterSettings>
```

**注意：** マルチ通貨は一度有効化すると無効化できない。本番Orgへの適用前にユーザーに確認すること。

---

### カテゴリ10：インテグレーション

**メタデータ型：** `ConnectedApp`, `NamedCredential`, `RemoteSiteSetting`

#### ConnectedApp テンプレート

```xml
<!-- force-app/main/default/connectedApps/MyIntegration.connectedApp-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<ConnectedApp xmlns="http://soap.sforce.com/2006/04/metadata">
    <fullName>MyIntegration</fullName>
    <label>My Integration</label>
    <contactEmail>admin@example.com</contactEmail>
    <oauthConfig>
        <callbackUrl>https://example.com/oauth/callback</callbackUrl>
        <certificate/>
        <consumerKey/>
        <isAdminApproved>true</isAdminApproved>
        <isConsumerSecretOptional>false</isConsumerSecretOptional>
        <isIntrospectAllTokens>false</isIntrospectAllTokens>
        <isSecretRequiredForRefreshToken>false</isSecretRequiredForRefreshToken>
        <scopes>Basic</scopes>
        <scopes>Api</scopes>
        <scopes>Web</scopes>
        <scopes>RefreshToken</scopes>
    </oauthConfig>
</ConnectedApp>
```

#### NamedCredential テンプレート

```xml
<!-- force-app/main/default/namedCredentials/ExternalAPI.namedCredential-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<NamedCredential xmlns="http://soap.sforce.com/2006/04/metadata">
    <fullName>ExternalAPI</fullName>
    <label>External API</label>
    <endpoint>https://api.example.com/v1</endpoint>
    <protocol>NoAuthentication</protocol>
    <allowMergeFieldsInBody>false</allowMergeFieldsInBody>
    <allowMergeFieldsInHeader>false</allowMergeFieldsInHeader>
    <generateAuthorizationHeader>false</generateAuthorizationHeader>
</NamedCredential>
```

#### RemoteSiteSetting テンプレート

```xml
<!-- force-app/main/default/remoteSiteSettings/ExternalAPI.remoteSite-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<RemoteSiteSetting xmlns="http://soap.sforce.com/2006/04/metadata">
    <fullName>ExternalAPI</fullName>
    <description>外部API接続先</description>
    <url>https://api.example.com</url>
    <isActive>true</isActive>
    <disableProtocolSecurity>false</disableProtocolSecurity>
</RemoteSiteSetting>
```

---

### カテゴリ11：分析・レポート

**メタデータ型：** `ReportType`

#### CustomReportType テンプレート

```xml
<!-- force-app/main/default/reportTypes/AccountsWithOpportunities.reportType-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<ReportType xmlns="http://soap.sforce.com/2006/04/metadata">
    <autogenerated>false</autogenerated>
    <baseObject>Account</baseObject>
    <category>accounts</category>
    <deployed>true</deployed>
    <description>取引先と関連する商談を含むカスタムレポートタイプ</description>
    <label>Accounts with Opportunities</label>
    <join>
        <outerJoin>false</outerJoin>
        <relationship>Opportunities</relationship>
        <reportTypeColumnTranslations>
            <label>Account Name</label>
            <name>ACCOUNT_NAME</name>
        </reportTypeColumnTranslations>
    </join>
</ReportType>
```

CRM Analytics・Einstein有効化はOrg設定 + ライセンス付与が必要。Setup → Analytics → Getting Started から手動設定する。

---

### カテゴリ12：データ保護・コンプライアンス

#### TransactionSecurityPolicy テンプレート

```xml
<!-- force-app/main/default/transactionSecurityPolicies/BlockBulkDownload.transactionSecurityPolicy-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<TransactionSecurityPolicy xmlns="http://soap.sforce.com/2006/04/metadata">
    <fullName>BlockBulkDownload</fullName>
    <action>
        <blockException>true</blockException>
        <endSession>false</endSession>
        <freezeUser>false</freezeUser>
        <notifications>
            <notification>
                <notifyAuthority>false</notifyAuthority>
                <notifyUser>true</notifyUser>
            </notification>
        </notifications>
    </action>
    <active>true</active>
    <apexClass>BlockBulkDownloadPolicy</apexClass>
    <description>大量データのダウンロードをブロックするポリシー</description>
    <eventName>ReportEvent</eventName>
    <resourceName>Report</resourceName>
    <type>Report</type>
</TransactionSecurityPolicy>
```

Platform Encryptionはキー管理（Master Encryption Key、Tenant Secret）が必要。Setup → Platform Encryption から手動設定後、メタデータで暗号化項目を指定。

---

### カテゴリ13：スクラッチ組織機能

`project-scratch-def.json` に `features` 配列として追加する。

```json
{
  "orgName": "Dev Scratch Org",
  "edition": "Developer",
  "features": [
    "Communities",
    "ServiceCloud",
    "Knowledge",
    "Entitlements",
    "Territory",
    "Forecasting",
    "MultiCurrency",
    "EinsteinAnalyticsPlus",
    "CustomerDataPlatform"
  ],
  "settings": {
    "lightningExperienceSettings": {
      "enableS1DesktopEnabled": true
    },
    "chatterSettings": {
      "enableChatter": true
    },
    "knowledgeSettings": {
      "enableKnowledge": true
    }
  }
}
```

**主要なfeature値一覧：**

| Feature値 | 説明 |
|---|---|
| `Communities` | Experience Cloud（コミュニティ） |
| `ServiceCloud` | Service Cloud |
| `Knowledge` | Salesforce Knowledge |
| `Entitlements` | エンタイトルメント管理 |
| `Territory` | テリトリー管理 |
| `Forecasting` | 予測管理 |
| `MultiCurrency` | マルチ通貨（本番では一度有効化すると無効化不可） |
| `EinsteinAnalyticsPlus` | CRM Analytics（旧Einstein Analytics） |
| `CustomerDataPlatform` | Data Cloud |
| `OrderManagement` | Order Management |
| `HealthCloud` | Health Cloud |
| `FieldServiceMobileExtension` | Field Service |
| `MapsAndLocationServices` | Salesforce Maps |

---

### カテゴリ14：Experience Cloud（サイト構築）

**前提条件：**
1. `Communities` フィーチャーがOrg/スクラッチ組織で有効化されていること
2. My Domainが有効化されていること（本番Orgの場合）

**サイト作成コマンド：**

```bash
# サイト作成（CLIから）
sf community create \
  --name "Customer Portal" \
  --template-name "Customer Service" \
  --url-path-prefix "customers" \
  --target-org <org-alias>

# 利用可能なテンプレート一覧
sf community list template --target-org <org-alias>
```

**主要テンプレート：**

| テンプレート名 | 説明 |
|---|---|
| `Customer Service` | 顧客向けセルフサービスポータル |
| `Partner Central` | パートナー向けポータル |
| `Build Your Own (LWR)` | LWR（Lightning Web Runtime）ベースのカスタムサイト |
| `Microsites (LWR)` | LWRベースのマーケティングサイト |
| `Help Center` | Knowledge記事を中心としたヘルプサイト |
| `Aloha` | アプリケーションランチャー |

**ExperienceBundle（サイト設定メタデータ）の取得：**

```bash
# 作成済みサイトのメタデータをローカルに取得
sf project retrieve start \
  --metadata "ExperienceBundle:<SiteName>" \
  --target-org <org-alias>
```

**NetworkBranding テンプレート（ブランディング設定）：**

```xml
<!-- force-app/main/default/networkBranding/MyPortalBranding.networkBranding-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<NetworkBranding xmlns="http://soap.sforce.com/2006/04/metadata">
    <loginFooterText>© 2025 My Company</loginFooterText>
    <loginLogo>MyPortalLogo</loginLogo>
    <pageFooter>&lt;p&gt;お問い合わせ: support@example.com&lt;/p&gt;</pageFooter>
    <pageHeader>&lt;p&gt;My Portal&lt;/p&gt;</pageHeader>
    <primaryColor>#0070d2</primaryColor>
    <quaternaryColor>#ffffff</quaternaryColor>
    <secondaryColor>#005fb2</secondaryColor>
    <tertiaryColor>#f4f6f9</tertiaryColor>
    <zeronaryColor>#032d60</zeronaryColor>
</NetworkBranding>
```

**ゲストユーザーアクセス設定の注意点：**
- ゲストユーザープロファイルは Org Profile として取得・編集できる
- 公開ページのアクセスはゲストユーザープロファイルのオブジェクト権限で制御する
- ゲストユーザーへの個人情報（PII）公開に注意すること

---

### カテゴリ15：静的リソース

**メタデータ型：** `StaticResource`

#### 単一ファイル（例：画像）

```xml
<!-- force-app/main/default/staticresources/CompanyLogo.resource-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Public</cacheControl>
    <contentType>image/png</contentType>
    <description>会社ロゴ画像</description>
</StaticResource>
```

実ファイル: `force-app/main/default/staticresources/CompanyLogo.png`

#### ZIPアーカイブ（複数ファイルバンドル）

```xml
<!-- force-app/main/default/staticresources/MyBundle.resource-meta.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Public</cacheControl>
    <contentType>application/zip</contentType>
    <description>CSS・JS・画像のバンドル</description>
</StaticResource>
```

実ファイル: `force-app/main/default/staticresources/MyBundle.zip`
（ZIP内の構造例: `css/styles.css`, `js/app.js`, `images/logo.png`）

**LWCからの参照方法：**

```javascript
// LWCでの静的リソース参照
import { LightningElement } from 'lwc';
import COMPANY_LOGO from '@salesforce/resourceUrl/CompanyLogo';
import MY_BUNDLE from '@salesforce/resourceUrl/MyBundle';

export default class MyComponent extends LightningElement {
    logoUrl = COMPANY_LOGO;
    cssUrl = MY_BUNDLE + '/css/styles.css';
}
```

**Visualforceからの参照方法：**

```html
<apex:image url="{!URLFOR($Resource.CompanyLogo)}" />
<apex:stylesheet value="{!URLFOR($Resource.MyBundle, 'css/styles.css')}" />
```

**CLIコマンド：**

```bash
# 静的リソースの作成（CLIから）
sf staticresource create \
  --name CompanyLogo \
  --type image/png \
  --output-dir force-app/main/default/staticresources

# デプロイ
sf project deploy start \
  --metadata "StaticResource:CompanyLogo" \
  --target-org <org-alias>
```

**cacheControl の値：**
- `Public` — CDNキャッシュあり（パフォーマンス重視）
- `Private` — ユーザー固有のキャッシュ（認証が必要なリソース）

---

## 成果物とマニュアル.md への記録フォーマット

Salesforce組織管理者の作業完了後、最終的に `成果物とマニュアル.md` に以下のセクションを追加する：

```markdown
## Salesforce組織管理者

### 設定カテゴリ一覧

| # | カテゴリ | 設定内容 | 生成ファイル |
|---|---|---|---|
| 1 | セキュリティ・認証 | パスワードポリシー強化、MFA必須化 | `force-app/main/default/settings/Security.settings-meta.xml` |
| 2 | 機能の有効化 | Knowledge、Chatter有効化 | `force-app/main/default/settings/Knowledge.settings-meta.xml` など |
| 3 | Experience Cloud | 顧客ポータルサイト作成 | `force-app/main/default/experiences/CustomerPortal/` |
| 4 | 静的リソース | 会社ロゴ、CSSバンドル | `force-app/main/default/staticresources/` |

### デプロイ後の手動作業

以下の設定はメタデータAPIでは完結せず、Salesforce Setup UIからの手動作業が必要：

- [ ] My Domain の有効化（Setup → My Domain）
- [ ] メールリレーの設定（Setup → Email Relay Activation）
- [ ] マルチ通貨の有効化（Setup → Company Information → Edit — 不可逆なので注意）
- [ ] Platform Encryptionのキー生成（Setup → Platform Encryption）
- [ ] Experience Cloudサイトの公開（Setup → All Sites → Publish）
- [ ] CRM Analyticsライセンスの付与

### Experience Cloudサイト情報（作成した場合）

- **サイト名：** [サイト名]
- **URL：** [サイトURL]
- **テンプレート：** [使用したテンプレート]
- **ゲストユーザー：** [アクセス設定の概要]
```
