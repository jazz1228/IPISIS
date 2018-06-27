// Obtenemos las librerias necesarias de passport para la authenticacion y autorizacion.

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LdapStrategy = require('passport-ldapauth').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// Configuración de JwtStrategy

var EXPIRES_IN_MINUTES = 60 * 60 * 2;
var SECRET = process.env.tokenSecret
    || "gDDX7NnKuqDnvK87jROA0MDtATKvJ9jfb2NRE4E7uazqdlwR5P7Uu8veBWkUsG9";
var ALGORITHM = "HS256";
var ISSUER = "udea.edu.co";
var AUDIENCE = "udea.edu.co";
var EXTRACT_JWT = ExtractJwt.fromAuthHeader();

var JWT_STRATEGY_CONFIG = {
  jwtFromRequest: EXTRACT_JWT,
  secretOrKey: SECRET,
  issuer: ISSUER,
  audience: AUDIENCE,
  passReqToCallback: false
};

// Trigger el cual se activa cuando un usuario se identifica mediante JwtStrategy

function _onJwtStrategyAuth(payload, next) {
  var user = payload.user;
  return next(null, user, {});
};

// Configuración de LdapStrategy.

var LDAP_STRATEGY_CONFIG = {
  server: {
    url: 'ldap://192.168.194.110/',
    bindDn: 'cn=admin,dc=udea,dc=edu,dc=co',
    bindCredentials: 'LD4P=l0gg1n', //ldap-password
    searchBase: 'ou=Usuarios,dc=udea,dc=edu,dc=co',
    searchFilter: '(uid={{username}})'
  },
  usernameField: 'username',
  passwordField: 'password'
};

// Trigger el cual se activa  cuando un equipo se identifica mediante LdapStrategy.

function _onLdapStrategy(estudiante, next) {
  var username;

  if (!estudiante) {
    return next(null, false, {message: 'No se encontro el usuario.'});
  }
  username = {
    nombre: estudiante.givenName + " "+ estudiante.sn,
    nombreUsuario: estudiante.uid,
    identificacion: estudiante.uidNumber,
    rol: estudiante.gidNumber
  };
  return next(null, username, {message: 'Identificado correctamente.'})
};

// Registramos en el passport las estrategias previamente configuradas.
passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));
passport.use('ldap-usuario', new LdapStrategy(LDAP_STRATEGY_CONFIG, _onLdapStrategy));

// Exportamos nuestra configuracion de JwtStrategy para accederla globalmente.

module.exports.jwtSettings = {
  jwtFromRequest: EXTRACT_JWT,
  expiresInMinutes: EXPIRES_IN_MINUTES,
  secret: SECRET,
  algorithm: ALGORITHM,
  issuer: ISSUER,
  audience: AUDIENCE
};
