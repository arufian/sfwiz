# PushNotification Class

PushNotification Class PushNotification is used to configure push notifications and send them from an Apex trigger. Namespace [Messaging](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Messaging.htm "The Messaging namespace provides classes and methods for Salesforce outbound and inbound email functionality.") Example This sample Apex trigger sends push notifications to the connected app named `Test_App`, which corresponds to a mobile app on iOS mobile clients. The trigger fires after cases have been updated and sends the push notification to two users: the case owner and the user who last modified the case.
[code] trigger caseAlert on Case (after update) {    
        
        for(Case cs : Trigger.New)  
        {
            // Instantiating a notification
            Messaging.PushNotification msg = 
                new Messaging.PushNotification();
    
            // Assembling the necessary payload parameters for Apple.
            // Apple params are: 
            // (<alert text>,<alert sound>,<badge count>,
            // <free-form data>)
            // This example doesn't use badge count or free-form data.
            // The number of notifications that haven't been acted
            // upon by the intended recipient is best calculated
            // at the time of the push. This timing helps
            // ensure accuracy across multiple target devices.
            Map<String, Object> payload = 
                Messaging.PushNotificationPayload.apple(
                    'Case ' + cs.CaseNumber + ' status changed to: ' 
                    + cs.Status, '', null, null);
    
            // Adding the assembled payload to the notification
            msg.setPayload(payload);
    
            // Getting recipient users
            String userId1 = cs.OwnerId;
            String userId2 = cs.LastModifiedById;
    
            // Adding recipient users to list
            Set<String> users = new Set<String>();
            users.add(userId1);
            users.add(userId2);                       
    
            // Sending the notification to the specified app and users.
            // Here we specify the API name of the connected app.  
            msg.send('Test_App', users);
        }
    }
[/code]

                    * **[PushNotification Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_Messaging_PushNotification_constructors.htm)**  

                    * **[PushNotification Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_Messaging_PushNotification_methods.htm)**  

