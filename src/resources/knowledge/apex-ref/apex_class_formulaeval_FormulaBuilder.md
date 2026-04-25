# FormulaBuilder Class

FormulaBuilder Class Contains methods to build and validate user-defined formulas. Namespace [FormulaEval](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_formulaeval.htm "The FormulaEval namespace provides classes and methods to evaluate dynamic formulas for SObjects and Apex objects. Use the methods to avoid unnecessary DML statements to recalculate formula field values or evaluate dynamic formula expressions.") Usage The context type that corresponds to the Apex class used in the builder withType() method must be a global, user-defined Apex class. Any fields or properties that the formula references must also be global.
              * **[FormulaBuilder Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_methods)**  

FormulaBuilder Methods The following are methods for FormulaBuilder.
              * **[build()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_build)**  
Validates and returns the formula instance created using the FormulaBuilder methods.
              * **[parseAsTemplate(templateMode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_parseAsTemplate)**  
Optional. Indicates whether a formula expression created with the build() method is evaluated in template mode. In template mode, values are interpolated into a string by using merge field syntax rather than by concatenating strings with the & operator. Merge fields use the syntax {!Object_Name.Field_Name}, where names are preceded by an exclamation mark and enclosed in curly braces.
              * **[treatNumericNullAsZero(isNumericNullZero)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_treatNumericNullAsZero)**  
Optional. Indicates whether a null for a numeric data type is treated as zero while evaluating the formula with the build() method.
              * **[withFormula(formulaText)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withFormula)**  
Required. Sets the formula expression that the build() method uses to create the formula instance.
              * **[withGlobalVariables(formulaGlobals)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withGlobalVariables)**  
Optional. Sets the list of global variables that can be referenced in the formula expression created with the build() method.
              * **[withReturnType(returnType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withReturnType)**  
Required. Sets the formula output data type for the formula instance created with the build() method.
              * **[withType(contextType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withType_2)**  
Sets the Apex type that corresponds to the Apex class used with the build() method.
              * **[withType(contextType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withType)**  
Sets the Apex type that corresponds to the Apex class used with the build() method to SObject type.
build() Validates and returns the formula instance created using the FormulaBuilder methods. Signature public FormulaEval.FormulaInstance build() Return Value Type: [FormulaEval.FormulaInstance](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaInstance.htm#apex_class_formulaeval_FormulaInstance "Contains a method to evaluate the formula instance.") Returns an instance of the FormulaInstance object. If the formula validation such as field references, functions, or syntax, fails, the method throws a FormulaValidationException exception. parseAsTemplate(templateMode) Optional. Indicates whether a formula expression created with the build() method is evaluated in template mode. In template mode, values are interpolated into a string by using merge field syntax rather than by concatenating strings with the & operator. Merge fields use the syntax {!Object_Name.Field_Name}, where names are preceded by an exclamation mark and enclosed in curly braces. Signature public formulaeval.FormulaBuilder parseAsTemplate(Boolean templateMode) Parameters

templateMode
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    If true, the formula expression is evaluated in template mode. The default value is false.
Return Value Type: FormulaEval.FormulaBuilder Usage In template mode, the FormulaEval.FormulaReturnType value that’s set with withReturnType() must be STRING. Template mode supports the same global variables, formula expressions, and context types as non-template mode, as long as they are correctly set using the FormulaBuilder methods. Example In this example, true is passed to parseAsTemplate(). The formula expression is evaluated in template mode, so the values of the name and website fields on the Account record are interpolated into the string using merge field syntax. The output is equal to the expression 'name & " (" & website & ")"'. FormulaEval.FormulaInstance ff = Formula.builder() .withType(Schema.Account.class) .withReturnType(FormulaEval.FormulaReturnType.STRING) .withFormula('{!name} ({!website})') .parseAsTemplate(true) .build();
[/code]

treatNumericNullAsZero(isNumericNullZero) Optional. Indicates whether a null for a numeric data type is treated as zero while evaluating the formula with the build() method. Signature public FormulaEval.FormulaBuilder treatNumericNullAsZero(Boolean isNumericNullZero) Parameters

isNumericNullZero
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    If true, null for numeric is treated as zero. The default value is false.
Return Value Type: FormulaEval.FormulaBuilder withFormula(formulaText) Required. Sets the formula expression that the build() method uses to create the formula instance. Signature public FormulaEval.FormulaBuilder withFormula(String formulaText) Parameters

formulaText
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: FormulaEval.FormulaBuilder withGlobalVariables(formulaGlobals) Optional. Sets the list of global variables that can be referenced in the formula expression created with the build() method. Signature public FormulaEval.FormulaBuilder withGlobalVariables(List<formulaeval.FormulaGlobal> formulaGlobals) Parameters

formulaGlobals
    Type: List<FormulaEval.[FormulaGlobal](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_formulaeval_FormulaGlobal.htm "Specifies a global variable that references data in your organization in the withGlobalVariables\(formulaGlobals\) method.")>
    Uses values from the FormulaGlobal enum.
Return Value Type: FormulaBuilder Class Contains methods to build and validate user-defined formulas. Namespace [FormulaEval](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_formulaeval.htm "The FormulaEval namespace provides classes and methods to evaluate dynamic formulas for SObjects and Apex objects. Use the methods to avoid unnecessary DML statements to recalculate formula field values or evaluate dynamic formula expressions.") Usage The context type that corresponds to the Apex class used in the builder withType() method must be a global, user-defined Apex class. Any fields or properties that the formula references must also be global.
              * **[FormulaBuilder Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_methods)**  

FormulaBuilder Methods The following are methods for FormulaBuilder.
              * **[build()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_build)**  
Validates and returns the formula instance created using the FormulaBuilder methods.
              * **[parseAsTemplate(templateMode)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_parseAsTemplate)**  
Optional. Indicates whether a formula expression created with the build() method is evaluated in template mode. In template mode, values are interpolated into a string by using merge field syntax rather than by concatenating strings with the & operator. Merge fields use the syntax {!Object_Name.Field_Name}, where names are preceded by an exclamation mark and enclosed in curly braces.
              * **[treatNumericNullAsZero(isNumericNullZero)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_treatNumericNullAsZero)**  
Optional. Indicates whether a null for a numeric data type is treated as zero while evaluating the formula with the build() method.
              * **[withFormula(formulaText)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withFormula)**  
Required. Sets the formula expression that the build() method uses to create the formula instance.
              * **[withGlobalVariables(formulaGlobals)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withGlobalVariables)**  
Optional. Sets the list of global variables that can be referenced in the formula expression created with the build() method.
              * **[withReturnType(returnType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withReturnType)**  
Required. Sets the formula output data type for the formula instance created with the build() method.
              * **[withType(contextType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withType_2)**  
Sets the Apex type that corresponds to the Apex class used with the build() method.
              * **[withType(contextType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaBuilder.htm#apex_formulaeval_FormulaBuilder_withType)**  
Sets the Apex type that corresponds to the Apex class used with the build() method to SObject type.
build() Validates and returns the formula instance created using the FormulaBuilder methods. Signature public FormulaEval.FormulaInstance build() Return Value Type: [FormulaEval.FormulaInstance](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaInstance.htm#apex_class_formulaeval_FormulaInstance "Contains a method to evaluate the formula instance.") Returns an instance of the FormulaInstance object. If the formula validation such as field references, functions, or syntax, fails, the method throws a FormulaValidationException exception. parseAsTemplate(templateMode) Optional. Indicates whether a formula expression created with the build() method is evaluated in template mode. In template mode, values are interpolated into a string by using merge field syntax rather than by concatenating strings with the & operator. Merge fields use the syntax {!Object_Name.Field_Name}, where names are preceded by an exclamation mark and enclosed in curly braces. Signature public formulaeval.FormulaBuilder parseAsTemplate(Boolean templateMode) Parameters

templateMode
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    If true, the formula expression is evaluated in template mode. The default value is false.
Return Value Type: FormulaEval.FormulaBuilder Usage In template mode, the FormulaEval.FormulaReturnType value that’s set with withReturnType() must be STRING. Template mode supports the same global variables, formula expressions, and context types as non-template mode, as long as they are correctly set using the FormulaBuilder methods. Example In this example, true is passed to parseAsTemplate(). The formula expression is evaluated in template mode, so the values of the name and website fields on the Account record are interpolated into the string using merge field syntax. The output is equal to the expression 'name & " (" & website & ")"'. FormulaEval.FormulaInstance ff = Formula.builder() .withType(Schema.Account.class) .withReturnType(FormulaEval.FormulaReturnType.STRING) .withFormula('{!name} ({!website})') .parseAsTemplate(true) .build();
[/code]

treatNumericNullAsZero(isNumericNullZero) Optional. Indicates whether a null for a numeric data type is treated as zero while evaluating the formula with the build() method. Signature public FormulaEval.FormulaBuilder treatNumericNullAsZero(Boolean isNumericNullZero) Parameters

isNumericNullZero
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    If true, null for numeric is treated as zero. The default value is false.
Return Value Type: FormulaEval.FormulaBuilder withFormula(formulaText) Required. Sets the formula expression that the build() method uses to create the formula instance. Signature public FormulaEval.FormulaBuilder withFormula(String formulaText) Parameters

formulaText
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: FormulaEval.FormulaBuilder withGlobalVariables(formulaGlobals) Optional. Sets the list of global variables that can be referenced in the formula expression created with the build() method. Signature public FormulaEval.FormulaBuilder withGlobalVariables(List<formulaeval.FormulaGlobal> formulaGlobals) Parameters

formulaGlobals
    Type: List<FormulaEval.[FormulaGlobal](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_formulaeval_FormulaGlobal.htm "Specifies a global variable that references data in your organization in the withGlobalVariables\(formulaGlobals\) method.")>
    Uses values from the FormulaGlobal enum.
Return Value Type: FormulaEval.FormulaBuilder withReturnType(returnType) Required. Sets the formula output data type for the formula instance created with the build() method. Signature public FormulaEval.FormulaBuilder withReturnType(formulaeval.FormulaReturnType returnType) Parameters

returnType
    Type: [FormulaEval.FormulaReturnType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_formulaeval_FormulaReturnType.htm "Specifies the return type for the withReturnType\(returnType\) method.")
    Uses values from the FormulaReturnType enum.
Return Value Type: FormulaEval.FormulaBuilder withType(contextType) Sets the Apex type that corresponds to the Apex class used with the build() method. Signature public formulaeval.FormulaBuilder withType(System.Type contextType) Parameters

contextType
    Type: [System.Type](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_type.htm#topic-title)
    An instance of the Apex class type.
Return Value Type: FormulaEval.FormulaBuilder withType(contextType) Sets the Apex type that corresponds to the Apex class used with the build() method to SObject type. Signature public formulaeval.FormulaBuilder withType(Schema.SObjectType contextSObjectType) Parameters

contextSObjectType
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.")
    An instance of the SObject type.
Return Value Type: FormulaEval.FormulaBuilder Example This example uses an SObject type as an input in the withType() method to build and evaluate a formula.
[code]FormulaEval.FormulaInstance ff = Formula.builder()
        .withReturnType(FormulaEval.FormulaReturnType.Boolean)
        .withType(Account.SObjectType)
        .withFormula('ISBLANK(Site)')
        .build();
    
    Boolean siteIsBlank = (Boolean)ff.evaluate(new Account(Site='Test'));
    Assert.isFalse(siteIsBlank);
    
    
[/code]

FormulaInstance Class Contains a method to evaluate the formula instance. Namespace [FormulaEval](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_formulaeval.htm "The FormulaEval namespace provides classes and methods to evaluate dynamic formulas for SObjects and Apex objects. Use the methods to avoid unnecessary DML statements to recalculate formula field values or evaluate dynamic formula expressions.") Example global class MotorYacht { global Integer lengthInYards; global Integer numOfGuestCabins; global String name; global Account owner; }
[/code]

MotorYacht aBoat = new MotorYacht(); aBoat.lengthInYards = 52; aBoat.numOfGuestCabins = 4; aBoat.name = 'RV Foo'; FormulaEval.FormulaInstance isItSuper = Formula.builder() .withReturnType(FormulaEval.FormulaReturnType.STRING) .withType(MotorYacht.class) .withFormula('IF(lengthInYards < 100, "Not Super", "Super")') .build(); isItSuper.evaluate(aBoat); //=> "Not Super" aBoat.owner = new Account(Name='Acme Watercraft', Site='New York'); FormulaEval.FormulaInstance ownerDetails = Formula.builder() .withReturnType(FormulaEval.FormulaReturnType.STRING) .withType(MotorYacht.class) .withFormula('owner.Name & " (" & owner.Site & ")"') .build(); ownerDetails.evaluate(aBoat); //=> "Acme Watercraft (New York)" 
[/code]

Usage The context type in the withType method must be a global, user-defined Apex class. Any fields or properties that the formula references must also be global.
              * **[FormulaInstance Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaInstance.htm#apex_formulaeval_FormulaInstance_methods)**  

FormulaInstance Methods The following are methods for FormulaInstance.
              * **[evaluate(contextObject)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaInstance.htm#apex_formulaeval_FormulaInstance_evaluate)**  
Calculates the formula expression and returns the formula output.
              * **[getReferencedFields()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_formulaeval_FormulaInstance.htm#apex_formulaeval_FormulaInstance_getReferencedFields)**  
Returns a set of strings that denote the field names referenced in a formula.
evaluate(contextObject) Calculates the formula expression and returns the formula output. Signature public Object evaluate(Object contextObject) Parameters

contextObject
    Type: Object
    An instance of the Apex class as generated with the FormulaBuilder.builder() method.
Return Value Type: Object Apex type that corresponds to the Apex class as configured by the withType() method in the FormulaBuilder class. getReferencedFields() Returns a set of strings that denote the field names referenced in a formula. Signature public Set<String> getReferencedFields() Return Value Type: [Set](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_set.htm#topic-title)<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#topic-title)> Usage FormulaEval.FormulaBuilder withReturnType(returnType) Required. Sets the formula output data type for the formula instance created with the build() method. Signature public FormulaEval.FormulaBuilder withReturnType(formulaeval.FormulaReturnType returnType) Parameters

returnType
    Type: [FormulaEval.FormulaReturnType](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_formulaeval_FormulaReturnType.htm "Specifies the return type for the withReturnType\(returnType\) method.")
    Uses values from the FormulaReturnType enum.
Return Value Type: FormulaEval.FormulaBuilder withType(contextType) Sets the Apex type that corresponds to the Apex class used with the build() method. Signature public formulaeval.FormulaBuilder withType(System.Type contextType) Parameters

contextType
    Type: [System.Type](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_type.htm#topic-title)
    An instance of the Apex class type.
Return Value Type: FormulaEval.FormulaBuilder withType(contextType) Sets the Apex type that corresponds to the Apex class used with the build() method to SObject type. Signature public formulaeval.FormulaBuilder withType(Schema.SObjectType contextSObjectType) Parameters

contextSObjectType
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#apex_class_Schema_SObjectType "A Schema.sObjectType object is returned from the field describe result using the getReferenceTo method, or from the sObject describe result using the getSObjectType method.")
    An instance of the SObject type.
Return Value Type: FormulaEval.FormulaBuilder Example This example uses an SObject type as an input in the withType() method to build and evaluate a formula.
[code]FormulaEval.FormulaInstance ff = Formula.builder()
        .withReturnType(FormulaEval.FormulaReturnType.Boolean)
        .withType(Account.SObjectType)
        .withFormula('ISBLANK(Site)')
        .build();
    
    Boolean siteIsBlank = (Boolean)ff.evaluate(new Account(Site='Test'));
    Assert.isFalse(siteIsBlank);
    
    
[/code]
