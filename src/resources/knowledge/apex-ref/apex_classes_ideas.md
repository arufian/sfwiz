# Ideas Class

setOneClickPostIdeas Class Represents zone ideas. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage Ideas is a zone of users who post, vote for, and comment on ideas. An Ideas zone provides an online, transparent way for you to attract, manage, and showcase innovation. A set of recent replies (returned by methods, see below) includes ideas that a user posted or commented on that already have comments posted by another user. The returned ideas are listed based on the time of the last comment made by another user, with the most recent ideas appearing first. The userID argument is a required argument that filters the results so only the ideas that the specified user has posted or commented on are returned. The communityID argument filters the results so only the ideas within the specified zone are returned. If this argument is the empty string, then all recent replies for the specified user are returned regardless of the zone. For more information on ideas, see “Using Ideas” in the Salesforce online help. Example The following example finds ideas in a specific zone that have similar titles as a new idea:
[code]public class FindSimilarIdeasController {
    
       public static void test() {
          // Instantiate a new idea 
          Idea idea = new Idea ();
    
          // Specify a title for the new idea
          idea.Title = 'Increase Vacation Time for Employees';
    
          // Specify the communityID (INTERNAL_IDEAS) in which to find similar ideas. 
          Community community = [ SELECT Id FROM Community WHERE Name = 'INTERNAL_IDEAS' ];
    
          idea.CommunityId = community.Id;
    
          ID[] results = Ideas.findSimilar(idea);
       }
    }
    
[/code]

The following example uses a Visualforce page in conjunction with a custom controller, that is, a special Apex class. For more information on Visualforce, see the [Visualforce Developer's Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/ "Adobe Acrobat PDF \(New Window\)"). This example creates an Apex method in the controller that returns unread recent replies. You can leverage this same example for the getAllRecentReplies and getReadRecentReplies methods. For this example to work, there must be ideas posted to the zone. In addition, at least one zone member must have posted a comment to another zone member's idea or comment.
[code] // Create an Apex method to retrieve the recent replies marked as unread in all communities
    public class IdeasController {
    
       public Idea[] getUnreadRecentReplies() {
           Idea[] recentReplies;
           if (recentReplies == null) {
               Id[] recentRepliesIds = Ideas.getUnreadRecentReplies(UserInfo.getUserId(), '');
               recentReplies = [SELECT Id, Title FROM Idea WHERE Id IN :recentRepliesIds];
           }
           return recentReplies;                                                                      
      }
    
    }
    
    
[/code]

The following is the markup for a Visualforce page that uses the above custom controller to list unread recent replies.
[code] <apex:page controller="IdeasController" showHeader="false">
        <apex:dataList value="{!unreadRecentReplies}" var="recentReplyIdea">
               <a href="/apex/viewIdea?id={!recentReplyIdea.Id}">
                     <apex:outputText value="{!recentReplyIdea.Title}" escape="true"/></a>
         </apex:dataList>             
    </apex:page>
    
    
[/code]

The following example uses a Visualforce page in conjunction with a custom controller to list ideas. Then, a second Visualforce page and custom controller is used to display a specific idea and mark it as read. For this example to work, there must be ideas posted to the zone.
[code] // Create a controller to use on a VisualForce page to list ideas
    public class IdeaListController {
    
        public final Idea[] ideas {get; private set;}
    
        public IdeaListController() {
            Integer i = 0;
            ideas = new Idea[10];
            for (Idea tmp : Database.query
    ('SELECT Id, Title FROM Idea WHERE Id != null AND parentIdeaId = null LIMIT 10')) {
                i++;
                ideas.add(tmp);
            }
        }
    }
    
    
[/code]

The following is the markup for a Visualforce page that uses the above custom controller to list ideas:
[code] <apex:page controller="IdeaListController" tabStyle="Idea" showHeader="false">
    
            <apex:dataList value="{!ideas}" var="idea" id="ideaList">
                <a href="/apex/viewIdea?id={!idea.id}">
    <apex:outputText value="{!idea.title}" escape="true"/></a>                       
            </apex:dataList>
    
    </apex:page>
    
[/code]

The following example also uses a Visualforce page and custom controller, this time, to display the idea that is selected on the above idea list page. In this example, the markRead method marks the selected idea and associated comments as read by the user that is currently logged in. Note that the markRead method is in the constructor so that the idea is marked read immediately when the user goes to a page that uses this controller. For this example to work, there must be ideas posted to the zone. In addition, at least one zone member must have posted a comment to another zone member's idea or comment.
[code] // Create an Apex method in the controller that marks all comments as read for the 
    // selected idea
    public class ViewIdeaController {
    
       private final String id = System.currentPage().getParameters().get('id');
    
       public ViewIdeaController(ApexPages.StandardController controller) {
                    Ideas.markRead(id);
       }
    
    }
    
[/code]

The following is the markup for a Visualforce page that uses the above custom controller to display the idea as read.
[code] <apex:page standardController="Idea" extensions="ViewIdeaController" showHeader="false">
       
         <h2><apex:outputText value="{!idea.title}" /></h2>
         <apex:outputText value="{!idea.body}" />
    
    </apex:page>
    
[/code]

Ideas Methods The following are methods for Ideas. All methods are static.
                    * **[findSimilar(idea)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_findSimilar)**  
Returns a list of similar ideas based on the title of the specified idea.
                    * **[getAllRecentReplies(userID, communityID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_getAllRecentReplies)**  
Returns ideas that have recent replies for the specified user or zone. This includes all read and unread replies.
                    * **[getReadRecentReplies(userID, communityID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_getReadRecentReplies)**  
Returns ideas that have recent replies marked as read.
                    * **[getUnreadRecentReplies(userID, communityID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_getUnreadRecentReplies)**  
Returns ideas that have recent replies marked as unread.
                    * **[markRead(ideaID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_markRead)**  
Marks all comments as read for the user that is currently logged in.
findSimilar(idea) Returns a list of similar ideas based on the title of the specified idea. Signature public static ID[] findSimilar(Idea idea) Parameters

idea
    Type: Idea
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each findSimilar call counts against the SOSL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). getAllRecentReplies(userID, communityID) Returns ideas that have recent replies for the specified user or zone. This includes all read and unread replies. Signature public static ID[] getAllRecentReplies(String userID, String communityID) Parameters

userID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
communityID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each getAllRecentReplies call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). getReadRecentReplies(userID, communityID) Returns ideas that have recent replies marked as read. Signature public static ID[] getReadRecentReplies(Ideas Class Represents zone ideas. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage Ideas is a zone of users who post, vote for, and comment on ideas. An Ideas zone provides an online, transparent way for you to attract, manage, and showcase innovation. A set of recent replies (returned by methods, see below) includes ideas that a user posted or commented on that already have comments posted by another user. The returned ideas are listed based on the time of the last comment made by another user, with the most recent ideas appearing first. The userID argument is a required argument that filters the results so only the ideas that the specified user has posted or commented on are returned. The communityID argument filters the results so only the ideas within the specified zone are returned. If this argument is the empty string, then all recent replies for the specified user are returned regardless of the zone. For more information on ideas, see “Using Ideas” in the Salesforce online help. Example The following example finds ideas in a specific zone that have similar titles as a new idea:
[code]public class FindSimilarIdeasController {
    
       public static void test() {
          // Instantiate a new idea 
          Idea idea = new Idea ();
    
          // Specify a title for the new idea
          idea.Title = 'Increase Vacation Time for Employees';
    
          // Specify the communityID (INTERNAL_IDEAS) in which to find similar ideas. 
          Community community = [ SELECT Id FROM Community WHERE Name = 'INTERNAL_IDEAS' ];
    
          idea.CommunityId = community.Id;
    
          ID[] results = Ideas.findSimilar(idea);
       }
    }
    
[/code]

The following example uses a Visualforce page in conjunction with a custom controller, that is, a special Apex class. For more information on Visualforce, see the [Visualforce Developer's Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/ "Adobe Acrobat PDF \(New Window\)"). This example creates an Apex method in the controller that returns unread recent replies. You can leverage this same example for the getAllRecentReplies and getReadRecentReplies methods. For this example to work, there must be ideas posted to the zone. In addition, at least one zone member must have posted a comment to another zone member's idea or comment.
[code] // Create an Apex method to retrieve the recent replies marked as unread in all communities
    public class IdeasController {
    
       public Idea[] getUnreadRecentReplies() {
           Idea[] recentReplies;
           if (recentReplies == null) {
               Id[] recentRepliesIds = Ideas.getUnreadRecentReplies(UserInfo.getUserId(), '');
               recentReplies = [SELECT Id, Title FROM Idea WHERE Id IN :recentRepliesIds];
           }
           return recentReplies;                                                                      
      }
    
    }
    
    
[/code]

The following is the markup for a Visualforce page that uses the above custom controller to list unread recent replies.
[code] <apex:page controller="IdeasController" showHeader="false">
        <apex:dataList value="{!unreadRecentReplies}" var="recentReplyIdea">
               <a href="/apex/viewIdea?id={!recentReplyIdea.Id}">
                     <apex:outputText value="{!recentReplyIdea.Title}" escape="true"/></a>
         </apex:dataList>             
    </apex:page>
    
    
[/code]

The following example uses a Visualforce page in conjunction with a custom controller to list ideas. Then, a second Visualforce page and custom controller is used to display a specific idea and mark it as read. For this example to work, there must be ideas posted to the zone.
[code] // Create a controller to use on a VisualForce page to list ideas
    public class IdeaListController {
    
        public final Idea[] ideas {get; private set;}
    
        public IdeaListController() {
            Integer i = 0;
            ideas = new Idea[10];
            for (Idea tmp : Database.query
    ('SELECT Id, Title FROM Idea WHERE Id != null AND parentIdeaId = null LIMIT 10')) {
                i++;
                ideas.add(tmp);
            }
        }
    }
    
    
[/code]

The following is the markup for a Visualforce page that uses the above custom controller to list ideas:
[code] <apex:page controller="IdeaListController" tabStyle="Idea" showHeader="false">
    
            <apex:dataList value="{!ideas}" var="idea" id="ideaList">
                <a href="/apex/viewIdea?id={!idea.id}">
    <apex:outputText value="{!idea.title}" escape="true"/></a>                       
            </apex:dataList>
    
    </apex:page>
    
[/code]

The following example also uses a Visualforce page and custom controller, this time, to display the idea that is selected on the above idea list page. In this example, the markRead method marks the selected idea and associated comments as read by the user that is currently logged in. Note that the markRead method is in the constructor so that the idea is marked read immediately when the user goes to a page that uses this controller. For this example to work, there must be ideas posted to the zone. In addition, at least one zone member must have posted a comment to another zone member's idea or comment.
[code] // Create an Apex method in the controller that marks all comments as read for the 
    // selected idea
    public class ViewIdeaController {
    
       private final String id = System.currentPage().getParameters().get('id');
    
       public ViewIdeaController(ApexPages.StandardController controller) {
                    Ideas.markRead(id);
       }
    
    }
    
[/code]

The following is the markup for a Visualforce page that uses the above custom controller to display the idea as read.
[code] <apex:page standardController="Idea" extensions="ViewIdeaController" showHeader="false">
       
         <h2><apex:outputText value="{!idea.title}" /></h2>
         <apex:outputText value="{!idea.body}" />
    
    </apex:page>
    
[/code]

Ideas Methods The following are methods for Ideas. All methods are static.
                    * **[findSimilar(idea)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_findSimilar)**  
Returns a list of similar ideas based on the title of the specified idea.
                    * **[getAllRecentReplies(userID, communityID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_getAllRecentReplies)**  
Returns ideas that have recent replies for the specified user or zone. This includes all read and unread replies.
                    * **[getReadRecentReplies(userID, communityID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_getReadRecentReplies)**  
Returns ideas that have recent replies marked as read.
                    * **[getUnreadRecentReplies(userID, communityID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_getUnreadRecentReplies)**  
Returns ideas that have recent replies marked as unread.
                    * **[markRead(ideaID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_markRead)**  
Marks all comments as read for the user that is currently logged in.
findSimilar(idea) Returns a list of similar ideas based on the title of the specified idea. Signature public static ID[] findSimilar(Idea idea) Parameters

idea
    Type: Idea
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each findSimilar call counts against the SOSL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). getAllRecentReplies(userID, communityID) Returns ideas that have recent replies for the specified user or zone. This includes all read and unread replies. Signature public static ID[] getAllRecentReplies(String userID, String communityID) Parameters

userID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
communityID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each getAllRecentReplies call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). getReadRecentReplies(userID, communityID) Returns ideas that have recent replies marked as read. Signature public static ID[] getReadRecentReplies(String userID, String communityID) Parameters

userID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
communityID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each getReadRecentReplies call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). getUnreadRecentReplies(userID, communityID) Returns ideas that have recent replies marked as unread. Signature public static ID[] getUnreadRecentReplies(String userID, String communityID) Parameters

userID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
communityID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each getUnreadRecentReplies call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). markRead(ideaID) Marks all comments as read for the user that is currently logged in. Signature public static Void markRead(String ideaID) Parameters

ideaID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Void Exception Class and Built-In Exceptions An exception denotes an error that disrupts the normal flow of code execution. You can use Apex built-in exceptions or create custom exceptions. All exceptions have common methods. All exceptions support built-in methods for returning the error message and exception type. In addition to the standard exception class, there are several different types of exceptions: The following are exceptions in the System namespace. Exception | Description  
---|---  
AssertException | A System.assert failure that halts code execution. Optionally contains the custom message specified in the last (msg) argument to the assert() method.  
AuraException | Legacy Aura-related exception. Use System.AuraHandledException instead.  
AuraHandledException | Returns a custom error message to a JavaScript controller. See [Returning Errors from an Apex Server-Side Controller](https://developer.salesforce.com/docs/atlas.en-us.258.0.lightning.meta/lightning/controllers_server_apex_custom_errors.htm "HTML \(New Window\)").  
AsyncException | Any problem with an asynchronous operation, such as failing to enqueue an asynchronous call.   
BigObjectException | Any problem with big object records, such as connection timeouts during attempts to access or insert big object records.  
CalloutException | Any problem with a Web service operation, such as failing to make a callout to an external system.  
DataWeaveScriptException | Any run-time script errors that occur within DataWeave in Apex.  
DmlException | Any problem with a DML statement, such as an insert statement missing a required field on a record.  
DuplicateMessageException | Attempt to enqueue job with duplicate queueable signature  
EmailException | Any problem with email, such as failure to deliver. For more information, see [Outbound Email](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_forcecom_email_outbound.htm).  
ExternalObjectException | Any problem with external object records, such as connection timeouts during attempts to access the data that’s stored on external systems.  
FatalCursorException | Any problem with Apex cursors in a transaction.  
FinalException | Any attempt to mutate a read-only collection or record such as an sObject in an after-update trigger, or a final variable. This exception causes execution to halt.  
FlowException | Any problem with starting flow interviews from Apex. For example, if an active version of the flow can’t be found or it can’t be started from Apex.  
HandledException | A generic handled exception.  
IllegalArgumentException | An illegal argument was provided to a method call. For example, a method that requires a non-null argument throws this exception if a null value is passed into the method.  
InvalidHeaderException | An illegal header argument was provided to an Apex REST call. For example, a call to the RestResponse.addHeader(name, value) method throws this exception if the header name is cookie.  
InvalidParameterValueException | This exception is used with both Visualforce pages and Salesforce Functions. 

Visualforce
    The exception is thrown when an invalid parameter is supplied for a method, or any problem is encountered with a URL used with Visualforce pages. For more information on Visualforce, see the [Visualforce Developer's Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/ "Adobe Acrobat PDF \(New Window\)"). 
Salesforce Functions
    The exception is thrown when the functionName parameter to Function.get() doesn’t have the correct project name.function name format. For more information on Salesforce functions, see [Function.get()](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexref.meta/apexref/apex_class_functions_Function.htm).  
LimitException | A governor limit has been exceeded. This exception can’t be caught.  
JSONException | Any problem with JSON serialization and deserialization operations. For more information, see the methods of [System.JSON](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Json.htm#apex_class_System_Json "Contains methods for serializing Apex objects into JSON format and deserializing JSON content that was serialized using the serialize method in this class."), [System.JSONParser](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_JsonParser.htm#apex_class_System_JsonParser "Represents a parser for JSON-encoded content."), and [System.JSONGenerator](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_JsonGenerator.htm#apex_class_System_JsonGenerator "Contains methods used to serialize objects into JSON content using the standard JSON encoding.").  
ListException | Any problem with a list, such as attempting to access an index that is out of bounds.  
MathException | Any problem with a mathematical operation, such as dividing by zero.  
NoAccessException | Any problem with unauthorized access, such as trying to access an sObject that the current user doesn’t have access to. This exception is used with Visualforce pages. For more information on Visualforce, see the [Visualforce Developer's Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/ "Adobe Acrobat PDF \(New Window\)").  
NoDataFoundException | This exception is used with both Visualforce pages and Salesforce Functions. 

Visualforce
    The exception is thrown with data that doesn't exist, such as trying to access an sObject that has been deleted. For more information on Visualforce, see the [Visualforce Developer's Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/ "Adobe Acrobat PDF \(New Window\)"). 
Salesforce Functions
    The exception is thrown when the project or function name provided in the functionNameIdeas Class Represents zone ideas. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage Ideas is a zone of users who post, vote for, and comment on ideas. An Ideas zone provides an online, transparent way for you to attract, manage, and showcase innovation. A set of recent replies (returned by methods, see below) includes ideas that a user posted or commented on that already have comments posted by another user. The returned ideas are listed based on the time of the last comment made by another user, with the most recent ideas appearing first. The userID argument is a required argument that filters the results so only the ideas that the specified user has posted or commented on are returned. The communityID argument filters the results so only the ideas within the specified zone are returned. If this argument is the empty string, then all recent replies for the specified user are returned regardless of the zone. For more information on ideas, see “Using Ideas” in the Salesforce online help. Example The following example finds ideas in a specific zone that have similar titles as a new idea:
[code]public class FindSimilarIdeasController {
    
       public static void test() {
          // Instantiate a new idea 
          Idea idea = new Idea ();
    
          // Specify a title for the new idea
          idea.Title = 'Increase Vacation Time for Employees';
    
          // Specify the communityID (INTERNAL_IDEAS) in which to find similar ideas. 
          Community community = [ SELECT Id FROM Community WHERE Name = 'INTERNAL_IDEAS' ];
    
          idea.CommunityId = community.Id;
    
          ID[] results = Ideas.findSimilar(idea);
       }
    }
    
[/code]

The following example uses a Visualforce page in conjunction with a custom controller, that is, a special Apex class. For more information on Visualforce, see the [Visualforce Developer's Guide](https://developer.salesforce.com/docs/atlas.en-us.258.0.pages.meta/pages/ "Adobe Acrobat PDF \(New Window\)"). This example creates an Apex method in the controller that returns unread recent replies. You can leverage this same example for the getAllRecentReplies and getReadRecentReplies methods. For this example to work, there must be ideas posted to the zone. In addition, at least one zone member must have posted a comment to another zone member's idea or comment.
[code] // Create an Apex method to retrieve the recent replies marked as unread in all communities
    public class IdeasController {
    
       public Idea[] getUnreadRecentReplies() {
           Idea[] recentReplies;
           if (recentReplies == null) {
               Id[] recentRepliesIds = Ideas.getUnreadRecentReplies(UserInfo.getUserId(), '');
               recentReplies = [SELECT Id, Title FROM Idea WHERE Id IN :recentRepliesIds];
           }
           return recentReplies;                                                                      
      }
    
    }
    
    
[/code]

The following is the markup for a Visualforce page that uses the above custom controller to list unread recent replies.
[code] <apex:page controller="IdeasController" showHeader="false">
        <apex:dataList value="{!unreadRecentReplies}" var="recentReplyIdea">
               <a href="/apex/viewIdea?id={!recentReplyIdea.Id}">
                     <apex:outputText value="{!recentReplyIdea.Title}" escape="true"/></a>
         </apex:dataList>             
    </apex:page>
    
    
[/code]

The following example uses a Visualforce page in conjunction with a custom controller to list ideas. Then, a second Visualforce page and custom controller is used to display a specific idea and mark it as read. For this example to work, there must be ideas posted to the zone.
[code] // Create a controller to use on a VisualForce page to list ideas
    public class IdeaListController {
    
        public final Idea[] ideas {get; private set;}
    
        public IdeaListController() {
            Integer i = 0;
            ideas = new Idea[10];
            for (Idea tmp : Database.query
    ('SELECT Id, Title FROM Idea WHERE Id != null AND parentIdeaId = null LIMIT 10')) {
                i++;
                ideas.add(tmp);
            }
        }
    }
    
    
[/code]

The following is the markup for a Visualforce page that uses the above custom controller to list ideas:
[code] <apex:page controller="IdeaListController" tabStyle="Idea" showHeader="false">
    
            <apex:dataList value="{!ideas}" var="idea" id="ideaList">
                <a href="/apex/viewIdea?id={!idea.id}">
    <apex:outputText value="{!idea.title}" escape="true"/></a>                       
            </apex:dataList>
    
    </apex:page>
    
[/code]

The following example also uses a Visualforce page and custom controller, this time, to display the idea that is selected on the above idea list page. In this example, the markRead method marks the selected idea and associated comments as read by the user that is currently logged in. Note that the markRead method is in the constructor so that the idea is marked read immediately when the user goes to a page that uses this controller. For this example to work, there must be ideas posted to the zone. In addition, at least one zone member must have posted a comment to another zone member's idea or comment.
[code] // Create an Apex method in the controller that marks all comments as read for the 
    // selected idea
    public class ViewIdeaController {
    
       private final String id = System.currentPage().getParameters().get('id');
    
       public ViewIdeaController(ApexPages.StandardController controller) {
                    Ideas.markRead(id);
       }
    
    }
    
[/code]

The following is the markup for a Visualforce page that uses the above custom controller to display the idea as read.
[code] <apex:page standardController="Idea" extensions="ViewIdeaController" showHeader="false">
       
         <h2><apex:outputText value="{!idea.title}" /></h2>
         <apex:outputText value="{!idea.body}" />
    
    </apex:page>
    
[/code]

Ideas Methods The following are methods for Ideas. All methods are static.
                    * **[findSimilar(idea)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_findSimilar)**  
Returns a list of similar ideas based on the title of the specified idea.
                    * **[getAllRecentReplies(userID, communityID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_getAllRecentReplies)**  
Returns ideas that have recent replies for the specified user or zone. This includes all read and unread replies.
                    * **[getReadRecentReplies(userID, communityID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_getReadRecentReplies)**  
Returns ideas that have recent replies marked as read.
                    * **[getUnreadRecentReplies(userID, communityID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_getUnreadRecentReplies)**  
Returns ideas that have recent replies marked as unread.
                    * **[markRead(ideaID)](atlas.en-us.258.0.apexref.meta/apexref/apex_classes_ideas.htm#apex_System_Ideas_markRead)**  
Marks all comments as read for the user that is currently logged in.
findSimilar(idea) Returns a list of similar ideas based on the title of the specified idea. Signature public static ID[] findSimilar(Idea idea) Parameters

idea
    Type: Idea
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each findSimilar call counts against the SOSL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). getAllRecentReplies(userID, communityID) Returns ideas that have recent replies for the specified user or zone. This includes all read and unread replies. Signature public static ID[] getAllRecentReplies(String userID, String communityID) Parameters

userID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
communityID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each getAllRecentReplies call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). getReadRecentReplies(userID, communityID) Returns ideas that have recent replies marked as read. Signature public static ID[] getReadRecentReplies(String userID, String communityID) Parameters

userID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
communityID
String userID, String communityID) Parameters

userID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
communityID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each getReadRecentReplies call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). getUnreadRecentReplies(userID, communityID) Returns ideas that have recent replies marked as unread. Signature public static ID[] getUnreadRecentReplies(String userID, String communityID) Parameters

userID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
communityID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [ID](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_id.htm#apex_methods_system_id "Contains methods for the ID primitive data type.")[] Usage Each getUnreadRecentReplies call counts against the SOQL query limits. See [Execution Governors and Limits](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_gov_limits.htm). markRead(ideaID) Marks all comments as read for the user that is currently logged in. Signature public static Void markRead(String ideaID) Parameters

ideaID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: Void
