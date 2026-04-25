# FieldSet Class

# FieldSet Class

    
    
    
    
Contains methods for discovering and retrieving the
            details of field sets created on sObjects.

        
        
## Namespace

            
            [Schema](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Schema.htm)

        

        
## Usage

            
            
Use the methods in the `Schema.FieldSet` class to discover the fields contained within a field
                set, and get details about the field set itself, such as the name, namespace, label,
                and so on. The following example shows how to get a collection of field set describe
                result objects for an sObject. The key of the returned Map is the field set name,
                and the value is the corresponding field set describe
                result.
```
Map<String, Schema.FieldSet> FsMap = 
    Schema.SObjectType.Account.fieldSets.getMap();
```

            Field sets are also available from sObject describe results. The following lines of
                code are equivalent to the prior sample:

            

                
```
Schema.DescribeSObjectResult d = 
  Account.sObjectType.getDescribe();
Map<String, Schema.FieldSet> FsMap = 
  d.fieldSets.getMap();
```

            

            To work with an individual field set, you can access it via the map of field sets on
                an sObject or, when you know the name of the field set in advance, using an explicit
                reference to the field set. The following two lines of code retrieve the same field
                set:
```
Schema.FieldSet fs1 = Schema.SObjectType.Account.fieldSets.getMap().get('field_set_name');
Schema.FieldSet fs2 = Schema.SObjectType.Account.fieldSets.field_set_name;
```

        

        
## Example: Displaying a Field Set on a Visualforce
                    Page

            
            
This sample uses `Schema.FieldSet` and `Schema.FieldSetMember` methods to dynamically get
                all the fields in the Dimensions field set for the Merchandise custom object. The
                list of fields is then used to construct a SOQL query that ensures those fields are
                available for display. The Visualforce page uses
                the `MerchandiseDetails` class as its
                controller.
```
public class MerchandiseDetails {

    public Merchandise__c merch { get; set; }
    
    public MerchandiseDetails() {
        this.merch = getMerchandise();
    }

    public List<Schema.FieldSetMember> getFields() {
        return SObjectType.Merchandise__c.FieldSets.Dimensions.getFields();
    }

    private Merchandise__c getMerchandise() {
        String query = 'SELECT ';
        for(Schema.FieldSetMember f : this.getFields()) {
            query += f.getFieldPath() + ', ';
        }
        query += 'Id, Name FROM Merchandise__c LIMIT 1';
        return Database.query(query);
    }
}
```

            
The Visualforce page using
                the above controller is
                simple:
```
<apex:page controller="MerchandiseDetails">
    <apex:form >

      <apex:pageBlock title="Product Details">
          <apex:pageBlockSection title="Product">
              <apex:inputField value="{!merch.Name}"/>
          </apex:pageBlockSection>
      
          <apex:pageBlockSection title="Dimensions">
              <apex:repeat value="{!fields}" var="f">
                  <apex:inputField value="{!merch[f.fieldPath]}" 
                      required="{!OR(f.required, f.dbrequired)}"/>
              </apex:repeat>
          </apex:pageBlockSection>
  
        </apex:pageBlock>

    </apex:form>  
</apex:page>
```

One
                thing to note about the above markup is the expression used to determine if a field
                on the form should be indicated as being a required field. A field in a field set
                can be required by either the field set definition, or the field’s own
                definition. The expression handles both cases.

        

    

 ## FieldSet Methods

 
 
 
  
   The following are methods for `FieldSet`. All are
    instance methods.

  

 

- 
**[getDescription()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fieldsets_describe.htm#apex_Schema_FieldSet_getDescription)**

Returns the field set’s description.

- 
**[getFields()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fieldsets_describe.htm#apex_Schema_FieldSet_getFields)**

Returns a list of `Schema.FieldSetMember` objects   for the fields making up the field set.

- 
**[getLabel()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fieldsets_describe.htm#apex_Schema_FieldSet_getLabel)**

Returns the translation of the text label that is displayed next to    the field in the Salesforce user interface.

- 
**[getName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fieldsets_describe.htm#apex_Schema_FieldSet_getName)**

Returns the field set’s name.

- 
**[getNamespace()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fieldsets_describe.htm#apex_Schema_FieldSet_getNamespace)**

Returns the field set’s namespace.

- 
**[getSObjectType()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_fieldsets_describe.htm#apex_Schema_FieldSet_getSObjectType)**

Returns the `Schema.sObjectType` of the sObject   containing the field set definition.

 ### getDescription()

 
 
 
 
Returns the field set’s description.

  
#### Signature

   
   `public String getDescription()`

   
  

  
#### Return Value

   
   Type: `String`

  

  
#### Usage

   
   Description is a required field for a field set, intended to describe the context and content
    of the field set. It’s often intended for administrators who might be configuring a field
    set defined in a managed package, rather than for end users.

  

 

 ### getFields()

 
 
 
 
Returns a list of `Schema.FieldSetMember` objects
  for the fields making up the field set.

  
#### Signature

   
   `public List<FieldSetMember> getFields()`

   
  

  
#### Return Value

   
   Type: [List](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_list.htm#apex_methods_system_list)<[Schema.FieldSetMember](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Schema_FieldSetMember.htm#apex_class_Schema_FieldSetMember)>

  

 

 ### getLabel()

 
 
 
 
Returns the translation of the text label that is displayed next to
   the field in the Salesforce user interface.

  
#### Signature

   
   `public String getLabel()`

   
  

  
#### Return Value

   
   Type: `String`

  

 

 ### getName()

 
 
 
 
Returns the field set’s name.

  
#### Signature

   
   `public String getName()`

   
   
  

  
#### Return Value

   
   Type: `String`

  

 

 ### getNamespace()

 
 
 
 
Returns the field set’s namespace.

  
#### Signature

   
   `public String getNamespace()`

   
  

  
#### Return Value

   
   Type: `String`

  

  
#### Usage

   
   
   The returned namespace is an empty string if your organization hasn’t set a namespace,
    and the field set is defined in your organization. Otherwise, it’s the namespace of your
    organization, or the namespace of the managed package containing the field set.

  

 

 ### getSObjectType()

 
 
 
 
Returns the `Schema.sObjectType` of the sObject
  containing the field set definition.

  
#### Signature

   
   `public Schema.SObjectType getSObjectType()`

   
  

  
#### Return Value

   
   Type: `Schema.SObjectType`