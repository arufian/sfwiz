# OauthToken Class

OauthToken Class Contains a method to revoke OAuth access tokens and refresh tokens. This method supports opaque tokens and JSON Web Token (JWT)-based access tokens, including guest and named user JWT-based access tokens. Namespace [Auth](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_Auth.htm "The Auth namespace provides an interface and classes for single sign-on into Salesforce and session security management.") Usage When a client completes an authorization flow and is authorized to access Salesforce data, they’re issued an access token, which the client can use to make authenticated requests for protected Salesforce resources. The client can also use refresh tokens to get more access tokens. If you don’t want the client to access Salesforce data anymore, revoke its Salesforce tokens.This class is distinct from the [Auth.AuthToken](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_AuthToken.htm) class, which contains a method to revoke tokens issued by a third-party provider instead of Salesforce tokens.
          * **[OauthToken Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OauthToken.htm#apex_Auth_OauthToken_methods)**  

OauthToken Methods The following are methods for OauthToken.
          * **[revokeToken(type, authToken)](atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OauthToken.htm#apex_Auth_OauthToken_revokeToken)**  
Revokes Salesforce-issued OAuth tokens.
revokeToken(type, authToken) Revokes Salesforce-issued OAuth tokens. Signature public static Boolean revokeToken(Auth.OauthTokenType type, String authToken) Parameters

type
    Type: Auth.[OauthTokenType](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexref.meta/apexref/apex_class_Auth_OauthToken.htm)
    Specifies the type of token to be revoked. To revoke an opaque access token, use the ACCESS_TOKEN value. To revoke a refresh token and any associated access tokens, use the REFRESH_TOKEN value. To revoke a refresh token and associated access tokens, use the DELETE_TOKEN value. To revoke a JSON Web Token (JWT)-based access token, use the ORG_JWT value.
authToken
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The access token (opaque or JWT-based), refresh token, or delete token issued by Salesforce.
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") The method returns true if successful, and false if not. For invalid or expired tokens, the method returns a [NoDataFoundException](https://developer.salesforce.com/docs/atlas.en-us.258.0.apexref.meta/apexref/apex_classes_exception_methods.htm) exception.
