# PluginDescribeResult.InputParameter Class

# PluginDescribeResult.InputParameter Class

Describes the input parameter for `Process.PluginResult`.

## Namespace

      
      [Process](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_process.htm)

      

#### Tip

We recommend using the `@InvocableMethod` annotation instead of the `Process.Plugin` interface.
          - The interface doesn’t support Blob, Collection, and sObject, data types, and it
            doesn’t support bulk operations. After you implement the interface on a class, the class
            can be referenced only from flows.

          -  The annotation supports all data types and bulk operations. After you implement the
            annotation on a class, the class can be referenced from flows, processes, and the Custom
            Invocable Actions REST API endpoint.

          - Legacy Apex actions aren’t supported in auto-layout in Flow Builder. Legacy Apex
            actions are only available to be added in free-form in Flow Builder. Existing actions
            can be edited in both auto-layout and free-form mode.

        

    

- 
**[PluginDescribeResult.InputParameter Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Process_PluginDescribeResult_InputParameter.htm#apex_Process_PluginDescribeResult_InputParameter_constructors)**

- 
**[PluginDescribeResult.InputParameter Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Process_PluginDescribeResult_InputParameter.htm#apex_Process_PluginDescribeResult_InputParameter_properties)**

## PluginDescribeResult.InputParameter Constructors

The following are constructors for `PluginDescribeResult.InputParameter`.

- 
**[PluginDescribeResult.InputParameter(name, description, parameterType, required)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Process_PluginDescribeResult_InputParameter.htm#apex_Process_PluginDescribeResult_InputParameter_ctor)**

Creates a new instance of the `Process.PluginDescribeResult.InputParameter` class using the specified name,   description, parameter type, and required option.

- 
**[PluginDescribeResult.InputParameter(name, parameterType, required)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Process_PluginDescribeResult_InputParameter.htm#apex_Process_PluginDescribeResult_InputParameter_ctor_2)**

Creates a new instance of the `Process.PluginDescribeResult.InputParameter` class using the specified name, parameter   type, and required option.

 ### PluginDescribeResult.InputParameter(name, description, parameterType,
  required)

 
 
 
Creates a new instance of the `Process.PluginDescribeResult.InputParameter` class using the specified name,
  description, parameter type, and required option.

  
#### Signature

   
   `public PluginDescribeResult.InputParameter(String name, String
     description, Process.PluginDescribeResult.ParameterType parameterType, Boolean
     required)`

   
  

  
#### Parameters

   
   
    
     name

     Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

     Unique name of the plug-in.

    
    
     description

     Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

     Describes the purpose of the plug-in.

    
    
     parameterType

     Type: Process.PluginDescribeResult.ParameterType

     The data type of the input parameter.

    
    
     required

     Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

     Set to `true` for required and `false` otherwise.

    
   

  

 

 ### PluginDescribeResult.InputParameter(name, parameterType, required)

 
 
 
Creates a new instance of the `Process.PluginDescribeResult.InputParameter` class using the specified name, parameter
  type, and required option.

  
#### Signature

   
   `public PluginDescribeResult.InputParameter(String name,
     Process.PluginDescribeResult.ParameterType parameterType, Boolean required)`

   
  

  
#### Parameters

   
   
    
     name

     Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

     Unique name of the plug-in.

    
    
     parameterType

     Type: Process.PluginDescribeResult.ParameterType

     The data type of the input parameter.

    
    
     required

     Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

     Set to `true` for required and `false` otherwise.

    
   

  

 

## PluginDescribeResult.InputParameter Properties

The following are properties for `PluginDescribeResult.InputParameter`.

- 
**[Description](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Process_PluginDescribeResult_InputParameter.htm#apex_Process_PluginDescribeResult_InputParameter_Description)**

This optional field describes the purpose of the plug-in.

- 
**[Name](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Process_PluginDescribeResult_InputParameter.htm#apex_Process_PluginDescribeResult_InputParameter_Name)**

Unique name of the plug-in.

- 
**[ParameterType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Process_PluginDescribeResult_InputParameter.htm#apex_Process_PluginDescribeResult_InputParameter_ParameterType)**

The data type of the input parameter.

- 
**[Required](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Process_PluginDescribeResult_InputParameter.htm#apex_Process_PluginDescribeResult_InputParameter_Required)**

Set to `true` for required and `false` otherwise.

### Description

This optional field describes the purpose of the plug-in.

#### Signature

`public String Description {get; set;}`

#### Property Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Usage

Size limit: 255 characters.

### Name

Unique name of the plug-in.

#### Signature

`public String Name {get; set;}`

#### Property Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Usage

Size limit: 40 characters.

### ParameterType

The data type of the input
parameter.

#### Signature

`public Process.PluginDescribeResult.ParameterType
ParameterType {get; set;}`

 
#### Property Value

Type: [Process.PluginDescribeResult.ParameterType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_Process_PluginDescribeResult_ParameterType.htm)

### Required

Set to `true` for required and `false` otherwise.

#### Signature

`public Boolean Required {get; set;}`

#### Property Value

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)