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

import {
  getConfig,
  getEventSubmissions,
  getMembers,
  getOfficers,
  getSession,
} from "@/server/api";
import MembersClientPage from "./page.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manage Members",
};

export default async function MembersPage() {
  const members = await getMembers();
  const officers = await getOfficers(true);
  const submissions = await getEventSubmissions();
  const session = await getSession();
  const config = await getConfig();

  return (
    <MembersClientPage
      members={members}
      submissions={submissions}
      config={config}
      self={officers.find((o) => o.email == session!.user.email)!}
    />
  );
}
