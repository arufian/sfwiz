# PublishingService Class

# PublishingService Class

Use the methods in the `KbManagement.PublishingService` class to manage the lifecycle of an article and its translations.

## Namespace

[KbManagement](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_KbManagement.htm)

## Usage

Use the methods in the `KbManagement.PublishingService` class
to manage the following parts of the lifecycle of an article and its
translations:
- Publishing

- Updating

- Retrieving

- Deleting

- Submitting for translation

- Setting a translation to complete or incomplete status

- Archiving

- Assigning review tasks for draft articles or translations

#### Note

Date values are based on GMT. 

To use the methods
in this class, you must enable Salesforce Knowledge. See [Salesforce
Knowledge Implementation Guide](https://resources.docs.salesforce.com/258/latest/en-us/sfdc/pdf/salesforce_knowledge_implementation_guide.pdf) for more information on setting
up Salesforce Knowledge.

## PublishingService Methods

The following are methods for `PublishingService`. All methods are static.

- 
**[archiveOnlineArticle(articleId, scheduledDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_archiveOnlineArticle)**

Archives an online version of an article. If the specified scheduledDate is null, the article is archived immediately. Otherwise, it archives the article on the scheduled date. 

- 
**[assignDraftArticleTask(articleId, assigneeId, instructions, dueDate, sendEmailNotification)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_assignDraftArticleTask)**

Assigns a review task related to a draft article. 

- 
**[assignDraftTranslationTask(articleVersionId, assigneeId, instructions, dueDate, sendEmailNotification)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_assignDraftTranslationTask)**

Assigns a review task related to a draft translation. 

- 
**[cancelScheduledArchivingOfArticle(articleId)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_cancelScheduledArchivingOfArticle)**

Cancels the scheduled archiving of an online article. 

- 
**[cancelScheduledPublicationOfArticle(articleId)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_cancelScheduledPublicationOfArticle)**

Cancels the scheduled publication of a draft article. 

- 
**[completeTranslation(articleVersionId)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_completeTranslation)**

Puts a translation in a completed state that is ready to publish. 

- 
**[deleteArchivedArticle(articleId)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_deleteArchivedArticle)**

Deletes an archived article.

- 
**[deleteArchivedArticleVersion(articleId, versionNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_deleteArchivedArticleVersion)**

Deletes a specific archived version of a published article.

- 
**[deleteDraftArticle(articleId)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_deleteDraftArticle)**

Deletes a draft article. 

- 
**[deleteDraftTranslation(articleVersionId)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_deleteDraftTranslation)**

Deletes a draft translation. 

- 
**[editArchivedArticle(articleId)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_editArchivedArticle)**

Creates a draft article from the archived primary version and returns the new draft   primary version ID of the article. 

- 
**[editOnlineArticle(articleId, unpublish)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_editOnlineArticle)**

Creates a draft article from the online version and returns the new draft primary version   ID of the article. Also, unpublishes the online article, if unpublish is set to    `true`. 

- 
**[editPublishedTranslation(articleId, language, unpublish)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_editPublishedTranslation)**

Creates a draft version of the online translation for a specific language and returns the   new draft primary version ID of the article. Also, unpublishes the article, if set to `true`. 

- 
**[publishArticle(articleId, flagAsNew)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_publishArticle)**

Publishes an article. If flagAsNew is set to `true`, the article is published as a major version. 

- 
**[restoreOldVersion(articleId, versionNumber)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_restoreOldVersion)**

Creates a draft article from an existing online article based on the specified archived version of the article and returns the article version ID.

- 
**[scheduleForPublication(articleId, scheduledDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_scheduleForPublication)**

Schedules the article for publication as a major version. If the specified date is null, the article is published immediately. 

- 
**[setTranslationToIncomplete(articleVersionId)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_setTranslationToIncomplete)**

Sets a draft translation that is ready for publication back to “in progress” status.

- 
**[submitForTranslation(articleId, language, assigneeId, dueDate)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_knowledge_kbManagement.htm#apex_KbManagement_PublishingService_submitForTranslation)**

Submits an article for translation to the specified language. Also assigns the specified user and due date to the submittal and returns new ID of the draft translation.

### archiveOnlineArticle(articleId, scheduledDate)

Archives an online version of an article. If the specified
scheduledDate is null, the article is archived immediately. Otherwise,
it archives the article on the scheduled date. 

#### Signature

`public static Void archiveOnlineArticle(String
articleId, Datetime scheduledDate)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

scheduledDate

Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
Datetime scheduledDate = Datetime.newInstanceGmt(2012, 12,1,13,30,0);
KbManagement.PublishingService.archiveOnlineArticle(articleId, scheduledDate);
```

### assignDraftArticleTask(articleId, assigneeId, instructions, dueDate, sendEmailNotification)

Assigns a review task related to a draft article. 

#### Signature

`public static Void assignDraftArticleTask(String articleId, String
     assigneeId, String instructions, Datetime dueDate, Boolean sendEmailNotification)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

assigneeId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

instructions

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

dueDate

Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime)

sendEmailNotification

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
String assigneeId = '';
String instructions = 'Please review this draft.';
Datetime dueDate = Datetime.newInstanceGmt(2012, 12, 1);
KbManagement.PublishingService.assignDraftArticleTask(articleId, assigneeId, instructions, dueDate, true);
```

### assignDraftTranslationTask(articleVersionId, assigneeId, instructions, dueDate, sendEmailNotification)

Assigns a review task related to a draft translation. 

#### Signature

`public static Void assignDraftTranslationTask(String
     articleVersionId, String assigneeId, String instructions, Datetime dueDate, Boolean
     sendEmailNotification)`

#### Parameters

articleVersionId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

assigneeId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

instructions

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

dueDate

Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime)

sendEmailNotification

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
String assigneeId = 'Insert assignee ID';
String instructions = 'Please review this draft.';
Datetime dueDate = Datetime.newInstanceGmt(2012, 12, 1);
KbManagement.PublishingService.assignDraftTranslationTask(articleId, assigneeId, instructions, dueDate, true);
```

### cancelScheduledArchivingOfArticle(articleId)

Cancels the scheduled archiving of an online article. 

#### Signature

`public static Void cancelScheduledArchivingOfArticle(String
articleId)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
KbManagement.PublishingService.cancelScheduledArchivingOfArticle (articleId);
```

### cancelScheduledPublicationOfArticle(articleId)

Cancels the scheduled publication of a draft article. 

#### Signature

`public static Void cancelScheduledPublicationOfArticle(String
articleId)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
KbManagement.PublishingService.cancelScheduledPublicationOfArticle (articleId);
```

### completeTranslation(articleVersionId)

Puts a translation in a completed state that is ready to
publish. 

#### Signature

`public static Void completeTranslation(String
articleVersionId)`

#### Parameters

articleVersionId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

#### Example

```
String articleVersionId = 'Insert article ID';
KbManagement.PublishingService.completeTranslation(articleVersionId);
```

### deleteArchivedArticle(articleId)

Deletes an archived article.

#### Signature

`public static Void deleteArchivedArticle(String
articleId)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
KbManagement.PublishingService.deleteArchivedArticle(articleId);
```

### deleteArchivedArticleVersion(articleId, versionNumber)

Deletes a specific archived version of a published article.

#### Signature

`public static Void deleteArchivedArticleVersion(String
articleId, Integer versionNumber)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

versionNumber

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
Integer versionNumber = 1;
KbManagement.PublishingService.deleteArchivedArticleVersion(articleId, versionNumber);
```

### deleteDraftArticle(articleId)

Deletes a draft article. 

#### Signature

`public static Void deleteDraftArticle(String
articleId)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
KbManagement.PublishingService.deleteDraftArticle(articleId);
```

### deleteDraftTranslation(articleVersionId)

Deletes a draft translation. 

#### Signature

`public static Void deleteDraftTranslation(String
articleVersionId)`

#### Parameters

articleVersionId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

#### Example

```
String articleVersionId = 'Insert article ID';
KbManagement.PublishingService.deleteDraftTranslation (articleVersionId);
```

### editArchivedArticle(articleId)

Creates a draft article from the archived primary version and returns the new draft
  primary version ID of the article. 

#### Signature

`public static String editArchivedArticle(String
articleId)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Example

```
String articleId = 'Insert article ID';
String id = KbManagement.PublishingService.editArchivedArticle(articleId);
```

### editOnlineArticle(articleId, unpublish)

Creates a draft article from the online version and returns the new draft primary version
  ID of the article. Also, unpublishes the online article, if unpublish is set to
   `true`. 

#### Signature

`public static String editOnlineArticle(String
articleId, Boolean unpublish)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

unpublish

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Example

```
String articleId = 'Insert article ID';
String id = KbManagement.PublishingService.editOnlineArticle (articleId, true);
```

### editPublishedTranslation(articleId, language, unpublish)

Creates a draft version of the online translation for a specific language and returns the
  new draft primary version ID of the article. Also, unpublishes the article, if set to `true`. 

#### Signature

`public static String editPublishedTranslation(String
articleId, String language, Boolean unpublish)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

language

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

unpublish

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Example

```
String articleId = 'Insert article ID';
String language = 'fr';
String id = KbManagement.PublishingService.editPublishedTranslation(articleId, language, true);
```

### publishArticle(articleId, flagAsNew)

Publishes an article. If flagAsNew is
set to `true`, the article is
published as a major version. 

#### Signature

`public static Void publishArticle(String articleId,
Boolean flagAsNew)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

flagAsNew

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
KbManagement.PublishingService.publishArticle(articleId, true);
```

### restoreOldVersion(articleId, versionNumber)

Creates a draft article from an existing online article
based on the specified archived version of the article and returns
the article version ID.

#### Signature

`public static String restoreOldVersion(String
articleId, Integer versionNumber)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

versionNumber

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Example

```
String articleId = 'Insert article ID';
String id = KbManagement.PublishingService.restoreOldVersion (articleId, 1);
```

### scheduleForPublication(articleId, scheduledDate)

Schedules the article for publication as a major version.
If the specified date is null, the article is published immediately. 

#### Signature

`public static Void scheduleForPublication(String
articleId, Datetime scheduledDate)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

scheduledDate

Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime)

#### Return Value

Type: Void

#### Example

```
String articleId = 'Insert article ID';
Datetime scheduledDate = Datetime.newInstanceGmt(2012, 12,1,13,30,0);
KbManagement.PublishingService.scheduleForPublication(articleId, scheduledDate);
```

### setTranslationToIncomplete(articleVersionId)

Sets a draft translation that is ready for publication
back to “in progress” status.

#### Signature

`public static Void setTranslationToIncomplete(String
articleVersionId)`

#### Parameters

articleVersionId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: Void

#### Example

```
String articleVersionId = 'Insert article ID';
KbManagement.PublishingService.setTranslationToIncomplete(articleVersionId);
```

### submitForTranslation(articleId, language, assigneeId, dueDate)

Submits an article for translation to the specified language.
Also assigns the specified user and due date to the submittal and
returns new ID of the draft translation.

#### Signature

`public static String submitForTranslation(String articleId, String
     language, String assigneeId, Datetime dueDate)`

#### Parameters

articleId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

language

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

assigneeId

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

dueDate

Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime)

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Example

```
String articleId = 'Insert article ID';
String language = 'fr';
String assigneeId = 'Insert assignee ID';
Datetime dueDate = Datetime.newInstanceGmt(2012, 12,1);
String id = KbManagement.PublishingService.submitForTranslation(articleId, language, assigneeId, dueDate);
```