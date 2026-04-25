# Packaging Class

Packaging Class Contains a method for obtaining information about managed and unlocked packages. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage In the context of a package, use the getCurrentPackageId method to retrieve the packageID.
                  * **[Packaging Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_system_Packaging.htm#apex_System_Packaging_methods)**  

Packaging Methods The following are methods for Packaging.
                  * **[getCurrentPackageId()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_system_Packaging.htm#apex_System_Packaging_getCurrentPackageId)**  
Returns the context packageID in managed and unlocked packages.
getCurrentPackageId() Returns the context packageID in managed and unlocked packages. Signature public String getCurrentPackageId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage For managed packages, this method can be combined with isCurrentUserLicensedForPackage(packageId) to retrieve the packageId at runtime. Then, use packageId to confirm that the contextual user is licensed to use that managed package.
