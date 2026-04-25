# StandardController Class

SelectOption Class A SelectOption object specifies one of the possible values for a Visualforce selectCheckboxes, selectList, or selectRadio component. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") SelectOption consists of a label that is displayed to the end user, and a value that is returned to the controller if the option is selected. A SelectOption can also be displayed in a disabled state, so that a user cannot select it as an option, but can still view it. Instantiation In a custom controller or controller extension, you can instantiate a SelectOption in one of the following ways:  
                                    * 
[code]SelectOption option = new SelectOption(value, label, isDisabled);
[/code]

where value is the String that is returned to the controller if the option is selected by a user, label is the String that is displayed to the user as the option choice, and isDisabled is a Boolean that, if true, specifies that the user cannot select the option, but can still view it.
                                    * 
[code]SelectOption option = new SelectOption(value, label);
[/code]

where value is the String that is returned to the controller if the option is selected by a user, and label is the String that is displayed to the user as the option choice. Because a value for isDisabled is not specified, the user can both view and select the option.
Example The following example shows how a list of SelectOptions objects can be used to provide possible values for a selectCheckboxes component on a Visualforce page. In the following custom controller, the getItems method defines and returns the list of possible SelectOption objects:
[code] public class sampleCon {
    
     	String[] countries = new String[]{};
    
     	public PageReference test() {
     	 	return null;
     	}
    
     	public List<SelectOption> getItems() {
     	 	List<SelectOption> options = new List<SelectOption>();
     	 	options.add(new SelectOption('US','US'));
     	 	options.add(new SelectOption('CANADA','Canada'));
     	 	options.add(new SelectOption('MEXICO','Mexico'));
     	 	return options;
      	}
    
     	public String[] getCountries() {
      	 	return countries;
     	}
    
     	public void setCountries(String[] countries) {
     	 	this.countries = countries;
     	}
    
    }		
[/code]

In the following page markup, the <apex:selectOptions> tag uses the getItems method from the controller above to retrieve the list of possible values. Because <apex:selectOptions> is a child of the <apex:selectCheckboxes> tag, the options are displayed as checkboxes:
[code] <apex:page controller="sampleCon">
     	<apex:form>
     	 	<apex:selectCheckboxes value="{!countries}">
     	 	 	<apex:selectOptions value="{!items}"/>
     	 	</apex:selectCheckboxes><br/>
     	 	<apex:commandButton value="Test" action="{!test}" rerender="out" status="status"/>
     	</apex:form>
     	<apex:outputPanel id="out">
     	 	<apex:actionstatus id="status" startText="testing...">
     	 	 	<apex:facet name="stop">
     	 	 	 	<apex:outputPanel>
     	 	 	 	 	<p>You have selected:</p>
     	 	 	 	 	<apex:dataList value="{!countries}" var="c">{!c}</apex:dataList>
     	 	 	 	</apex:outputPanel>
     	 	 	</apex:facet>
     	 	</apex:actionstatus>
     	</apex:outputPanel>
    </apex:page>		
[/code]

                                    * **[SelectOption Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_constructors)**  

                                    * **[SelectOption Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_methods)**  

SelectOption Constructors The following are constructors for SelectOption.
                                    * **[SelectOption(value, label)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_ctor_2)**  
Creates a new instance of the SelectOption class using the specified value and label.
                                    * **[SelectOption(value, label, isDisabled)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_ctor)**  
Creates a new instance of the SelectOption class using the specified value, label, and disabled setting.
SelectOption(value, label) Creates a new instance of the SelectOption class using the specified value and label. Signature public SelectOption(String value, String label) Parameters

value
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string that is returned to the Visualforce controller if the option is selected by a user.
label
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string that is displayed to the user as the option choice.
SelectOption(value, label, isDisabled) Creates a new instance of the SelectOption class using the specified value, label, and disabled setting. Signature public SelectOption(String value, String label, Boolean isDisabled) Parameters

value
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string that is returned to the Visualforce controller if the option is selected by a user.
label
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string that is displayed to the user as the option choice.
isDisabled
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    If set to true, the option can’t be selected by the user but can still be viewed.
SelectOption Methods The following are methods for SelectOption. All are instance methods.
                                    * **[getDisabled()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_getDisabled)**  
Returns the current value of the SelectOption object's isDisabled attribute.
                                    * **[getEscapeItem()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_getEscapeItem)**  
Returns the current value of the SelectOption object's itemEscaped attribute.
                                    * **[getLabel()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_getLabel)**  
Returns the option label that is displayed to the user.
                                    * **[getValue()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_getValue)**  
Returns the option value that is returned to the controller if a user selects the option.
                                    * **[setDisabled(isDisabled)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_setDisabled)**  
Sets the value of the SelectOption object's isDisabled attribute.
                                    * **[setEscapeItem(itemsEscaped)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_setEscapeItem)**  
Sets the value of the SelectOption object's itemEscaped attribute.
                                    * **[setLabel(label)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_setLabel)**  
Sets the value of the option label that is displayed to the user.
                                    * **[setValue(value)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_setValue)StringSelectOption Class A SelectOption object specifies one of the possible values for a Visualforce selectCheckboxes, selectList, or selectRadio component. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") SelectOption consists of a label that is displayed to the end user, and a value that is returned to the controller if the option is selected. A SelectOption can also be displayed in a disabled state, so that a user cannot select it as an option, but can still view it. Instantiation In a custom controller or controller extension, you can instantiate a SelectOption in one of the following ways:
                                      * 
[code]SelectOption option = new SelectOption(value, label, isDisabled);
[/code]

where value is the String that is returned to the controller if the option is selected by a user, label is the String that is displayed to the user as the option choice, and isDisabled is a Boolean that, if true, specifies that the user cannot select the option, but can still view it.
                                      * 
[code]SelectOption option = new SelectOption(value, label);
[/code]

where value is the String that is returned to the controller if the option is selected by a user, and label is the String that is displayed to the user as the option choice. Because a value for isDisabled is not specified, the user can both view and select the option.
Example The following example shows how a list of SelectOptions objects can be used to provide possible values for a selectCheckboxes component on a Visualforce page. In the following custom controller, the getItems method defines and returns the list of possible SelectOption objects:
[code] public class sampleCon {
    
     	String[] countries = new String[]{};
    
     	public PageReference test() {
     	 	return null;
     	}
    
     	public List<SelectOption> getItems() {
     	 	List<SelectOption> options = new List<SelectOption>();
     	 	options.add(new SelectOption('US','US'));
     	 	options.add(new SelectOption('CANADA','Canada'));
     	 	options.add(new SelectOption('MEXICO','Mexico'));
     	 	return options;
      	}
    
     	public String[] getCountries() {
      	 	return countries;
     	}
    
     	public void setCountries(String[] countries) {
     	 	this.countries = countries;
     	}
    
    }		
[/code]

In the following page markup, the <apex:selectOptions> tag uses the getItems method from the controller above to retrieve the list of possible values. Because <apex:selectOptions> is a child of the <apex:selectCheckboxes> tag, the options are displayed as checkboxes:
[code] <apex:page controller="sampleCon">
     	<apex:form>
     	 	<apex:selectCheckboxes value="{!countries}">
     	 	 	<apex:selectOptions value="{!items}"/>
     	 	</apex:selectCheckboxes><br/>
     	 	<apex:commandButton value="Test" action="{!test}" rerender="out" status="status"/>
     	</apex:form>
     	<apex:outputPanel id="out">
     	 	<apex:actionstatus id="status" startText="testing...">
     	 	 	<apex:facet name="stop">
     	 	 	 	<apex:outputPanel>
     	 	 	 	 	<p>You have selected:</p>
     	 	 	 	 	<apex:dataList value="{!countries}" var="c">{!c}</apex:dataList>
     	 	 	 	</apex:outputPanel>
     	 	 	</apex:facet>
     	 	</apex:actionstatus>
     	</apex:outputPanel>
    </apex:page>		
[/code]

                                      * **[SelectOption Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_constructors)**  

                                      * **[SelectOption Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_methods)**  

SelectOption Constructors The following are constructors for SelectOption.
                                      * **[SelectOption(value, label)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_ctor_2)**  
Creates a new instance of the SelectOption class using the specified value and label.
                                      * **[SelectOption(value, label, isDisabled)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_ctor)**  
Creates a new instance of the SelectOption class using the specified value, label, and disabled setting.
SelectOption(value, label) Creates a new instance of the SelectOption class using the specified value and label. Signature public SelectOption(String value, String label) Parameters

value
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string that is returned to the Visualforce controller if the option is selected by a user.
label
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string that is displayed to the user as the option choice.
SelectOption(value, label, isDisabled) Creates a new instance of the SelectOption class using the specified value, label, and disabled setting. Signature public SelectOption(String value, String label, Boolean isDisabled) Parameters

value
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string that is returned to the Visualforce controller if the option is selected by a user.
label
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string that is displayed to the user as the option choice.
isDisabled
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
    If set to true, the option can’t be selected by the user but can still be viewed.
SelectOption Methods The following are methods for SelectOption. All are instance methods.
                                      * **[getDisabled()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_getDisabled)**  
Returns the current value of the SelectOption object's isDisabled attribute.
                                      * **[getEscapeItem()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_getEscapeItem)**  
Returns the current value of the SelectOption object's itemEscaped attribute.
                                      * **[getLabel()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_getLabel)**  
Returns the option label that is displayed to the user.
                                      * **[getValue()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_getValue)**  
Returns the option value that is returned to the controller if a user selects the option.
                                      * **[setDisabled(isDisabled)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_setDisabled)**  
Sets the value of the SelectOption object's isDisabled attribute.
                                      * **[setEscapeItem(itemsEscaped)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_setEscapeItem)**  
Sets the value of the SelectOption object's itemEscaped attribute.
                                      * **[setLabel(label)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_setLabel)**  
Sets the value of the option label that is displayed to the user.
                                      * **[setValue(value)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_selectoption.htm#apex_System_SelectOption_setValue)**  
Sets the value of the option value that is returned to the controller if a user selects the option.
getDisabled() Returns the current value of the SelectOption object's isDisabled attribute. Signature public Boolean getDisabled() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage If isDisabled is set to true, the user can view the option, but cannot select it. If isDisabled is set to false, the user can both view and select the option. getEscapeItem() Returns the current value of the SelectOption object's itemEscaped attribute. Signature public Boolean getEscapeItem() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage If itemEscaped is set to true, sensitive HTML and XML characters are escaped in the HTML output generated by this component. If itemEscaped is set to false, items are rendered as written. getLabel() Returns the option label that is displayed to the user. Signature public String getLabel() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getValue() Returns the option value that is returned to the controller if a user selects the option. Signature public String getValue() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") setDisabled(isDisabled) Sets the value of the SelectOption object's isDisabled attribute. Signature public Void setDisabled(Boolean isDisabled) Parameters

isDisabled
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
Return Value Type: Void Usage If isDisabled is set to true, the user can view the option, but cannot select it. If isDisabled is set to false, the user can both view and select the option. setEscapeItem(itemsEscaped) Sets the value of the SelectOption object's itemEscaped attribute. Signature public Void setEscapeItem(Boolean itemsEscaped) Parameters

itemsEscaped
    Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
Return Value Type: Void Usage If itemEscaped is set to true, sensitive HTML and XML characters are escaped in the HTML output generated by this component. If itemEscaped is set to false, items are rendered as written. setLabel(label) Sets the value of the option label that is displayed to the user. Signature public Void setLabel(String label) Parameters

label
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Void setValue(value) Sets the value of the option value that is returned to the controller if a user selects the option. Signature public Void setValue(String value) Parameters

value
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Void StandardController Class Use a StandardController when defining an extension for a standard controller. Namespace [ApexPages](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_ApexPages.htm "The ApexPages namespace provides classes used in Visualforce controllers.") Usage StandardController objects reference the pre-built Visualforce controllers provided by Salesforce. The only time it is necessary to refer to a StandardController object is when defining an extension for a standard controller. StandardController is the data type of the single argument in the extension class constructor. Instantiation You can instantiate a StandardController in the following way:
[code]ApexPages.StandardController sc = new ApexPages.StandardController(sObject);
[/code]

Example The following example shows how a StandardController object can be used in the constructor for a standard controller extension:
[code] public class myControllerExtension {
    
        private final Account acct;
        
        // The extension constructor initializes the private member
        // variable acct by using the getRecord method from the standard
        // controller.
        public myControllerExtension(ApexPages.StandardController stdController) {
            this.acct = (Account)stdController.getRecord();
        }
    
        public String getGreeting() {
            return 'Hello ' + acct.name + ' (' + acct.id + ')';
        }
    }
[/code]

The following Visualforce markup shows how the controller extension from above can be used in a page: 
[code] <apex:page standardController="Account" extensions="myControllerExtension">
        {!greeting} <p/>
        <apex:form>
            <apex:inputField value="{!account.name}"/> <p/>
            <apex:commandButton value="Save" action="{!save}"/>
        </apex:form>
    </apex:page>
[/code]

                                      * **[StandardController Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_constructors)**  

                                      * **[StandardController Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_methods)**  

StandardController Constructors The following are constructors for StandardController.
                                      * **[StandardController(controllerSObject)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_ctor)**  
Creates a new instance of the ApexPages.StandardController class for the specified standard or custom object.
StandardController(controllerSObject) Creates a new instance of the ApexPages.StandardController class for the specified standard or custom object. Signature public StandardController(SObject controllerSObject) Parameters

controllerSObject
    Type: SObject
    A standard or custom object.
StandardController Methods The following are methods for StandardController. All are instance methods.
                                      * **[addFields(fieldNames)](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_addFields)**  
When a Visualforce page is loaded, the fields accessible to the page are based on the fields referenced in the Visualforce markup. This method adds a reference to each field specified in fieldNames so that the controller can explicitly access those fields as well.
                                      * **[cancel()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_cancel)**  
Returns the PageReference of the cancel page.
                                      * **[delete()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_delete)**  
Deletes record and returns the PageReference of the delete page.
                                      * **[edit()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_edit)**  
Returns the PageReference of the standard edit page.
                                      * **[getId()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_getId)**  
Returns the ID of the record that is currently in context, based on the value of the id query string parameter in the Visualforce page URL.
                                      * **[getRecord()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_getRecord)**  
Returns the record that is currently in context, based on the value of the id query string parameter in the Visualforce page URL. 
                                      * **[reset()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_reset)**  
Forces the controller to reacquire access to newly referenced fields. Any changes made to the record prior to this method call are discarded. 
                                      * **[save()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_save)**  
Saves changes and returns the updated PageReference.
                                      * **[view()](atlas.en-us.258.0.apexref.meta/apexref/apex_pages_standardcontroller.htm#apex_ApexPages_StandardController_view)**  
Returns the PageReference object of the standard detail page.
addFields(fieldNames) When a Visualforce page is loaded, the fields accessible to the page are based on the fields referenced in the Visualforce markup. This method adds a reference to each field specified in fieldNames so that the controller can explicitly access those fields as well. Signature public Void addFields(List<String> fieldNames) Parameters

fieldNames
    Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list "Contains methods for the List collection type.")<[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")>
Return Value Type: Void Usage This method should be called before a record has been loaded—typically, it's called by the controller's constructor. If this method is called outside of the constructor, you must use the reset() method before calling addFields(). The strings in fieldNames can either be the API name of a field, such as AccountId, or they can be explicit relationships to fields, such as something__r.myField__c. This method is only for controllers used by dynamicVisualforce bindings. cancel() Returns the PageReference of the cancel page. Signature public System.PageReference cancel() Return Value Type: [System.PageReference](atlas.en-us.258.0.apexref.meta/apexref/apex_system_pagereference.htm "A PageReference is a reference to an instantiation of a page. Among other attributes, PageReferences consist of a URL and a set of query parameter names and values.") delete() Deletes record and returns the PageReference of the delete page. Signature public System.PageReference delete() Return Value Type: [System.PageReference](atlas.en-us.258.0.apexref.meta/apexref/apex_system_pagereference.htm "A PageReference is a reference to an instantiation of a page. Among other attributes, PageReferences consist of a URL and a set of query parameter names and values.") edit() Returns the PageReference of the standard edit page. Signature public System.PageReference edit() Return Value Type: [System.PageReference](atlas.en-us.258.0.apexref.meta/apexref/apex_system_pagereference.htm "A PageReference is a reference to an instantiation of a page. Among other attributes, PageReferences consist of a URL and a set of query parameter names and values.") getId() Returns the ID of the record that is currently in context, based on the value of the id query string parameter in the Visualforce page URL. Signature public String getId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getRecord() Returns the record that is currently in context, based on the value of the id query string parameter in the Visualforce page URL.  Signature public SObject getRecord() Return Value Type: [sObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject "Contains methods for the sObject data type.") Usage Note that only the fields that are referenced in the associated Visualforce markup are available for querying on this SObject. All other fields, including fields from any related objects, must be queried using a SOQL expression. Tip You can work around this restriction by including a hidden component that references any additional fields that you want to query. Hide the component from display by setting the component's rendered attribute to false. Example
[code] <apex:outputText 
    value="{!account.billingcity} 
    {!account.contacts}"
    rendered="false"/>
[/code]

reset() Forces the controller to reacquire access to newly referenced fields. Any changes made to the record prior to this method call are discarded.  Signature public Void reset() Return Value Type: Void Usage This method is only used if addFields is called outside the constructor, and it must be called directly before addFields. This method is only for controllers used by dynamicVisualforce bindings. save() Saves changes and returns the updated PageReference. Signature public System.PageReference save() Return Value Type: [System.PageReference](atlas.en-us.258.0.apexref.meta/apexref/apex_system_pagereference.htm "A PageReference is a reference to an instantiation of a page. Among other attributes, PageReferences consist of a URL and a set of query parameter names and values.") view() Returns the PageReference object of the standard detail page. Signature public System.PageReference view() Return Value Type: [System.PageReference](atlas.en-us.258.0.apexref.meta/apexref/apex_system_pagereference.htm "A PageReference is a reference to an instantiation of a page. Among other attributes, PageReferences consist of a URL and a set of query parameter names and values.")
