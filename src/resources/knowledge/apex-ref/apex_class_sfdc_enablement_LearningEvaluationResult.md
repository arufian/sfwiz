# LearningEvaluationResult Class

LearningEvaluationResult Class Represents a user’s progress and progress status of a custom exercise in an Enablement program. Namespace [sfdc_enablement](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_sfdc_enablement.htm "The sfdc_enablement namespace provides classes for creating custom learning items to implement custom exercise types in Enablement programs. Lightning web components are used to render the custom exercises on Program Builder.") Usage To calculate the user’s progress through an exercise as a percentage and return the progress status, use the sfdc_enablement.LearningEvaluationResult class inside the [sfdc_enablement.LearningItemEvaluationHandler](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_enablement_LearningItemEvaluationHandler.htm#apex_class_sfdc_enablement_LearningItemEvaluationHandler "Contains methods to customize the evaluation process of a learning item."). In your custom code, set the percentages to correspond to these [sfdc_enablement.LearningItemProgressStatus](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_sfdc_enablement_LearningItemProgressStatus.htm "Represents the status of a user’s progress for a learning item in an Enablement program.") enum values.
                  * NotStarted is equal to 0.00
                  * InProgress is from 0.01 through 99.99
                  * Completed is equal to 100.00
Example See example code in [sfdc_enablement.LearningItemEvaluationHandler](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_enablement_LearningItemEvaluationHandler.htm#apex_class_sfdc_enablement_LearningItemEvaluationHandler "Contains methods to customize the evaluation process of a learning item.").
                  * **[LearningEvaluationResult Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_enablement_LearningEvaluationResult.htm#apex_sfdc_enablement_LearningEvaluationResult_methods)**  

LearningEvaluationResult Methods The following are methods for LearningEvaluationResult.
                  * **[getLearningItemProgress()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_enablement_LearningEvaluationResult.htm#apex_sfdc_enablement_LearningEvaluationResult_getLearningItemProgress)**  
Returns the progress percentage of the learning item.
                  * **[getLearningItemProgressStatus()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_enablement_LearningEvaluationResult.htm#apex_sfdc_enablement_LearningEvaluationResult_getLearningItemProgressStatus)**  
Retrieves the progress status of the learning item.
                  * **[setLearningItemProgress(learningItemProgress)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_enablement_LearningEvaluationResult.htm#apex_sfdc_enablement_LearningEvaluationResult_setLearningItemProgress)**  
Sets the progress percentage of the learning item.
                  * **[setLearningItemProgressStatus(learningItemProgressStatus)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_enablement_LearningEvaluationResult.htm#apex_sfdc_enablement_LearningEvaluationResult_setLearningItemProgressStatus)**  
Sets the progress status of the learning item.
getLearningItemProgress() Returns the progress percentage of the learning item. Signature public Double getLearningItemProgress() Return Value Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.") The progress percentage is formatted to two decimal places. getLearningItemProgressStatus() Retrieves the progress status of the learning item. Signature public sfdc_enablement.LearningItemProgressStatus getLearningItemProgressStatus() Return Value Type: [sfdc_enablement.LearningItemProgressStatus](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_sfdc_enablement_LearningItemProgressStatus.htm "Represents the status of a user’s progress for a learning item in an Enablement program.") setLearningItemProgress(learningItemProgress) Sets the progress percentage of the learning item. Signature public void setLearningItemProgress(Double learningItemProgress) Parameters

learningItemProgress
    Type: [Double](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_double.htm#apex_methods_system_double "Contains methods for the Double primitive data type.")
    The progress in percentage formatted to two decimal places.
Return Value Type: void setLearningItemProgressStatus(learningItemProgressStatus) Sets the progress status of the learning item. Signature public void setLearningItemProgressStatus(sfdc_enablement.LearningItemProgressStatus learningItemProgressStatus) Parameters

learningItemProgressStatus
    Type: [Sfdc_enablement.LearningItemProgressStatus](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_sfdc_enablement_LearningItemProgressStatus.htm "Represents the status of a user’s progress for a learning item in an Enablement program.")
Return Value Type: void
