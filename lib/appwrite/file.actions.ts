// uploadFile
// file, ownerId, accountId, path

import { ID } from "node-appwrite";
import { createAdminClient } from ".";
import { getFileType } from "../utils";
import { appwriteConfig } from "./appwriteConfig";

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
            url: "",
            extension: getFileType(bucketFile.name).extension,
            size: bucketFile.sizeOriginal,
            owner: ownerId,
            accountId,
            users: [],
            bucketFileId: bucketFile.$id,
        };

        const newFile = await databases.createRow({
            databaseId: appwriteConfig.databaseId,
            tableId: appwriteConfig.filesCollectionId,
            rowId: ID.unique(),
            data: fileDocument,
        }).catch(async (error: unknown) => {
            
        })
    } catch (error) {
       console.log("Failed to upload file", error); 
    }
}