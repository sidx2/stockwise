import { AbstractControl, FormControl } from "@angular/forms";
import { catchError, delay, map, of, switchMap } from "rxjs";
import { AuthService } from "../../auth-module/services/auth.service";

export class customValidators {
    static strongPassword(control: FormControl): { [key: string]: any } | null {
        const password: string = control.value;

        if (password.length < 8) {
            return { strongPassword: { message: 'Password must be at least 8 characters long' } };
        }

        if (!/[A-Z]/.test(password)) {
            return { strongPassword: { message: 'Password must contain at least one uppercase letter' } };
        }

        if (!/[a-z]/.test(password)) {
            return { strongPassword: { message: 'Password must contain at least one lowercase letter' } };
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return { strongPassword: { message: 'Password must contain at least one special character' } };
        }

        if (!/\d/.test(password)) {
            return { strongPassword: { message: 'Password must contain at least one number' } };
        }

        return null;
    }

    static validEmail(control: FormControl): { [key: string]: any } | null {
        const email: string = control.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return { validEmail: { message: 'Invalid email address' } };
        }

        return null;
    }

    static validPhoneNumber(control: FormControl): { [key: string]: any } | null {
        const phoneNumber: string = control.value;
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;

        if (!phoneRegex.test(phoneNumber)) {
            return { validPhoneNumber: { message: 'Invalid phone number' } };
        }

        return null;
    }

    static userExists(authService: AuthService) {
        return (control: AbstractControl) => {
            return of(control.value).pipe(
                delay(500),
                switchMap((email) => {
                    return authService.userExists(email).pipe(
                        map((response: any) => {
                            return response["exists"] ? { userExists: { message: 'User already exists' } } : null;
                },
                catchError(err => of(null))))
            }))
        };
    }
}
