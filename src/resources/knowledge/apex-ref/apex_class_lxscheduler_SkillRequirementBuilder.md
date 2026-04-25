# SkillRequirementBuilder Class

SkillRequirementBuilder Class Contains methods to build an instance of the lxscheduler.SkillRequirement class. A Builder object is obtained by invoking one of the SkillRequirementBuilder methods defined by the SkillRequirement class. Namespace [LxScheduler](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_lxscheduler.htm "The LxScheduler namespace provides an interface and classes for integrating Salesforce Scheduler with external calendars.")
              * **[SkillRequirementBuilder Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_SkillRequirementBuilder.htm#apex_lxscheduler_SkillRequirementBuilder_methods)**  

SkillRequirementBuilder Methods The following are methods for SkillRequirementBuilder.
              * **[build()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_SkillRequirementBuilder.htm#apex_lxscheduler_SkillRequirementBuilder_build)**  
Returns an instance of the lxscheduler.SkillRequirement object.
              * **[setSkillId(skillId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_SkillRequirementBuilder.htm#apex_lxscheduler_SkillRequirementBuilder_setSkillId)**  
Sets the skill that is required to complete a particular task for a work type. This is a required field.
              * **[setSkillLevel(skillLevel)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_SkillRequirementBuilder.htm#apex_lxscheduler_SkillRequirementBuilder_setSkillLevel)**  
Sets the level of the skill that is required to complete a particular task for a work type
build() Returns an instance of the lxscheduler.SkillRequirement object. Signature public lxscheduler.SkillRequirement build() Return Value Type: [lxscheduler.SkillRequirement](atlas.en-us.258.0.apexref.meta/apexref/apex_class_lxscheduler_SkillRequirement.htm#apex_class_lxscheduler_SkillRequirement "Contains information about the set of skills that are required to complete a particular task for a work type.") setSkillId(skillId) Sets the skill that is required to complete a particular task for a work type. This is a required field. Signature public lxscheduler.SkillRequirementBuilder setSkillId(String skillId) Parameters

skillId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: lxscheduler.SkillRequirementBuilder setSkillLevel(skillLevel) Sets the level of the skill that is required to complete a particular task for a work type Signature public lxscheduler.SkillRequirementBuilder setSkillLevel(Double skillLevel) Parameters

skillLevel
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
    The skill levels can range from zero to 99.99. Depending on your business needs, you might want the skill level to reflect years of experience, certification levels, or license classes.
Return Value Type: lxscheduler.SkillRequirementBuilder
