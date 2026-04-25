# ReportCsf Class

# ReportCsf Class

Contains methods and constructors for working with information about a
      custom summary formula (CSF).

## Namespace

[Reports](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Reports.htm)

- 
**[ReportCsf Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_constructors)**

- 
**[ReportCsf Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_methods)**

## ReportCsf Constructors

The following are constructors for `ReportCsf`.

- 
**[ReportCsf(label, description, formulaType, decimalPlaces, downGroup, downGroupType, acrossGroup, acrossGroupType, formula)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_ctor)**

Creates an instance of the `Reports.ReportCsf` class using the specified parameters.

- 
**[ReportCsf()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_ctor_2)**

Creates an instance of the `Reports.ReportCsf` class. You can then set values by using the class’s `set` methods.

### ReportCsf(label, description, formulaType, decimalPlaces, downGroup, downGroupType, acrossGroup, acrossGroupType, formula)

Creates an instance of the `Reports.ReportCsf` class using the specified parameters.

#### Signature

`public ReportCsf(String label, String description, Reports.FormulaType formulaType, Integer decimalPlaces, String downGroup, Reports.CsfGroupType downGroupType, String acrossGroup, Reports.CsfGroupType acrossGroupType, String formula)`

#### Parameters

label
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

The user-facing name of the custom summary formula.
description
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

The user-facing description of the custom summary formula.
formulaType
Type: [Reports.FormulaType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_FormulaType.htm#apex_enum_reports_FormulaType)

The format of the numbers in the custom summary formula.
decimalPlaces
Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

The number of decimal places to include in numbers.
downGroup
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

The name of a row grouping when the `downGroupType` is
                            `CUSTOM`; `null` otherwise.
downGroupType
Type: [Reports.CsfGroupType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_CsfGroupType.htm#apex_enum_reports_CsfGroupType)

Where to display the aggregate of the custom summary formula.
acrossGroup
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

          The name of a column grouping when the `accrossGroupType` is `CUSTOM`; `null`
                        otherwise.
acrossGroupType
Type: [Reports.CsfGroupType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_CsfGroupType.htm#apex_enum_reports_CsfGroupType)

Where to display the aggregate of the custom summary formula.
formula
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

The operations performed on values in the custom summary formula.

### ReportCsf()

Creates an instance of the `Reports.ReportCsf` class. You can then set values by using the class’s `set` methods.

#### Signature

`public ReportCsf()`

## ReportCsf Methods

The following are methods for `ReportCsf`.

- 
**[getAcrossGroup()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_getAcrossGroup)**

Returns the name of a column grouping when the `acrossGroupType` is `CUSTOM`. Otherwise, returns `null`.

- 
**[getAcrossGroupType()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_getAcrossGroupType)**

Returns where to display the aggregate.

- 
**[getDecimalPlaces()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_getDecimalPlaces)**

Returns the number of decimal places that numbers in the custom       summary formula have.

- 
**[getDescription()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_getDescription)**

Returns the user-facing description of a custom summary     formula.

- 
**[getDownGroup()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_getDownGroup)**

Returns the name of a row grouping when the `downGroupType` is `CUSTOM`. Otherwise, returns `null`.

- 
**[getDownGroupType()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_getDownGroupType)**

Returns where to display the aggregate of the custom summary       formula.

- 
**[getFormula()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_getFormula)**

Returns the operations performed on values in the custom summary       formula.

- 
**[getFormulaType()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_getFormulaType)**

Returns the formula type.

- 
**[getLabel()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_getLabel)**

Returns the user-facing name of the custom summary     formula.

- 
**[setAcrossGroup(acrossGroup)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setAcrossGroup)**

Specifies the column for the across grouping.

- 
**[setAcrossGroupType(value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setAcrossGroupType)**

Sets where to display the aggregate.

- 
**[setAcrossGroupType(acrossGroupType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setAcrossGroupType_2)**

Sets where to display the aggregate.

- 
**[setDecimalPlaces(decimalPlaces)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setDecimalPlaces)**

Sets the number of decimal places in numbers.

- 
**[setDescription(description)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setDescription)**

Sets the user-facing description of the custom summary     formula.

- 
**[setDownGroup(downGroup)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setDownGroup)**

Sets the name of a row grouping when the `downGroupType` is `CUSTOM`.

- 
**[setDownGroupType(value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setDownGroupType)**

Sets where to display the aggregate.

- 
**[setDownGroupType(downGroupType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setDownGroupType_2)**

Sets where to display the aggregate.

- 
**[setFormula(formula)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setFormula)**

Sets the operations to perform on values in the custom summary       formula.

- 
**[setFormulaType(value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setFormulaType)**

Sets the format of the numbers in the custom summary     formula.

- 
**[setFormulaType(formulaType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setFormulaType_2)**

Sets the format of numbers used in the custom summary     formula.

- 
**[setLabel(label)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_setLabel)**

Sets the user-facing name of the custom summary     formula.

- 
**[toString()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_reports_ReportCsf.htm#apex_reports_ReportCsf_toString)**

Returns a string.

### getAcrossGroup()

Returns the name of a column grouping when the `acrossGroupType` is `CUSTOM`. Otherwise, returns `null`.

#### Signature

`public String getAcrossGroup()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### getAcrossGroupType()

Returns where to display the aggregate.

#### Signature

`public Reports.CsfGroupType getAcrossGroupType()`

#### Return Value

Type: [Reports.CsfGroupType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_CsfGroupType.htm#apex_enum_reports_CsfGroupType)

### getDecimalPlaces()

Returns the number of decimal places that numbers in the custom
      summary formula have.

#### Signature

`public Integer getDecimalPlaces()`

#### Return Value

Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

### getDescription()

Returns the user-facing description of a custom summary
    formula.

#### Signature

`public String getDescription()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### getDownGroup()

Returns the name of a row grouping when the `downGroupType` is `CUSTOM`. Otherwise, returns `null`.

#### Signature

`public String getDownGroup()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### getDownGroupType()

Returns where to display the aggregate of the custom summary
      formula.

#### Signature

`public Reports.CsfGroupType getDownGroupType()`

#### Return Value

Type: [Reports.CsfGroupType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_CsfGroupType.htm#apex_enum_reports_CsfGroupType)

### getFormula()

Returns the operations performed on values in the custom summary
      formula.

#### Signature

`public String getFormula()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### getFormulaType()

Returns the formula type.

#### Signature

`public Reports.FormulaType getFormulaType()`

#### Return Value

Type: [Reports.FormulaType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_FormulaType.htm#apex_enum_reports_FormulaType)

### getLabel()

Returns the user-facing name of the custom summary
    formula.

#### Signature

`public String getLabel()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### setAcrossGroup(acrossGroup)

Specifies the column for the across grouping.

#### Signature

`public void setAcrossGroup(String acrossGroup)`

#### Parameters

acrossGroup
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: void

### setAcrossGroupType(value)

Sets where to display the aggregate.

#### Signature

`public void setAcrossGroupType(String value)`

#### Parameters

value
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

For possible values, see [Reports.CsfGroupType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_CsfGroupType.htm#apex_enum_reports_CsfGroupType).

#### Return Value

Type: void

### setAcrossGroupType(acrossGroupType)

Sets where to display the aggregate.

#### Signature

`public void setAcrossGroupType(Reports.CsfGroupType acrossGroupType)`

#### Parameters

acrossGroupType
Type: [Reports.CsfGroupType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_CsfGroupType.htm#apex_enum_reports_CsfGroupType)

#### Return Value

Type: void

### setDecimalPlaces(decimalPlaces)

Sets the number of decimal places in numbers.

#### Signature

`public void setDecimalPlaces(Integer decimalPlaces)`

#### Parameters

decimalPlaces
Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer)

#### Return Value

Type: void

### setDescription(description)

Sets the user-facing description of the custom summary
    formula.

#### Signature

`public void setDescription(String description)`

#### Parameters

description
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: void

### setDownGroup(downGroup)

Sets the name of a row grouping when the `downGroupType` is `CUSTOM`.

#### Signature

`public void setDownGroup(String downGroup)`

#### Parameters

downGroup
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: void

### setDownGroupType(value)

Sets where to display the aggregate.

#### Signature

`public void setDownGroupType(String value)`

#### Parameters

value
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

For valid values, see [Reports.CsfGroupType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_CsfGroupType.htm#apex_enum_reports_CsfGroupType).

#### Return Value

Type: void

### setDownGroupType(downGroupType)

Sets where to display the aggregate.

#### Signature

`public void setDownGroupType(Reports.CsfGroupType downGroupType)`

#### Parameters

downGroupType
Type: [Reports.CsfGroupType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_CsfGroupType.htm#apex_enum_reports_CsfGroupType)

#### Return Value

Type: void

### setFormula(formula)

Sets the operations to perform on values in the custom summary
      formula.

    
#### Signature

      
      `public void setFormula(String formula)`

      
    

    
#### Parameters

      
      
        
          formula

          Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

        
      

    

    
#### Return Value

      
      Type: void

    

  

### setFormulaType(value)

Sets the format of the numbers in the custom summary
    formula.

#### Signature

`public void setFormulaType(String value)`

#### Parameters

value
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

For valid values, see [Reports.FormulaType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_FormulaType.htm#apex_enum_reports_FormulaType).

#### Return Value

Type: void

### setFormulaType(formulaType)

Sets the format of numbers used in the custom summary
    formula.

#### Signature

`public void setFormulaType(Reports.FormulaType formulaType)`

#### Parameters

formulaType
Type: [Reports.FormulaType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_reports_FormulaType.htm#apex_enum_reports_FormulaType)

#### Return Value

Type: void

### setLabel(label)

Sets the user-facing name of the custom summary
    formula.

#### Signature

`public void setLabel(String label)`

#### Parameters

label
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

#### Return Value

Type: void

### toString()

Returns a string.

#### Signature

`public String toString()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)