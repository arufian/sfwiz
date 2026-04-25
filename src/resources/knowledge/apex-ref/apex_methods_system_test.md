# Test Class

# Test Class

Contains methods related to Apex tests.

## Namespace

[System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm)

## Test Methods

The following are methods for `Test`. All methods are static.

- 
**[calculatePermissionSetGroup(psgIds)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_calculatePermissionSetGroup)**

Calculates aggregate permissions in specified permission set groups       for testing.

- 
**[calculatePermissionSetGroup(psgId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_calculatePermissionSetGroup_2)**

Calculates aggregate permissions in a specified permission set group       for testing.

- 
**[clearApexPageMessages()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_clearApexPageMessages)**

Clear the messages on a Visualforce page while executing Apex test       methods.

- 
**[createSoqlStub(targetType, soqlStub)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createSoqlStub)**

Creates a stub that will respond to SOQL queries against the specified SObject type you     can use during testing.

- 
**[createStub(parentType, stubProvider)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createStub)**

Creates a stubbed version of an Apex class that you can use for       testing. This method is part of the Apex stub API. You can use it with the `System.StubProvider` interface to create a mocking       framework.

- 
**[createStubQueryRow(targetType, fieldMapWithRelationshipKeys)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createStubQueryRow)**

Creates an instance of a stubbed SObject type that you can use to provide testing results     in the extended `System.SoqlStubProvider` class.

- 
**[createStubQueryRows(targetType, fieldMapWithRelationshipKeysForMultipleRows)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_createStubQueryRows)**

Creates instances of stubbed SObject types that you can use to provide testing results in         the extended `System.SoqlStubProvider` class.

- 
**[enableChangeDataCapture()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_enableChangeDataCapture)**

Use this method in an Apex test so that change event notifications are       generated for all supported Change Data Capture entities. Call this method at the beginning of       your test before performing DML operations and calling `Test.getEventBus().deliver();`.

- 
**[enqueueBatchJobs(numberOfJobs)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_enqueueBatchJobs)**

Adds the specified number of jobs with no-operation contents to the       test-context queue. It first fills the test batch queue, up to the maximum 5 jobs, and then       places jobs in the test flex queue. It throws a limit exception when the number of jobs in the       test flex queue exceeds the allowed limit of 100 jobs.

- 
**[getEventBus()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_getEventBus)**

Returns an instance of the test event bus broker, which lets you       operate on platform event or change event messages in an Apex test. For example, you can call         `Test.getEventBus().deliver()` to deliver event       messages.

- 
**[getFlexQueueOrder()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_getFlexQueueOrder)**

Returns an ordered list of job IDs for jobs in the test-context flex       queue. The job at index `0` is the next job slated to       run. This method returns only test-context results, even if it’s annotated with `@IsTest(SeeAllData=true)`.

- 
**[getStandardPricebookId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_getStandardPricebookId)**

Returns the ID of the standard price book in the organization.

- 
**[invokeContinuationMethod(controller, request)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_invokeContinuationMethod)**

Invokes the callback method for the specified controller and       continuation in a test method.

- 
**[isRunningTest()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_isRunningTest)**

Returns `true` if the currently executing code was called by code contained in a test method, `false` otherwise. Use this method if  you need to run different code depending on whether it was being called  from a test.

- 
**[isSoqlStubDefined(targetType)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_isSoqlStubDefined)**

Returns `true` if a SOQL stub is defined for an SObject     type; otherwise returns `false`.

- 
**[loadData(sObjectToken, resourceName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_loadData)**

Inserts test records from the specified static resource .csv file and for the specified sObject type, and returns a list of the inserted sObjects.

- 
**[newSendEmailQuickActionDefaults(contextId, replyToId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_newSendEmailQuickActionDefaults)**

Creates a new QuickAction.SendEmailQuickActionDefaults instance             for testing a class implementing the QuickAction.QuickActionDefaultsHandler             interface.

- 
**[setContinuationResponse(requestLabel, mockResponse)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setContinuationResponse)**

Sets a mock response for a continuation HTTP request in a test       method.

- 
**[setCreatedDate(recordId, createdDatetime)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setCreatedDate)**

Sets CreatedDate for a test-context     sObject.

- 
**[setCurrentPage(page)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setCurrentPage)**

A Visualforce test method that sets the current PageReference for the controller.

- 
**[setCurrentPageReference(page)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setCurrentPageReference)**

A Visualforce test method that sets the current PageReference for the controller.

- 
**[setFixedSearchResults(fixedSearchResults)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setFixedSearchResults)**

Defines a list of fixed search results to be returned by all subsequent SOSL statements in a test method.

- 
**[setMock(interfaceType, instance)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setMock)**

Sets the response mock mode and instructs the Apex runtime to send a mock response   whenever a callout is made through the HTTP classes or the auto-generated code from   WSDLs.

- 
**[setReadOnlyApplicationMode(applicationMode)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_setReadOnlyApplicationMode)**

Sets the application mode for an organization to read-only in an Apex test to simulate     read-only mode during Salesforce upgrades and downtimes. The application mode is reset to the     default mode at the end of each Apex test run.

- 
**[startTest()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_startTest)**

Marks the point in your test code when your test actually begins.  Use this method when you are testing governor limits.

- 
**[stopTest()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_stopTest)**

Marks the point in your test code when your test ends. Use this method in conjunction with the `startTest` method.

- 
**[testInstall(installImplementation, version, isPush)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testInstall)**

Tests the implementation of the InstallHandler interface, which is used for specifying     a post install script in packages. Tests run as the test initiator in the development     environment.

- 
**[testSandboxPostCopyScript(script, organizationId, sandboxId, sandboxName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testSandboxPostCopyScript)**

Tests the implementation of the SandboxPostCopy Interface, which is             used for specifying a script to run at the completion of a Sandbox copy. Tests run as             the test initiator in the development environment.

- 
**[testSandboxPostCopyScript(script, organizationId, sandboxId, sandboxName, RunAsAutoProcUser)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testSandboxPostCopyScript_2)**

Tests the implementation of the SandboxPostCopy Interface, which is used for             specifying a script to run at the completion of a Sandbox copy. When `RunAsAutoProcUser` is `true`, tests run as Automated Process user in the development             environment.

- 
**[testUninstall(uninstallImplementation)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_System_Test_testUninstall)**

Tests the implementation of the UninstallHandler interface, which is used for     specifying an uninstall script in packages. Tests run as the test initiator in the development     environment.

### calculatePermissionSetGroup(psgIds)

Calculates aggregate permissions in specified permission set groups
      for testing.

#### Signature

`public static void calculatePermissionSetGroup(List<String> psgIds)`

#### Parameters

psgIds
Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)>
A list of IDs for permission set groups.

#### Return Value

Type: void

### calculatePermissionSetGroup(psgId)

Calculates aggregate permissions in a specified permission set group
      for testing.

#### Signature

`public static void calculatePermissionSetGroup(String psgId)`

#### Parameters

psgId
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

A single ID for a specified permission set group.

#### Return Value

Type: void

### clearApexPageMessages()

Clear the messages on a Visualforce page while executing Apex test
      methods.

#### Signature

`public static void clearApexPageMessages()`

#### Return Value

Type: void

    
#### Usage

      
      This method may only be used in tests.

    

    
#### Example

      
```

    @isTest
    static void clearMessagesTest() {
        Test.setCurrentPage(new PageReference('/'));
        ApexPages.addMessage(
            new ApexPages.Message(ApexPages.Severity.WARNING, 'Sample Warning')
        );
        System.assertEquals(1, ApexPages.getMessages().size());
        Test.clearApexPageMessages();
        System.assertEquals(0, ApexPages.getMessages().size());
    }

```

    

### createSoqlStub(targetType, soqlStub)

Creates a stub that will respond to SOQL queries against the specified SObject type you
    can use during testing.

#### Signature

`public static void createSoqlStub(Schema.SObjectType targetType, System.SoqlStubProvider soqlStub)`

#### Parameters

targetType
Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#topic-title)

The SObject type to be stubbed. This parameter can’t be null.
soqlStub
Type: [System.SoqlStubProvider](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SoqlStubProvider.htm#apex_class_System_SoqlStubProvider)

An implementation of the `SoqlStubProvider` abstract
            class.

#### Return Value

Type: void

#### See Also

- [*Apex Developer Guide*: Mock SOQL Tests for Data Cloud Data Model
                     Objects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/MockSOQLTestsForDMOs.htm)

  ### createStub(parentType,
        stubProvider)

  
  
  
Creates a stubbed version of an Apex class that you can use for
      testing. This method is part of the Apex stub API. You can use it with the `System.StubProvider` interface to create a mocking
      framework.

    
#### Signature

      
      `public static Object createStub(System.Type parentType,
          System.StubProvider stubProvider)`

      
    

    
#### Parameters

      
      
        
          parentType

          Type: [System.Type](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_type.htm#apex_methods_system_type)

          The type of the Apex class to be stubbed.

        
        
          stubProvider

          [System.StubProvider](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_System_StubProvider.htm#apex_interface_System_StubProvider)

          An implementation of the `StubProvider`
            interface.

        
      

    

    
#### Return Value

      
      Type: Object

      Returns the stubbed object to use in testing.

    

    
#### Usage

      
      The `createStub()` method works together with the
          `System.StubProvider` interface. You define the
        behavior of the stubbed object by implementing the `StubProvider` interface. Then you create a stubbed object using the `createStub()` method. When you invoke methods on the
        stubbed object, the `handleMethodCall()` method of the
          `StubProvider` interface is called to perform the
        behavior of the stubbed method.

    

  

#### See Also

- [*Apex Developer Guide*: Build a Mocking Framework with the Stub
                     API](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_testing_stub_api.htm)

### createStubQueryRow(targetType, fieldMapWithRelationshipKeys)

Creates an instance of a stubbed SObject type that you can use to provide testing results
    in the extended `System.SoqlStubProvider` class.

    
#### Signature

      
      `public static SObject createStubQueryRow(Schema.SObjectType
          targetType, Map<String,Object> fieldMapWithRelationshipKeys)`

      
    

    
#### Parameters

      
      
        
          targetType

          Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#topic-title)

          The SObject type to be stubbed. This parameter can’t be null.

        
        
          fieldMapWithRelationshipKeys

          Type: [Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#topic-title)<String,Object>

          The map contains the fields for a parent entity, keyed by the field name with a value
                        for each field. Key and value pairs can also be used for an aggregate
                        relationship. The key holds the name of the aggregate relationship and the
                        value is a list of SObjects.

        
      

    

    
#### Return Value

Type: [SObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject)

Returns the stubbed SObject to use in testing.

    
#### Example

      
      ssot__EmailEngagement__dlm engagement = (ssot__EmailEngagement__dlm)Test.createStubQueryRow(ssot__EmailEngagement__dlm.SObjectType, 
    new Map<string, object> {
        'ssot__Name__c' => 'My Email Engagement',
        'ssot__CityName__c' => 'San Francisco'
    }
);

    

  

#### See Also

- [*Apex Developer Guide*: Mock SOQL Tests for Data Cloud Data Model
                     Objects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/MockSOQLTestsForDMOs.htm)

### createStubQueryRows(targetType, fieldMapWithRelationshipKeysForMultipleRows)

Creates instances of stubbed SObject types that you can use to provide testing results in
        the extended `System.SoqlStubProvider` class.

    
#### Signature

      
      `public static List<SObject>
          createStubQueryRows(Schema.SObjectType targetType, List<Map<String,Object>>
          fieldMapWithRelationshipKeysForMultipleRows)`

      
    

    
#### Parameters

      
      
        
          targetType

          Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#topic-title)

          The SObject type to be stubbed. This parameter can’t be null.

        
        
          fieldMapWithRelationshipKeysForMultipleRows

          Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#topic-title)<[Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#topic-title)<String,Object>>

          The list of maps containing the fields for a parent entity, keyed by the field name
                        with a value for each field. Key and value pairs can also be used for an
                        aggregate relationship used in the query. The key holds the name of the
                        aggregate relationship and the value is a list of SObjects.

        
      

    

    
#### Return Value

      
      Type: List<[SObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#topic-title)>

      Returns a list of stubbed SObject types to use in testing.

    

    
#### Example

List<Map<String, Object>> engagementMaps = new List<Map<String, Object>>();
Map<String, Object> engagement = new Map<String, Object> {
        'ssot__Name__c' => 'My Email Engagement',
        'ssot__CityName__c' => 'San Francisco'
};
Map<String, Object> engagement2 = new Map<String, Object> {
        'ssot__Name__c' => 'My Other Email Engagement',
        'ssot__CityName__c' => 'New York'
};
 
engagementMaps.add(engagement);
engagementMaps.add(engagement2);
 
List<ssot__EmailEngagement__dlm> engagements = (List<ssot__EmailEngagement__dlm>)Test.createStubQueryRows(ssot__EmailEngagement__dlm.SObjectType, 
    engagementMaps);

  

#### See Also

- [*Apex Developer Guide*: Mock SOQL Tests for Data Cloud Data Model
                     Objects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/MockSOQLTestsForDMOs.htm)

### enableChangeDataCapture()

Use this method in an Apex test so that change event notifications are
      generated for all supported Change Data Capture entities. Call this method at the beginning of
      your test before performing DML operations and calling `Test.getEventBus().deliver();`.

#### Signature

`public static void enableChangeDataCapture()`

#### Return Value

Type: void

    
#### Usage

      
      The `enableChangeDataCapture()` method ensures that
        Apex tests can fire change event triggers regardless of the entities selected in Setup in
        the Change Data Capture page. The `enableChangeDataCapture()` method doesn’t affect the entities selected in
        Setup.

    

#### See Also

- [*Change Data Capture Developer Guide*](https://developer.salesforce.com/docs/atlas.en-us.258.0.change_data_capture.meta/change_data_capture/cdc_intro.htm)

  ### enqueueBatchJobs(numberOfJobs)

  
  
  
Adds the specified number of jobs with no-operation contents to the
      test-context queue. It first fills the test batch queue, up to the maximum 5 jobs, and then
      places jobs in the test flex queue. It throws a limit exception when the number of jobs in the
      test flex queue exceeds the allowed limit of 100 jobs.

    
#### Signature

      
      `public static List<Id> enqueueBatchJobs(Integer
          numberOfJobs)`

      
    

    
#### Parameters

      
      
        
          numberOfJobs

          Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

          Number of test jobs to enqueue.

        
      

    

    
#### Return Value

      
      Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)>

      A list of IDs of enqueued test jobs.

    

    
#### Usage

      
      Use this method to reduce testing time. Instead of using your org's real batch jobs for
        testing, you can use this method to simulate batch-job enqueueing. Using `enqueueBatchJobs(numberOfJobs)` is faster than enqueuing
        real batch jobs.

    

  

### getEventBus()

Returns an instance of the test event bus broker, which lets you
      operate on platform event or change event messages in an Apex test. For example, you can call
        `Test.getEventBus().deliver()` to deliver event
      messages.

#### Signature

`public static EventBus.TestBroker getEventBus()`

#### Return Value

Type: [EventBus.TestBroker](atlas.en-us.258.0.apexref.meta/apexref/apex_class_eventbus_TestBroker.htm#apex_class_eventbus_TestBroker)

A broker for the test event bus.

    
#### Usage

      
      Enclose `Test.getEventBus().deliver()` within the
          `Test.startTest()` and `Test.stopTest()` statement block.

      
```
Test.startTest();
// Create test events
// ...
// Publish test events with EventBus.publish()
// ...
// Deliver test events
Test.getEventBus().deliver();
// Perform validation 
// ...
Test.stopTest();

```

    

#### See Also

- [*Platform Events Developer Guide*](https://developer.salesforce.com/docs/atlas.en-us.258.0.platform_events.meta/platform_events/platform_events_intro.htm)

  ### getFlexQueueOrder()

  
  
  
Returns an ordered list of job IDs for jobs in the test-context flex
      queue. The job at index `0` is the next job slated to
      run. This method returns only test-context results, even if it’s annotated with `@IsTest(SeeAllData=true)`.

    
#### Signature

      
      `public static List<Id>
        getFlexQueueOrder()`

      
    

    
#### Return Value

      
      Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)>

      An ordered list of IDs of the jobs in the test’s flex queue.

    

  

### getStandardPricebookId()

Returns the ID of the standard price
book in the organization.

#### Signature

`public static Id getStandardPricebookId()`

#### Return Value

Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

The ID of the standard price book.

#### Usage

This method returns the ID
of the standard price book in your organization regardless of whether
the test can query organization data. By default, tests can’t
query organization data unless they’re annotated with `@isTest(SeeAllData=true)`.

Creating
price book entries with a standard price requires the ID of the standard
price book. Use this method to get the standard price book ID so that
you can create price book entries in your tests.

#### Example

This
example creates some test data for price book entries. The test method
in this example gets the standard price book ID and uses this ID to
create a price book entry for a product with a standard price. Next,
the test creates a custom price book and uses the ID of this custom
price book to add a price book entry with a custom price.

```
@isTest
public class PriceBookTest {
    // Utility method that can be called by Apex tests to create price book entries.
    static testmethod void addPricebookEntries() {
        // First, set up test price book entries.
        // Insert a test product.
        Product2 prod = new Product2(Name = 'Laptop X200', 
            Family = 'Hardware');
        insert prod;
        
        // Get standard price book ID.
        // This is available irrespective of the state of SeeAllData.
        Id pricebookId = Test.getStandardPricebookId();
        
        // 1. Insert a price book entry for the standard price book.
        // Standard price book entries require the standard price book ID we got earlier.
        PricebookEntry standardPrice = new PricebookEntry(
            Pricebook2Id = pricebookId, Product2Id = prod.Id,
            UnitPrice = 10000, IsActive = true);
        insert standardPrice;
        
        // Create a custom price book
        Pricebook2 customPB = new Pricebook2(Name='Custom Pricebook', isActive=true);
        insert customPB;
        
        // 2. Insert a price book entry with a custom price.
        PricebookEntry customPrice = new PricebookEntry(
            Pricebook2Id = customPB.Id, Product2Id = prod.Id,
            UnitPrice = 12000, IsActive = true);
        insert customPrice;
        
        // Next, perform some tests with your test price book entries.
    }
}
```

  ### invokeContinuationMethod(controller, request)

  
  
  
Invokes the callback method for the specified controller and
      continuation in a test method.

    
#### Signature

      
      `public static Object invokeContinuationMethod(Object
          controller, Continuation request)`

      
    

    
#### Parameters

      
      
        
          controller

          Type: Object

          An instance of the controller class that invokes the continuation request.

        
        
          request

          Type: Continuation

          The continuation that is returned by an action method in the controller class.

        
      

    

    
#### Return Value

      
      Type: Object

      The response of the continuation callback method.

    

    
#### Usage

      
      Use the `Test.setContinuationResponse` and `Test.invokeContinuationMethod` methods to test continuations. In test context,
        callouts of continuations aren’t sent to the external service. By using these methods, you
        can set a mock response and cause the runtime to call the continuation callback method to
        process the mock response.

      Call `Test.setContinuationResponse` before you call `Test.invokeContinuationMethod`. When you call `Test.invokeContinuationMethod`, the runtime executes the callback method that is
        associated with the continuation. The callback method processes the mock response that is
        set by `Test.setContinuationResponse`.

    

  

### isRunningTest()

Returns `true` if the currently executing code
was called by code contained in a test method, `false` otherwise. Use this method if
 you need to run different code depending on whether it was being
called  from a test.

#### Signature

`public static Boolean isRunningTest()`

#### Return Value

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

### isSoqlStubDefined(targetType)

Returns `true` if a SOQL stub is defined for an SObject
    type; otherwise returns `false`.

#### Signature

`public static Boolean isSoqlStubDefined(Schema.SObjectType targetType)`

#### Parameters

targetType
Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#topic-title)

The SObject type to check. This parameter can’t be null.

#### Return Value

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

### loadData(sObjectToken, resourceName)

Inserts test records from the specified static resource
.csv file and for the specified sObject type, and returns a list of
the inserted sObjects.

#### Signature

`public static List<sObject> loadData(Schema.SObjectType
sObjectToken, String resourceName)`

#### Parameters

sObjectToken

Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType)

The sObject type for which to insert test records.

resourceName

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

The static resource that corresponds to the .csv file containing
the test records to load. The name is case insensitive.

#### Return Value

Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[sObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject)>

#### Usage

You must create the static resource prior to calling this method.
The static resource is a comma-delimited file ending with a .csv extension.
The file contains field names and values for the test records. The
first line of the file must contain the field names and subsequent
lines are the field values. To learn more about static resources,
see “Defining Static Resources” in the Salesforce online help.

Once you create
a static resource for your .csv file, the static resource will be
assigned a MIME type. Supported MIME types are: 
- text/csv

- application/vnd.ms-excel

- application/octet-stream

- text/plain

    ### newSendEmailQuickActionDefaults(contextId, replyToId)

    
    
    
Creates a new QuickAction.SendEmailQuickActionDefaults instance
            for testing a class implementing the QuickAction.QuickActionDefaultsHandler
            interface.

        
#### Signature

            
            `public static QuickAction.SendEmailQuickActionDefaults
                    newSendEmailQuickActionDefaults(ID contextId, ID replyToId)`

        

        
#### Parameters

            
            
                
                    contextId

                    Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

                    Parent record of the email message.

                
                
                    replyToId

                    Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

                    Previous email message ID if this email message is a reply.

                
            

        

        
#### Return Value

            
            Type: [SendEmailQuickActionDefaults Class](atlas.en-us.258.0.apexref.meta/apexref/apex_class_QuickAction_SendEmailQuickActionDefaults.htm#apex_class_QuickAction_SendEmailQuickActionDefaults)

             The default values used for an email message quick action.

        

    

  ### setContinuationResponse(requestLabel, mockResponse)

  
  
  
Sets a mock response for a continuation HTTP request in a test
      method.

    
#### Signature

      
      `public static void setContinuationResponse(String
          requestLabel, System.HttpResponse mockResponse)`

      
    

    
#### Parameters

      
      
        
          requestLabel

          Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          The unique label that corresponds to the continuation HTTP request. This label is
            returned by `Continuation.addHttpRequest`.

        
        
          mockResponse

          Type: [HttpResponse](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_restful_http_httpresponse.htm#apex_classes_restful_http_httpresponse)

          The fake response to be returned by `Test.invokeContinuationMethod`.

        
      

    

    
#### Return Value

      
      Type: void

    

    
#### Usage

      
      Use the `Test.setContinuationResponse` and `Test.invokeContinuationMethod` methods to test continuations. In test context,
        callouts of continuations aren’t sent to the external service. By using these methods, you
        can set a mock response and cause the runtime to call the continuation callback method to
        process the mock response.

      Call `Test.setContinuationResponse` before you call `Test.invokeContinuationMethod`. When you call `Test.invokeContinuationMethod`, the runtime executes the callback method that is
        associated with the continuation. The callback method processes the mock response that is
        set by `Test.setContinuationResponse`.

    

  

### setCreatedDate(recordId,
        createdDatetime)

Sets CreatedDate for a test-context
    sObject.

#### Signature

`public static void setCreatedDate(Id recordId, Datetime
          createdDatetime)`

#### Parameters

recordId
Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

The ID of an sObject.
createdDatetime
Type: [Datetime](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_datetime.htm#apex_methods_system_datetime)

The value to assign to the sObject’s CreatedDate field.

#### Return Value

Type: void

    
#### Usage

            
            All database changes are rolled back at the end of a test. You can’t
                    use this method on records that existed before your test executed. You also
                    can’t use `setCreatedDate` in methods
                    annotated with `@isTest(SeeAllData=true)`,
                    because those methods have access to all data in your org. If you set
                        CreatedDate to a future value, it can cause unexpected
                    results. This method takes two parameters—an sObject ID and a Datetime
                    value—neither of which can be null.

            
Insert your test record before you set its
                    CreatedDate, as shown in this
                example.
```
@isTest 
private class SetCreatedDateTest {
    static testMethod void testSetCreatedDate() {
        Account a = new Account(name='myAccount');
        insert a;
        Test.setCreatedDate(a.Id, DateTime.newInstance(2012,12,12));
        Test.startTest();
        Account myAccount = [SELECT Id, Name, CreatedDate FROM Account 
                             WHERE Name ='myAccount' limit 1];
        System.assertEquals(myAccount.CreatedDate, DateTime.newInstance(2012,12,12));
        Test.stopTest();
    }
}
```

        

### setCurrentPage(page)

A Visualforce test method that sets the current PageReference for the controller.

#### Signature

`public static Void setCurrentPage(PageReference
page)`

#### Parameters

page

Type: [System.PageReference](atlas.en-us.258.0.apexref.meta/apexref/apex_system_pagereference.htm)

#### Return Value

Type: Void

### setCurrentPageReference(page)

A Visualforce test method that sets the current PageReference for the controller.

#### Signature

`public static Void setCurrentPageReference(PageReference
page)`

#### Parameters

page

Type: [System.PageReference](atlas.en-us.258.0.apexref.meta/apexref/apex_system_pagereference.htm)

#### Return Value

Type: Void

### setFixedSearchResults(fixedSearchResults)

Defines a list of fixed search results to be returned by
all subsequent SOSL statements in a test method.

#### Signature

`public static Void setFixedSearchResults(ID[]
     fixedSearchResults)`

#### Parameters

fixedSearchResults

Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)[]

The list of record IDs specified by opt_set_search_results replaces the results that would normally be returned by the SOSL
 queries if they were not subject to any `WHERE` or `LIMIT` clauses.
 If these clauses exist in the SOSL queries, they are applied to the
 list of fixed search results.

#### Return Value

Type: Void

#### Usage

If opt_set_search_results is not specified, all subsequent SOSL queries return no results.

    For more information, see [Dynamic SOSL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_testing_SOSL.htm).

 ### setMock(interfaceType,
    instance)

 
 
 
Sets the response mock mode and instructs the Apex runtime to send a mock response
  whenever a callout is made through the HTTP classes or the auto-generated code from
  WSDLs.

  
#### Signature

   
   `public static Void setMock(Type interfaceType, Object
     instance)`

  

  
#### Parameters

   
   
    
     interfaceType

     Type: [System.Type](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_type.htm#apex_methods_system_type)

    
    
     instance

     Type: Object

    
   

  

  
#### Return Value

   
   Type: Void

  

  
#### Usage

   
   

#### Note

To mock a callout if the code that performs the callout is in
                a managed package, call `Test.setMock` from a
                test method in the same package with the same namespace.

  

 

  ### setReadOnlyApplicationMode(applicationMode)

  
  
  
Sets the application mode for an organization to read-only in an Apex test to simulate
    read-only mode during Salesforce upgrades and downtimes. The application mode is reset to the
    default mode at the end of each Apex test run.

    
#### Signature

      
      `public static Void setReadOnlyApplicationMode(Boolean
          applicationMode)`

    

    
#### Parameters

      
      
        
          applicationMode

          Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

        
      

    

    
#### Return Value

      
      Type: Void

    

    
#### Usage

      
      Also see the [`getApplicationReadWriteMode()`](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_system.htm#apex_System_System_getApplicationReadWriteMode) System method.

      Do not use `setReadOnlyApplicationMode` for purposes
        unrelated to Read-Only Mode testing, such as simulating DML exceptions.

    

    
#### Example

      
      The following example sets the application mode to read-only and attempts to insert a new
        account record, which results in the exception. It then resets the application mode and
        performs a successful insert.

      
```
@isTest
private class ApplicationReadOnlyModeTestClass {
  public static testmethod void test() {
    // Create a test account that is used for querying later.
    Account testAccount = new Account(Name = 'TestAccount');
    insert testAccount;

    // Set the application read only mode.
    Test.setReadOnlyApplicationMode(true);

    // Verify that the application is in read-only mode.
    System.assertEquals(
               ApplicationReadWriteMode.READ_ONLY, 
               System.getApplicationReadWriteMode());

    // Create a new account object.
    Account testAccount2 = new Account(Name = 'TestAccount2');

    try {
      // Get the test account created earlier. Should be successful.
      Account testAccountFromDb = 
        [SELECT Id, Name FROM Account WHERE Name = 'TestAccount'];
      System.assertEquals(testAccount.Id, testAccountFromDb.Id);

      // Inserts should result in the InvalidReadOnlyUserDmlException 
      // being thrown.
      insert testAccount2;      
      System.assertEquals(false, true);
    } catch (System.InvalidReadOnlyUserDmlException e) {
      // Expected
    }        
    // Insertion should work after read only application mode gets disabled.
    Test.setReadOnlyApplicationMode(false);

    insert testAccount2;
    Account testAccount2FromDb = 
       [SELECT Id, Name FROM Account WHERE Name = 'TestAccount2'];
    System.assertEquals(testAccount2.Id, testAccount2FromDb.Id);
  }
}
```

    

  

### startTest()

Marks the point in your test
code when your test actually begins.  Use this method when you
are testing governor limits.

#### Signature

`public static Void startTest()`

#### Return Value

Type: Void

#### Usage

You can also use this method with `stopTest` to ensure that all asynchronous
calls that come after the `startTest` method are run before doing any assertions or testing. Each test method is allowed to call this method
only once. All of the code before this method should be used to initialize
variables, populate data structures, and so on, allowing you to set
up everything you need to run your test. Any code that executes after
the call to `startTest` and
before `stopTest` is assigned
a new set of governor limits.

### stopTest()

Marks the point in your test code
when your test ends. Use this method in conjunction with the `startTest` method.

#### Signature

`public static Void stopTest()`

#### Return Value

Type: Void

#### Usage

Each test method is allowed to call this method only once. Any code that executes after the
     `stopTest` method is assigned the original limits that
    were in effect before `startTest` was called. All asynchronous calls made after the `startTest` method are collected by the system. When `stopTest` is executed, all asynchronous processes are run
     synchronously.

#### Note

Asynchronous calls, such as `@future` or `executeBatch`, called in a `startTest`, `stopTest`
    block, do not count against your limits for the number of queued jobs. 

  ### testInstall(installImplementation,
        version, isPush)

  
  
  
Tests the implementation of the InstallHandler interface, which is used for specifying
    a post install script in packages. Tests run as the test initiator in the development
    environment.

    
#### Signature

      
      `public static Void testInstall(InstallHandler
          installImplementation, Version version, Boolean isPush)`

    

    
#### Parameters

      
      
        
          installImplementation

          Type: [System.InstallHandler](atlas.en-us.258.0.apexref.meta/apexref/apex_install_handler.htm#apex_install_handler)

          A class that implements the `InstallHandler`
            interface.

        
        
          version

          Type: [System.Version](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_version.htm#apex_methods_system_version)

          The version number of the existing package installed in the subscriber
            organization.

        
        
          isPush

          Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

          (Optional) Specifies whether the upgrade is a push. The default value is `false`.

        
      

    

    
#### Return Value

      
      Type: Void

    

    
#### Usage

      
      This method throws a run-time exception if the test install fails.

    

    
#### Example

      
      
```
@isTest static void test() {
  PostInstallClass postinstall = 
    new PostInstallClass();
    Test.testInstall(postinstall, 
      new Version(1,0));
  }

```

    

  

### testSandboxPostCopyScript(script, organizationId, sandboxId, sandboxName)

Tests the implementation of the SandboxPostCopy Interface, which is
            used for specifying a script to run at the completion of a Sandbox copy. Tests run as
            the test initiator in the development environment.

    
#### Signature

      
      `public static void
          testSandboxPostCopyScript(System.SandboxPostCopy script, Id organizationId, Id sandboxId,
          String sandboxName)`

      
    

    
#### Parameters

      
      
        
          script

          Type: [System.SandboxPostCopy](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_System_SandboxPostCopy.htm#apex_interface_System_SandboxPostCopy)

          A class that implements the `SandboxPostCopy`
                        interface.

        
        
          organizationId

          Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

          The sandbox organization ID

        
        
          sandboxId

          Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

          
            The sandbox ID to be provided to the SandboxPostCopy script.

          

        
        
          sandboxName

          Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          The sandbox name to be provided to the SandboxPostCopy script.

        
      

    

    
#### Return Value

      
      Type: void

    

    
#### Usage

      
      This method throws a run-time exception if the test install fails.

            

#### Note

Salesforce recommends that you use the [`testSandboxPostCopyScript(script, organizationId, sandboxId, sandboxName,
                        isRunAsAutoProcUser)`](#apex_System_Test_testSandboxPostCopyScript_2) overload instead of this method. When
                    `isRunAsAutoProcUser` is `true`, the SandboxPostCopy script
                is tested with the same user access permissions as used by post-copy tasks during
                sandbox creation. Using the same permissions enables the test to better simulate the
                actual usage of the class, and to uncover potential issues. 

    

    
#### Example

      
            See [SandboxPostCopy Example Implementation](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_System_SandboxPostCopy.htm#apex_interface_System_SandboxPostCopy_Example)
            

    

  

### testSandboxPostCopyScript(script, organizationId, sandboxId,
            sandboxName, RunAsAutoProcUser)

Tests the implementation of the SandboxPostCopy Interface, which is used for
            specifying a script to run at the completion of a Sandbox copy. When `RunAsAutoProcUser` is `true`, tests run as Automated Process user in the development
            environment.

#### Signature

`public static void testSandboxPostCopyScript(System.SandboxPostCopy
                    script, Id organizationId, Id sandboxId, String sandboxName, Boolean
                    RunAsAutoProcUser)`

#### Parameters

                
                    script

                    Type: [System.SandboxPostCopy](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_System_SandboxPostCopy.htm#apex_interface_System_SandboxPostCopy)

                    A class that implements the `SandboxPostCopy` interface.

                
                
                    organizationId

                    Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

                    The sandbox organization ID.

                
                
                    sandboxId

                    Type: [Id](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

                    
                        The sandbox ID to be provided to the SandboxPostCopy script.

                    

                
                
                    sandboxName

                    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

                    The sandbox name to be provided to the SandboxPostCopy script.

                
                
                    RunAsAutoProcUser

                    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

                    When `true`, the
                            SandboxPostCopy script is tested with the same user
                        access permissions as used by post-copy tasks during sandbox creation. Using
                        the same permissions enables the test to better simulate the actual usage of
                        the class, and to uncover potential issues. 

                    When `false`, the test runs as the test
                        initiator. This option can alter the permissions with which the script is
                        tested, such as the ability to access objects and features.

                

#### Return Value

Type: void

        
#### Usage

            
            This method throws a run-time exception if the test install fails.

        

        
#### Example

            
            See [SandboxPostCopy Example Implementation](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_System_SandboxPostCopy.htm#apex_interface_System_SandboxPostCopy_Example)
            

        

  ### testUninstall(uninstallImplementation)

  
  
  
Tests the implementation of the UninstallHandler interface, which is used for
    specifying an uninstall script in packages. Tests run as the test initiator in the development
    environment.

    
#### Signature

      
      `public static Void testUninstall(UninstallHandler
          uninstallImplementation)`

    

    
#### Parameters

      
      
        
          uninstallImplementation

          Type: [System.UninstallHandler](atlas.en-us.258.0.apexref.meta/apexref/apex_uninstall_handler.htm#apex_System_UninstallHandler_methods)

          A class that implements the `UninstallHandler`
            interface.

        
      

    

    
#### Return Value

      
      Type: Void

    

    
#### Usage

      
      This method throws a run-time exception if the test uninstall
        fails.

    

    
#### Example

      
      
```
@isTest static void test() {
  UninstallClass uninstall = 
    new UninstallClass();
    Test.testUninstall(uninstall);
  }

```