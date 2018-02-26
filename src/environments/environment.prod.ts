import { AuthConfig } from 'angular-oauth2-oidc';

let baseURL = 'https://api.medunigraz.at/';

export const environment = {
  production: false,
  apiURL: baseURL + 'v1/'
};

export const auth: AuthConfig = {
  'clientId': 'QaTbEtZOB4H50qe0mlvA87FwrVyFsx3y4BqjPJ2c',
  'redirectUri': 'https://crates.medunigraz.at/',
  'loginUrl': baseURL + 'oauth2/authorize/',
  'postLogoutRedirectUri': '',
  'scope': 'media',
  'resource': '',
  'rngUrl': '',
  'oidc': false,
  'requestAccessToken': true,
  'options': null,
  'clearHashAfterLogin': true,
  'tokenEndpoint': baseURL + 'oauth2/token/',
  'responseType': 'token',
  'showDebugInformation': true,
  'silentRefreshRedirectUri': 'https://crates.medunigraz.at/silent-refresh.html',
  'silentRefreshMessagePrefix': '',
  'silentRefreshShowIFrame': false,
  'silentRefreshTimeout': 20000,
  'dummyClientSecret': null,
  'requireHttps': false,
  'strictDiscoveryDocumentValidation': false,
  'customQueryParams': null,
  'silentRefreshIFrameName': 'angular-oauth-oidc-silent-refresh-iframe',
  'timeoutFactor': 0.75,
  'sessionCheckIntervall': 3000,
  'sessionCheckIFrameName': 'angular-oauth-oidc-check-session-iframe',
  'disableAtHashCheck': false,
  'skipSubjectCheck': false
}
