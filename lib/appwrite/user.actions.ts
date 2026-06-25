"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from ".";
import { appwriteConfig } from "./appwriteConfig";

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