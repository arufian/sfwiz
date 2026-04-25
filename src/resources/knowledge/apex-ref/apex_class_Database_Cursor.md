# Cursor Class (Beta)

Cursor Class (Beta) Contains methods to fetch records and to get the number of cursor rows returned from a SOQL query.  Namespace [Database](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Database.htm "The Database namespace provides classes used with DML operations.") Usage Note This feature is a Beta Service. Customer may opt to try such Beta Service in its sole discretion. Any use of the Beta Service is subject to the applicable Beta Services Terms provided at [Agreements and Terms](https://www.salesforce.com/company/legal/agreements/). You can provide feedback and suggestions for the feature in the [Trailblazer Community](https://trailhead.salesforce.com/trailblazer-community/groups/0F94V000000bvOlSAI). A cursor is created when a SOQL query is executed on a Database.getCursor() or a Database.getCursorWithBinds() call. When the SOQL query is invoked, the corresponding rows are returned from the cursor. The maximum number of rows per cursor is 50 million, regardless of the operation being synchronous or asynchronous.  Example public class QueryChunkingQueuable implements Queueable { private Database.Cursor locator; private integer position; public QueryChunkingQueuable() { locator = Database.getCursor ('SELECT Id FROM Contact WHERE LastActivityDate = LAST_N_DAYS:400'); position = 0; } public void execute(QueueableContext ctx) { List<Contact> scope = locator.fetch(position, 200); position += scope.size(); // do something, like archive or delete the scope list records if(position < locator.getNumRecords() ) { // process the next chunk System.enqueueJob(this); } } } 
[/code]

            * **[Cursor Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Database_Cursor.htm#apex_Database_Cursor_methods)**  

Cursor Methods The following are methods for Cursor.
            * **[fetch(position, count)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Database_Cursor.htm#apex_Database_Cursor_fetch)**  
Fetches cursor rows that correspond to the offset position and the specified record count. The maximum number of rows per cursor is 50 million, regardless of the operation being synchronous or asynchronous.
            * **[getNumRecords()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Database_Cursor.htm#apex_Database_Cursor_getNumRecords)**  
Gets the number of rows returned in an Apex cursor from a Cursor.fetch(position, count) operation.
fetch(position, count) Fetches cursor rows that correspond to the offset position and the specified record count. The maximum number of rows per cursor is 50 million, regardless of the operation being synchronous or asynchronous. Signature public static List<SObject> fetch(Integer position, Integer count) Parameters

position
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    The offset position from which records are fetched.
count
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    The number of sObjects to fetch from the cursor, up to a maximum of 2,000.
Return Value Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[sObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject "Contains methods for the sObject data type.")> The list of sObjects from the SOQL query, starting from the specified position. getNumRecords() Gets the number of rows returned in an Apex cursor from a Cursor.fetch(position, count) operation. Signature public static Integer getNumRecords() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
