# AsyncOptions Class

# AsyncOptions Class

Contains maximum stack depths for queueable transactions and the minimum queueable delay
    in minutes. Passed as parameter to the `System.enqueueJob()`
    method to define a unique queueable job signature, the maximum stack depth for queueable
    transactions and the minimum queueable delay in minutes.

## Namespace

[System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm)

- 
**[AsyncOptions Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AsyncOptions.htm#apex_System_AsyncOptions_properties)**

#### See Also

- [*Apex Developer Guide*: Queueable Apex](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_queueing_jobs.htm)

- [*Apex Developer Guide*: Detecting Duplicate Queueable Jobs](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dedupe_queueable.htm)

## AsyncOptions Properties

The following are properties for `AsyncOptions`.

- 
**[DuplicateSignature](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AsyncOptions.htm#apex_System_AsyncOptions_DuplicateSignature)**

A unique signature for a Queueable job.

- 
**[MaximumQueueableStackDepth](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AsyncOptions.htm#apex_System_AsyncOptions_MaximumQueueableStackDepth)**

Maximum stack depth for queueable transactions.

- 
**[MinimumQueueableDelayInMinutes](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AsyncOptions.htm#apex_System_AsyncOptions_MinimumQueueableDelayInMinutes)**

Minimum queueable delay for queueable transactions.

  ### DuplicateSignature

  
  
  
A unique signature for a Queueable job.

    
#### Signature

`public
          System.QueueableDuplicateSignature DuplicateSignature {get;
      set;}`

    
#### Property Value

Type: [QueueableDuplicateSignature Class](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_QueueableDuplicateSignature.htm#apex_class_System_QueueableDuplicateSignature)

  

### MaximumQueueableStackDepth

Maximum stack depth for queueable transactions.

#### Signature

`public Integer MaximumQueueableStackDepth {get; set;}`

#### Property Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### MinimumQueueableDelayInMinutes

Minimum queueable delay for queueable transactions.

#### Signature

`public Integer MinimumQueueableDelayInMinutes {get; set;}`

#### Property Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)