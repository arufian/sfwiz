# B2BCheckoutController Class

B2BCheckoutController Class Communicate with simple checkout Apex methods to work with data related to B2B Commerce checkout.  Namespace [sfdc_checkout](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_sfdc_checkout.htm "The Sfdc_Checkout namespace provides an interface and classes for B2B Commerce apps in Salesforce.") Usage You must specify the sfdc_checkout namespace when creating an instance of this class.
                  * **[B2BCheckoutController Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_checkout_B2BCheckoutController.htm#apex_sfdc_checkout_B2BCheckoutController_methods)**  

B2BCheckoutController Methods The following are methods for B2BCheckoutController.
                  * **[licenseCompliance(cartId, orderId)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_sfdc_checkout_B2BCheckoutController.htm#apex_sfdc_checkout_B2BCheckoutController_licenseCompliance)**  
If you implement your own cart-to-order process without invoking the Cart to Order flow core action, you must invoke this method to correctly track your orders for GMV (Gross Merchandise Value) recognition. 
licenseCompliance(cartId, orderId) If you implement your own cart-to-order process without invoking the Cart to Order flow core action, you must invoke this method to correctly track your orders for GMV (Gross Merchandise Value) recognition.  Signature public static void licenseCompliance(String cartId, String orderId) Parameters

cartId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The cartId of a web cart from which an order is created.
orderId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The orderId of the order you created from the cart.
Return Value Type: Void
