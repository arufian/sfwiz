# Search Class

For additional information about articles and questions, see “Work with Articles and Translations” in the Salesforce online help. Search Class Use the methods of the Search class to perform dynamic SOSL queries. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Search Methods The following are static methods for Search.
                                * **[find(searchQuery)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_search.htm#apex_System_Search_find)**  
Performs a dynamic SOSL query that can include the SOSL WITH SNIPPET clause. Snippets provide more context for users in Salesforce Knowledge article search results. 
                                * **[find(searchQuery, accessLevel)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_search.htm#apex_System_Search_find_2)**  
Performs a dynamic SOSL query that can include the SOSL WITH SNIPPET clause. Snippets provide more context for users in Salesforce Knowledge article search results. 
                                * **[query(query)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_search.htm#apex_System_Search_query)**  
Performs a dynamic SOSL query.
                                * **[query(query, accessLevel)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_search.htm#apex_System_Search_query_2)**  
Performs a dynamic SOSL query.
                                * **[suggest(searchQuery, sObjectType, suggestions)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_search.htm#apex_System_Search_suggest)**  
Returns a list of records or Salesforce Knowledge articles whose names or titles match the user’s search query string. Use this method to provide users with shortcuts to navigate to relevant records or articles before they perform a search.
                                * **[suggest(searchQuery, sObjectType, suggestions, accessLevel)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_search.htm#apex_System_Search_suggest_2)**  
Returns a list of records or Salesforce Knowledge articles whose names or titles match the user’s search query string. Use this method to provide users with shortcuts to navigate to relevant records or articles before they perform a search.
find(searchQuery) Performs a dynamic SOSL query that can include the SOSL WITH SNIPPET clause. Snippets provide more context for users in Salesforce Knowledge article search results.  Signature public static Search.SearchResults find(String searchQuery) Parameters

searchQuery
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    A SOSL query string.
Return Value Type: [Search.SearchResults](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Search_SearchResults.htm#apex_class_Search_SearchResults "Wraps the results returned by the Search.find\(String​\) method.") Usage Use this method wherever a static SOSL query can be used, such as in regular assignment statements and for loops. See [Use Dynamic SOSL to Return Snippets](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_sosl.htm#snippet_title). See Also
                                * [get(sObjectType)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Search_SearchResults.htm#apex_Search_SearchResults_get "Returns a list of Search.SearchResult objects that contain an sObject of the specified type.")
                                * [_Apex Developer Guide_ : Dynamic SOSL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_sosl.htm "Apex Developer Guide: Dynamic SOSL - HTML \(New Window\)")
find(searchQuery, accessLevel) Performs a dynamic SOSL query that can include the SOSL WITH SNIPPET clause. Snippets provide more context for users in Salesforce Knowledge article search results.  Signature public static Search.SearchResults find(String searchQuery, System.AccessLevel accessLevel) Parameters

searchQuery
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    A SOSL query string.
accessLevel
    Type: [System.AccessLevel](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AccessLevel.htm#apex_class_System_AccessLevel "Defines the different modes, such as system or user mode, that Apex database operations execute in.")
    (Optional) The accessLevel parameter specifies whether the method runs in system mode (AccessLevel.SYSTEM_MODE) or user mode (AccessLevel.USER_MODE). In system mode, the object and field-level permissions of the current user are ignored, and the record sharing rules are controlled by the [class sharing keywords](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_classes_keywords_sharing.htm). In user mode, the object permissions, field-level security, and sharing rules of the current user are enforced. System mode is the default.
Return Value Type: [Search.SearchResults](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Search_SearchResults.htm#apex_class_Search_SearchResults "Wraps the results returned by the Search.find\(String​\) method.") Usage Use this method wherever a static SOSL query can be used, such as in regular assignment statements and for loops. See [Use Dynamic SOSL to Return Snippets](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_sosl.htm#snippet_title). See Also
                                * [_Apex Developer Guide_ : Dynamic SOSL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_sosl.htm "Apex Developer Guide: Dynamic SOSL - HTML \(New Window\)")
query(query) Performs a dynamic SOSL query. Signature public static sObject[sObject[]] query(String query) Parameters

query
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    A SOSL query string. 
    To create a SOSL query that includes the WITH SNIPPET clause, use the Search.find(String searchQuery) method instead. 
Return Value Type: [sObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject "Contains methods for the sObject data type.")[[sObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject "Contains methods for the sObject data type.")[]] Usage This method can be used wherever a static SOSL query can be used, such as in regular assignment statements and for loops. For more information, see [Dynamic SOSL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_sosl.htm "HTML \(New Window\)"). query(query, accessLevel) Performs a dynamic SOSL query. Signature public static List<List<SObject>> query(String query, System.AccessLevel accessLevel) Parameters

query
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    A SOSL query string. 
    To create a SOSL query that includes the WITH SNIPPET clause, use the Search.find(String searchQuery) method instead. 
accessLevel
    Type: [System.AccessLevel](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AccessLevel.htm#apex_class_System_AccessLevel "Defines the different modes, such as system or user mode, that Apex database operations execute in.")
    (Optional) The accessLevel parameter specifies whether the method runs in system mode (AccessLevel.SYSTEM_MODE) or user mode (AccessLevel.USER_MODE). In system mode, the object and field-level permissions of the current user are ignored, and the record sharing rules are controlled by the [class sharing keywords](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_classes_keywords_sharing.htm). In user mode, the object permissions, field-level security, and sharing rules of the current user are enforced. System mode is the default.
Return Value Type: [sObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject "Contains methods for the sObject data type.")[[sObject](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_sobject.htm#apex_methods_system_sobject "Contains methods for the sObject data type.")[]] Usage This method can be used wherever a static SOSL query can be used, such as in regular assignment statements and for loops. For more information, see [Dynamic SOSL](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_dynamic_sosl.htm). suggest(searchQuery, sObjectType, suggestions) Returns a list of records or Salesforce Knowledge articles whose names or titles match the user’s search query string. Use this method to provide users with shortcuts to navigate to relevant records or articles before they perform a search. Signature public static Search.SuggestionResults suggest(String searchQuery, String sObjectType, Search.SuggestionOption suggestions) Parameters

searchQuery
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    A SOSL query string.
sObjectType
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    An sObject type.
options
    Type: [Search.SuggestionOption](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Search_SuggestionOption.htm#apex_class_Search_SuggestionOption "Options that narrow record and article suggestion results returned from a call to System.Search.suggest\(String, String, Search.SuggestionOption\).")
    This object contains options that change the suggestion results.
    If the searchQuery returns KnowledgeArticleVersion objects, pass an options parameter with a Search.SuggestionOption object that contains a language KnowledgeSuggestionFilter and a publish status KnowledgeSuggestionFilter.
    For suggestions for all other record types, the only supported option is a limit, which sets the maximum number of suggestions returned.
Return Value Type: [SuggestionResults](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Search_SuggestionResults.htm#apex_class_Search_SuggestionResults "Wraps the results returned by the Search.suggest\(​String, String, Search.SuggestionOption\) method.") Usage Use this method to return:

Suggestions for Salesforce Knowledge articles (KnowledgeArticleVersion)
     Salesforce Knowledge must be enabled in your organization. The user must have the “View Articles” permission enabled. 
    The articles suggested include only the articles the user can access, based on the data categories and article types the user has permissions to view.
Suggestions for other record types
    The records suggested include only the records the user can access.
    This method returns a record if its name field starts with the text in the search string. This method automatically appends an asterisk wildcard (*) at the end of the search string. Records that contain the search string within a word aren’t considered a match.
    Records are suggested if the entire search string is found in the record name, in the same order as specified in the search string. For example, the text string `national u` is treated as `national u*` and returns “National Utility” and “National Urban Company” but not “National Company Utility” or “Urban National Company”.
Note If the user’s search query contains quotation marks or wildcards, those symbols are automatically removed from the query string in the URI. See Also
                                * [_Apex Developer Guide_ : Suggest Salesforce Knowledge Articles](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_forcecom_kb_suggestions.htm "Apex Developer Guide: Suggest Salesforce Knowledge Articles - HTML \(New Window\)")
suggest(searchQuery, sObjectType, suggestions, accessLevel) Returns a list of records or Salesforce Knowledge articles whose names or titles match the user’s search query string. Use this method to provide users with shortcuts to navigate to relevant records or articles before they perform a search. Signature public static Search.SuggestionResults suggest(String searchQuery, String sObjectType, Search.SuggestionOption suggestions, System.AccessLevel accessLevel) Parameters

searchQuery
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    A SOSL query string.
sObjectType
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    An sObject type.
suggestions
    Type: [Search.SuggestionOption](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Search_SuggestionOption.htm#apex_class_Search_SuggestionOption "Options that narrow record and article suggestion results returned from a call to System.Search.suggest\(String, String, Search.SuggestionOption\).")
    This object contains options that change the suggestion results.
    If the searchQuery returns KnowledgeArticleVersion objects, pass an options parameter with a Search.SuggestionOption object that contains a language KnowledgeSuggestionFilter and a publish status KnowledgeSuggestionFilter.
    For suggestions for all other record types, the only supported option is a limit, which sets the maximum number of suggestions returned.
accessLevel
    Type: [System.AccessLevel](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_AccessLevel.htm#apex_class_System_AccessLevel "Defines the different modes, such as system or user mode, that Apex database operations execute in.")
    (Optional) The accessLevel parameter specifies whether the method runs in system mode (AccessLevel.SYSTEM_MODE) or user mode (AccessLevel.USER_MODE). In system mode, the object and field-level permissions of the current user are ignored, and the record sharing rules are controlled by the [class sharing keywords](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_classes_keywords_sharing.htm). In user mode, the object permissions, field-level security, and sharing rules of the current user are enforced. System mode is the default.
Return Value Type: [SuggestionResults](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Search_SuggestionResults.htm#apex_class_Search_SuggestionResults "Wraps the results returned by the Search.suggest\(​String, String, Search.SuggestionOption\) method.") Usage Use this method to return:

Suggestions for Salesforce Knowledge articles (KnowledgeArticleVersion)
     Salesforce Knowledge must be enabled in your organization. The user must have the “View Articles” permission enabled. 
    The articles suggested include only the articles the user can access, based on the data categories and article types the user has permissions to view.
Suggestions for other record types
    The records suggested include only the records the user can access.
    This method returns a record if its name field starts with the text in the search string. This method automatically appends an asterisk wildcard (*) at the end of the search string. Records that contain the search string within a word aren’t considered a match.
    Records are suggested if the entire search string is found in the record name, in the same order as specified in the search string. For example, the text string `national u` is treated as `national u*` and returns “National Utility” and “National Urban Company” but not “National Company Utility” or “Urban National Company”.
Note If the user’s search query contains quotation marks or wildcards, those symbols are automatically removed from the query string in the URI.
