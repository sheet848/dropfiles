"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from ".";
import { appwriteConfig } from "./appwriteConfig";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseObj } from "../utils";

// create Account (fullName, email)
// get existing user by email
// send OTP to the user email address -> sendEmailOTP(email)
// if !existingUser -> create the user in DB with all data
// fullName, email, avatar, accountId
// accountId with message

export const getUserByEmail = async (email: string) => {
    const { databases } = await createAdminClient();

    const result = await databases.listRows({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.usersCollectionId,
        queries: [Query.equal("email", [email])],
    });

    return result.total > 0 ? result.rows[0] : null;
};

export const sendEmailOTP = async (email: string) => {
    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailToken({
            userId: ID.unique(),
            email,
        });

        return session.userId;

    } catch (error) {
        console.log("Failed to send email OTP", error);
    }
}

export const createAccount = async ({
    fullName,
    email,
}: {
    fullName: string;
    email: string;
}) => {
    const existingUser = await getUserByEmail(email);
    const accountId = await sendEmailOTP(email);

    if (!accountId) {
        return { accoutnId: null, message: "Failed to send OTP" };
    }

    if (!existingUser) {
        const { databases } = await createAdminClient();
        await databases.createRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.usersCollectionId,
            rowId: ID.unique(),
            data: {
                fullName,
                email,
                avatar: "",
                accountId,
            },
        });
    }

    return { accountId, message: "User created successfully" };
}

export const signInUser = async (email: string) => {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            accountId: null,
            message: "Failed to Sign In, User doesn't exist",
        };
    }

    const accountId = await sendEmailOTP(email);

    return { accountId, message: "User signed-in successfully" };
}

// verifySecret
// 1. account -> createAdminClient()
// 2. account.createSession()
// 3. store the appwrite-session and appwrite-user-id in the cookie
// 4. return the sessionId

export const verifySecret = async ({ accountId, password }: { accountId: string; password: string }) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createSession({
            userId: accountId,
            secret: password,
        });

        const cookieStore = await cookies();

        cookieStore.set("appwrite-session", session.$id, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        cookieStore.set("appwrite-user-id", accountId, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return { sessionId: session.$id };

    } catch (error) {
        console.log("Failed to verify OTP", error);
    }
}

// cookieStore -> appwrite-session
// call createAdminClient() => account
// account -> delete the session by passing the id
// clear the cookie -> appwrite session and apppwrite-user-id

export const signOutuser = async () => {
    const cookieStore = await cookies();

    try {
        const sessionId = cookieStore.get("appwrite-session");
        if (sessionId?.value) {
            const { account } = await createAdminClient();

            try {
                await account.deleteSession({ sessionId: sessionId.value });
            } catch (error) {
                console.log("Failed to delete the session from appwrite", error);
            }
        }
    } catch (error) {
        console.log("Error during logout", error);
    } finally {
        cookieStore.delete("appwrite-session");
        cookieStore.delete("appwrite-user-id");
    }

    redirect("/auth");
}

// userId from cookieStore
// createAdminClient() -> database
// query in the database with the userId and return the user
export const getCurrentUser = async () => {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("appwrite-user-id");

        if(!userId?.value) {
            return null;
        }

        const { databases } = await createAdminClient();

        const user = await databases.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.usersCollectionId,
            queries: [Query.equal("accountId", [userId.value])]
        });

        return user.total > 0 ? parseObj(user.rows[0]) : null;

    } catch (error) {
        console.log("Error while fetching the current user", error);
        return null;
    }
}