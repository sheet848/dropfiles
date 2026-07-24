"use server";
// uploadFile
// file, ownerId, accountId, path

import { ID, Models, Query } from "node-appwrite";
import { createAdminClient } from ".";
import { constructFileUrl, getFileType, parseObj } from "../utils";
import { appwriteConfig } from "./appwriteConfig";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user.actions";
import { DeleteFile, RenameFile, ShareFile } from "../types";

// storage and databases => createAdminClient()
// create the file in the storage -> bucketId, fileId, file
// fileDocument => metadata for the uploaded file
// create a new row in the databases -> databaseId, tableId, rowId, data(file)
// revalidatePath(path)

export const uploadFile = async ({
    file,
    ownerId,
    accountId,
    path,
}: {
    file: File;
    ownerId: string;
    accountId: string;
    path: string;
}) => {
    const { storage, databases } = await createAdminClient();

    try {
        const bucketFile = await storage.createFile({
            bucketId: appwriteConfig.bucketId,
            fileId: ID.unique(),
            file,
        });

        const fileDocument = {
            type: getFileType(bucketFile.name).type,
            name: bucketFile.name,
            url: constructFileUrl(bucketFile.$id),
            extension: getFileType(bucketFile.name).extension,
            size: bucketFile.sizeOriginal,
            owner: [ownerId],
            accountId,
            users: [],
            bucketFileId: bucketFile.$id,
            ownerId,
        };

        const newFile = await databases.createRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.filesCollectionId,
            rowId: ID.unique(),
            data: fileDocument,
        }).catch(async (error: unknown) => {
            await storage.deleteFile({
                bucketId: appwriteConfig.bucketId,
                fileId: bucketFile.$id,
            });
            console.log("Failed to create file", error);
        });
        revalidatePath(path);
        return parseObj(newFile);
    } catch (error) {
       console.log("Failed to upload file", error); 
    }
}

// getFiles(types, query, filter)

// databases => createAdminClient()
// currentUser => getCurrentUser()
// query in the database => owner(currentUserId) or users(email)

const createQueries = (
    currentUser: Models.DefaultRow,
    types: string[],
    query: string,
    filter: string,
) => {
    const queries = [
        Query.or([
            Query.equal("ownerId", [currentUser.$id]),
            Query.contains("users", [currentUser.email]),
        ]),
    ];

    // types
    if (types.length > 0) {
        queries.push(Query.equal("type", types));
    }

    // query
    // filter
    if (filter) {
        const [sortBy, filterBy] = filter.split("-");
        if (filterBy === 'asc') {
            queries.push(Query.orderAsc(sortBy));
        }
        if (filterBy === 'dsc') {
            queries.push(Query.orderDesc(sortBy));
        }
    }

    return queries;
};

export const getFiles = async ({
    types = [],
    query,
    filter = "$createdAt-asc",
}: {
    types: string[];
    query: string;
    filter?: string;
}) => {
    const { databases } = await createAdminClient();

    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            console.log("User not found");
            return;
        }

        const queries = createQueries(currentUser, types, query, filter);
        const files = await databases.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.filesCollectionId,
            queries,
        });

        return parseObj(files);
    } catch (error) {
        console.log("Failed to retrive files", error);
    }
};

export const renameFile = async ({ fileId, name, extension, path }: RenameFile) => {
    const { databases } = await createAdminClient();

    try {
        const newFileName = `${name}.${extension}`;
        const updatedFile = await databases.updateRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.filesCollectionId,
            rowId: fileId,
            data: {
                name: newFileName,
            },
        });

        revalidatePath(path);

        return parseObj(updatedFile);
    } catch (error) {
        console.log("Failed to rename the file", error);
    }
};

export const getFileOwnerDetails = async (ownerId: string) => {
    const { databases } = await createAdminClient();

    try {
        const user = await databases.listRows({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.usersCollectionId,
            queries: [Query.equal("$id", ownerId)],
        });

        return user.total > 0 ? parseObj(user.rows[0]) : null;

    } catch (error) {
        console.log("Failed to fetch owner details", error);
    }
};

export const shareFile = async ({ fileId, emails, path }: ShareFile) => {
    const { databases } = await createAdminClient();

    try {
        const updatedFile = await databases.updateRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.filesCollectionId,
            rowId: fileId,
            data: {
                users: emails,
            },
        });

        revalidatePath(path);

        return parseObj(updatedFile);

    } catch (error) {
        console.log("Failed to share the file", error);
    }
};

export const deleteFile = async ({ fileId, bucketFileId, path }: DeleteFile) => {
    const { storage, databases } = await createAdminClient();

    try {
        const deletedFile = await databases.deleteRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.filesCollectionId,
            rowId: fileId,
        });

        if (deletedFile) {
            await storage.deleteFile({
                bucketId: appwriteConfig.bucketId,
                fileId: bucketFileId,
            });
        }

        revalidatePath(path);
        return parseObj({message: "File deleted successfully"})
    } catch (error) {
        console.log("Failed to delete the file", error);
    }
}