# GetUpdatedResult Class

# GetUpdatedResult Class

Contains the result for the `Database.getUpdated` method call.

## Namespace

[Database](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Database.htm)

## Usage

Use the methods in this class to obtain
detailed information about the updated records returned by `Database.getUpdated` for a specific
time window.

## GetUpdatedResult Methods

The following are methods for `GetUpdatedResult`. All are instance methods.

- 
**[getIds()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_database_getupdatedresult.htm#apex_Database_GetUpdatedResult_getIds)**

Returns the IDs of records updated within the time window specified in the `Database.getUpdated` method.

- 
**[getLatestDateCovered()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_database_getupdatedresult.htm#apex_Database_GetUpdatedResult_getLatestDateCovered)**

Returns the date in Coordinated Universal Time (UTC) of the last date covered in the `Database.getUpdated` call.

### getIds()

Returns the IDs of records updated within the time window
specified in the `Database.getUpdated` method.

#### Signature

`public List<Id> getIds()`

#### Return Value

Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)>

### getLatestDateCovered()

Returns the date in Coordinated Universal Time (UTC) of
the last date covered in the `Database.getUpdated` call.

#### Signature

`public Date getLatestDateCovered()`

#### Return Value

Type: [Date](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_date.htm#apex_methods_system_date)