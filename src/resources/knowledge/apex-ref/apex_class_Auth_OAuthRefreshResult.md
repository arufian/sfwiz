# OAuthRefreshResult Class

# OAuthRefreshResult Class

  
  
  
Stores the result of an `AuthProviderPluginClass`
    refresh method. OAuth authentication flow provides a refresh token that can be used to get a new
    access token. Access tokens have a limited lifetime as specified by the session timeout value.
    When an access token expires, use a refresh token to get a new access token.

    
## Namespace

      
      [Auth](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Auth.htm)

    

    
## Usage

      
      The `OAuthRefreshResult` class contains the
        parameters, `accessToken`, `refreshToken`, and `error`, all of which are of type `string`.
        For a code example, see .

    

  

- 
**[OAuthRefreshResult Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OAuthRefreshResult.htm#apex_Auth_OAuthRefreshResult_constructors)**

- 
**[OAuthRefreshResult Properties](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OAuthRefreshResult.htm#apex_Auth_OAuthRefreshResult_properties)**

## OAuthRefreshResult Constructors

The following are constructors for `OAuthRefreshResult`.

- 
**[OAuthRefreshResult(accessToken, refreshToken, error)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OAuthRefreshResult.htm#apex_Auth_OAuthRefreshResult_ctor)**

Creates an instance of the `OAuthRefreshResult` class using the specified access token, refresh token, and       error for a custom authentication provider plug-in.

- 
**[OAuthRefreshResult(accessToken, refreshToken)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OAuthRefreshResult.htm#apex_Auth_OAuthRefreshResult_ctor_2)**

Creates an instance of the `OAuthRefreshResult` class using the specified access token and refresh token for a       custom authentication provider plug-in. Use this method when you know that the refresh was       successful. 

### OAuthRefreshResult(accessToken, refreshToken, error)

Creates an instance of the `OAuthRefreshResult` class using the specified access token, refresh token, and
      error for a custom authentication provider plug-in.

#### Signature

`public OAuthRefreshResult(String accessToken, String refreshToken, String error)`

#### Parameters

accessToken
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

OAuth access token for the user who is currently logged in.
refreshToken
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

OAuth refresh token for the user who is currently logged in.
error
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

Error that occurred when a user attempted to authenticate with the custom authentication
            provider.

### OAuthRefreshResult(accessToken, refreshToken)

Creates an instance of the `OAuthRefreshResult` class using the specified access token and refresh token for a
      custom authentication provider plug-in. Use this method when you know that the refresh was
      successful. 

#### Signature

`public OAuthRefreshResult(String accessToken, String refreshToken)`

#### Parameters

accessToken
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

The OAuth access token for the user who is logged in.
refreshToken
Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

The OAuth refresh token for the user who is logged in.

## OAuthRefreshResult Properties

The following are properties for `OAuthRefreshResult`.

- 
**[accessToken](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OAuthRefreshResult.htm#apex_Auth_OAuthRefreshResult_accessToken)**

The OAuth access token for the user who is currently logged in.     

- 
**[error](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OAuthRefreshResult.htm#apex_Auth_OAuthRefreshResult_error)**

Error that occurs when a user unsuccessfully attempts to authenticate       with the custom authentication provider.

- 
**[refreshToken](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OAuthRefreshResult.htm#apex_Auth_OAuthRefreshResult_refreshToken)**

The OAuth refresh token for the user who is currently logged in.     

### accessToken

The OAuth access token for the user who is currently logged in.
    

#### Signature

`public String accessToken {get; set;}`

#### Property Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### error

Error that occurs when a user unsuccessfully attempts to authenticate
      with the custom authentication provider.

#### Signature

`public String error {get; set;}`

#### Property Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)

### refreshToken

The OAuth refresh token for the user who is currently logged in.
    

#### Signature

`public String refreshToken {get; set;}`

#### Property Value

Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string)