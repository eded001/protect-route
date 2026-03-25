import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user:email");

// LOGIN GOOGLE
export async function loginWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    return {
        user: result.user,
        provider: "Google",
        credential: GoogleAuthProvider.credentialFromResult(result),
    };
}

// LOGIN GITHUB
export async function loginWithGithub() {
    const result = await signInWithPopup(auth, githubProvider);
    return {
        user: result.user,
        provider: "GitHub",
        credential: GithubAuthProvider.credentialFromResult(result),
    };
}

// LOGOUT
export async function logout() {
    await signOut(auth);
}