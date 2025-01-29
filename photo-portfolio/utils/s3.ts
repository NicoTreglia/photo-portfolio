import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!

export async function getSignedS3Url(key: string) {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: key,
  })

  try {
    // URL expires in 1 hour
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    return signedUrl
  } catch (error) {
    console.error("Error generating signed URL:", error)
    return null
  }
}

function isImageFile(filename: string): boolean {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
  return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext))
}

export async function listS3Objects(prefix: string) {
  const command = new ListObjectsV2Command({
    Bucket: S3_BUCKET_NAME,
    Prefix: prefix,
  })

  try {
    const data = await s3Client.send(command)
    const objects = await Promise.all(
      data.Contents?.filter((object) => !object.Key!.endsWith("/") && isImageFile(object.Key!)).map(async (object) => ({
        key: object.Key!,
        url: await getSignedS3Url(object.Key!),
      })) || [],
    )
    return objects.filter((object) => object.url !== null)
  } catch (error) {
    console.error("Error listing S3 objects:", error)
    return []
  }
}

