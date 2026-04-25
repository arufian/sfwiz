# IntegrationStatus Class

IntegrationStatus Class Supports synchronous execution of Apex integrations for B2B Commerce. The implementation must return the status of the execution. Namespace [sfdc_checkout](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_sfdc_checkout.htm "The Sfdc_Checkout namespace provides an interface and classes for B2B Commerce apps in Salesforce.") Usage You must specify the sfdc_checkout namespace when creating an instance of this class.
                  * **[IntegrationStatus Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_checkout_IntegrationStatus.htm#apex_sfdc_checkout_IntegrationStatus_properties)**  

IntegrationStatus Properties The following are properties for IntegrationStatus.
                  * **[status](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_checkout_IntegrationStatus.htm#apex_sfdc_checkout_IntegrationStatus_status)**  
Indicates the status of the integration process and whether or not it completed successfully.
status Indicates the status of the integration process and whether or not it completed successfully. Signature public sfdc_checkout.IntegrationStatus.Status status {get; set;} Property Value Type: [sfdc_checkout.IntegrationStatus.Status](atlas.en-us.258.0.apexref.meta/apexref/apex_enum_sfdc_checkout_IntegrationStatus.Status.htm "The IntegrationStatus.Status enum describes the status of the current integration.")
