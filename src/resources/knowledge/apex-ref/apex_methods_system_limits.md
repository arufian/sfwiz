# Limits Class

# Limits Class

 
 
 
Contains methods that return limit information for specific resources.

  
## Namespace

   
   [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm)

  

  
## Usage

   
   The Limits methods return the specific limit for the particular
     governor, such as the number of calls of a method or the amount of heap size remaining.
    

   Because Apex runs in a multitenant environment, the Apex runtime engine strictly enforces a
    number of limits to ensure that runaway Apex doesn’t monopolize shared resources.

   None of the Limits methods require an argument. The format of the limits methods is as
    follows:

   
    
```
myDMLLimit = Limits.getDMLStatements();
```

   

   There are two versions of every method: the first returns the amount of the resource that has
    been used while the second version contains the word limit and returns the
    total amount of the resource that is available.

   See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm).

  

 

## Limits Methods

The following are methods for `Limits`. All methods are static.

- 
**[getAggregateQueries()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getAggregateQueries)**

Returns the number of aggregate queries that have been processed with any SOQL query statement.

- 
**[getLimitAggregateQueries()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitAggregateQueries)**

Returns the total number of aggregate queries that can be processed with SOQL query statements.

- 
**[getApexCursorRows()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getApexCursorRows)**

Gets the number of rows returned by an Apex cursor.

- 
**[getLimitApexCursorRows()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitApexCursorRows)**

Gets the maximum number of rows that can be returned by an Apex cursor.

- 
**[getFetchCallsOnApexCursor()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getFetchCallsOnApexCursor)**

Gets the number of fetch calls on an Apex cursor.

- 
**[getLimitFetchCallsOnApexCursor()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitFetchCallsOnApexCursor)**

Gets the maximum number of fetch calls that can be made on an Apex cursor.

- 
**[getAsyncCalls()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_limits_getAsyncCalls)**

Reserved for future use.

- 
**[getLimitAsyncCalls()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_limits_getLimitAsyncCalls)**

Reserved for future use.

- 
**[getCallouts()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getCallouts)**

Returns the number of Web service statements that have been processed.

- 
**[getChildRelationshipsDescribes()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getChildRelationshipsDescribes)**

Deprecated. Returns the number of child relationship objects that have been   returned.

- 
**[getLimitCallouts()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitCallouts)**

Returns the total number of Web service statements that can be processed. 

- 
**[getCpuTime()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getCpuTime)**

Returns the CPU time (in milliseconds) that has been used in the current     transaction.

- 
**[getLimitCpuTime()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitCpuTime)**

Returns the maximum CPU time  (in milliseconds) that can be used in a         transaction.

- 
**[getDMLRows()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getDMLRows)**

Returns the number of records that have been processed with any statement that counts against DML limits, such as DML statements, the `Database.emptyRecycleBin` method, and other methods.

- 
**[getLimitDMLRows()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitDMLRows)**

Returns the total number of records that can be processed with any statement that counts against DML limits, such as DML statements, the `database.EmptyRecycleBin` method, and other methods. 

- 
**[getDMLStatements()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getDMLStatements)**

Returns the number of DML statements (such as `insert`, `update` or the `database.EmptyRecycleBin` method) that have been called.

- 
**[getLimitDMLStatements()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitDMLStatements)**

Returns the total number of DML statements or the `database.EmptyRecycleBin` methods that can be called.

- 
**[getEmailInvocations()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getEmailInvocations)**

Returns the number of email invocations (such as `sendEmail`) that have been called.

- 
**[getLimitEmailInvocations()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitEmailInvocations)**

Returns the total number of email invocation (such as `sendEmail`) that can be called. 

- 
**[getFindSimilarCalls()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getFindSimilarCalls)**

Deprecated. Returns the same value as `getSoslQueries`. The number of `findSimilar`   methods is no longer a separate limit, but is tracked as the number of SOSL queries issued. 

- 
**[getLimitFindSimilarCalls()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitFindSimilarCalls)**

Deprecated. Returns the same value as `getLimitSoslQueries`. The number of `findSimilar`   methods is no longer a separate limit, but is tracked as the number of SOSL queries issued. 

- 
**[getFutureCalls()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getFutureCalls)**

Returns the number of methods with the `future`       annotation that have been executed (not necessarily completed).

- 
**[getLimitFutureCalls()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitFutureCalls)**

Returns the total number of methods with the `future` annotation that can be executed (not necessarily completed).

- 
**[getHeapSize()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getHeapSize)**

Returns the approximate amount of memory (in bytes) that has been used for the heap.

- 
**[getLimitHeapSize()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitHeapSize)**

Returns the total amount of memory (in bytes) that can be used for the heap.

- 
**[getMobilePushApexCalls()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getMobilePushApexCalls)**

Returns the number of Apex calls that have been used by mobile push    notifications during the current metering interval.

- 
**[getLimitMobilePushApexCalls()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitMobilePushApexCalls)**

Returns the total number of Apex calls that are allowed per             transaction for mobile push notifications.

- 
**[getPublishImmediateDML()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_limits_getPublishImmediateDML)**

Returns the number of `EventBus.publish` calls that have been made for platform events configured to       publish immediately.

- 
**[getLimitPublishImmediateDML()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_limits_getLimitPublishImmediateDML)**

Returns the total number of `EventBus.publish` statements that can be called for platform events configured to       publish immediately.

- 
**[getQueries()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getQueries)**

Returns the number of SOQL queries that have been issued.

- 
**[getLimitQueries()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitQueries)**

Returns the total number of SOQL queries that can be issued.

- 
**[getQueryLocatorRows()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getQueryLocatorRows)**

Returns the number of records that have been returned by the `Database.getQueryLocator` method.

- 
**[getLimitQueryLocatorRows()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitQueryLocatorRows)**

Returns the total number of records that can be returned by the `Database.getQueryLocator` method.

- 
**[getQueryRows()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getQueryRows)**

Returns the number of records that have been returned by issuing SOQL queries.

- 
**[getLimitQueryRows()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitQueryRows)**

Returns the total number of records that can be returned by issuing SOQL queries.

- 
**[getQueueableJobs()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_apex_System_Limits_getQueueableJobs)**

Returns the number of queueable jobs that have been added to the    queue per transaction. A queueable job corresponds to a class that implements the `Queueable` interface.

- 
**[getLimitQueueableJobs()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_apex_System_Limits_getLimitQueueableJobs)**

Returns the maximum number of queueable jobs that can be added to the    queue per transaction. A queueable job corresponds to a class that implements the `Queueable` interface.

- 
**[getRunAs()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getRunAs)**

Deprecated. Returns the same value as `getDMLStatements`.

- 
**[getLimitRunAs()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitRunAs)**

Deprecated. Returns the same value as `getLimitDMLStatements`.

- 
**[getSavepointRollbacks()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getSavepointRollbacks)**

Deprecated. Returns the same value as `getDMLStatements`.

- 
**[getLimitSavepointRollbacks()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitSavepointRollbacks)**

Deprecated. Returns the same value as `getLimitDMLStatements`.

- 
**[getSavepoints()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getSavepoints)**

Deprecated. Returns the same value as `getDMLStatements`.

- 
**[getLimitSavepoints()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitSavepoints)**

Deprecated. Returns the same value as `getLimitDMLStatements`.

- 
**[getSoslQueries()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getSoslQueries)**

Returns the number of SOSL queries that have been issued.

- 
**[getLimitSoslQueries()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_System_Limits_getLimitSoslQueries)**

Returns the total number of SOSL queries that can be issued.

### getAggregateQueries()

Returns the number of aggregate queries that have been
processed with any SOQL query statement.

#### Signature

`public static Integer getAggregateQueries()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitAggregateQueries()

Returns the total number of aggregate queries that can
be processed with SOQL query statements.

#### Signature

`public static Integer getLimitAggregateQueries()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getApexCursorRows()

Gets the number of rows returned by an Apex cursor.

#### Signature

`public static Integer getApexCursorRows()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitApexCursorRows()

Gets the maximum number of rows that can be returned by an Apex cursor.

#### Signature

`public static Integer getLimitApexCursorRows()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getFetchCallsOnApexCursor()

Gets the number of fetch calls on an Apex cursor.

#### Signature

`public static Integer getFetchCallsOnApexCursor()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitFetchCallsOnApexCursor()

  
Gets the maximum number of fetch calls that can be made on an Apex cursor.

#### Signature

`public static Integer getLimitFetchCallsOnApexCursor()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getAsyncCalls()

Reserved for future use.

#### Signature

`public static Integer getAsyncCalls()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitAsyncCalls()

Reserved for future use.

#### Signature

`public static Integer getLimitAsyncCalls()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getCallouts()

Returns the number of Web service statements that have
been processed.

#### Signature

`public static Integer getCallouts()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

 ### getChildRelationshipsDescribes()

 
 
 
Deprecated. Returns the number of child relationship objects that have been
  returned.

  
#### Signature

   
   `public static Integer
    getChildRelationshipsDescribes()`

   
  

  
#### Return Value

   
   Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

  

  
#### Usage

   
   

#### Note

Because describe limits are no longer enforced in any API
     version, this method is no longer available. In API version 30.0 and earlier, this method is
     available but is deprecated.

  

 

### getLimitCallouts()

Returns the total number of Web service statements that
can be processed. 

#### Signature

`public static Integer getLimitCallouts()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getCpuTime()

Returns the CPU time (in milliseconds) that has been used in the current
    transaction.

#### Signature

`public static Integer getCpuTime()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitCpuTime()

Returns the maximum CPU time  (in milliseconds) that can be used in a
        transaction.

#### Signature

`public static Integer getLimitCpuTime()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getDMLRows()

Returns the number of records that have been processed
with any statement that counts against DML limits, such as DML statements,
the `Database.emptyRecycleBin` method, and other methods.

#### Signature

`public static Integer getDMLRows()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitDMLRows()

Returns the total number of records that can be processed
with any statement that counts against DML limits, such as DML statements,
the `database.EmptyRecycleBin` method, and other methods. 

#### Signature

`public static Integer getLimitDMLRows()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getDMLStatements()

Returns the number of DML statements (such as `insert`, `update` or the `database.EmptyRecycleBin` method) that have been called.

#### Signature

`public static Integer getDMLStatements()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitDMLStatements()

Returns the total number of DML statements or the `database.EmptyRecycleBin` methods
that can be called.

#### Signature

`public static Integer getLimitDMLStatements()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getEmailInvocations()

Returns the number of email invocations (such as `sendEmail`) that have been called.

#### Signature

`public static Integer getEmailInvocations()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitEmailInvocations()

Returns the total number of email invocation (such as `sendEmail`) that can be called. 

#### Signature

`public static Integer getLimitEmailInvocations()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getFindSimilarCalls()

Deprecated. Returns the same value as `getSoslQueries`. The number of `findSimilar`
  methods is no longer a separate limit, but is tracked as the number of SOSL queries issued. 

#### Signature

`public static Integer getFindSimilarCalls()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitFindSimilarCalls()

Deprecated. Returns the same value as `getLimitSoslQueries`. The number of `findSimilar`
  methods is no longer a separate limit, but is tracked as the number of SOSL queries issued. 

#### Signature

`public static Integer getLimitFindSimilarCalls()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getFutureCalls()

Returns the number of methods with the `future`
      annotation that have been executed (not necessarily completed).

#### Signature

`public static Integer getFutureCalls()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitFutureCalls()

Returns the total number of methods with the `future` annotation that can be executed (not necessarily completed).

#### Signature

`public static Integer getLimitFutureCalls()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getHeapSize()

Returns the approximate amount of memory (in bytes) that
has been used for the heap.

#### Signature

`public static Integer getHeapSize()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitHeapSize()

Returns the total amount of memory (in bytes) that can
be used for the heap.

#### Signature

`public static Integer getLimitHeapSize()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

 ### getMobilePushApexCalls()

 
 
 
Returns the number of Apex calls that have been used by mobile push
   notifications during the current metering interval.

  
#### Signature

   
   `public static Integer getMobilePushApexCalls()`

  

  
#### Return Value

   
   Type:[Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

  

 

    ### getLimitMobilePushApexCalls()

    
    
    
Returns the total number of Apex calls that are allowed per
            transaction for mobile push notifications.

        
#### Signature

            
            `public static Integer
                    getLimitMobilePushApexCalls()`

        

        
#### Return Value

            
            Type:[Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

        

    

### getPublishImmediateDML()

Returns the number of `EventBus.publish` calls that have been made for platform events configured to
      publish immediately.

#### Signature

`public static Integer getPublishImmediateDML()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitPublishImmediateDML()

Returns the total number of `EventBus.publish` statements that can be called for platform events configured to
      publish immediately.

#### Signature

`public static Integer getLimitPublishImmediateDML()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getQueries()

Returns the number of SOQL queries that have been issued.

#### Signature

`public static Integer getQueries()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitQueries()

Returns the total number of SOQL queries that can be issued.

#### Signature

`public static Integer getLimitQueries()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getQueryLocatorRows()

Returns the number of records that have been returned by
the `Database.getQueryLocator` method.

#### Signature

`public static Integer getQueryLocatorRows()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitQueryLocatorRows()

Returns the total number of records that can be returned by the `Database.getQueryLocator` method.

#### Signature

`public static Integer getLimitQueryLocatorRows()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getQueryRows()

Returns the number of records that have been returned by
issuing SOQL queries.

#### Signature

`public static Integer getQueryRows()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitQueryRows()

Returns the total number of records that can be returned
by issuing SOQL queries.

#### Signature

`public static Integer getLimitQueryRows()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

 ### getQueueableJobs()

 
 
 
Returns the number of queueable jobs that have been added to the
   queue per transaction. A queueable job corresponds to a class that implements the `Queueable` interface.

  
#### Signature

   
   `public static Integer getQueueableJobs()`

   
  

  
#### Return Value

   
   Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

  

 

 ### getLimitQueueableJobs()

 
 
 
Returns the maximum number of queueable jobs that can be added to the
   queue per transaction. A queueable job corresponds to a class that implements the `Queueable` interface.

  
#### Signature

   
   `public static Integer getLimitQueueableJobs()`

   
  

  
#### Return Value

   
   Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

  

 

### getRunAs()

Deprecated. Returns the same value as `getDMLStatements`.

#### Signature

`public static Integer getRunAs()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

#### Usage

The number of `RunAs` methods is no longer a separate
limit, but is tracked as the number of DML statements issued. 

### getLimitRunAs()

Deprecated. Returns the same value as `getLimitDMLStatements`.

#### Signature

`public static Integer getLimitRunAs()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

#### Usage

The number of `RunAs` methods is no longer a separate
limit, but is tracked as the number of DML statements issued. 

### getSavepointRollbacks()

Deprecated. Returns the same value as `getDMLStatements`.

#### Signature

`public static Integer getSavepointRollbacks()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

#### Usage

The number of `Rollback` methods is no longer a separate
limit, but is tracked as the number of DML statements issued. 

### getLimitSavepointRollbacks()

Deprecated. Returns the same value as `getLimitDMLStatements`.

#### Signature

`public static Integer getLimitSavepointRollbacks()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

#### Usage

The number of `Rollback` methods is no longer a separate
limit, but is tracked as the number of DML statements issued. 

### getSavepoints()

Deprecated. Returns the same value as `getDMLStatements`.

#### Signature

`public static Integer getSavepoints()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

#### Usage

The number of `setSavepoint` methods is no longer
a separate limit, but is tracked as the number of DML statements issued. 

### getLimitSavepoints()

Deprecated. Returns the same value as `getLimitDMLStatements`.

#### Signature

`public static Integer getLimitSavepoints()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

#### Usage

The number of `setSavepoint` methods is no longer
a separate limit, but is tracked as the number of DML statements issued. 

### getSoslQueries()

Returns the number of SOSL queries that have been issued.

#### Signature

`public static Integer getSoslQueries()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getLimitSoslQueries()

Returns the total number of SOSL queries that can be issued.

#### Signature

`public static Integer getLimitSoslQueries()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)