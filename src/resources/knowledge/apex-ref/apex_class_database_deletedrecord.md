# DeletedRecord Class

# DeletedRecord Class

Contains information about a deleted record.

## Namespace

[Database](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Database.htm)

## Usage

The `getDeletedRecords` method of the `Database.GetDeletedResult` class returns a list of `Database.DeletedRecord` objects. Use
the methods in the `Database.DeletedRecord` class to retrieve details about each deleted record.

## DeletedRecord Methods

The following are methods for `DeletedRecord`. All are instance methods.

- 
**[getDeletedDate()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_database_deletedrecord.htm#apex_Database_DeletedRecord_getDeletedDate)**

Returns the deleted date of this record.

- 
**[getId()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_database_deletedrecord.htm#apex_Database_DeletedRecord_getId)**

Returns the ID of a record deleted within the time window specified in the `Database.getDeleted` method.

### getDeletedDate()

Returns the deleted date of this record.

#### Signature

`public Date getDeletedDate()`

#### Return Value

Type: [Date](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_date.htm#apex_methods_system_date)

### getId()

Returns the ID of a record deleted within the time window
specified in the `Database.getDeleted` method.

#### Signature

`public Id getId()`

#### Return Value

Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)