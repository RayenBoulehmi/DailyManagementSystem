import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/_services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
    id: number;
    username: string; // Username of the user
    email: string;    // Email of the user
    password: string; // Password of the user
    firstName: string; // User's first name
    lastName: string;  // User's last name
    address: string;   // User's address
    phoneNumber: string; // User's phone number
    roles: string[];   // User's roles (e.g., ['ROLE_ADMIN', 'ROLE_USER'])
}

@Component({
    templateUrl: './usermanagement.component.html'
})
export class UserManagementComponent implements OnInit {

    isEditing: boolean = false; // Flag to track edit mode
    displayEditUser: boolean = false; // Controls the visibility of the dialog
    roles: string[] = ['ROLE_ADMIN', 'ROLE_USER']; // Available roles
    users: User[] = []; // List of users fetched from the server
    selectedUser: User = this.initializeUser(); // Holds the selected user details

    userForm: FormGroup; // Reactive form group

    constructor(private usersService: UserService, private fb: FormBuilder) {
        // Initialize form with validators
        this.userForm = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            address: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required]],
            roles: [[], [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.loadUsers(); // Fetch all users on component initialization
    }

    // Initialize a blank user object
    private initializeUser(): User {
        return {
            id: 0,
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            roles: []
        };
    }

    // Fetch all users from the server
    private loadUsers(): void {
        this.usersService.getAllUsers().subscribe((data) => {
            this.users = data.data.users;
            console.log(this.users);
        });
    }

    // Show dialog to create a new user
    showNewUserDialog(): void {
        this.isEditing = false; // Not in edit mode
        this.selectedUser = this.initializeUser(); // Reset selected user
        this.displayEditUser = true; // Show the dialog
    }

    // Show dialog to edit an existing user
    editUser(user: User): void {
        this.isEditing = true; // Enter edit mode
        this.selectedUser = { ...user }; // Copy the user object to prevent direct modification
        this.userForm.patchValue(this.selectedUser); // Populate the form with selected user data
        this.displayEditUser = true; // Show the dialog
    }

    // Delete a user by their ID
    deleteUser(userId: number): void {
        if (confirm('Are you sure you want to delete this user?')) {
            this.usersService.deleteUser(userId).subscribe((data) => {
                alert(data.message);
                this.loadUsers(); // Refresh user list
            }, (error) => {
                alert(error.message);
            });
        }
    }

    // Save user (create new or update existing)
// In the saveUser() method, ensure roles are sent as an array
saveUser() {
    if (this.userForm.invalid) {
        alert('Please fill in all required fields correctly.');
        return;
    }

    const userToSave = { 
        ...this.userForm.value, 
        id: this.selectedUser.id,
        roles: Array.isArray(this.userForm.value.roles) ? this.userForm.value.roles : [this.userForm.value.roles] // Ensure roles is an array
    };

    if (this.selectedUser.id === 0) {   
        this.usersService.createUser(userToSave).subscribe((data) => {
            alert(data.message);
            this.loadUsers();
            this.displayEditUser = false; 
        }, (error) => {
            alert(error.message);
        });
    } else {
        this.usersService.updateUser(userToSave).subscribe((data) => {
            alert(data.message);
            this.loadUsers();
            this.displayEditUser = false;
        }, (error) => {
            alert(error.message);
        });
    }
}


    // Custom validator to disallow special characters in the username
    noSpecialChars(control: any) {
        const regex = /^[a-zA-Z0-9]*$/;
        if (control.value && !regex.test(control.value)) {
            return { invalidUsername: true }; // Return an error if the username is invalid
        }
        return null; // Valid if no special characters
    }

    // Utility to check if a form control has an error
    hasError(controlName: string, errorName: string): boolean {
        return this.userForm.controls[controlName].hasError(errorName);
    }
}
