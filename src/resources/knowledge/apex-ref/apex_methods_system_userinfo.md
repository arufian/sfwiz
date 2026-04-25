# UserInfo Class

UserInfo Class Contains methods for obtaining information about the context user. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") UserInfo Methods The following are methods for UserInfo. All methods are static.
                                  * **[getCurrentUvid()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getCurrentUvid)**  
Returns the context guest user’s unique visitor ID (UVID).
                                  * **[getDefaultCurrency()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getDefaultCurrency)**  
Returns the context user's default currency code for multiple currency organizations or the organization's currency code for single currency organizations.
                                  * **[getFirstName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getFirstName)**  
Returns the context user's first name
                                  * **[getLanguage()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLanguage)**  
Returns the context user's language
                                  * **[getLastName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLastName)**  
Returns the context user's last name
                                  * **[getLocale()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLocale)**  
Returns the context user's locale.
                                  * **[getName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getName)**  
Returns the context user's full name. The format of the name depends on the language preferences specified for the organization.
                                  * **[getOrganizationId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getOrganizationId)**  
Returns the context organization's ID.
                                  * **[getOrganizationName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getOrganizationName)**  
Returns the context organization's company name.
                                  * **[getProfileId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getProfileId)**  
Returns the context user's profile ID.
                                  * **[getSessionId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getSessionId)**  
Returns the session ID for the current session.
                                  * **[getTimeZone()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getTimeZone)**  
Returns the current user’s local time zone.
                                  * **[getUiTheme()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUiTheme)**  
Returns the preferred theme for the current user. Use getUiThemeDisplayed to determine the theme actually displayed to the current user.
                                  * **[getUiThemeDisplayed()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUiThemeDisplayed)**  
Returns the theme being displayed for the current user.
                                  * **[getUserEmail()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserEmail)**  
Returns the current user’s email address.
                                  * **[getUserId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserId)**  
Returns the context user's ID
                                  * **[getUserName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserName)**  
Returns the context user's login name.
                                  * **[getUserRoleId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserRoleId)**  
Returns the context user's role ID.
                                  * **[getUserType()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserType)**  
Returns the context user's type.
                                  * **[hasPackageLicense(packageId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#hasPackageLicense)**  
Returns true if the context user has a license to the managed package via a package license only. Otherwise, returns false.
                                  * **[isCurrentUserLicensed(namespace)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isCurrentUserLicensed)**  
Returns true if the context user has a license to any managed package denoted by the namespace. Otherwise, returns false.
                                  * **[isCurrentUserLicensedForPackage(packageID)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isCurrentUserLicensedForPackage)**  
Returns true if the context user has a license to the managed package denoted by the package ID. Otherwise, returns false. If the context user has access, it’s determined either via the package license or a namespace permission set license for the package namespace.
                                  * **[isMultiCurrencyOrganization()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isMultiCurrencyOrganization)**  
Specifies whether the organization uses multiple currencies.
getCurrentUvid() Returns the context guest user’s unique visitor ID (UVID). Signature public static String getCurrentUvid() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") If a UVID isn’t available, returns null. getDefaultCurrency() Returns the context user's default currency code for multiple currency organizations or the organization's currency code for single currency organizations. Signature public static String getDefaultCurrency() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage Note For Apex saved using Salesforce API version 22.0 or earlier, getDefaultCurrency returns null for single currency organizations. getFirstName() Returns the context user's first name Signature public static String getFirstName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLanguage() Returns the context user's language Signature public static String getLanguage() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLastName() Returns the context user's last name Signature public static String getLastName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLocale() Returns the context user's locale. Signature public static String getLocale() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] String result = UserInfo.getLocale();
    System.assertEquals('en_US', result);
[/code]

getName() Returns the context user's full name. The format of the name depends on the language preferences specified for the organization. Signature public static String getName() trueType:  Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage The format is one of the following: 
                                  * FirstName LastName
                                  * LastName, FirstName
getOrganizationId() Returns the context organization's ID. Signature public static String getOrganizationId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getOrganizationName() Returns the context organization's company name. Signature public static String getOrganizationName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getProfileId() Returns the context user's profile ID. Signature public static String getProfileId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getSessionId() Returns the session ID for the current session. Signature public static String getSessionId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage You can use getSessionId() both synchronously and asynchronously. In asynchronous Apex (Batch, Future, Queueable, or Scheduled Apex), this method returns the session ID only when the code is run by an active, valid user. When the code is run by an internal user, such as the automated process user or a proxy user, the method returns null. As a best practice, ensure that your code handles both cases: when a session ID is or is not available. Note If you use a JWT-based access token for session authentication, you can’t use UserInfo.getSessionId(). To use UserInfo.getSessionId(), use an opaque access token instead. Ensure that the “Issue JSON Web Token (JWT)-based access tokens for named users” setting isn’t selected for your external client app or connected app. getTimeZone() Returns the current user’s local time zone. Signature public static System.TimeZone getTimeZone() Return Value Type: [System.TimeZone](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_timezone.htm#apex_methods_system_timezone "Represents a time zone. Contains methods for creating a new time zone and obtaining time zone properties, such as the time zone ID, offset, and display name.") Example
[code] TimeZone tz = 
      UserInfo.getTimeZone();
    System.debug(
      'Display name: ' + 
      tz.getDisplayName());
    System.debug(
      'ID: ' + 
      tz.getID());
    
[/code]

getUiTheme() Returns the preferred theme for the current user. Use getUiThemeDisplayed to determine the theme actually displayed to the current user. Signature public static String getUiTheme() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The preferred theme for the current user. Valid values include:
                                  * Theme1—Obsolete Salesforce theme
                                  * Theme2—Salesforce Classic 2005 user interface theme
                                  * Theme3—Salesforce Classic 2010 user interface theme
                                  * Theme4d—Modern “Lightning Experience” Salesforce theme
                                  * Theme4t—Salesforce mobile app theme
                                  * Theme4u—Lightning Console theme
                                  * PortalDefault—Salesforce Customer Portal theme that applies to Customer Portals only and not to Experience Builder sites 
                                  * Webstore—AppExchange theme
getUiThemeDisplayed() Returns the theme being displayed for the current user. Signature public static String getUiThemeDisplayed() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The theme being displayed for the current user Valid values include:
                                  * Theme1—Obsolete Salesforce theme
                                  * Theme2—Salesforce Classic 2005 user interface theme
                                  * Theme3—Salesforce Classic 2010 user interface theme
                                  * Theme4d—Modern “Lightning Experience” Salesforce theme
                                  * Theme4t—Salesforce mobile app theme
                                  * Theme4u—Lightning Console theme
                                  * PortalDefault—Salesforce Customer Portal theme that applies to Customer Portals only and not to Experience Builder sites 
                                  * Webstore—AppExchange theme
getUserEmail() Returns the current user’s email address. Signature public static String getUserEmail() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] String emailAddress = 
      UserInfo.getUserEmail();
    System.debug(
      'Email address: ' + 
      emailAddress);
    
[/code]

getUserId() Returns the context user's ID Signature public static String getUserId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getUserName() Returns the context user's login name. Signature public static String getUserName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getUserRoleId() Returns the context user's role ID. Signature public staticUserInfo Class Contains methods for obtaining information about the context user. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") UserInfo Methods The following are methods for UserInfo. All methods are static.
                                  * **[getCurrentUvid()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getCurrentUvid)**  
Returns the context guest user’s unique visitor ID (UVID).
                                  * **[getDefaultCurrency()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getDefaultCurrency)**  
Returns the context user's default currency code for multiple currency organizations or the organization's currency code for single currency organizations.
                                  * **[getFirstName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getFirstName)**  
Returns the context user's first name
                                  * **[getLanguage()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLanguage)**  
Returns the context user's language
                                  * **[getLastName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLastName)**  
Returns the context user's last name
                                  * **[getLocale()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLocale)**  
Returns the context user's locale.
                                  * **[getName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getName)**  
Returns the context user's full name. The format of the name depends on the language preferences specified for the organization.
                                  * **[getOrganizationId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getOrganizationId)**  
Returns the context organization's ID.
                                  * **[getOrganizationName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getOrganizationName)**  
Returns the context organization's company name.
                                  * **[getProfileId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getProfileId)**  
Returns the context user's profile ID.
                                  * **[getSessionId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getSessionId)**  
Returns the session ID for the current session.
                                  * **[getTimeZone()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getTimeZone)**  
Returns the current user’s local time zone.
                                  * **[getUiTheme()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUiTheme)**  
Returns the preferred theme for the current user. Use getUiThemeDisplayed to determine the theme actually displayed to the current user.
                                  * **[getUiThemeDisplayed()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUiThemeDisplayed)**  
Returns the theme being displayed for the current user.
                                  * **[getUserEmail()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserEmail)**  
Returns the current user’s email address.
                                  * **[getUserId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserId)**  
Returns the context user's ID
                                  * **[getUserName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserName)**  
Returns the context user's login name.
                                  * **[getUserRoleId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserRoleId)**  
Returns the context user's role ID.
                                  * **[getUserType()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserType)**  
Returns the context user's type.
                                  * **[hasPackageLicense(packageId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#hasPackageLicense)**  
Returns true if the context user has a license to the managed package via a package license only. Otherwise, returns false.
                                  * **[isCurrentUserLicensed(namespace)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isCurrentUserLicensed)**  
Returns true if the context user has a license to any managed package denoted by the namespace. Otherwise, returns false.
                                  * **[isCurrentUserLicensedForPackage(packageID)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isCurrentUserLicensedForPackage)**  
Returns true if the context user has a license to the managed package denoted by the package ID. Otherwise, returns false. If the context user has access, it’s determined either via the package license or a namespace permission set license for the package namespace.
                                  * **[isMultiCurrencyOrganization()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isMultiCurrencyOrganization)**  
Specifies whether the organization uses multiple currencies.
getCurrentUvid() Returns the context guest user’s unique visitor ID (UVID). Signature public static String getCurrentUvid() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") If a UVID isn’t available, returns null. getDefaultCurrency() Returns the context user's default currency code for multiple currency organizations or the organization's currency code for single currency organizations. Signature public static String getDefaultCurrency() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage Note For Apex saved using Salesforce API version 22.0 or earlier, getDefaultCurrency returns null for single currency organizations. getFirstName() Returns the context user's first name Signature public static String getFirstName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLanguage() Returns the context user's language Signature public static String getLanguage() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLastName() Returns the context user's last name Signature public static String getLastName() Return Value Type: UserInfo Class Contains methods for obtaining information about the context user. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") UserInfo Methods The following are methods for UserInfo. All methods are static.
                                  * **[getCurrentUvid()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getCurrentUvid)**  
Returns the context guest user’s unique visitor ID (UVID).
                                  * **[getDefaultCurrency()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getDefaultCurrency)**  
Returns the context user's default currency code for multiple currency organizations or the organization's currency code for single currency organizations.
                                  * **[getFirstName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getFirstName)**  
Returns the context user's first name
                                  * **[getLanguage()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLanguage)**  
Returns the context user's language
                                  * **[getLastName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLastName)**  
Returns the context user's last name
                                  * **[getLocale()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLocale)**  
Returns the context user's locale.
                                  * **[getName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getName)**  
Returns the context user's full name. The format of the name depends on the language preferences specified for the organization.
                                  * **[getOrganizationId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getOrganizationId)**  
Returns the context organization's ID.
                                  * **[getOrganizationName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getOrganizationName)**  
Returns the context organization's company name.
                                  * **[getProfileId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getProfileId)**  
Returns the context user's profile ID.
                                  * **[getSessionId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getSessionId)**  
Returns the session ID for the current session.
                                  * **[getTimeZone()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getTimeZone)**  
Returns the current user’s local time zone.
                                  * **[getUiTheme()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUiTheme)**  
Returns the preferred theme for the current user. Use getUiThemeDisplayed to determine the theme actually displayed to the current user.
                                  * **[getUiThemeDisplayed()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUiThemeDisplayed)**  
Returns the theme being displayed for the current user.
                                  * **[getUserEmail()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserEmail)**  
Returns the current user’s email address.
                                  * **[getUserId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserId)**  
Returns the context user's ID
                                  * **[getUserName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserName)**  
Returns the context user's login name.
                                  * **[getUserRoleId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserRoleId)**  
Returns the context user's role ID.
                                  * **[getUserType()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserType)**  
Returns the context user's type.
                                  * **[hasPackageLicense(packageId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#hasPackageLicense)**  
Returns true if the context user has a license to the managed package via a package license only. Otherwise, returns false.
                                  * **[isCurrentUserLicensed(namespace)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isCurrentUserLicensed)**  
Returns true if the context user has a license to any managed package denoted by the namespace. Otherwise, returns false.
                                  * **[isCurrentUserLicensedForPackage(packageID)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isCurrentUserLicensedForPackage)**  
Returns true if the context user has a license to the managed package denoted by the package ID. Otherwise, returns false. If the context user has access, it’s determined either via the package license or a namespace permission set license for the package namespace.
                                  * **[isMultiCurrencyOrganization()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isMultiCurrencyOrganization)**  
Specifies whether the organization uses multiple currencies.
getCurrentUvid() Returns the context guest user’s unique visitor ID (UVID). Signature public static String getCurrentUvid() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") If a UVID isn’t available, returns null. getDefaultCurrency() Returns the context user's default currency code for multiple currency organizations or the organization's currency code for single currency organizations. Signature public static String getDefaultCurrency() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage Note For Apex saved using Salesforce API version 22.0 or earlier, getDefaultCurrency returns null for single currency organizations. getFirstName() Returns the context user's first name Signature public static String getFirstName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLanguage() Returns the context user's language Signature public static String getLanguage() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLastName() Returns the context user's last name Signature public static String getLastName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLocale() Returns the context user's locale. Signature public static String getLocale() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] String result = UserInfo.getLocale();
    System.assertEquals('en_US', result);[String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLocale() Returns the context user's locale. Signature public static String getLocale() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] String result = UserInfo.getLocale();
    System.assertEquals('en_US', result);
[/code]

getName() Returns the context user's full name. The format of the name depends on the language preferences specified for the organization. Signature public static String getName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage The format is one of the following: 
                                  * FirstName LastName
                                  * LastName, FirstName
getOrganizationId() Returns the context organization's ID. Signature public static String getOrganizationId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getOrganizationName() Returns the context organization's company name. Signature public static String getOrganizationName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getProfileId() Returns the context user's profile ID. Signature public static String getProfileId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getSessionId() Returns the session ID for the current session. Signature public static String getSessionId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage You can use getSessionId() both synchronously and asynchronously. In asynchronous Apex (Batch, Future, Queueable, or Scheduled Apex), this method returns the session ID only when the code is run by an active, valid user. When the code is run by an internal user, such as the automated process user or a proxy user, the method returns null. As a best practice, ensure that your code handles both cases: when a session ID is or is not available. Note If you use a JWT-based access token for session authentication, you can’t use UserInfo.getSessionId(). To use UserInfo.getSessionId(), use an opaque access token instead. Ensure that the “Issue JSON Web Token (JWT)-based access tokens for named users” setting isn’t selected for your external client app or connected app. getTimeZone() Returns the current user’s local time zone. Signature public static System.TimeZone getTimeZone() Return Value Type: [System.TimeZone](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_timezone.htm#apex_methods_system_timezone "Represents a time zone. Contains methods for creating a new time zone and obtaining time zone properties, such as the time zone ID, offset, and display name.") Example
[code] TimeZone tz = 
      UserInfo.getTimeZone();
    System.debug(
      'Display name: ' + 
      tz.getDisplayName());
    System.debug(
      'ID: ' + 
      tz.getID());
    
[/code]

getUiTheme() Returns the preferred theme for the current user. Use getUiThemeDisplayed to determine the theme actually displayed to the current user. Signature public static String getUiTheme() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The preferred theme for the current user. Valid values include:
                                  * Theme1—Obsolete Salesforce theme
                                  * Theme2—Salesforce Classic 2005 user interface theme
                                  * Theme3—Salesforce Classic 2010 user interface theme
                                  * Theme4d—Modern “Lightning Experience” Salesforce theme
                                  * Theme4t—Salesforce mobile app theme
                                  * Theme4u—Lightning Console theme
                                  * PortalDefault—Salesforce Customer Portal theme that applies to Customer Portals only and not to Experience Builder sites 
                                  * Webstore—AppExchange theme
getUiThemeDisplayed() Returns the theme being displayed for the current user. Signature public static String getUiThemeDisplayed() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The theme being displayed for the current user Valid values include:
                                  * Theme1—Obsolete Salesforce theme
                                  * Theme2—Salesforce Classic 2005 user interface theme
                                  * Theme3—Salesforce Classic 2010 user interface theme
                                  * Theme4d—Modern “Lightning Experience” Salesforce theme
                                  * Theme4t—Salesforce mobile app theme
                                  * Theme4u—Lightning Console theme
                                  * PortalDefault—Salesforce Customer Portal theme that applies to Customer Portals only and not to Experience Builder sites 
                                  * Webstore—AppExchange theme
getUserEmail() Returns the current user’s email address. Signature public static String getUserEmail() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] String emailAddress = 
      UserInfo.getUserEmail();
    System.debug(
      'Email address: ' + 
      emailAddress);
    
[/code]

Be cautious if you specify 
[/code]

getName() Returns the context user's full name. The format of the name depends on the language preferences specified for the organization. Signature public static String getName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage The format is one of the following: 
                                  * FirstName LastName
                                  * LastName, FirstName
getOrganizationId() Returns the context organization's ID. Signature public static String getOrganizationId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getOrganizationName() Returns the context organization's company name. Signature public static String getOrganizationName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getProfileId() Returns the context user's profile ID. Signature public static String getProfileId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getSessionId() Returns the session ID for the current session. Signature public static String getSessionId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage You can use getSessionId() both synchronously and asynchronously. In asynchronous Apex (Batch, Future, Queueable, or Scheduled Apex), this method returns the session ID only when the code is run by an active, valid user. When the code is run by an internal user, such as the automated process user or a proxy user, the method returns null. As a best practice, ensure that your code handles both cases: when a session ID is or is not available. Note If you use a JWT-based access token for session authentication, you can’t use UserInfo.getSessionId(). To use UserInfo.getSessionId(), use an opaque access token instead. Ensure that the “Issue JSON Web Token (JWT)-based access tokens for named users” setting isn’t selected for your external client app or connected app. getTimeZone() Returns the current user’s local time zone. Signature public static System.TimeZone getTimeZone() Return Value Type: [System.TimeZone](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_timezone.htm#apex_methods_system_timezone "Represents a time zone. Contains methods for creating a new time zone and obtaining time zone properties, such as the time zone ID, offset, and display name.") Example
[code] TimeZone tz = 
      UserInfo.getTimeZone();
    System.debug(
      'Display name: ' + 
      tz.getDisplayName());
    System.debug(
      'ID: ' + 
      tz.getID());
    
[/code]

getUiTheme() Returns the preferred theme for the current user. Use getUiThemeDisplayed to determine the theme actually displayed to the current user. Signature public static String getUiTheme() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The preferred theme for the current user. Valid values include:
                                  * Theme1—Obsolete Salesforce theme
                                  * Theme2—Salesforce Classic 2005 user interface theme
                                  * Theme3—Salesforce Classic 2010 user interface theme
                                  * Theme4d—Modern “Lightning Experience” Salesforce theme
                                  * Theme4t—Salesforce mobile app theme
                                  * Theme4u—Lightning Console theme
                                  * PortalDefault—Salesforce Customer Portal theme that applies to Customer Portals only and not to Experience Builder sites 
                                  * Webstore—AppExchange theme
getUiThemeDisplayed() Returns the theme being displayed for the current user. Signature public static String getUiThemeDisplayed() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The theme being displayed for the current user Valid values include:
                                  * Theme1—Obsolete Salesforce theme
                                  * Theme2—Salesforce Classic 2005 user interface theme
                                  * Theme3—Salesforce Classic 2010 user interface theme
                                  * Theme4d—Modern “Lightning Experience” Salesforce theme
                                  * Theme4t—Salesforce mobile app theme
                                  * Theme4u—Lightning Console theme
                                  * PortalDefault—Salesforce Customer Portal theme that applies to Customer Portals only and not to Experience Builder sites 
                                  * Webstore—AppExchange theme
getUserEmail() Returns the current user’s email address. Signature public static String getUserEmail() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] String emailAddress = 
      UserInfo.getUserEmail();
    System.debug(
      'Email address: ' + 
      emailAddress);
    
[/code]

getUserId() Returns the context user's ID Signature public static String getUserId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getUserName() Returns the context user's login name. Signature public staticUserInfo Class Contains methods for obtaining information about the context user. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") UserInfo Methods The following are methods for UserInfo. All methods are static.
                                  * **[getCurrentUvid()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getCurrentUvid)**  
Returns the context guest user’s unique visitor ID (UVID).
                                  * **[getDefaultCurrency()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getDefaultCurrency)**  
Returns the context user's default currency code for multiple currency organizations or the organization's currency code for single currency organizations.
                                  * **[getFirstName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getFirstName)**  
Returns the context user's first name
                                  * **[getLanguage()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLanguage)**  
Returns the context user's language
                                  * **[getLastName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLastName)**  
Returns the context user's last name
                                  * **[getLocale()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getLocale)**  
Returns the context user's locale.
                                  * **[getName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getName)**  
Returns the context user's full name. The format of the name depends on the language preferences specified for the organization.
                                  * **[getOrganizationId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getOrganizationId)**  
Returns the context organization's ID.
                                  * **[getOrganizationName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getOrganizationName)**  
Returns the context organization's company name.
                                  * **[getProfileId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getProfileId)**  
Returns the context user's profile ID.
                                  * **[getSessionId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getSessionId)**  
Returns the session ID for the current session.
                                  * **[getTimeZone()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getTimeZone)**  
Returns the current user’s local time zone.
                                  * **[getUiTheme()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUiTheme)**  
Returns the preferred theme for the current user. Use getUiThemeDisplayed to determine the theme actually displayed to the current user.
                                  * **[getUiThemeDisplayed()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUiThemeDisplayed)**  
Returns the theme being displayed for the current user.
                                  * **[getUserEmail()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserEmail)**  
Returns the current user’s email address.
                                  * **[getUserId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserId)**  
Returns the context user's ID
                                  * **[getUserName()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserName)**  
Returns the context user's login name.
                                  * **[getUserRoleId()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserRoleId)**  
Returns the context user's role ID.
                                  * **[getUserType()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_getUserType)**  
Returns the context user's type.
                                  * **[hasPackageLicense(packageId)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#hasPackageLicense)**  
Returns true if the context user has a license to the managed package via a package license only. Otherwise, returns false.
                                  * **[isCurrentUserLicensed(namespace)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isCurrentUserLicensed)**  
Returns true if the context user has a license to any managed package denoted by the namespace. Otherwise, returns false.
                                  * **[isCurrentUserLicensedForPackage(packageID)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isCurrentUserLicensedForPackage)**  
Returns true if the context user has a license to the managed package denoted by the package ID. Otherwise, returns false. If the context user has access, it’s determined either via the package license or a namespace permission set license for the package namespace.
                                  * **[isMultiCurrencyOrganization()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_userinfo.htm#apex_System_UserInfo_isMultiCurrencyOrganization)**  
Specifies whether the organization uses multiple currencies.
getCurrentUvid() Returns the context guest user’s unique visitor ID (UVID). Signature public static String getCurrentUvid() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") If a UVID isn’t available, returns null. getDefaultCurrency() Returns the context user's default currency code for multiple currency organizations or the organization's currency code for single currency organizations. Signature public static String getDefaultCurrency() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage Note For Apex saved using Salesforce API version 22.0 or earlier, getDefaultCurrency returns null for single currency organizations. getFirstName() Returns the context user's first name Signature public static String getFirstName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLanguage() Returns the context user's language Signature public static String getLanguage() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLastName() Returns the context user's last name Signature public static String getLastName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getLocale() Returns the context user's locale. Signature public static String getLocale() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Example
[code] String result = UserInfo.getLocale();
    System.assertEquals('en_US', result);
[/code]

getName() Returns the context user's full name. The format of the name depends on the language preferences specified for the organization. Signature public static String getName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage The format is one of the following: 
                                  * FirstName LastName
                                  * LastName, FirstName
getOrganizationId() Returns the context organization's ID. Signature public static String getOrganizationId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getOrganizationName() Returns the context organization's company name. Signature public static String getOrganizationName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getProfileId() Returns the context user's profile ID. Signature public static String getProfileId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getSessionId() Returns the session ID for the current session. Signature public static String getSessionId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") Usage You can use getSessionId() both synchronously and asynchronously. In asynchronous Apex (Batch, Future, Queueable, or Scheduled Apex), this method returns the session ID only when the code is run by an active, valid user. When the code is run by an internal user, such as the automated process user or a proxy user, the method returns null. As a best practice, ensure that your code handles both cases: when a session ID is or is not available. Note If you use a JWT-based access token for session authentication, you can’t use UserInfo.getSessionId(). To use UserInfo.getSessionId(), use an opaque access token instead. Ensure that the “Issue JSON Web Token (JWT)-based access tokens for named users” setting isn’t selected for your external client app or connected app. getTimeZone() Returns the current user’s local time zone. Signature public static System.TimeZone getTimeZone() Return Value Type: [System.TimeZone](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_timezone.htm#apex_methods_system_timezone "Represents a time zone. Contains methods for creating a new time zone and obtaining time zone properties, such as the time zone ID, offset, and display name.") Example
[code] TimeZone tz = 
      UserInfo.getTimeZone();
    System.debug(
      'Display name: ' + 
      tz.getDisplayName());
    System.debug(
      'ID: ' + 
      tz.getID());
    
[/code]

getUiTheme() Returns the preferred theme for the current user. Use getUiThemeDisplayed to determine the theme actually displayed to the current user. Signature public static String getUiTheme() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The preferred theme for the current user. Valid values include:
                                  * Theme1—Obsolete Salesforce theme
                                  * Theme2—Salesforce Classic 2005 user interface theme
                                  * Theme3—Salesforce Classic 2010 user interface theme
                                  * Theme4d—Modern “Lightning Experience” Salesforce theme
                                  * Theme4t—Salesforce mobile app theme
                                  * Theme4u—Lightning Console theme
                                  * PortalDefault—Salesforce Customer Portal theme that applies to Customer Portals only and not to Experience Builder sites 
                                  * Webstore—AppExchange theme
getUiThemeDisplayed() Returns the theme being displayed for the current user. Signature public static String getUiThemeDisplayed() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") The theme being displayed for the current user Valid values include:
                                  * Theme1—Obsolete Salesforce theme
                                  * Theme2—Salesforce Classic 2005 user interface theme
                                  * Theme3—Salesforce Classic 2010 user interface theme
                                  * Theme4d—Modern “Lightning Experience” Salesforce theme
                                  * Theme4t—Salesforce mobile app theme
                                  * Theme4u—Lightning Console theme
                                  * PortalDefault—Salesforce Customer Portal theme that applies to Customer Portals only and not to Experience Builder sites 
                                  * String getUserName() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getUserRoleId() Returns the context user's role ID. Signature public static String getUserRoleId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getUserType() Returns the context user's type. Signature public static String getUserType() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") hasPackageLicense(packageId) Returns true if the context user has a license to the managed package via a package license only. Otherwise, returns false. Signature public static Boolean hasPackageLicense(ID packageID) Parameters

packageID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") isCurrentUserLicensed(namespace) Returns true if the context user has a license to any managed package denoted by the namespace. Otherwise, returns false. Signature public static Boolean isCurrentUserLicensed(String namespace) Parameters

namespace
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage A TypeException is thrown if namespace is an invalid type. isCurrentUserLicensedForPackage(packageID) Returns true if the context user has a license to the managed package denoted by the package ID. Otherwise, returns false. If the context user has access, it’s determined either via the package license or a namespace permission set license for the package namespace. Signature public static Boolean isCurrentUserLicensedForPackage(ID packageID) Parameters

packageID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage Retrieve packageID at runtime, with the [getCurrentPackageId()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_system_Packaging.htm#apex_System_Packaging_getCurrentPackageId "Returns the context packageID in managed and unlocked packages.") method. Then, use packageId to confirm that the contextual user is licensed to use that managed package. A TypeException is thrown if packageID is an invalid type or is the ID of an unlocked or unmanaged package. See Also
                                    * [_Set Up and Maintain Your Salesforce Organization_ : Manage Licenses for Installed Packages](https://help.salesforce.com/s/articleView?id=sf.distribution_managing_licenses.htm&language=en_US "Set Up and Maintain Your Salesforce Organization: Manage Licenses for Installed Packages - HTML \(New Window\)")
isMultiCurrencyOrganization() Specifies whether the organization uses multiple currencies. Signature public static Boolean isMultiCurrencyOrganization() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") URL Class Represents a uniform resource locator (URL) and provides access to parts of the URL. Enables access to the base URL used to access your Salesforce org. Namespace [System](atlas.en-us.258.0.apexref.meta/apexref/apex_namespace_System.htm "The System namespace provides classes and methods for core Apex functionality.") Usage Use the methods of the System.URL class to create links to objects in your organization. Such objects can be files, images, logos, or records that you want to include in external emails, in activities, or in Chatter posts. For example, you can create a link to a file uploaded as an attachment to a Chatter post by concatenating the Salesforce base URL with the file ID:
[code]// Get a file uploaded through Chatter.
    ContentDocument doc = [SELECT Id FROM ContentDocument 
              WHERE Title = 'myfile'];
    // Create a link to the file.
    String fullFileURL = URL.getOrgDomainURL().toExternalForm() +
       '/' + doc.id;
    system.debug(fullFileURL);
[/code]

The following example creates a link to a Salesforce record. The full URL is created by concatenating the Salesforce base URL with the record ID.
[code]Account acct = [SELECT Id FROM Account WHERE Name = 'Acme' LIMIT 1];
    String fullRecordURL = URL.getOrgDomainURL().toExternalForm() + '/' + acct.Id;
[/code]

Example In this example, the base URL and the full request URL of the current Salesforce server instance are retrieved. Next, a URL pointing to a specific account object is created. Finally, components of the base and full URL are obtained. This example prints out all the results to the debug log output.
[code]// Create a new account called Acme that we will create a link for later.
    Account myAccount = new Account(Name='Acme');
    insert myAccount;
    
    // Get the base URL.
    String sfdcBaseURL = URL.getOrgDomainURL().toExternalForm();
    System.debug('Base URL: ' + sfdcBaseURL );       
    
    // Get the URL for the current request.
    String currentRequestURL = URL.getCurrentRequestUrl().toExternalForm();
    System.debug('Current request URL: ' + currentRequestURL);        
    
    // Create the account URL from the base URL.
    String accountURL = URL.getOrgDomainURL().toExternalForm() + 
                           '/' + myAccount.Id;
    System.debug('URL of a particular account: ' + accountURL); 
    
    // Get some parts of the base URL.
    System.debug('Host: ' + URL.getOrgDomainURL().getHost());   
    System.debug('Protocol: ' + URL.getOrgDomainURL().getProtocol());
    
    // Get the query string of the current request.
    System.debug('Query: ' + URL.getCurrentRequestUrl().getQuery());
[/code]

Versioned Behavior Changes In API version 41.0 and later, Apex URL objects are represented by the java.net.URI type, not the java.net.URL type. The API version in which the URL object was instantiated determines the behavior of subsequent method calls to the specific instance. Salesforce strongly encourages you to use API 41.0 and later versions for fully RFC-compliant URL parsing that includes proper handling of edge cases of complex URL structures. API 41.0 and later versions also enforce that inputs are valid, RFC-compliant URL or URI strings.
                                    * **[URL Constructors](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_constructors)**  

                                    * **[URL Methods](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_methods)**  

See Also
                                    * [DomainCreator Class](atlas.en-us.258.0.apexref.meta/apexref/apex_class_System_DomainCreator.htm#apex_class_System_DomainCreator "Use the DomainCreator class to return a hostname specific to the org. For example, get the org’s Visualforce hostname. Values are returned as a hostname, such as MyDomainName.lightning.force.com.")
URL Constructors The following are constructors for URL.
                                    * **[Url(spec)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_Url_ctor_4)**  
Creates a new instance of the URL class using the specified string representation of the URL.
                                    * **[Url(context, spec)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_Url_ctor_3)**  
Creates a new instance of the URL class by parsing the specified spec within the specified context.
                                    * **[Url(protocol, host, file)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_Url_ctor_2)**  
Creates a new instance of the URL class using the specified protocol, host, and file on the host. The default port for the specified protocol is used. 
                                    * **[Url(protocol, host, port, file)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_Url_ctor)**  
Creates a new instance of the URL class using the specified protocol, host, port, and file on the host.
Url(spec) Creates a new instance of the URL class using the specified string representation of the URL. Signature public Url(String spec) Parameters

spec
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string to parse as a URL.
Url(context, spec) Creates a new instance of the URL class by parsing the specified spec within the specified context. Signature public Url(Url context, String spec) Parameters

context
    Type: URL
    The context in which to parse the specification.
spec
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The string to parse as a URL.
Usage The new URL is created from the given context URL and the spec argument as described in RFC2396 "Uniform Resource Identifiers : Generic * Syntax" :
[code]<scheme>://<authority><path>?<query>#<fragment>
[/code]

For more information about the arguments of this constructor, see the corresponding [URL(java.net.URL, java.lang.String)](http://download.oracle.com/javase/6/docs/api/java/net/URL.html#URL%28java.net.URL,%20java.lang.String%29 "HTML \(New Window\)") constructor for Java. Url(protocol, host, file) Creates a new instance of the URL class using the specified protocol, host, and file on the host. The default port for the specified protocol is used.  Signature public Url(String protocol, String host, String file) Parameters

protocol
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The protocol name for this URL.
host
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The host name for this URL.
file
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The file name for this URL.
Url(protocol, host, port, file) Creates a new instance of the URL class using the specified protocol, host, port, and file on the host. Signature public Url(String protocol, String host, Integer port, String file) Parameters

protocol
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The protocol name for this URL.
host
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The host name for this URL.
port
    Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.")
    The port number for this URL.
file
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    The file name for this URL.
URL Methods The following are methods for URL.
                                    * **[getAuthority()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getAuthority)**  
Returns the authority portion of the current URL.
                                    * **[getCurrentRequestUrl()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getCurrentRequestUrl)**  
Returns the URL of an entire request on a Salesforce instance.
                                    * **[getDefaultPort()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getDefaultPort)**  
Returns the default port number of the protocol associated with the current URL.
                                    * **[getFile()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getFile)**  
Returns the file name of the current URL.
                                    * **[getFileFieldURL(entityId, fieldName)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getFileFieldURL)**  
Returns the download URL for a file attachment.
                                    * **[getHost()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getHost)**  
Returns the host name of the current URL.
                                    * **[getOrgDomainUrl()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_Url_getOrgDomainUrl)**  
Returns the canonical URL for your org. For example, https://MyDomainName.my.salesforce.com.
                                    * **[getPath()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getPath)**  
Returns the path portion of the current URL.
                                    * **[getPort()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getPort)**  
Returns the port of the current URL.
                                    * **[getProtocol()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getProtocol)**  
Returns the protocol name of the current URL, such as, https.
                                    * **[getQuery()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getQuery)**  
Returns the query portion of the current URL.
                                    * **[getRef()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getRef)**  
Returns the anchor of the current URL. 
                                    * **[getSalesforceBaseUrl()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getSalesforceBaseUrl)**  
In API version 59.0 and later, this method is deprecated and versioned out. Use getOrgDomainUrl() to get the canonical URL for your org or use getCurrentRequestUrl() to get the URL of an entire request on a Salesforce instance. Returns the URL of the current connection to the Salesforce org.
                                    * **[getUserInfo()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_getUserInfo)**  
Gets the UserInfo portion of the current URL.
                                    * **[sameFile(URLToCompare)](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_sameFile)**  
Compares the current URL with the specified URL object, excluding the fragment component.
                                    * **[toExternalForm()](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_url.htm#apex_System_URL_toExternalForm)**  
Returns a string representation of the current URL.
getAuthority() Returns the authority portion of the current URL. Signature public String getAuthority() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getCurrentRequestUrl() Returns the URL of an entire request on a Salesforce instance. Signature public static System.URL getCurrentRequestUrl() Return Value Type: System.URL Usage An example of a URL for an entire request is https://yourInstance.salesforce.com/apex/myVfPage.apexp. getDefaultPort() Returns the default port number of the protocol associated with the current URL. Signature public Integer getDefaultPort() Return Value Type: [Integer](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_integer.htm#apex_methods_system_integer "Contains methods for the Integer primitive data type.") Usage Returns -1 if the URL scheme or the stream protocol handler for the URL doesn't define a default port number. getFile() Returns the file name of the current URL. Signature public String getFile() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getFileFieldURL(entityId, fieldName) Returns the download URL for a file attachment. Signature public static String getFileFieldURL(String entityId, String fieldName) Parameters

entityId
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Specifies the ID of the entity that holds the file data.
fieldName
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
    Specifies the API name of a file field component, such as AttachmentBody String getUserRoleId() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") getUserType() Returns the context user's type. Signature public static String getUserType() Return Value Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.") hasPackageLicense(packageId) Returns true if the context user has a license to the managed package via a package license only. Otherwise, returns false. Signature public static Boolean hasPackageLicense(ID packageID) Parameters

packageID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") isCurrentUserLicensed(namespace) Returns true if the context user has a license to any managed package denoted by the namespace. Otherwise, returns false. Signature public static Boolean isCurrentUserLicensed(String namespace) Parameters

namespace
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage A TypeException is thrown if namespace is an invalid type. isCurrentUserLicensedForPackage(packageID) Returns true if the context user has a license to the managed package denoted by the package ID. Otherwise, returns false. If the context user has access, it’s determined either via the package license or a namespace permission set license for the package namespace. Signature public static Boolean isCurrentUserLicensedForPackage(ID packageID) Parameters

packageID
    Type: [String](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_string.htm#apex_methods_system_string "Contains methods for the String primitive data type.")
Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.") Usage Retrieve packageID at runtime, with the [getCurrentPackageId()](atlas.en-us.258.0.apexref.meta/apexref/apex_class_system_Packaging.htm#apex_System_Packaging_getCurrentPackageId "Returns the context packageID in managed and unlocked packages.") method. Then, use packageId to confirm that the contextual user is licensed to use that managed package. A TypeException is thrown if packageID is an invalid type or is the ID of an unlocked or unmanaged package. See Also
                                    * [_Set Up and Maintain Your Salesforce Organization_ : Manage Licenses for Installed Packages](https://help.salesforce.com/s/articleView?id=sf.distribution_managing_licenses.htm&language=en_US "Set Up and Maintain Your Salesforce Organization: Manage Licenses for Installed Packages - HTML \(New Window\)")
isMultiCurrencyOrganization() Specifies whether the organization uses multiple currencies. Signature public static Boolean isMultiCurrencyOrganization() Return Value Type: [Boolean](atlas.en-us.258.0.apexref.meta/apexref/apex_methods_system_boolean.htm#apex_methods_system_boolean "Contains methods for the Boolean primitive data type.")
