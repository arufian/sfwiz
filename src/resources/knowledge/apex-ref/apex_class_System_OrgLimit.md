# OrgLimit Class

# OrgLimit Class

  
  
  
Contains methods that provide the name, maximum value, and current
      value of an org limit.

    
## Namespace

      
      [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm)
      

    

    
## Usage

Use the `System.OrgLimits`
                `getAll` and `getMap` methods to obtain either a list or a map of all your org
                limits. To get details on each limit, use instance methods from `System.OrgLimit`.

For comparison, the [Limits Class](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_limits.htm#apex_methods_system_limits) returns Apex governor limits
                and not Salesforce API limits.

#### Note

Limit values are updated asynchronously, in
                near-real-time.

  

- 
**[OrgLimit Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_OrgLimit.htm#apex_System_OrgLimit_methods)**

  ## OrgLimit Methods

  
  
    
      The following are methods for `OrgLimit`.

    

  

- 
**[getLimit()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_OrgLimit.htm#apex_System_OrgLimit_getLimit)**

Returns the maximum allowed limit value.

- 
**[getName()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_OrgLimit.htm#apex_System_OrgLimit_getName)**

Returns the limit’s name.

- 
**[getValue()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_OrgLimit.htm#apex_System_OrgLimit_getValue)**

Returns the limit usage value. 

- 
**[toString()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_OrgLimit.htm#apex_System_OrgLimit_toString)**

Returns the string representation of the org limit.

  ### getLimit()

  
  
  
Returns the maximum allowed limit value.

    
#### Signature

      
      `public Integer getLimit()`

      
    

    
#### Return Value

      
       Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

    

    
#### Example

      
      
```
List<System.OrgLimit> limits = OrgLimits.getAll();
for (System.OrgLimit aLimit: limits) {
    System.debug('Limit: ' + aLimit.getName());
    System.debug('Max Limit is: ' + aLimit.getLimit());
}
```

    

  

  ### getName()

  
  
  
Returns the limit’s name.

    
#### Signature

      
      `public String getName()`

      
    

    
#### Return Value

      
      Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

    

    
#### Example

      
      
```
List<System.OrgLimit> limits = OrgLimits.getAll();
for (System.OrgLimit aLimit: limits) {
    System.debug('Limit: ' + aLimit.getName());
    System.debug('Max Limit is: ' + aLimit.getLimit());
}
```

    

  

  ### 
getValue()
  

  
  
  
Returns the limit usage value. 

    
#### Signature

      
      `public Integer getValue()`

      
    

    
#### Return Value

      
      Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

    

    
#### Example

      
      
```
List<System.OrgLimit> limits = OrgLimits.getAll();
for (System.OrgLimit aLimit: limits) {
    System.debug('Limit: ' + aLimit.getName());
    System.debug('Usage Value is: ' + aLimit.getValue());
}
```

    

  

### toString()

Returns the string representation of the org limit.

#### Signature

`public String toString()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

      String denoting the name, current consumption, and maximum value of the org limit. For
        example:OrgLimit[DailyBulkApiBatches: consumed 25 of 15000]