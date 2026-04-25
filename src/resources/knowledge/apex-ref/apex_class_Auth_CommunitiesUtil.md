# CommunitiesUtil Class

# CommunitiesUtil Class

  

Contains methods for getting information about an
      Experience  Cloud user.

    
## Namespace

      
      [Auth](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Auth.htm)

    

    
## Example

      
      The following example directs a guest (unauthenticated) user to one page, and authenticated
        users of the Experience Cloud site’s parent organization to another
        page.
```
if (Auth.CommunitiesUtil.isGuestUser())
    // Redirect to the login page if user is an unauthenticated user
    return new PageReference(LOGIN_URL);       

if (Auth.CommunitiesUtil.isInternalUser())
    // Redirect to the home page if user is an internal user
    return new PageReference(HOME_URL);       
```

    

    
  

## CommunitiesUtil Methods

The following are methods for `CommunitiesUtil`. All
                methods are static.

- 
**[getLogoutUrl()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_CommunitiesUtil.htm#apex_Auth_CommunitiesUtil_getLogoutUrl)**

Returns the page to display after the current Experience    Cloud user logs out.

- 
**[getUserDisplayName()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_CommunitiesUtil.htm#apex_Auth_CommunitiesUtil_getUserDisplayName)**

Returns the current user’s Experience Cloud display    name.

- 
**[isGuestUser()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_CommunitiesUtil.htm#apex_Auth_CommunitiesUtil_isGuestUser)**

Indicates whether the current user isn’t logged in to the       Experience Cloud site. Redirect the user to log in, if necessary.

- 
**[isInternalUser()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_CommunitiesUtil.htm#apex_Auth_CommunitiesUtil_isInternalUser)**

Indicates whether the current user is logged in as a       member of the parent Salesforce organization, such as an employee.

### getLogoutUrl()

 

Returns the page to display after the current Experience
   Cloud user logs out.

#### Signature

`public static String getLogoutUrl()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### getUserDisplayName()

 

Returns the current user’s Experience Cloud display
   name.

#### Signature

`public static String getUserDisplayName()`

#### Return Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

  ### isGuestUser()

  

Indicates whether the current user isn’t logged in to the
      Experience Cloud site. Redirect the user to log in, if necessary.

  
#### Signature

`public static Boolean isGuestUser()`

  
#### Return Value

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)

 

  ### isInternalUser()

  

Indicates whether the current user is logged in as a
      member of the parent Salesforce organization, such as an employee.

  
#### Signature

`public static Boolean isInternalUser()`

  
#### Return Value

Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean)