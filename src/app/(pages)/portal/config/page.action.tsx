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

"use server";

import { revalidateTag } from "next/cache";
import { db } from "@/server/db";
import { config } from "@/server/db/schema";
import { getSession } from "@/server/api";

export async function action(data: FormData) {
  const session = await getSession();
  if (!session?.user?.email) {
    console.error("Not authenticated");
    return;
  }

  await db.transaction(async (trx) => {
    for (const [key, value] of data.entries()) {
      if (key.startsWith("$ACTION_ID")) continue;
      await trx
        .insert(config)
        .values({
          key,
          value: String(value),
        })
        .onConflictDoUpdate({
          target: config.key,
          set: { value: String(value), updatedAt: new Date() },
        });
    }
  });

  revalidateTag("db:config");
}
