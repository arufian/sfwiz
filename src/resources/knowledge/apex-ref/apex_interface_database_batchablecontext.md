# BatchableContext Interface

# BatchableContext Interface

 
 
 
Represents the parameter type of a batch job method and contains the batch job ID. This
  interface is implemented internally by Apex.

  
## Namespace

   
   [Database](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Database.htm)

  

  
 

#### See Also

- [Batchable Interface](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_database_batchable.htm#apex_interface_database_batchable)

## BatchableContext Methods

The following are methods for `BatchableContext`.

- 
**[getChildJobId()](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_database_batchablecontext.htm#apex_Database_BatchableContext_getChildJobId)**

Returns the ID of the current batch job chunk that is being processed.

- 
**[getJobId()](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_database_batchablecontext.htm#apex_Database_BatchableContext_getJobId)**

Returns the batch job ID.

### getChildJobId()

Returns the ID of the current batch job chunk that is being
processed.

#### Signature

`public Id getChildJobId()`

#### Return Value

Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)

### getJobId()

Returns the batch job ID.

#### Signature

`public Id getJobId()`

#### Return Value

Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id)