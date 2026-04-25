# Queueable Interface

Queueable Interface Enables the asynchronous execution of Apex jobs that can be monitored. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage To execute Apex as an asynchronous job, implement the Queueable interface and add the processing logic in your implementation of the execute method. To implement the Queueable interface, you must first declare a class with the implements keyword as follows: 
[code]public class MyQueueableClass **implements Queueable** {
[/code]

Next, your class must provide an implementation for the following method:
[code]public void execute(QueueableContext context) {
        // Your code here
    }
[/code]

Your class and method implementation must be declared as public or global. To submit your class for asynchronous execution, call the System.enqueueJob by passing it an instance of your class implementation of the Queueable interface as follows:
[code] ID jobID = System.enqueueJob(new MyQueueableClass());
[/code]

            * **[Queueable Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Queueable.htm#apex_System_Queueable_methods)**  

            * **[Queueable Example Implementation](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Queueable.htm#apex_Queueable_example)**  

See Also
            * [_Apex Developer Guide_ : Queueable Apex](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexcode.meta/apexcode/apex_queueing_jobs.htm "Apex Developer Guide: Queueable Apex - HTML \(New Window\)")
Queueable Methods The following are methods for Queueable.
            * **[execute(context)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_Queueable.htm#apex_System_Queueable_execute)**  
Executes the queueable job.
execute(context) Executes the queueable job. Signature public void execute(QueueableContext context) Parameters

context
    Type: [QueueableContext](atlas.en-us.258.0.apexref.meta/apexref/apex_interface_system_queueablecontext.htm#apex_interface_system_queueablecontext "Represents the parameter type of the execute\(\) method in a class that implements the Queueable interface and contains the job ID. This interface is implemented internally by Apex.")
    Contains the job ID.
Return Value Type: Void Queueable Example Implementation This example is an implementation of the Queueable interface. The execute method in this example inserts a new account.
[code]public class AsyncExecutionExample implements Queueable {
        public void execute(QueueableContext context) {
            Account a = new Account(Name='Acme',Phone='(415) 555-1212');
            insert a;        
        }
    }
[/code]

To add this class as a job on the queue, call this method:
[code]ID jobID = System.enqueueJob(new AsyncExecutionExample());
[/code]

After you submit your queueable class for execution, the job is added to the queue and will be processed when system resources become available. You can monitor the status of your job programmatically by querying AsyncApexJob or through the user interface in Setup by entering `Apex Jobs` in the Quick Find box, then selecting **Apex Jobs**. To query information about your submitted job, perform a SOQL query on AsyncApexJob by filtering on the job ID that the System.enqueueJob method returns. This example uses the jobID variable that was obtained in the previous example.
[code] AsyncApexJob jobInfo = [SELECT Status,NumberOfErrors FROM AsyncApexJob WHERE Id=:jobID];
[/code]

Similar to future jobs, queueable jobs don’t process batches, and so the number of processed batches and the number of total batches are always zero. Testing Queueable Jobs This example shows how to test the execution of a queueable job in a test method. A queueable job is an asynchronous process. To ensure that this process runs within the test method, the job is submitted to the queue between the Test.startTest and Test.stopTest block. The system executes all asynchronous processes started in a test method synchronously after the Test.stopTest statement. Next, the test method verifies the results of the queueable job by querying the account that the job created.
[code]@isTest
    public class AsyncExecutionExampleTest {
        static testmethod void test1() {
            // startTest/stopTest block to force async processes 
            //   to run in the test.
            Test.startTest();        
            System.enqueueJob(new AsyncExecutionExample());
            Test.stopTest();
            
            // Validate that the job has run
            // by verifying that the record was created.
            // This query returns only the account created in test context by the 
            // Queueable class method.
            Account acct = [SELECT Name,Phone FROM Account WHERE Name='Acme' LIMIT 1];
            System.assertNotEquals(null, acct);
            System.assertEquals('(415) 555-1212', acct.Phone);
        }
    }
[/code]

Note The ID of a queueable Apex job isn’t returned in test context—System.enqueueJob returns null in a running test.
