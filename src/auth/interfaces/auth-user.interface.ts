export interface AuthUser {
    sub:        number;
    code:       string;
    nombre:     string;
    apellido:   string;
    email:      string;
    role:       string;
    iat:        number;
    exp:        number;
    aud:        string;
}