# IntegrationInfo Class

IntegrationInfo Class Provides the values that B2B Commerce Checkout uses to map requests to responses, necessary metadata, and context. Namespace [sfdc_checkout](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_sfdc_checkout.htm "The Sfdc_Checkout namespace provides an interface and classes for B2B Commerce apps in Salesforce.") Usage This class provides information about a B2B Commerce integration. An instance of this class is passed as a parameter into the integration interface.
                  * **[IntegrationInfo Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_checkout_IntegrationInfo.htm#apex_sfdc_checkout_IntegrationInfo_properties)**  

IntegrationInfo Properties The following are properties for IntegrationInfo.
                  * **[integrationId](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_checkout_IntegrationInfo.htm#apex_sfdc_checkout_IntegrationInfo_integrationId)**  
The unique ID of a B2B Commerce integration.
                  * **[jobId](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_checkout_IntegrationInfo.htm#apex_sfdc_checkout_IntegrationInfo_jobId)**  
The ID of the job, specific to the Salesforce Background Operation framework.
                  * **[siteLanguage](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_checkout_IntegrationInfo.htm#apex_sfdc_checkout_IntegrationInfo_siteLanguage)**  
Site language to be used by third party services. 
integrationId The unique ID of a B2B Commerce integration. Signature public String integrationId {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") jobId The ID of the job, specific to the Salesforce Background Operation framework. Signature public String jobId {get; set;} Property Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") siteLanguage Site language to be used by third party services. Signature  public String siteLanguage {get; set;} Property Value  Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
