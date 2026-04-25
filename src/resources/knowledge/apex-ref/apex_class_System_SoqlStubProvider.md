# SoqlStubProvider Class

SoqlStubProvider Class Contains a method to create a mock test class for handling SOQL query responses for Data Cloud data model objects (DMOs).  Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage To create mock test classes, extend the SoqlStubProvider class and override the  handleSoqlQuery() class method. Note [SOQL For Loops](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/langCon_apex_loops_for_SOQL.htm) in Apex aren't supported for SOQL stubs in static or dynamic SOQL queries against DMOs. See [Mock SOQL Tests for Data Cloud Data Model Objects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/MockSOQLTestsForDMOs.htm "HTML \(New Window\)") in the Apex Developer Guide. Example This example shows a mock test class for the SkyMilesForBusinessOptInController class. @IsTest public class SkyMilesForBusinessOptInController_Test { @IsTest public static void mockSoql() { SoqlStubProvider stub = new UnifiedIndividualSoqlStub(); Test.createSoqlStub(UnifiedIndividual__dlm.sObjectType, stub); Assert.isTrue(Test.isSoqlStubDefined(UnifiedIndividual__dlm.sObjectType)); Test.startTest(); string companyId = 'SampleCompanyId'; // Performs SOQL query against Data Model Object List<SkyMilesMember> members = SkyMilesForBusinessOptInController.getSkyMilesProfilesFromDataCloud(companyId); Test.stopTest(); Assert.areEqual(1, members.size()); SkyMilesMember member = members[0]; Assert.areEqual(companyId, member.CompanyId); Assert.areEqual(5000, member.SkyMilesBalance); } class UnifiedIndividualSoqlStub extends SoqlStubProvider { public override List<sObject> handleSoqlQuery(sObjectType sot, string stubbedQuery, Map<string, object> bindVars) { Assert.areEqual(UnifiedIndividual__dlm.sObjectType, sot); // Stub assumes that the SOQL query is searching for a single record by company id string companyId = 'Default'; if(bindVars.containsKey('tmpVar1')) { companyId = (string)bindVars.get('tmpVar1'); } UnifiedIndividual__dlm dmo = (UnifiedIndividual__dlm)Test.createStubQueryRow( sot, new Map<string, object> { 'ssot__FirstName__c' => 'Codey', 'ssot__LastName__c' => 'Bear', 'ssot__Email__c' => 'developer@salesforce.com', 'ssot__SkyMilesBalance__c' => 5000, 'ssot__MedallionStatus__c' => 'Gold', 'ssot__CompanyId__c' => companyId } ); return new List<sObject> { dmo }; } } }
[/code]

public with sharing class SkyMilesForBusinessOptInController { public static List<SkyMilesMember> getSkyMilesProfilesFromDataCloud(String companyId) { List<UnifiedIndividual__dlm> unifiedIndividuals = [ SELECT Id, ssot__FirstName__c, ssot__LastName__c, ssot__Email__c, ssot__SkyMilesBalance__c, ssot__MedallionStatus__c, ssot__CompanyId__c FROM UnifiedIndividual__dlm WHERE ssot__CompanyId__c = :companyId ]; List<SkyMilesMember> skyMilesMembers = new List<SkyMilesMember>(); for (UnifiedIndividual__dlm individual : unifiedIndividuals) { skyMilesMembers.add( new SkyMilesMember( individual.Id, individual.ssot__FirstName__c, individual.ssot__LastName__c, individual.ssot__Email__c, individual.ssot__SkyMilesBalance__c, individual.ssot__MedallionStatus__c, individual.ssot__CompanyId__c ) ); } return skyMilesMembers; } } 
[/code]

            * **[SoqlStubProvider Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SoqlStubProvider.htm#apex_System_SoqlStubProvider_methods)**  

SoqlStubProvider Methods The following are methods for SoqlStubProvider.
            * **[handleSoqlQuery(targetType, stubbedQuery, bindMap)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_SoqlStubProvider.htm#apex_System_SoqlStubProvider_handleSoqlQuery)**  
Defines a mocked response for a SOQL query executed against the specified SObject type.
handleSoqlQuery(targetType, stubbedQuery, bindMap) Defines a mocked response for a SOQL query executed against the specified SObject type. Signature public List<SObject> handleSoqlQuery(Schema.SObjectType targetType, String stubbedQuery, Map<String,Object> bindMap) Parameters

targetType
    Type: [Schema.SObjectType](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_SObjectType.htm#topic-title)
    The SObject type to be stubbed. This parameter can’t be null.
stubbedQuery
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The SOQL query whose response is to be stubbed. Bind variables are replaced with placeholders.
bindMap
    Type: [Map](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_map.htm#topic-title)<String,Object>
    A map that contains placeholder keys for each bind variable specified in the SOQL query string and its value.
Return Value Type: List<[SObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#topic-title)> The list of stubbed SObjects resulting from the SOQL query. See Also
            * [Test Class](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_test.htm#apex_methods_system_test "Contains methods related to Apex tests.")
            * [_Apex Developer Guide:_ Mock SOQL Tests for Data Cloud Data Model Objects](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/MockSOQLTestsForDMOs.htm "Apex Developer Guide: Mock SOQL Tests for Data Cloud Data Model
              Objects - HTML \(New Window\)")
