# DomainCreator Class

DomainCreator Class Use the DomainCreator class to return a hostname specific to the org. For example, get the org’s Visualforce hostname. Values are returned as a hostname, such as MyDomainName.lightning.force.com. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Examples This example code fetches the org’s My Domain login hostname and the Visualforce hostname for the uat package. //Get the My Domain login hostname String myDomainHostname = DomainCreator.getOrgMyDomainHostname(); //Get the Visualforce hostname String vfHostname = DomainCreator.getVisualforceHostname('uat');
[/code]

In this case, in a production org with a My Domain name of mycompany, myDomainHostname returns mycompany.my.salesforce.com. And in the same production org, vfHostname returns mycompany--uat.vf.force.com. This example code creates a link to a Salesforce Account record. It gets the Lightning hostname associated with this org. It then gets the Account record ID and uses concatenation to build the link URL.//Get the org’s Lightning hostname String myLightningHostname = DomainCreator.getLightningHostname(); //Get the ID of a record Account with the name ‘Acme’ Account acct = [SELECT Id FROM Account WHERE Name = 'Acme' LIMIT 1]; //Build the URL to view the account record String fullRecordURL = 'https://' + myLightningHostname + '/lightning/r/Account/' + acct.Id + '/view';
[/code]

            * **[DomainCreator Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_methods)**  

DomainCreator Methods The following are methods for DomainCreator.
            * **[getContentHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getContentHostname)**  
Returns the hostname for content stored in the org, such as files.
            * **[getExperienceCloudSitesBuilderHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getExperienceCloudSitesBuilderHostname)**  
Returns the hostname to access Experience Builder for the org’s Experience Cloud sites.
            * **[getExperienceCloudSitesHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getExperienceCloudSitesHostname)**  
Returns the system-managed hostname for the org’s Experience Cloud sites, such as ExperienceCloudSitesSubdomainName.force.com. If Digital Experiences aren’t enabled, this method throws an InvalidParameterValueException.
            * **[getExperienceCloudSitesLivePreviewHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getExperienceCloudSitesLivePreviewHostname)**  
Returns the hostname to access Experience Builder Live Preview for the org’s Experience Cloud sites.
            * **[getExperienceCloudSitesPreviewHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getExperienceCloudSitesPreviewHostname)**  
Returns the hostname to access Experience Builder Preview for the org’s Experience Cloud sites.
            * **[getLightningContainerComponentHostname(packageName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getLightningContainerComponentHostname)**  
Returns the hostname for the org’s Lightning Container Components.
            * **[getLightningHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getLightningHostname)**  
Returns the hostname for the org’s Lightning pages.
            * **[getOrgMyDomainHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getOrgMyDomainHostname)**  
Returns the hostname for the org’s My Domain login domain.
            * **[getSalesforceSitesHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getSalesforceSitesHostname)**  
Returns the hostname for the org’s Salesforce Sites. If Salesforce Sites aren’t enabled, this method throws an InvalidParameterValueException.
            * **[getSetupHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getSetupHostname)**  
Returns the hostname for the org’s setup domain, which hosts Setup pages in Salesforce. 
            * **[getVisualforceHostname(packageName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getVisualforceHostname)**  
Returns the hostname for the org’s Visualforce pages.
getContentHostname() Returns the hostname for content stored in the org, such as files. Signature public static String getContentHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getExperienceCloudSitesBuilderHostname() Returns the hostname to access Experience Builder for the org’s Experience Cloud sites. Signature public static String getExperienceCloudSitesBuilderHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getExperienceCloudSitesHostname() Returns the system-managed hostname for the org’s Experience Cloud sites, such as ExperienceCloudSitesSubdomainName.force.com. If Digital Experiences aren’t enabled, this method throws an InvalidParameterValueException. Signature public static String getExperienceCloudSitesHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getExperienceCloudSitesLivePreviewHostname() Returns the hostname to access Experience Builder Live Preview for the org’s Experience Cloud sites. Signature public static String getExperienceCloudSitesLivePreviewHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getExperienceCloudSitesPreviewHostname() Returns the hostname to access Experience Builder Preview for the org’s Experience Cloud sites. Signature public static String getExperienceCloudSitesPreviewHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLightningContainerComponentHostname(packageName) Returns the hostname for the org’s Lightning Container Components. Signature public static String getLightningContainerComponentHostname(String packageName) Parameters

packageName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The package name for this component.If packageName is null, this method uses the org’s namespace prefix as the package name. Otherwise, it uses the default namespace.
Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLightningHostname() Returns the hostname for the org’s Lightning pages. Signature public static String getLightningHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getOrgMyDomainHostname() Returns the hostname for the org’s My Domain login domain. Signature public static String getOrgMyDomainHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")DomainCreator Class Use the DomainCreator class to return a hostname specific to the org. For example, get the org’s Visualforce hostname. Values are returned as a hostname, such as MyDomainName.lightning.force.com. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Examples This example code fetches the org’s My Domain login hostname and the Visualforce hostname for the uat package. //Get the My Domain login hostname String myDomainHostname = DomainCreator.getOrgMyDomainHostname(); //Get the Visualforce hostname String vfHostname = DomainCreator.getVisualforceHostname('uat');
[/code]

In this case, in a production org with a My Domain name of mycompany, myDomainHostname returns mycompany.my.salesforce.com. And in the same production org, vfHostname returns mycompany--uat.vf.force.com. This example code creates a link to a Salesforce Account record. It gets the Lightning hostname associated with this org. It then gets the Account record ID and uses concatenation to build the link URL.//Get the org’s Lightning hostname String myLightningHostname = DomainCreator.getLightningHostname(); //Get the ID of a record Account with the name ‘Acme’ Account acct = [SELECT Id FROM Account WHERE Name = 'Acme' LIMIT 1]; //Build the URL to view the account record String fullRecordURL = 'https://' + myLightningHostname + '/lightning/r/Account/' + acct.Id + '/view';
[/code]

            * **[DomainCreator Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_methods)**  

DomainCreator Methods The following are methods for DomainCreator.
            * **[getContentHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getContentHostname)**  
Returns the hostname for content stored in the org, such as files.
            * **[getExperienceCloudSitesBuilderHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getExperienceCloudSitesBuilderHostname)**  
Returns the hostname to access Experience Builder for the org’s Experience Cloud sites.
            * **[getExperienceCloudSitesHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getExperienceCloudSitesHostname)**  
Returns the system-managed hostname for the org’s Experience Cloud sites, such as ExperienceCloudSitesSubdomainName.force.com. If Digital Experiences aren’t enabled, this method throws an InvalidParameterValueException.
            * **[getExperienceCloudSitesLivePreviewHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getExperienceCloudSitesLivePreviewHostname)**  
Returns the hostname to access Experience Builder Live Preview for the org’s Experience Cloud sites.
            * **[getExperienceCloudSitesPreviewHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getExperienceCloudSitesPreviewHostname)**  
Returns the hostname to access Experience Builder Preview for the org’s Experience Cloud sites.
            * **[getLightningContainerComponentHostname(packageName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getLightningContainerComponentHostname)**  
Returns the hostname for the org’s Lightning Container Components.
            * **[getLightningHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getLightningHostname)**  
Returns the hostname for the org’s Lightning pages.
            * **[getOrgMyDomainHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getOrgMyDomainHostname)**  
Returns the hostname for the org’s My Domain login domain.
            * **[getSalesforceSitesHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getSalesforceSitesHostname)**  
Returns the hostname for the org’s Salesforce Sites. If Salesforce Sites aren’t enabled, this method throws an InvalidParameterValueException.
            * **[getSetupHostname()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getSetupHostname)**  
Returns the hostname for the org’s setup domain, which hosts Setup pages in Salesforce. 
            * **[getVisualforceHostname(packageName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_System_DomainCreator_getVisualforceHostname)**  
Returns the hostname for the org’s Visualforce pages.
getContentHostname() Returns the hostname for content stored in the org, such as files. Signature public static String getContentHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getExperienceCloudSitesBuilderHostname() Returns the hostname to access Experience Builder for the org’s Experience Cloud sites. Signature public static String getExperienceCloudSitesBuilderHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getExperienceCloudSitesHostname() Returns the system-managed hostname for the org’s Experience Cloud sites, such as ExperienceCloudSitesSubdomainName.force.com. If Digital Experiences aren’t enabled, this method throws an InvalidParameterValueException. Signature public static String getExperienceCloudSitesHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getExperienceCloudSitesLivePreviewHostname() Returns the hostname to access Experience Builder Live Preview for the org’s Experience Cloud sites. Signature public static String getExperienceCloudSitesLivePreviewHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getExperienceCloudSitesPreviewHostname() Returns the hostname to access Experience Builder Preview for the org’s Experience Cloud sites. Signature public static String getExperienceCloudSitesPreviewHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLightningContainerComponentHostname(packageName) Returns the hostname for the org’s Lightning Container Components. Signature public static String getLightningContainerComponentHostname(String packageName) Parameters

packageName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The package name for this component.If packageName is null, this method uses the org’s namespace prefix as the package name. Otherwise, it uses the default namespace.
Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLightningHostname() Returns the hostname for the org’s Lightning pages. Signature public static String getLightningHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getOrgMyDomainHostname() Returns the hostname for the org’s My Domain login domain. Signature public static String getOrgMyDomainHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getSalesforceSitesHostname() Returns the hostname for the org’s Salesforce Sites. If Salesforce Sites aren’t enabled, this method throws an InvalidParameterValueException. Signature public static String getSalesforceSitesHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getSetupHostname() Returns the hostname for the org’s setup domain, which hosts Setup pages in Salesforce.  Signature public static String getSetupHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getVisualforceHostname(packageName) Returns the hostname for the org’s Visualforce pages. Signature public static String getVisualforceHostname(String packageName) Parameters

packageName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The package name for this component.If packageName is null, this method uses the org’s namespace prefix as the package name. Otherwise, it uses the default namespace.
Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") FeatureManagement Class Use the methods in the System.FeatureManagement class to check and modify the values of feature parameters, and to show or hide custom objects and custom permissions in your subscribers’ orgs. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage For information about feature parameters, see [Manage Features in Second Generation Managed Packages](https://developer.salesforce.com/docs/atlas.en-us.pkg2_dev.meta/pkg2_dev/sfdx_dev_dev2gp_fma_manage_features.htm) in the Second-Generation Managed Packaging Developer Guide, or [Manage Features in First-Generation Managed Packages](https://developer.salesforce.com/docs/atlas.en-us.pkg1_dev.meta/pkg1_dev/fma_manage_features.htm) in the First-Generation Managed Packaging Developer Guide.The set methods (setPackageBooleanValue, setPackageDateValue, setPackageIntegerValue) use DML operations on setup sObjects. To learn more about mixing operations in a test, see [Mixed DML Operations in Test Methods](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dml_non_mix_sobjects_test_methods.htm).
            * **[FeatureManagement Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_FeatureManagement.htm#apex_System_FeatureManagement_methods)**  

FeatureManagement Methods The following are methods for FeatureManagement.
            * **[changeProtection(apiName, typeApiName, protection)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_FeatureManagement.htm#apex_System_FeatureManagement_changeProtection)**  
Hides or reveals custom permissions, or reveals custom objects, in your subscriber’s org.
            * **[checkPackageBooleanValue(apiName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_FeatureManagement.htm#apex_System_FeatureManagement_checkPackageBooleanValue)**  
Checks the value__c value of the FeatureParameterBoolean__c record for a feature parameter in your subscriber’s org. You set the record’s value using setPackageBooleanValue(apiName, value).
            * **[checkPackageDateValue(apiName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_FeatureManagement.htm#apex_System_FeatureManagement_checkPackageDateValue)**  
Checks the value__c value of the FeatureParameterDate__c record for a feature parameter in your subscriber’s org. You can set the record’s value using setPackageDateValue(apiName, value).
            * **[checkPackageIntegerValue(apiName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_FeatureManagement.htm#apex_System_FeatureManagement_checkPackageIntegerValue)**  
Checks the value__c value of the FeatureParameterInteger__c record for a feature parameter in your subscriber’s org. You can set the record’s value using setPackageIntegerValue(apiName, value).
            * **[checkPermission(apiName)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_FeatureManagement.htm#apex_System_FeatureManagement_checkPermission)**  
Checks whether a custom permission is enabled.
            * **[setPackageBooleanValue(apiName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_FeatureManagement.htm#apex_System_FeatureManagement_setPackageBooleanValue)**  
Sets the value__c value of the FeatureParameterBoolean__c record for a subscriber-to-LMO feature parameter in your subscriber’s org. You can check the record’s value using checkPackageBooleanValue(apiName).
            * **[setPackageDateValue(apiName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_FeatureManagement.htm#apex_System_FeatureManagement_setPackageDateValue)**  
Sets the value__c value of the FeatureParameterDate__c record for a subscriber-to-LMO feature parameter in your subscriber’s org. You can check the record’s value using checkPackageDateValue(apiName).
            * **[setPackageIntegerValue(apiName, value)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_FeatureManagement.htm#apex_System_FeatureManagement_setPackageIntegerValue)**  
Sets the value__c value of the FeatureParameterInteger__c record for a subscriber-to-LMO feature parameter in your subscriber’s org. You can check the record’s value using checkPackageIntegerValue(apiName).
changeProtection(apiName, typeApiName, protection) Hides or reveals custom permissions, or reveals custom objects, in your subscriber’s org. Signature public static void changeProtection(String apiName, String typeApiName, String protection) Parameters

apiName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The API name of the custom object or custom permission to show or hide—for example, 'MyCustomObject__c' or 'MyCustomPermission'.
typeApiName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The API name of the type that you want to show or hide: 'CustomObject' or 'CustomPermission'.
protection
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
     To show a custom object or custom permission, 'Unprotected'. To hide a custom permission, 'Protected'.
Return Value Type: void Usage Warning For custom permissions, you can toggle the protected value indefinitely. However, after you’ve released unprotected objects to subscribers, you can’t set visibility to Protected. Be sure to protect any custom objects that you want to hide before you release the first package version that contains them. To hide custom permissions in released packages:
[code]FeatureManagement.changeProtection('YourCustomPermissionName', 'CustomPermission',
        'Protected');
[/code]

To unhide custom permissions and custom objects in released packages:
[code]FeatureManagement.changeProtection('YourCustomPermissionName', 'CustomPermission',
        'Unprotected');
[/code]
[code] FeatureManagement.changeProtection('YourCustomObjectName__c', 'CustomObject',
        'Unprotected');
[/code]

checkPackageBooleanValue(apiName) Checks the value__c value of the FeatureParameterBoolean__c record for a feature parameter in your subscriber’s org. You set the record’s value using setPackageBooleanValue(apiName, value). Signature public static Boolean checkPackageBooleanValue(String apiName) Parameters

apiName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The fullName__c value of the feature parameter whose value you want to check—for example, 'SpecialAccessAvailable'.
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") The value that’s currently assigned to the value__c field on the FeatureParameterBoolean__c record that associates the feature parameter with its related license. getSalesforceSitesHostname() Returns the hostname for the org’s Salesforce Sites. If Salesforce Sites aren’t enabled, this method throws an InvalidParameterValueException. Signature public static String getSalesforceSitesHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getSetupHostname() Returns the hostname for the org’s setup domain, which hosts Setup pages in Salesforce.  Signature public static String getSetupHostname() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getVisualforceHostname(packageName) Returns the hostname for the org’s Visualforce pages. Signature public static String getVisualforceHostname(String packageName) Parameters

packageName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The package name for this component.If packageName is null, this method uses the org’s namespace prefix as the package name. Otherwise, it uses the default namespace.
Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
