export interface UserLoginDomain {
    userId: number;
    systemId: number;
    firstName: string;
    lastName: string;
    socialNumber: string;
    cellPhoneNumber: string;
    email: string;
    userPassword: string;
    active: boolean;
}