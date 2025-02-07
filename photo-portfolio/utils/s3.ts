import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!
const CLOUDFRONT_URL = `https://${process.env.CLOUDFRONT_DOMAIN}`

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
    if (!data.Contents) {
      console.warn(`No objects found in bucket ${S3_BUCKET_NAME} with prefix ${prefix}`)
      return []
    }
    const objects = data.Contents.filter(
      (object) => object.Key && !object.Key.endsWith("/") && isImageFile(object.Key),
    ).map((object) => ({
      key: object.Key!,
      url: `${CLOUDFRONT_URL}/${object.Key}`,
    }))
    return objects
  } catch (error) {
    console.error("Error listing S3 objects:", error)
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    throw error
  }
}

