# IdentityType Enum

IdentityType Enum Determines which set of credentials is used to authenticate to the external system. Usage The relevant credentials are passed to your [DataSource.Connection](atlas.en-us.258.0.apexref.meta/apexref/apex_class_DataSource_Connection.htm#apex_class_DataSource_Connection "Extend this class to enable your Salesforce org to sync the external system’s schema and to handle queries, searches, and write operations \(upsert and delete\) of the external data. This class extends the DataSourceUtil class and inherits its methods.") class. Enum Values The following are the values of the DataSource.IdentityType enum. Value | Description  
---|---  
ANONYMOUS | No credentials are used to authenticate to the external system.  
NAMED_USER | The credentials in the external data source definition are used to authenticate to the external system, regardless of which user is accessing the external data from your organization.  
PER_USER | For queries and searches, the credentials are specific to the current user who invokes the query or search. The credentials come from the user’s authentication settings for the external system.For administrative connections, such as syncing the external system’s schema, the credentials come from the external data source definition.
