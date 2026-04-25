# Boolean Class

# Boolean Class

Contains methods for the Boolean primitive data type.

## Namespace

[System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm)

## Boolean Methods

The following are methods for `Boolean`. All methods are static.

- 
**[valueOf(stringToBoolean)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_System_Boolean_valueOf)**

Converts the specified string to a Boolean value and returns `true` if the specified string value is `true`. Otherwise, returns `false`.

- 
**[valueOf(fieldValue)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_System_Boolean_valueOf_2)**

Converts the specified object to a Boolean value. Use this method to convert a history     tracking field value or an object that represents a Boolean value.

### valueOf(stringToBoolean)

Converts the specified string to a Boolean value and returns `true` if the specified string value
is `true`. Otherwise, returns `false`.

#### Signature

`public static Boolean valueOf(String stringToBoolean)`

#### Parameters

stringToBoolean

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: [Boolean](#apex_methods_system_boolean)

#### Usage

If the specified argument
is null, this method throws an exception.

#### Example

```
Boolean b = Boolean.valueOf('true');
System.assertEquals(true, b);
```

### valueOf(fieldValue)

Converts the specified object to a Boolean value. Use this method to convert a history
    tracking field value or an object that represents a Boolean value.

#### Signature

`public static Boolean valueOf(Object fieldValue)`

#### Parameters

fieldValue

Type: Object

#### Return Value

Type: [Boolean](#apex_methods_system_boolean)

#### Usage

      
      Use this method with the `OldValue` or `NewValue` fields of history sObjects, such as `AccountHistory`, when the field type corresponds to a
        Boolean type, like a checkbox field.

    

#### Example

```
List<AccountHistory> ahlist = 
     [SELECT Field,OldValue,NewValue FROM AccountHistory];
for(AccountHistory ah : ahlist) {
   System.debug('Field: ' + ah.Field);
   if (ah.field == 'IsPlatinum__c') {
      Boolean oldValue = Boolean.valueOf(ah.OldValue);
      Boolean newValue = Boolean.valueOf(ah.NewValue);
   }
}

```