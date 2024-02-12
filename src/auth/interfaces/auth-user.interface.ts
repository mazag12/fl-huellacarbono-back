export interface AuthUser {
    sub:      number;
    code:     string;
    nombre:   string;
    apellido: string;
    email:    string;
    role:     string;
    // role:      Role;
    // args:      string[];
}