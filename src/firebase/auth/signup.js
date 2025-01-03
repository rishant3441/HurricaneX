import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Function to sign up a user with email and password
export default async function signUp(email, password) {
  let result = null, // Variable to store the sign-up result
    error = null; // Variable to store any error that occurs

  try {
    result = await createUserWithEmailAndPassword(auth, email, password); // Sign up with email and password
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-up
  }

  return { result, error }; // Return the result and error
};