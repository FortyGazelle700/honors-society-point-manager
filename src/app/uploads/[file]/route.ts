/*
 * Blue Flame's Honors Society Point Manager
 * Copyright (C) 2025 Blue Flame
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { unstable_cache } from "next/cache";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const response = await unstable_cache(
    async () => {
      const s3Client = new S3Client({
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
        forcePathStyle: true, // Required for custom S3-compatible endpoints
      });

      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: (await params).file,
      });

      const s3Response = await s3Client.send(command);

      if (!s3Response.Body) {
        throw new Error("File not found");
      }

      return new Response(s3Response.Body as ReadableStream, {
        headers: {
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Type": s3Response.ContentType ?? "application/octet-stream",
          "Content-Length": s3Response.ContentLength?.toString() ?? "",
        },
      });
    },
    [(await params).file],
    {
      revalidate: 31536000, // 1 year
      tags: ["db:events:submissions"],
    },
  )();

  return response;
}
